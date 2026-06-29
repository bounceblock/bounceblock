import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/app/AdminShell";
import { DemoBanner, KpiCard, Panel, TrendBars } from "@/components/app/admin/ui";
import { ActivityFeed } from "@/components/app/admin/ActivityFeed";
import { getAdminKpis, getAdminActivity, getSystemStatus } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Admin · Overview" };
export const dynamic = "force-dynamic";

const money = (cents: number) => `$${Math.round(cents / 100).toLocaleString()}`;

export default async function AdminOverview() {
  const [{ kpis, series, demo }, { events }, integrations] = await Promise.all([
    getAdminKpis(),
    getAdminActivity(undefined, 10),
    Promise.resolve(getSystemStatus()),
  ]);

  const cards = [
    { label: "MRR", value: `$${kpis.mrr.toLocaleString()}`, sub: `ARR ${money(kpis.arr * 100)}`, tone: "good" as const },
    { label: "Total users", value: kpis.totalUsers.toLocaleString(), sub: `${kpis.paidUsers.toLocaleString()} paid · ${kpis.conversion}% conv.` },
    { label: "ARPU", value: `$${kpis.arpu}`, sub: "per paid user / mo" },
    { label: "Signups · today", value: kpis.signupsToday.toLocaleString(), sub: `${kpis.signups7d} this week · ${kpis.signups30d} this month` },
    { label: "Active subs", value: kpis.activeSubs.toLocaleString(), sub: `${kpis.pastDue} past due · ${kpis.trialing} trialing`, tone: kpis.pastDue > 0 ? ("warn" as const) : undefined },
    { label: "Verifications · 30d", value: kpis.verifications30d.toLocaleString(), sub: `${(kpis.rowsProcessed30d / 1_000_000).toFixed(1)}M rows processed` },
    { label: "Revenue · 30d", value: money(kpis.revenue30d), sub: `${money(kpis.revenueAllTime)} all-time`, tone: "good" as const },
    { label: "Canceled subs", value: kpis.canceled.toLocaleString(), sub: "lifetime", tone: kpis.canceled > 0 ? ("warn" as const) : undefined },
  ];

  const planRows = (["free", "starter", "pro", "business"] as const).map((p) => ({
    plan: p,
    count: kpis.byPlan[p] ?? 0,
    pct: kpis.totalUsers ? Math.round(((kpis.byPlan[p] ?? 0) / kpis.totalUsers) * 100) : 0,
  }));

  return (
    <AdminShell active="overview">
      <h1 className="font-serif text-3xl">Overview</h1>
      {demo && <DemoBanner />}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <KpiCard key={c.label} label={c.label} value={c.value} sub={c.sub} tone={c.tone} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Signups & revenue · 14 days">
          <TrendBars data={series} />
        </Panel>

        <Panel title="Users by plan">
          <div className="grid gap-3">
            {planRows.map((r) => (
              <div key={r.plan} className="grid grid-cols-[80px_1fr_84px] items-center gap-3 text-[14px]">
                <span className="font-medium capitalize text-ink-2">{r.plan}</span>
                <span className="h-2.5 overflow-hidden rounded-full bg-sunk">
                  <span className="block h-full rounded-full bg-brand" style={{ width: `${r.pct}%` }} />
                </span>
                <span className="text-right tabular-nums text-ink-2">{r.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Recent activity" right={<Link href="/admin/activity" className="text-[13px] font-medium text-brand-deep hover:underline">View all →</Link>}>
          <ActivityFeed events={events} />
        </Panel>

        <Panel title="Integrations" right={<Link href="/admin/system" className="text-[13px] font-medium text-brand-deep hover:underline">System →</Link>}>
          <ul className="grid gap-2">
            {integrations.map((i) => (
              <li key={i.key} className="flex items-center gap-2.5 text-[13.5px]">
                <span className={`h-2 w-2 shrink-0 rounded-full ${i.connected ? "bg-brand" : "bg-ink/20"}`} />
                <span className="flex-1 text-ink-2">{i.label}</span>
                <span className={i.connected ? "text-[12px] font-medium text-brand-deep" : "text-[12px] text-ink-3"}>
                  {i.connected ? "Connected" : "Pending"}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AdminShell>
  );
}
