import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { getCategories, getCategory, postsInCategory } from "@/lib/blog";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCategory(params.slug);
  if (!c) return {};
  return pageMeta({
    title: `${c.label} articles`,
    description: `${c.label} guides from BounceBlock — practical, no-hype articles on email, phone and data quality.`,
    path: `/blog/category/${c.slug}`,
  });
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  const posts = postsInCategory(params.slug);
  const categories = getCategories();

  return (
    <>
      <PageHero eyebrow={`Blog · ${cat.label}`} title={cat.label} sub={`${cat.count} article${cat.count === 1 ? "" : "s"} on ${cat.label.toLowerCase()}.`} />
      <Container className="py-16">
        <div className="mb-8 flex flex-wrap gap-2 text-[12.5px]">
          <Link href="/blog" className="rounded-full border border-hair bg-raised px-3 py-1 font-medium text-ink-2 hover:border-ink-3">All</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/blog/category/${c.slug}`} className={`rounded-full px-3 py-1 font-medium ${c.slug === params.slug ? "bg-ink text-white" : "border border-hair bg-raised text-ink-2 hover:border-ink-3"}`}>
              {c.label} <span className={c.slug === params.slug ? "text-white/70" : "text-ink-3"}>({c.count})</span>
            </Link>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl border border-hair bg-raised p-7 shadow-s1 transition-all hover:-translate-y-0.5 hover:shadow-s2">
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
