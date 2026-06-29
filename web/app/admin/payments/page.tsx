import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminPayments } from "@/lib/admin-data";
import { DemoBanner, StatusBadge, relTime } from "@/components/app/admin/ui";

export const metadata: Metadata = { title: "Admin · Payments" };
export const dynamic = "force-dynamic";

export default async function AdminPayments() {
  const { payments, demo } = await getAdminPayments();
  const collected = payments.reduce((s, p) => s + (p.status === "paid" ? p.amount : 0), 0);
  const refunded = payments.reduce((s, p) => s + (p.status === "refunded" ? p.amount : 0), 0);

  return (
    <AdminShell active="payments">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl">Payments</h1>
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-ink-2">
            Collected <b className="text-ink">${(collected / 100).toLocaleString()}</b>
            {refunded > 0 && <> · Refunded <b className="text-[#A9761B]">${(refunded / 100).toLocaleString()}</b></>}
          </span>
          <a href="/admin/export/payments" className="rounded-lg border border-hair bg-raised px-3 py-2 text-[13.5px] font-medium text-ink-2 hover:border-ink-3">Export CSV</a>
        </div>
      </div>
      {demo && <DemoBanner />}

      <div className="mt-6 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
              <th className="px-5 py-3 font-medium">When</th>
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-hair last:border-0">
                <td className="px-5 py-3 text-ink-2">{relTime(p.created_at)}</td>
                <td className="px-5 py-3 truncate text-ink-3">
                  {p.user_id ? <Link href={`/admin/users/${p.user_id}`} className="hover:text-brand-deep">{p.user_id}</Link> : "—"}
                </td>
                <td className="px-5 py-3 font-semibold tabular-nums">${(p.amount / 100).toFixed(2)}</td>
                <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
