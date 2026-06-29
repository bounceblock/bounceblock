/**
 * Free tool pages (`/tools/[slug]`). Each entry carries the SEO copy; the
 * interactive widget is selected by `widget` in components/tools/ToolWidget.tsx.
 * Client-side tools (no network) stay reliable; email/phone call /api/tools/check.
 */
export type WidgetKey =
  | "email-verifier"
  | "phone-validator"
  | "email-syntax"
  | "disposable"
  | "mx-lookup"
  | "spf"
  | "dmarc"
  | "dkim"
  | "spam-subject"
  | "bounce-calc"
  // Phase-2 tools (SEO_PLAN §5A) — generators, blacklist/IP, finder, cleaner, deep checks
  | "deliverability"
  | "spf-gen"
  | "dkim-gen"
  | "dmarc-gen"
  | "blacklist"
  | "ip-reputation"
  | "catch-all"
  | "role-account"
  | "carrier"
  | "hlr"
  | "email-finder"
  | "reverse-email"
  | "company-domain"
  | "list-cleaner"
  // Phase-3 calculators + checkers (SEO_PLAN §7A) — all support Basic/Advanced mode
  | "open-rate"
  | "list-growth"
  | "email-roi"
  | "complaint-rate"
  | "freemail-revenue"
  | "verify-calc"
  | "bounce-predictor"
  | "hygiene-score"
  | "email-server"
  | "inbox-placement"
  | "warmup"
  | "cidr"
  | "send-time"
  | "domain-reputation";

export interface ToolDef {
  slug: string;
  name: string;
  widget: WidgetKey;
  tagline: string;
  intro: string;
  how: string[];
  faq: { q: string; a: string }[];
  /**
   * Optional intended-use notice shown under the widget. Used on contact-data
   * tools (finder / lookup) to make the permitted, business-only use explicit —
   * BounceBlock is for verifying contacts you're authorised to reach, never for
   * tracking, monitoring or identifying private individuals.
   */
  notice?: string;
}

/** Reusable intended-use line for contact-discovery / lookup tools. */
const BUSINESS_USE_NOTICE =
  "For verifying and reaching business contacts you're authorised to contact. Not for tracking, monitoring or identifying private individuals. See our Acceptable Use Policy.";

const CTA_FAQ = {
  q: "Can I check a whole list at once?",
  a: "This free tool checks one at a time. To verify a full list — email, phone and company together — upload a CSV to BounceBlock and preview your first 100 rows free.",
};

