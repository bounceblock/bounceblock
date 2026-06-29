import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";
import { FinalCta } from "@/components/marketing/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { faqLd, breadcrumbLd } from "@/lib/jsonld";
import { COMPARE_PAIRS, getComparePair } from "@/lib/compare";
import type { Competitor } from "@/lib/competitors";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return COMPARE_PAIRS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getComparePair(params.slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.a.name} vs ${p.b.name} (2026): Honest Comparison`,
    description: `${p.a.name} vs ${p.b.name} compared on accuracy, pricing, free tier and features — plus where BounceBlock's bundled email + phone fits in.`,
    path: `/compare/${p.slug}`,
  });
}

const Dot = ({ on }: { on: boolean }) =>
  on ? <span className="font-semibold text-brand-deep">●</span> : <span className="text-ink-3">—</span>;

function Col({ c }: { c: Competitor }) {
  return (
    <div className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
      <h3 className="font-serif text-xl">{c.name}</h3>
      <p className="mt-1 text-[13px] font-medium text-brand-deep">{c.accuracy}</p>
      <p className="mt-3 text-[14.5px] text-ink-2">{c.standout}</p>
      <div className="mt-4 grid gap-2 text-[13.5px]">
        <div className="text-ink-3">Pros</div>
        {c.pros.map((x) => (
          <div key={x} className="flex gap-2 text-ink-2"><span className="text-brand">+</span>{x}</div>
        ))}
        <div className="mt-2 text-ink-3">Cons</div>
        {c.cons.map((x) => (
          <div key={x} className="flex gap-2 text-ink-2"><span className="text-ink-3">–</span>{x}</div>
        ))}
      </div>
      <Link href={`/reviews/${c.slug}`} className="mt-4 inline-block text-[13.5px] font-medium text-brand-deep">
        Read our {c.name} review →
      </Link>
    </div>
  );
}

