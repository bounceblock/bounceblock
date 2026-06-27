import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { BillingPortalButton } from "@/components/billing/BillingPortalButton";
import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PLANS, quotaForPlan, type PlanId } from "@/lib/plans";

export const metadata: Metadata = { title: "Billing" };

export default async function BillingPage() {
  const user = await getUser();
  let plan: PlanId = "free";
  let used = 0;
  let quota = quotaForPlan("free");

  if (user && config.hasSupabase()) {
    const supabase = createSupabaseServerClient();
    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
    plan = (profile?.plan as PlanId) ?? "free";
    quota = quotaForPlan(plan);
    const { data: usageRows } = await supabase
      .from("usage").select("verifications_used, plan_quota").eq("user_id", user.id)
      .order("period_start", { ascending: false }).limit(1);
    if (usageRows?.[0]) {
      used = usageRows[0].verifications_used ?? 0;
      quota = usageRows[0].plan_quota ?? quota;
    }
  }

  const meta = PLANS.find((p) => p.id === plan)!;
  const pct = quota ? Math.min(100, Math.round((used / quota) * 100)) : 0;

  return (
    <AppShell active="billing">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl">Billing</h1>
        <p className="mt-1 text-[15px] text-ink-2">Your plan, usage and subscription.</p>

        <div className="mt-8 rounded-2xl border border-hair bg-raised p-7 shadow-s1">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-3">Current plan</div>
              <div className="mt-1 font-serif text-2xl">
                {meta.name} <span className="text-[16px] font-sans font-medium text-ink-3">${meta.priceMonthly}/mo</span>
              </div>
            </div>
            {plan !== "free" ? <BillingPortalButton /> : <Button href="/pricing">Upgrade</Button>}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-ink-2">Verifications used this month</span>
              <span className="font-semibold tabular-nums">{used.toLocaleString()} / {quota.toLocaleString()}</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-sunk">
              <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-hair bg-raised p-7 shadow-s1">
          <h2 className="font-serif text-lg">Need more headroom?</h2>
          <p className="mt-1 text-[14px] text-ink-2">Compare plans and upgrade any time — flat pricing, cancel whenever.</p>
          <div className="mt-4"><Button href="/pricing" variant="ghost">View all plans</Button></div>
        </div>

        {!config.hasSupabase() && (
          <p className="mt-6 text-center text-xs text-ink-3">Demo billing — connect Stripe + Supabase for live plan &amp; invoices.</p>
        )}
      </div>
    </AppShell>
  );
}
