import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { CITIES, LOCAL_INDUSTRIES } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Locations",
  description: "Lead verification for sales teams in cities across the US.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Clean leads, wherever you sell"
        sub="Local lead verification for real estate, insurance, recruiting, mortgage and solar teams across the country."
      />
      <Container className="py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((c) => (
            <div key={c.slug}>
              <h2 className="font-serif text-xl">{c.label}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {LOCAL_INDUSTRIES.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/city/${c.slug}-${ind.slug}`}
                    className="rounded-full border border-hair bg-raised px-3 py-1.5 text-[12.5px] text-ink-2 transition-colors hover:border-brand hover:text-brand-deep"
                  >
                    {ind.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
