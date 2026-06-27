import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/app/AdminShell";
import { Button } from "@/components/ui/Button";
import { getAdminUser } from "@/lib/admin-data";
import { changePlan, grantCredit } from "@/app/admin/actions";
import { DemoBanner } from "@/app/admin/page";

export const metadata: Metadata = { title: "Admin · User" };
export const dynamic = "force-dynamic";

const PLAN_OPTIONS = ["free", "starter", "pro", "business"];

export default async function AdminUserPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { updated?: string };
}) {
  const { user, demo } = await getAdminUser(params.id);
  if (!user) notFound();
  const pct = user.usage && user.usage.quota ? Math.round((user.usage.used / user.usage.quota) * 100) : 0;

  return (
    <AdminShell active="users">
      <Link href="/admin/users" className="text-[13.5px] font-medium text-brand-deep">← Users</Link>
      <h1 className="mt-3 font-serif text-3xl">{user.email}</h1>
      {demo && <DemoBanner />}
      {searchParams.updated && (
        <p className="mt-4 rounded-md border border-brand/30 bg-brand-wash/60 px-4 py-2.5 text-[13px] text-brand-deep">Updated.</p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Field label="Plan" value={user.plan} />
        <Field label="Joined" value={new Date(user.created_at).toLocaleDateString()} />
        <Field label="Referral code" value={user.referral_code ?? "—"} />
      </div>

      {user.usage && (
        <div className="mt-6 rounded-xl border border-hair bg-raised p-6 shadow-s1">
          <div className="flex items-center justify-between text-[13.5px]">
            <span className="text-ink-2">Verifications this month</span>
            <span className="font-semibold tabular-nums">{user.usage.used.toLocaleString()} / {user.usage.quota.toLocaleString()}</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-sunk">
            <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-hair bg-raised p-6 shadow-s1">
        <h2 className="font-serif text-lg">Actions</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <form action={changePlan} className="flex items-center gap-2">
            <input type="hidden" name="userId" value={user.id} />
            <select name="plan" defaultValue={user.plan} className="rounded-md border border-hair bg-canvas px-3 py-2 text-[14px] capitalize outline-none focus:border-brand">
              {PLAN_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <Button type="submit" variant="ghost">Change plan</Button>
          </form>
          <form action={grantCredit}>
            <input type="hidden" name="userId" value={user.id} />
            <input type="hidden" name="cents" value="1000" />
            <Button type="submit" variant="ghost">Grant $10 credit</Button>
          </form>
        </div>
      </div>

      <h2 className="mt-8 font-serif text-xl">Recent verifications</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
        {user.verifications.length === 0 ? (
          <p className="px-5 py-6 text-center text-[14px] text-ink-3">No verifications yet.</p>
        ) : (
          <table className="w-full text-[14px]">
            <tbody>
              {user.verifications.map((v) => (
                <tr key={v.id} className="border-b border-hair last:border-0">
                  <td className="px-5 py-3 text-ink-2">{new Date(v.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3 capitalize">{v.kind}</td>
                  <td className="px-5 py-3 tabular-nums">{v.rows_processed.toLocaleString()} rows</td>
                  <td className="px-5 py-3 font-semibold">Score {v.quality_score ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-hair bg-raised p-5 shadow-s1">
      <div className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-3">{label}</div>
      <div className="mt-1 text-[15px] capitalize">{value}</div>
    </div>
  );
}
