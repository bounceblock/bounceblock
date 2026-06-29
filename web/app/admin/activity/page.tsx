import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/app/AdminShell";
import { getAdminActivity } from "@/lib/admin-data";
import { DemoBanner, Panel } from "@/components/app/admin/ui";
import { ActivityFeed } from "@/components/app/admin/ActivityFeed";
import { EVENT_LABELS, type EventType } from "@/lib/events";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Activity" };
export const dynamic = "force-dynamic";

const FILTERS: { value: string; label: string }[] = [
  { value: "", label: "All" },
  { value: "signup", label: "Signups" },
  { value: "login", label: "Logins" },
  { value: "verify_full", label: "Full runs" },
  { value: "verify_preview", label: "Previews" },
  { value: "payment", label: "Payments" },
  { value: "plan_change", label: "Plan changes" },
  { value: "quota_exceeded", label: "Quota hits" },
  { value: "api_verify", label: "API" },
];

export default async function AdminActivity({ searchParams }: { searchParams: { type?: string } }) {
  const { events, demo } = await getAdminActivity(searchParams.type, 200);

  return (
    <AdminShell active="activity">
      <h1 className="font-serif text-3xl">Activity</h1>
      <p className="mt-2 text-[14px] text-ink-2">Everything happening across the product, newest first.</p>
      {demo && <DemoBanner />}

      <div className="mt-5 flex flex-wrap items-center gap-2 text-[12.5px]">
        {FILTERS.map((f) => (
          <Link
            key={f.value || "all"}
            href={f.value ? `/admin/activity?type=${f.value}` : "/admin/activity"}
            className={cn("rounded-full px-3 py-1 font-medium", (searchParams.type ?? "") === f.value ? "bg-ink text-white" : "border border-hair bg-raised text-ink-2 hover:border-ink-3")}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <Panel className="mt-5">
        <ActivityFeed events={events} />
      </Panel>

      {searchParams.type && events.length === 0 && (
        <p className="mt-4 text-[13.5px] text-ink-3">No “{EVENT_LABELS[searchParams.type as EventType] ?? searchParams.type}” events yet.</p>
      )}
    </AdminShell>
  );
}
