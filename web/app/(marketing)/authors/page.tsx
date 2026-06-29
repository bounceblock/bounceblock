import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { AUTHORS } from "@/lib/authors";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Authors & Reviewers",
  description: "The deliverability, data-quality and compliance people behind BounceBlock's guides, tool reviews and research.",
  path: "/authors",
});

export default function AuthorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Who's behind our research"
        sub="Every guide, review and data study on BounceBlock is written or reviewed by someone who does this work for a living. Here's who."
      />
      <Container className="py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {AUTHORS.map((a) => (
            <Link
              key={a.id}
              href={`/authors/${a.id}`}
              className="group flex gap-4 rounded-2xl border border-hair bg-raised p-6 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-s2"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-wash text-[18px] font-semibold text-brand-deep">
                {a.initials}
              </span>
              <div>
                <h2 className="font-serif text-[20px] text-ink group-hover:text-brand-deep">{a.name}</h2>
                <p className="text-[13.5px] font-medium text-brand-deep">{a.role}</p>
                <p className="mt-1.5 text-[14px] text-ink-2">{a.credential}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
      <FinalCta />
    </>
  );
}
