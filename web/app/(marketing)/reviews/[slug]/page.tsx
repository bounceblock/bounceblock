import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";
import { FinalCta } from "@/components/marketing/FinalCta";
import { Byline } from "@/components/marketing/Byline";
import { JsonLd } from "@/components/JsonLd";
import { reviewLd, faqLd, breadcrumbLd } from "@/lib/jsonld";
import { REVIEWS, getReview } from "@/lib/reviews";
import { getAuthor } from "@/lib/authors";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return REVIEWS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getReview(params.slug);
  if (!r) return {};
  return pageMeta({
    title: `${r.competitor.name} Review (2026): Pricing, Accuracy & Verdict`,
    description: `Our hands-on ${r.competitor.name} review — scored ${r.overall}/5 on accuracy, pricing, breadth, ease of use and free tier. ${r.competitor.gap}`,
    path: `/reviews/${r.slug}`,
  });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function ReviewPage({ params }: { params: { slug: string } }) {
  const r = getReview(params.slug);
  if (!r) notFound();
  const c = r.competitor;
  const reviewer = getAuthor(r.reviewerId);

  const facts: [string, string][] = [
    ["Accuracy claim", c.accuracy],
    ["Pricing model", c.model],
    ["Representative price", c.payg],
    ["Free tier", c.freeTier],
    ["Credits expire?", c.creditsExpire],
    ["Phone validation", c.phone ? "Included" : "Email-only"],
    ["Company data", c.company ? "Included" : "Not offered"],
    ["Best for", c.bestFor],
  ];

  const faq = [
    { q: `Is ${c.name} worth it?`, a: r.verdict },
    { q: `How much does ${c.name} cost?`, a: `${c.name} is ${c.model.toLowerCase()}, around ${c.payg}. Its free tier is ${c.freeTier.toLowerCase()}.` },
    { q: `Does ${c.name} validate phone numbers?`, a: c.phone ? `Yes — ${c.name} includes phone validation.` : `No — ${c.name} is email-only. If you need phone validation in the same workflow, BounceBlock bundles email and phone.` },
    { q: `What's the best ${c.name} alternative?`, a: `If you want email, phone and company verification at one flat price with no credit math, BounceBlock is a strong alternative — see our BounceBlock vs ${c.name} comparison.` },
  ];

  return (
    <>
      <JsonLd data={reviewLd({ itemName: c.name, score: r.overall, author: reviewer?.name ?? "BounceBlock", summary: r.verdict, slug: r.slug })} />
      <JsonLd data={faqLd(faq)} />
      <JsonLd data={breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Reviews", path: "/reviews" },
        { name: `${c.name} review`, path: `/reviews/${r.slug}` },
      ])} />

      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[380px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.13),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.1),transparent_70%)] blur-2xl" />
        <Container className="relative py-14">
          <span className="eyebrow">Review</span>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(30px,4.4vw,46px)] leading-[1.07]">{c.name} review</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-[28px] font-semibold text-ink">{r.overall.toFixed(1)}<span className="text-[18px] text-ink-3">/5</span></span>
            <span className="text-[20px] text-brand">{"★".repeat(Math.round(r.overall))}<span className="text-ink-3">{"★".repeat(5 - Math.round(r.overall))}</span></span>
          </div>
          {reviewer && <div className="mt-5"><Byline author={reviewer} prefix="Reviewed by" date={fmt(r.date)} /></div>}
        </Container>
      </section>

      {/* verdict */}
      <section className="py-12">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-brand/25 bg-brand-wash/40 p-7">
            <h2 className="font-serif text-2xl">Verdict</h2>
            <p className="mt-3 text-[16.5px] leading-relaxed text-ink-2">{r.verdict}</p>
          </div>
        </Container>
      </section>

      {/* at a glance */}
      <section className="pb-4">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-2xl">{c.name} at a glance</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-hair bg-raised shadow-s1">
            <table className="w-full text-[14.5px]">
              <tbody>
                {facts.map(([k, v], i) => (
                  <tr key={k} className={i < facts.length - 1 ? "border-b border-hair" : ""}>
                    <td className="w-[42%] px-5 py-3 font-medium text-ink-2">{k}</td>
                    <td className="px-5 py-3 text-ink">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* scorecard */}
      <section className="py-12">
        <Container className="max-w-3xl">
          <SectionHead eyebrow="Scorecard" title="How we scored it" />
          <div className="grid gap-3">
            {r.rubric.map((label, i) => (
              <div key={label} className="flex items-center gap-4">
                <span className="w-[58%] text-[14.5px] text-ink-2">{label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-sunk">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${(r.scores[i] / 5) * 100}%` }} />
                </div>
                <span className="w-9 text-right text-[13.5px] font-semibold text-ink">{r.scores[i].toFixed(1)}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* pros / cons */}
      <section className="bg-sunk/30 py-14">
        <Container className="max-w-3xl">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
              <h3 className="font-serif text-xl text-brand-deep">What we liked</h3>
              <ul className="mt-3 grid gap-2.5">
                {c.pros.map((p) => (
                  <li key={p} className="flex gap-2 text-[14.5px] text-ink-2"><span className="text-brand">+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
              <h3 className="font-serif text-xl text-ink">Where it falls short</h3>
              <ul className="mt-3 grid gap-2.5">
                {c.cons.map((p) => (
                  <li key={p} className="flex gap-2 text-[14.5px] text-ink-2"><span className="text-ink-3">–</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* the BounceBlock angle */}
      <section className="py-14">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-2xl">How BounceBlock compares</h2>
          <p className="mt-3 text-[16px] text-ink-2">{c.gap} BounceBlock verifies email and phone — and checks company data — in one upload, at a flat monthly price, and never bills you for an &ldquo;unknown&rdquo; result.</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link href={`/alternative/${c.slug}`} className="rounded-full bg-brand px-5 py-2.5 text-[14px] font-semibold text-white">BounceBlock vs {c.name} →</Link>
            <Link href="/reviews" className="rounded-full border border-hair bg-raised px-5 py-2.5 text-[14px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">All reviews</Link>
          </div>
        </Container>
      </section>

      {/* faq */}
      <section className="bg-sunk/30 py-14">
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

      <FinalCta />
    </>
  );
}
