import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";
import { INTEGRATIONS } from "@/lib/integrations";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Integrations",
  description: "Clean the data in HubSpot, Salesforce, Mailchimp, Shopify and more — verify emails, phones and company data, then re-import.",
  path: "/integrations",
});

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Fits the stack you already use."
        sub="Clean the data in your CRM, email platform and store — CSV in, verified CSV out today, with native syncs and a developer API on the way."
      />
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INTEGRATIONS.map((i) => (
            <Link key={i.slug} href={`/integrations/${i.slug}`} className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-hair bg-raised p-7 text-center shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-s2">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sunk font-serif text-lg font-semibold text-ink-2 group-hover:bg-brand-wash group-hover:text-brand-deep">
                {i.name[0]}
              </span>
              <span className="text-[14.5px] font-semibold group-hover:text-brand-deep">{i.name}</span>
              <span className="text-[11.5px] text-ink-3">{i.category}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-6 rounded-2xl border border-hair bg-gradient-to-b from-tint to-brand-wash/60 p-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-serif text-2xl">Developer API</h2>
            <p className="mt-2 max-w-md text-[15px] text-ink-2">
              Verify emails and phones programmatically with a simple REST API on the Business plan — perfect for
              cleaning data at the point of capture.
            </p>
          </div>
          <div className="md:text-right">
            <Button href="/pricing">See Business plan</Button>
          </div>
        </div>
      </Container>
    </>
  );
}
