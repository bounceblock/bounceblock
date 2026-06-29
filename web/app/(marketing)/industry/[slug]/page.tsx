import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustry } from "@/lib/seo-data";
import { buildIndustryPage } from "@/lib/seo-content";
import { SeoLanding } from "@/components/marketing/SeoLanding";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return INDUSTRIES.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getIndustry(params.slug);
  if (!e) return {};
  return pageMeta({
    title: `${e.label} Lead Verification`,
    description: `Clean your ${e.label.toLowerCase()} lead lists — verify emails, validate phones, remove duplicates. One flat price, results in two minutes.`,
    path: `/industry/${e.slug}`,
  });
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const e = getIndustry(params.slug);
  if (!e) notFound();
  const built = buildIndustryPage(e);
  const related = INDUSTRIES.filter((x) => x.slug !== e.slug).slice(0, 8);
  return (
    <SeoLanding
      built={built}
      related={related}
      relatedBase="/industry"
      relatedTitle="More industries"
      crossLink={{ href: "/use-cases", label: "Browse use cases →" }}
      breadcrumb={[
        { name: "Home", path: "/" },
        { name: "Industries", path: "/industries" },
        { name: e.label, path: `/industry/${e.slug}` },
      ]}
    />
  );
}
