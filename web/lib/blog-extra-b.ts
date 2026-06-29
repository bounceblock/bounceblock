import type { BlogPost } from "@/lib/blog";

/** Phase-1 blog expansion, set B — verification, phone, company/data, lead-gen. */
export const POSTS_B: BlogPost[] = [
  {
    slug: "real-time-vs-bulk-verification",
    title: "Real-time vs bulk email verification: which do you need?",
    description: "When to verify at the point of capture versus cleaning a whole list at once — and why most teams use both.",
    date: "2026-02-26",
    readMins: 5,
    category: "Email verification",
    intro:
      "Email verification comes in two shapes: real-time (one address at a time, as it's captured) and bulk (a whole list at once). Most teams need both. Here's how to think about it.",
    sections: [
      { heading: "Real-time verification", paras: ["Real-time verification runs via an API the moment someone submits a form or signs up. It blocks invalid and disposable addresses before they ever enter your database — the cleanest data is data you never let in."] },
      { heading: "Bulk verification", paras: ["Bulk verification cleans a list you already have — an export, a purchased list, an aging CRM. You upload a CSV, verify every row, dedupe, and download a clean file before a campaign."] },
      { heading: "Why most teams use both", bullets: ["Real-time keeps new data clean at the source.", "Bulk cleans the data you already accumulated.", "Together they keep the whole database deliverable."] },
      { heading: "One engine, both modes", paras: ["BounceBlock runs the same verification engine for bulk uploads and the real-time API, so results are consistent whether you check one address or a million."] },
    ],
  },
  {
    slug: "how-accurate-is-email-verification",
    title: "How accurate is email verification, really?",
    description: "What email verification can and can't tell you for certain — and why catch-all and unknown results exist.",
    date: "2026-02-19",
    readMins: 5,
    category: "Email verification",
    intro:
      "No verifier can promise 100% certainty on every address — and any that claims to should make you suspicious. Here's what verification gets right, where the limits are, and how to read the results honestly.",
    sections: [
      { heading: "What it nails", paras: ["Syntax errors, typos, non-existent domains and domains with no MX records are caught reliably — these are clearly invalid and will bounce. So are most disposable and role-based addresses."] },
      { heading: "Where certainty ends", paras: ["Catch-all domains accept everything, so a specific mailbox can't be confirmed from outside. Some servers also greylist or time out, producing an unknown result. Honest verifiers report these as catch-all or unknown rather than guessing."] },
      { heading: "How to read a quality score", paras: ["A per-list quality score blends all these signals so you can judge a whole list at a glance. A high score means most addresses are clearly valid; a lower one flags more risk to investigate before you send."] },
      { heading: "Accuracy is also about honesty", paras: ["The most useful verifier is the one that tells you the truth about uncertainty — flagging catch-all and unknown clearly — rather than inflating a valid count to look better."] },
    ],
  },
  {
    slug: "avoid-spam-traps",
    title: "Spam traps: what they are and how to avoid them",
    description: "The addresses that exist only to catch careless senders — and the list practices that keep you clear of them.",
    date: "2026-02-12",
    readMins: 5,
    category: "Email verification",
    intro:
      "Spam traps are addresses designed to catch senders with poor list hygiene. Hit one and you can land on a blocklist fast. You can't see them — but you can avoid them.",
    sections: [
      { heading: "Two kinds of traps", paras: ["Pristine traps are addresses that never opted in to anything, used to catch senders who scrape or buy lists. Recycled traps are once-real addresses that were abandoned and repurposed — catching senders who never clean their lists."] },
      { heading: "Why they're so damaging", paras: ["Hitting traps tells mailbox providers and blocklist operators that you're mailing people who never engaged. The result can be an immediate reputation hit or a blocklist entry that filters all your mail."] },
      { heading: "How to stay clear", bullets: ["Never buy or scrape lists.", "Verify before every send to drop invalid and risky addresses.", "Remove contacts who haven't engaged in a long time.", "Use double opt-in so only real people get on the list."] },
      { heading: "Hygiene is the defense", paras: ["You can't detect traps directly, but consistent list hygiene — verify, prune, re-verify — keeps the odds of hitting one very low."] },
    ],
  },
  {
    slug: "reduce-fake-signups",
    title: "How to reduce fake signups on your forms",
    description: "Bots and throwaway addresses pollute your CRM at the form. Here's how to stop them before they become records.",
    date: "2026-02-05",
    readMins: 4,
    category: "Email verification",
    intro:
      "Every signup form attracts fakes — bots, typos and disposable addresses. Left unchecked they bloat your CRM and wreck your metrics. Here's how to keep them out.",
    sections: [
      { heading: "Where fake signups come from", bullets: ["Bots submitting forms automatically.", "People using disposable emails to grab a lead magnet.", "Typos that create dead addresses.", "Fake details entered to bypass a gate."] },
      { heading: "Verify at the point of capture", paras: ["The most effective fix is a form guard: verify the email (and phone) in real time as the form is submitted, and block or flag invalid, disposable and obviously fake entries before they ever become a record."] },
      { heading: "Layer your defenses", paras: ["Combine real-time verification with basic bot protection and, where appropriate, double opt-in. Verification handles the dead and disposable addresses; the others catch automated abuse."] },
      { heading: "Keep the CRM clean at the source", paras: ["Stopping bad data at the form is cheaper than cleaning it later and keeps every downstream metric — conversion, engagement, deliverability — honest."] },
    ],
  },
  {
    slug: "what-is-phone-validation",
    title: "What is phone number validation and why it matters",
    description: "How phone validation works, what it tells you, and why teams that call or text can't ignore it.",
    date: "2026-01-29",
    readMins: 9,
    category: "Phone validation",
    intro:
      "If your team calls or texts, unverified numbers cost you as much wasted time and budget as dead inboxes cost email senders. Phone validation is the phone-side equivalent of email verification — and it's the step most contact-data tools skip entirely. This guide explains how it works, what it tells you, and why it matters for any team that reaches people by phone.",
    sections: [
      { heading: "What phone validation is", paras: ["Phone validation confirms that a number is correctly formatted, reachable, and identifies what kind of line it is — mobile, landline or VoIP — along with its carrier and country. It's the phone-side counterpart to email verification: a way to check whether a number is worth contacting before you spend a rep's time or an SMS credit on it.", "For any team that calls or texts, it closes a gap that email verification alone leaves open. A contact record is only as useful as the worst channel on it, and an invalid phone number wastes effort just as surely as a dead email wastes a send."] },
      { heading: "What validation checks", bullets: ["Format — is the number valid in E.164 international format?", "Status — is it active and reachable, or disconnected?", "Line type — mobile, landline or VoIP?", "Carrier and country, normalised to a single canonical format."] },
      { heading: "How phone validation works", paras: ["Validation starts by normalising every number to E.164, the international standard format. A number entered with local quirks — spaces, dashes, a leading zero, a missing country code — is resolved to a single canonical form, which alone fixes the formatting errors that silently break dialers and SMS platforms.", "From there it identifies the number's country and carrier and determines its line type, then checks its status to flag numbers that look disconnected rather than live. The result is a number you can trust to dial or text, with the context to route it correctly across channels and countries."] },
      { heading: "Why line type matters", paras: ["Line type is the single most actionable thing phone validation tells you, because it changes how you should reach a contact. Mobile numbers can be called or texted; landlines can be called but never texted; VoIP numbers are internet-based and behave unpredictably — and are disproportionately used for throwaway signups and fraud.", "Knowing the line type lets you route outreach correctly and avoid obvious waste: don't text a landline, don't burn rep time on a disconnected number, and treat a VoIP number on a signup form as a fraud signal worth a second look. Getting this right turns a flat list of numbers into a properly segmented, channel-aware one."] },
      { heading: "Phone validation for SMS marketing", paras: ["SMS is unforgiving of a dirty list in a way email isn't. Every message costs money whether or not it lands, so texting a landline or a disconnected number is pure waste — and unlike a soft email bounce, there's no quiet retry that eventually succeeds. Validating before a send means you only pay to reach numbers that can actually receive a text.", "Line type is the decisive filter here, since only mobiles can receive SMS. Stripping out landlines and flagging unpredictable VoIP numbers before a campaign protects both your budget and your delivery metrics — and helps you stay on the right side of carrier expectations, since repeatedly texting invalid numbers is exactly the pattern that gets a sender flagged."] },
      { heading: "Phone validation for sales and dialers", paras: ["For a sales team, a rep's time is the scarcest resource, and nothing wastes it faster than a list full of dead numbers. Validating a dialer list before reps start calling means the hours go into conversations, not disconnected tones and wrong numbers — connect rates rise simply because the list stops being polluted with numbers that were never going to answer.", "Carrier and line-type data help reps work smarter too, and normalising everything to E.164 means your dialer and CRM agree on what each number even is. Small frictions like mis-formatted numbers that fail to dial add up across a team, and validation removes them at the source."] },
      { heading: "How phone numbers decay", paras: ["Phone numbers go stale for reasons that have nothing to do with how carefully you collected them. People change carriers and port their numbers, numbers get reassigned to new owners after a period of disuse, and contacts simply abandon a line. A number that was perfectly valid when it entered your CRM can be disconnected or belong to someone else a year later.", "That ongoing decay is why phone validation, like email verification, is a recurring habit rather than a one-time task. Re-validating before a major calling or texting campaign catches the numbers that have gone bad since you last checked, so you're working from current reality rather than a snapshot that's quietly aged."] },
      { heading: "Validating international numbers", paras: ["International numbers are where naive validation falls apart, because every country has its own numbering rules, trunk prefixes and length conventions. A pattern that correctly accepts a US number will wrongly reject a valid German or Indian one, so a mixed-country list judged against a single rule becomes a mess of false positives and false negatives.", "Proper validation checks each number against the conventions of its own country and normalises everything to E.164, so a single upload can validate a mixed, multi-country list correctly. For teams running global outreach, that removes a whole category of formatting headaches and wasted sends."] },
      { heading: "The blind spot in most tools", paras: ["Nearly every email verifier ignores phone numbers entirely, which leaves a real gap for any team that does more than email. The usual workaround is to run a separate phone-validation tool alongside the email verifier — two subscriptions, two uploads, two sets of results to reconcile into one record.", "BounceBlock closes the gap by validating phones alongside email and company data in the same upload, across 30+ countries, at one flat price. One clean file then covers email, calls and SMS, with the same contact verified across every channel in a single pass."] },
      { heading: "Phone validation vs HLR lookup", paras: ["You'll sometimes see 'HLR lookup' mentioned alongside phone validation, and it's worth understanding how they relate. An HLR (Home Location Register) lookup queries the database mobile carriers use to track their subscribers, and it can reveal whether a mobile number is currently active, which network it's on, and whether it's been ported — all without placing a call or sending a text.", "Phone validation is the broader concept; HLR data is one of the signals that makes validation more accurate for mobile numbers in particular. Format checking confirms a number is well-formed; line-type detection tells you whether it's a mobile, landline or VoIP; and HLR-style status checking confirms whether a mobile is genuinely live right now. Together they give you a reliable read on whether a number is worth contacting."] },
      { heading: "Phone validation for fraud prevention", paras: ["Phone numbers aren't only a deliverability signal; they're a fraud signal too. VoIP numbers in particular are cheap and easy to spin up, which makes them a favourite for fake signups, trial abuse and bot registrations. Flagging them at the point of capture — or in a bulk clean of inbound leads — gives you an early warning that a contact may not be a genuine prospect.", "Combined with email checks, phone validation makes a signup much harder to fake convincingly. A registration that pairs a disposable email with a VoIP number is a very different prospect from one with a real business email and a genuine mobile, and seeing both signals together lets you score and route accordingly. For products with a free tier or a referral incentive, that extra layer protects the unit economics that fakes would otherwise erode."] },
      { heading: "How it fits with email verification", paras: ["The strongest contact-hygiene setup treats email and phone as two halves of the same record rather than two separate jobs. A contact is only as useful as the worst channel on it: a valid email paired with a dead phone number still wastes a rep's call, and a great phone number attached to a bouncing email still loses you the send.", "Validating both in one pass keeps the whole record trustworthy and consistent. Rather than running an email verifier and a separate phone tool — two subscriptions, two exports, two sets of results to reconcile — a single upload that checks email, phone and company gives you one clean record you can trust across every channel you use to reach people."] },
      { heading: "Common phone-data mistakes", paras: ["The most common mistake is simply not validating phone numbers at all — treating email hygiene as the whole job while a list of dead and wrong-type numbers quietly wastes rep time and SMS spend. The second is validating once and never again, when numbers are reassigned and ported continuously, so a list goes stale just like an email list does.", "Other frequent errors include texting without checking line type (and so paying to message landlines), ignoring VoIP numbers that signal fraud, and storing numbers in inconsistent formats that break dialers and SMS tools. Normalising to E.164, checking line type and status, and re-validating before major campaigns avoids all of them."] },
      { heading: "Validating numbers at the point of capture", paras: ["Just as with email, the cleanest phone data is data you check before it ever enters your system. Validating a number the moment it's submitted on a form — via a real-time API — lets you catch malformed numbers, flag VoIP submissions where you expect a mobile, and normalise the format before the record is created, so your CRM stays clean at the source.", "Front-door validation pairs naturally with periodic bulk cleaning: real-time checks keep new numbers clean as they enter, and bulk validation removes the decay that accumulates as existing numbers get ported, reassigned or disconnected. Together they keep your dialer and SMS lists trustworthy without a big one-off cleanup project — the same two-part strategy that works for email, applied to the phone half of every record."] },
      { heading: "When to validate", paras: ["Validate before any calling or SMS campaign, validate new numbers at the point of capture so bad ones never enter your CRM, and re-check periodically — because numbers get reassigned and ported over time, a list that was clean last quarter quietly goes stale. Treating phone hygiene as a recurring habit keeps your dialer and SMS lists working from current reality.", "Because BounceBlock validates phone in the same pass as email, keeping both halves of a contact record current is a single step rather than two separate chores. Preview your first 100 contacts free to see how many of your numbers are actually reachable before your next campaign."] },
    ],
  },
  {
    slug: "hlr-lookup-explained",
    title: "HLR lookup explained: check any number's status",
    description: "What an HLR lookup is, what it reveals about a mobile number, and why it makes phone validation more accurate.",
    date: "2026-01-22",
    readMins: 4,
    category: "Phone validation",
    intro:
      "An HLR lookup checks a mobile number against the carrier's own database to see whether it's live — without calling or texting it. Here's what it is and why it matters.",
    sections: [
      { heading: "What HLR means", paras: ["The Home Location Register is the database mobile carriers use to track their subscribers. An HLR lookup queries it to learn whether a number is currently active, which network it's on, and whether it's been ported to another carrier."] },
      { heading: "What it tells you", bullets: ["Whether a mobile number is active or disconnected.", "The current carrier, even after porting.", "The country and network.", "All without placing a call or sending an SMS."] },
      { heading: "Why it improves accuracy", paras: ["For mobile numbers, HLR data is more reliable than format checks alone — it reflects the number's real status at the carrier, so you avoid dialing or texting numbers that look valid but are actually dead."] },
      { heading: "Where it fits", paras: ["HLR lookups make mobile validation sharper. Combined with line-type detection and formatting checks, they give you a complete picture of a phone list before you call or text."] },
    ],
  },
  {
    slug: "detect-phone-line-type",
    title: "Mobile vs landline vs VoIP: how to detect line type",
    description: "Why line type changes your outreach strategy and how to detect it before you call or text.",
    date: "2026-01-15",
    readMins: 4,
    category: "Phone validation",
    intro:
      "Not all phone numbers are equal. A mobile, a landline and a VoIP number each demand a different approach — and texting the wrong type wastes money. Here's how line type works.",
    sections: [
      { heading: "The three line types", bullets: ["Mobile — can be called and texted; ideal for SMS.", "Landline — can be called, not texted.", "VoIP — internet-based; often used for fraud or throwaway signups."] },
      { heading: "Why it changes your strategy", paras: ["Routing matters: send SMS only to mobiles, route landlines to your dialer, and flag VoIP numbers for extra scrutiny. Getting this right cuts failed texts and wasted dials."] },
      { heading: "VoIP as a risk signal", paras: ["A surprising share of fraudulent or throwaway signups use VoIP numbers. Detecting them lets you add friction or verification before they reach a campaign — much like flagging disposable emails."] },
      { heading: "Detecting it at scale", paras: ["BounceBlock returns line type for every number in your upload, so you can segment by type and reach each contact the right way."] },
    ],
  },
  {
    slug: "clean-phone-list-before-sms",
    title: "How to clean a phone list before an SMS campaign",
    description: "A pre-send checklist for phone lists so your SMS campaign reaches real mobiles and doesn't waste spend.",
    date: "2026-01-08",
    readMins: 4,
    category: "Phone validation",
    intro:
      "SMS is expensive per message and unforgiving of bad data. Cleaning your phone list before a campaign means every text has a chance to land. Here's the checklist.",
    sections: [
      { heading: "Validate format and status", paras: ["Normalise numbers to E.164 international format and drop the ones that are malformed or disconnected. A wrongly formatted number simply fails to send."] },
      { heading: "Filter by line type", paras: ["SMS only works on mobile numbers. Filter out landlines (which can't receive texts) and scrutinise VoIP numbers, which are more likely to be fake or throwaway."] },
      { heading: "Dedupe", paras: ["Remove duplicate numbers so you don't text the same person twice — annoying for them and wasteful for you."] },
      { heading: "Do it in one pass", paras: ["BounceBlock validates phone numbers, returns line type and carrier, and dedupes — alongside email and company checks — in a single upload, so your whole list is campaign-ready in minutes."] },
    ],
  },
  {
    slug: "what-is-data-enrichment",
    title: "What is data enrichment and how to use it",
    description: "How enrichment adds company, industry and location context to your contacts — and why to verify before you enrich.",
    date: "2026-02-23",
    readMins: 5,
    category: "Company & data",
    intro:
      "Data enrichment turns a bare email or phone number into a record you can segment, score and personalise around. Used well — after verification — it sharpens every downstream play. Here's how.",
    sections: [
      { heading: "What enrichment adds", paras: ["Enrichment fills in the context around a contact: the company they work for, its industry and size, location, and other firmographic detail. That's what lets you group, route and personalise instead of treating every lead the same."] },
      { heading: "Verify first, enrich second", paras: ["There's no point enriching a record that's invalid — you'd be paying to decorate data that will never convert. Verify emails and phones first, then enrich only the contacts that are real."] },
      { heading: "What good enrichment powers", bullets: ["Lead scoring based on fit.", "Territory and owner routing.", "Personalised outreach by industry or size.", "Cleaner segmentation and reporting."] },
      { heading: "Keep it accurate", paras: ["Enriched data is only useful if it's right, which is why enrichment pairs naturally with verification and name-to-domain matching — so the company you attach is actually the company behind the contact."] },
    ],
  },
  {
    slug: "company-name-to-domain-matching",
    title: "Company name-to-domain matching: a practical guide",
    description: "Why the domain is the best key for a B2B record, and how name-to-domain matching resolves messy form input.",
    date: "2026-02-16",
    readMins: 4,
    category: "Company & data",
    intro:
      "In B2B, the company domain is the most reliable key for a record — but forms capture company names, not domains. Name-to-domain matching bridges the gap. Here's how it works and why it matters.",
    sections: [
      { heading: "Why the domain is the key", paras: ["Company names are entered inconsistently — abbreviations, legal suffixes, typos, subsidiaries. The domain is stable and unique, which makes it the best key for deduplication, enrichment and routing."] },
      { heading: "What matching has to handle", bullets: ["Abbreviations and nicknames (IBM vs International Business Machines).", "Legal suffixes (Inc., Ltd., GmbH).", "Subsidiaries and parent companies.", "Look-alike names across different companies."] },
      { heading: "Verification keeps it honest", paras: ["Matching combines fuzzy logic with verification so you don't attach data to the wrong company. Getting the domain right is what makes the enrichment that follows trustworthy."] },
      { heading: "Where it fits", paras: ["Name-to-domain matching is a foundational step in BounceBlock's company verification — resolving the business behind each contact before adding firmographic context."] },
    ],
  },
  {
    slug: "stop-fake-b2b-signups",
    title: "How to stop fake B2B signups at the form",
    description: "Free-email and fake-company signups dilute your B2B funnel. Here's how to verify and qualify at the form.",
    date: "2026-02-09",
    readMins: 4,
    category: "Company & data",
    intro:
      "B2B funnels get polluted by personal-email signups, fake company names and bots. Verifying and qualifying at the form keeps your pipeline real. Here's how.",
    sections: [
      { heading: "The B2B signup problem", paras: ["Free-email signups (gmail, outlook) and fake or mistyped company names slip into your funnel, inflating lead counts and wasting sales time on contacts that aren't real businesses."] },
      { heading: "Verify the email and the company", bullets: ["Verify the email is valid and not disposable.", "Resolve the company name to a real domain.", "Flag free-email signups for routing or extra qualification.", "Block obvious bot and fake-detail patterns."] },
      { heading: "Real-time at the form", paras: ["A form guard does this the instant someone submits — so bad B2B leads never reach your CRM and your sales team only follows up on real companies."] },
      { heading: "Cleaner pipeline, honest metrics", paras: ["Qualifying at the form means your lead counts, conversion rates and pipeline reflect real businesses, not noise."] },
    ],
  },
  {
    slug: "cost-of-dirty-email-list",
    title: "The real cost of a dirty email list",
    description: "Dirty lists cost far more than wasted sends — in deliverability, reputation, team time and decisions made on bad data.",
    date: "2026-02-02",
    readMins: 5,
    category: "Lead gen",
    intro:
      "A dirty list looks free to keep using — until you add up what it actually costs. The bill shows up in deliverability, reputation, wasted effort and bad decisions. Here's the real total.",
    sections: [
      { heading: "Deliverability and reputation", paras: ["Bounces and spam-trap hits from unverified addresses damage your sender reputation, which means even your good mail starts landing in spam. That cost compounds across every future campaign, not just the one with the bad data."] },
      { heading: "Wasted team time and spend", bullets: ["Reps dialing disconnected numbers.", "SMS spend on dead or wrong-type phones.", "Marketers chasing contacts that don't exist.", "Enrichment budget spent on invalid records."] },
      { heading: "Decisions on bad data", paras: ["Inflated list sizes and skewed engagement rates lead to wrong conclusions — about which campaigns work, which segments convert, and where to invest. Clean data is the basis for honest analytics."] },
      { heading: "The cheap fix", paras: ["Verifying before every send is a fraction of these costs. BounceBlock cleans email and phone in one upload at a flat price, so regular hygiene is affordable instead of something you avoid — preview your first 100 contacts free."] },
    ],
  },
];
