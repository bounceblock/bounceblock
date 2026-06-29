import { USECASE_EXTRA_A } from "./usecase-extra-a";
import { USECASE_EXTRA_B } from "./usecase-extra-b";

/**
 * Unique, task-specific content (intro / challenges / FAQ) that replaces the
 * shared boilerplate on /use-case/[slug] pages — so no two read alike. Keyed by
 * the same slug as lib/seo-data.ts USE_CASES.
 */
export interface UseCaseExtra {
  slug: string;
  intro: string;
  challenges: string[];
  faq: { q: string; a: string }[];
}

const ALL: UseCaseExtra[] = [...USECASE_EXTRA_A, ...USECASE_EXTRA_B];
const map = new Map(ALL.map((e) => [e.slug, e]));

export function getUseCaseExtra(slug: string): UseCaseExtra | undefined {
  return map.get(slug);
}
