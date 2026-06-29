import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { CASE_STUDIES } from "@/lib/case-studies";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Case Studies",
  description: "How sales, recruiting, insurance and nonprofit teams cut bounce rates and reconnected with real leads using BounceBlock.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Real teams. Real bounce rates, fixed."
        sub="How marketing, sales, recruiting and nonprofit teams use BounceBlock to stop chasing dead leads."
      />
      <Container className="py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {CASE_STUDIES.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="group flex flex-col rounded-2xl border border-hair bg-raised p-7 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-s2"
            >
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-brand-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {c.industry}
              </div>
              <h2 className="mt-2 font-serif text-2xl text-ink group-hover:text-brand-deep">{c.company}</h2>
              <p className="mt-2 text-[15px] text-ink-2">{c.headline}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.results.map((r) => (
                  <span key={r.label} className="rounded-lg border border-brand/20 bg-brand-wash/40 px-3 py-1.5 text-[12.5px] text-brand-deep">
                    <span className="font-semibold">{r.metric}</span> {r.label}
                  </span>
                ))}
              </div>
              <span className="mt-5 text-[13.5px] font-medium text-brand-deep">Read the story →</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-[13px] text-ink-3">Illustrative scenarios with representative numbers. Replace with real customer stories before launch.</p>
      </Container>
      <FinalCta />
    </>
  );
}