export default function ComparePairPage({ params }: { params: { slug: string } }) {
  const pair = getComparePair(params.slug);
  if (!pair) notFound();
  const { a, b } = pair;

  const rows: { label: string; a: React.ReactNode; b: React.ReactNode; us: React.ReactNode }[] = [
    { label: "Accuracy (claimed)", a: a.accuracy, b: b.accuracy, us: "Deep SMTP + true catch-all resolution" },
    { label: "Pricing model", a: a.model, b: b.model, us: "Flat monthly" },
    { label: "Free tier", a: a.freeTier, b: b.freeTier, us: "100 rows / month" },
    { label: "Credits expire?", a: a.creditsExpire, b: b.creditsExpire, us: "No credits — flat allowance" },
    { label: "Phone validation", a: <Dot on={a.phone} />, b: <Dot on={b.phone} />, us: <Dot on /> },
    { label: "Company data", a: <Dot on={a.company} />, b: <Dot on={b.company} />, us: <Dot on /> },
  ];

  const faq = [
    { q: `Is ${a.name} or ${b.name} more accurate?`, a: `${a.name} ${a.accuracy.toLowerCase()}, while ${b.name} ${b.accuracy.toLowerCase()}. Marketed accuracy numbers are rarely independently audited, so weigh them alongside catch-all handling and how each tool treats 'unknown' results.` },
    { q: `Which is cheaper, ${a.name} or ${b.name}?`, a: `${a.name} is ${a.model.toLowerCase()} (${a.payg}); ${b.name} is ${b.model.toLowerCase()} (${b.payg}). For irregular volumes, credit-metered pricing is harder to predict than a flat plan.` },
    { q: `Do ${a.name} or ${b.name} validate phone numbers?`, a: `${a.phone ? `${a.name} bundles phone validation.` : `${a.name} is email-only.`} ${b.phone ? `${b.name} bundles phone validation.` : `${b.name} is email-only.`} BounceBlock validates email and phone (line type, carrier, status) in the same upload.` },
    { q: `What's a good alternative to both?`, a: `If you want email, phone and company verification in one flat-priced pass, BounceBlock covers all three — and you only get charged a flat allowance, never per unknown.` },
  ];

  const related = COMPARE_PAIRS.filter((p) => p.slug !== pair.slug && (p.a.slug === a.slug || p.b.slug === b.slug || p.a.slug === b.slug || p.b.slug === a.slug)).slice(0, 6);

  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Compare", path: "/compare" },
        { name: `${a.name} vs ${b.name}`, path: `/compare/${pair.slug}` },
      ])} />

      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[420px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.13),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.11),transparent_70%)] blur-2xl" />
        <Container className="relative py-16">
          <span className="eyebrow">Comparison</span>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(30px,4.6vw,50px)] leading-[1.06]">
            {a.name} vs {b.name}
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] text-ink-2">
            Both are well-known email verifiers. Here&rsquo;s how {a.name} and {b.name} stack up on accuracy, pricing and features — and where a bundled tool like BounceBlock changes the math.
          </p>
        </Container>
      </section>

      {/* the table */}
      <section className="py-16">
        <Container>
          <div className="overflow-x-auto rounded-2xl border border-hair bg-raised shadow-s1">
            <table className="w-full min-w-[680px] text-[14px]">
              <thead>
                <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
                  <th className="px-5 py-3 font-medium">&nbsp;</th>
                  <th className="px-5 py-3 font-medium">{a.name}</th>
                  <th className="px-5 py-3 font-medium">{b.name}</th>
                  <th className="px-5 py-3 font-medium text-brand-deep">BounceBlock</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-hair last:border-0">
                    <td className="px-5 py-3.5 font-medium text-ink-2">{r.label}</td>
                    <td className="px-5 py-3.5 text-ink-2">{r.a}</td>
                    <td className="px-5 py-3.5 text-ink-2">{r.b}</td>
                    <td className="bg-brand-wash/30 px-5 py-3.5 font-medium text-ink">{r.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12.5px] text-ink-3">
            Based on public pricing/marketing pages (June 2026); details change — verify current specifics on each vendor&rsquo;s site.
          </p>
        </Container>
      </section>

      {/* side-by-side cards */}
      <section className="pb-16">
        <Container>
          <SectionHead eyebrow="Strengths & trade-offs" title="The honest breakdown" />
          <div className="grid gap-5 md:grid-cols-2">
            <Col c={a} />
            <Col c={b} />
          </div>
        </Container>
      </section>

      {/* verdict */}
      <section className="bg-sunk/30 py-16">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-[28px]">The verdict</h2>
          <div className="mt-4 grid gap-3 text-[16px] text-ink-2">
            <p><span className="font-semibold text-ink">Choose {a.name}</span> if {a.bestFor.charAt(0).toLowerCase() + a.bestFor.slice(1)}</p>
            <p><span className="font-semibold text-ink">Choose {b.name}</span> if {b.bestFor.charAt(0).toLowerCase() + b.bestFor.slice(1)}</p>
            <p className="rounded-2xl border border-brand/25 bg-brand-wash/40 px-6 py-5">
              <span className="font-semibold text-brand-deep">Consider BounceBlock</span> if you&rsquo;d rather verify email <em>and</em> phone <em>and</em> company in one upload, at a flat monthly price, and never get charged for an &ldquo;unknown&rdquo; result. {a.phone || b.phone ? "" : "Neither tool here validates phone numbers — BounceBlock does."}
            </p>
          </div>
        </Container>
      </section>

      {/* faq */}
      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHead eyebrow="Questions" title="Frequently asked" />
          <div className="grid gap-4">
            {faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
                <h3 className="text-[16px] font-semibold">{f.q}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="pb-12">
          <Container>
            <h2 className="font-serif text-2xl">More comparisons</h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {related.map((r) => (
                <Link key={r.slug} href={`/compare/${r.slug}`} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">
                  {r.a.name} vs {r.b.name}
                </Link>
              ))}
              <Link href="/compare" className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-brand-deep">All comparisons →</Link>
            </div>
          </Container>
        </section>
      )}

      <FinalCta />
    </>
  );
}
