import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { POSTS, getCategories } from "@/lib/blog";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description: "Guides on email deliverability, list hygiene, phone validation and lead verification.",
  path: "/blog",
});

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  const categories = getCategories();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Deliverability, decoded"
        sub="Practical guides on bounce rates, sender reputation, phone validation and keeping your lead lists clean."
      />
      <Container className="py-16">
        <div className="mb-8 flex flex-wrap gap-2 text-[12.5px]">
          <span className="rounded-full bg-ink px-3 py-1 font-medium text-white">All</span>
          {categories.map((c) => (
            <Link key={c.slug} href={`/blog/category/${c.slug}`} className="rounded-full border border-hair bg-raised px-3 py-1 font-medium text-ink-2 hover:border-ink-3">
              {c.label} <span className="text-ink-3">({c.count})</span>
            </Link>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-hair bg-raised p-7 shadow-s1 transition-all hover:-translate-y-0.5 hover:shadow-s2"
            >
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-brand-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {p.category}
              </div>
              <h2 className="mt-2.5 font-serif text-[22px] leading-snug group-hover:text-brand-deep">{p.title}</h2>
              <p className="mt-2 text-[14.5px] text-ink-2">{p.description}</p>
              <div className="mt-4 text-[12.5px] text-ink-3">{fmt(p.date)} · {p.readMins} min read</div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
