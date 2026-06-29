import type { Metadata } from "next";
import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { BillingPortalButton } from "@/components/billing/BillingPortalButton";
import { AppShell } from "@/components/app/AppShell";
import { ApiKeysCard } from "@/components/app/ApiKeysCard";
import { TeamCard } from "@/components/app/TeamCard";
import { logout } from "../actions";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage({ searchParams }: { searchParams: { team_invited?: string; team_removed?: string; team_demo?: string; team_error?: string } }) {
  const user = await getUser();

  let plan = "free";
  if (user && config.hasSupabase()) {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
    plan = data?.plan ?? "free";
  }
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <AppShell active="settings">
      <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-3xl">Settings</h1>
      <p className="mt-1 text-[15px] text-ink-2">Manage your account and billing.</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-hair bg-raised shadow-s1">
        <Row label="Email" value={user?.email ?? "you@company.com"} />
        <Row
          label="Plan"
          value={planLabel}
          action={
            plan !== "free" ? (
              <BillingPortalButton />
            ) : (
              <Button href="/pricing" variant="ghost">Upgrade</Button>
            )
          }
        />
      </div>

      <div className="mt-6">
        <ApiKeysCard />
      </div>

      <div className="mt-6">
        <TeamCard
          plan={plan}
          flash={{
            invited: Boolean(searchParams.team_invited),
            removed: Boolean(searchParams.team_removed),
            demo: Boolean(searchParams.team_demo),
            error: searchParams.team_error,
          }}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-hair bg-raised p-6 shadow-s1">
        <h2 className="font-serif text-lg">Sign out</h2>
        <p className="mt-1 text-[14px] text-ink-2">Sign out of BounceBlock on this device.</p>
        <form action={logout} className="mt-4">
          <Button type="submit" variant="ghost">Log out</Button>
        </form>
      </div>

      {!config.hasSupabase() && (
        <p className="mt-6 text-center text-xs text-ink-3">
          Demo settings — connect Supabase to manage real account data.
        </p>
      )}
      </div>
    </AppShell>
  );
}

function Row({ label, value, action }: { label: string; value: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hair px-6 py-5 last:border-0">
      <div>
        <div className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-3">{label}</div>
        <div className="mt-0.5 text-[15px]">{value}</div>
      </div>
      {action}
    </div>
  );
}
