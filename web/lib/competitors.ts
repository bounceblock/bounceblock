/**
 * Shared competitor facts — the structured, research-backed data behind both
 * the review pages (`/reviews/[slug]`) and the head-to-head comparison pages
 * (`/compare/[a]-vs-[b]`). Keeping the facts in ONE place is what makes those
 * programmatic pages genuinely unique instead of thin/duplicative: every page
 * is built from real, differentiated data (accuracy claims, pricing model,
 * free tier, whether credits expire, standout strength, honest weakness).
 *
 * Sourced from public pricing/marketing pages, June 2026 (see SEO_PLAN.md §2).
 * We assert structural differences (email-only vs bundled, credit-metered vs
 * flat) — not exact prices, which change.
 */

export type Category = "email" | "phone" | "company";

export interface Competitor {
  slug: string;
  name: string;
  category: Category;
  /** Headline accuracy the vendor markets, with our framing. */
  accuracy: string;
  /** How they charge. */
  model: string;
  /** Representative pay-as-you-go price point (structural, not a quote). */
  payg: string;
  /** Free tier on offer. */
  freeTier: string;
  /** Do unused credits expire? The honest-billing axis BounceBlock competes on. */
  creditsExpire: "Yes" | "No" | "N/A";
  /** Does the product bundle phone validation in the same upload? */
  phone: boolean;
  /** Does the product verify/enrich company data? */
  company: boolean;
  /** One-line standout strength (why people pick them). */
  standout: string;
  /** Honest weakness / the gap BounceBlock fills. */
  gap: string;
  /** Notable free tools they run (link magnets). */
  freeTools: string;
  /** Best-fit buyer. */
  bestFor: string;
  /** Our verdict score out of 5 (editorial, transparent rubric below). */
  score: number;
  /** Pros for the review page. */
  pros: string[];
  /** Cons for the review page. */
  cons: string[];
}

