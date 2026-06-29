import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/app/AdminShell";
import { Button } from "@/components/ui/Button";
import { getAdminUser } from "@/lib/admin-data";
import { changePlan, grantCredit, setSuspended, resetUsage } from "@/app/admin/actions";
import { DemoBanner, Flash, Panel, PlanBadge, StatusBadge, relTime } from "@/components/app/admin/ui";
import { ActivityFeed } from "@/components/app/admin/ActivityFeed";

export const metadata: Metadata = { title: "Admin · User" };
export const dynamic = "force-dynamic";

const PLAN_OPTIONS = ["free", "starter", "pro", "business"];
const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default async function AdminUserPage({ params, searchParams }: { params: { id: string }; searchParams: { updated?: string } }) {
  const { user, demo } = await getAdminUser(params.id);
  if (!user) notFound();
  const pct = user.usage && user.usage.quota ? Math.round((user.usage.used / user.usage.quota) * 100) : 0;
  const suspended = user.status === "suspended";

  return (
    <AdminShell active="users">
      <Link href="/admin/users" className="text-[13.5px] font-medium text-brand-deep">← Users</Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-3xl">{user.email}</h1>
        <StatusBadge status={user.status} />
        <PlanBadge plan={user.plan} />
      </div>
      {demo && <DemoBanner />}
      {searchParams.updated && <Flash>Saved.</Flash>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Joined" value={new Date(user.created_at).toLocaleDateString()} />
        <Field label="Last active" value={relTime(user.last_seen_at)} />
        <Field label="Referral code" value={user.referral_code ?? "—"} />
        <Field label="Account credit" value={money(user.referral_credit_cents ?? 0)} />
      </div>

      {/* usage + subscription */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {user.usage ? (
          <Panel title="Usage this period">
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-ink-2">Verifications used</span>
              <span className="font-semibold tabular-nums">{user.usage.used.toLocaleString()} / {user.usage.quota.toLocaleString()}</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-sunk">
              <div className={`h-full rounded-full ${pct >= 90 ? "bg-[#A9761B]" : "bg-brand"}`} style={{ width: `${Math.min(100, pct)}%` }} />
            </div>
            <p className="mt-2 text-[12.5px] text-ink-3">{pct}% of monthly allowance</p>
          </Panel>
        ) : (
          <Panel title="Usage this period"><p className="text-[13.5px] text-ink-3">No usage recorded yet.</p></Panel>
        )}

        <Panel title="Subscription">
          {user.subscription ? (
            <div className="grid gap-2 text-[13.5px]">
              <Row label="Plan"><PlanBadge plan={user.subscription.plan} /></Row>
              <Row label="Status"><StatusBadge status={user.subscription.status} /></Row>
              <Row label="Renews">{user.subscription.current_period_end ? new Date(user.subscription.current_period_end).toLocaleDateString() : "—"}</Row>
              <Row label="Stripe customer"><span className="font-mono text-[12px] text-ink-3">{user.stripe_customer_id ?? "—"}</span></Row>
            </div>
          ) : (
            <p className="text-[13.5px] text-ink-3">No active subscription (free plan).</p>
          )}
        </Panel>
      </div>

      {/* actions */}
      <Panel title="Admin actions" className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
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
          <form action={resetUsage}>
            <input type="hidden" name="userId" value={user.id} />
            <Button type="submit" variant="ghost">Reset usage</Button>
          </form>
          <form action={setSuspended}>
            <input type="hidden" name="userId" value={user.id} />
            <input type="hidden" name="suspend" value={suspended ? "0" : "1"} />
            <Button type="submit" variant="ghost" className={suspended ? "" : "text-invalid"}>{suspended ? "Reactivate" : "Suspend"}</Button>
          </form>
        </div>
      </Panel>

      {/* activity + api */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Activity">
          <ActivityFeed events={user.events} />
        </Panel>
        <Panel title="API & payments">
          <div className="grid gap-2 text-[13.5px]">
            <Row label="Active API keys">{user.apiKeys.count}</Row>
            <Row label="API last used">{relTime(user.apiKeys.lastUsed)}</Row>
            <Row label="Payments">{user.payments.length}</Row>
            <Row label="Lifetime value">{money(user.payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0))}</Row>
          </div>
        </Panel>
      </div>

      {/* payments table */}
      <h2 className="mt-8 font-serif text-xl">Payments</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
        {user.payments.length === 0 ? (
          <p className="px-5 py-6 text-center text-[14px] text-ink-3">No payments yet.</p>
        ) : (
          <table className="w-full text-[14px]">
            <tbody>
              {user.payments.map((p) => (
                <tr key={p.id} className="border-b border-hair last:border-0">
                  <td className="px-5 py-3 text-ink-2">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3 font-semibold tabular-nums">{money(p.amount)}</td>
                  <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* verifications */}
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
      <div className="text-[12px] font-semibold uppercase tracking-wide text-ink-3">{label}</div>
      <div className="mt-1 text-[15px]">{value}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-2">{label}</span>
      <span className="font-medium">{children}</span>
    </div>
  );
}
