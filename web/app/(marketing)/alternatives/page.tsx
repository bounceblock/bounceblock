import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { ALTERNATIVES } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Alternatives & Comparisons",
  description: "Honest comparisons of BounceBlock vs ZeroBounce, NeverBounce, Hunter, Bouncer and more.",
};

export default function AlternativesPage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="BounceBlock vs the alternatives"
        sub="Most verification tools are email-only and credit-metered. See honest, side-by-side comparisons."
      />
      <Container className="py-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALTERNATIVES.map((e) => (
            <Link
              key={e.slug}
              href={`/alternative/${e.slug}`}
              className="group flex items-center justify-between rounded-xl border border-hair bg-raised p-5 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-s2"
            >
              <span className="font-serif text-[18px] group-hover:text-brand-deep">vs {e.label}</span>
              <span className="text-brand-deep">→</span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
