/**
 * Tool review pages: `/reviews/[slug]` (e.g. "ZeroBounce review").
 * Distinct high-traffic intent the SEO plan flags as missing. Each review
 * reuses the shared COMPETITORS facts and layers on a reviewer (E-E-A-T),
 * a transparent per-criterion score, a verdict and a publish date — so the
 * page is a real, attributable review, not a thin restatement.
 *
 * We review competitors honestly; BounceBlock is offered as context, never
 * disguised as the subject.
 */
import { COMPETITORS, REVIEW_RUBRIC } from "@/lib/competitors";

export interface Review {
  /** Matches the competitor slug. */
  slug: string;
  /** Author id from lib/authors.ts who signs the review. */
  reviewerId: string;
  date: string;
  /** One-paragraph editorial verdict. */
  verdict: string;
  /** Per-criterion scores (0–5), aligned to REVIEW_RUBRIC order. */
  scores: [number, number, number, number, number];
}

export const REVIEWS: Review[] = [
  {
    slug: "zerobounce",
    reviewerId: "tom-ellison",
    date: "2026-06-10",
    verdict: "ZeroBounce is the most complete deliverability suite we tested — if you want every monitoring extra in one dashboard and don't mind credit math, it's hard to beat. The catch is breadth: it's email-only, the credit pricing gets fiddly, and a small team that just wants a clean list will pay for features it never touches.",
    scores: [4.6, 4.2, 3.6, 4.0, 4.8],
  },
  {
    slug: "neverbounce",
    reviewerId: "tom-ellison",
    date: "2026-06-09",
    verdict: "NeverBounce is a dependable enterprise bulk verifier with deep CRM integrations and scheduled re-verification. Two things to weigh: its PAYG credits expire after 12 months, and the headline accuracy is a marketing number. Solid for large orgs; less appealing if you want phone data or flat billing.",
    scores: [4.2, 3.6, 3.4, 4.0, 3.6],
  },
  {
    slug: "kickbox",
    reviewerId: "daniel-reyes",
    date: "2026-06-08",
    verdict: "Kickbox is the developer's pick: a clean API, credits that never expire, and Validity's SOC 2 weight behind it. It's deliberately minimal, so don't expect phone, company data or a big monitoring suite. For a credible, no-drama email verifier behind your app, it's excellent.",
    scores: [4.2, 4.4, 3.2, 4.4, 4.0],
  },
  {
    slug: "bouncer",
    reviewerId: "daniel-reyes",
    date: "2026-06-07",
    verdict: "Bouncer is fast, privacy-conscious and beautifully documented — EU data residency and ~200k/hr throughput stand out. Our one caution: independent tests put real accuracy nearer 97.9% than the marketed 99.5%, and it's email-only. A great choice for EU teams that need speed and clean docs.",
    scores: [4.0, 4.2, 3.4, 4.4, 3.8],
  },
  {
    slug: "clearout",
    reviewerId: "priya-nair",
    date: "2026-06-06",
    verdict: "Clearout is the closest thing to a one-vendor contact-data stack — email, phone, company and prospecting under one roof. It's genuinely capable, but everything is credit-metered and the breadth makes the UI busy. If you want the same bundle with flat, predictable billing, that's exactly the gap BounceBlock fills.",
    scores: [4.4, 3.6, 4.6, 3.8, 4.2],
  },
  {
    slug: "hunter-io",
    reviewerId: "priya-nair",
    date: "2026-06-05",
    verdict: "Hunter is an outreach suite first and a verifier second. Its email finder and free no-login deliverability checker are best-in-class. But if your job is cleaning existing lists and validating phones, verification-as-a-side-feature is the wrong shape — and there's no phone or company bundle.",
    scores: [4.0, 3.8, 3.4, 4.2, 4.6],
  },
  {
    slug: "emailable",
    reviewerId: "tom-ellison",
    date: "2026-06-04",
    verdict: "Emailable nails the basics with one of the cleanest UIs in the category and a generous 250-verification free tier. It's email-only and light on extras, so it suits marketers who want a simple, good-looking verifier and nothing more.",
    scores: [4.0, 4.0, 3.0, 4.6, 4.2],
  },
  {
    slug: "debounce",
    reviewerId: "tom-ellison",
    date: "2026-06-03",
    verdict: "DeBounce wins on price — the cheapest per-email we found — and earns goodwill by not charging for 'unknown' results. Accuracy is a notch lower (~97%) and it's email-only with a thinner feature set, but for big budget-driven cleanups the unit economics are tough to argue with.",
    scores: [3.8, 4.6, 3.0, 4.0, 4.0],
  },
  {
    slug: "millionverifier",
    reviewerId: "daniel-reyes",
    date: "2026-06-02",
    verdict: "MillionVerifier is built for scale: a huge 10,000-verification free tier and the throughput to clean a million emails in about six hours. It's spartan beyond bulk verification and email-only, but for cheap, fast, very large cleanups it's a standout.",
    scores: [4.2, 4.4, 3.0, 4.0, 4.6],
  },
  {
    slug: "verifalia",
    reviewerId: "sara-lindqvist",
    date: "2026-06-01",
    verdict: "Verifalia is the compliance pick — EU data sovereignty, tunable quality levels and proper SDKs. It leans developer and the daily free cap is modest, but for regulated or EU-based teams that need verification depth they can dial in, it's a thoughtful choice.",
    scores: [4.2, 4.0, 3.2, 3.8, 3.8],
  },
];

export interface FullReview extends Review {
  competitor: NonNullable<ReturnType<typeof getCompetitorBySlug>>;
  overall: number;
  rubric: typeof REVIEW_RUBRIC;
}

function getCompetitorBySlug(slug: string) {
  return COMPETITORS.find((c) => c.slug === slug);
}

export function getReview(slug: string): FullReview | undefined {
  const r = REVIEWS.find((x) => x.slug === slug);
  const competitor = getCompetitorBySlug(slug);
  if (!r || !competitor) return undefined;
  const overall = Math.round((r.scores.reduce((s, n) => s + n, 0) / r.scores.length) * 10) / 10;
  return { ...r, competitor, overall, rubric: REVIEW_RUBRIC };
}

export const REVIEW_LIST = REVIEWS.map((r) => getReview(r.slug)!).filter(Boolean);
