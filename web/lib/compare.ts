/**
 * Head-to-head comparison pages: `/compare/[a]-vs-[b]`.
 * The SEO plan flags these as a missing money-page type — we have the matrix
 * hub but no competitor-vs-competitor children that capture "ZeroBounce vs
 * NeverBounce" intent. Each pair is built from the shared COMPETITORS facts, so
 * the content is real and distinct, and every page presents BounceBlock as the
 * bundled, flat-priced third option (the honest play, not a bait-and-switch).
 */
import { COMPETITORS, getCompetitor, type Competitor } from "@/lib/competitors";

/** Curated, high-intent matchups (unordered — one canonical direction each). */
const PAIRS: [string, string][] = [
  ["zerobounce", "neverbounce"],
  ["zerobounce", "kickbox"],
  ["zerobounce", "bouncer"],
  ["zerobounce", "clearout"],
  ["zerobounce", "emailable"],
  ["zerobounce", "millionverifier"],
  ["zerobounce", "debounce"],
  ["neverbounce", "kickbox"],
  ["neverbounce", "bouncer"],
  ["neverbounce", "clearout"],
  ["kickbox", "bouncer"],
  ["kickbox", "emailable"],
  ["kickbox", "clearout"],
  ["bouncer", "clearout"],
  ["bouncer", "emailable"],
  ["clearout", "hunter-io"],
  ["emailable", "millionverifier"],
  ["debounce", "millionverifier"],
  ["debounce", "emailable"],
  ["verifalia", "zerobounce"],
];

export interface ComparePair {
  slug: string;
  a: Competitor;
  b: Competitor;
}

export const COMPARE_PAIRS: ComparePair[] = PAIRS.map(([aSlug, bSlug]) => {
  const a = getCompetitor(aSlug)!;
  const b = getCompetitor(bSlug)!;
  return { slug: `${aSlug}-vs-${bSlug}`, a, b };
}).filter((p) => p.a && p.b);

export function getComparePair(slug: string) {
  return COMPARE_PAIRS.find((p) => p.slug === slug);
}

/** Slugs of competitors that appear in at least one matchup (for hub chips). */
export const COMPARED_SLUGS = Array.from(
  new Set(PAIRS.flat())
).filter((s) => COMPETITORS.some((c) => c.slug === s));
