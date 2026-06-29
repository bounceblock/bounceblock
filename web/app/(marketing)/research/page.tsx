import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { RESEARCH } from "@/lib/research";
import { getAuthor } from "@/lib/authors";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Research & Data Studies",
  description: "Original BounceBlock research on contact-data decay, email deliverability benchmarks, catch-all domains and phone data quality.",
  path: "/research",
});

export default function ResearchHub() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Data studies on contact-data quality"
        sub="Original research on how contact data decays, where bounce rates really sit, and what clean data is worth. Free to read, cite and share."
      />
      <Container className="py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {RESEARCH.map((r) => {
            const author = getAuthor(r.authorId);
            return (
              <Link
                key={r.slug}
                href={`/research/${r.slug}`}
                className="group flex flex-col rounded-2xl border border-hair bg-raised p-7 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-s2"
              >
                <span className="eyebrow">Data study</span>
                <h2 className="mt-2 font-serif text-[23px] text-ink group-hover:text-brand-deep">{r.title}</h2>
                <p className="mt-2 text-[15px] text-ink-2">{r.dek}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.stats.slice(0, 2).map((s) => (
                    <span key={s.label} className="rounded-lg border border-brand/20 bg-brand-wash/40 px-3 py-1.5 text-[12.5px] text-brand-deep">
                      <span className="font-semibold">{s.value}</span> {s.label}
                    </span>
                  ))}
                </div>
                <span className="mt-5 text-[13px] text-ink-3">{author?.name} · {new Date(r.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
              </Link>
            );
          })}
        </div>
      </Container>
      <FinalCta />
    </>
  );
}
