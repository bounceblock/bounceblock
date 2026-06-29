import type { ProgrammaticSection } from "@/components/marketing/ProgrammaticPage";

/** Role / persona pages (`/for/[slug]`). */
export interface Role {
  slug: string;
  name: string;       // "Marketers"
  eyebrow: string;
  h1: string;
  intro: string;
  sections: ProgrammaticSection[];
  faq: { q: string; a: string }[];
}

const SAFE = { q: "Is my data safe?", a: "Your uploaded data is encrypted and permanently deleted within 24 hours. We never sell or share it." };

export const ROLES: Role[] = [
  {
    slug: "marketers",
    name: "Marketers",
    eyebrow: "For marketers",
    h1: "BounceBlock for marketers",
    intro: "Protect deliverability and keep your campaign metrics honest. Verify every list before you send so bounces stay low, your sender reputation stays intact, and your reporting reflects reality.",
    sections: [
      { heading: "The problem for marketing teams", bullets: ["Lists decay every month and quietly raise your bounce rate.", "One bad send can flag your domain and tank inbox placement.", "Disposable and role accounts inflate list size and lower engagement."] },
      { heading: "How BounceBlock helps", paras: ["Verify each list before every campaign — emails checked for deliverability, phones validated for SMS, duplicates removed. You hit send knowing your list is clean, and your open and click rates reflect real engagement rather than inflated denominators."] },
      { heading: "Flat pricing for frequent cleaning", paras: ["Because pricing is flat, you can verify before every send instead of rationing checks — the way list hygiene is supposed to work."] },
    ],
    faq: [
      { q: "Will this lower my bounce rate?", a: "Yes — verifying removes invalid addresses before they bounce, keeping you under the ~2% safe threshold." },
      { q: "Do you validate SMS numbers too?", a: "Yes — phone validation with line type is included, so your SMS lists are clean too." },
      SAFE,
    ],
  },
  {
    slug: "sales",
    name: "Sales & RevOps",
    eyebrow: "For sales & RevOps",
    h1: "BounceBlock for sales & RevOps",
    intro: "Hand reps a list of real, reachable people. Verify emails, validate phone numbers and check company data so your team spends time selling — not dialing dead numbers or emailing bounces.",
    sections: [
      { heading: "The problem for sales teams", bullets: ["Reps waste hours on disconnected numbers and dead inboxes.", "Dirty CRM data skews forecasting and routing.", "Duplicate records inflate pipeline and confuse ownership."] },
      { heading: "How BounceBlock helps", paras: ["Clean your prospect lists and CRM exports in minutes: every email verified, every phone validated with line type, company data checked, duplicates removed. Reps dial connected numbers and email real inboxes, and RevOps gets data clean enough to trust the dashboards."] },
      { heading: "Verify at the point of capture", paras: ["On the Business plan, the API verifies leads in real time as they enter your CRM — so bad records never reach your reps in the first place."] },
    ],
    faq: [
      { q: "Does it work with our CRM?", a: "Yes — export a CSV, clean it, and re-import; or verify in real time via the API. HubSpot, Salesforce, Pipedrive and more." },
      { q: "Do you validate phone line type?", a: "Yes — mobile, landline or VoIP, so reps know whether to call or text." },
      SAFE,
    ],
  },
  {
    slug: "developers",
    name: "Developers",
    eyebrow: "For developers",
    h1: "BounceBlock for developers",
    intro: "A simple REST API to verify email and phone in real time — so you can validate at signup, guard your forms, and keep bad data out of your database without building verification yourself.",
    sections: [
      { heading: "What you can build", bullets: ["Real-time form and signup validation.", "Form Guard against fake and disposable signups.", "CRM and pipeline cleaning jobs.", "Verify-then-enrich workflows."] },
      { heading: "Simple integration", paras: ["Authenticate with a bearer key, POST a JSON body with an email and/or phone, and read a structured result — valid/invalid/catch-all/unknown for email, line type and carrier for phone. The same engine backs bulk and real-time, so results are consistent."] },
      { heading: "Keys and limits", paras: ["Generate and revoke API keys from settings on the Business plan. Rate limits are generous for real-time form and signup use, and every call is logged for your own auditing."] },
    ],
    faq: [
      { q: "What does the API return?", a: "A JSON object with email status (and sub-status / typo suggestion) and phone validity, line type and carrier." },
      { q: "How do I authenticate?", a: "A bearer token in the Authorization header. Manage keys from your settings on the Business plan." },
      SAFE,
    ],
  },
  {
    slug: "agencies",
    name: "Agencies",
    eyebrow: "For agencies",
    h1: "BounceBlock for agencies",
    intro: "Clean any client list, flat-priced, in minutes. Verify email and phone and remove duplicates across every client account without per-verification credit math eating your margin.",
    sections: [
      { heading: "The problem for agencies", bullets: ["Every client list arrives messy and in a different format.", "Credit-metered tools get expensive across many accounts.", "Bad data risks your clients' sender reputations — and your retainer."] },
      { heading: "How BounceBlock helps", paras: ["Upload any client's CSV, auto-detect the columns, and hand back a verified, deduplicated file — email and phone both checked. Flat pricing means you can clean lists for every client as often as needed without watching a credit balance."] },
      { heading: "Protect every client's domain", paras: ["Verifying before each send keeps your clients' bounce rates low and their sender reputations intact — the difference between a campaign that lands and one that gets filtered."] },
    ],
    faq: [
      { q: "Can I use it across multiple clients?", a: "Yes — clean any client's list on a flat plan. No per-verification credits to track across accounts." },
      { q: "Does it handle any list format?", a: "Yes — upload a CSV from any source and we auto-detect the email, phone and company columns." },
      SAFE,
    ],
  },
];

export function getRole(slug: string) {
  return ROLES.find((r) => r.slug === slug);
}
