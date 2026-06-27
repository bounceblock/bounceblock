import type { Metadata } from "next";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminPayments } from "@/lib/admin-data";
import { DemoBanner } from "@/app/admin/page";

export const metadata: Metadata = { title: "Admin · Payments" };
export const dynamic = "force-dynamic";

export default async function AdminPayments() {
  const { payments, demo } = await getAdminPayments();
  const total = payments.reduce((s, p) => s + (p.status === "paid" ? p.amount : 0), 0);

  return (
    <AdminShell active="payments">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl">Payments</h1>
        <span className="text-[14px] text-ink-2">Collected: <b className="text-ink">${(total / 100).toLocaleString()}</b></span>
      </div>
      {demo && <DemoBanner />}

      <div className="mt-6 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-hair last:border-0">
                <td className="px-5 py-3 text-ink-2">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-3 truncate text-ink-3">{p.user_id ?? "—"}</td>
                <td className="px-5 py-3 font-semibold tabular-nums">${(p.amount / 100).toFixed(2)}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-brand/12 px-2.5 py-0.5 text-[11.5px] font-semibold capitalize text-brand-deep">{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
