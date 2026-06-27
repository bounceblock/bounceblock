import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Trust Center",
  description: "Security, privacy and compliance at BounceBlock — all in one place.",
};

const PILLARS = [
  { t: "Security", d: "AES-256 at rest, TLS 1.3 in transit, least-privilege access and monitoring.", href: "/security" },
  { t: "Compliance", d: "GDPR, CCPA and DPDP from day one; SOC 2 on the roadmap.", href: "/compliance" },
  { t: "Privacy", d: "We never sell your data. Uploads are deleted within 24 hours.", href: "/legal/privacy" },
  { t: "Sub-processors", d: "The exact vendors that help us run the service, and what they do.", href: "/legal/subprocessors" },
  { t: "Data Processing", d: "A DPA for every customer under GDPR Article 28.", href: "/legal/dpa" },
  { t: "Status", d: "Live uptime and incident history.", href: "/status" },
];

const FACTS = [
  ["AES-256", "Encryption at rest"],
  ["24h", "Raw files auto-deleted"],
  ["99.9%", "Uptime target"],
  ["0", "Contacts ever sold"],
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust Center"
        title="Built to be trusted with your data."
        sub="You're handing us contact lists. Here's exactly how we protect them, who we share them with, and the standards we hold ourselves to."
      />
      <Container className="py-16">
        <div className="grid gap-4 sm:grid-cols-4">
          {FACTS.map(([n, d]) => (
            <div key={d} className="rounded-xl border border-hair bg-raised p-5 text-center shadow-s1">
              <div className="font-serif text-3xl font-semibold text-brand-deep">{n}</div>
              <div className="mt-1 text-[13px] text-ink-2">{d}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <Link key={p.t} href={p.href} className="group rounded-2xl border border-hair bg-raised p-6 shadow-s1 transition-all hover:-translate-y-0.5 hover:shadow-s3">
              <h3 className="font-serif text-xl">{p.t}</h3>
              <p className="mt-1.5 text-[14.5px] text-ink-2">{p.d}</p>
              <span className="mt-3 inline-block text-[13.5px] font-medium text-brand-deep">Learn more →</span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
