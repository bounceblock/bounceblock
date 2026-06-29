/**
 * Resources / lead magnets: `/resources/[slug]`.
 * Linkable, capture-friendly checklists, templates and playbooks the SEO plan
 * flags as missing. We render the full content on-page (ungated = better for
 * SEO and links) with an email-capture CTA for the downloadable version.
 */

export interface ResourceGroup {
  heading: string;
  items: string[];
}

export interface Resource {
  slug: string;
  type: "Checklist" | "Template" | "Playbook" | "Cheat sheet";
  title: string;
  description: string;
  /** Who it's for / when to use it. */
  intro: string;
  groups: ResourceGroup[];
  /** Related blog/tool/use-case links for internal linking. */
  related: { label: string; href: string }[];
}

export const RESOURCES: Resource[] = [
  {
    slug: "email-list-cleaning-checklist",
    type: "Checklist",
    title: "The Email List Cleaning Checklist",
    description: "Every step to take a messy contact list to a verified, send-ready file — in order.",
    intro: "Run through this before you import a new list or send to one you haven't touched in 90 days. It takes the list from raw to safe-to-send.",
    groups: [
      { heading: "Before you start", items: ["Export the full list to CSV with a clear email column.", "Note where the list came from (signup, purchased, event, CRM export) — it predicts how dirty it is.", "Back up the original file before making changes."] },
      { heading: "Verify & filter", items: ["Check syntax and fix obvious typos (gmial.com → gmail.com).", "Verify the domain and MX records exist.", "Run an SMTP/mailbox check to confirm each address can receive mail.", "Flag catch-all (accept-all) domains and segment them separately.", "Remove disposable/throwaway domains.", "Decide whether to keep role accounts (info@, sales@).", "De-duplicate — including near-duplicates with different formatting."] },
      { heading: "Before you send", items: ["Suppress anyone who previously bounced or unsubscribed.", "Confirm SPF, DKIM and DMARC are set up for your sending domain.", "Send to your most engaged segment first to warm the list.", "Keep the bounce rate under 2% — pause and re-verify if it climbs."] },
    ],
    related: [
      { label: "How to clean an email list", href: "/blog/how-to-clean-an-email-list" },
      { label: "Free email verifier tool", href: "/tools/email-verifier" },
      { label: "Use case: clean an email list", href: "/use-case/clean-email-list" },
    ],
  },
  {
    slug: "cold-email-deliverability-checklist",
    type: "Checklist",
    title: "Cold Email Deliverability Checklist",
    description: "Land in the inbox on cold outreach without torching your domain.",
    intro: "Cold lists are the riskiest thing you can send to. Work this checklist before your first campaign to protect your sending reputation.",
    groups: [
      { heading: "Domain & infrastructure", items: ["Send cold outreach from a separate domain, not your primary.", "Set up SPF, DKIM and DMARC on the cold domain.", "Warm up the domain gradually over 2–4 weeks.", "Keep daily volume low and ramp slowly."] },
      { heading: "List quality", items: ["Verify every address before the first send.", "Remove catch-all and disposable addresses from cold blasts.", "Strip role accounts and obvious non-prospects.", "Keep the bounce rate under 2% — cold lists often start at 7–10%."] },
      { heading: "Sending behaviour", items: ["Personalize beyond {{first_name}} to avoid spam filters.", "Avoid spam-trigger subject lines and heavy HTML/images.", "Include a real unsubscribe and physical address.", "Monitor replies and complaints, not just opens."] },
    ],
    related: [
      { label: "Verify a cold email list", href: "/use-case/cold-email-verification" },
      { label: "Why emails land in spam", href: "/blog/why-emails-land-in-spam" },
      { label: "Domain warm-up plan", href: "/blog/domain-warmup-plan" },
    ],
  },
  {
    slug: "pre-send-campaign-checklist",
    type: "Checklist",
    title: "Pre-Send Campaign Checklist",
    description: "The final pass before you hit send on any email campaign.",
    intro: "Print this and run it before every send. Most deliverability disasters are caught here.",
    groups: [
      { heading: "List", items: ["List verified within the last 90 days.", "Bounced and unsubscribed contacts suppressed.", "Catch-all addresses segmented out of high-volume sends.", "Duplicates removed."] },
      { heading: "Authentication & setup", items: ["SPF, DKIM and DMARC passing for the sending domain.", "From-name and reply-to address correct and monitored.", "Links and tracking domain working and not blacklisted."] },
      { heading: "Content & compliance", items: ["Subject line tested and not spammy.", "Plain-text version included.", "Unsubscribe link and physical address present.", "Send-time and timezone confirmed."] },
    ],
    related: [
      { label: "Pre-campaign verification", href: "/use-case/pre-campaign-verification" },
      { label: "Spam subject line tester", href: "/tools/spam-subject-tester" },
      { label: "Protect your sender reputation", href: "/blog/protect-your-sender-reputation" },
    ],
  },
  {
    slug: "spf-dkim-dmarc-setup-checklist",
    type: "Checklist",
    title: "SPF, DKIM & DMARC Setup Checklist",
    description: "Get email authentication right — the non-negotiable basics after the Gmail/Yahoo rules.",
    intro: "If these three aren't configured, even a clean list can land in spam. Work through them in order for your sending domain.",
    groups: [
      { heading: "SPF", items: ["Publish a single SPF TXT record listing every service that sends on your behalf.", "Keep within the 10-DNS-lookup limit.", "End the record with ~all (softfail) or -all (fail)."] },
      { heading: "DKIM", items: ["Enable DKIM signing in your ESP / mail provider.", "Publish the provider's DKIM public key as a DNS TXT record.", "Verify mail is being signed and the signature validates."] },
      { heading: "DMARC", items: ["Publish a DMARC TXT record at _dmarc.yourdomain.com.", "Start with p=none and a reporting address (rua=) to monitor.", "Review aggregate reports, fix any failing sources, then move to p=quarantine and p=reject."] },
    ],
    related: [
      { label: "SPF / DKIM / DMARC setup guide", href: "/blog/spf-dkim-dmarc-setup-guide" },
      { label: "DMARC checker tool", href: "/tools/dmarc-checker" },
      { label: "SPF checker tool", href: "/tools/spf-checker" },
    ],
  },
  {
    slug: "crm-data-hygiene-playbook",
    type: "Playbook",
    title: "CRM Data Hygiene Playbook",
    description: "A repeatable routine to keep your CRM contacts clean, deduplicated and reachable.",
    intro: "Data decays ~2% a month. This playbook turns cleanup from a once-a-year panic into a quiet routine.",
    groups: [
      { heading: "Monthly", items: ["Verify any contacts added or edited this month.", "Merge new duplicates flagged by the CRM.", "Suppress contacts that bounced or unsubscribed."] },
      { heading: "Quarterly", items: ["Re-verify the full active database (email + phone).", "Archive contacts undeliverable for 2+ quarters.", "Review and standardize field formatting (phone, country, name case)."] },
      { heading: "At point of capture", items: ["Validate email and phone on form submit via API.", "Block disposable domains and obvious fakes before they're created.", "Normalize phone numbers to E.164 on entry."] },
    ],
    related: [
      { label: "Clean up your CRM", href: "/use-case/crm-cleanup" },
      { label: "Why your lead list decays", href: "/blog/why-lead-lists-decay" },
      { label: "Verify a HubSpot list", href: "/use-case/verify-hubspot-list" },
    ],
  },
  {
    slug: "email-bounce-rate-benchmarks",
    type: "Cheat sheet",
    title: "Email Bounce Rate Benchmarks",
    description: "What's a good bounce rate, what's dangerous, and where your industry sits.",
    intro: "A quick reference for judging a bounce rate at a glance and knowing when to stop and re-verify.",
    groups: [
      { heading: "The thresholds", items: ["Under 2% — healthy; most house lists should sit here.", "2–5% — warning; re-verify before your next send.", "5%+ — danger; pause sending and clean the list now.", "Spam complaints should stay under 0.3% under the new sender rules."] },
      { heading: "By list type", items: ["Verified house list: under 2%.", "Older CRM export: ~5%.", "Cold / purchased list: 7–10%.", "Scraped list: 12%+ — verify before any send."] },
      { heading: "What pushes it up", items: ["List age (data decays ~2%/month).", "Purchased or scraped sources.", "No verification before sending.", "Sending to catch-all-heavy B2B domains cold."] },
    ],
    related: [
      { label: "Bounce rate calculator", href: "/tools/bounce-rate-calculator" },
      { label: "Keep bounce rate under 2%", href: "/blog/keep-bounce-rate-under-2-percent" },
      { label: "State of Email Deliverability 2026", href: "/research/state-of-email-deliverability-2026" },
    ],
  },
  {
    slug: "domain-warmup-schedule-template",
    type: "Template",
    title: "Domain Warm-Up Schedule Template",
    description: "A week-by-week sending ramp to warm a new domain without tripping spam filters.",
    intro: "Copy this schedule for any new sending domain. Adjust volumes to your list size, but keep the gradual ramp.",
    groups: [
      { heading: "Weeks 1–2: foundation", items: ["Confirm SPF, DKIM and DMARC are passing before the first send.", "Day 1–3: send to 20–50 of your most engaged contacts.", "Day 4–7: increase to ~100/day if complaints stay near zero.", "Week 2: ramp to ~250–500/day, watching bounces and replies."] },
      { heading: "Weeks 3–4: ramp", items: ["Double daily volume each few days while metrics stay healthy.", "Keep engaging content so opens and replies stay high.", "Pause the ramp if bounces exceed 2% or complaints rise."] },
      { heading: "Ongoing", items: ["Maintain consistent daily volume rather than big spikes.", "Re-verify lists every 90 days.", "Segment out catch-alls and low-engagement contacts from large sends."] },
    ],
    related: [
      { label: "Domain warm-up plan", href: "/blog/domain-warmup-plan" },
      { label: "Protect your sender reputation", href: "/blog/protect-your-sender-reputation" },
      { label: "Free deliverability tools", href: "/tools" },
    ],
  },
  {
    slug: "sms-list-validation-checklist",
    type: "Checklist",
    title: "SMS List Validation Checklist",
    description: "Make sure your texts only go to live, textable mobiles — and stay compliant.",
    intro: "Texting landlines and dead numbers wastes spend and risks carrier penalties. Validate before every SMS campaign.",
    groups: [
      { heading: "Validate the numbers", items: ["Confirm each number is a valid, correctly formatted (E.164) number.", "Check line type and drop landlines and VoIP where not allowed.", "Confirm active status — remove disconnected numbers.", "Standardize country codes for international lists."] },
      { heading: "Stay compliant", items: ["Confirm you have opt-in consent for SMS for each contact.", "Include clear opt-out (STOP) handling.", "Respect quiet hours and local regulations.", "Keep records of consent."] },
    ],
    related: [
      { label: "Verify an SMS marketing list", href: "/use-case/verify-sms-list" },
      { label: "Phone validator tool", href: "/tools/phone-validator" },
      { label: "Phone Data Quality Report 2026", href: "/research/phone-data-quality-report-2026" },
    ],
  },
];

export function getResource(slug: string) {
  return RESOURCES.find((r) => r.slug === slug);
}
