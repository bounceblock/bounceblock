import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROLES, getRole } from "@/lib/roles";
import { ProgrammaticPage, type ProgrammaticData } from "@/components/marketing/ProgrammaticPage";
import { pageMeta } from "@/lib/seo-meta";

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getRole(params.slug);
  if (!r) return {};
  return pageMeta({ title: `BounceBlock for ${r.name}`, description: r.intro.slice(0, 150), path: `/for/${r.slug}` });
}

export default function RolePage({ params }: { params: { slug: string } }) {
  const r = getRole(params.slug);
  if (!r) notFound();
  const related = ROLES.filter((x) => x.slug !== r.slug);

  const data: ProgrammaticData = {
    eyebrow: r.eyebrow,
    h1: r.h1,
    intro: r.intro,
    heroBullets: ["Email + phone + company", "Flat pricing, no credits", "Free 100-row preview"],
    sections: r.sections,
    faq: r.faq,
    related: { title: "BounceBlock for other teams", links: related.map((x) => ({ href: `/for/${x.slug}`, label: `For ${x.name}` })) },
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: `For ${r.name}`, path: `/for/${r.slug}` },
    ],
  };

  return <ProgrammaticPage data={data} />;
}
