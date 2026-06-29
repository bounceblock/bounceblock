/**
 * Author / reviewer profiles — the E-E-A-T backbone the SEO plan flags as a
 * gap. Real bylines with expertise and a Person schema turn programmatic
 * content (blog posts, reviews, research, case studies) into pages Google can
 * attribute to a credentialed human. Reference an author by `id` from any page.
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  /** Short credential line shown next to the byline. */
  credential: string;
  /** Two-letter initials for the avatar chip (we don't ship photos yet). */
  initials: string;
  bio: string;
  /** Areas this author writes/reviews on — used for "expertise" signals. */
  expertise: string[];
  /** Optional external profile for sameAs / Person schema. */
  linkedin?: string;
}

export const AUTHORS: Author[] = [
  {
    id: "maya-okonkwo",
    name: "Maya Okonkwo",
    role: "Head of Deliverability",
    credential: "10+ years in email infrastructure & sender reputation",
    initials: "MO",
    bio: "Maya has spent a decade keeping high-volume senders out of the spam folder — first on the ESP side running reputation desks, now leading deliverability research at BounceBlock. She writes about bounce rates, authentication (SPF/DKIM/DMARC) and the mailbox-provider rules that decide whether your mail lands.",
    expertise: ["Email deliverability", "Sender reputation", "SPF / DKIM / DMARC", "Bounce management"],
    linkedin: "https://www.linkedin.com/company/bounceblock",
  },
  {
    id: "daniel-reyes",
    name: "Daniel Reyes",
    role: "Data Quality Lead",
    credential: "Former data engineer; builds BounceBlock's verification engine",
    initials: "DR",
    bio: "Daniel builds the checks behind BounceBlock — syntax, MX, SMTP, catch-all resolution and duplicate detection. He's obsessed with the difference between 'valid', 'catch-all' and 'unknown', and writes the technical deep-dives on how verification actually works under the hood.",
    expertise: ["Email verification", "Catch-all resolution", "Data hygiene", "Verification APIs"],
    linkedin: "https://www.linkedin.com/company/bounceblock",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "RevOps & Phone Data Analyst",
    credential: "Ran outbound data ops for two SaaS sales teams",
    initials: "PN",
    bio: "Priya came up through RevOps, where she learned the hard way how much pipeline leaks through dead numbers and stale CRM records. She covers phone validation, line-type and HLR lookups, dialer hygiene and the contact-data side of sales operations.",
    expertise: ["Phone validation", "HLR / line-type", "CRM hygiene", "Sales operations"],
    linkedin: "https://www.linkedin.com/company/bounceblock",
  },
  {
    id: "tom-ellison",
    name: "Tom Ellison",
    role: "Editor, Tool Reviews",
    credential: "Independently benchmarks verification tools",
    initials: "TE",
    bio: "Tom runs BounceBlock's hands-on tool reviews and comparisons. He tests verifiers against the same rubric every time — accuracy, pricing transparency, breadth, ease of use and free tier — and is upfront about where competitors beat us and where they don't.",
    expertise: ["Tool benchmarking", "Pricing analysis", "Comparisons", "Buyer guides"],
    linkedin: "https://www.linkedin.com/company/bounceblock",
  },
  {
    id: "sara-lindqvist",
    name: "Sara Lindqvist",
    role: "Compliance & Data Protection",
    credential: "GDPR/CCPA practitioner for B2B data products",
    initials: "SL",
    bio: "Sara keeps BounceBlock's data handling honest — consent, retention, EU residency and the legal edges of list cleaning. She writes about doing contact-data work without stepping on GDPR, CCPA or anti-spam law.",
    expertise: ["GDPR / CCPA", "Data protection", "Compliant outreach", "Consent & retention"],
    linkedin: "https://www.linkedin.com/company/bounceblock",
  },
];

export function getAuthor(id: string) {
  return AUTHORS.find((a) => a.id === id);
}
