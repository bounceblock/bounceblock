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
    hello: "hello@bounceblock.io",       // general / marketing
    support: "support@bounceblock.io",   // customer support + reply-to for transactional
    billing: "billing@bounceblock.io",   // Stripe + invoices
    privacy: "privacy@bounceblock.io",   // GDPR / privacy requests
    security: "security@bounceblock.io", // abuse / security reports
    noreply: "no-reply@bounceblock.io",  // From address for outbound transactional mail
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
      { label: "Email verification", href: "/product/email-verification", desc: "Catch invalids before they bounce" },
      { label: "Phone validation", href: "/product/phone-verification", desc: "Line type, carrier, status" },
      { label: "Company data", href: "/product/company-verification", desc: "Verify & enrich the business" },
      { label: "API & Form Guard", href: "/product/email-verification-api", desc: "Verify in real time" },
      { label: "Features", href: "/features", desc: "Every check, explained" },
      { label: "All products →", href: "/product", desc: "Everything BounceBlock does" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "For marketers", href: "/for/marketers", desc: "Protect deliverability" },
      { label: "For sales & RevOps", href: "/for/sales", desc: "Reach real, reachable people" },
      { label: "For developers", href: "/for/developers", desc: "Real-time verification API" },
      { label: "For agencies", href: "/for/agencies", desc: "Clean any client list, flat-priced" },
      { label: "By industry →", href: "/industries", desc: "Browse 40+ industries" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog", desc: "Deliverability guides" },
      { label: "Free tools", href: "/tools", desc: "Verify, validate, check records" },
      { label: "Guides & templates", href: "/resources", desc: "Checklists & playbooks" },
      { label: "Research", href: "/research", desc: "Original data studies" },
      { label: "Reviews", href: "/reviews", desc: "Verification tools, rated" },
      { label: "Compare tools", href: "/compare", desc: "Side-by-side matrix" },
      { label: "Glossary", href: "/glossary", desc: "Every term, explained" },
    ],
  },
];

/** Footer link groups. */
export const FOOTER = {
  Product: [
    { label: "Email verification", href: "/product/email-verification" },
    { label: "Phone validation", href: "/product/phone-verification" },
    { label: "Company data", href: "/product/company-verification" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Free tools", href: "/tools" },
    { label: "Guides & templates", href: "/resources" },
    { label: "Research", href: "/research" },
    { label: "Reviews", href: "/reviews" },
    { label: "Compare tools", href: "/compare" },
    { label: "Glossary", href: "/glossary" },
    { label: "Help center", href: "/help" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Book a demo", href: "/demo" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Authors", href: "/authors" },
    { label: "Trust center", href: "/trust" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "DPA", href: "/legal/dpa" },
    { label: "GDPR", href: "/legal/gdpr" },
    { label: "CCPA", href: "/legal/ccpa" },
    { label: "Sub-processors", href: "/legal/subprocessors" },
  ],
} as const;
