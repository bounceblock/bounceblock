import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminUsers } from "@/lib/admin-data";
import { DemoBanner } from "@/app/admin/page";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Users" };
export const dynamic = "force-dynamic";

const planTone: Record<string, string> = {
  free: "bg-ink/[.06] text-ink-2",
  starter: "bg-accentblue/12 text-accentblue-deep",
  pro: "bg-brand/12 text-brand-deep",
  business: "bg-unknown/15 text-[#A9761B]",
};

export default async function AdminUsers({ searchParams }: { searchParams: { q?: string } }) {
  const { users, demo } = await getAdminUsers(searchParams.q);

  return (
    <AdminShell active="users">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl">Users</h1>
        <form className="flex items-center gap-2">
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
      {demo && <DemoBanner />}

      <div className="mt-6 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={3} className="px-5 py-6 text-center text-ink-3">No users found.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-hair last:border-0 hover:bg-sunk/40">
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/admin/users/${u.id}`} className="text-brand-deep hover:underline">{u.email}</Link>
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold capitalize", planTone[u.plan] ?? planTone.free)}>{u.plan}</span>
                  </td>
                  <td className="px-5 py-3 text-ink-2">{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
