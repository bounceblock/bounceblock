import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { BillingPortalButton } from "@/components/billing/BillingPortalButton";
import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { quotaForPlan, type PlanId } from "@/lib/plans";
import { ReferralCard } from "@/components/billing/ReferralCard";
import { referralUrl } from "@/lib/referral";

export const metadata: Metadata = { title: "Dashboard" };

interface RecentRow {
  id: string;
  quality_score: number | null;
  clean_count: number;
  created_at: string;
}

export default async function DashboardPage() {
  const user = await getUser();

  let plan: PlanId = "free";
  let used = 0;
  let quota = quotaForPlan("free");
  let recent: RecentRow[] = [];
  let referralCode = "";

  if (user && config.hasSupabase()) {
    const supabase = createSupabaseServerClient();

    const { data: profile } = await supabase.from("profiles").select("plan, referral_code").eq("id", user.id).single();
    plan = (profile?.plan as PlanId) ?? "free";
    referralCode = profile?.referral_code ?? "";
    quota = quotaForPlan(plan);

    const { data: usageRows } = await supabase
      .from("usage")
      .select("verifications_used, plan_quota")
      .eq("user_id", user.id)
      .order("period_start", { ascending: false })
      .limit(1);
    if (usageRows?.[0]) {
      used = usageRows[0].verifications_used ?? 0;
      quota = usageRows[0].plan_quota ?? quota;
    }

    const { data: vers } = await supabase
      .from("verifications")
      .select("id, quality_score, clean_count, created_at")
      .eq("user_id", user.id)
      .eq("kind", "full")
      .order("created_at", { ascending: false })
      .limit(10);
    recent = (vers as RecentRow[] | null) ?? [];
  }

  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <div className="mx-auto max-w-site px-7 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Dashboard</h1>
          <p className="mt-1 text-[15px] text-ink-2">
            {user ? `Signed in as ${user.email}` : "Your verifications, usage and downloads."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {plan !== "free" && <BillingPortalButton />}
          <Button href="/verify">+ Verify a list</Button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Plan" value={planLabel} />
        <Stat label="Used this month" value={`${used.toLocaleString()} / ${quota.toLocaleString()}`} />
        <Stat label="Lists cleaned" value={String(recent.length)} />
      </div>

      <div className="mt-6">
        <ReferralCard url={referralUrl(referralCode || "your-code")} />
      </div>

      {recent.length === 0 ? (
        <div className="mt-8 rounded-xl border border-hair bg-raised p-12 text-center shadow-s1">
          <p className="font-serif text-xl">No verifications yet</p>
          <p className="mx-auto mt-2 max-w-sm text-[14.5px] text-ink-2">
            Upload your first list to see verified results, a quality score and clean downloads here.
          </p>
          <div className="mt-5">
            <Button href="/verify">Verify your first list</Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Quality</th>
                <th className="px-5 py-3 font-medium">Clean leads</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-b border-hair last:border-0">
                  <td className="px-5 py-3 text-ink-2">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3 font-semibold">{r.quality_score ?? "—"}</td>
                  <td className="px-5 py-3">{r.clean_count.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-brand-deep">Download</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!config.hasSupabase() && (
        <p className="mt-6 text-center text-xs text-ink-3">
          Demo dashboard — connect Supabase to show real plan, usage and history.
        </p>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-hair bg-raised p-5 shadow-s1">
      <div className="text-[13px] font-medium uppercase tracking-wide text-ink-3">{label}</div>
      <div className="mt-1.5 font-serif text-2xl">{value}</div>
    </div>
  );
}
