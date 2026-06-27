import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getUser } from "@/lib/auth";
import { priceIdForPlan, type PlanId } from "@/lib/plans";
import { config } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Create a subscription Checkout session for the signed-in user (decision: subscription, not one-time). */
export async function POST(req: NextRequest) {
  if (!config.hasStripe()) {
    return NextResponse.json({ error: "Billing isn't configured yet." }, { status: 503 });
  }
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  const { plan } = (await req.json().catch(() => ({}))) as { plan?: PlanId };
  const priceId = plan ? priceIdForPlan(plan) : undefined;
  if (!plan || !priceId) {
    return NextResponse.json({ error: "Unknown or unpriced plan." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  const stripe = getStripe();
  let customerId: string | undefined = profile?.stripe_customer_id ?? undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { user_id: user.id },
    });
    customerId = customer.id;
    await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${config.siteUrl()}/dashboard?checkout=success`,
    cancel_url: `${config.siteUrl()}/pricing?checkout=cancelled`,
    metadata: { user_id: user.id, plan },
    subscription_data: { metadata: { user_id: user.id, plan } },
  });

  return NextResponse.json({ url: session.url });
}
