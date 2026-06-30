/**
 * Decorative "verification result" panel for programmatic page heroes.
 * Pure presentational + CSS-only motion, so it stays a server component and
 * adds zero client JS. Generic enough to sit beside any verification page.
 */
const ROWS: { v: string; tag: string; tone: "valid" | "invalid" | "unknown" }[] = [
  { v: "amanda.cole@realty-group.com", tag: "Valid", tone: "valid" },
  { v: "j.diaz@gmial.com", tag: "Typo", tone: "invalid" },
  { v: "+1 (415) 555-0182", tag: "Mobile", tone: "valid" },
  { v: "info@startup.io", tag: "Catch-all", tone: "unknown" },
];

const TAG: Record<string, string> = {
  valid: "bg-valid/12 text-valid",
  invalid: "bg-invalid/12 text-invalid",
  unknown: "bg-unknown/15 text-[#A9761B]",
};

export function HeroVisual() {
  return (
    <div className="relative animate-floaty">
      {/* glow behind the card */}
      <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(60%_60%_at_60%_30%,rgba(46,169,78,.16),transparent_70%)] blur-2xl" />
      <div className="relative rounded-[26px] border border-hair bg-raised p-2.5 shadow-s3">
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <span className="flex items-center gap-2 text-[12.5px] font-semibold text-ink-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" /> Live verification
          </span>
          <span className="rounded-full bg-brand-wash px-2 py-0.5 text-[11px] font-semibold text-brand-deep">
            99% accurate
          </span>
        </div>
        <div className="grid gap-2 px-3 pb-3">
          {ROWS.map((r) => (
            <div
              key={r.v}
              className="flex items-center gap-3 rounded-[12px] border border-hair bg-canvas px-3 py-2.5 text-[13px]"
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-wash text-brand">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5l4 4 10-10"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="min-w-0 flex-1 truncate text-ink-2">{r.v}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TAG[r.tone]}`}>
                {r.tag}
              </span>
            </div>
          ))}
          <div className="mt-1 flex items-center justify-between rounded-[14px] border border-brand/25 bg-brand-wash/60 px-4 py-3">
            <div>
              <b className="text-[14.5px]">Clean list ready</b>
              <span className="block text-[12.4px] text-ink-2">Email + phone, one pass</span>
            </div>
            <div className="text-right">
              <b className="block font-serif text-[26px] leading-none text-brand-deep">96</b>
              <span className="text-[10px] uppercase tracking-wider text-ink-3">Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
