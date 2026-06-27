import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { INDUSTRIES } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Industries",
  description: "Lead verification for real estate, insurance, recruiting and dozens more industries.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Clean leads for every industry"
        sub="Whatever you sell, your list goes stale. See how BounceBlock cleans lead lists for teams like yours."
      />
      <Container className="py-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((e) => (
            <Link
              key={e.slug}
              href={`/industry/${e.slug}`}
              className="group rounded-xl border border-hair bg-raised p-5 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-s2"
            >
              <h3 className="font-serif text-[18px] group-hover:text-brand-deep">{e.label}</h3>
              <p className="mt-1 line-clamp-2 text-[13.5px] text-ink-2">{e.pain}</p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
