/**
 * Individual case-study pages: `/case-studies/[slug]`.
 * The hub existed but had no story pages. These are illustrative scenarios
 * (clearly labelled) built around realistic numbers, so the template and
 * schema are production-ready the moment real customer stories replace them.
 */

export interface CaseStudy {
  slug: string;
  company: string;
  industry: string;
  industrySlug: string; // links to /industry/[slug]
  size: string;
  /** One-line outcome for cards. */
  headline: string;
  challenge: string[];
  approach: string[];
  results: { metric: string; label: string }[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  /** Related use case slug for internal linking. */
  useCaseSlug: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "northwind-realty",
    company: "Northwind Realty",
    industry: "Real Estate",
    industrySlug: "real-estate",
    size: "45-agent brokerage",
    headline: "Cut a 14% bounce rate to under 2% and saved two days a month",
    challenge: [
      "Northwind's buyer and seller lists had been growing in the CRM for years, and nobody had cleaned them. A 14% bounce rate was dragging down deliverability — even hand-written agent emails were landing in spam.",
      "The marketing lead was spending roughly two days every month manually scrubbing exports before each newsletter, and still missing dead addresses.",
    ],
    approach: [
      "Exported the full contact database and ran it through BounceBlock in one upload — email verification and phone validation together.",
      "Removed hard-invalid addresses, flagged catch-all domains for a separate low-volume segment, and de-duplicated contacts that had been entered twice with different formatting.",
      "Set a recurring 90-day re-verification so the list never drifts back to a high bounce rate.",
    ],
    results: [
      { metric: "<2%", label: "bounce rate, down from 14%" },
      { metric: "2 days", label: "saved every month" },
      { metric: "11k", label: "contacts verified in one pass" },
    ],
    quote: "We didn't realize how much deliverability we were losing until the bounce rate dropped and our open rates jumped the same week.",
    quoteAuthor: "Marketing Lead",
    quoteRole: "Northwind Realty",
    useCaseSlug: "reduce-bounce-rate",
  },
  {
    slug: "talentforge-staffing",
    company: "TalentForge",
    industry: "Recruiting",
    industrySlug: "recruiting",
    size: "Boutique recruiting firm",
    headline: "Lifted dialer connect rate 30% by validating numbers before outreach",
    challenge: [
      "TalentForge's recruiters were burning hours dialing disconnected and wrong-type numbers from aggregated candidate lists.",
      "There was no way to know which numbers were live mobiles versus landlines or dead lines until a recruiter actually called.",
    ],
    approach: [
      "Validated every candidate phone number for line type, carrier and active status before it reached a recruiter's queue.",
      "Filtered out disconnected numbers and flagged landlines so SMS outreach only went to textable mobiles.",
    ],
    results: [
      { metric: "+30%", label: "dialer connect rate" },
      { metric: "6 hrs/wk", label: "of wasted dialing removed" },
      { metric: "1 pass", label: "to validate the whole list" },
    ],
    quote: "Our recruiters spend their time having conversations now, not listening to disconnected-number tones.",
    quoteAuthor: "Head of Talent",
    quoteRole: "TalentForge",
    useCaseSlug: "dialer-list-validation",
  },
  {
    slug: "meridian-insurance",
    company: "Meridian Insurance",
    industry: "Insurance",
    industrySlug: "insurance",
    size: "Regional agency",
    headline: "Turned 9,000 messy purchased leads into a clean file in 3 minutes",
    challenge: [
      "Meridian bought policyholder lead lists that arrived full of duplicates, typo'd emails and wrong numbers.",
      "Sending to them risked the agency's sender reputation, and the quoting team wasted time on contacts that didn't exist.",
    ],
    approach: [
      "Uploaded all 9,000 leads and verified email and phone in a single pass, with duplicate detection across both fields.",
      "Got back a deduplicated, verified file with risky catch-all and disposable addresses flagged — no onboarding call needed.",
    ],
    results: [
      { metric: "3 min", label: "to a clean, send-ready file" },
      { metric: "9,000", label: "leads verified and deduped" },
      { metric: "0", label: "reputation hits since switching" },
    ],
    quote: "We stopped torching our domain on bought lists. Now everything gets verified before a single send.",
    quoteAuthor: "Operations Manager",
    quoteRole: "Meridian Insurance",
    useCaseSlug: "purchased-list-cleaning",
  },
  {
    slug: "closerate-agency",
    company: "CloseRate",
    industry: "Marketing Agency",
    industrySlug: "marketing-agencies",
    size: "12-person agency",
    headline: "Made per-client list cleaning predictable with flat pricing",
    challenge: [
      "CloseRate cleaned lists for dozens of clients, but credit-based tools made the cost impossible to predict or bill back cleanly.",
      "Some months a big client's list would blow through a credit pack mid-project.",
    ],
    approach: [
      "Switched all client list-cleaning to BounceBlock's flat monthly plan, with one allowance covering every account.",
      "Standardized the same verify-and-dedupe workflow across every client deliverable.",
    ],
    results: [
      { metric: "Flat", label: "predictable monthly cost" },
      { metric: "100%", label: "of clients on one workflow" },
      { metric: "0", label: "surprise credit overages" },
    ],
    quote: "Flat pricing means we can quote list cleaning as a fixed line item instead of guessing at credit burn.",
    quoteAuthor: "Founder",
    quoteRole: "CloseRate",
    useCaseSlug: "bulk-list-cleaning",
  },
  {
    slug: "summit-mortgage",
    company: "Summit Mortgage",
    industry: "Mortgage",
    industrySlug: "mortgage",
    size: "Independent lender",
    headline: "Reached rate-shoppers before the leads went cold",
    challenge: [
      "Rate-shopper leads decay fast, and Summit's email blasts to older leads were bouncing right when rates moved.",
      "Loan officers couldn't tell which leads were still reachable.",
    ],
    approach: [
      "Ran each batch of incoming leads through verification before the first outreach, validating both email and phone.",
      "Prioritized loan-officer follow-up toward leads confirmed as live and reachable.",
    ],
    results: [
      { metric: "−85%", label: "bounces on rate-alert emails" },
      { metric: "Faster", label: "first-touch on live leads" },
      { metric: "1 step", label: "added to lead intake" },
    ],
    quote: "When rates drop we need to reach people that hour. Verifying first means our emails actually land.",
    quoteAuthor: "Sales Director",
    quoteRole: "Summit Mortgage",
    useCaseSlug: "pre-campaign-verification",
  },
  {
    slug: "brightpath-saas",
    company: "BrightPath",
    industry: "SaaS",
    industrySlug: "saas",
    size: "Series A SaaS",
    headline: "Stopped fake and disposable signups from polluting the funnel",
    challenge: [
      "BrightPath's free trial was attracting disposable and role-based signups that inflated metrics and never converted.",
      "Sales was wasting time chasing trial accounts that were never real.",
    ],
    approach: [
      "Added real-time email verification at signup via the API to block disposable domains and obvious fakes.",
      "Verified existing trial lists in bulk to clean historical data and fix funnel reporting.",
    ],
    results: [
      { metric: "−40%", label: "junk trial signups" },
      { metric: "Cleaner", label: "funnel and conversion data" },
      { metric: "Real-time", label: "checks at the point of capture" },
    ],
    quote: "Our activation numbers finally reflect real users instead of throwaway inboxes.",
    quoteAuthor: "Growth Lead",
    quoteRole: "BrightPath",
    useCaseSlug: "validate-form-signups",
  },
  {
    slug: "harbor-nonprofit",
    company: "Harbor Foundation",
    industry: "Nonprofit",
    industrySlug: "nonprofits",
    size: "National nonprofit",
    headline: "Protected appeal deliverability across a decaying donor list",
    challenge: [
      "Harbor's donor list had quietly degraded over years of giving cycles, and year-end appeals were landing in spam.",
      "Every bounced appeal was a missed donation.",
    ],
    approach: [
      "Verified the full donor database before the year-end campaign and removed long-dead addresses.",
      "Segmented risky catch-all addresses out of the main appeal to protect sender reputation.",
    ],
    results: [
      { metric: "Higher", label: "inbox placement on appeals" },
      { metric: "−90%", label: "hard bounces at year-end" },
      { metric: "1 upload", label: "before the big campaign" },
    ],
    quote: "Our appeals reach inboxes now. For a nonprofit, that deliverability is real money.",
    quoteAuthor: "Development Director",
    quoteRole: "Harbor Foundation",
    useCaseSlug: "verify-donor-list",
  },
  {
    slug: "vertex-solar",
    company: "Vertex Solar",
    industry: "Solar",
    industrySlug: "solar",
    size: "Regional installer",
    headline: "Stopped paying closers to call fake and duplicate leads",
    challenge: [
      "Aggregated solar leads came riddled with fake contacts and duplicates from multiple lead vendors.",
      "Closers were spending paid hours dialing the same bad numbers twice.",
    ],
    approach: [
      "Validated every incoming lead's phone and email and de-duplicated across vendor sources in one pass.",
      "Routed only verified, unique leads to the closing team.",
    ],
    results: [
      { metric: "Fewer", label: "wasted closer hours" },
      { metric: "0", label: "duplicate dials across vendors" },
      { metric: "Real", label: "homeowners in the queue" },
    ],
    quote: "We pay our closers to close, not to discover a number's been disconnected for a year.",
    quoteAuthor: "VP Sales",
    quoteRole: "Vertex Solar",
    useCaseSlug: "clean-paid-ad-leads",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
