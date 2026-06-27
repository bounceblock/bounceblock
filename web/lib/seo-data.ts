/**
 * Programmatic SEO data (Phase 4): industries + use cases.
 * Each entry carries a tailored pain + benefit hook; the content engine
 * (lib/seo-content.ts) weaves these into a full, non-thin landing page.
 */

export interface SeoEntry {
  slug: string;
  label: string;
  pain: string;
  benefit: string;
}

export const INDUSTRIES: SeoEntry[] = [
  { slug: "real-estate", label: "Real Estate", pain: "Stale buyer and seller leads bounce after months in the CRM.", benefit: "Reconnect with active buyers, not disconnected numbers." },
  { slug: "insurance", label: "Insurance", pain: "Purchased policyholder lists are full of dead emails and wrong numbers.", benefit: "Reach real prospects and protect your quoting team's time." },
  { slug: "recruiting", label: "Recruiting", pain: "Candidate phone numbers go stale fast, wasting recruiter dials.", benefit: "Validate every candidate contact before you reach out." },
  { slug: "mortgage", label: "Mortgage", pain: "Rate-shopper leads decay quickly and bounce at send time.", benefit: "Hit inboxes that are live when rates move." },
  { slug: "solar", label: "Solar", pain: "Aggregated solar leads are riddled with fake and duplicate contacts.", benefit: "Pay your closers to call real homeowners." },
  { slug: "automotive", label: "Automotive", pain: "Service and sales lists collect bad emails over years of use.", benefit: "Win back customers with deliverable outreach." },
  { slug: "healthcare", label: "Healthcare", pain: "Patient contact data decays and risks compliance headaches.", benefit: "Keep outreach clean, current and deliverable." },
  { slug: "dental", label: "Dental Practices", pain: "Recall and reactivation emails bounce off old patient lists.", benefit: "Fill the schedule by reaching patients who still exist." },
  { slug: "legal-services", label: "Legal Services", pain: "Intake lists carry typo'd emails and disconnected numbers.", benefit: "Follow up on real matters, not dead contacts." },
  { slug: "financial-advisors", label: "Financial Advisors", pain: "Prospect lists age out between market cycles.", benefit: "Stay deliverable when clients are ready to talk." },
  { slug: "accounting", label: "Accounting Firms", pain: "Seasonal client lists are full of stale contact info.", benefit: "Reach clients before tax season, every season." },
  { slug: "saas", label: "SaaS", pain: "Trial and signup lists fill with disposable and role addresses.", benefit: "Protect deliverability and focus on real users." },
  { slug: "ecommerce", label: "E-commerce", pain: "Newsletter lists rot and quietly hurt sender reputation.", benefit: "Keep promo emails landing in the inbox." },
  { slug: "marketing-agencies", label: "Marketing Agencies", pain: "Every client list arrives messy and credit-metered tools get pricey.", benefit: "Clean any client list, flat-priced, in minutes." },
  { slug: "staffing", label: "Staffing", pain: "High-volume candidate data goes bad faster than you can use it.", benefit: "Dial connected numbers, place faster." },
  { slug: "property-management", label: "Property Management", pain: "Tenant and owner contacts drift out of date constantly.", benefit: "Reach owners and tenants on the first try." },
  { slug: "home-services", label: "Home Services", pain: "Lead-gen lists mix real homeowners with junk entries.", benefit: "Book jobs by calling valid contacts only." },
  { slug: "hvac", label: "HVAC", pain: "Maintenance lists accumulate dead emails season over season.", benefit: "Fill the calendar with deliverable reminders." },
  { slug: "roofing", label: "Roofing", pain: "Storm-chase leads are duplicated across sources.", benefit: "Stop calling the same bad number twice." },
  { slug: "construction", label: "Construction", pain: "Bid and vendor lists are full of outdated contacts.", benefit: "Reach decision-makers, not bounced inboxes." },
  { slug: "education", label: "Education", pain: "Student and alumni lists decay between terms.", benefit: "Keep enrollment and alumni outreach deliverable." },
  { slug: "nonprofits", label: "Nonprofits", pain: "Donor lists silently degrade and waste appeal sends.", benefit: "Protect deliverability so appeals get seen." },
  { slug: "fitness", label: "Fitness & Gyms", pain: "Member and lead lists fill with old, bounced emails.", benefit: "Win back members with outreach that lands." },
  { slug: "hospitality", label: "Hospitality", pain: "Guest lists age out between visits.", benefit: "Bring guests back with deliverable offers." },
  { slug: "logistics", label: "Logistics", pain: "Shipper and carrier contacts churn constantly.", benefit: "Keep your book of business reachable." },
  { slug: "manufacturing", label: "Manufacturing", pain: "Distributor lists hold years of stale contact data.", benefit: "Reach buyers without burning sender reputation." },
  { slug: "wholesale", label: "Wholesale & Distribution", pain: "Reseller lists carry duplicates and dead emails.", benefit: "Clean the book before every campaign." },
  { slug: "consulting", label: "Consulting", pain: "Networking lists go cold and bounce on outreach.", benefit: "Re-engage contacts that still exist." },
  { slug: "coaching", label: "Coaching", pain: "Lead-magnet lists fill with fake and disposable emails.", benefit: "Nurture real leads, protect your domain." },
  { slug: "event-planning", label: "Event Planning", pain: "Attendee and vendor lists decay between events.", benefit: "Fill events with outreach that gets delivered." },
  { slug: "real-estate-investors", label: "Real Estate Investors", pain: "Skip-traced seller data is full of wrong numbers.", benefit: "Dial connected sellers, close more deals." },
  { slug: "telecom", label: "Telecom", pain: "Subscriber win-back lists rot quickly.", benefit: "Reach churned customers who are still reachable." },
  { slug: "fintech", label: "Fintech", pain: "Waitlist and signup data attracts disposable emails.", benefit: "Onboard real users and stay deliverable." },
  { slug: "automotive-dealers", label: "Auto Dealers", pain: "DMS lists hold years of dead customer contacts.", benefit: "Reactivate buyers with deliverable outreach." },
  { slug: "medical-devices", label: "Medical Devices", pain: "Provider lists carry outdated practice contacts.", benefit: "Reach clinicians without bouncing." },
  { slug: "pest-control", label: "Pest Control", pain: "Recurring-service lists collect stale contact info.", benefit: "Keep renewals on track with clean lists." },
  { slug: "cleaning-services", label: "Cleaning Services", pain: "Lead lists mix real homes with bad entries.", benefit: "Book recurring clients you can actually reach." },
  { slug: "moving-companies", label: "Moving Companies", pain: "Quote leads are duplicated across lead vendors.", benefit: "Stop paying to call the same bad lead twice." },
  { slug: "photography", label: "Photography", pain: "Booking inquiry lists go cold and bounce.", benefit: "Re-book past clients with deliverable emails." },
  { slug: "landscaping", label: "Landscaping", pain: "Seasonal client lists drift out of date.", benefit: "Reach customers before every season." },
];

