import { INDUSTRY_EXTRA_A } from "./industry-extra-a";
import { INDUSTRY_EXTRA_B } from "./industry-extra-b";

/**
 * Unique, industry-specific content (intro / challenges / FAQ) that replaces the
 * shared boilerplate on /industry/[slug] pages — so no two read alike. Keyed by
 * the same slug as lib/seo-data.ts INDUSTRIES.
 */
export interface IndustryExtra {
  slug: string;
  intro: string;
  challenges: string[];
  faq: { q: string; a: string }[];
}

const ALL: IndustryExtra[] = [...INDUSTRY_EXTRA_A, ...INDUSTRY_EXTRA_B];
const map = new Map(ALL.map((e) => [e.slug, e]));

export function getIndustryExtra(slug: string): IndustryExtra | undefined {
  return map.get(slug);
}
