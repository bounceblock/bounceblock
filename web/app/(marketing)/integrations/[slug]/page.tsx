import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INTEGRATIONS, getIntegration } from "@/lib/integrations";
import { getIntegrationExtra } from "@/lib/integration-extra";
import { ProgrammaticPage, type ProgrammaticData } from "@/components/marketing/ProgrammaticPage";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return INTEGRATIONS.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const i = getIntegration(params.slug);
  if (!i) return {};
  return pageMeta({
    title: `BounceBlock for ${i.name} — Verify Emails, Phones & Companies`,
    description: `Clean your ${i.name} ${i.records}: verify emails, validate phones and check company data, then re-import a verified list. One flat price.`,
    path: `/integrations/${i.slug}`,
  });
}

export default function IntegrationPage({ params }: { params: { slug: string } }) {
  const i = getIntegration(params.slug);
  if (!i) notFound();
  const x = getIntegrationExtra(i.slug); // unique, tool-specific copy
  const related = INTEGRATIONS.filter((y) => y.slug !== i.slug).slice(0, 8);

  const data: ProgrammaticData = {
    eyebrow: `Integration · ${i.name}`,
    h1: `Verify your ${i.name} ${i.records} with BounceBlock`,
    intro:
      x?.intro ??
      `${i.name} is ${i.blurb} — and over time its ${i.records} fill with dead emails, disconnected numbers and duplicates. BounceBlock cleans an export from ${i.name} in minutes. Re-import a list you can trust.`,
    heroBullets: ["Email + phone + company", "Works with a CSV today", "Flat pricing, no credits"],
    sections: [
      {
        heading: `How to clean ${i.name} data with BounceBlock`,
        bullets: x?.steps ?? [
          `Export your ${i.records} from ${i.name} as a CSV.`,
          "Upload to BounceBlock — we auto-detect the email, phone and company columns.",
          "Preview the first 100 rows free, then process the full list.",
          `Download the verified file and re-import it into ${i.name}, or suppress the bad records.`,
        ],
      },
      {
        heading: `Why ${i.name} ${i.records} need verifying`,
        paras: [
          x?.why ??
            `Contact data decays constantly. Left unchecked, a ${i.name} database accumulates hard-bouncing emails and disconnected phones that waste outreach and drag down your sender reputation.`,
          `Verifying email, phone and company in one pass — flat-priced, not per-verification credits — keeps your ${i.name} ${i.records} deliverable and your reporting honest. A native sync is on the roadmap; today it's a quick CSV round-trip or a real-time API check.`,
        ],
      },
    ],
    faq: x?.faq ?? [
      { q: `Does BounceBlock connect to ${i.name}?`, a: `Today you clean ${i.name} data via a quick CSV export/import, and the API can verify records in real time. A native one-click sync is on the roadmap.` },
      { q: "Do you validate phone numbers too?", a: "Yes — email, phone and company data in the same upload, at one flat price." },
      { q: "Will it create duplicates?", a: "No — we dedupe within your file, and you choose whether to re-import or suppress." },
      { q: "Is my data safe?", a: "Your uploaded file is encrypted and permanently deleted within 24 hours." },
    ],
    related: {
      title: "More integrations",
      links: related.map((x) => ({ href: `/integrations/${x.slug}`, label: x.name })),
    },
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Integrations", path: "/integrations" },
      { name: i.name, path: `/integrations/${i.slug}` },
    ],
  };

  return <ProgrammaticPage data={data} />;
}
