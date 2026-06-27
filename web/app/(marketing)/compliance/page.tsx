import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";

export const metadata: Metadata = {
  title: "Compliance",
  description: "GDPR, CCPA and DPDP compliance, plus our SOC 2 roadmap.",
};

const ROADMAP: [string, string, string][] = [
  ["GDPR", "Live", "EU data-protection compliance from launch."],
  ["CCPA / CPRA", "Live", "California consumer privacy rights."],
  ["DPDP (India)", "Live", "India Digital Personal Data Protection compliance."],
  ["SOC 2 Type I", "In progress", "Independent audit of security controls."],
  ["SOC 2 Type II", "Planned", "Observation-period audit, targeted for Q4 2026."],
  ["ISO 27001", "Future", "Information-security management certification."],
];

const CRITERIA = [
  ["Security", "MFA, RBAC, encryption, WAF and monitoring."],
  ["Availability", "99.9% uptime target with monitoring and alerting."],
  ["Confidentiality", "Encryption and least-privilege access controls."],
  ["Privacy", "Data minimization and GDPR-aligned handling."],
];

function StatusBadge({ s }: { s: string }) {
  const tone = s === "Live" ? "bg-valid/12 text-valid" : s === "In progress" ? "bg-unknown/15 text-[#A9761B]" : "bg-ink/[.06] text-ink-2";
  return <span className={`rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${tone}`}>{s}</span>;
}

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title="Compliant from day one — and improving."
        sub="We meet the major data-protection regimes today and are working toward independent security certifications."
      />
      <Container className="max-w-4xl py-16">
        <h2 className="font-serif text-2xl">Roadmap</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-hair">
          <table className="w-full border-collapse text-[14.5px]">
            <tbody>
              {ROADMAP.map(([name, status, desc], i) => (
                <tr key={name} className={i < ROADMAP.length - 1 ? "border-b border-hair" : ""}>
                  <td className="px-5 py-4 font-semibold text-ink">{name}</td>
                  <td className="px-5 py-4"><StatusBadge s={status} /></td>
                  <td className="px-5 py-4 text-ink-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 font-serif text-2xl">How we approach the SOC 2 criteria</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {CRITERIA.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-hair bg-raised p-5 shadow-s1">
              <h3 className="text-lg">{t}</h3>
              <p className="mt-1 text-[14px] text-ink-2">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[14px] text-ink-3">
          Need a DPA, security questionnaire or compliance documentation? Email security@bounceblock.io.
        </p>
      </Container>
    </>
  );
}
