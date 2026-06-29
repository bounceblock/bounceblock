import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/marketing/SectionHead";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FinalCta } from "@/components/marketing/FinalCta";
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
      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[420px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.13),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.11),transparent_70%)] blur-2xl" />
        <Container className="relative py-16">
          <span className="eyebrow">{built.eyebrow}</span>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(32px,4.8vw,52px)] leading-[1.05]">{built.h1}</h1>
          <p className="mt-5 max-w-2xl text-[18px] text-ink-2">{built.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/signup" size="lg">Clean my list free →</Button>
            <Button href="/pricing" variant="ghost" size="lg">See pricing</Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-5 text-[13.3px] text-ink-3">
            {["100 free credits", "No credit card", "Results in under 2 min"].map((r) => (
              <span key={r} className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-brand">
                  <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {r}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* pain points */}
      <section className="py-20">
        <Container>
          <SectionHead eyebrow="The problem" title="What's hiding in your list" />
          <div className="grid gap-5 md:grid-cols-3">
            {built.pains.map((p) => (
              <div key={p} className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-invalid/10 text-invalid">
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
      <section className="py-20">
        <Container>
          <SectionHead eyebrow="Why BounceBlock" title="Email and phone — cleaned in one pass" />
          <div className="grid gap-5 md:grid-cols-3">
            {built.benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-hair bg-raised p-7 shadow-s1">
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

      {/* FAQ */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHead eyebrow="Questions" title="Frequently asked" />
          <div className="grid gap-4">
            {built.faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
                <h3 className="text-[16px] font-semibold">{f.q}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* related (internal links) */}
      <section className="py-12">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-2xl">{relatedTitle}</h2>
            <Link href={crossLink.href} className="text-[14px] font-medium text-brand-deep underline">
              {crossLink.label}
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
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
