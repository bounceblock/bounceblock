import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/marketing/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return pageMeta({
    title: `${c.company} Case Study — ${c.industry}`,
    description: `${c.headline}. How a ${c.size.toLowerCase()} used BounceBlock to verify contacts and reach real leads.`,
    path: `/case-studies/${c.slug}`,
  });
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();
  const others = CASE_STUDIES.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Case studies", path: "/case-studies" },
        { name: c.company, path: `/case-studies/${c.slug}` },
      ])} />

      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[380px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.13),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.1),transparent_70%)] blur-2xl" />
        <Container className="relative py-14">
          <Link href="/case-studies" className="text-[13.5px] font-medium text-brand-deep">← All case studies</Link>
          <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-brand-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <Link href={`/industry/${c.industrySlug}`} className="hover:underline">{c.industry}</Link>
            <span className="text-ink-3">· {c.size}</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(28px,4.2vw,44px)] leading-[1.08]">{c.company}</h1>
          <p className="mt-4 max-w-2xl text-[18px] text-ink-2">{c.headline}.</p>
        </Container>
      </section>

      {/* results band */}
      <section className="border-b border-hair bg-sunk/30 py-10">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {c.results.map((r) => (
              <div key={r.label} className="text-center">
                <div className="font-serif text-[40px] font-semibold text-brand-deep">{r.metric}</div>
                <div className="mt-1 text-[14px] text-ink-2">{r.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-2xl">The challenge</h2>
          <div className="mt-3 grid gap-3 text-[16.5px] leading-relaxed text-ink-2">
            {c.challenge.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <h2 className="mt-10 font-serif text-2xl">What they did</h2>
          <ol className="mt-4 grid gap-3">
            {c.approach.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-[16px] text-ink-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-wash text-[13px] font-semibold text-brand-deep">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          <blockquote className="mt-10 rounded-2xl border border-brand/25 bg-brand-wash/40 p-7">
            <p className="font-serif text-[20px] leading-relaxed text-ink">&ldquo;{c.quote}&rdquo;</p>
            <footer className="mt-3 text-[14px] text-ink-2">— {c.quoteAuthor}, {c.quoteRole}</footer>
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link href={`/use-case/${c.useCaseSlug}`} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">Related use case →</Link>
            <Link href={`/industry/${c.industrySlug}`} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">BounceBlock for {c.industry} →</Link>
          </div>

          <p className="mt-8 text-[12.5px] text-ink-3">Illustrative scenario with representative numbers.</p>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <h2 className="font-serif text-2xl">More stories</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/case-studies/${o.slug}`} className="group rounded-2xl border border-hair bg-raised p-5 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40">
                <div className="text-[12px] font-semibold uppercase tracking-wide text-brand-deep">{o.industry}</div>
                <div className="mt-1.5 font-serif text-[18px] group-hover:text-brand-deep">{o.company}</div>
                <p className="mt-1 text-[13.5px] text-ink-2 line-clamp-2">{o.headline}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
