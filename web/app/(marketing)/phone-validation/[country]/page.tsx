import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRIES, getCountry, isCountryIndexed } from "@/lib/countries";
import { ProgrammaticPage, type ProgrammaticData } from "@/components/marketing/ProgrammaticPage";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
  const c = getCountry(params.country);
  if (!c) return {};
  return pageMeta({
    title: `Phone Number Validation in ${c.name}`,
    description: `Validate ${c.name} phone numbers (${c.dial}) — line type, carrier and active status. Bundled with email + company verification at one flat price.`,
    path: `/phone-validation/${c.slug}`,
    noindex: !isCountryIndexed(c.slug), // long-tail markets parked until they carry unique per-country content
  });
}

export default function CountryPhonePage({ params }: { params: { country: string } }) {
  const c = getCountry(params.country);
  if (!c) notFound();
  const related = COUNTRIES.filter((x) => x.slug !== c.slug).slice(0, 12);

  const data: ProgrammaticData = {
    eyebrow: `Phone validation · ${c.name}`,
    h1: `Phone number validation in ${c.name}`,
    intro: `Check whether ${c.name} numbers (${c.dial}) are live, what line type they are, and which carrier they belong to — before your team dials or sends a single SMS. BounceBlock validates ${c.name} phones alongside email and company data, in one upload, at one flat price.`,
    heroBullets: ["Line type + carrier", "Bundled with email + company", "Flat pricing, no credits"],
    sections: [
      {
        heading: `What we check on every ${c.name} number`,
        bullets: [
          `Active status — is the ${c.dial} number reachable or disconnected?`,
          "Line type — mobile, landline or VoIP, so you call the right way.",
          "Carrier and country, normalised to E.164 format.",
          "Formatting and country-code errors that break dialers and SMS tools.",
        ],
      },
      {
        heading: `Why ${c.name} phone data goes bad`,
        paras: [
          `Numbers in ${c.name} get reassigned, ported between carriers, and disconnected over time — so a list that was clean last quarter quietly fills with dead lines. Dialing them wastes rep time, and texting them wastes SMS spend and can hurt your sender standing.`,
          `Validating ${c.name} numbers before a campaign means your team only spends minutes on contacts that are real and reachable.`,
        ],
      },
      {
        heading: "Email, phone and company — in one pass",
        paras: [
          `Most tools make you buy phone validation separately from email verification. BounceBlock does both in the same upload, plus company checks, so one clean file covers your whole ${c.name} outreach — calls, texts and email.`,
        ],
      },
    ],
    faq: [
      { q: `Can you validate ${c.name} phone numbers?`, a: `Yes. Upload a list with ${c.name} numbers (${c.dial}) and we return active status, line type and carrier for each — in the same run as your email and company checks.` },
      { q: "Do you validate mobile and landline?", a: "Both — plus VoIP detection, so you know which numbers are safe to text and which are best to call." },
      { q: "How is it priced?", a: "One flat monthly subscription that covers email, phone and company verification together. No per-lookup credits to track." },
      { q: "Is my data safe?", a: "Your uploaded file is encrypted and permanently deleted within 24 hours. We never sell or share your data." },
    ],
    related: {
      title: "Phone validation in other countries",
      links: related.map((x) => ({ href: `/phone-validation/${x.slug}`, label: x.name })),
    },
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Phone validation", path: "/phone-validation" },
      { name: c.name, path: `/phone-validation/${c.slug}` },
    ],
  };

  return <ProgrammaticPage data={data} />;
}
