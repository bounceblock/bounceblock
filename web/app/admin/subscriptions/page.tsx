import type { Metadata } from "next";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminSubscriptions } from "@/lib/admin-data";
import { DemoBanner } from "@/app/admin/page";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Subscriptions" };
export const dynamic = "force-dynamic";

const statusTone: Record<string, string> = {
  active: "bg-brand/12 text-brand-deep",
  trialing: "bg-accentblue/12 text-accentblue-deep",
  past_due: "bg-unknown/15 text-[#A9761B]",
  canceled: "bg-invalid/12 text-invalid",
};

export default async function AdminSubscriptions() {
  const { subs, demo } = await getAdminSubscriptions();

  return (
    <AdminShell active="subscriptions">
      <h1 className="font-serif text-3xl">Subscriptions</h1>
      {demo && <DemoBanner />}

      <div className="mt-6 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Renews</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-b border-hair last:border-0">
                <td className="px-5 py-3 truncate text-ink-3">{s.user_id}</td>
                <td className="px-5 py-3 font-medium capitalize">{s.plan}</td>
                <td className="px-5 py-3">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold capitalize", statusTone[s.status] ?? statusTone.active)}>
                    {s.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-3 text-ink-2">{s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
