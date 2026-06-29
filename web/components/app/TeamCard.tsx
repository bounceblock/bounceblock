import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";
import { getTeam, TEAM_LIMIT } from "@/lib/team";
import { Button } from "@/components/ui/Button";
import { inviteTeamMember, removeTeamMember } from "@/app/(app)/settings/team-actions";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  active: "bg-brand/12 text-brand-deep",
  invited: "bg-unknown/15 text-[#A9761B]",
};

export async function TeamCard({ plan, flash }: { plan: string; flash?: { invited?: boolean; removed?: boolean; demo?: boolean; error?: string } }) {
  const canManage = !config.hasSupabase() || plan === "business";

  if (!canManage) {
    return (
      <div id="team" className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
        <h2 className="font-serif text-lg">Team members</h2>
        <p className="mt-1 text-[14px] text-ink-2">Invite up to {TEAM_LIMIT} teammates to share your account. Available on the Business plan.</p>
        <div className="mt-4"><Button href="/pricing" variant="ghost">Upgrade to Business</Button></div>
      </div>
    );
  }

  const user = await getUser();
  const { members, demo } = await getTeam(user?.id ?? null);
  const atLimit = members.length >= TEAM_LIMIT;

  return (
    <div id="team" className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg">Team members</h2>
        <span className="text-[12.5px] text-ink-3">{members.length} / {TEAM_LIMIT}</span>
      </div>
      <p className="mt-1 text-[14px] text-ink-2">Invite teammates to share your account and allowance.</p>

      {flash?.invited && <p className="mt-3 rounded-md border border-brand/30 bg-brand-wash/60 px-3.5 py-2 text-[13px] text-brand-deep">Invitation sent.</p>}
      {flash?.removed && <p className="mt-3 rounded-md border border-hair bg-sunk/40 px-3.5 py-2 text-[13px] text-ink-2">Teammate removed.</p>}
      {flash?.demo && <p className="mt-3 rounded-md border border-unknown/30 bg-unknown/5 px-3.5 py-2 text-[13px] text-ink-2">Demo mode — connect Supabase to manage a real team.</p>}
      {flash?.error && <p className="mt-3 rounded-md border border-invalid/30 bg-invalid/5 px-3.5 py-2 text-[13px] text-invalid">{flash.error}</p>}

      <div className="mt-4 divide-y divide-hair">
        {members.length === 0 ? (
          <p className="py-4 text-[14px] text-ink-3">No teammates yet — invite your first below.</p>
        ) : (
          members.map((m) => (
            <div key={m.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <div className="truncate text-[14.5px] font-medium">{m.email}</div>
                <div className="text-[12.5px] capitalize text-ink-3">{m.role}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn("rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold capitalize", statusTone[m.status] ?? statusTone.invited)}>{m.status}</span>
                <form action={removeTeamMember}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className="text-[13px] font-medium text-invalid hover:underline">Remove</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>

      <form action={inviteTeamMember} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          name="email"
          type="email"
          required
          placeholder="teammate@yourcompany.com"
          aria-label="Teammate email"
          disabled={atLimit}
          className="flex-1 rounded-lg border border-hair bg-canvas px-3.5 py-2.5 text-[14px] outline-none focus:border-brand disabled:opacity-60"
        />
        <Button type="submit" variant="ghost">{atLimit ? "Limit reached" : "Invite"}</Button>
      </form>
      {demo && !flash && <p className="mt-2 text-[12px] text-ink-3">Demo team — connect Supabase to manage real teammates.</p>}
    </div>
  );
}
