import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { FinalCta } from "@/components/marketing/FinalCta";
import { RESOURCES } from "@/lib/resources";
import { pageMeta } from "@/lib/seo-meta";

export const metadata: Metadata = pageMeta({
  title: "Free Resources — Checklists, Templates & Playbooks",
  description: "Free deliverability and data-hygiene checklists, templates and playbooks: list cleaning, cold email, SPF/DKIM/DMARC setup, CRM hygiene and more.",
  path: "/resources",
});

export default function ResourcesHub() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Checklists, templates & playbooks"
        sub="Practical, free resources to keep your contact data clean and your email landing in the inbox. No gate to read — grab the downloadable version if you want it."
      />
      <Container className="py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <Link
              key={r.slug}
              href={`/resources/${r.slug}`}
              className="group flex flex-col rounded-2xl border border-hair bg-raised p-6 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-s2"
            >
              <span className="w-fit rounded-full bg-brand-wash px-3 py-1 text-[11.5px] font-semibold uppercase tracking-wide text-brand-deep">{r.type}</span>
              <h2 className="mt-3 font-serif text-[19px] text-ink group-hover:text-brand-deep">{r.title}</h2>
              <p className="mt-1.5 text-[14px] text-ink-2">{r.description}</p>
              <span className="mt-4 text-[13px] font-medium text-brand-deep">Open →</span>
            </Link>
          ))}
        </div>
      </Container>
      <FinalCta />
    </>
  );
}
