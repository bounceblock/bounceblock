import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { REVIEW_LIST } from "@/lib/reviews";
import { REVIEW_RUBRIC } from "@/lib/competitors";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Email Verification Tool Reviews (2026)",
  description: "Hands-on reviews of the top email verification tools — ZeroBounce, NeverBounce, Kickbox, Bouncer, Clearout and more — scored on the same transparent rubric.",
  path: "/reviews",
});

const Stars = ({ score }: { score: number }) => {
  const full = Math.round(score);
  return (
    <span className="text-brand" aria-label={`${score} out of 5`}>
      {"★".repeat(full)}<span className="text-ink-3">{"★".repeat(5 - full)}</span>
    </span>
  );
};

export default function ReviewsHub() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Email verification tools, reviewed"
        sub="We test every verifier against the same five criteria and report what we find — including where each one beats BounceBlock."
      />
      <Container className="py-14">
        <div className="mb-8 rounded-2xl border border-hair bg-sunk/30 p-5 text-[13.5px] text-ink-2">
          <span className="font-semibold text-ink">Our rubric:</span> {REVIEW_RUBRIC.join(" · ")}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {REVIEW_LIST.map((r) => (
            <Link
              key={r.slug}
              href={`/reviews/${r.slug}`}
              className="group flex flex-col rounded-2xl border border-hair bg-raised p-6 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-s2"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-[21px] text-ink group-hover:text-brand-deep">{r.competitor.name}</h2>
                <span className="text-[14px] font-semibold text-ink">{r.overall.toFixed(1)}<span className="text-ink-3">/5</span></span>
              </div>
              <Stars score={r.overall} />
              <p className="mt-3 text-[14.5px] text-ink-2 line-clamp-3">{r.verdict}</p>
              <span className="mt-4 text-[13.5px] font-medium text-brand-deep">Read the full review →</span>
            </Link>
          ))}
        </div>
      </Container>
      <FinalCta />
    </>
  );
}
