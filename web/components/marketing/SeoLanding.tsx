import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/marketing/SectionHead";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FinalCta } from "@/components/marketing/FinalCta";
import { HeroVisual } from "@/components/marketing/HeroVisual";
import { StatsBand } from "@/components/marketing/StatsBand";
import { JsonLd } from "@/components/JsonLd";
import { faqLd, breadcrumbLd } from "@/lib/jsonld";
import type { BuiltPage } from "@/lib/seo-content";

export function SeoLanding({
  built,
  related,
  relatedBase,
  relatedTitle,
  crossLink,
  breadcrumb,
}: {
  built: BuiltPage;
  related: Array<{ slug: string; label: string }>;
  relatedBase: string;
  relatedTitle: string;
  crossLink: { href: string; label: string };
  breadcrumb?: { name: string; path: string }[];
}) {
  return (
    <>
      <JsonLd data={faqLd(built.faq)} />
      {breadcrumb && <JsonLd data={breadcrumbLd(breadcrumb)} />}

      {/* hero */}
      <section className="relative overflow-hidden border-b border-hair bg-dotgrid">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[460px] bg-[radial-gradient(40%_60%_at_26%_26%,rgba(46,169,78,.15),transparent_70%),radial-gradient(36%_50%_at_78%_20%,rgba(27,127,212,.12),transparent_70%),radial-gradient(40%_46%_at_60%_82%,rgba(240,222,188,.24),transparent_70%)] blur-2xl" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-raised px-3.5 py-1.5 text-[12.5px] font-medium text-ink-2 shadow-s1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {built.eyebrow}
            </span>
            <h1 className="mt-5 max-w-2xl font-serif text-[clamp(32px,4.8vw,52px)] leading-[1.05]">{built.h1}</h1>
            <p className="mt-5 max-w-xl text-[18px] text-ink-2">{built.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/signup" size="lg">Clean my list free →</Button>
              <Button href="/pricing" variant="ghost" size="lg">See pricing</Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-5 text-[13.3px] text-ink-3">
              {["100 free credits", "No credit card", "Results in under 2 min"].map((r) => (
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

      {/* pain points */}
      <section className="py-20">
        <Container>
          <SectionHead eyebrow="The problem" title="What's hiding in your list" />
          <div className="grid gap-5 md:grid-cols-3">
            {built.pains.map((p, i) => (
              <div
                key={p}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="lift rounded-2xl border border-hair bg-raised p-6 shadow-s1 hover:border-invalid/30 hover:shadow-s2"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-invalid/10 text-invalid">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v5m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <p className="mt-3 text-[15px] text-ink-2">{p}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* benefits */}
      <section className="bg-sunk/40 py-20">
        <Container>
          <SectionHead eyebrow="Why BounceBlock" title="Email and phone — cleaned in one pass" />
          <div className="grid gap-5 md:grid-cols-3">
            {built.benefits.map((b, i) => (
              <div
                key={b.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="lift rounded-2xl border border-hair bg-raised p-7 shadow-s1 hover:border-brand/40 hover:shadow-s2"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-wash text-brand-deep">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-4 font-serif text-xl">{b.title}</h3>
                <p className="mt-1.5 text-[14.5px] text-ink-2">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <HowItWorks />

      {/* social proof */}
      <section className="pb-4">
        <Container>
          <figure
            data-reveal="scale"
            className="relative mx-auto max-w-3xl overflow-hidden rounded-[26px] border border-hair bg-gradient-to-br from-tint to-brand-wash/60 px-8 py-10 text-center shadow-s2"
          >
            <div className="text-[15px] tracking-[3px] text-brand">★★★★★</div>
            <blockquote className="mt-4 font-serif text-[clamp(20px,2.6vw,27px)] leading-[1.4] text-ink">
              “BounceBlock cut our bounce rate from 14% to under 2% on the first upload — and it caught dead phone numbers nothing else did.”
            </blockquote>
            <figcaption className="mt-5 text-[13.5px] text-ink-2">
              <b className="text-ink">Maya Okafor</b> · Head of Sales Ops, Northwind Realty
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHead eyebrow="Questions" title="Frequently asked" />
          <div className="grid gap-3">
            {built.faq.map((f, i) => (
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

      {/* related (internal links) */}
      <section className="py-12">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3" data-reveal>
            <h2 className="font-serif text-2xl">{relatedTitle}</h2>
            <Link href={crossLink.href} className="text-[14px] font-medium text-brand-deep underline">
              {crossLink.label}
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5" data-reveal>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`${relatedBase}/${r.slug}`}
                className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
