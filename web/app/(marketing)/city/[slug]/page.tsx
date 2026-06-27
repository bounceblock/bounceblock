import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCAL, getLocal } from "@/lib/seo-data";
import { buildLocalPage } from "@/lib/seo-content";
import { SeoLanding } from "@/components/marketing/SeoLanding";

export function generateStaticParams() {
  return LOCAL.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getLocal(params.slug);
  if (!e) return {};
  return {
    title: `${e.industryLabel} Lead Verification in ${e.cityLabel}`,
    description: `Clean ${e.industryLabel.toLowerCase()} lead lists in ${e.cityLabel} — verify emails, validate phones, remove duplicates. One flat price.`,
  };
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const e = getLocal(params.slug);
  if (!e) notFound();
  const built = buildLocalPage(e);
  const related = LOCAL.filter((x) => x.industrySlug === e.industrySlug && x.slug !== e.slug).slice(0, 8);
  return (
    <SeoLanding
      built={built}
      related={related}
      relatedBase="/city"
      relatedTitle={`${e.industryLabel} in other cities`}
      crossLink={{ href: "/industries", label: "Browse industries →" }}
    />
  );
}