export const TOOLS: ToolDef[] = [
  {
    slug: "email-verifier",
    name: "Free Email Verifier",
    widget: "email-verifier",
    tagline: "Check whether a single email address is valid and deliverable.",
    intro: "Paste an email address and we'll check its syntax, domain and likely deliverability — the same checks we run on full lists, free for one address.",
    how: ["Enter the email address you want to check.", "We validate syntax, domain and mailbox signals.", "See whether it's valid, risky (catch-all) or invalid."],
    faq: [
      { q: "How does email verification work?", a: "We check the address format, confirm the domain has mail (MX) records, and look at mailbox signals to estimate deliverability — without sending an email." },
      { q: "Is it accurate?", a: "Single-address checks catch most syntax, domain and obvious deliverability problems. Full-list verification adds deeper mailbox and catch-all resolution." },
      CTA_FAQ,
    ],
  },
  {
    slug: "phone-validator",
    name: "Free Phone Number Validator",
    widget: "phone-validator",
    tagline: "Check a phone number's format, line type and likely status.",
    intro: "Enter a phone number in international format and we'll check whether it looks valid and what line type it is — the phone validation most email tools don't offer.",
    how: ["Enter a number in international format (e.g. +1 415 555 2671).", "We check formatting and line type.", "See whether it's mobile, landline or VoIP."],
    faq: [
      { q: "What does phone validation tell me?", a: "Whether a number is correctly formatted and reachable, and its line type — mobile, landline or VoIP — so you know whether to call or text." },
      { q: "Which countries are supported?", a: "International numbers in E.164 format. Full lists can be validated across 30+ countries inside BounceBlock." },
      CTA_FAQ,
    ],
  },
  {
    slug: "email-syntax-checker",
    name: "Email Syntax Checker",
    widget: "email-syntax",
    tagline: "Catch typos and malformed addresses instantly, in your browser.",
    intro: "Check whether an email address is syntactically valid and spot common typos like gmial.com — instantly, with no network call.",
    how: ["Type or paste an email address.", "We validate the format and flag likely typos.", "Fix it before it ever enters your list."],
    faq: [
      { q: "What counts as invalid syntax?", a: "Missing @, illegal characters, no domain, a domain with no dot, or a common provider typo (gmial.com, hotmial.com)." },
      { q: "Does syntax-valid mean deliverable?", a: "No — valid syntax only means the address is well-formed. Deliverability also depends on the domain and mailbox, which full verification checks." },
      CTA_FAQ,
    ],
  },
  {
    slug: "disposable-email-checker",
    name: "Disposable Email Checker",
    widget: "disposable",
    tagline: "See whether an address uses a throwaway / temporary domain.",
    intro: "Disposable addresses self-destruct and never convert. Check whether an email uses a known temporary-email domain before you let it into your CRM.",
    how: ["Enter the email address.", "We match the domain against known disposable providers.", "Block or flag throwaway signups."],
    faq: [
      { q: "Why block disposable emails?", a: "They're used to grab lead magnets and free trials without giving a real address — they inflate your list and never engage." },
      { q: "Can you catch all of them?", a: "New disposable domains appear constantly. We match a large known set; full verification combines this with deliverability and risk signals." },
      CTA_FAQ,
    ],
  },
  {
    slug: "mx-record-lookup",
    name: "MX Record Lookup",
    widget: "mx-lookup",
    tagline: "See the mail servers a domain uses to receive email.",
    intro: "Look up a domain's MX (mail exchange) records to confirm it can receive email and see which provider handles its mail.",
    how: ["Enter a domain (e.g. example.com).", "We query its DNS MX records live.", "See the mail servers and their priority."],
    faq: [
      { q: "What is an MX record?", a: "A DNS record that tells other mail servers where to deliver email for a domain. No MX records usually means the domain can't receive mail." },
      { q: "Why does it matter for verification?", a: "An address on a domain with no MX records will hard-bounce. Checking MX is one of the first steps in email verification." },
      CTA_FAQ,
    ],
  },
  {
    slug: "spf-checker",
    name: "SPF Record Checker",
    widget: "spf",
    tagline: "Lint your SPF record for common mistakes.",
    intro: "Paste your SPF record and we'll check it for syntax issues, the 10-lookup limit risk and a missing all mechanism — without any DNS access.",
    how: ["Paste your SPF TXT record (starts with v=spf1).", "We lint it for common problems.", "Fix issues that hurt your authentication."],
    faq: [
      { q: "What is SPF?", a: "Sender Policy Framework lists which servers may send email for your domain. Receivers use it to detect spoofing." },
      { q: "What breaks SPF most often?", a: "More than 10 DNS lookups, multiple SPF records on one domain, or a missing ~all / -all at the end." },
      CTA_FAQ,
    ],
  },
  {
    slug: "dmarc-checker",
    name: "DMARC Record Checker",
    widget: "dmarc",
    tagline: "Check your DMARC policy for syntax and strength.",
    intro: "Paste your DMARC record and we'll verify the syntax, policy strength and reporting setup — the authentication mailbox providers now expect.",
    how: ["Paste your DMARC TXT record (starts with v=DMARC1).", "We check policy, alignment and reporting tags.", "Tighten your policy toward p=reject."],
    faq: [
      { q: "What is DMARC?", a: "A policy that tells receivers what to do with mail that fails SPF and DKIM — none, quarantine or reject — and where to send reports." },
      { q: "Do I need DMARC?", a: "Yes. Gmail and Yahoo's bulk-sender requirements expect a published DMARC policy for senders at volume." },
      CTA_FAQ,
    ],
  },
  {
    slug: "dkim-checker",
    name: "DKIM Record Checker",
    widget: "dkim",
    tagline: "Validate the shape of a DKIM TXT record.",
    intro: "Paste a DKIM record and we'll check it has the key tags (v, k, p) and a public key — so your signed mail authenticates correctly.",
    how: ["Paste your DKIM TXT record value.", "We check for the required tags and a public key.", "Fix a malformed record before it breaks signing."],
    faq: [
      { q: "What is DKIM?", a: "DomainKeys Identified Mail adds a cryptographic signature to your email so receivers can confirm it wasn't altered and really came from your domain." },
      { q: "Where does the DKIM record live?", a: "As a TXT record at selector._domainkey.yourdomain.com, published by your email provider." },
      CTA_FAQ,
    ],
  },
  {
    slug: "spam-subject-tester",
    name: "Spam Subject-Line Tester",
    widget: "spam-subject",
    tagline: "Score a subject line for spam-trigger risk.",
    intro: "Paste a subject line and we'll flag spam-trigger words, ALL-CAPS, excessive punctuation and length issues that can hurt inbox placement.",
    how: ["Type your subject line.", "We score it against common spam signals.", "Rewrite the risky parts before you send."],
    faq: [
      { q: "Do subject lines really affect deliverability?", a: "They're one signal among many. Spammy wording, all-caps and excessive punctuation can raise filtering risk, especially combined with a poor list." },
      { q: "What matters more?", a: "List quality and authentication. A clean, verified list and proper SPF/DKIM/DMARC matter far more than any single subject line." },
      CTA_FAQ,
    ],
  },
  {
    slug: "bounce-rate-calculator",
    name: "Bounce Rate Calculator",
    widget: "bounce-calc",
    tagline: "Work out your bounce rate and whether it's safe.",
    intro: "Enter how many emails you sent and how many bounced to get your bounce rate and a plain-English verdict against the ~2% safe threshold.",
    how: ["Enter emails sent and emails bounced.", "We calculate your bounce rate.", "See whether you're in the safe zone."],
    faq: [
      { q: "What is a good bounce rate?", a: "Under ~2% is generally considered safe. Above that, mailbox providers may start throttling or filtering your mail." },
      { q: "How do I lower it?", a: "Verify your list before every send so invalid addresses are removed before they bounce." },
      CTA_FAQ,
    ],
  },

  // ── Phase-2 tools ──────────────────────────────────────────────────────────
  {
    slug: "email-deliverability-test",
    name: "Email Deliverability Test",
    widget: "deliverability",
    tagline: "Scan a domain's MX, SPF, DMARC and DKIM in one go — no login.",
    intro: "Enter your domain and we'll check its mail servers (MX) and authentication records (SPF, DMARC, DKIM) live, in one scan — so you can see what mailbox providers see before you send.",
    how: ["Enter your sending domain (e.g. yourcompany.com).", "We query MX, SPF, DMARC and DKIM records via DNS.", "See what's set up correctly and what's missing or risky."],
    faq: [
      { q: "What does this test check?", a: "Whether your domain can receive mail (MX) and whether the three authentication standards mailbox providers expect — SPF, DMARC and DKIM — are published and well-formed." },
      { q: "Why does authentication matter?", a: "Since the 2024 Gmail and Yahoo sender rules, mail from domains without SPF, DKIM and DMARC is far more likely to be filtered or rejected — even if the list is clean." },
      { q: "Is this enough on its own?", a: "Authentication gets you to the inbox; list quality keeps you there. Pair a passing deliverability test with a verified list for best results." },
      CTA_FAQ,
    ],
  },
  {
    slug: "spf-record-generator",
    name: "SPF Record Generator",
    widget: "spf-gen",
    tagline: "Build a valid SPF record from the services you send with.",
    intro: "Pick the services that send email for your domain and we'll generate a correct SPF TXT record — staying within the 10-lookup limit, with the right all policy.",
    how: ["Select the providers you send through (Google, Microsoft 365, etc.).", "Add any extra includes or IPs.", "Copy the generated SPF record into your DNS as a TXT record."],
    faq: [
      { q: "Where do I put the SPF record?", a: "Publish it as a single TXT record on your root domain. You can only have one SPF record per domain — combine all senders into it." },
      { q: "Should I use ~all or -all?", a: "Start with ~all (softfail) while you confirm everything sends correctly, then move to -all (hardfail) to fully block spoofing." },
      CTA_FAQ,
    ],
  },
  {
    slug: "dkim-record-generator",
    name: "DKIM Record Generator",
    widget: "dkim-gen",
    tagline: "Format a DKIM public key into a valid DNS TXT record.",
    intro: "Paste the public key from your email provider and pick a selector — we'll format the correct DKIM TXT record and tell you exactly where to publish it.",
    how: ["Enter your selector (e.g. google, s1) and domain.", "Paste the public key your provider gave you.", "Copy the generated record to selector._domainkey.yourdomain.com."],
    faq: [
      { q: "What is a DKIM selector?", a: "A label that lets a domain have multiple DKIM keys. Your email provider assigns one (like google or s1); it forms part of the DNS record name." },
      { q: "Where does the DKIM record go?", a: "As a TXT record at selector._domainkey.yourdomain.com — replacing 'selector' with the one your provider gave you." },
      CTA_FAQ,
    ],
  },
  {
    slug: "dmarc-record-generator",
    name: "DMARC Record Generator",
    widget: "dmarc-gen",
    tagline: "Generate a DMARC policy with the right enforcement and reporting.",
    intro: "Choose your enforcement level and reporting address and we'll build a correct DMARC TXT record — from monitoring (p=none) all the way to full enforcement (p=reject).",
    how: ["Choose a policy: none (monitor), quarantine or reject.", "Add a reporting address to receive DMARC reports.", "Copy the record to _dmarc.yourdomain.com as a TXT record."],
    faq: [
      { q: "Where should I start?", a: "Begin with p=none and a reporting address to see who's sending as you, fix any gaps, then tighten to p=quarantine and finally p=reject." },
      { q: "What is the rua address?", a: "Where aggregate DMARC reports are sent. Point it at a mailbox you monitor (or a DMARC reporting service) to see authentication results." },
      CTA_FAQ,
    ],
  },
  {
    slug: "blacklist-checker",
    name: "Blacklist Checker",
    widget: "blacklist",
    tagline: "Check whether a domain or IP is on common email blacklists.",
    intro: "Enter a domain or sending IP and we'll check it against well-known DNS blacklists (DNSBLs) that mailbox providers use to filter mail.",
    how: ["Enter a domain or IP address.", "We query several public blacklists via DNS.", "See whether it's listed anywhere that could hurt delivery."],
    faq: [
      { q: "What is an email blacklist?", a: "A DNSBL is a published list of domains or IPs known for spam. Mailbox providers check them when deciding whether to accept your mail." },
      { q: "I'm listed — what now?", a: "Each blacklist has a delisting process. Fix the underlying cause first (a compromised account, a dirty list) or you'll be relisted." },
      { q: "Why might a check be inconclusive?", a: "Some blacklists block queries from public DNS resolvers. We report those as unverifiable rather than guessing." },
      CTA_FAQ,
    ],
  },
  {
    slug: "ip-reputation-checker",
    name: "IP Reputation Checker",
    widget: "ip-reputation",
    tagline: "Check a sending IP's reverse DNS and blacklist status.",
    intro: "Enter a sending IP address and we'll look up its reverse DNS (PTR) and check it against common blacklists — two signals that shape how your mail is treated.",
    how: ["Enter the IPv4 address you send from.", "We resolve its reverse DNS and query blacklists.", "See whether the IP looks reputable to receivers."],
    faq: [
      { q: "Why does reverse DNS (PTR) matter?", a: "Mailbox providers expect a sending IP to have a matching PTR record. A missing or generic PTR is a common reason mail gets filtered." },
      { q: "What's a good IP reputation?", a: "A consistent PTR, no blacklist hits, and a steady sending history. Shared IPs inherit the reputation of everyone on them." },
      CTA_FAQ,
    ],
  },
  {
    slug: "catch-all-checker",
    name: "Catch-All Domain Checker",
    widget: "catch-all",
    tagline: "See whether a domain accepts mail for any address.",
    intro: "Enter an email or domain and we'll check whether the domain is catch-all (accept-all) — where a normal verifier can't confirm a specific mailbox exists.",
    how: ["Enter an email address or domain.", "We check the mail server's behaviour.", "See whether it's catch-all, and how risky that makes the address."],
    faq: [
      { q: "What is a catch-all domain?", a: "A domain configured to accept mail for every address, valid or not. That makes it impossible to confirm a single mailbox exists by SMTP alone." },
      { q: "Should I send to catch-all addresses?", a: "Cautiously. Some are real, some aren't. Send to catch-alls only in engaged segments — never in a cold blast — and score them by risk." },
      CTA_FAQ,
    ],
  },
  {
    slug: "role-account-checker",
    name: "Role Account Checker",
    widget: "role-account",
    tagline: "Spot role-based addresses like info@ and sales@ instantly.",
    intro: "Check whether an email is a role account — a shared mailbox like info@, sales@ or support@ — that tends to lower engagement and raise complaint risk.",
    how: ["Enter the email address.", "We check the local part against known role prefixes.", "Decide whether to keep, segment or drop it."],
    faq: [
      { q: "What's wrong with role accounts?", a: "Shared mailboxes (info@, admin@) are read by several people or none, engage poorly, and are more likely to mark mail as spam — so many senders exclude them." },
      { q: "Should I always remove them?", a: "Not always — for some B2B outreach the role inbox is the right contact. Flagging lets you decide per campaign instead of guessing." },
      CTA_FAQ,
    ],
  },
  {
    slug: "carrier-lookup",
    name: "Phone Carrier Lookup",
    widget: "carrier",
    tagline: "Validate the carrier and line type of a number on your list.",
    intro: "Checking a number you're permitted to contact? Enter it in international format and we'll return its carrier and line type — so your team routes calls and SMS to numbers that are actually reachable.",
    how: ["Enter a number you're authorised to contact, in international format (e.g. +1 415 555 2671).", "We return its carrier and line type.", "Route SMS to textable mobiles and skip disconnected lines."],
    faq: [
      { q: "What is a carrier lookup?", a: "It identifies the network that operates a number, plus its line type — used to route calls and SMS to your contacts correctly and avoid wasted sends." },
      { q: "Why does line type matter?", a: "Texting a landline or VoIP number wastes spend. Knowing the line type keeps SMS campaigns on textable mobiles." },
      { q: "Is this for tracking someone?", a: "No. It returns network and line-type data to keep outreach to your own contacts deliverable — it does not locate, track or identify a person, and must only be used for numbers you're authorised to contact." },
      CTA_FAQ,
    ],
    notice: BUSINESS_USE_NOTICE,
  },
  {
    slug: "hlr-lookup",
    name: "HLR Lookup",
    widget: "hlr",
    tagline: "Check whether a number on your list is live and reachable.",
    intro: "An HLR lookup checks the mobile network's Home Location Register to confirm a number is active before you spend time calling or texting it. Use it on numbers you're authorised to contact.",
    how: ["Enter a mobile number you're permitted to contact, in international format.", "We check its active status and network.", "Confirm it's reachable before you call or text."],
    faq: [
      { q: "What is an HLR lookup?", a: "The Home Location Register is the network's record of which numbers are active. An HLR lookup confirms a number is live and which network holds it — so you don't waste outreach on dead lines." },
      { q: "How is it different from format validation?", a: "Format validation only checks the number is well-formed. An HLR lookup confirms it's actually active on a network right now." },
      { q: "Does this reveal someone's location?", a: "No. It returns reachability and network status to keep your outreach efficient — it does not provide a person's location, identity or movements, and is only for numbers you're authorised to contact." },
      CTA_FAQ,
    ],
    notice: BUSINESS_USE_NOTICE,
  },
  {
    slug: "email-finder",
    name: "Email Finder",
    widget: "email-finder",
    tagline: "Generate the likely work-email formats at a company.",
    intro: "Enter a contact name and their company domain and we'll generate the common work-email patterns that business uses — so you can verify which one is deliverable before legitimate B2B outreach.",
    how: ["Enter a name and the company's domain.", "We generate the common work-email patterns.", "Verify the candidates to find the deliverable one."],
    faq: [
      { q: "How does email finding work?", a: "Most companies use a consistent work-email pattern (first.last@, flast@, first@). We generate the likely formats for that business so you can verify which one exists." },
      { q: "Are the addresses guaranteed real?", a: "No — these are likely patterns, not confirmed mailboxes. Verify them before sending so you only contact addresses that exist." },
      { q: "What can I use this for?", a: "Reaching business contacts at companies for legitimate B2B outreach, where you have a lawful basis to make contact. It generates work-email formats — it isn't a people-search or background-check tool." },
      CTA_FAQ,
    ],
    notice: BUSINESS_USE_NOTICE,
  },
  {
    slug: "reverse-email-lookup",
    name: "Email Address Analyzer",
    widget: "reverse-email",
    tagline: "Break down an address's deliverability signals — not the person.",
    intro: "Paste an email and we'll analyse the address itself: the domain and likely provider, whether it's a free, role, disposable or business address, and its risk signals. It does not identify or look up the person behind it.",
    how: ["Enter the email address.", "We analyse the domain and local part.", "See the provider type and any deliverability risk flags."],
    faq: [
      { q: "What can I learn from an email address?", a: "The domain reveals the provider (free webmail vs business), the local part reveals role accounts, and the domain can be matched against disposable lists — all deliverability signals, computed without sending." },
      { q: "Can you tell me who owns it?", a: "No. This tool analyses the address's structure and deliverability signals, not personal identity. It is not a people-search, identity or background-check tool." },
      CTA_FAQ,
    ],
    notice: "Analyses an address's deliverability signals only — it does not identify, locate or profile the person behind it. See our Acceptable Use Policy.",
  },
  {
    slug: "company-domain-finder",
    name: "Company Domain Finder",
    widget: "company-domain",
    tagline: "Find the likely website domain for a company name.",
    intro: "Enter a company name and we'll generate its most likely domains — the first step in matching a business name to its real website and work emails.",
    how: ["Enter the company name.", "We generate likely domain candidates.", "Confirm the right one, then find work emails on it."],
    faq: [
      { q: "How accurate is name-to-domain matching?", a: "Simple cases (one-word brands) are easy; ambiguous names need verification. This tool suggests candidates — BounceBlock's enrichment confirms the real one." },
      { q: "Why match names to domains?", a: "A verified domain unlocks work-email finding and firmographic enrichment, and filters out free-email fakes in B2B lists." },
      CTA_FAQ,
    ],
  },
  {
    slug: "email-list-cleaner",
    name: "Email List Cleaner",
    widget: "list-cleaner",
    tagline: "Paste a list to dedupe and remove invalid, role and disposable addresses.",
    intro: "Paste up to a few hundred emails and we'll deduplicate them, drop malformed addresses, and flag role and disposable domains — right in your browser, then export the clean list.",
    how: ["Paste your email addresses (one per line or comma-separated).", "We dedupe, validate syntax and flag role/disposable addresses.", "Copy the cleaned list — or upload to BounceBlock for full mailbox verification."],
    faq: [
      { q: "Does this verify deliverability?", a: "This browser tool handles syntax, duplicates and role/disposable flags. It can't check live mailboxes — upload to BounceBlock for SMTP and catch-all verification." },
      { q: "Is my list uploaded anywhere?", a: "No. This cleaner runs entirely in your browser — nothing is sent to a server. For full verification of large lists, use the secure BounceBlock app." },
      CTA_FAQ,
    ],
  },

  // ── Phase-3 calculators + checkers (Basic / Advanced mode) ──────────────────
  {
    slug: "email-open-rate-calculator",
    name: "Email Open Rate Calculator",
    widget: "open-rate",
    tagline: "Work out your open rate and how it compares to benchmarks.",
    intro: "Enter your sends and opens to get your open rate instantly. Switch to Advanced to separate delivered from sent and split unique vs total opens — the way ESPs actually report it.",
    how: ["Enter emails sent and opens (Basic), or add delivered and unique opens (Advanced).", "We calculate your open rate against the numbers that matter.", "Compare it to the ~20–25% benchmark and see where you stand."],
    faq: [
      { q: "Should I use sent or delivered as the denominator?", a: "Delivered is more honest — open rate on delivered strips out bounces. Use Advanced mode to enter delivered (or bounces) and we'll compute both." },
      { q: "What's a good open rate?", a: "It varies by industry, but 20–25% is a common benchmark. A clean, verified list is the single biggest lever — fewer bounces means a higher delivered rate to open from." },
      CTA_FAQ,
    ],
  },
  {
    slug: "email-list-growth-calculator",
    name: "Email List Growth Calculator",
    widget: "list-growth",
    tagline: "Measure net list growth and project it forward.",
    intro: "See your net list growth rate from new subscribers and unsubscribes. Advanced mode adds list decay so you can project your real, deliverable list size months ahead.",
    how: ["Enter starting subscribers, new sign-ups and unsubscribes for the period.", "We calculate net growth and your growth rate.", "In Advanced mode, add a monthly decay rate to project the list forward."],
    faq: [
      { q: "Why factor in list decay?", a: "Email lists decay ~2–2.5% per month as people change jobs and abandon addresses. Ignoring it overstates how many contacts you can actually reach." },
      { q: "How do I keep growth healthy?", a: "Net adds matter less than deliverable adds. Verify new sign-ups at the form and re-verify the list periodically so growth reflects reachable contacts, not dead weight." },
      CTA_FAQ,
    ],
  },
  {
    slug: "email-roi-calculator",
    name: "Email Marketing ROI Calculator",
    widget: "email-roi",
    tagline: "Calculate the return on an email campaign or program.",
    intro: "Enter cost and revenue for a quick ROI, or use Advanced mode to model it from the funnel — list size, open rate, click rate, conversion and order value.",
    how: ["Basic: enter campaign cost and revenue generated.", "Advanced: enter list size, open/click/conversion rates and average order value.", "See ROI, return per dollar and projected revenue."],
    faq: [
      { q: "How is email ROI calculated?", a: "ROI = (revenue − cost) ÷ cost, shown as a percentage. Advanced mode builds the revenue from your funnel so you can see which step to improve." },
      { q: "Where does verification fit in?", a: "Bounces and spam-folder placement quietly shrink the top of the funnel. A verified list lifts deliverability, which lifts every downstream number in this model." },
      CTA_FAQ,
    ],
  },
  {
    slug: "spam-complaint-rate-calculator",
    name: "Spam Complaint Rate Calculator",
    widget: "complaint-rate",
    tagline: "Check your complaint rate against the 0.3% provider limit.",
    intro: "Enter delivered emails and spam complaints to get your complaint rate and a verdict against Gmail and Yahoo's 0.3% hard limit. Advanced mode breaks it down per provider.",
    how: ["Enter emails delivered and spam complaints received.", "We calculate your complaint rate as a percentage.", "See whether you're under the 0.1% target and the 0.3% hard limit."],
    faq: [
      { q: "What complaint rate is too high?", a: "Gmail and Yahoo require senders to stay under 0.3%, and ideally below 0.1%. Cross 0.3% and your mail starts getting throttled or blocked." },
      { q: "How do I lower complaints?", a: "Send only to people who opted in, make unsubscribe easy, and remove unengaged and unverified addresses — stale lists drive complaints." },
      CTA_FAQ,
    ],
  },
  {
    slug: "freemail-revenue-calculator",
    name: "Freemail Revenue Loss Calculator",
    widget: "freemail-revenue",
    tagline: "Estimate the revenue free & disposable signups cost you.",
    intro: "Free webmail and disposable signups convert worse and churn faster. Estimate the revenue leaking out of your list — Advanced mode lets you set the conversion gap and churn yourself.",
    how: ["Enter list size, share of free/disposable emails and revenue per valid contact.", "Advanced: set the conversion gap and churn for free vs business addresses.", "See the estimated revenue those low-quality signups are costing you."],
    faq: [
      { q: "Why do free/disposable signups cost money?", a: "Disposable addresses never convert, and free webmail signups in B2B convert and retain worse than business addresses — yet they still cost you sends, support and skewed metrics." },
      { q: "Is this an exact figure?", a: "It's an estimate from your inputs, meant to size the opportunity. Verifying and enriching signups at the form is how you stop the leak in practice." },
      CTA_FAQ,
    ],
  },
  {
    slug: "email-verification-calculator",
    name: "Email Verification ROI Calculator",
    widget: "verify-calc",
    tagline: "See what cleaning your list saves before you send.",
    intro: "Estimate how many invalid addresses a verification pass will catch and what your bounce rate drops to. Advanced mode adds send costs and reputation value to show net ROI.",
    how: ["Enter list size and your estimated (or current) invalid rate.", "We show invalid addresses caught and your projected post-clean bounce rate.", "Advanced: add cost per send to see the money saved per campaign."],
    faq: [
      { q: "How many invalid emails will I have?", a: "It depends on age and source — purchased and old lists often run 15–30% invalid, opt-in lists far less. Enter your best estimate; the calculator does the rest." },
      { q: "Does verification pay for itself?", a: "Usually quickly — it protects sender reputation, cuts wasted sends and lifts deliverability across every future campaign, not just the one you clean." },
      CTA_FAQ,
    ],
  },
  {
    slug: "bounce-rate-predictor",
    name: "Bounce Rate Predictor",
    widget: "bounce-predictor",
    tagline: "Predict a list's bounce rate before you hit send.",
    intro: "Answer a few questions about a list's age, source and verification status to get a predicted bounce-rate range. Advanced mode factors in size and time since last clean.",
    how: ["Pick the list's source and how old it is.", "Advanced: add list size, % unverified and months since last cleaned.", "Get a predicted bounce-rate band and a send/clean recommendation."],
    faq: [
      { q: "How can you predict a bounce rate?", a: "Bounce risk tracks closely with list age, source and verification status. This tool turns those signals into an estimated range — it's a guide, not a guarantee." },
      { q: "What if the prediction is high?", a: "Verify before you send. A verification pass removes the invalid addresses driving the predicted bounces, pulling the real rate back under the safe threshold." },
      CTA_FAQ,
    ],
  },
  {
    slug: "list-hygiene-score",
    name: "Email List Hygiene Score",
    widget: "hygiene-score",
    tagline: "Score a pasted list for duplicates, role and disposable addresses.",
    intro: "Paste a list and get a hygiene score from 0–100 based on syntax, duplicates, role and disposable addresses — all in your browser. Advanced mode folds in bounce rate and last-verified date.",
    how: ["Paste your email addresses (one per line or comma-separated).", "We score syntax, duplicates, role and disposable ratios into a grade.", "Advanced: add your bounce rate and months since last verified for a fuller picture."],
    faq: [
      { q: "What makes a list 'hygienic'?", a: "Low duplicates, no malformed addresses, few role or disposable accounts, and a recent verification. This score weighs those signals into a single grade." },
      { q: "Is my list sent anywhere?", a: "No — the scoring runs entirely in your browser. For live mailbox and catch-all checks, upload the list to BounceBlock." },
      CTA_FAQ,
    ],
  },
  {
    slug: "email-server-tester",
    name: "Email Server Tester",
    widget: "email-server",
    tagline: "Check a domain's mail servers and where they point.",
    intro: "Enter a domain to see its MX records and the mail provider behind them. Advanced mode resolves each server's IP and reverse DNS — the signals receivers judge a sender by.",
    how: ["Enter a domain (e.g. yourcompany.com).", "We query its MX records live and identify the provider.", "Advanced: resolve each mail server's IP and PTR (reverse DNS)."],
    faq: [
      { q: "What does this tell me?", a: "Whether a domain has working mail servers, who hosts them, and (in Advanced) whether those servers have proper reverse DNS — a common deliverability signal." },
      { q: "Can it test SMTP directly?", a: "Browsers can't open SMTP connections, so this runs over DNS. For a full inbound send test, pair it with our deliverability and blacklist tools." },
      CTA_FAQ,
    ],
  },
  {
    slug: "inbox-placement-tester",
    name: "Inbox Placement Estimator",
    widget: "inbox-placement",
    tagline: "Estimate your inbox-placement odds from your setup.",
    intro: "Answer a few yes/no questions about your authentication and list quality to get an estimated inbox-placement score. Advanced mode adds engagement and reputation signals.",
    how: ["Tell us whether SPF, DKIM and DMARC are set up and your list is verified.", "Advanced: add engagement rate, complaint history and content quality.", "Get an estimated placement score and the weakest link to fix first."],
    faq: [
      { q: "Is this a real seed-list inbox test?", a: "No — it's an estimator based on the signals you report, so you can spot gaps fast. True seed-list testing sends to provider accounts; this points you at what to fix first." },
      { q: "What moves placement the most?", a: "Authentication (SPF/DKIM/DMARC) gets you eligible; list quality and engagement get you to the inbox. The score weighs both and flags your weakest factor." },
      CTA_FAQ,
    ],
  },
  {
    slug: "email-warmup-checker",
    name: "Email Warmup Calculator",
    widget: "warmup",
    tagline: "Plan a sending ramp from your current to target volume.",
    intro: "Work out how long it takes to warm a domain or IP from today's volume to your target. Advanced mode lets you set the daily increase and see the full ramp schedule.",
    how: ["Enter your current daily volume and target daily volume.", "Advanced: set the daily increase rate and starting day.", "Get the number of days to warm up and a day-by-day schedule."],
    faq: [
      { q: "Why warm up a sending domain?", a: "Mailbox providers distrust sudden volume from a new domain or IP. Ramping gradually builds reputation so your mail reaches the inbox instead of the spam folder." },
      { q: "How fast can I ramp?", a: "A common rule is increasing ~25–50% per day while keeping bounces and complaints low. Send to your most engaged, verified contacts first during warmup." },
      CTA_FAQ,
    ],
  },
  {
    slug: "cidr-ip-range-converter",
    name: "CIDR to IP Range Converter",
    widget: "cidr",
    tagline: "Convert CIDR notation to an IP range, and back.",
    intro: "Enter a CIDR block to see its network, broadcast, host range and total addresses. Advanced mode adds the netmask, wildcard and binary — and converts a start–end range back to CIDR.",
    how: ["Enter a CIDR block (e.g. 203.0.113.0/24).", "We compute the network, broadcast, usable host range and count.", "Advanced: see netmask/wildcard/binary, or convert an IP range back to CIDR blocks."],
    faq: [
      { q: "What is CIDR notation?", a: "Classless Inter-Domain Routing notation (like 203.0.113.0/24) describes a block of IP addresses by a base address and prefix length — common in SPF records and IP allowlists." },
      { q: "Why does this matter for email?", a: "SPF records and firewall/IP allowlists often use CIDR ranges. Converting between CIDR and explicit ranges helps you author and audit them correctly." },
      CTA_FAQ,
    ],
  },
  {
    slug: "email-send-time-optimizer",
    name: "Email Send Time Optimizer",
    widget: "send-time",
    tagline: "Get recommended send windows for your audience.",
    intro: "Pick your audience type and time zone to get recommended send windows. Advanced mode tailors the ranking by industry and how spread out your audience's time zones are.",
    how: ["Choose your audience type (B2B or B2C) and primary time zone.", "Advanced: pick an industry and how spread your audience's time zones are.", "Get ranked day-and-time windows to test first."],
    faq: [
      { q: "Is there one best time to send?", a: "No single time wins for everyone — these are research-backed starting windows. Always A/B test against your own audience, since engagement data beats any benchmark." },
      { q: "Does send time matter more than the list?", a: "No. Timing is a tuning lever; reaching real, verified inboxes is the foundation. Optimize send time after your list and authentication are solid." },
      CTA_FAQ,
    ],
  },
  {
    slug: "domain-reputation-checker",
    name: "Domain Reputation Checker",
    widget: "domain-reputation",
    tagline: "Grade a sending domain on authentication and blacklists.",
    intro: "Enter a domain for a reputation grade built from its MX, SPF, DMARC and blacklist status. Advanced mode adds DKIM detection and reverse DNS on the resolved IP.",
    how: ["Enter your sending domain (e.g. yourcompany.com).", "We check MX, SPF, DMARC and blacklist status live via DNS.", "Advanced: add DKIM selector detection and PTR on the resolved IP for a fuller grade."],
    faq: [
      { q: "What makes up domain reputation?", a: "Mailbox providers weigh authentication (SPF/DKIM/DMARC), whether you're blacklisted, and your sending history. This tool grades the public, checkable signals." },
      { q: "How do I improve a poor grade?", a: "Publish and tighten SPF, DKIM and DMARC, get delisted from any blacklists, and keep your list clean so sending history stays healthy." },
      CTA_FAQ,
    ],
  },
];

export function getTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}
