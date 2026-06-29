import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/products";
import { ProgrammaticPage, type ProgrammaticData } from "@/components/marketing/ProgrammaticPage";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return pageMeta({ title: p.name, description: p.intro.slice(0, 150), path: `/product/${p.slug}` });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 6);

  const data: ProgrammaticData = {
    eyebrow: p.eyebrow,
    h1: p.h1,
    intro: p.intro,
    heroBullets: p.heroBullets,
    sections: p.sections,
    faq: p.faq,
    related: { title: "More from BounceBlock", links: related.map((x) => ({ href: `/product/${x.slug}`, label: x.name })) },
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Product", path: "/product" },
      { name: p.name, path: `/product/${p.slug}` },
    ],
  };

  return <ProgrammaticPage data={data} />;
}
