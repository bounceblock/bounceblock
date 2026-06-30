import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const BARS = [
  { k: "Valid", w: 64, c: "var(--valid)" },
  { k: "Catch-all / unknown", w: 14, c: "var(--unknown)" },
  { k: "Invalid", w: 15, c: "var(--invalid)" },
  { k: "Duplicate", w: 7, c: "var(--ink-3)" },
];

const POINTS = [
  ["Deliverability check", "on every email — valid, invalid, or catch-all."],
  ["Phone validation", "with line type (mobile / landline) and active status."],
  ["Smart deduplication", "that catches the same contact across columns."],
];

export function ValueMoment() {
  return (
    <section className="py-20">
      <Container className="grid items-center gap-12 md:grid-cols-[1.04fr_.96fr]">
        <div data-reveal="left" className="rounded-[26px] border border-hair bg-raised p-7 shadow-s3">
          <div className="flex items-center gap-6 border-b border-hair pb-6">
            <div className="relative h-[118px] w-[118px] shrink-0">
              <svg width="118" height="118" viewBox="0 0 118 118">
                <circle cx="59" cy="59" r="49" fill="none" stroke="#EDE8DE" strokeWidth="12" />
                <circle
                  cx="59" cy="59" r="49" fill="none" stroke="url(#vmg)" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray="308" strokeDashoffset="86" transform="rotate(-90 59 59)"
                />
                <defs>
                  <linearGradient id="vmg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2EA94E" />
                    <stop offset="1" stopColor="#1B7FD4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <b className="block font-serif text-[34px] font-semibold leading-none">72</b>
                  <span className="text-[10.5px] uppercase tracking-wider text-ink-3">Quality</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl">Your list, scored</h3>
              <p className="mt-1 text-[14px] text-ink-2">4,812 contacts analyzed · 1,034 problems found</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3.5">
            {BARS.map((b) => (
              <div key={b.k} className="grid grid-cols-[140px_1fr_44px] items-center gap-3 text-[13.4px]">
                <span className="flex items-center gap-2 font-medium text-ink-2">
                  <i className="h-2.5 w-2.5 rounded-full" style={{ background: b.c }} />
                  {b.k}
                </span>
                <span className="h-2.5 overflow-hidden rounded-full bg-sunk">
                  <span className="block h-full rounded-full" style={{ width: `${b.w}%`, background: b.c }} />
                </span>
                <span className="text-right font-semibold tabular-nums">{b.w}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-brand/25 bg-brand-wash/60 px-5 py-4">
            <div>
              <b className="text-[15px]">3,081 clean leads ready</b>
              <span className="block text-[12.8px] text-ink-2">Unlock the full verified file + downloads</span>
            </div>
            <Button href="/signup">Get full results</Button>
          </div>
        </div>

        <div data-reveal="right" style={{ ["--reveal-delay" as string]: "100ms" }}>
          <span className="eyebrow">The value moment</span>
          <h2 className="mt-3 font-serif text-[clamp(28px,3.7vw,42px)]">
            See exactly what&rsquo;s wrong<br />before you pay a cent.
          </h2>
          <p className="mt-4 max-w-[436px] text-[17px] text-ink-2">
            Run a free preview on your first 100 leads and watch BounceBlock surface the bad data hiding in your
            list — typo&rsquo;d emails, disconnected numbers, catch-all domains, and silent duplicates.
          </p>
          <ul className="mt-6 grid gap-3.5">
            {POINTS.map(([t, d]) => (
              <li key={t} className="flex items-start gap-3 text-[15.4px]">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-wash text-brand-deep">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span><b>{t}</b> {d}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
