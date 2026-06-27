"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const STATS = [
  { n: 312, suffix: "M+", d: "Emails & phones verified" },
  { n: 41, suffix: "M", d: "Bad contacts caught before send" },
  { n: 99, suffix: "%", d: "Verification accuracy" },
  { n: 2, suffix: " min", d: "Average list clean-up time" },
];

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [vals, setVals] = useState<number[]>(STATS.map(() => 0));
  const [tick, setTick] = useState(1284503);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const dur = 1500;
          const t0 = performance.now();
          const ease = (t: number) => 1 - Math.pow(1 - t, 3);
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setVals(STATS.map((s) => Math.floor(ease(p) * s.n)));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + Math.floor(Math.random() * 7) + 1), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-14">
      <Container>
        <div
          ref={ref}
          className="relative grid grid-cols-2 gap-7 overflow-hidden rounded-[28px] border border-hair bg-gradient-to-b from-tint to-sunk p-12 md:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div key={s.d} className="text-center">
              <div className="font-serif text-[clamp(34px,4vw,48px)] font-semibold tracking-tight text-brand-deep">
                {vals[i].toLocaleString()}
                <span>{s.suffix}</span>
              </div>
              <div className="mt-1.5 text-[13.6px] text-ink-2">{s.d}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-[13.5px] text-ink-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
          <b className="font-bold tabular-nums text-brand-deep">{tick.toLocaleString()}</b> contacts verified this week — and counting
        </div>
      </Container>
    </section>
  );
}
