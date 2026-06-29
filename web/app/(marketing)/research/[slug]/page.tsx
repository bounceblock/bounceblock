import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/marketing/FinalCta";
import { Byline } from "@/components/marketing/Byline";
import { JsonLd } from "@/components/JsonLd";
import { datasetLd, articleLd, breadcrumbLd } from "@/lib/jsonld";
import { RESEARCH, getStudy, type BarRow } from "@/lib/research";
import { getAuthor } from "@/lib/authors";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return RESEARCH.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getStudy(params.slug);
  if (!r) return {};
  return pageMeta({ title: r.title, description: r.dek, path: `/research/${r.slug}` });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

function Chart({ caption, rows, unit }: { caption: string; rows: BarRow[]; unit?: string }) {
  return (
    <figure className="mt-6 rounded-2xl border border-hair bg-raised p-6 shadow-s1">
      <figcaption className="text-[13.5px] font-medium text-ink-2">{caption}{unit ? ` (${unit})` : ""}</figcaption>
      <div className="mt-4 grid gap-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3">
            <span className="w-[38%] shrink-0 text-[13.5px] text-ink-2">{r.label}</span>
            <div className="h-6 flex-1 overflow-hidden rounded-md bg-sunk">
              <div className="flex h-full items-center justify-end rounded-md bg-gradient-to-r from-brand/70 to-brand pr-2 text-[11.5px] font-semibold text-white" style={{ width: `${Math.max(r.pct, 8)}%` }}>
                {r.display}
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

export default function ResearchPage({ params }: { params: { slug: string } }) {
  const r = getStudy(params.slug);
  if (!r) notFound();
  const author = getAuthor(r.authorId);
  const others = RESEARCH.filter((x) => x.slug !== r.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={datasetLd({ name: r.title, description: r.dek, date: r.date, slug: r.slug })} />
      <JsonLd data={articleLd({ title: r.title, description: r.dek, date: r.date, slug: r.slug })} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Research", path: "/research" },
        { name: r.title, path: `/research/${r.slug}` },
      ])} />

      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[380px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.12),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.1),transparent_70%)] blur-2xl" />
        <Container className="relative py-14">
          <span className="eyebrow">Data study</span>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(28px,4.2vw,46px)] leading-[1.07]">{r.title}</h1>
          <p className="mt-4 max-w-2xl text-[18px] text-ink-2">{r.dek}</p>
          {author && <div className="mt-6"><Byline author={author} prefix="Research by" date={fmt(r.date)} /></div>}
        </Container>
      </section>

      {/* headline stats */}
      <section className="border-b border-hair bg-sunk/30 py-10">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {r.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-[40px] font-semibold text-brand-deep">{s.value}</div>
                <div className="mt-1 text-[14px] text-ink-2">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* key findings */}
      <section className="py-12">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-2xl">Key findings</h2>
          <ul className="mt-4 grid gap-3">
            {r.keyFindings.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-xl border border-hair bg-raised px-5 py-4 text-[15.5px] text-ink-2 shadow-s1">
                <span className="mt-1 text-brand">◆</span>{f}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* body sections */}
      <section className="pb-12">
        <Container className="max-w-3xl">
          {r.sections.map((sec) => (
            <div key={sec.heading} className="mt-10 first:mt-0">
              <h2 className="font-serif text-[26px]">{sec.heading}</h2>
              {sec.paras?.map((p, i) => <p key={i} className="mt-3 text-[16.5px] leading-relaxed text-ink-2">{p}</p>)}
              {sec.chart && <Chart caption={sec.chart.caption} rows={sec.chart.rows} unit={sec.chart.unit} />}
              {sec.bullets && (
                <ul className="mt-4 grid gap-2.5">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[16px] text-ink-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <p className="mt-10 rounded-xl border border-hair bg-sunk/40 px-5 py-4 text-[13px] text-ink-3">
            <span className="font-medium text-ink-2">Methodology:</span> {r.basis} Figures are illustrative and will be updated with live anonymized data. Free to cite with attribution to BounceBlock.
          </p>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <h2 className="font-serif text-2xl">More research</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/research/${o.slug}`} className="group rounded-2xl border border-hair bg-raised p-5 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40">
                <div className="text-[12px] font-semibold uppercase tracking-wide text-brand-deep">Data study</div>
                <div className="mt-1.5 font-serif text-[17px] group-hover:text-brand-deep">{o.title}</div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
