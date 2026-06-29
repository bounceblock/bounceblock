import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { ALTERNATIVES } from "@/lib/seo-data";
import { COMPARE_PAIRS } from "@/lib/compare";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Compare Email Verification Tools",
  description: "BounceBlock vs ZeroBounce, NeverBounce, Kickbox, Bouncer and more — email, phone, company, pricing model and free tier, side by side.",
  path: "/compare",
});

const Yes = () => <span className="font-semibold text-brand-deep">●</span>;
const No = () => <span className="text-ink-3">—</span>;

// Curated, well-known competitors for the matrix (subset of ALTERNATIVES).
const SHOWN = ["zerobounce", "neverbounce", "kickbox", "bouncer", "clearout", "emailable", "hunter-io", "debounce", "millionverifier", "verifalia"];

export default function ComparePage() {
  const rows = ALTERNATIVES.filter((a) => SHOWN.includes(a.slug));

  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="How BounceBlock compares"
        sub="Most verifiers are email-only and credit-metered. BounceBlock bundles email, phone and company verification at one flat price. Here's the honest side-by-side."
      />
      <Container className="py-14">
        <div className="overflow-x-auto rounded-2xl border border-hair bg-raised shadow-s1">
          <table className="w-full min-w-[680px] text-[14px]">
            <thead>
              <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
                <th className="px-5 py-3 font-medium">Tool</th>
                <th className="px-5 py-3 text-center font-medium">Email</th>
                <th className="px-5 py-3 text-center font-medium">Phone</th>
                <th className="px-5 py-3 text-center font-medium">Company</th>
                <th className="px-5 py-3 text-center font-medium">Flat price</th>
                <th className="px-5 py-3 font-medium">Free tier</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-hair bg-brand-wash/40">
                <td className="px-5 py-3.5 font-semibold text-brand-deep">BounceBlock</td>
                <td className="px-5 py-3.5 text-center"><Yes /></td>
                <td className="px-5 py-3.5 text-center"><Yes /></td>
                <td className="px-5 py-3.5 text-center"><Yes /></td>
                <td className="px-5 py-3.5 text-center"><Yes /></td>
                <td className="px-5 py-3.5 text-ink-2">100 rows free</td>
              </tr>
              {rows.map((a) => (
                <tr key={a.slug} className="border-b border-hair last:border-0 hover:bg-sunk/30">
                  <td className="px-5 py-3.5 font-medium">
                    <Link href={`/alternative/${a.slug}`} className="text-ink hover:text-brand-deep">{a.label}</Link>
                  </td>
                  <td className="px-5 py-3.5 text-center"><Yes /></td>
                  <td className="px-5 py-3.5 text-center">{a.phone ? <Yes /> : <No />}</td>
                  <td className="px-5 py-3.5 text-center"><No /></td>
                  <td className="px-5 py-3.5 text-center"><No /></td>
                  <td className="px-5 py-3.5 text-ink-2">{a.freeTier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[12.5px] text-ink-3">
          Pricing models change — we compare structural differences (email-only vs bundled, credit-metered vs flat), not specific prices. Tap any tool for the full BounceBlock vs comparison.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {rows.map((a) => (
            <Link key={a.slug} href={`/best-alternative/${a.slug}`} className="rounded-full border border-hair bg-raised px-4 py-2 text-[13.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep">
              Best {a.label} alternative
            </Link>
          ))}
        </div>

        {/* Head-to-head competitor comparisons */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl">Head-to-head comparisons</h2>
          <p className="mt-2 max-w-2xl text-[14.5px] text-ink-2">
            Weighing two specific verifiers against each other? We compared the popular matchups on accuracy, pricing and features.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMPARE_PAIRS.map((p) => (
              <Link key={p.slug} href={`/compare/${p.slug}`} className="group rounded-xl border border-hair bg-raised px-5 py-4 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40">
                <span className="font-medium text-ink group-hover:text-brand-deep">{p.a.name} vs {p.b.name}</span>
                <span className="ml-1 text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
      <FinalCta />
    </>
  );
}
