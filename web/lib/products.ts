import type { ProgrammaticSection } from "@/components/marketing/ProgrammaticPage";

/** Product/solution pages (`/product/[slug]`). */
export interface Product {
  slug: string;
  name: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroBullets: string[];
  sections: ProgrammaticSection[];
  faq: { q: string; a: string }[];
}

const SAFE_FAQ = { q: "Is my data safe?", a: "Your uploaded data is encrypted and permanently deleted within 24 hours. We never sell or share it, and we're built to be GDPR-friendly." };
const PRICE_FAQ = { q: "How is it priced?", a: "One flat monthly subscription covering email, phone and company verification together — no per-verification credits to track." };
const USE_FAQ = { q: "What is this intended for?", a: "Keeping your own marketing, sales and CRM data accurate and deliverable, and reaching business contacts you're authorised to contact. It is not a people-search, surveillance or tracking tool — see our Acceptable Use Policy." };

export const PRODUCTS: Product[] = [
  {
    slug: "email-verification",
    name: "Email Verification",
    eyebrow: "Product · Email verification",
    h1: "Email verification that catches what others miss",
    intro: "Verify every address for syntax, domain, MX and live-mailbox signals — and flag catch-all, disposable and role accounts — so invalid emails are removed before they ever hard-bounce.",
    heroBullets: ["Catch-all + disposable detection", "Quality score per list", "Flat pricing, no credits"],
    sections: [
      { heading: "What we check on every address", bullets: ["Syntax and common typos (gmial.com → gmail.com).", "Domain and MX records — can it receive mail at all?", "Mailbox-level signals for deliverability.", "Catch-all, disposable, role-based and duplicate flags."] },
      { heading: "Why it matters", paras: ["Hard bounces and spam-trap hits are among the fastest ways to damage your sender reputation. Verifying before every send removes the biggest deliverability risk at the source — and keeps your bounce rate under the ~2% safe threshold."] },
      { heading: "More than email", paras: ["Unlike email-only verifiers, BounceBlock validates phone numbers and checks company data in the same upload, so one clean file covers your whole outreach."] },
    ],
    faq: [
      { q: "How accurate is it?", a: "We combine syntax, domain, MX and mailbox checks with catch-all and disposable detection to give a clear status and a 0-100 quality score per list." },
      PRICE_FAQ, SAFE_FAQ,
    ],
  },
  {
    slug: "bulk-email-verification",
    name: "Bulk Email Verification",
    eyebrow: "Product · Bulk verification",
    h1: "Clean an entire list in minutes",
    intro: "Upload a CSV and verify thousands of contacts at once — emails verified, phones validated, duplicates removed — then download a clean, ready-to-send file.",
    heroBullets: ["CSV in, clean CSV out", "Dedupe built in", "Preview 100 rows free"],
    sections: [
      { heading: "How bulk verification works", bullets: ["Upload your CSV — we auto-detect the email, phone and company columns.", "Preview the first 100 rows free to see your quality score.", "Process the full list; we verify, validate and dedupe.", "Download a clean file annotated with each contact's status."] },
      { heading: "Built for big lists", paras: ["Whether it's a few hundred contacts or tens of thousands, bulk verification runs the same deep checks on every row and hands back a file you can send or import with confidence."] },
      { heading: "Flat pricing for regular cleaning", paras: ["Because pricing is flat — not per-verification credits — you can verify before every campaign instead of rationing checks to save money."] },
    ],
    faq: [
      { q: "What file formats do you accept?", a: "CSV exports from any CRM, spreadsheet or email tool. We auto-detect your columns on upload." },
      PRICE_FAQ, SAFE_FAQ,
    ],
  },
  {
    slug: "email-verification-api",
    name: "Email Verification API",
    eyebrow: "Product · API",
    h1: "Verify emails and phones in real time, from your code",
    intro: "A simple REST API to verify an email or phone the moment it's captured — so bad data never enters your database in the first place. Available on the Business plan.",
    heroBullets: ["Real-time REST API", "Email + phone in one call", "Same engine as bulk"],
    sections: [
      { heading: "Verify at the point of capture", paras: ["Call the API when someone submits a form or signs up, and get back a status in real time. Block invalid addresses, disposable domains and risky numbers before they become a record — the cleanest data is data you never let in."] },
      { heading: "What you get back", bullets: ["Email status: valid, invalid, catch-all or unknown, with sub-status and typo suggestions.", "Phone: validity, line type and carrier.", "A consistent response whether you verify one record or a million."] },
      { heading: "Simple to integrate", paras: ["Authenticate with a bearer key, POST a JSON body, read the result. Use it for live form validation, signup gating, or cleaning data as it flows into your CRM."] },
    ],
    faq: [
      { q: "Which plan includes the API?", a: "The Business plan includes API access and key management. You can generate and revoke keys from your settings." },
      { q: "Is the API rate-limited?", a: "Yes, to protect reliability — limits are generous for normal real-time form and signup use." },
      SAFE_FAQ,
    ],
  },
  {
    slug: "phone-verification",
    name: "Phone Number Verification",
    eyebrow: "Product · Phone validation",
    h1: "Validate phone numbers alongside your emails",
    intro: "Confirm every number is live, see its line type and carrier, and normalise formatting — across 30+ countries, in the same upload as your email verification.",
    heroBullets: ["Line type + carrier", "30+ countries", "Bundled with email"],
    sections: [
      { heading: "What we validate", bullets: ["Active status — reachable or disconnected.", "Line type — mobile, landline or VoIP.", "Carrier and country, normalised to E.164.", "Formatting errors that break dialers and SMS tools."] },
      { heading: "The feature email tools skip", paras: ["Nearly every email verifier ignores phone numbers entirely. BounceBlock validates them in the same pass, so teams that call and text don't waste time on dead lines or burn SMS spend on disconnected numbers."] },
      { heading: "International coverage", paras: ["Validate numbers across 30+ countries — see the full list on our phone-validation pages — all at one flat price."] },
    ],
    faq: [
      { q: "Do you detect VoIP numbers?", a: "Yes — line type detection distinguishes mobile, landline and VoIP, so you can flag risky VoIP numbers before they reach a dialer." },
      USE_FAQ, PRICE_FAQ, SAFE_FAQ,
    ],
  },
  {
    slug: "company-verification",
    name: "Company Verification & Enrichment",
    eyebrow: "Product · Company data",
    h1: "Verify and enrich the companies behind your contacts",
    intro: "Resolve company names to domains, add firmographic context, and confirm the business behind each lead — so your B2B records are accurate enough to segment, score and route.",
    heroBullets: ["Name-to-domain matching", "Firmographic enrichment", "B2B-ready records"],
    sections: [
      { heading: "What company verification adds", bullets: ["Company name-to-domain matching from messy form input.", "Firmographics: industry, size, location.", "Confirmation that the business behind a contact is real.", "A reliable account key for dedupe and routing."] },
      { heading: "Verify first, enrich what's real", paras: ["There's no point enriching a record that's invalid. BounceBlock verifies the email and phone first, then enriches the contacts that are real — so you don't waste enrichment effort on dead data."] },
      { heading: "Cleaner B2B pipelines", paras: ["Accurate firmographics power lead scoring, territory assignment and personalised outreach — and stop fake B2B signups from polluting your CRM."] },
    ],
    faq: [
      { q: "What firmographic fields do you add?", a: "Company, industry, size and location, matched from the contact's domain — useful for segmentation and scoring." },
      PRICE_FAQ, SAFE_FAQ,
    ],
  },
  {
    slug: "form-guard",
    name: "Form Guard",
    eyebrow: "Product · Form protection",
    h1: "Stop fake and invalid signups at the form",
    intro: "Real-time verification on your signup and lead forms that blocks invalid emails, disposable domains, typos and risky VoIP numbers before they ever become a record.",
    heroBullets: ["Real-time blocking", "Cuts fake signups", "Email + phone"],
    sections: [
      { heading: "Guard the front door", paras: ["Form Guard verifies the email and phone the instant they're entered. Invalid addresses, throwaway domains, obvious typos and suspicious numbers get blocked or flagged — so your CRM stays clean at the source instead of needing a cleanup later."] },
      { heading: "What it catches", bullets: ["Invalid and mistyped email addresses.", "Disposable / temporary email domains.", "Risky VoIP numbers and malformed phones.", "Bot and fake-signup patterns."] },
      { heading: "Powered by the API", paras: ["Form Guard runs on the same real-time verification API that backs bulk cleaning, so results are consistent everywhere — and you only spend enrichment and outreach effort on real contacts."] },
    ],
    faq: [
      { q: "Will it slow down my form?", a: "No — checks return in real time, fast enough to validate inline as the user submits." },
      { q: "Which plan includes Form Guard?", a: "It runs on the Business-plan API. You add a lightweight check to your form submission flow." },
      SAFE_FAQ,
    ],
  },
  {
    slug: "email-finder",
    name: "Email Finder",
    eyebrow: "Product · Email finder",
    h1: "Find and verify the right email address",
    intro: "Find likely business email addresses and verify them in the same step — so the contacts you add to outreach are both real and reachable.",
    heroBullets: ["Find + verify together", "Deliverability-checked", "Flat pricing"],
    sections: [
      { heading: "Find, then verify", paras: ["Finding an email is only half the job — an unverified guess still bounces. BounceBlock pairs discovery with verification, so every address you take forward has already passed deliverability checks."] },
      { heading: "Why pairing matters", bullets: ["Unverified found emails bounce and hurt your sender reputation.", "Verified-on-discovery means cleaner lists from day one.", "Phone and company context can be added in the same workflow."] },
      { heading: "Built for outreach teams", paras: ["Hand sales a list of real, reachable people — not guesses that bounce — and protect your domain while you scale outreach."] },
    ],
    faq: [
      { q: "Are found emails verified?", a: "Yes — discovery and verification happen together, so you don't take unchecked guesses into your campaigns." },
      { q: "Who is the email finder for?", a: "Reaching business contacts at companies for legitimate B2B outreach where you have a lawful basis to make contact. It generates and verifies work-email formats — it is not a people-search or background-check tool." },
      PRICE_FAQ, SAFE_FAQ,
    ],
  },
  {
    slug: "data-enrichment",
    name: "Lead & Data Enrichment",
    eyebrow: "Product · Enrichment",
    h1: "Enrich the leads that are actually real",
    intro: "Add company, industry and location context to your contacts — after verifying them — so you enrich only the records worth keeping and your CRM stays both accurate and complete.",
    heroBullets: ["Verify then enrich", "Firmographic fields", "Cleaner CRM"],
    sections: [
      { heading: "Verification-first enrichment", paras: ["Most enrichment tools add data to whatever you feed them — including dead records. BounceBlock verifies emails and phones first, then enriches the contacts that are real, so you don't pay to enrich data that was never going to convert."] },
      { heading: "What we add", bullets: ["Company name-to-domain resolution.", "Firmographics: industry, size and location.", "A clean, deduplicated record ready to segment and score."] },
      { heading: "For RevOps and marketing", paras: ["Accurate, enriched data powers lead scoring, routing and personalisation — and keeps your reporting honest because the records behind it are real."] },
    ],
    faq: [
      { q: "Why enrich after verifying?", a: "Enriching invalid records wastes effort and budget. Verifying first means you only enrich contacts that are real and reachable." },
      PRICE_FAQ, SAFE_FAQ,
    ],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
