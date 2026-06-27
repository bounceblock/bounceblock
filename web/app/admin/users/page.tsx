import type { Metadata } from "next";
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

export default async function AdminUsers() {
  const { users, demo } = await getAdminUsers();

  return (
    <AdminShell active="users">
      <h1 className="font-serif text-3xl">Users</h1>
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
            {users.map((u) => (
              <tr key={u.id} className="border-b border-hair last:border-0">
                <td className="px-5 py-3 font-medium">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold capitalize", planTone[u.plan] ?? planTone.free)}>
                    {u.plan}
                  </span>
                </td>
                <td className="px-5 py-3 text-ink-2">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
