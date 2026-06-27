/** Brand-level constants used across the site + app. */
export const SITE = {
  name: "BounceBlock",
  legalName: "Leswang Technology",
  domain: "bounceblock.io",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bounceblock.io",
  tagline: "Clean Leads. Higher Conversions.",
  description:
    "BounceBlock verifies every email and validates every phone in one upload, then removes duplicates — so your team only chases leads that are real. One flat price.",
  email: {
    hello: "hello@bounceblock.io",
    support: "support@bounceblock.io",
    billing: "billing@bounceblock.io",
    privacy: "privacy@bounceblock.io",
    security: "security@bounceblock.io",
  },
} as const;

/** Primary marketing navigation (supports dropdown menus). */
export interface NavLink {
  label: string;
  href: string;
  desc?: string;
}
export interface NavItem {
  label: string;
  href?: string;
  children?: NavLink[];
}

export const NAV: NavItem[] = [
  {
    label: "Product",
    children: [
      { label: "Verify tool", href: "/verify", desc: "Clean a list in two minutes" },
      { label: "How it works", href: "/#how", desc: "Upload → verify → download" },
      { label: "Features", href: "/#features", desc: "Email + phone, dedupe, scoring" },
      { label: "Security", href: "/security", desc: "Encryption, GDPR, 24h deletion" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Real estate", href: "/industry/real-estate", desc: "Clean agent & broker lists" },
      { label: "Insurance", href: "/industry/insurance", desc: "Verify policyholder leads" },
      { label: "Recruiting", href: "/industry/recruiting", desc: "Validate candidate contacts" },
      { label: "All industries →", href: "/industries", desc: "Browse 40+ industries" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog", desc: "Deliverability guides" },
      { label: "Use cases", href: "/use-cases", desc: "Every way to clean a list" },
      { label: "Compare alternatives", href: "/alternatives", desc: "BounceBlock vs the rest" },
      { label: "Case studies", href: "/case-studies", desc: "Real bounce-rate turnarounds" },
    ],
  },
];

/** Footer link groups. */
export const FOOTER = {
  Product: [
    { label: "Verify tool", href: "/verify" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" },
    { label: "API", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Alternatives", href: "/alternatives" },
    { label: "Locations", href: "/locations" },
    { label: "Trust center", href: "/trust" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Cookies", href: "/legal/cookies" },
    { label: "Refund", href: "/legal/refund" },
    { label: "DPA", href: "/legal/dpa" },
    { label: "Sub-processors", href: "/legal/subprocessors" },
    { label: "GDPR", href: "/legal/gdpr" },
  ],
} as const;