export const USE_CASES: SeoEntry[] = [
  { slug: "clean-email-list", label: "Clean an Email List", pain: "Old lists carry invalid addresses that hard-bounce.", benefit: "Hand back a verified, ready-to-send list." },
  { slug: "verify-phone-numbers", label: "Verify Phone Numbers", pain: "Disconnected numbers waste hours of dialing.", benefit: "Validate line type and active status before you call." },
  { slug: "reduce-bounce-rate", label: "Reduce Bounce Rate", pain: "High bounce rates wreck deliverability fast.", benefit: "Drop bounces below 2% before you hit send." },
  { slug: "improve-email-deliverability", label: "Improve Email Deliverability", pain: "Bad addresses tank inbox placement.", benefit: "Protect your sender reputation at the source." },
  { slug: "crm-cleanup", label: "Clean Up Your CRM", pain: "Duplicate and dead records bloat the CRM.", benefit: "Dedupe and verify in one upload." },
  { slug: "cold-email-verification", label: "Verify a Cold Email List", pain: "Cold lists bounce far above the safe threshold.", benefit: "Warm up safely with a verified list." },
  { slug: "remove-duplicate-contacts", label: "Remove Duplicate Contacts", pain: "Duplicates skew reporting and waste outreach.", benefit: "Catch dupes even when formatting differs." },
  { slug: "protect-sender-reputation", label: "Protect Your Sender Reputation", pain: "One bad send can get your domain flagged.", benefit: "Verify before every campaign to stay trusted." },
  { slug: "email-list-hygiene", label: "Email List Hygiene", pain: "Lists silently degrade ~2% a month.", benefit: "Keep every list clean on a schedule." },
  { slug: "validate-form-signups", label: "Validate Form Signups", pain: "Signup forms attract typo'd and fake emails.", benefit: "Catch bad addresses before they enter your CRM." },
  { slug: "bulk-list-cleaning", label: "Bulk List Cleaning", pain: "Large lists are slow and costly to verify.", benefit: "Clean thousands of contacts in minutes, flat-priced." },
  { slug: "catch-all-detection", label: "Detect Catch-all Domains", pain: "Catch-all domains accept everything and hide risk.", benefit: "Flag risky catch-alls before you send." },
  { slug: "spam-trap-removal", label: "Remove Spam Traps", pain: "Spam traps quietly destroy deliverability.", benefit: "Identify and drop risky addresses." },
  { slug: "disposable-email-detection", label: "Detect Disposable Emails", pain: "Throwaway addresses never convert.", benefit: "Filter disposables out of every list." },
  { slug: "role-account-filtering", label: "Filter Role Accounts", pain: "info@ and sales@ inflate lists and lower engagement.", benefit: "Flag role accounts so you can decide." },
  { slug: "purchased-list-cleaning", label: "Clean a Purchased List", pain: "Bought lists are notoriously full of bad data.", benefit: "Verify before you risk your domain on them." },
  { slug: "mailing-list-cleanup", label: "Clean a Mailing List", pain: "Newsletter lists rot and hurt open rates.", benefit: "Trim the dead weight and lift engagement." },
  { slug: "sales-list-verification", label: "Verify a Sales List", pain: "Reps waste time on contacts that don't exist.", benefit: "Hand sales a list of real, reachable people." },
  { slug: "abandoned-lead-revival", label: "Revive Abandoned Leads", pain: "Old leads are written off as unreachable.", benefit: "Find which old leads are still valid and worth a call." },
  { slug: "pre-campaign-verification", label: "Pre-campaign Verification", pain: "Sending to an unverified list risks the whole campaign.", benefit: "Verify the list right before you launch." },
  { slug: "data-enrichment-prep", label: "Prep Data for Enrichment", pain: "Enriching bad records wastes enrichment credits.", benefit: "Verify first, enrich only what's real." },
  { slug: "webinar-list-cleanup", label: "Clean a Webinar List", pain: "Registration lists fill with fake emails.", benefit: "Reach registrants who'll actually show." },
  { slug: "newsletter-list-cleaning", label: "Clean a Newsletter List", pain: "Inactive and dead subscribers drag down metrics.", benefit: "Keep your sends landing and your stats honest." },
  { slug: "event-lead-cleanup", label: "Clean Event Leads", pain: "Badge-scanned leads are full of typos.", benefit: "Turn scanned badges into reachable contacts." },
  { slug: "dialer-list-validation", label: "Validate a Dialer List", pain: "Dialers burn time on disconnected numbers.", benefit: "Feed your dialer only live, valid numbers." },
  { slug: "reactivation-campaigns", label: "Clean Lists for Reactivation", pain: "Win-back sends bounce off long-dormant contacts.", benefit: "Re-engage only contacts that still exist." },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((e) => e.slug === slug);
}
export function getUseCase(slug: string) {
  return USE_CASES.find((e) => e.slug === slug);
}

