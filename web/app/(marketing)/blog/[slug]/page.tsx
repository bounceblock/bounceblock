import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, breadcrumbLd } from "@/lib/jsonld";
import { POSTS, getPost, resourcesFor, postAuthorId } from "@/lib/blog";
import { getAuthor } from "@/lib/authors";
import { personLd } from "@/lib/jsonld";
import { Byline } from "@/components/marketing/Byline";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  const meta = pageMeta({ title: p.title, description: p.description, path: `/blog/${p.slug}` });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: p.date } };
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const resources = resourcesFor(post.category);
  const author = getAuthor(postAuthorId(post));

  return (
    <article>
      <JsonLd data={articleLd(post)} />
      {author && <JsonLd data={personLd(author)} />}
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ])} />
      <Container className="max-w-3xl py-16">
        <Link href="/blog" className="text-[13.5px] font-medium text-brand-deep">← All articles</Link>
        <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-brand-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {post.category}
        </div>
        <h1 className="mt-3 font-serif text-[clamp(30px,4.4vw,46px)] leading-[1.1]">{post.title}</h1>
        {author ? (
          <div className="mt-5"><Byline author={author} date={fmt(post.date)} readMins={post.readMins} /></div>
        ) : (
          <p className="mt-3 text-[13.5px] text-ink-3">{fmt(post.date)} · {post.readMins} min read</p>
        )}
        <p className="mt-6 text-[19px] leading-relaxed text-ink-2">{post.intro}</p>

        <div className="mt-10 space-y-9">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-serif text-[24px]">{s.heading}</h2>
              {s.paras?.map((p, i) => (
                <p key={i} className="mt-3 text-[16.5px] leading-relaxed text-ink-2">{p}</p>
              ))}
              {s.bullets && (
                <ul className="mt-3 grid gap-2">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[16px] text-ink-2">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand/25 bg-brand-wash/50 px-6 py-5">
          <div>
            <b className="text-[15px]">See how clean your list really is</b>
            <span className="block text-[13px] text-ink-2">Free preview of your first 100 contacts — no credit card.</span>
          </div>
          <Button href="/signup">Clean my list free →</Button>
        </div>

        <div className="mt-10">
          <h2 className="font-serif text-lg">Related guides &amp; tools</h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {resources.map((r) => (
              <Link key={r.href} href={r.href} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="max-w-3xl pb-16">
          <h2 className="font-serif text-2xl">Keep reading</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border border-hair bg-raised p-6 shadow-s1 transition-all hover:-translate-y-0.5 hover:shadow-s2">
                <div className="text-[12px] font-semibold uppercase tracking-wide text-brand-deep">{p.category}</div>
                <h3 className="mt-2 font-serif text-lg">{p.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
