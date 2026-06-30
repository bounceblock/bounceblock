"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const REASSURE = ["100 free credits", "No credit card", "Results in under 2 min"];

const CHECKS = ["Format & syntax", "Mail server (MX)", "Mailbox (SMTP)", "Catch-all & disposable"];

type Verdict = { tone: "valid" | "invalid" | "unknown"; title: string; sub: string; score: number };

function classify(v: string): Verdict {
  const e = v.trim().toLowerCase();
  if (/(gmial|hotnail|yaho\.|outlok|\.con$|@@)/.test(e) || !/.+@.+\..+/.test(e))
    return { tone: "invalid", title: "Undeliverable", sub: "Likely typo — would hard bounce", score: 8 };
  if (/^(info|contact|sales|admin|hello|support)@/.test(e))
    return { tone: "unknown", title: "Catch-all", sub: "Risky — domain accepts everything", score: 54 };
  return { tone: "valid", title: "Deliverable", sub: "Safe to send · mailbox is live", score: 96 };
}

export function Hero() {
  const [value, setValue] = useState("amanda.cole@realty-group.com");
  const [done, setDone] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  function run() {
    setVerdict(null);
    setDone(0);
    CHECKS.forEach((_, i) =>
      setTimeout(() => setDone(i + 1), 260 * (i + 1))
    );
    setTimeout(() => setVerdict(classify(value)), 260 * CHECKS.length + 220);
  }

  useEffect(() => {
    const t = setTimeout(run, 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toneColor =
    verdict?.tone === "invalid" ? "text-invalid" : verdict?.tone === "unknown" ? "text-unknown" : "text-brand";

  return (
    <section className="relative overflow-hidden bg-dotgrid">
      {/* aurora */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[620px] bg-[radial-gradient(40%_50%_at_28%_28%,rgba(46,169,78,.16),transparent_70%),radial-gradient(36%_46%_at_76%_22%,rgba(27,127,212,.15),transparent_70%),radial-gradient(46%_52%_at_60%_78%,rgba(240,222,188,.30),transparent_70%)] blur-2xl" />
      <Container className="relative grid items-center gap-12 py-20 md:grid-cols-[1.05fr_.95fr]">
        <div data-reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-raised px-3.5 py-1.5 text-[12.8px] font-medium text-ink-2 shadow-s1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Email &amp; phone — verified together
          </span>
          <h1 className="mt-5 font-serif text-[clamp(40px,5.6vw,64px)] font-medium leading-[1.04] tracking-[-0.03em]">
            Your lead list is <em className="not-italic text-brand-deep">lying</em> to you.
          </h1>
          <p className="mt-5 max-w-[480px] text-[18px] text-ink-2">
            Up to <b className="text-ink">40% of your contacts are dead</b> — bad emails, disconnected numbers,
            silent duplicates. BounceBlock verifies every email <b className="text-ink">and</b> phone in one upload,
            for one flat price.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href="/signup" size="lg">Clean my list free →</Button>
            <Button href="/#how" variant="ghost" size="lg">See how it works</Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-5 text-[13.3px] text-ink-3">
            {REASSURE.map((r) => (
              <span key={r} className="flex items-center gap-1.5">
                <Check /> {r}
              </span>
            ))}
          </div>
        </div>

        {/* interactive verify widget */}
        <div data-reveal="right" style={{ ["--reveal-delay" as string]: "120ms" }} className="rounded-[26px] border border-hair bg-raised p-2.5 shadow-s3">
          <div className="flex items-center justify-between px-3.5 py-2.5">
            <span className="flex items-center gap-2 text-[12.5px] font-semibold text-ink-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" /> Live verification
            </span>
            <span className="text-[12px] text-ink-3">Try it ↓</span>
          </div>
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 rounded-[14px] border border-hair bg-canvas py-1.5 pl-3.5 pr-1.5 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand-wash">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && run()}
                spellCheck={false}
                aria-label="Email address to verify"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none"
              />
              <Button onClick={run} className="px-4 py-2 text-sm">Verify</Button>
            </div>
            <div className="mt-3.5 grid gap-0.5">
              {CHECKS.map((c, i) => (
                <div
                  key={c}
                  className={cnTone(i < done)}
                >
                  <span className={`grid h-5 w-5 place-items-center rounded-full ${i < done ? "bg-brand-wash text-brand" : "bg-sunk text-ink-3"}`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="flex-1">{c}</span>
                </div>
              ))}
            </div>
            {verdict && (
              <div className="mt-2.5 flex items-center gap-3 rounded-[14px] border border-brand/25 bg-brand-wash/60 px-4 py-3">
                <span className={`grid h-9 w-9 place-items-center rounded-[11px] text-white shadow-glow ${verdict.tone === "invalid" ? "bg-invalid shadow-none" : verdict.tone === "unknown" ? "bg-unknown shadow-none" : "bg-brand"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    {verdict.tone === "invalid" ? (
                      <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    ) : verdict.tone === "unknown" ? (
                      <path d="M12 7v6m0 4h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    ) : (
                      <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                  </svg>
                </span>
                <div className="flex-1">
                  <b className="text-[15px]">{verdict.title}</b>
                  <span className="block text-[12.8px] text-ink-2">{verdict.sub}</span>
                </div>
                <div className="text-right">
                  <b className={`block font-serif text-[26px] leading-none ${toneColor}`}>{verdict.score}</b>
                  <span className="text-[10.5px] uppercase tracking-wider text-ink-3">Score</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function cnTone(active: boolean) {
  return `flex items-center gap-2.5 px-1.5 py-2 text-[13.6px] transition-opacity ${active ? "text-ink-2 opacity-100" : "text-ink-3 opacity-40"}`;
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-brand">
      <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
