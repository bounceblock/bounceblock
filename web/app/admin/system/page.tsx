import type { Metadata } from "next";
import { AdminShell } from "@/components/app/AdminShell";
import { Panel } from "@/components/app/admin/ui";
import { getSystemStatus } from "@/lib/admin-data";
import { PLANS } from "@/lib/plans";

export const metadata: Metadata = { title: "Admin · System" };
export const dynamic = "force-dynamic";

export default async function AdminSystem() {
  const integrations = getSystemStatus();
  const connected = integrations.filter((i) => i.connected).length;

  return (
    <AdminShell active="system">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl">System</h1>
        <span className="text-[14px] text-ink-2"><b className="text-ink">{connected}</b> / {integrations.length} integrations connected</span>
      </div>
      <p className="mt-2 text-[14px] text-ink-2">Connection status for every external dependency. Each feature activates the moment its key is added — no redeploy.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {integrations.map((i) => (
          <div key={i.key} className="rounded-xl border border-hair bg-raised p-5 shadow-s1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-ink">{i.label}</span>
              <span className={`flex items-center gap-1.5 text-[12.5px] font-semibold ${i.connected ? "text-brand-deep" : "text-ink-3"}`}>
                <span className={`h-2 w-2 rounded-full ${i.connected ? "bg-brand" : "bg-ink/20"}`} />
                {i.connected ? "Connected" : "Pending"}
              </span>
            </div>
            <p className="mt-2 text-[13px] text-ink-3">{i.note}</p>
          </div>
        ))}
      </div>

      <Panel title="Plan configuration" className="mt-8">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
              <th className="py-2.5 font-medium">Plan</th>
              <th className="py-2.5 font-medium">Price / mo</th>
              <th className="py-2.5 font-medium">Monthly allowance</th>
              <th className="py-2.5 font-medium">Stripe price env</th>
            </tr>
          </thead>
          <tbody>
            {PLANS.map((p) => (
              <tr key={p.id} className="border-b border-hair last:border-0">
                <td className="py-2.5 font-medium capitalize">{p.name}</td>
                <td className="py-2.5 tabular-nums">${p.priceMonthly}</td>
                <td className="py-2.5 tabular-nums">{p.quota.toLocaleString()}</td>
                <td className="py-2.5">
                  <span className="font-mono text-[12px] text-ink-3">{p.stripePriceEnv ?? "—"}</span>
                  {p.stripePriceEnv && (
                    <span className={`ml-2 text-[11px] ${process.env[p.stripePriceEnv] ? "text-brand-deep" : "text-ink-3"}`}>
                      {process.env[p.stripePriceEnv] ? "set" : "unset"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </AdminShell>
  );
}
