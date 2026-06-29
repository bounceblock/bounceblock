import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURES, getFeature } from "@/lib/features";
import { getFeatureExtra } from "@/lib/feature-extra";
import { ProgrammaticPage, type ProgrammaticData } from "@/components/marketing/ProgrammaticPage";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = getFeature(params.slug);
  if (!f) return {};
  return pageMeta({ title: f.name, description: f.tagline, path: `/features/${f.slug}` });
}

export default function FeaturePage({ params }: { params: { slug: string } }) {
  const f = getFeature(params.slug);
  if (!f) notFound();
  const related = FEATURES.filter((x) => x.slug !== f.slug).slice(0, 8);

  const fx = getFeatureExtra(f.slug); // unique per-feature context + FAQ

  const data: ProgrammaticData = {
    eyebrow: `Feature · ${f.group}`,
    h1: f.name,
    intro: f.tagline,
    heroBullets: ["Email + phone + company", "Flat pricing, no credits", "Free 100-row preview"],
    sections: [
      { heading: "What it does", bullets: f.what },
      { heading: "Why it matters", paras: [f.why, ...(fx ? [fx.context] : [])] },
    ],
    faq: fx?.faq ?? [
      { q: `Is ${f.name.toLowerCase()} included?`, a: "Yes — it's part of BounceBlock's verification engine, included in your plan rather than sold as a separate add-on." },
      { q: "Can I try it free?", a: "Yes — preview your first 100 contacts free, no credit card, and see the results before you pay." },
      { q: "Is my data safe?", a: "Your uploaded data is encrypted and permanently deleted within 24 hours. We never sell or share it." },
    ],
    related: { title: "More features", links: related.map((x) => ({ href: `/features/${x.slug}`, label: x.name })) },
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Features", path: "/features" },
      { name: f.name, path: `/features/${f.slug}` },
    ],
  };

  return <ProgrammaticPage data={data} />;
}
