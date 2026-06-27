import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "How sales teams cut bounce rates and reconnected with real leads using BounceBlock.",
};

const CASES = [
  {
    industry: "Real estate",
    company: "Northwind Realty",
    problem: "A 14% bounce rate was hurting deliverability and burning two days a month on manual list cleanup.",
    solution: "Ran every quarterly lead list through BounceBlock — email + phone in one pass.",
    result: "Bounce rate under 2%",
    sub: "and 2 days/month saved",
  },
  {
    industry: "Recruiting",
    company: "TalentForge",
    problem: "Recruiters wasted hours dialing disconnected candidate numbers.",
    solution: "Validated every phone number and line type before outreach.",
    result: "+30% dialer connect rate",
    sub: "more conversations, less guessing",
  },
  {
    industry: "Insurance",
    company: "Meridian Insurance",
    problem: "Purchased lead lists were riddled with duplicates and dead emails.",
    solution: "Deduplicated and verified 9,000 leads in a single upload.",
    result: "3 minutes to a clean file",
    sub: "no onboarding call needed",
  },
  {
    industry: "Agency",
    company: "CloseRate",
    problem: "Credit-based tools made per-client list cleaning unpredictable to bill.",
    solution: "Switched to BounceBlock's flat pricing across all client accounts.",
    result: "Predictable flat cost",
    sub: "and cleaner client results",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Real teams. Real bounce rates, fixed."
        sub="A few of the ways sales, recruiting and insurance teams use BounceBlock to stop chasing dead leads."
      />
      <Container className="py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {CASES.map((c) => (
            <article key={c.company} className="flex flex-col rounded-2xl border border-hair bg-raised p-7 shadow-s1">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-brand-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {c.industry}
              </div>
              <h3 className="mt-2 font-serif text-2xl">{c.company}</h3>
              <div className="mt-4 grid gap-3 text-[14.5px]">
                <p><span className="font-semibold text-ink">Problem · </span><span className="text-ink-2">{c.problem}</span></p>
                <p><span className="font-semibold text-ink">Solution · </span><span className="text-ink-2">{c.solution}</span></p>
              </div>
              <div className="mt-5 rounded-xl border border-brand/25 bg-brand-wash/50 px-5 py-4">
                <div className="font-serif text-2xl font-semibold text-brand-deep">{c.result}</div>
                <div className="text-[13px] text-ink-2">{c.sub}</div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-[13px] text-ink-3">Illustrative results. Add real customer stories before launch.</p>
        <div className="mt-8 text-center">
          <Button href="/signup" size="lg">Clean my list free →</Button>
        </div>
      </Container>
    </>
  );
}
