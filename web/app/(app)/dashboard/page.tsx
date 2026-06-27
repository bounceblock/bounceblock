import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { ReferralCard } from "@/components/billing/ReferralCard";
import { referralUrl } from "@/lib/referral";
import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { quotaForPlan, type PlanId } from "@/lib/plans";

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
      .from("usage").select("verifications_used, plan_quota").eq("user_id", user.id)
      .order("period_start", { ascending: false }).limit(1);
    if (usageRows?.[0]) {
      used = usageRows[0].verifications_used ?? 0;
      quota = usageRows[0].plan_quota ?? quota;
    }
    const { data: vers } = await supabase
      .from("verifications").select("id, quality_score, clean_count, created_at")
      .eq("user_id", user.id).eq("kind", "full").order("created_at", { ascending: false }).limit(5);
    recent = (vers as RecentRow[] | null) ?? [];
  }

  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <AppShell active="dashboard">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl">Dashboard</h1>
            <p className="mt-1 text-[15px] text-ink-2">{user ? `Signed in as ${user.email}` : "Your verifications, usage and downloads."}</p>
          </div>
          <Button href="/verify">+ Verify a list</Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Plan" value={planLabel} />
          <Stat label="Used this month" value={`${used.toLocaleString()} / ${quota.toLocaleString()}`} />
          <Stat label="Lists cleaned" value={String(recent.length)} />
        </div>

        <div className="mt-6">
          <ReferralCard url={referralUrl(referralCode || "your-code")} />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-serif text-xl">Recent verifications</h2>
          <Link href="/history" className="text-[13.5px] font-medium text-brand-deep">View all →</Link>
        </div>
        {recent.length === 0 ? (
          <div className="mt-4 rounded-xl border border-hair bg-raised p-10 text-center shadow-s1">
            <p className="font-serif text-lg">No verifications yet</p>
            <p className="mx-auto mt-2 max-w-sm text-[14px] text-ink-2">Upload your first list to see results and clean downloads here.</p>
            <div className="mt-4"><Button href="/verify">Verify your first list</Button></div>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
            {recent.map((r) => (
              <div key={r.id} className="flex items-center gap-4 border-b border-hair px-5 py-3.5 text-[14px] last:border-0">
                <span className="text-ink-2">{new Date(r.created_at).toLocaleDateString()}</span>
                <span className="font-semibold">Score {r.quality_score ?? "—"}</span>
                <span className="text-ink-2">{r.clean_count.toLocaleString()} clean</span>
                <span className="ml-auto text-brand-deep">Download</span>
              </div>
            ))}
          </div>
        )}

        {!config.hasSupabase() && (
          <p className="mt-6 text-center text-xs text-ink-3">Demo dashboard — connect Supabase for real plan, usage and history.</p>
        )}
      </div>
    </AppShell>
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
