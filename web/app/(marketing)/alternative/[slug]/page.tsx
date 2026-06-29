import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALTERNATIVES, getAlternative } from "@/lib/seo-data";
import { AlternativeLanding } from "@/components/marketing/AlternativeLanding";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return ALTERNATIVES.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getAlternative(params.slug);
  if (!e) return {};
  return pageMeta({
    title: `BounceBlock vs ${e.label}`,
    description: `An honest comparison of BounceBlock and ${e.label}: pricing, phone validation, free tier and simplicity.`,
    path: `/alternative/${e.slug}`,
  });
}

export default function AlternativePage({ params }: { params: { slug: string } }) {
  const e = getAlternative(params.slug);
  if (!e) notFound();
  const related = ALTERNATIVES.filter((x) => x.slug !== e.slug).slice(0, 8);
  return <AlternativeLanding alt={e} related={related} />;
}
