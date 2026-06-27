import type { Metadata } from "next";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminKpis } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Admin · Overview" };
export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const { kpis, demo } = await getAdminKpis();
  const conv = kpis.totalUsers ? Math.round((kpis.paidUsers / kpis.totalUsers) * 100) : 0;

  const cards = [
    { label: "Total users", value: kpis.totalUsers.toLocaleString() },
    { label: "Paid users", value: kpis.paidUsers.toLocaleString() },
    { label: "MRR", value: `$${kpis.mrr.toLocaleString()}` },
    { label: "Signups · 7d", value: kpis.signups7d.toLocaleString() },
    { label: "Verifications", value: kpis.verifications.toLocaleString() },
    { label: "Free → paid", value: `${conv}%` },
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-hair bg-raised p-6 shadow-s1">
            <div className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-3">{c.label}</div>
            <div className="mt-1.5 font-serif text-[32px] font-semibold text-ink">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-hair bg-raised p-6 shadow-s1">
        <h2 className="font-serif text-xl">Users by plan</h2>
        <div className="mt-4 grid gap-3">
          {planRows.map((r) => (
            <div key={r.plan} className="grid grid-cols-[90px_1fr_90px] items-center gap-3 text-[14px]">
              <span className="font-medium capitalize text-ink-2">{r.plan}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-sunk">
                <span className="block h-full rounded-full bg-brand" style={{ width: `${r.pct}%` }} />
              </span>
              <span className="text-right tabular-nums text-ink-2">{r.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

export function DemoBanner() {
  return (
    <p className="mt-4 rounded-md border border-unknown/30 bg-unknown/5 px-4 py-2.5 text-[13px] text-ink-2">
      ● Demo data — connect Supabase (service role) to show live metrics.
    </p>
  );
}
