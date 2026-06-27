import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "Why we built BounceBlock — the simplest way to clean a lead list.",
};

const VALUES = [
  ["Simple", "One upload, one clean file. No credit math, no onboarding calls."],
  ["Honest", "We tell you what's wrong before you pay, and we never sell your data."],
  ["Secure", "Encrypted end to end, with raw files deleted within 24 hours."],
  ["Affordable", "Flat pricing small teams can actually budget for."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The simplest way to clean a lead list."
        sub={`${SITE.name} is a product of ${SITE.legalName} — we build small, focused tools that do one job extremely well.`}
      />
      <Container className="max-w-3xl py-16">
        <div className="space-y-4 text-[17px] leading-relaxed text-ink-2">
          <p>
            BounceBlock&rsquo;s job is simple: take a messy contact list and hand back a clean one — verified emails,
            validated phones, duplicates removed — in under two minutes.
          </p>
          <p>
            Most verification tools stop at email and charge by the credit. We bundle phone validation in the same
            upload and price it flat, so small teams in real estate, insurance and recruiting can stop guessing which
            leads are real and get back to selling.
          </p>
        </div>

        <h2 className="mt-12 font-serif text-2xl">What we believe</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {VALUES.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-hair bg-raised p-6 shadow-s1">
              <h3 className="text-lg">{t}</h3>
              <p className="mt-1 text-[14.5px] text-ink-2">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/signup" size="lg">Clean my list free →</Button>
        </div>
      </Container>
    </>
  );
}
