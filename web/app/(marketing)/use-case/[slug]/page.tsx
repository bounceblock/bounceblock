import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { USE_CASES, getUseCase } from "@/lib/seo-data";
import { buildUseCasePage } from "@/lib/seo-content";
import { SeoLanding } from "@/components/marketing/SeoLanding";

export function generateStaticParams() {
  return USE_CASES.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getUseCase(params.slug);
  if (!e) return {};
  return {
    title: e.label,
    description: `${e.label} with BounceBlock — verify emails, validate phones and remove duplicates. One flat price, results in two minutes.`,
  };
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const e = getUseCase(params.slug);
  if (!e) notFound();
  const built = buildUseCasePage(e);
  const related = USE_CASES.filter((x) => x.slug !== e.slug).slice(0, 8);
  return (
    <SeoLanding
      built={built}
      related={related}
      relatedBase="/use-case"
      relatedTitle="More use cases"
      crossLink={{ href: "/industries", label: "Browse industries →" }}
    />
  );
}
