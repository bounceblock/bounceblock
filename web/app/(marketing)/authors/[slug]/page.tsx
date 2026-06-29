import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/marketing/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { personLd, breadcrumbLd } from "@/lib/jsonld";
import { AUTHORS, getAuthor } from "@/lib/authors";
import { POSTS, postAuthorId } from "@/lib/blog";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getAuthor(params.slug);
  if (!a) return {};
  return pageMeta({
    title: `${a.name} — ${a.role}`,
    description: a.bio.slice(0, 155),
    path: `/authors/${a.id}`,
  });
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const a = getAuthor(params.slug);
  if (!a) notFound();
  // Posts attributed to this author (explicit authorId or derived from topic).
  const posts = POSTS.filter((p) => postAuthorId(p) === a.id);

  return (
    <>
      <JsonLd data={personLd(a)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Authors", path: "/authors" },
        { name: a.name, path: `/authors/${a.id}` },
      ])} />

      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[360px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.12),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.1),transparent_70%)] blur-2xl" />
        <Container className="relative py-16">
          <Link href="/authors" className="text-[13.5px] font-medium text-brand-deep">← All authors</Link>
          <div className="mt-5 flex items-start gap-5">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-brand-wash text-[26px] font-semibold text-brand-deep">
              {a.initials}
            </span>
            <div>
              <h1 className="font-serif text-[clamp(28px,4vw,42px)] leading-[1.08]">{a.name}</h1>
              <p className="mt-1 text-[16px] font-medium text-brand-deep">{a.role}</p>
              <p className="mt-1 text-[14.5px] text-ink-2">{a.credential}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-3xl">
          <p className="text-[18px] leading-relaxed text-ink-2">{a.bio}</p>

          <h2 className="mt-10 font-serif text-2xl">Areas of expertise</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {a.expertise.map((e) => (
              <span key={e} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2">{e}</span>
            ))}
          </div>

          {posts.length > 0 && (
            <>
              <h2 className="mt-10 font-serif text-2xl">Recent articles</h2>
              <div className="mt-4 grid gap-3">
                {posts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-xl border border-hair bg-raised px-5 py-4 shadow-s1 transition-colors hover:border-brand/40">
                    <span className="font-medium text-ink hover:text-brand-deep">{p.title}</span>
                    <p className="mt-1 text-[13.5px] text-ink-3">{p.category} · {p.readMins} min read</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
