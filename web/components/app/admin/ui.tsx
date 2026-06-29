import Link from "next/link";
import { cn } from "@/lib/utils";

/** Shown when admin pages render demo data (no Supabase service role yet). */
export function DemoBanner() {
  return (
    <p className="mt-4 rounded-md border border-unknown/30 bg-unknown/5 px-4 py-2.5 text-[13px] text-ink-2">
      ● Demo data — add <code className="font-mono text-[12px]">SUPABASE_SERVICE_ROLE_KEY</code> to show live metrics.
    </p>
  );
}

/** Updated/confirmation flash. */
export function Flash({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded-md border border-brand/30 bg-brand-wash/60 px-4 py-2.5 text-[13px] text-brand-deep">{children}</p>
  );
}

export function KpiCard({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "default" | "warn" | "good" }) {
  return (
    <div className="rounded-xl border border-hair bg-raised p-5 shadow-s1">
      <div className="text-[12px] font-semibold uppercase tracking-wide text-ink-3">{label}</div>
      <div className={cn(
        "mt-1.5 font-serif text-[28px] font-semibold leading-none",
        tone === "warn" ? "text-[#A9761B]" : tone === "good" ? "text-brand-deep" : "text-ink"
      )}>{value}</div>
      {sub && <div className="mt-1.5 text-[12.5px] text-ink-3">{sub}</div>}
    </div>
  );
}

/** A titled card container. */
export function Panel({ title, right, children, className }: { title?: string; right?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-hair bg-raised p-6 shadow-s1", className)}>
      {(title || right) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="font-serif text-xl">{title}</h2>}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

const STATUS_TONE: Record<string, string> = {
  active: "bg-brand/12 text-brand-deep",
  paid: "bg-brand/12 text-brand-deep",
  good: "bg-brand/12 text-brand-deep",
  trialing: "bg-accentblue/12 text-accentblue-deep",
  past_due: "bg-unknown/15 text-[#A9761B]",
  suspended: "bg-unknown/15 text-[#A9761B]",
  refunded: "bg-unknown/15 text-[#A9761B]",
  canceled: "bg-invalid/12 text-invalid",
  failed: "bg-invalid/12 text-invalid",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold capitalize", STATUS_TONE[status] ?? "bg-ink/[.06] text-ink-2")}>
      {status.replace("_", " ")}
    </span>
  );
}

const PLAN_TONE: Record<string, string> = {
  free: "bg-ink/[.06] text-ink-2",
  starter: "bg-accentblue/12 text-accentblue-deep",
  pro: "bg-brand/12 text-brand-deep",
  business: "bg-unknown/15 text-[#A9761B]",
};

export function PlanBadge({ plan }: { plan: string }) {
  return <span className={cn("rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold capitalize", PLAN_TONE[plan] ?? PLAN_TONE.free)}>{plan}</span>;
}

/**
 * Dependency-free dual-metric bar chart (signups + revenue) rendered as CSS bars.
 * Heights are normalised against each series' own max.
 */
export function TrendBars({ data }: { data: { date: string; signups: number; revenue: number }[] }) {
  const maxS = Math.max(1, ...data.map((d) => d.signups));
  const maxR = Math.max(1, ...data.map((d) => d.revenue));
  return (
    <div>
      <div className="flex items-end gap-1.5" style={{ height: 132 }}>
        {data.map((d) => (
          <div key={d.date} className="group relative flex flex-1 flex-col items-center justify-end gap-0.5">
            <span className="w-full rounded-sm bg-brand/80" style={{ height: `${(d.signups / maxS) * 88}%` }} />
            <span className="w-full rounded-sm bg-accentblue/35" style={{ height: `${(d.revenue / maxR) * 30}%` }} />
            <span className="pointer-events-none absolute -top-9 z-10 hidden whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] text-white group-hover:block">
              {new Date(d.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })} · {d.signups} signups · ${(d.revenue / 100).toFixed(0)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4 text-[12px] text-ink-3">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-brand/80" /> Signups</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-accentblue/35" /> Revenue</span>
        <span className="ml-auto tabular-nums">{data[0]?.date.slice(5)} → {data[data.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}

/** Relative-time label, e.g. "3h ago". Pure function — safe in a server component. */
export function relTime(iso: string | null): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

/** Pager for list pages. */
export function Pagination({ page, pageSize, total, basePath, query }: { page: number; pageSize: number; total: number; basePath: string; query: Record<string, string | undefined> }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  const link = (p: number) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => { if (v) params.set(k, v); });
    params.set("page", String(p));
    return `${basePath}?${params.toString()}`;
  };
  return (
    <div className="mt-4 flex items-center justify-between text-[13px] text-ink-2">
      <span>Page {page} of {pages} · {total.toLocaleString()} total</span>
      <div className="flex gap-2">
        {page > 1 && <Link href={link(page - 1)} className="rounded-lg border border-hair bg-raised px-3 py-1.5 font-medium hover:border-ink-3">← Prev</Link>}
        {page < pages && <Link href={link(page + 1)} className="rounded-lg border border-hair bg-raised px-3 py-1.5 font-medium hover:border-ink-3">Next →</Link>}
      </div>
    </div>
  );
}
