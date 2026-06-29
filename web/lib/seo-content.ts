import type { SeoEntry, LocalEntry } from "./seo-data";
import { getIndustryExtra } from "./industry-content";
import { getUseCaseExtra } from "./usecase-content";

export interface BuiltPage {
  eyebrow: string;
  h1: string;
  intro: string;
  pains: string[];
  benefits: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
}

const SHARED_FAQ = (subject: string) => [
  { q: "Do you validate phone numbers too?", a: "Yes — email and phone in the same upload, at one flat price. Most verification tools only check email." },
  { q: "How fast is it?", a: "Upload a CSV and preview your first 100 contacts free in under two minutes. No credit card required." },
  { q: "Is my data safe?", a: `Your ${subject} file is encrypted with AES-256 and permanently deleted within 24 hours. We never sell or share your data.` },
];

export function buildIndustryPage(e: SeoEntry): BuiltPage {
  const lower = e.label.toLowerCase();
  const x = getIndustryExtra(e.slug); // unique, industry-specific copy (intro/challenges/FAQ)
  return {
    eyebrow: `${e.label} lead verification`,
    h1: `${e.label} lead verification`,
    intro:
      x?.intro ??
      `Up to 40% of ${lower} lead lists contain bad emails and disconnected phones. BounceBlock verifies every email and phone — and removes duplicates — so your team only works real ${lower} leads.`,
    pains: x?.challenges ?? [
      e.pain,
      "Disconnected phone numbers waste hours of dialing.",
      "Duplicate records inflate your CRM and skew your reporting.",
    ],
    benefits: [
      { title: "Email verification", desc: "Syntax, domain, MX and live-mailbox checks catch hard bounces before they ever touch your sender score." },
      { title: "Phone validation", desc: `Confirm every ${lower} contact's number is live, with line type and carrier — the feature email-only tools don't have.` },
      { title: "Flat pricing", desc: `${e.benefit} One flat monthly price your ${lower} team can actually budget for.` },
    ],
    // Unique per-industry FAQ replaces the identical shared FAQ that previously
    // appeared on all 55 pages (the single biggest source of duplicate text).
    faq: x?.faq ?? [
      { q: `How does BounceBlock help ${e.label} teams?`, a: `It verifies the emails and phone numbers in your ${lower} lists and removes duplicates, so your team spends time only on contacts that are real and reachable.` },
      ...SHARED_FAQ(lower),
    ],
  };
}

export function buildLocalPage(e: LocalEntry): BuiltPage {
  const city = e.cityLabel;
  const ind = e.industryLabel;
  const lower = ind.toLowerCase();
  return {
    eyebrow: `${ind} · ${city}`,
    h1: `${ind} lead verification in ${city}`,
    intro: `${city} ${lower} teams lose deals to stale data. BounceBlock verifies every email and phone and removes duplicates, so your ${city} ${lower} list is clean, current and reachable.`,
    pains: [
      `${city} ${lower} lists go stale as contacts move and change numbers.`,
      "Disconnected phone numbers waste hours of local dialing.",
      "Duplicate records inflate your CRM and skew your reporting.",
    ],
    benefits: [
      { title: "Email verification", desc: `Catch hard bounces in your ${city} ${lower} list before they ever hurt your sender score.` },
      { title: "Phone validation", desc: `Confirm local ${city} numbers are live, with line type and carrier — in the same upload.` },
      { title: "Flat pricing", desc: `One flat monthly price your ${city} ${lower} team can budget for — no credits, no surprises.` },
    ],
    faq: [
      { q: `Does BounceBlock work for ${ind} teams in ${city}?`, a: `Yes. Upload any ${lower} list and we verify the emails and phone numbers and remove duplicates — wherever your ${city} contacts are based.` },
      ...SHARED_FAQ(lower),
    ],
  };
}

export function buildUseCasePage(e: SeoEntry): BuiltPage {
  const lower = e.label.toLowerCase();
  const x = getUseCaseExtra(e.slug); // unique, task-specific copy (intro/challenges/FAQ)
  return {
    eyebrow: e.label,
    h1: `${e.label} in two minutes`,
    intro:
      x?.intro ??
      `${e.pain} BounceBlock verifies emails and phones and removes duplicates — so you can ${lower} without risking your sender reputation.`,
    pains: x?.challenges ?? [
      e.pain,
      "Bad contacts drag down deliverability and waste your team's time.",
      "Manual cleanup in spreadsheets takes hours and misses duplicates.",
    ],
    benefits: [
      { title: "Verify in one pass", desc: "Every email checked for deliverability and every phone validated — in a single upload." },
      { title: "Catch what others miss", desc: "Typos, catch-all domains, disposable addresses, dead numbers and silent duplicates." },
      { title: "Flat, simple pricing", desc: `${e.benefit} No per-credit math, no surprise overage bills.` },
    ],
    // Unique per-task FAQ replaces the identical shared FAQ across all use-case pages.
    faq: x?.faq ?? [
      { q: `What's the fastest way to ${lower}?`, a: `Upload your CSV to BounceBlock — we auto-detect your columns, preview the first 100 rows free, and return a clean, verified file in minutes.` },
      ...SHARED_FAQ("uploaded"),
    ],
  };
}