export const COMPETITORS: Competitor[] = [
  {
    slug: "zerobounce",
    name: "ZeroBounce",
    category: "email",
    accuracy: "Markets 99%+ (99.6% in its own tests)",
    model: "Credit-based (credits + monthly subscriptions)",
    payg: "~$0.01 / email (2,000 minimum)",
    freeTier: "100 verifications / month",
    creditsExpire: "No",
    phone: false,
    company: false,
    standout: "The deepest deliverability suite — AI catch-all score (0–10), Activity Data, DMARC and blacklist monitors, inbox-placement tests.",
    gap: "Email-only and credit-metered. No phone validation in the same workflow, and the pricing math gets complex at scale.",
    freeTools: "SPF/DKIM/DMARC generators, blacklist checker, IP reputation, email server test, email finder",
    bestFor: "Deliverability teams that want every monitoring extra in one place and don't mind credit math.",
    score: 4.4,
    pros: [
      "Largest free-tool and deliverability-monitoring suite in the category",
      "AI-scored catch-all resolution instead of a flat 'unknown'",
      "Credits don't expire — a fair-billing point most rivals miss",
    ],
    cons: [
      "Credit-based pricing is hard to predict for irregular volumes",
      "No bundled phone validation — you need a second tool",
      "The feature surface can overwhelm a small team that just wants a clean list",
    ],
  },
  {
    slug: "neverbounce",
    name: "NeverBounce",
    category: "email",
    accuracy: "Markets 99.9% (a marketing figure, not independently tested)",
    model: "Credit-based + pay-as-you-go",
    payg: "~$8 / 1,000 emails",
    freeTier: "Small free allowance",
    creditsExpire: "Yes",
    phone: false,
    company: false,
    standout: "Enterprise-grade bulk processing with 80+ integrations and Clean+ recurring CRM re-verification.",
    gap: "PAYG credits expire after 12 months, it's email-only, and the headline accuracy is a marketing claim.",
    freeTools: "Basic email checker",
    bestFor: "Larger orgs already living inside a CRM that needs scheduled re-verification.",
    score: 4.0,
    pros: [
      "Mature bulk engine and 80+ native integrations",
      "Clean+ keeps CRM lists re-verified on a schedule",
      "Well-known, widely trusted brand",
    ],
    cons: [
      "Pay-as-you-go credits expire after 12 months",
      "Email-only — no phone or company data",
      "Accuracy figure is marketing, not third-party verified",
    ],
  },
  {
    slug: "kickbox",
    name: "Kickbox",
    category: "email",
    accuracy: "Guarantees 95% deliverability accuracy",
    model: "Credit-based, flat per-email",
    payg: "~$0.008 / email (flat)",
    freeTier: "100 free verifications",
    creditsExpire: "No",
    phone: false,
    company: false,
    standout: "A clean, minimal API and a Sendgrid-grade reputation — owned by Validity, with SOC 2 credibility.",
    gap: "Deliberately minimal: no phone, no company data, and fewer deliverability extras than ZeroBounce.",
    freeTools: "Spam checker, email verifier, disposable checker",
    bestFor: "Developers who want a clean API and a credible, no-frills verifier.",
    score: 4.2,
    pros: [
      "Excellent, well-documented API and clean developer experience",
      "Credits never expire and the per-email price is flat",
      "Validity ownership adds SOC 2 / enterprise trust",
    ],
    cons: [
      "Email-only and intentionally feature-light",
      "95% guarantee is more conservative than rivals' claims",
      "No bundled phone or company verification",
    ],
  },
  {
    slug: "bouncer",
    name: "Bouncer",
    category: "email",
    accuracy: "Markets 99.5% (≈97.9% in independent tests)",
    model: "Credit-based with volume tiers",
    payg: "~$8 → $2 / 1,000 as volume rises",
    freeTier: "100 free verifications",
    creditsExpire: "No",
    phone: false,
    company: false,
    standout: "Speed (up to 200k/hr), the best API docs in the category, EU/GDPR data residency and a toxicity check.",
    gap: "Email-only. Great at the email job, but you still need a separate phone and company tool.",
    freeTools: "Deliverability kit",
    bestFor: "Privacy-conscious EU teams that need fast bulk and clean docs.",
    score: 4.3,
    pros: [
      "Among the fastest bulk verifiers (≈200k/hr)",
      "EU data residency and strong GDPR posture",
      "Credits don't expire; clear, developer-friendly docs",
    ],
    cons: [
      "Independent accuracy (≈97.9%) trails the marketed 99.5%",
      "Email-only — no phone or company data",
      "Fewer monitoring extras than ZeroBounce",
    ],
  },
  {
    slug: "clearout",
    name: "Clearout",
    category: "email",
    accuracy: "Markets 99.73%",
    model: "Credit-based, usage tiers",
    payg: "Usage-based credit packs",
    freeTier: "100 free credits",
    creditsExpire: "No",
    phone: true,
    company: true,
    standout: "The closest multi-product analog — email + ClearoutPhone + company/enrichment + Form Guard + prospecting, HubSpot-certified.",
    gap: "Powerful but credit-metered and sprawling. BounceBlock does the same bundle with flat, honest billing and a simpler UI.",
    freeTools: "Disposable checker, reverse email/LinkedIn lookup, list cleaner",
    bestFor: "Teams that want email + phone + company in one vendor and accept credit-based billing.",
    score: 4.3,
    pros: [
      "Genuinely multi-product: email, phone, company and prospecting",
      "High marketed accuracy with an AI verdict per address",
      "HubSpot-certified with a solid free-tool lineup",
    ],
    cons: [
      "Credit-metered across every product — billing is complex",
      "The breadth makes the UI busy for a simple list-cleaning job",
      "No flat, predictable monthly price",
    ],
  },
  {
    slug: "hunter-io",
    name: "Hunter.io",
    category: "email",
    accuracy: "High (SMTP + catch-all detection)",
    model: "Monthly credit tiers",
    payg: "Tiered plans (searches + verifications)",
    freeTier: "25 searches + 50 verifications / month",
    creditsExpire: "N/A",
    phone: false,
    company: false,
    standout: "An outreach suite — Email Finder, Domain Search and Campaigns — plus a no-login deliverability checker that earns links for years.",
    gap: "Verification is a side feature of a prospecting tool. If you mainly clean lists and validate phones, it's the wrong shape.",
    freeTools: "No-login deliverability checker, SPF/DKIM/DMARC, email finder",
    bestFor: "Sales teams that want to find and reach new contacts, not just clean existing lists.",
    score: 4.1,
    pros: [
      "Best-in-class email finder and domain search",
      "Free no-login deliverability checker is a genuinely useful tool",
      "Strong brand and broad integrations",
    ],
    cons: [
      "Verification is secondary to prospecting",
      "No phone validation or company verification bundle",
      "Credit tiers can be limiting for pure list-cleaning",
    ],
  },
  {
    slug: "emailable",
    name: "Emailable",
    category: "email",
    accuracy: "Markets ~98%",
    model: "Credit-based, usage tiers",
    payg: "Usage-based credit packs",
    freeTier: "250 free verifications",
    creditsExpire: "No",
    phone: false,
    company: false,
    standout: "A fast, clean, modern UI — one of the easiest email verifiers to actually use.",
    gap: "Email-only with a light feature set. No phone, no company, fewer deliverability tools.",
    freeTools: "Basic email checker",
    bestFor: "Marketers who want a simple, good-looking email verifier and nothing more.",
    score: 4.0,
    pros: [
      "Clean, fast, easy-to-use interface",
      "Generous 250-verification free tier",
      "Credits don't expire",
    ],
    cons: [
      "Email-only — no phone or company data",
      "Fewer deliverability extras than ZeroBounce or Bouncer",
      "Credit-metered rather than flat-priced",
    ],
  },
  {
    slug: "debounce",
    name: "DeBounce",
    category: "email",
    accuracy: "Markets ~97%",
    model: "Credit-based",
    payg: "~$0.0015 / email (the cheapest)",
    freeTier: "100 free verifications",
    creditsExpire: "No",
    phone: false,
    company: false,
    standout: "The lowest per-email cost in the category — and it doesn't charge you for 'unknown' results.",
    gap: "Rock-bottom price, but email-only with a thinner feature set and no phone validation.",
    freeTools: "Bulk checker, blacklist checker",
    bestFor: "Budget-driven teams cleaning big lists who want the lowest unit cost.",
    score: 4.1,
    pros: [
      "Cheapest per-email price in the category",
      "Doesn't bill you for 'unknown' results — a fair-billing standout",
      "Credits never expire",
    ],
    cons: [
      "Email-only — no phone or company verification",
      "Lower marketed accuracy (~97%)",
      "Fewer monitoring and deliverability extras",
    ],
  },
  {
    slug: "millionverifier",
    name: "MillionVerifier",
    category: "email",
    accuracy: "High",
    model: "Credit-based",
    payg: "~$0.0037 / email",
    freeTier: "10,000 free verifications (the most generous)",
    creditsExpire: "No",
    phone: false,
    company: false,
    standout: "Huge throughput (1M emails in ~6 hours) and the most generous free tier in the category.",
    gap: "Email-only. Built for raw bulk volume, not a bundled email + phone + company workflow.",
    freeTools: "Bulk checker",
    bestFor: "Anyone cleaning very large lists who wants cheap scale and a big free trial.",
    score: 4.2,
    pros: [
      "Most generous free tier (10,000 verifications)",
      "Excellent throughput at scale",
      "Cheap per-email and credits don't expire",
    ],
    cons: [
      "Email-only — no phone or company data",
      "Spartan feature set beyond bulk verification",
      "No flat monthly pricing",
    ],
  },
  {
    slug: "verifalia",
    name: "Verifalia",
    category: "email",
    accuracy: "Markets ~98%",
    model: "Credit packs + subscriptions",
    payg: "~$0.005 / email",
    freeTier: "25 verifications / day",
    creditsExpire: "N/A",
    phone: false,
    company: false,
    standout: "The compliance leader — EU data sovereignty, quality levels (Standard / High / Extreme) and first-class SDKs.",
    gap: "Email-only and developer-leaning. Strong on compliance, but no phone or company bundle.",
    freeTools: "Email checker",
    bestFor: "EU and regulated teams that need data sovereignty and tunable verification depth.",
    score: 4.1,
    pros: [
      "Strong EU data-sovereignty and compliance story",
      "Tunable quality levels (Standard/High/Extreme)",
      "Well-built SDKs for developers",
    ],
    cons: [
      "Email-only — no phone or company verification",
      "Daily free cap is modest (25/day)",
      "More developer-oriented than plug-and-play",
    ],
  },
];

export function getCompetitor(slug: string) {
  return COMPETITORS.find((c) => c.slug === slug);
}

/** The transparent rubric shown on every review page (E-E-A-T). */
export const REVIEW_RUBRIC = [
  "Accuracy & catch-all handling",
  "Pricing transparency & whether credits expire",
  "Breadth (email, phone, company in one workflow)",
  "Ease of use for non-technical teams",
  "Free tier & free tools",
] as const;
