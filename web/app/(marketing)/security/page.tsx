import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Security",
  description: "How BounceBlock protects your data: AES-256, TLS 1.3, 24-hour deletion, GDPR & CCPA.",
};

const POINTS = [
  ["Encrypted everywhere", "AES-256 at rest, TLS 1.3 in transit — end to end."],
  ["24-hour deletion", "Uploaded files are processed and permanently deleted within 24 hours."],
  ["Never sold or shared", "Verification is the only thing we ever do with your contacts."],
  ["Least-privilege access", "Role-based access controls and audit logging on every action."],
  ["Compliant from day one", "GDPR, CCPA and DPDP. A DPA is available to every customer."],
  ["Monitored & resilient", "Continuous monitoring, rate limiting and a documented incident plan."],
];

const LIFECYCLE = [
  ["Upload", "Your file is encrypted in transit (TLS 1.3)."],
  ["Store", "Held in AES-256 encrypted temporary storage."],
  ["Process", "Verified in memory — no raw data kept longer than needed."],
  ["Delete", "Raw file cryptographically erased within 24 hours."],
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security & trust"
        title="Your data is handled like it's ours."
        sub="BounceBlock is built security-first. Here's how we protect every list you upload."
      />
      <Container className="max-w-4xl py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {POINTS.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-hair bg-raised p-6 shadow-s1">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-wash text-brand-deep">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l7 3v5c0 4-2.7 6.7-7 8-4.3-1.3-7-4-7-8V6l7-3z" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-3 text-lg">{t}</h3>
              <p className="mt-1 text-[14.5px] text-ink-2">{d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-2xl">How your upload is handled</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-4">
          {LIFECYCLE.map(([t, d], i) => (
            <div key={t} className="rounded-xl border border-hair bg-raised p-5 shadow-s1">
              <div className="font-serif text-lg font-semibold text-brand-deep">{i + 1}</div>
              <h3 className="mt-1 text-[15px] font-semibold">{t}</h3>
              <p className="mt-1 text-[13px] text-ink-2">{d}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[14px] text-ink-3">
          Security questions? Email{" "}
          <a href={`mailto:${SITE.email.security}`} className="text-brand-deep underline">{SITE.email.security}</a>. See
          also our <Link href="/legal/subprocessors" className="text-brand-deep underline">sub-processors</Link> and{" "}
          <Link href="/compliance" className="text-brand-deep underline">compliance roadmap</Link>.
        </p>
      </Container>
    </>
  );
}
