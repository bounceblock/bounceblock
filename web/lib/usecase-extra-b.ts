export const USECASE_EXTRA_B: {
  slug: string;
  intro: string;
  challenges: string[];
  faq: { q: string; a: string }[];
}[] = [
  {
    slug: "data-enrichment-prep",
    intro: "Enrichment tools charge per record and append data to whatever you feed them — including addresses that will never receive a message. Verifying first means you spend enrichment budget only on contacts that are real, so your firmographic and company data sits on a foundation that actually converts.",
    challenges: [
      "Enriching an unverified list inflates your enrichment bill with dead records that add company data to contacts who already bounced.",
      "Bad inputs produce confidently wrong matches — a typo'd domain can resolve to the wrong company and quietly poison your segmentation.",
      "Without a verification pass, you can't tell which enrichment gaps are missing data versus invalid records that should be dropped entirely.",
    ],
    faq: [
      { q: "Should I verify before or after enrichment?", a: "Before. Drop the invalid and disposable records first, then enrich only what remains — you pay for fewer enrichment lookups and trust the results more." },
      { q: "Can BounceBlock enrich and verify in one step?", a: "Yes — email and phone verification runs alongside company name-to-domain matching and firmographic data in the same upload, so prep and enrichment happen together." },
      { q: "Will verifying remove records I still want to enrich?", a: "Only the ones that can't be reached. Valid and catch-all records are kept with a quality score so you decide what is worth enriching." },
    ],
  },
  {
    slug: "webinar-list-cleanup",
    intro: "Webinar registration forms are a magnet for throwaway and mistyped addresses — people register to get the recording, not to hear from you. Cleaning the registrant list before your reminder and follow-up sequence keeps those automated sends from bouncing and protects the sender reputation your whole webinar funnel depends on.",
    challenges: [
      "Registrants frequently enter a personal or fake address just to reach the registration confirmation, leaving your reminder emails undeliverable.",
      "Reminder and replay sequences fire automatically to the full list, so a batch of invalid registrations can spike your bounce rate the morning of the event.",
      "High registration volume in a short window means typos and disposable domains slip in faster than a manual review could catch them.",
    ],
    faq: [
      { q: "When should I clean a webinar list?", a: "Right after registration closes and before your reminder sequence begins, so the automated sends only go to addresses that exist." },
      { q: "Does this help with no-show follow-up?", a: "Yes — a verified list means your replay and nurture emails reach real inboxes, which is where most webinar pipeline is actually won." },
      { q: "Can I verify registrations as they come in?", a: "Yes — the BounceBlock API can validate each registration in real time at the form, so bad addresses never enter the sequence." },
    ],
  },
  {
    slug: "newsletter-list-cleaning",
    intro: "A newsletter list quietly rots between sends as subscribers change jobs and abandon inboxes, and every dead address drags down your open rate and your standing with mailbox providers. Trimming the unreachable and re-verifying long-dormant subscribers keeps your metrics honest and your newsletter landing in the inbox.",
    challenges: [
      "Long-lived newsletter lists accumulate years of abandoned free-mail accounts that now bounce or act as recycled spam traps.",
      "Open-rate dashboards hide the problem — invalid addresses simply don't open, dragging the rate down without telling you why.",
      "Re-engagement sends to never-opening subscribers are exactly the behavior mailbox providers penalize, so cleaning has to come first.",
    ],
    faq: [
      { q: "Will cleaning my newsletter list raise open rates?", a: "Usually yes — removing addresses that can never open raises the rate among real subscribers and improves placement for everyone." },
      { q: "How do I treat subscribers who haven't opened in a year?", a: "Verify them first; the ones that are still valid can go into a re-engagement segment, and the invalid ones should simply be suppressed." },
      { q: "Is phone validation useful for a newsletter?", a: "If you also run SMS, yes — BounceBlock validates phone numbers in the same pass so both channels stay clean." },
    ],
  },
  {
    slug: "event-lead-cleanup",
    intro: "Badge scans and sign-up sheets from a conference are some of the messiest data you'll ever import — hand-written addresses, OCR errors, and badges shared between colleagues. Cleaning event leads before they reach your CRM turns a noisy export into a list your sales team can actually work.",
    challenges: [
      "Badge-scanner OCR routinely misreads characters, producing addresses that look plausible but resolve to nowhere.",
      "Attendees write their email on paper forms in a hurry, so transposed letters and missing domains are the norm, not the exception.",
      "Event lists arrive in a burst and go straight to reps, so an unverified import wastes the expensive post-event follow-up window on bad contacts.",
    ],
    faq: [
      { q: "How do I clean badge-scan data?", a: "Export the scans to a CSV and run them through BounceBlock — it flags the OCR-mangled and mistyped addresses and validates the phone numbers before anything reaches your CRM." },
      { q: "Can you fix obvious typos automatically?", a: "Where a typo maps to a clear correction (like a transposed provider domain), we surface a did-you-mean suggestion so you recover the real contact." },
      { q: "Why verify event phone numbers too?", a: "Reps often call event leads first; validating line type means they dial reachable mobiles instead of disconnected or VoIP numbers." },
    ],
  },
  {
    slug: "dialer-list-validation",
    intro: "A power dialer is only as productive as the list behind it — every disconnected or wrong-type number is a wasted dial and a hit to rep morale. Validating the list before it loads into the dialer means your team spends its time on connected, callable numbers instead of dead air.",
    challenges: [
      "Disconnected and reassigned numbers look identical to live ones in a raw list, so the dialer burns through them before anyone notices.",
      "Landlines and VoIP numbers mixed into a mobile-targeted campaign waste dials and can create compliance exposure.",
      "Skip-traced and aggregated dialer data is especially prone to wrong-party numbers that pass a basic format check but never reach the intended person.",
    ],
    faq: [
      { q: "What does dialer-list validation check?", a: "Whether each number is active, its line type (mobile, landline or VoIP), and its carrier — so you load only numbers worth dialing." },
      { q: "Does this help with TCPA-style compliance?", a: "Line-type detection lets you route calls correctly and avoid texting numbers that shouldn't be texted; verification is one input to a compliant calling process." },
      { q: "Can I validate phone and email together?", a: "Yes — BounceBlock validates both in one upload, so the same list is ready for calls and email follow-up." },
    ],
  },
  {
    slug: "reactivation-campaigns",
    intro: "Win-back campaigns target your most dormant contacts — exactly the segment most likely to have gone stale. Verifying that long-inactive list before you send keeps a reactivation push from bouncing off dead addresses and undoing the very reputation you're trying to rebuild.",
    challenges: [
      "Dormant contacts are the highest-decay segment, so a win-back list mailed without verification often carries an alarming share of dead addresses.",
      "Reactivation sends to long-inactive recipients already strain your reputation; pairing that with bounces compounds the risk.",
      "Some dormant addresses have become recycled spam traps, which are far more damaging than a simple bounce.",
    ],
    faq: [
      { q: "Why verify before a reactivation campaign?", a: "The dormant segment decays the fastest, so verification removes the dead and trap addresses that would otherwise tank a win-back send." },
      { q: "What share of a dormant list is usually still valid?", a: "It varies widely by list age, which is exactly why you verify rather than guess — you'll see the real split and a quality score per contact." },
      { q: "Can I re-verify just the inactive segment?", a: "Yes — export the dormant slice, clean it, and only re-engage the addresses that come back valid." },
    ],
  },
  {
    slug: "verify-hubspot-list",
    intro: "HubSpot contacts decay quietly between syncs, and a bounce-heavy send from your connected inbox can drag down the deliverability of every workflow you run. Exporting, verifying, and re-importing keeps your HubSpot lists deliverable without touching the automation you've already built.",
    challenges: [
      "HubSpot marks contacts as bounced only after the damage is done, so invalid addresses sit in active lists until a send exposes them.",
      "Form submissions and imports add new contacts continuously, so a list that was clean last month quietly fills with typos and disposables.",
      "Workflows fire automatically against list membership, meaning one bad import can trigger bounces across several sequences at once.",
    ],
    faq: [
      { q: "How do I verify a HubSpot list?", a: "Export the contacts as a CSV from HubSpot, run them through BounceBlock, then re-import the clean file or suppress the invalid records." },
      { q: "Will this create duplicate contacts in HubSpot?", a: "No — you re-import against the existing records or simply suppress the bad ones; we also dedupe within your file first." },
      { q: "Can I verify HubSpot form submissions in real time?", a: "Yes — the API can validate each submission before it becomes a HubSpot contact, so bad data never lands." },
    ],
  },
  {
    slug: "clean-mailchimp-audience",
    intro: "Mailchimp charges by audience size and penalizes high bounce and complaint rates, so a bloated, decaying audience costs you twice. Cleaning the audience before your next campaign trims the dead weight, protects your sending reputation, and can lower your bill.",
    challenges: [
      "Inactive and never-opening subscribers inflate your audience count — and your Mailchimp tier — without ever generating engagement.",
      "Mailchimp's own cleaned-contacts list only grows after addresses bounce, so it reacts to damage rather than preventing it.",
      "Imported and integrated audiences bring in disposable and role-based addresses that quietly erode your open and click rates.",
    ],
    faq: [
      { q: "How do I clean a Mailchimp audience?", a: "Export the audience to CSV, verify it with BounceBlock, then re-import the clean contacts or archive the invalid ones to shrink the audience." },
      { q: "Can cleaning lower my Mailchimp bill?", a: "Often — removing unreachable contacts reduces your billable audience size and improves the engagement metrics Mailchimp watches." },
      { q: "Does this protect my sending reputation?", a: "Yes — fewer bounces and complaints from a verified audience keep you in good standing with both Mailchimp and the mailbox providers." },
    ],
  },
  {
    slug: "validate-salesforce-contacts",
    intro: "Salesforce is the system of record your forecasts run on, so decayed contact data doesn't just hurt outreach — it skews your reporting. Validating contacts and leads keeps reps emailing real inboxes and dialing connected numbers, and keeps the dashboards leadership trusts honest.",
    challenges: [
      "Contact records accumulate over years and turn over as people change roles, leaving a long tail of dead emails and direct lines.",
      "Duplicate and merged records carry conflicting contact details, so reps can't tell which email or number is the live one.",
      "Bad data quietly distorts pipeline and territory reporting, because invalid contacts still count toward totals and assignments.",
    ],
    faq: [
      { q: "How do I validate Salesforce contacts?", a: "Export the contacts or leads to CSV, verify email and phone with BounceBlock, and update or suppress the records that come back invalid." },
      { q: "Can I validate at the point of lead capture?", a: "Yes — the API verifies web-to-lead and form submissions in real time so invalid leads never enter Salesforce." },
      { q: "Does this help RevOps reporting?", a: "Clean contact data means pipeline, routing and engagement metrics reflect contacts that actually exist." },
    ],
  },
  {
    slug: "clean-shopify-customers",
    intro: "Your Shopify customer list powers promotions, abandoned-cart flows, and win-back emails — and a decayed list quietly hurts the deliverability of all three. Cleaning customer emails and phones keeps your store's marketing landing in the inbox and your SMS reaching real mobiles.",
    challenges: [
      "Guest-checkout and one-time buyers leave behind addresses that go stale fast, dragging down the deliverability of your promotional sends.",
      "Customers sometimes mistype their email at checkout, which means order and marketing emails bounce and support tickets follow.",
      "SMS marketing to an unvalidated phone list wastes spend on landlines, disconnected numbers and VoIP entries.",
    ],
    faq: [
      { q: "How do I clean my Shopify customer list?", a: "Export customers to CSV from Shopify, verify email and phone with BounceBlock, then re-import the clean list or suppress the bad records." },
      { q: "Will this improve my email and SMS results?", a: "Yes — verified emails keep promos in the inbox and validated mobiles keep your SMS spend on numbers that can actually receive a text." },
      { q: "Can I catch checkout typos going forward?", a: "Yes — the API can validate the email and phone at checkout so mistyped contact details are flagged on the spot." },
    ],
  },
  {
    slug: "verify-sms-list",
    intro: "SMS is priced per message and unforgiving of bad data — texts to landlines simply fail, and disconnected or VoIP numbers waste spend and can flag your sender. Validating the list before a campaign means every credit goes to a real, textable mobile.",
    challenges: [
      "Landlines can't receive texts at all, so any mixed list wastes a share of every send before it starts.",
      "Disconnected and reassigned mobiles look valid by format but bounce silently, burning credits with nothing to show.",
      "VoIP numbers are over-represented among fraudulent and throwaway signups and are riskier to text.",
    ],
    faq: [
      { q: "How do I verify a list before an SMS campaign?", a: "Upload the numbers to BounceBlock — it returns line type, carrier and status so you keep only the live, textable mobiles." },
      { q: "Why filter by line type?", a: "Texting a landline fails outright and texting VoIP is risky; filtering to mobiles is the single biggest cut in wasted SMS spend." },
      { q: "Can I validate international numbers?", a: "Yes — BounceBlock validates numbers across 30+ countries, normalising them to a consistent format first." },
    ],
  },
  {
    slug: "clean-paid-ad-leads",
    intro: "Lead-form ads on Meta, Google and LinkedIn make submitting easy — which is exactly why they attract fake names, throwaway emails and bot fills. Cleaning paid-ad leads before they reach sales stops you paying twice: once for the click, and again for the rep time chasing a contact that doesn't exist.",
    challenges: [
      "Auto-fill and one-tap lead forms lower friction so far that fake and mistyped submissions slip in at scale.",
      "Incentivized lead-gen ads draw disposable addresses from people chasing the offer, not the product.",
      "Paid leads route straight to sales, so an unverified batch wastes your most expensive follow-up time on junk.",
    ],
    faq: [
      { q: "How do I clean leads from paid ad forms?", a: "Export the lead set to CSV, run it through BounceBlock to drop fakes, disposables and invalid numbers, then send only the real leads to sales." },
      { q: "Can I verify ad leads in real time?", a: "Yes — the API can validate each lead-form submission as it arrives so bad leads never reach your CRM or your reps." },
      { q: "Does this lower my cost per real lead?", a: "Effectively yes — you stop paying sales time on leads that were never reachable, so your true cost per workable lead drops." },
    ],
  },
  {
    slug: "verify-signup-emails",
    intro: "The cleanest list is one that never lets a bad address in. Verifying email at signup — in real time, as the form submits — blocks invalid, disposable and mistyped addresses before they become a record, so your database stays clean at the source instead of needing a cleanup later.",
    challenges: [
      "Without a real-time check, typos and fake addresses enter your database silently and only reveal themselves on the first send.",
      "Disposable-email signups grab free trials and lead magnets, inflating your user count while never converting.",
      "Cleaning bad data after the fact is always more expensive than blocking it at the form.",
    ],
    faq: [
      { q: "How does real-time signup verification work?", a: "Your form calls the BounceBlock API on submit; it returns a status in milliseconds so you can block or flag invalid, disposable and typo'd addresses before creating the account." },
      { q: "Will it slow down my signup form?", a: "No — checks return fast enough to validate inline as the user submits, with a graceful fallback if the call is slow." },
      { q: "Can it verify phone at signup too?", a: "Yes — the same call can validate a phone number and its line type, useful for flagging risky VoIP signups." },
    ],
  },
  {
    slug: "clean-csv-file",
    intro: "A raw CSV exported from any tool is the lowest common denominator of contact data — invalids, duplicates, mistyped domains and dead phone numbers all jumbled together. Uploading it to BounceBlock turns that messy export into a verified, deduplicated file you can hand to any system with confidence.",
    challenges: [
      "Exports from different tools use inconsistent column names and formats, making manual cleanup slow and error-prone.",
      "Duplicates hide behind formatting differences — the same person with two capitalizations or a trailing space slips past a basic dedupe.",
      "A spreadsheet can't tell you whether an address is deliverable or a number is connected; it only sees the text.",
    ],
    faq: [
      { q: "What formats can I upload?", a: "Any CSV from a CRM, spreadsheet or email tool — BounceBlock auto-detects the email, phone and company columns on upload." },
      { q: "Does it deduplicate the file?", a: "Yes — duplicates are caught even when formatting differs, and you get back a clean, annotated file." },
      { q: "What do I get back?", a: "A verified CSV with each row's email and phone status, a quality score, and duplicates removed — ready to re-import anywhere." },
    ],
  },
  {
    slug: "verify-b2b-leads",
    intro: "B2B lead lists are diluted by personal-email signups, mistyped company names and the occasional bot — and each one wastes sales effort on a contact that isn't really a business. Verifying email, resolving the company, and validating the phone turns a noisy lead list into qualified, reachable accounts.",
    challenges: [
      "Free-email signups (gmail, outlook) blur the line between a real business lead and a tire-kicker, inflating your qualified-lead count.",
      "Mistyped or fake company names break enrichment and routing, so leads land with the wrong owner or no firmographic data at all.",
      "Aggregated B2B lists carry stale direct-dials and role addresses that pass a format check but never reach a decision-maker.",
    ],
    faq: [
      { q: "How does BounceBlock qualify B2B leads?", a: "It verifies the email, resolves the company name to a real domain, adds firmographic context, and validates the phone — so you keep leads that are real, reachable businesses." },
      { q: "Can it flag free-email B2B signups?", a: "Yes — personal-domain signups are flagged so you can route them for extra qualification rather than straight to sales." },
      { q: "Does this reduce wasted sales time?", a: "Considerably — reps work verified accounts with valid contact details instead of chasing fakes and dead numbers." },
    ],
  },
  {
    slug: "clean-google-sheet",
    intro: "Plenty of lists live and die in a Google Sheet that no one ever verifies — a tab that quietly accumulates dead addresses and duplicate rows. A quick export-clean-paste round-trip through BounceBlock turns that working sheet into a verified list without changing how you work.",
    challenges: [
      "Sheets-based lists are edited by hand over time, so typos, duplicates and stale entries pile up unnoticed.",
      "A spreadsheet has no way to tell a live address from a dead one — it only stores the text you typed.",
      "Lists shared across a team in a Sheet drift out of sync, with the same contact entered slightly differently in multiple rows.",
    ],
    faq: [
      { q: "How do I clean a list in Google Sheets?", a: "Download the sheet as a CSV, verify it with BounceBlock, and paste the clean, deduplicated results back into your Sheet." },
      { q: "Will it keep my other columns?", a: "Yes — your existing columns are preserved and we append the verification status and quality score alongside them." },
      { q: "Can it handle a sheet with both emails and phones?", a: "Yes — BounceBlock auto-detects both columns and validates them together in one pass." },
    ],
  },
  {
    slug: "validate-international-numbers",
    intro: "International phone data is a formatting minefield — country codes, trunk prefixes and local conventions vary everywhere, and a number that looks wrong is often just formatted for a different country. Validating across borders normalises every number and tells you which ones are actually reachable.",
    challenges: [
      "The same digits can be valid in one country and meaningless in another, so format-only checks produce false positives and negatives.",
      "Missing or doubled country codes are common in exported lists, breaking dialers and SMS gateways that expect E.164.",
      "Line-type and carrier conventions differ by country, so a one-size check misjudges which numbers are textable.",
    ],
    faq: [
      { q: "How many countries does BounceBlock support?", a: "Phone validation covers 30+ countries, normalising each number to E.164 and returning line type and carrier where available." },
      { q: "Does it fix missing country codes?", a: "It flags malformed and ambiguous numbers and normalises formatting so your dialer and SMS tools receive consistent E.164 values." },
      { q: "Can I validate a mixed-country list at once?", a: "Yes — upload the whole list and each number is validated against the right country's conventions in a single pass." },
    ],
  },
  {
    slug: "verify-ecommerce-customers",
    intro: "An ecommerce customer file is full of one-time buyers and guest checkouts whose addresses go stale quickly, and every dead contact dilutes the win-back and loyalty emails your repeat-purchase revenue depends on. Verifying the file keeps those campaigns landing where customers actually read them.",
    challenges: [
      "Guest and one-time buyers leave behind addresses that decay fast, so a customer file built over years is rarely as deliverable as it looks.",
      "Checkout typos produce undeliverable order confirmations and marketing emails, generating support load and lost revenue.",
      "Promo and win-back blasts to a stale customer list bounce at a rate that can flag your store's sending domain.",
    ],
    faq: [
      { q: "Why verify an ecommerce customer list?", a: "Repeat-purchase revenue rides on win-back and loyalty emails reaching real inboxes — verification keeps those sends deliverable." },
      { q: "Does it help with SMS marketing?", a: "Yes — validating customer phone numbers and line type keeps your SMS campaigns on textable mobiles." },
      { q: "How do I get my customer list out of my store?", a: "Export customers to CSV from your platform, verify with BounceBlock, then re-import the clean file or suppress the bad records." },
    ],
  },
  {
    slug: "clean-recruiting-list",
    intro: "Candidate contact data goes stale faster than almost any other list — people change jobs, switch numbers, and abandon the personal inboxes recruiters reach them on. Cleaning a candidate list keeps recruiters emailing live addresses and dialing connected numbers instead of burning a sourcing day on dead ends.",
    challenges: [
      "Candidates job-hop by definition, so work emails and direct lines in an ATS export are often out of date within months.",
      "Sourced and scraped candidate data carries a high share of guessed or pattern-built addresses that never existed.",
      "Recruiters work at speed, so an unverified list quietly wastes the outreach window on contacts that can't be reached.",
    ],
    faq: [
      { q: "How do I clean a candidate list?", a: "Export candidates from your ATS or sourcing tool to CSV, verify email and phone with BounceBlock, and prioritise the contacts that come back reachable." },
      { q: "Why validate candidate phone numbers?", a: "Recruiters call as much as they email; line-type validation means they dial real mobiles instead of disconnected or wrong-type numbers." },
      { q: "Does it work with sourced (guessed) emails?", a: "Yes — verification is especially valuable for pattern-built addresses, separating the ones that actually exist from the guesses." },
    ],
  },
  {
    slug: "verify-donor-list",
    intro: "A donor list is the lifeline of a nonprofit's appeals, and it degrades silently as supporters move and change contact details. Verifying before an appeal protects both your deliverability and the response rate that funds your mission — a bounced appeal is a donation that never had the chance to happen.",
    challenges: [
      "Donor records often span many years, so a meaningful share have moved or abandoned the address on file.",
      "Appeals go to the full list at once, so undeliverable records can spike bounces right when your campaign needs to land.",
      "Limited budgets make wasted sends and damaged deliverability especially costly for nonprofits.",
    ],
    faq: [
      { q: "Why verify a donor list before an appeal?", a: "It keeps your appeal out of spam and in front of supporters who can actually give — protecting both reputation and response rate." },
      { q: "Is BounceBlock affordable for nonprofits?", a: "Pricing is a flat monthly subscription with no per-verification credits, so regular list hygiene stays predictable and budget-friendly." },
      { q: "Can I verify donor phone numbers for a call campaign?", a: "Yes — email and phone are validated together, so phone-a-thon lists reach connected numbers." },
    ],
  },
];
