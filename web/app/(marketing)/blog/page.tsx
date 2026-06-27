import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on email deliverability, list hygiene and lead verification.",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Deliverability, decoded"
        sub="Practical guides on bounce rates, sender reputation and keeping your lead lists clean."
      />
      <Container className="py-16">
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
