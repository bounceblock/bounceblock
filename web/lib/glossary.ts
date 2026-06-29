/** Glossary / "learn" pages (`/glossary/[slug]`). Educational, internally linked. */
export interface GlossaryTerm {
  slug: string;
  term: string;
  short: string;      // one-sentence definition (used as meta description)
  body: string[];     // 2-3 paragraphs
  related: string[];  // slugs of other terms
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "email-verification",
    term: "Email verification",
    short: "The process of checking whether an email address is real and able to receive mail, without sending one.",
    body: [
      "Email verification confirms that an address is correctly formatted, that its domain can receive mail, and that the mailbox is likely to accept a message — all without actually sending an email. It is how teams remove invalid addresses before a campaign so they don't hard-bounce.",
      "A verifier typically runs several checks in sequence: syntax, domain and MX records, and a mailbox-level probe, then returns a status such as valid, invalid, catch-all or unknown. Verifying before every send keeps your bounce rate low and protects your sender reputation.",
    ],
    related: ["bounce-rate", "catch-all-email", "mx-record", "email-deliverability"],
  },
  {
    slug: "catch-all-email",
    term: "Catch-all email",
    short: "A domain configured to accept mail for every address, so a verifier can't confirm a specific mailbox exists.",
    body: [
      "A catch-all (or accept-all) domain accepts messages sent to any address at that domain — valid@domain.com and alsdkj@domain.com both get accepted at the SMTP layer. That makes it impossible to confirm a specific mailbox from the outside, so verifiers return a catch-all status rather than a definite valid or invalid.",
      "Catch-all addresses are risky: some are real and deliverable, some aren't. A good practice is to send to them cautiously — only to engaged segments — or to weight them lower in your quality score.",
    ],
    related: ["email-verification", "email-deliverability", "bounce-rate", "role-based-email"],
  },
  {
    slug: "disposable-email",
    term: "Disposable email",
    short: "A temporary, throwaway address from a service designed to self-destruct after short-term use.",
    body: [
      "Disposable email addresses come from services that hand out temporary inboxes — useful for someone who wants to grab a lead magnet or free trial without giving a real address. They expire quickly, never get checked, and never convert.",
      "Filtering disposable domains at signup keeps your list cleaner and your engagement metrics honest. Because new disposable domains appear constantly, detection relies on a continuously updated list combined with other risk signals.",
    ],
    related: ["role-based-email", "email-verification", "form-guard", "list-hygiene"],
  },
  {
    slug: "hard-vs-soft-bounce",
    term: "Hard bounce vs soft bounce",
    short: "A hard bounce is a permanent delivery failure; a soft bounce is a temporary one.",
    body: [
      "A hard bounce means the address is permanently undeliverable — it doesn't exist, the domain is wrong, or the mailbox is closed. Hard bounces are the dangerous ones: a few percent is enough to damage your sender reputation, so the addresses behind them should be removed immediately.",
      "A soft bounce is temporary — a full mailbox, a server that's down, or a message that's too large. Mail systems usually retry soft bounces for a while. Persistent soft bounces eventually behave like hard bounces and should be suppressed.",
    ],
    related: ["bounce-rate", "sender-reputation", "email-deliverability", "email-verification"],
  },
  {
    slug: "sender-reputation",
    term: "Sender reputation",
    short: "A trust score mailbox providers assign to your sending domain and IP that decides inbox vs spam.",
    body: [
      "Sender reputation is the invisible score mailbox providers like Gmail and Outlook assign to your sending domain and IP. It's based on signals such as bounce rate, spam complaints, engagement and sending consistency — and it decides whether your mail lands in the inbox or the spam folder.",
      "List quality is the foundation of reputation: hard bounces and spam-trap hits are among the fastest ways to damage it. Verifying your list before every send removes the biggest risk at the source.",
    ],
    related: ["spam-trap", "bounce-rate", "email-deliverability", "dmarc"],
  },
  {
    slug: "spam-trap",
    term: "Spam trap",
    short: "An email address used by providers and blocklists to catch senders with poor list hygiene.",
    body: [
      "A spam trap is an address that exists only to catch senders who aren't managing their lists well. Pristine traps are addresses that never opted in to anything; recycled traps are once-real addresses that were abandoned and repurposed. Sending to either signals that you're mailing people who never engaged.",
      "Hitting spam traps can quickly land you on a blocklist and tank deliverability. You can't see traps directly, but you avoid them by verifying lists, removing long-inactive contacts, and never buying lists.",
    ],
    related: ["sender-reputation", "list-hygiene", "email-deliverability", "bounce-rate"],
  },
  {
    slug: "role-based-email",
    term: "Role-based email",
    short: "An address tied to a function rather than a person, like info@ or sales@.",
    body: [
      "Role-based addresses (info@, sales@, support@, admin@) reach a function or a shared inbox rather than an individual. They tend to have lower engagement, are more likely to generate complaints, and are sometimes monitored by several people at once.",
      "Verification flags role accounts so you can decide how to treat them. Many senders exclude them from cold outreach but keep them for transactional or account-level communication.",
    ],
    related: ["catch-all-email", "email-verification", "disposable-email", "list-hygiene"],
  },
  {
    slug: "mx-record",
    term: "MX record",
    short: "A DNS record that tells other servers where to deliver email for a domain.",
    body: [
      "An MX (mail exchange) record is a DNS entry that points to the mail servers responsible for receiving email for a domain, each with a priority. When you send to someone@example.com, your server looks up example.com's MX records to know where to deliver.",
      "If a domain has no MX records, it generally can't receive mail — so any address there will hard-bounce. Checking MX is one of the first steps an email verifier performs.",
    ],
    related: ["email-verification", "spf", "email-deliverability", "hard-vs-soft-bounce"],
  },
  {
    slug: "spf",
    term: "SPF",
    short: "Sender Policy Framework — a DNS record listing which servers may send email for your domain.",
    body: [
      "SPF (Sender Policy Framework) is a TXT record that publishes the list of servers and services allowed to send mail on behalf of your domain. Receiving servers check it to detect spoofing — mail from a server not in your SPF record looks suspicious.",
      "Common SPF mistakes include exceeding the 10-DNS-lookup limit, publishing more than one SPF record, or omitting the closing all mechanism. SPF works alongside DKIM and DMARC as the three pillars of email authentication.",
    ],
    related: ["dkim", "dmarc", "sender-reputation", "email-deliverability"],
  },
  {
    slug: "dkim",
    term: "DKIM",
    short: "DomainKeys Identified Mail — a cryptographic signature that proves an email wasn't altered in transit.",
    body: [
      "DKIM adds a digital signature to your outgoing mail using a private key; the matching public key is published as a DNS TXT record at a selector under your domain. Receivers verify the signature to confirm the message really came from your domain and wasn't tampered with.",
      "DKIM is one of the three authentication standards mailbox providers expect. Together with SPF, it feeds DMARC, which decides what happens to mail that fails authentication.",
    ],
    related: ["spf", "dmarc", "sender-reputation", "email-deliverability"],
  },
  {
    slug: "dmarc",
    term: "DMARC",
    short: "A policy that tells receivers what to do with mail failing SPF and DKIM, plus where to send reports.",
    body: [
      "DMARC (Domain-based Message Authentication, Reporting and Conformance) ties SPF and DKIM together. You publish a policy — none, quarantine or reject — telling receivers how to handle mail that fails authentication, and a reporting address that collects aggregate reports about who's sending as your domain.",
      "Gmail and Yahoo's bulk-sender requirements expect a published DMARC policy. Most senders start at p=none to monitor, then tighten toward p=reject once they're confident their legitimate mail authenticates.",
    ],
    related: ["spf", "dkim", "sender-reputation", "email-deliverability"],
  },
  {
    slug: "email-deliverability",
    term: "Email deliverability",
    short: "Whether your email actually reaches the inbox rather than the spam folder or a bounce.",
    body: [
      "Deliverability is the practical measure of how much of your mail reaches the inbox. It depends on authentication (SPF, DKIM, DMARC), sender reputation, engagement, and — crucially — list quality. You can write the perfect email and still never be seen if any of these are weak.",
      "The single biggest lever most teams control is list hygiene: verifying addresses before every send so bounces and spam-trap hits don't erode reputation. Clean lists and proper authentication do most of the work.",
    ],
    related: ["sender-reputation", "bounce-rate", "list-hygiene", "dmarc"],
  },
  {
    slug: "phone-validation",
    term: "Phone number validation",
    short: "Checking whether a phone number is correctly formatted, active and what line type it is.",
    body: [
      "Phone validation confirms that a number is well-formed (in E.164 international format), reachable, and identifies its line type — mobile, landline or VoIP — along with its carrier and country. It's the phone-side equivalent of email verification.",
      "For teams that call or text, validating numbers before outreach saves wasted dials and failed SMS. Most email verification tools ignore phone entirely; bundling both means one clean file covers your whole outreach.",
    ],
    related: ["line-type", "hlr-lookup", "list-hygiene", "data-enrichment"],
  },
  {
    slug: "hlr-lookup",
    term: "HLR lookup",
    short: "A query against the carrier's Home Location Register to check a mobile number's live status.",
    body: [
      "An HLR (Home Location Register) lookup queries the database mobile carriers use to track their subscribers. It can reveal whether a mobile number is currently active, which network it's on, and whether it's been ported to another carrier — without placing a call or sending a text.",
      "HLR data makes phone validation more accurate for mobile numbers, helping you avoid dialing or texting numbers that are disconnected or out of service.",
    ],
    related: ["phone-validation", "line-type", "list-hygiene", "data-enrichment"],
  },
  {
    slug: "line-type",
    term: "Line type (mobile/landline/VoIP)",
    short: "Whether a phone number is a mobile, a landline or a VoIP number — which changes how you should reach it.",
    body: [
      "Line type tells you the kind of number you're dealing with. Mobile numbers can be called or texted; landlines can be called but not texted; VoIP numbers (internet-based) are often used for fraud or throwaway signups and behave unpredictably.",
      "Knowing line type lets sales and marketing teams route outreach correctly — SMS to mobiles, calls to landlines — and flag risky VoIP numbers before they reach a dialer or an SMS campaign.",
    ],
    related: ["phone-validation", "hlr-lookup", "list-hygiene", "form-guard"],
  },
  {
    slug: "data-enrichment",
    term: "Data enrichment",
    short: "Adding missing context — like company, industry or location — to a contact record.",
    body: [
      "Data enrichment fills in the gaps around a contact: the company they work for, its industry and size, location, and other firmographic detail. It turns a bare email or phone number into a record your team can segment, score and personalise around.",
      "Enrichment is most valuable after verification — there's no point enriching a record that's invalid. Verify first, then enrich only the contacts that are real.",
    ],
    related: ["firmographics", "name-to-domain-matching", "email-verification", "phone-validation"],
  },
  {
    slug: "firmographics",
    term: "Firmographics",
    short: "Company-level attributes — industry, size, revenue, location — used to segment and score B2B leads.",
    body: [
      "Firmographics are to companies what demographics are to people: the descriptive attributes you use to group and target B2B accounts. Common fields include industry, employee count, revenue band, headquarters location and technology stack.",
      "Good firmographic data powers lead scoring, territory assignment and personalised outreach. It's only as useful as it is accurate, which is why enrichment pairs naturally with verification.",
    ],
    related: ["data-enrichment", "name-to-domain-matching", "email-verification", "phone-validation"],
  },
  {
    slug: "name-to-domain-matching",
    term: "Company name-to-domain matching",
    short: "Resolving a company's name to its primary web domain, a building block of B2B enrichment.",
    body: [
      "Name-to-domain matching takes a company name — often messily entered on a form — and resolves it to the company's real primary domain. It's a foundational step for enrichment, deduplication and routing, because the domain is the most reliable key for a B2B account.",
      "Matching has to handle abbreviations, legal suffixes, subsidiaries and look-alike names, so it combines fuzzy matching with verification to avoid attaching data to the wrong company.",
    ],
    related: ["firmographics", "data-enrichment", "form-guard", "email-verification"],
  },
  {
    slug: "bounce-rate",
    term: "Bounce rate",
    short: "The share of sent emails that couldn't be delivered — a key deliverability signal.",
    body: [
      "Bounce rate is the percentage of emails that fail to deliver, split into hard and soft bounces. It's one of the clearest signals mailbox providers use to judge whether you're a sender worth trusting.",
      "Most healthy B2B senders sit around or under 2%; cold outreach to unverified lists often runs far higher. Verifying before every send is the most direct way to keep the rate in the safe zone.",
    ],
    related: ["hard-vs-soft-bounce", "sender-reputation", "email-deliverability", "list-hygiene"],
  },
  {
    slug: "list-hygiene",
    term: "List hygiene",
    short: "The ongoing practice of keeping a contact list clean, current and deliverable.",
    body: [
      "List hygiene is the routine of removing invalid, duplicate and long-inactive contacts so your list stays deliverable. Contact data decays continuously as people change jobs and abandon inboxes, so hygiene is a habit, not a one-time cleanup.",
      "Practical hygiene means verifying before every major send, validating new contacts at the point of capture, re-checking anything older than a quarter, and suppressing addresses that bounce or never engage.",
    ],
    related: ["bounce-rate", "email-verification", "sender-reputation", "data-enrichment"],
  },
  {
    slug: "email-verification-api",
    term: "Email verification API",
    short: "A programmatic endpoint that verifies an address in real time, usually at the point of capture.",
    body: [
      "An email verification API lets you check an address from your own code — typically the moment someone submits a form — and get back a status in real time. That stops bad addresses from entering your database in the first place, rather than cleaning them up later.",
      "APIs are used for live form validation, signup gating and CRM integrations. The same engine that powers bulk list cleaning usually backs the API, so results are consistent whether you verify one address or a million.",
    ],
    related: ["email-verification", "form-guard", "list-hygiene", "data-enrichment"],
  },
  {
    slug: "form-guard",
    term: "Form guard",
    short: "Real-time verification on a signup or lead form that blocks fake, invalid or risky submissions.",
    body: [
      "A form guard sits on your signup or lead-capture form and verifies the email (and often the phone) the instant it's entered. It blocks or flags invalid addresses, disposable domains, obvious typos and risky VoIP numbers before they ever become a record.",
      "Guarding the form keeps your CRM clean at the source, cuts fake signups and bot noise, and means you spend enrichment and outreach effort only on real contacts.",
    ],
    related: ["email-verification-api", "disposable-email", "line-type", "list-hygiene"],
  },
];

export function getTerm(slug: string) {
  return GLOSSARY.find((t) => t.slug === slug);
}
