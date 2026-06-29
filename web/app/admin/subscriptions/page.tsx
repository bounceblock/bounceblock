import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminSubscriptions } from "@/lib/admin-data";
import { DemoBanner, StatusBadge, PlanBadge } from "@/components/app/admin/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Subscriptions" };
export const dynamic = "force-dynamic";

const STATUS_FILTERS = ["", "active", "trialing", "past_due", "canceled"];

export default async function AdminSubscriptions({ searchParams }: { searchParams: { status?: string } }) {
  const { subs, demo } = await getAdminSubscriptions(searchParams.status);

  return (
    <AdminShell active="subscriptions">
      <h1 className="font-serif text-3xl">Subscriptions</h1>
      {demo && <DemoBanner />}

      <div className="mt-5 flex flex-wrap items-center gap-2 text-[12.5px]">
        {STATUS_FILTERS.map((s) => (
          <Link
            key={s || "all"}
            href={s ? `/admin/subscriptions?status=${s}` : "/admin/subscriptions"}
            className={cn("rounded-full px-3 py-1 font-medium capitalize", (searchParams.status ?? "") === s ? "bg-ink text-white" : "border border-hair bg-raised text-ink-2 hover:border-ink-3")}
          >
            {s ? s.replace("_", " ") : "All"}
          </Link>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
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
            {subs.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-6 text-center text-ink-3">No subscriptions.</td></tr>
            ) : (
              subs.map((s) => (
                <tr key={s.id} className="border-b border-hair last:border-0">
                  <td className="px-5 py-3 truncate text-ink-3">
                    <Link href={`/admin/users/${s.user_id}`} className="hover:text-brand-deep">{s.user_id}</Link>
                  </td>
                  <td className="px-5 py-3"><PlanBadge plan={s.plan} /></td>
                  <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-3 text-ink-2">{s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
