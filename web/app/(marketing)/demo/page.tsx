import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Book a Demo",
  description: "See BounceBlock clean a real list — email, phone and company verification in one pass. Or just try the free 100-row preview now.",
  path: "/demo",
});

const POINTS = [
  "Watch a real list get verified — email, phone and company in one pass.",
  "See the quality score and the clean file you'd download.",
  "Get pricing for your volume and a recommendation for your stack.",
  "Ask about the API, Form Guard and bulk workflows.",
];

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a demo"
        title="See BounceBlock on your data"
        sub="A short, no-pressure walkthrough on a real list — or skip the call and try the free preview right now."
      />
      <Container className="py-14">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-serif text-2xl">What you&rsquo;ll see</h2>
            <ul className="mt-5 grid gap-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[16px] text-ink-2">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-hair bg-raised p-7 shadow-s1">
            <h2 className="font-serif text-xl">Two ways to start</h2>
            <p className="mt-2 text-[14.5px] text-ink-2">Prefer to talk to someone? Reach out and we&rsquo;ll set up a 20-minute walkthrough. In a hurry? The free preview takes two minutes.</p>
            <div className="mt-5 grid gap-3">
              <Button href="/contact">Request a walkthrough</Button>
              <Button href="/signup" variant="ghost">Try the free preview →</Button>
            </div>
            <p className="mt-4 text-[12.5px] text-ink-3">No credit card. Preview your first 100 contacts free.</p>
          </div>
        </div>
      </Container>
    </>
  );
}
