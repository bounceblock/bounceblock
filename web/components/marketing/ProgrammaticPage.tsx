import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/marketing/SectionHead";
import { FinalCta } from "@/components/marketing/FinalCta";
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

/**
 * Generic, content-driven marketing landing used by every programmatic page
 * type (products, features, integrations, country phone pages, role pages,
 * "best X alternative" pages). One template, many data sources — the pattern
 * every competitor uses to ship hundreds of non-thin pages.
 */
export function ProgrammaticPage({ data }: { data: ProgrammaticData }) {
  return (
    <>
      <JsonLd data={faqLd(data.faq)} />
      {data.breadcrumb && <JsonLd data={breadcrumbLd(data.breadcrumb)} />}

      {/* hero */}
      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[420px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.13),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.11),transparent_70%)] blur-2xl" />
        <Container className="relative py-16">
          <span className="eyebrow">{data.eyebrow}</span>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(32px,4.8vw,52px)] leading-[1.05]">{data.h1}</h1>
          <p className="mt-5 max-w-2xl text-[18px] text-ink-2">{data.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={data.ctaHref ?? "/signup"} size="lg">{data.ctaLabel ?? "Clean my list free →"}</Button>
            <Button href="/pricing" variant="ghost" size="lg">See pricing</Button>
          </div>
          {data.heroBullets && (
            <div className="mt-5 flex flex-wrap gap-5 text-[13.3px] text-ink-3">
              {data.heroBullets.map((r) => (
                <span key={r} className="flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-brand">
                    <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {r}
                </span>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* content sections (alternating tint) */}
      {data.sections.map((s, i) => (
        <section key={s.heading} className={i % 2 === 1 ? "bg-sunk/30 py-16" : "py-16"}>
          <Container className="max-w-3xl">
            <h2 className="font-serif text-[26px] leading-tight">{s.heading}</h2>
            {s.paras?.map((p, j) => (
              <p key={j} className="mt-3 text-[16.5px] leading-relaxed text-ink-2">{p}</p>
            ))}
            {s.bullets && (
              <ul className="mt-4 grid gap-2.5">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[16px] text-ink-2">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </section>
      ))}

      {/* FAQ */}
      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHead eyebrow="Questions" title="Frequently asked" />
          <div className="grid gap-4">
            {data.faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
                <h3 className="text-[16px] font-semibold">{f.q}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* related internal links */}
      {data.related && data.related.links.length > 0 && (
        <section className="py-12">
          <Container>
            <h2 className="font-serif text-2xl">{data.related.title}</h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
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
