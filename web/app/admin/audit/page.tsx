import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminAudit } from "@/lib/admin-data";
import { DemoBanner, relTime } from "@/components/app/admin/ui";
import { ACTION_LABELS, type AdminAction } from "@/lib/admin-audit";

export const metadata: Metadata = { title: "Admin · Audit log" };
export const dynamic = "force-dynamic";

function detail(d: Record<string, unknown>): string {
  if (d.from && d.to) return `${d.from} → ${d.to}`;
  if (typeof d.cents === "number") return `$${(d.cents / 100).toFixed(2)}`;
  if (typeof d.quota === "number") return `quota ${d.quota.toLocaleString()}`;
  if (typeof d.reason === "string") return d.reason;
  return "";
}

export default async function AdminAudit() {
  const { audit, demo } = await getAdminAudit(200);

  return (
    <AdminShell active="audit">
      <h1 className="font-serif text-3xl">Audit log</h1>
      <p className="mt-2 text-[14px] text-ink-2">Every privileged admin action — who did what, to whom.</p>
      {demo && <DemoBanner />}

      <div className="mt-6 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
              <th className="px-5 py-3 font-medium">When</th>
              <th className="px-5 py-3 font-medium">Admin</th>
              <th className="px-5 py-3 font-medium">Action</th>
              <th className="px-5 py-3 font-medium">Target</th>
              <th className="px-5 py-3 font-medium">Detail</th>
            </tr>
          </thead>
          <tbody>
            {audit.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-6 text-center text-ink-3">No admin actions recorded yet.</td></tr>
            ) : (
              audit.map((a) => (
                <tr key={a.id} className="border-b border-hair last:border-0">
                  <td className="px-5 py-3 text-ink-2">{relTime(a.created_at)}</td>
                  <td className="px-5 py-3 text-ink-2">{a.admin_email}</td>
                  <td className="px-5 py-3 font-medium">{ACTION_LABELS[a.action as AdminAction] ?? a.action}</td>
                  <td className="px-5 py-3 text-ink-3">
                    {a.target_user_id ? (
                      <Link href={`/admin/users/${a.target_user_id}`} className="hover:text-brand-deep">{a.target_email ?? a.target_user_id}</Link>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-3 text-ink-3">{detail(a.detail)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
