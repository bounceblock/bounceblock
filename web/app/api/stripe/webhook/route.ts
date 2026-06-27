import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getStripe } from "@/lib/stripe";
import { config } from "@/lib/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { planForPriceId } from "@/lib/plans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook receiver: verify signature → dedupe on event.id (idempotency)
 * → sync subscriptions / profile.plan / payments via the service-role client.
 */
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await req.text();

  if (!sig || !secret) {
    return NextResponse.json({ received: true, configured: false });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Can't persist until Supabase is configured — acknowledge so Stripe stops retrying.
  if (!config.hasSupabaseAdmin()) {
    return NextResponse.json({ received: true, persisted: false });
  }

  const db = createSupabaseAdminClient();

  // ── idempotency: first insert wins; a duplicate event.id is a no-op ──
  const { error: dupErr } = await db
    .from("processed_webhook_events")
    .insert({ stripe_event_id: event.id, type: event.type });
  if (dupErr) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await syncSubscription(db, event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await cancelSubscription(db, event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_succeeded":
        await recordPayment(db, event.data.object as Stripe.Invoice);
        break;
      default:
        break;
    }
  } catch {
    return NextResponse.json({ error: "handler_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true, type: event.type });
}

async function resolveUserId(db: SupabaseClient, customer: string | null): Promise<string | undefined> {
  if (!customer) return undefined;
  const { data } = await db.from("profiles").select("id").eq("stripe_customer_id", customer).single();
  return data?.id;
}

async function syncSubscription(db: SupabaseClient, sub: Stripe.Subscription) {
  const priceId = sub.items.data[0]?.price.id;
  const plan = priceId ? planForPriceId(priceId) : undefined;
  const customer = typeof sub.customer === "string" ? sub.customer : null;
  const userId = sub.metadata?.user_id ?? (await resolveUserId(db, customer));
  if (!userId) return;

  await db.from("subscriptions").upsert(
    {
      stripe_subscription_id: sub.id,
      user_id: userId,
      stripe_price_id: priceId,
      plan: plan ?? "starter",
      status: sub.status,
      current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      cancel_at_period_end: sub.cancel_at_period_end,
    },
    { onConflict: "stripe_subscription_id" }
  );

  if (plan && (sub.status === "active" || sub.status === "trialing")) {
    await db.from("profiles").update({ plan }).eq("id", userId);
  }
}

async function cancelSubscription(db: SupabaseClient, sub: Stripe.Subscription) {
  await db.from("subscriptions").update({ status: "canceled" }).eq("stripe_subscription_id", sub.id);
  const customer = typeof sub.customer === "string" ? sub.customer : null;
  const userId = sub.metadata?.user_id ?? (await resolveUserId(db, customer));
  if (userId) await db.from("profiles").update({ plan: "free" }).eq("id", userId);
}

async function recordPayment(db: SupabaseClient, inv: Stripe.Invoice) {
  const customer = typeof inv.customer === "string" ? inv.customer : null;
  const userId = await resolveUserId(db, customer);
  await db.from("payments").insert({
    user_id: userId ?? null,
    stripe_payment_intent_id: typeof inv.payment_intent === "string" ? inv.payment_intent : null,
    stripe_invoice_id: inv.id,
    amount: inv.amount_paid,
    currency: inv.currency,
    status: inv.status ?? "paid",
  });
}
