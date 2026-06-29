import Link from "next/link";
import type { AdminEvent } from "@/lib/admin-data";
import { EVENT_LABELS, type EventType } from "@/lib/events";
import { relTime } from "@/components/app/admin/ui";
import { cn } from "@/lib/utils";

const DOT_TONE: Partial<Record<string, string>> = {
  signup: "bg-brand",
  payment: "bg-brand",
  subscription_created: "bg-brand",
  login: "bg-accentblue",
  verify_full: "bg-accentblue",
  verify_preview: "bg-ink-3",
  api_verify: "bg-accentblue",
  upload: "bg-ink-3",
  quota_exceeded: "bg-unknown",
  subscription_canceled: "bg-invalid",
  plan_change: "bg-unknown",
  password_reset_requested: "bg-ink-3",
};

function detail(e: AdminEvent): string {
  const m = e.metadata ?? {};
  if (typeof m.rows === "number") return `${m.rows.toLocaleString()} rows`;
  if (typeof m.amount === "number") return `$${(m.amount / 100).toFixed(2)}`;
  if (m.from && m.to) return `${m.from} → ${m.to}`;
  if (m.plan) return String(m.plan);
  if (typeof m.used === "number" && typeof m.quota === "number") return `${m.used}/${m.quota}`;
  return "";
}

export function ActivityFeed({ events }: { events: AdminEvent[] }) {
  if (events.length === 0) return <p className="px-1 py-6 text-center text-[14px] text-ink-3">No activity yet.</p>;
  return (
    <ul className="grid gap-0.5">
      {events.map((e) => {
        const label = EVENT_LABELS[e.type as EventType] ?? e.type.replace(/_/g, " ");
        const d = detail(e);
        return (
          <li key={e.id} className="flex items-center gap-3 rounded-lg px-2 py-2 text-[13.5px] hover:bg-sunk/40">
            <span className={cn("h-2 w-2 shrink-0 rounded-full", DOT_TONE[e.type] ?? "bg-ink-3")} />
            <span className="min-w-0 flex-1 truncate">
              <span className="font-medium text-ink">{label}</span>
              {d && <span className="text-ink-3"> · {d}</span>}
            </span>
            {e.user_id ? (
              <Link href={`/admin/users/${e.user_id}`} className="hidden max-w-[180px] truncate text-ink-3 hover:text-brand-deep sm:block">{e.email ?? e.user_id}</Link>
            ) : (
              <span className="hidden text-ink-3 sm:block">{e.email ?? "anon"}</span>
            )}
            <span className="shrink-0 tabular-nums text-ink-3">{relTime(e.created_at)}</span>
          </li>
        );
      })}
    </ul>
  );
}
