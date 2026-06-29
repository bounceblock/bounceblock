import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";
import { FinalCta } from "@/components/marketing/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { faqLd, breadcrumbLd } from "@/lib/jsonld";
import { TOOLS, getTool } from "@/lib/tools";
import { ToolWidget } from "@/components/tools/ToolWidget";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = getTool(params.slug);
  if (!t) return {};
  return pageMeta({ title: `${t.name} — Free`, description: t.tagline, path: `/tools/${t.slug}` });
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const t = getTool(params.slug);
  if (!t) notFound();
  const others = TOOLS.filter((x) => x.slug !== t.slug).slice(0, 6);

  return (
    <>
      <JsonLd data={faqLd(t.faq)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Free tools", path: "/tools" },
        { name: t.name, path: `/tools/${t.slug}` },
      ])} />

      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[380px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.13),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.1),transparent_70%)] blur-2xl" />
        <Container className="relative py-14">
          <span className="eyebrow">Free tool</span>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(30px,4.4vw,46px)] leading-[1.07]">{t.name}</h1>
          <p className="mt-4 max-w-2xl text-[17px] text-ink-2">{t.intro}</p>
          <div className="mt-7 max-w-2xl">
            <ToolWidget widget={t.widget} />
          </div>
          {t.notice && (
            <p className="mt-4 max-w-2xl text-[12.5px] leading-relaxed text-ink-3">
              <span aria-hidden className="mr-1.5 font-semibold text-ink-2">Intended use:</span>
              {t.notice.replace(" See our Acceptable Use Policy.", " ")}
              <Link href="/legal/acceptable-use" className="text-brand-deep underline">See our Acceptable Use Policy</Link>.
            </p>
          )}
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-[24px]">How it works</h2>
          <ol className="mt-4 grid gap-3">
            {t.how.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-[16px] text-ink-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-wash text-[13px] font-semibold text-brand-deep">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-sunk/30 py-14">
        <Container className="max-w-3xl">
          <SectionHead eyebrow="Questions" title="Frequently asked" />
          <div className="grid gap-4">
            {t.faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
                <h3 className="text-[16px] font-semibold">{f.q}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <h2 className="font-serif text-2xl">More free tools</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {others.map((x) => (
              <Link key={x.slug} href={`/tools/${x.slug}`} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">
                {x.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
