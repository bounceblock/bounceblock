import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/marketing/SectionHead";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FinalCta } from "@/components/marketing/FinalCta";
import type { AltEntry } from "@/lib/seo-data";

function Cell({ v, us }: { v: string | boolean; us?: boolean }) {
  if (v === true) return <span className={us ? "font-semibold text-brand" : "text-brand"}>✓</span>;
  if (v === false) return <span className="text-ink-3 opacity-60">✕</span>;
  return <span className={us ? "font-semibold text-ink" : "text-ink-2"}>{v}</span>;
}

export function AlternativeLanding({ alt, related }: { alt: AltEntry; related: AltEntry[] }) {
  const isCredit = alt.model.toLowerCase().includes("credit") || alt.model.toLowerCase().includes("pay");
  const rows: [string, string | boolean, string | boolean][] = [
    ["Pricing model", "Flat monthly", alt.model],
    ["Phone validation", "Included", alt.phone ? "Included" : "Email-only"],
    ["Email + phone bundled", true, alt.phone],
    ["No credit math", true, isCredit ? false : "—"],
    ["Free tier", "100 / month", alt.freeTier],
    ["Clean file in under 2 min", true, true],
  ];

  const reasons = [
    { t: "Phone validation included", d: `${alt.label} verifies email${alt.phone ? "" : " only"}. BounceBlock validates phones in the same upload — no second tool.` },
    { t: "Flat pricing, no credits", d: "One simple monthly price with a generous allowance, instead of buying and tracking credits." },
    { t: "Built for small teams", d: alt.why },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[420px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.13),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.11),transparent_70%)] blur-2xl" />
        <Container className="relative py-16">
          <span className="eyebrow">Comparison</span>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(32px,4.8vw,52px)] leading-[1.05]">
            BounceBlock vs {alt.label}
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] text-ink-2">
            An honest look at how BounceBlock compares to {alt.label} — on pricing, phone validation and simplicity.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/signup" size="lg">Try BounceBlock free →</Button>
            <Button href="/pricing" variant="ghost" size="lg">See pricing</Button>
          </div>
        </Container>
      </section>

      {/* comparison table */}
      <section className="py-20">
        <Container>
          <SectionHead eyebrow="Side by side" title={`BounceBlock vs ${alt.label}`} />
          <div className="overflow-hidden rounded-[28px] border border-hair bg-raised shadow-s2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="border-b border-hair">
                    <th className="px-5 py-4" />
                    <th className="bg-brand-wash/50 px-5 py-4 text-center font-serif text-[17px] font-semibold text-brand-deep">BounceBlock</th>
                    <th className="px-5 py-4 text-center font-serif text-[17px] font-semibold text-ink-3">{alt.label}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, a, b], i) => (
                    <tr key={label} className={i < rows.length - 1 ? "border-b border-hair" : ""}>
                      <td className="px-5 py-4 text-[14px] font-medium text-ink-2">{label}</td>
                      <td className="bg-brand-wash/40 px-5 py-4 text-center text-[15px]"><Cell v={a} us /></td>
                      <td className="px-5 py-4 text-center text-[14px]"><Cell v={b} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-center text-[12.5px] text-ink-3">
            Comparison based on publicly available information and may change — please verify current details on {alt.label}&rsquo;s website.
          </p>
        </Container>
      </section>

      {/* why switch */}
      <section className="py-20">
        <Container>
          <SectionHead eyebrow="Why teams choose BounceBlock" title="Same job, fewer headaches" />
          <div className="grid gap-5 md:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.t} className="rounded-2xl border border-hair bg-raised p-7 shadow-s1">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-wash text-brand-deep">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-4 font-serif text-xl">{r.t}</h3>
                <p className="mt-1.5 text-[14.5px] text-ink-2">{r.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <HowItWorks />

      <section className="py-12">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-2xl">More comparisons</h2>
            <Link href="/alternatives" className="text-[14px] font-medium text-brand-deep underline">All alternatives →</Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/alternative/${r.slug}`}
                className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep"
              >
                vs {r.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
