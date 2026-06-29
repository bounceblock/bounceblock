import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/marketing/FinalCta";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { RESOURCES, getResource } from "@/lib/resources";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getResource(params.slug);
  if (!r) return {};
  return pageMeta({ title: `${r.title} (Free ${r.type})`, description: r.description, path: `/resources/${r.slug}` });
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const r = getResource(params.slug);
  if (!r) notFound();
  const others = RESOURCES.filter((x) => x.slug !== r.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources" },
        { name: r.title, path: `/resources/${r.slug}` },
      ])} />

      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[360px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.12),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.1),transparent_70%)] blur-2xl" />
        <Container className="relative py-14">
          <span className="w-fit rounded-full bg-brand-wash px-3 py-1 text-[11.5px] font-semibold uppercase tracking-wide text-brand-deep">{r.type}</span>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(28px,4.2vw,44px)] leading-[1.07]">{r.title}</h1>
          <p className="mt-4 max-w-2xl text-[18px] text-ink-2">{r.intro}</p>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-3xl">
          <div className="grid gap-8">
            {r.groups.map((g) => (
              <div key={g.heading}>
                <h2 className="font-serif text-[22px]">{g.heading}</h2>
                <ul className="mt-4 grid gap-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-hair bg-raised px-4 py-3 text-[15.5px] text-ink-2 shadow-s1">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-brand/40 text-brand">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* email capture for the downloadable version */}
          <div className="mt-12 rounded-2xl border border-brand/25 bg-brand-wash/40 p-7">
            <h2 className="font-serif text-xl">Want the printable version?</h2>
            <p className="mt-1.5 text-[14.5px] text-ink-2">Get this {r.type.toLowerCase()} plus new deliverability resources in your inbox.</p>
            <div className="mt-4"><NewsletterForm /></div>
          </div>

          {/* internal links */}
          <div className="mt-10">
            <h2 className="font-serif text-xl">Related</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {r.related.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">{l.label} →</Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <h2 className="font-serif text-2xl">More resources</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/resources/${o.slug}`} className="group rounded-2xl border border-hair bg-raised p-5 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40">
                <div className="text-[11.5px] font-semibold uppercase tracking-wide text-brand-deep">{o.type}</div>
                <div className="mt-1.5 font-serif text-[16px] group-hover:text-brand-deep">{o.title}</div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
