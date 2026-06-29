import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALTERNATIVES, getAlternative } from "@/lib/seo-data";
import { ProgrammaticPage, type ProgrammaticData } from "@/components/marketing/ProgrammaticPage";
import { pageMeta } from "@/lib/seo-meta";

// Best-known competitors that teams actively search alternatives for.
const SLUGS = ["zerobounce", "neverbounce", "kickbox", "bouncer", "clearout", "emailable", "hunter-io", "millionverifier", "debounce", "verifalia"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getAlternative(params.slug);
  if (!e) return {};
  return pageMeta({
    title: `The Best ${e.label} Alternative in 2026`,
    description: `Looking for a ${e.label} alternative? BounceBlock verifies email, phone and company in one upload, flat-priced — no credits to track.`,
    path: `/best-alternative/${e.slug}`,
    noindex: true, // overlaps /alternative (81% similar) — parked until differentiated
  });
}

export default function BestAlternativePage({ params }: { params: { slug: string } }) {
  const e = getAlternative(params.slug);
  if (!e || !SLUGS.includes(params.slug)) notFound();
  const related = ALTERNATIVES.filter((x) => SLUGS.includes(x.slug) && x.slug !== e.slug);

  const data: ProgrammaticData = {
    eyebrow: `${e.label} alternative`,
    h1: `The best ${e.label} alternative`,
    intro: `${e.why} If you're comparing ${e.label} alternatives, here's an honest look at where BounceBlock fits and why teams switch.`,
    heroBullets: ["Email + phone + company", "Flat pricing, no credits", "Free 100-row preview"],
    sections: [
      {
        heading: `Why teams look for a ${e.label} alternative`,
        paras: [
          `${e.label} uses a ${e.model.toLowerCase()} model and, like most verifiers, focuses on email only. That works until you also need to validate phone numbers, check company data, or you simply don't want to manage a credit balance.`,
          "BounceBlock was built for teams that want one clean file — email, phone and company — at a price they can budget for.",
        ],
      },
      {
        heading: "How BounceBlock compares",
        bullets: [
          "Email verification: syntax, domain, MX and mailbox checks, catch-all and disposable detection.",
          "Phone validation: line type, carrier and active status — in the same upload.",
          "Company data: enrichment and name-to-domain matching alongside contact verification.",
          "Flat monthly pricing instead of per-verification credits, with a free 100-row preview.",
        ],
      },
      {
        heading: `Switching from ${e.label}`,
        paras: [
          `There's nothing to migrate — export your list as a CSV, upload it to BounceBlock, and preview the first 100 rows free. If it's a fit, process the full list and download a verified file. Business-plan customers can also verify in real time via the API.`,
        ],
      },
    ],
    faq: [
      { q: `Is BounceBlock a good ${e.label} alternative?`, a: `If you want phone and company verification bundled with email, and flat pricing instead of ${e.label}'s ${e.model.toLowerCase()} model, yes — it's designed for exactly that.` },
      { q: "Do I have to buy credits?", a: "No. BounceBlock is a flat monthly subscription with a generous allowance — no credit packs to buy or track." },
      { q: "Can I try it before switching?", a: "Yes — preview your first 100 contacts free, no credit card. You'll see your quality score before you pay." },
      { q: "Is my data safe?", a: "Your uploaded file is encrypted and permanently deleted within 24 hours. We never sell or share your data." },
    ],
    related: {
      title: "Compare other alternatives",
      links: [
        ...related.map((x) => ({ href: `/best-alternative/${x.slug}`, label: `Best ${x.label} alternative` })),
        { href: `/alternative/${e.slug}`, label: `BounceBlock vs ${e.label}` },
      ],
    },
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Alternatives", path: "/alternatives" },
      { name: `Best ${e.label} alternative`, path: `/best-alternative/${e.slug}` },
    ],
    ctaLabel: "Try the free preview →",
  };

  return <ProgrammaticPage data={data} />;
}
