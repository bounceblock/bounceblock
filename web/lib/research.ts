/**
 * Original research / data-study pages: `/research/[slug]`.
 * The SEO plan calls this the single biggest authority lever — annual reports
 * get cited and earn site-wide links. We ship the page system now with clearly
 * labelled *illustrative* figures (ready-for-keys), so the real anonymized-data
 * numbers drop straight in once the verification engine is live.
 */

export interface StatCard {
  value: string;
  label: string;
}

export interface BarRow {
  label: string;
  /** 0–100 for the bar width. */
  pct: number;
  /** Display value next to the bar. */
  display: string;
}

export interface ResearchSection {
  heading: string;
  paras?: string[];
  bullets?: string[];
  /** Optional horizontal bar chart for this section. */
  chart?: { caption: string; rows: BarRow[]; unit?: string };
}

export interface ResearchStudy {
  slug: string;
  title: string;
  dek: string;
  authorId: string;
  date: string;
  /** Sample-size / method line shown under the title. */
  basis: string;
  /** Headline stat cards. */
  stats: StatCard[];
  sections: ResearchSection[];
  /** Pull-out shareable findings (for "key findings" + social). */
  keyFindings: string[];
}

export const RESEARCH: ResearchStudy[] = [
  {
    slug: "contact-data-decay-report-2026",
    title: "The Contact Data Decay Report 2026",
    dek: "How fast B2B contact data goes stale — and what an un-cleaned list costs you a year later.",
    authorId: "daniel-reyes",
    date: "2026-06-18",
    basis: "Illustrative analysis modelled on industry decay rates across a sample of business contact lists.",
    stats: [
      { value: "~22.5%", label: "of a B2B email list decays per year" },
      { value: "~2%", label: "of contacts go bad every month" },
      { value: "30%", label: "of a year-old list is undeliverable" },
    ],
    sections: [
      {
        heading: "Why contact data decays",
        paras: [
          "People change jobs, companies change domains, mailboxes get deactivated, and phone numbers get reassigned. None of it shows up in your CRM until an email bounces or a call fails — by which point the damage to your sender reputation is already done.",
          "The decay isn't dramatic month to month, which is exactly why teams miss it. At roughly 2% a month it compounds quietly until a quarter of the list is dead.",
        ],
        chart: {
          caption: "Share of a B2B email list still deliverable, by list age",
          unit: "% deliverable",
          rows: [
            { label: "Fresh (0 months)", pct: 98, display: "98%" },
            { label: "3 months", pct: 94, display: "94%" },
            { label: "6 months", pct: 88, display: "88%" },
            { label: "12 months", pct: 78, display: "78%" },
            { label: "24 months", pct: 60, display: "60%" },
          ],
        },
      },
      {
        heading: "What decay costs",
        bullets: [
          "Higher bounce rates throttle your sending reputation with Gmail and Yahoo.",
          "Sales teams waste hours on contacts that no longer exist.",
          "Reporting is skewed — open and reply rates are measured against dead addresses.",
          "Re-engagement and win-back campaigns underperform because a chunk of the audience is unreachable.",
        ],
      },
      {
        heading: "How to stay ahead of it",
        paras: [
          "The fix is routine, not heroic: re-verify any list older than 90 days, verify at the point of capture so bad data never enters the CRM, and clean purchased lists before the first send.",
        ],
      },
    ],
    keyFindings: [
      "A typical B2B email list loses ~22.5% of its deliverability in a year.",
      "Contact data decays about 2% per month — slow enough to ignore until it hurts.",
      "By 12 months, roughly 30% of an un-cleaned list is undeliverable.",
    ],
  },
  {
    slug: "state-of-email-deliverability-2026",
    title: "The State of Email Deliverability 2026",
    dek: "Benchmark bounce rates by industry, and where the 2% danger line really sits after the Gmail/Yahoo sender rules.",
    authorId: "maya-okonkwo",
    date: "2026-06-15",
    basis: "Illustrative benchmarks modelled on observed bounce-rate ranges across industries.",
    stats: [
      { value: "2%", label: "the bounce-rate line most senders should stay under" },
      { value: "7–10%", label: "typical bounce rate on un-verified cold lists" },
      { value: "0.3%", label: "spam-complaint threshold under the new sender rules" },
    ],
    sections: [
      {
        heading: "The 2% line is now enforced",
        paras: [
          "Since the 2024 Gmail and Yahoo bulk-sender requirements, sustained high bounce rates and spam complaints can throttle or block your sending outright. The old advice to 'keep bounces low' became a hard operational requirement.",
        ],
        chart: {
          caption: "Typical bounce rate by list type",
          unit: "bounce %",
          rows: [
            { label: "Verified house list", pct: 12, display: "<2%" },
            { label: "Older CRM export", pct: 30, display: "~5%" },
            { label: "Cold / purchased list", pct: 60, display: "7–10%" },
            { label: "Scraped list", pct: 85, display: "12%+" },
          ],
        },
      },
      {
        heading: "Bounce rate by industry",
        paras: ["Industries with fast-moving contacts — recruiting, real estate, solar — tend to run hotter because their data decays faster. Regulated, slower-moving sectors trend lower."],
        chart: {
          caption: "Representative average bounce rate by industry",
          unit: "bounce %",
          rows: [
            { label: "Recruiting", pct: 55, display: "~6%" },
            { label: "Real estate", pct: 50, display: "~5.5%" },
            { label: "Solar / home services", pct: 60, display: "~7%" },
            { label: "SaaS", pct: 30, display: "~3%" },
            { label: "Financial services", pct: 22, display: "~2.2%" },
          ],
        },
      },
      {
        heading: "How the best senders stay under the line",
        bullets: [
          "Verify every list before sending and re-verify on a 90-day cycle.",
          "Authenticate with SPF, DKIM and DMARC — non-negotiable under the new rules.",
          "Segment risky catch-all addresses out of high-volume sends.",
          "Warm up new domains slowly and watch complaint rates, not just bounces.",
        ],
      },
    ],
    keyFindings: [
      "Un-verified cold lists routinely bounce at 7–10% — well past the danger line.",
      "Gmail/Yahoo rules turned the 2% guideline into an enforced limit.",
      "Fast-decay industries (recruiting, real estate, solar) run the highest bounce rates.",
    ],
  },
  {
    slug: "catch-all-domains-report-2026",
    title: "Catch-All Domains: How Common, How Risky",
    dek: "What share of B2B domains accept all mail, why 'unknown' isn't good enough, and how to treat catch-alls.",
    authorId: "daniel-reyes",
    date: "2026-06-12",
    basis: "Illustrative analysis modelled on catch-all prevalence across business domains.",
    stats: [
      { value: "~25%", label: "of B2B domains are catch-all (accept-all)" },
      { value: "50/50", label: "rough odds a catch-all mailbox is actually real" },
      { value: "0–10", label: "the score range a good tool uses instead of 'unknown'" },
    ],
    sections: [
      {
        heading: "What a catch-all domain is",
        paras: [
          "A catch-all (accept-all) domain accepts mail for every address — valid or not — so an SMTP check can't confirm the specific mailbox exists. Most verifiers throw up their hands and return 'unknown', leaving you to guess.",
          "Catch-alls are common on B2B domains, where IT teams configure servers to never reject mail. That makes a flat 'unknown' a large, unhelpful bucket.",
        ],
        chart: {
          caption: "How addresses on a typical B2B list resolve",
          unit: "% of list",
          rows: [
            { label: "Valid", pct: 64, display: "~64%" },
            { label: "Catch-all", pct: 25, display: "~25%" },
            { label: "Invalid", pct: 8, display: "~8%" },
            { label: "Disposable / role", pct: 3, display: "~3%" },
          ],
        },
      },
      {
        heading: "Why a score beats a shrug",
        paras: [
          "Treating every catch-all as un-sendable throws away real contacts; treating them all as valid hurts deliverability. The better approach scores the risk so you can send confidently to the safe end and hold back the rest.",
        ],
        bullets: [
          "Send to high-confidence catch-alls in your engaged segments.",
          "Hold low-confidence catch-alls out of reputation-sensitive sends.",
          "Never send a cold blast to an all-catch-all segment.",
        ],
      },
    ],
    keyFindings: [
      "Around a quarter of B2B domains are catch-all, so 'unknown' is a huge bucket.",
      "A risk score (not a binary unknown) recovers real contacts safely.",
      "Catch-alls should be segmented by confidence, never blasted cold.",
    ],
  },
  {
    slug: "phone-data-quality-report-2026",
    title: "The Phone Data Quality Report 2026",
    dek: "Disconnected-number rates, line-type mix, and why dialing un-validated lists wastes a third of your reps' time.",
    authorId: "priya-nair",
    date: "2026-06-08",
    basis: "Illustrative analysis modelled on phone-validation outcomes across contact lists.",
    stats: [
      { value: "~20%", label: "of numbers on an aged list are disconnected" },
      { value: "~1/3", label: "of dialer time wasted on bad/wrong-type numbers" },
      { value: "60+", label: "countries where line type can be validated" },
    ],
    sections: [
      {
        heading: "The hidden cost of un-validated numbers",
        paras: [
          "Phone lists decay like email lists, but the waste is more visible: every disconnected number is a rep's minute spent on hold tone. On aged or aggregated lists, the disconnected share climbs fast.",
        ],
        chart: {
          caption: "How numbers on a typical aged dialer list resolve",
          unit: "% of list",
          rows: [
            { label: "Active mobile", pct: 52, display: "~52%" },
            { label: "Active landline", pct: 20, display: "~20%" },
            { label: "Disconnected", pct: 20, display: "~20%" },
            { label: "Invalid / wrong format", pct: 8, display: "~8%" },
          ],
        },
      },
      {
        heading: "Line type changes everything for SMS",
        paras: [
          "Texting a landline is wasted spend. Validating line type before an SMS campaign means messages only go to textable mobiles — and you avoid carrier penalties for high invalid rates.",
        ],
        bullets: [
          "Validate line type and active status before dialing or texting.",
          "Filter landlines out of SMS campaigns.",
          "Re-validate aggregated and skip-traced lists before they reach a rep.",
        ],
      },
    ],
    keyFindings: [
      "Roughly a fifth of numbers on an aged list are already disconnected.",
      "Un-validated dialing wastes about a third of rep talk time.",
      "Validating line type keeps SMS spend on textable mobiles only.",
    ],
  },
];

export function getStudy(slug: string) {
  return RESEARCH.find((r) => r.slug === slug);
}
