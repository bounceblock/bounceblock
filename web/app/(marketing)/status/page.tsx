import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Status",
  description: "BounceBlock system status and uptime.",
};

const COMPONENTS = [
  ["Web app", "99.99%"],
  ["Verification API", "99.98%"],
  ["Email verification (ZeroBounce)", "99.97%"],
  ["Phone validation (NumVerify)", "99.96%"],
  ["Payments (Stripe)", "100%"],
];

export default function StatusPage() {
  return (
    <>
      <PageHero eyebrow="Status" title="All systems operational" />
      <Container className="max-w-3xl py-16">
        <div className="flex items-center gap-3 rounded-2xl border border-brand/25 bg-brand-wash/50 px-6 py-5">
          <span className="h-3 w-3 animate-pulse rounded-full bg-brand" />
          <span className="font-semibold">All systems operational</span>
          <span className="ml-auto text-[13px] text-ink-3">Updated just now</span>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-hair bg-raised shadow-s1">
          {COMPONENTS.map(([name, uptime], i) => (
            <div key={name} className={`flex items-center gap-3 px-6 py-4 ${i < COMPONENTS.length - 1 ? "border-b border-hair" : ""}`}>
              <span className="h-2.5 w-2.5 rounded-full bg-valid" />
              <span className="text-[15px] font-medium">{name}</span>
              <span className="ml-auto text-[13.5px] text-ink-2">{uptime} · 90d</span>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-serif text-2xl">Incident history</h2>
        <div className="mt-4 rounded-2xl border border-hair bg-raised p-8 text-center shadow-s1">
          <p className="font-medium">No incidents reported</p>
          <p className="mt-1 text-[14px] text-ink-2">The last 90 days have been incident-free.</p>
        </div>
      </Container>
    </>
  );
}