/* ───────────────────────── Phase 5: alternatives ─────────────────────────
 * Honest comparisons. The defensible, research-backed differences are
 * structural: the category is credit-metered and email-only, while
 * BounceBlock is flat-priced and bundles phone validation. We assert those —
 * not specific competitor prices that may change. */
export interface AltEntry {
  slug: string;
  label: string;
  model: string; // their pricing model
  freeTier: string;
  phone: boolean; // do they bundle phone validation
  why: string; // tailored, honest reason teams consider switching
}

export const ALTERNATIVES: AltEntry[] = [
  { slug: "zerobounce", label: "ZeroBounce", model: "Credit-based", freeTier: "100 free /mo", phone: false, why: "If you want phone validation and a flat price instead of buying credits, BounceBlock bundles both." },
  { slug: "neverbounce", label: "NeverBounce", model: "Credit-based / PAYG", freeTier: "Limited free", phone: false, why: "BounceBlock adds phone validation in the same upload and prices it flat — no per-verification math." },
  { slug: "hunter-io", label: "Hunter.io", model: "Monthly credit tiers", freeTier: "Free tier", phone: false, why: "Hunter is an outreach suite; if you mainly need to clean lists and validate phones, BounceBlock is simpler and cheaper." },
  { slug: "kickbox", label: "Kickbox", model: "Credit-based", freeTier: "100 free", phone: false, why: "BounceBlock bundles phone validation and flat pricing rather than pay-as-you-go credits." },
  { slug: "bouncer", label: "Bouncer", model: "Credit-based", freeTier: "Free trial", phone: false, why: "Bouncer is email-only; BounceBlock verifies email and phone together at one flat price." },
  { slug: "millionverifier", label: "MillionVerifier", model: "Credit-based", freeTier: "Free credits", phone: false, why: "If you'd rather not track credits and want phones validated too, BounceBlock's flat plan fits better." },
  { slug: "emailable", label: "Emailable", model: "Credit-based", freeTier: "250 free", phone: false, why: "BounceBlock adds phone validation and a flat monthly price instead of credit packs." },
  { slug: "clearout", label: "Clearout", model: "Credit-based", freeTier: "Free credits", phone: false, why: "BounceBlock keeps it simple: email + phone, flat-priced, no credit balance to manage." },
  { slug: "debounce", label: "DeBounce", model: "Credit-based", freeTier: "Free credits", phone: false, why: "BounceBlock bundles phone validation and predictable flat pricing." },
  { slug: "verifalia", label: "Verifalia", model: "Credit / subscription", freeTier: "Free daily", phone: false, why: "BounceBlock is built for non-technical teams and adds phone validation in one pass." },
  { slug: "briteverify", label: "BriteVerify", model: "Pay-per-verification", freeTier: "Limited", phone: false, why: "BriteVerify charges per verification; BounceBlock is flat-priced and includes phone validation." },
  { slug: "snov-io", label: "Snov.io", model: "Credit-based", freeTier: "Free trial", phone: false, why: "If you just need clean lists with phones validated, BounceBlock is more focused and flat-priced." },
  { slug: "mailfloss", label: "Mailfloss", model: "Subscription by list size", freeTier: "Free trial", phone: false, why: "BounceBlock validates phones too and prices on a simple flat plan." },
  { slug: "captainverify", label: "CaptainVerify", model: "Credit-based", freeTier: "Free credits", phone: false, why: "BounceBlock bundles email + phone and avoids per-credit pricing." },
  { slug: "emaillistverify", label: "EmailListVerify", model: "Credit-based", freeTier: "Free credits", phone: false, why: "BounceBlock adds phone validation and a predictable flat price." },
  { slug: "mailercheck", label: "MailerCheck", model: "Credit-based", freeTier: "Free trial", phone: false, why: "BounceBlock verifies phones in the same upload, flat-priced." },
  { slug: "quickemailverification", label: "QuickEmailVerification", model: "Credit-based", freeTier: "100 free", phone: false, why: "BounceBlock bundles phone validation and flat pricing." },
  { slug: "xverify", label: "XVerify", model: "Credit-based", freeTier: "Free trial", phone: false, why: "BounceBlock is simpler for small teams and includes phone validation." },
  { slug: "neverbounce-alternative", label: "Generic credit tools", model: "Credit-based", freeTier: "Varies", phone: false, why: "Most verifiers are email-only and credit-metered; BounceBlock is flat and bundles phones." },
  { slug: "zerobounce-alternative", label: "Enterprise verifiers", model: "Annual contracts", freeTier: "Varies", phone: false, why: "Enterprise tools are overkill for small teams; BounceBlock is self-serve, flat, and phone-inclusive." },
  { slug: "mailgun-validate", label: "Mailgun Validation", model: "Pay-per-check", freeTier: "Limited", phone: false, why: "Mailgun's validation is developer-focused; BounceBlock is a simple app that also validates phones." },
  { slug: "zoho-zeptomail", label: "Generic ESP tools", model: "Bundled with sending", freeTier: "Varies", phone: false, why: "ESP-bundled checks are basic; BounceBlock does deep email + phone verification flat-priced." },
  { slug: "manual-spreadsheets", label: "Spreadsheets", model: "Manual", freeTier: "Free but slow", phone: false, why: "Manual cleanup misses duplicates and can't verify deliverability; BounceBlock does it in minutes." },
  { slug: "truelist", label: "Truelist", model: "Subscription", freeTier: "Free trial", phone: false, why: "BounceBlock matches the flat-pricing idea and adds phone validation in the same pass." },
];

