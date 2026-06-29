import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/marketing/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { definedTermLd, breadcrumbLd, faqLd } from "@/lib/jsonld";
import { GLOSSARY, getTerm } from "@/lib/glossary";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = getTerm(params.slug);
  if (!t) return {};
  return pageMeta({ title: `What is ${t.term}?`, description: t.short, path: `/glossary/${t.slug}` });
}

export default function GlossaryTermPage({ params }: { params: { slug: string } }) {
  const t = getTerm(params.slug);
  if (!t) notFound();
  const related = t.related.map(getTerm).filter(Boolean) as NonNullable<ReturnType<typeof getTerm>>[];

  return (
    <>
      <JsonLd data={definedTermLd(t)} />
      {t.faq && t.faq.length > 0 && <JsonLd data={faqLd(t.faq)} />}
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Glossary", path: "/glossary" },
        { name: t.term, path: `/glossary/${t.slug}` },
      ])} />

      <Container className="max-w-3xl py-16">
        <Link href="/glossary" className="text-[13.5px] font-medium text-brand-deep">← Glossary</Link>
        <span className="mt-5 block text-[12px] font-semibold uppercase tracking-wide text-brand-deep">Definition</span>
        <h1 className="mt-2 font-serif text-[clamp(30px,4.4vw,46px)] leading-[1.08]">What is {t.term}?</h1>
        <p className="mt-5 text-[19px] leading-relaxed text-ink-2">{t.short}</p>

        <div className="mt-8 space-y-4">
          {t.body.map((p, i) => (
            <p key={i} className="text-[16.5px] leading-relaxed text-ink-2">{p}</p>
          ))}
        </div>

        {/* Long-form sections (H2 + paragraphs + optional bullet lists) */}
        {t.sections?.map((s) => (
          <section key={s.heading} className="mt-11">
            <h2 className="font-serif text-[24px] leading-tight">{s.heading}</h2>
            {s.paras?.map((p, i) => (
              <p key={i} className="mt-4 text-[16.5px] leading-relaxed text-ink-2">{p}</p>
            ))}
            {s.bullets && (
              <ul className="mt-4 grid gap-2.5">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-2">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Key takeaways callout */}
        {t.takeaways && t.takeaways.length > 0 && (
          <div className="mt-11 rounded-2xl border border-hair bg-sunk/40 p-6">
            <h2 className="text-[15px] font-semibold uppercase tracking-wide text-brand-deep">Key takeaways</h2>
            <ul className="mt-4 grid gap-2.5">
              {t.takeaways.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-ink-2">
                  <span className="mt-1 text-brand">✓</span>{b}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand/25 bg-brand-wash/50 px-6 py-5">
          <div>
            <b className="text-[15px]">Verify email, phone and company in one upload</b>
            <span className="block text-[13px] text-ink-2">Preview your first 100 contacts free — no credit card.</span>
          </div>
          <Button href="/signup">Clean my list free →</Button>
        </div>

        {/* FAQ (renders FAQPage schema above) */}
        {t.faq && t.faq.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl">Frequently asked questions</h2>
            <div className="mt-5 grid gap-4">
              {t.faq.map((f) => (
                <div key={f.q} className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
                  <h3 className="text-[16px] font-semibold">{f.q}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-xl">Related terms</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {related.map((r) => (
                <Link key={r.slug} href={`/glossary/${r.slug}`} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">
                  {r.term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>

      <FinalCta />
    </>
  );
}
