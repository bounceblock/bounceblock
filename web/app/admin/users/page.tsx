import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminUsers } from "@/lib/admin-data";
import { DemoBanner, PlanBadge, StatusBadge, Pagination, relTime } from "@/components/app/admin/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Users" };
export const dynamic = "force-dynamic";

const PLAN_FILTERS = ["", "free", "starter", "pro", "business"];
const STATUS_FILTERS = ["", "active", "suspended"];

export default async function AdminUsers({ searchParams }: { searchParams: { q?: string; plan?: string; status?: string; page?: string } }) {
  const page = Number(searchParams.page ?? 1) || 1;
  const { users, total, pageSize, demo } = await getAdminUsers({
    q: searchParams.q,
    plan: searchParams.plan,
    status: searchParams.status,
    page,
  });

  const chip = (kind: "plan" | "status", value: string) => {
    const params = new URLSearchParams();
    if (searchParams.q) params.set("q", searchParams.q);
    if (kind === "plan" ? value : searchParams.plan) params.set("plan", kind === "plan" ? value : searchParams.plan!);
    if (kind === "status" ? value : searchParams.status) params.set("status", kind === "status" ? value : searchParams.status!);
    const qs = params.toString();
    return `/admin/users${qs ? `?${qs}` : ""}`;
  };

  return (
    <AdminShell active="users">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl">Users</h1>
        <div className="flex items-center gap-2">
        <a href="/admin/export/users" className="rounded-lg border border-hair bg-raised px-3 py-2 text-[13.5px] font-medium text-ink-2 hover:border-ink-3">Export CSV</a>
        <form className="flex items-center gap-2">
          {searchParams.plan && <input type="hidden" name="plan" value={searchParams.plan} />}
          {searchParams.status && <input type="hidden" name="status" value={searchParams.status} />}
          <input
            name="q"
            defaultValue={searchParams.q ?? ""}
            placeholder="Search email…"
            aria-label="Search users by email"
            className="rounded-lg border border-hair bg-raised px-3 py-2 text-[14px] outline-none focus:border-brand"
          />
          <button className="rounded-lg bg-ink px-3.5 py-2 text-[14px] font-semibold text-white">Search</button>
        </form>
        </div>
      </div>
      {demo && <DemoBanner />}

      <div className="mt-5 flex flex-wrap items-center gap-2 text-[12.5px]">
        <span className="text-ink-3">Plan:</span>
        {PLAN_FILTERS.map((p) => (
          <Link key={p || "all"} href={chip("plan", p)} className={cn("rounded-full px-3 py-1 font-medium capitalize", (searchParams.plan ?? "") === p ? "bg-ink text-white" : "border border-hair bg-raised text-ink-2 hover:border-ink-3")}>
            {p || "All"}
          </Link>
        ))}
        <span className="ml-3 text-ink-3">Status:</span>
        {STATUS_FILTERS.map((s) => (
          <Link key={s || "all"} href={chip("status", s)} className={cn("rounded-full px-3 py-1 font-medium capitalize", (searchParams.status ?? "") === s ? "bg-ink text-white" : "border border-hair bg-raised text-ink-2 hover:border-ink-3")}>
            {s || "All"}
          </Link>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Last active</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-6 text-center text-ink-3">No users found.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-hair last:border-0 hover:bg-sunk/40">
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/admin/users/${u.id}`} className="text-brand-deep hover:underline">{u.email}</Link>
                  </td>
                  <td className="px-5 py-3"><PlanBadge plan={u.plan} /></td>
                  <td className="px-5 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-5 py-3 text-ink-2">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3 text-ink-3">{relTime(u.last_seen_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={pageSize} total={total} basePath="/admin/users" query={{ q: searchParams.q, plan: searchParams.plan, status: searchParams.status }} />
    </AdminShell>
  );
}
