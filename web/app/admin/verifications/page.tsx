import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminVerifications } from "@/lib/admin-data";
import { DemoBanner, relTime } from "@/components/app/admin/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Verifications" };
export const dynamic = "force-dynamic";

export default async function AdminVerifications() {
  const { vers, demo } = await getAdminVerifications();
  const totalRows = vers.reduce((s, v) => s + v.rows_processed, 0);
  const fullCount = vers.filter((v) => v.kind === "full").length;

  return (
    <AdminShell active="verifications">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl">Verifications</h1>
        <span className="text-[14px] text-ink-2">
          <b className="text-ink">{vers.length}</b> jobs · <b className="text-ink">{fullCount}</b> full · <b className="text-ink">{totalRows.toLocaleString()}</b> rows
        </span>
      </div>
      {demo && <DemoBanner />}

      <div className="mt-6 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
              <th className="px-5 py-3 font-medium">When</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Rows</th>
              <th className="px-5 py-3 font-medium">Quality</th>
              <th className="px-5 py-3 font-medium">User</th>
            </tr>
          </thead>
          <tbody>
            {vers.map((v) => (
              <tr key={v.id} className="border-b border-hair last:border-0">
                <td className="px-5 py-3 text-ink-2">{relTime(v.created_at)}</td>
                <td className="px-5 py-3">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold capitalize", v.kind === "full" ? "bg-brand/12 text-brand-deep" : "bg-ink/[.06] text-ink-2")}>
                    {v.kind}
                  </span>
                </td>
                <td className="px-5 py-3 tabular-nums">{v.rows_processed.toLocaleString()}</td>
                <td className="px-5 py-3 font-semibold">{v.quality_score ?? "—"}</td>
                <td className="px-5 py-3 truncate text-ink-3">
                  {v.user_id ? <Link href={`/admin/users/${v.user_id}`} className="hover:text-brand-deep">{v.user_id}</Link> : "anon"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
