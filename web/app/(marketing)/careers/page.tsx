import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description: "Help build the simplest way to keep contact data clean. We're a small, remote-friendly team that cares about craft.",
  path: "/careers",
});

const VALUES = [
  { title: "Craft over volume", desc: "We ship a small number of things and make them genuinely good. Quality is the brand." },
  { title: "Honest by default", desc: "We don't fake reviews, inflate numbers or dark-pattern. Trust is the product in a data business." },
  { title: "Customer-obsessed", desc: "We talk to the people who clean lists every day and build for their real workflow." },
  { title: "Remote-friendly", desc: "We optimise for focus and written communication, not seat time." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the cleanest contact data on the web"
        sub="We're a small team making it effortless to verify email, phone and company data. We hire for craft, curiosity and care."
      />
      <Container className="py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-hair bg-raised p-7 shadow-s1">
              <h2 className="font-serif text-xl">{v.title}</h2>
              <p className="mt-2 text-[15px] text-ink-2">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-hair bg-gradient-to-b from-tint to-brand-wash/60 p-8 text-center">
          <h2 className="font-serif text-2xl">No open roles right now</h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] text-ink-2">
            We&rsquo;re not actively hiring, but we always want to meet thoughtful engineers, designers and marketers who care about data quality. Tell us what you&rsquo;d want to work on.
          </p>
          <div className="mt-5">
            <Button href={`mailto:${SITE.email.hello}?subject=Careers`}>Introduce yourself →</Button>
          </div>
        </div>
      </Container>
    </>
  );
}
