import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALTERNATIVES, getAlternative } from "@/lib/seo-data";
import { AlternativeLanding } from "@/components/marketing/AlternativeLanding";

export function generateStaticParams() {
  return ALTERNATIVES.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getAlternative(params.slug);
  if (!e) return {};
  return {
    title: `BounceBlock vs ${e.label}`,
    description: `An honest comparison of BounceBlock and ${e.label}: pricing, phone validation, free tier and simplicity.`,
  };
}

export default function AlternativePage({ params }: { params: { slug: string } }) {
  const e = getAlternative(params.slug);
  if (!e) notFound();
  const related = ALTERNATIVES.filter((x) => x.slug !== e.slug).slice(0, 8);
  return <AlternativeLanding alt={e} related={related} />;
}
