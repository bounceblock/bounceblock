/**
 * Legal content for BounceBlock. Substantive templates tailored to the product.
 * These are starting points — have qualified counsel review before launch.
 */

export interface LegalSection {
  heading: string;
  paras?: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface LegalDoc {
  title: string;
  summary: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const UPDATED = "June 27, 2026";

export const LEGAL: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    summary: "How we collect, use, retain and protect your data, and your rights under GDPR, CCPA and DPDP.",
    updated: UPDATED,
    intro:
      "BounceBlock.io (“BounceBlock”, “we”, “us”), a product of Leswang Technology, helps you verify emails, validate phone numbers and remove duplicates from contact lists. This policy explains what we collect, why, and the choices you have.",
    sections: [
      {
        heading: "Information we collect",
        bullets: [
          "Account data: your name, email address and password (stored only as a secure hash).",
          "Uploaded list data: the email addresses, phone numbers, names and company fields you submit for verification.",
          "Billing data: handled by Stripe; we never see or store your full card number.",
          "Usage data: log and analytics data such as IP address, browser, and the actions you take in the app.",
        ],
      },
      {
        heading: "How we use your information",
        bullets: [
          "To provide the service — verifying the contacts you upload and returning results.",
          "To operate your account, process payments and provide support.",
          "To secure the service, prevent abuse and meet legal obligations.",
          "To send service emails (receipts, results, security notices). Marketing email is opt-out at any time.",
        ],
      },
      {
        heading: "Legal bases for processing (GDPR)",
        paras: [
          "We process account and uploaded data to perform our contract with you. We rely on legitimate interests for security and product improvement, and on consent for non-essential cookies and marketing. Where we act as a processor for the contact data you upload, we process it only on your instructions — see our Data Processing Agreement.",
        ],
      },
      {
        heading: "Data retention",
        table: {
          headers: ["Data type", "Retention"],
          rows: [
            ["Uploaded files (raw)", "Encrypted, deleted within 24 hours"],
            ["Verification results", "90 days (Pro) / 1 year (Business)"],
            ["Account data", "Lifetime of the account + 30 days, then anonymized"],
            ["Payment records", "7 years (legal requirement)"],
            ["Logs", "12 months"],
          ],
        },
      },
      {
        heading: "Sharing and sub-processors",
        paras: [
          "We do not sell your data. We share data only with the vendors that help us run the service (for example, email and phone verification providers, payment processing and hosting). Each is bound by a data-processing agreement. See our Sub-processor List for the full set.",
        ],
      },
      {
        heading: "Your rights",
        paras: [
          "Depending on where you live, you may have the right to access, correct, delete, port or restrict processing of your personal data, and to object or withdraw consent. Email privacy@bounceblock.io to exercise any of these; we respond within the timeframe required by law.",
        ],
      },
      {
        heading: "Security and international transfers",
        paras: [
          "We encrypt data in transit (TLS 1.3) and at rest (AES-256), and apply access controls and monitoring. Where data is transferred internationally, we rely on Standard Contractual Clauses or equivalent safeguards.",
        ],
      },
      {
        heading: "Changes and contact",
        paras: [
          "We will post any changes to this policy here and update the date above. Questions? Email privacy@bounceblock.io.",
        ],
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    summary: "The agreement governing your use of BounceBlock — service, billing, cancellation and liability.",
    updated: UPDATED,
    intro:
      "These Terms govern your use of BounceBlock.io. By creating an account or using the service, you agree to them.",
    sections: [
      { heading: "1. Service description", paras: ["BounceBlock provides email verification, phone validation and duplicate removal for contact lists uploaded as CSV files."] },
      {
        heading: "2. Your obligations",
        bullets: [
          "You own, or have permission to verify, the data you upload.",
          "You will not use the service for illegal purposes or to send unsolicited bulk email in violation of applicable law.",
          "You will not upload lists obtained through unauthorized means.",
          "You are responsible for your own compliance with applicable laws (including anti-spam and data-protection laws).",
        ],
      },
      { heading: "3. Data ownership", paras: ["You retain ownership of your data. We process it only to provide the service, never sell or share it with third parties beyond our sub-processors, and store uploads only temporarily."] },
      {
        heading: "4. Payment and billing",
        bullets: [
          "Paid plans are billed monthly (or annually) and auto-renew until cancelled.",
          "Fees are charged via Stripe; failed payments may result in suspension after 7 days.",
          "Refunds are governed by our Refund Policy.",
        ],
      },
      { heading: "5. Service levels", paras: ["We target 99.9% uptime and give advance notice of scheduled maintenance where practical. Verification accuracy is high but not guaranteed to be 100%; results are provided as informational signals."] },
      { heading: "6. Limitation of liability", paras: ["The service is provided “as is.” To the maximum extent permitted by law, our total liability is capped at the amount you paid us in the 12 months before the claim, and we are not liable for indirect or consequential damages."] },
      { heading: "7. Termination", paras: ["You may cancel any time from your dashboard. We may suspend or terminate accounts that violate these Terms. On termination, data is retained for 30 days and then deleted."] },
      { heading: "8. Governing law", paras: ["These Terms are governed by the laws of the jurisdiction in which Leswang Technology is established, and disputes will be resolved there. Contact: hello@bounceblock.io."] },
    ],
  },

  cookies: {
    title: "Cookie Policy",
    summary: "The cookies we use, why, and how to manage your consent.",
    updated: UPDATED,
    intro: "This policy explains how BounceBlock uses cookies and similar technologies.",
    sections: [
      { heading: "What are cookies?", paras: ["Cookies are small text files stored on your device that help websites function and remember your preferences."] },
      {
        heading: "Cookies we use",
        table: {
          headers: ["Type", "Purpose", "Consent"],
          rows: [
            ["Essential", "Sign-in, security, core app function", "Always on"],
            ["Preferences", "Remember settings like cookie choice", "Essential"],
            ["Analytics", "Understand usage to improve the product", "Opt-in"],
          ],
        },
      },
      { heading: "Managing cookies", paras: ["You can accept or limit cookies via our consent banner, and control them in your browser settings. Blocking essential cookies may break parts of the app."] },
      { heading: "Changes and contact", paras: ["We may update this policy and will post changes here. Questions? privacy@bounceblock.io."] },
    ],
  },

  refund: {
    title: "Refund Policy",
    summary: "Our 14-day money-back guarantee and how pro-rated refunds work.",
    updated: UPDATED,
    intro: "We want you to be happy with BounceBlock. Here’s how refunds work.",
    sections: [
      { heading: "14-day money-back guarantee", bullets: ["Full refund within 14 days of your first payment, no questions asked.", "Refunded to your original payment method.", "Processing time: 5–10 business days."] },
      { heading: "After 14 days", paras: ["We offer a pro-rated refund for unused time in your current billing period. Used verifications are non-refundable."] },
      { heading: "Non-refundable", bullets: ["Abuse of the service or violation of the Terms.", "Fraudulent payments."] },
      { heading: "How to request", paras: ["Email billing@bounceblock.io with the subject “Refund Request” and the email on your account. A reason is optional but helps us improve."] },
    ],
  },

  dpa: {
    title: "Data Processing Agreement",
    summary: "Controller/processor roles, sub-processors and security measures under GDPR Article 28.",
    updated: UPDATED,
    intro:
      "This DPA applies where BounceBlock processes personal data on your behalf (the contact data you upload). You are the Controller; Leswang Technology (BounceBlock) is the Processor.",
    sections: [
      { heading: "Processing details", bullets: ["Subject matter: email and phone verification, duplicate removal.", "Duration: the service term plus 30 days.", "Data categories: contact information (email, phone, name, company).", "Data subjects: the end contacts on your lists."] },
      { heading: "Processor obligations", bullets: ["Process only on your documented instructions.", "Ensure personnel confidentiality.", "Implement appropriate technical and organizational security.", "Maintain and disclose a sub-processor list.", "Assist with data-subject requests and breach handling.", "Delete or return personal data after termination."] },
      { heading: "Security measures", bullets: ["AES-256 encryption at rest, TLS 1.3 in transit.", "Least-privilege access controls and audit logging.", "Automatic deletion of raw uploads within 24 hours."] },
      { heading: "Breach notification", paras: ["We will notify you without undue delay (and within 72 hours where feasible) after becoming aware of a personal-data breach affecting your data, including the nature, likely consequences and measures taken."] },
      { heading: "Audit and sub-processors", paras: ["You may audit our compliance with reasonable notice, or rely on our security documentation. We engage the sub-processors listed on our Sub-processor page and will notify you of material changes."] },
    ],
  },

  subprocessors: {
    title: "Sub-processor List",
    summary: "The third parties that help us deliver the service.",
    updated: UPDATED,
    intro: "We use the following sub-processors to operate BounceBlock. Each is bound by a data-processing agreement.",
    sections: [
      {
        heading: "Current sub-processors",
        table: {
          headers: ["Vendor", "Purpose", "Their compliance"],
          rows: [
            ["ZeroBounce", "Email verification", "SOC 2, GDPR"],
            ["NumVerify", "Phone validation", "GDPR"],
            ["Stripe", "Payment processing", "PCI DSS Level 1"],
            ["Supabase", "Database & auth", "SOC 2"],
            ["Vercel", "Application hosting", "SOC 2"],
            ["Cloudflare", "CDN / WAF / DDoS", "SOC 2"],
            ["Zoho Mail", "Transactional email", "ISO 27001"],
          ],
        },
      },
      { heading: "Changes", paras: ["We will update this page and, where required, notify customers before adding a new sub-processor. Questions? privacy@bounceblock.io."] },
    ],
  },

  gdpr: {
    title: "GDPR Compliance",
    summary: "Your rights as an EU data subject and how to exercise them.",
    updated: UPDATED,
    intro: "BounceBlock is committed to GDPR compliance for our EU users and the data they process with us.",
    sections: [
      { heading: "Your rights", bullets: ["Access, rectification and erasure of your personal data.", "Restriction of and objection to processing.", "Data portability.", "Withdrawal of consent at any time."] },
      { heading: "How we comply", bullets: ["Lawful bases documented for every processing activity.", "Privacy by design — data minimization and encryption by default.", "A Data Processing Agreement available to every customer.", "72-hour breach-notification process.", "Standard Contractual Clauses for international transfers."] },
      { heading: "Exercising your rights", paras: ["Email privacy@bounceblock.io. We verify your identity and respond within one month. You may also lodge a complaint with your local supervisory authority."] },
    ],
  },

  "acceptable-use": {
    title: "Acceptable Use Policy",
    summary: "Activities that are not permitted when using BounceBlock.",
    updated: UPDATED,
    intro: "To keep BounceBlock safe and lawful for everyone, you agree not to use it for the following.",
    sections: [
      { heading: "Prohibited uses", bullets: ["Verifying data you have no right to process.", "Building lists for unlawful spam or harassment.", "Attempting to breach, overload or reverse-engineer the service.", "Reselling raw verification API capacity without authorization."] },
      { heading: "Data you upload", paras: ["You confirm you have a lawful basis to process the contacts you upload and that doing so does not violate applicable privacy or anti-spam laws."] },
      { heading: "Consequences and reporting", paras: ["Violations may result in immediate suspension or termination. Report abuse to security@bounceblock.io."] },
    ],
  },
};