export function getAlternative(slug: string) {
  return ALTERNATIVES.find((e) => e.slug === slug);
}

/* ───────────────────────── Phase 5: local SEO ───────────────────────── */
export const CITIES = [
  { slug: "new-york", label: "New York" },
  { slug: "los-angeles", label: "Los Angeles" },
  { slug: "chicago", label: "Chicago" },
  { slug: "houston", label: "Houston" },
  { slug: "phoenix", label: "Phoenix" },
  { slug: "dallas", label: "Dallas" },
  { slug: "san-diego", label: "San Diego" },
  { slug: "austin", label: "Austin" },
  { slug: "miami", label: "Miami" },
  { slug: "atlanta", label: "Atlanta" },
  { slug: "denver", label: "Denver" },
  { slug: "seattle", label: "Seattle" },
  { slug: "boston", label: "Boston" },
  { slug: "philadelphia", label: "Philadelphia" },
];

export const LOCAL_INDUSTRIES = [
  { slug: "real-estate", label: "Real Estate" },
  { slug: "insurance", label: "Insurance" },
  { slug: "recruiting", label: "Recruiting" },
  { slug: "mortgage", label: "Mortgage" },
  { slug: "solar", label: "Solar" },
];

export interface LocalEntry {
  slug: string;
  label: string;
  cityLabel: string;
  citySlug: string;
  industryLabel: string;
  industrySlug: string;
}

export const LOCAL: LocalEntry[] = CITIES.flatMap((c) =>
  LOCAL_INDUSTRIES.map((ind) => ({
    slug: `${c.slug}-${ind.slug}`,
    label: `${ind.label} in ${c.label}`,
    cityLabel: c.label,
    citySlug: c.slug,
    industryLabel: ind.label,
    industrySlug: ind.slug,
  }))
);

export function getLocal(slug: string) {
  return LOCAL.find((e) => e.slug === slug);
}
