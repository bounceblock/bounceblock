import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/marketing/SectionHead";
import { FinalCta } from "@/components/marketing/FinalCta";
import { HeroVisual } from "@/components/marketing/HeroVisual";
import { StatsBand } from "@/components/marketing/StatsBand";
import { JsonLd } from "@/components/JsonLd";
import { faqLd, breadcrumbLd } from "@/lib/jsonld";

export interface ProgrammaticSection {
  heading: string;
  paras?: string[];
  bullets?: string[];
}

export interface ProgrammaticData {
  eyebrow: string;
  h1: string;
  intro: string;
  heroBullets?: string[];
  sections: ProgrammaticSection[];
  faq: { q: string; a: string }[];
  related?: { title: string; links: { href: string; label: string }[] };
  breadcrumb?: { name: string; path: string }[];
  ctaHref?: string;
  ctaLabel?: string;
}

const DEFAULT_BULLETS = ["100 free credits", "No credit card", "Results in under 2 min"];

/**
 * Generic, content-driven marketing landing used by every programmatic page
 * type (products, features, integrations, country phone pages, role pages,
 * "best X alternative" pages). One template, many data sources — the pattern
 * every competitor uses to ship hundreds of non-thin pages.
 */
export function ProgrammaticPage({ data }: { data: ProgrammaticData }) {
  const heroBullets = data.heroBullets ?? DEFAULT_BULLETS;
  return (
    <>
      <JsonLd data={faqLd(data.faq)} />
      {data.breadcrumb && <JsonLd data={breadcrumbLd(data.breadcrumb)} />}

      {/* hero — split layout with a decorative result panel */}
      <section className="relative overflow-hidden border-b border-hair bg-dotgrid">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[460px] bg-[radial-gradient(40%_60%_at_26%_26%,rgba(46,169,78,.15),transparent_70%),radial-gradient(36%_50%_at_78%_20%,rgba(27,127,212,.13),transparent_70%),radial-gradient(40%_46%_at_60%_82%,rgba(240,222,188,.26),transparent_70%)] blur-2xl" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-raised px-3.5 py-1.5 text-[12.5px] font-medium text-ink-2 shadow-s1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {data.eyebrow}
            </span>
            <h1 className="mt-5 max-w-2xl font-serif text-[clamp(32px,4.8vw,52px)] leading-[1.05]">{data.h1}</h1>
            <p className="mt-5 max-w-xl text-[18px] text-ink-2">{data.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={data.ctaHref ?? "/signup"} size="lg">{data.ctaLabel ?? "Clean my list free →"}</Button>
              <Button href="/pricing" variant="ghost" size="lg">See pricing</Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-5 text-[13.3px] text-ink-3">
              {heroBullets.map((r) => (
                <span key={r} className="flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-brand">
                    <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div data-reveal="right" className="hidden lg:block" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* trust strip */}
      <StatsBand />

      {/* content sections — bullets become an icon-card grid, prose gets a framed panel */}
      {data.sections.map((s, i) => (
        <section key={s.heading} className={i % 2 === 1 ? "bg-sunk/40 py-16" : "py-16"}>
          <Container>
            <div className="mx-auto max-w-3xl" data-reveal>
              <div className="h-0.5 w-8 rounded bg-brand" />
              <h2 className="mt-4 font-serif text-[clamp(24px,3.2vw,32px)] leading-tight">{s.heading}</h2>
              {s.paras?.map((p, j) => (
                <p key={j} className="mt-3 text-[16.5px] leading-relaxed text-ink-2">{p}</p>
              ))}
            </div>
            {s.bullets && s.bullets.length > 0 && (
              <div className="mx-auto mt-7 grid max-w-4xl gap-4 sm:grid-cols-2">
                {s.bullets.map((b, j) => (
                  <div
                    key={j}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${Math.min(j, 5) * 70}ms` }}
                    className="lift flex items-start gap-3.5 rounded-2xl border border-hair bg-raised p-5 shadow-s1 hover:border-brand/40 hover:shadow-s2"
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[11px] bg-brand-wash text-brand-deep">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[15.5px] leading-relaxed text-ink-2">{b}</span>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>
      ))}

      {/* mid-page CTA band */}
      <section className="py-4">
        <Container>
          <div
            data-reveal="scale"
            className="relative overflow-hidden rounded-[26px] border border-brand/20 bg-gradient-to-br from-brand-wash via-tint to-raised px-7 py-9 sm:px-10"
          >
            <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(46,169,78,.22),transparent)] blur-xl" />
            <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-serif text-[clamp(22px,3vw,30px)] leading-tight">Ready to see what&rsquo;s hiding in your list?</h2>
                <p className="mt-2 max-w-xl text-[15.5px] text-ink-2">Upload a file and preview your first 100 verifications free — email and phone, in one pass.</p>
              </div>
              <Button href={data.ctaHref ?? "/signup"} size="lg" className="shrink-0">{data.ctaLabel ?? "Clean my list free →"}</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ — native accordion (content stays in the DOM for crawlers) */}
      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHead eyebrow="Questions" title="Frequently asked" />
          <div className="grid gap-3">
            {data.faq.map((f, i) => (
              <details
                key={f.q}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${Math.min(i, 6) * 50}ms` }}
                className="group overflow-hidden rounded-[16px] border border-hair bg-raised shadow-s1 open:shadow-s2"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[16px] font-semibold marker:hidden">
                  {f.q}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-180 group-open:text-brand">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* related internal links */}
      {data.related && data.related.links.length > 0 && (
        <section className="py-12">
          <Container>
            <h2 className="font-serif text-2xl" data-reveal>{data.related.title}</h2>
            <div className="mt-5 flex flex-wrap gap-2.5" data-reveal>
              {data.related.links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">
                  {l.label}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <FinalCta />
    </>
  );
}
