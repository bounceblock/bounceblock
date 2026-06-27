import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { USE_CASES } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Clean email lists, verify phone numbers, reduce bounce rate, dedupe your CRM, and more.",
};

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Use cases"
        title="Every way to clean a list"
        sub="From reducing bounce rate to deduping your CRM — find the job you need done."
      />
      <Container className="py-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((e) => (
            <Link
              key={e.slug}
              href={`/use-case/${e.slug}`}
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
