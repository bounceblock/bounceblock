import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect BounceBlock to your CRM and outreach stack — and use the API.",
};

const INTEGRATIONS: [string, string][] = [
  ["HubSpot", "Soon"], ["Salesforce", "Soon"], ["Mailchimp", "Soon"], ["Zapier", "Soon"],
  ["Pipedrive", "Soon"], ["Google Sheets", "Soon"], ["Outreach", "Soon"], ["Apollo", "Soon"],
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Fits the stack you already use."
        sub="CSV in, clean CSV out today — with native CRM and outreach integrations on the way, plus a developer API on Business."
      />
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {INTEGRATIONS.map(([name, status]) => (
            <div key={name} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-hair bg-raised p-7 text-center shadow-s1">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sunk font-serif text-lg font-semibold text-ink-2">
                {name[0]}
              </span>
              <span className="text-[14.5px] font-semibold">{name}</span>
              <span className="rounded-full bg-unknown/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#A9761B]">{status}</span>
            </div>
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
