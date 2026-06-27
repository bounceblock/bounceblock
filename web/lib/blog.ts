/** Blog content (Phase 6). Real, useful SEO articles for the BounceBlock audience. */

export interface BlogSection {
  heading: string;
  paras?: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMins: number;
  category: string;
  intro: string;
  sections: BlogSection[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "how-to-reduce-email-bounce-rate",
    title: "How to reduce your email bounce rate (and why it matters)",
    description: "A practical guide to lowering bounce rates, protecting deliverability, and keeping your sender reputation healthy.",
    date: "2026-06-20",
    readMins: 6,
    category: "Deliverability",
    intro:
      "Your bounce rate is one of the clearest signals mailbox providers use to judge whether you're a sender worth trusting. Let a list go stale and bounces creep up — and suddenly even your good emails land in spam. Here's how to keep bounces low.",
    sections: [
      { heading: "What counts as a bounce", paras: ["A hard bounce means the address is permanently undeliverable — it doesn't exist, the domain is wrong, or the mailbox is closed. A soft bounce is temporary (a full inbox, a server hiccup). Hard bounces are the dangerous ones: a few percent is enough to damage your sender reputation."] },
      { heading: "Why a 2% bounce rate is the line", paras: ["Most B2B senders sit around 2%. Cold outreach often runs 7–10% or higher because the lists are older and unverified. Gmail and Yahoo's 2024 sender requirements made this stricter — sustained high bounce rates can throttle or block your sending entirely."] },
      { heading: "Five ways to lower your bounce rate", bullets: ["Verify every list before you send — catch invalid addresses before they bounce.", "Validate at the point of capture, so bad emails never enter your CRM.", "Remove role accounts (info@, sales@) and disposable domains.", "Re-verify lists older than 90 days — data decays ~2% a month.", "Warm up new domains slowly and watch your metrics."] },
      { heading: "The fastest fix", paras: ["Run your list through a verification tool before every campaign. BounceBlock checks syntax, domain, MX records and the live mailbox, flags catch-all and disposable addresses, and removes duplicates — so you only send to addresses that exist. You can preview your first 100 contacts free in under two minutes."] },
    ],
  },
  {
    slug: "email-verification-explained",
    title: "Email verification 101: valid, invalid, catch-all and unknown",
    description: "What each verification status actually means, and how to act on it.",
    date: "2026-06-16",
    readMins: 5,
    category: "Guides",
    intro:
      "Run a list through any verifier and you'll get back statuses like valid, invalid, catch-all and unknown. Here's what each one means and what to do with it.",
    sections: [
      { heading: "Valid", paras: ["The mailbox exists and can receive email. These are safe to send to. In a healthy list, most contacts should land here."] },
      { heading: "Invalid", paras: ["The address doesn't exist, the domain is wrong, or there's a syntax error or typo (like gmial.com). These will hard-bounce — remove them before you send."] },
      { heading: "Catch-all (accept-all)", paras: ["The domain accepts mail for any address, so the verifier can't confirm the specific mailbox exists. These are risky: some are real, some aren't. Send to them cautiously, or only to your most engaged segments."] },
      { heading: "Unknown", paras: ["The mail server didn't give a clear answer (greylisting, timeouts). A good tool retries; persistent unknowns are best left out of important sends."] },
      { heading: "What a quality score adds", paras: ["A single 0–100 score blends these signals so you can judge a whole list at a glance. BounceBlock returns a quality score plus the per-contact breakdown, so you know exactly what you're working with before you pay."] },
    ],
  },
  {
    slug: "why-lead-lists-decay",
    title: "Why your lead list decays — and what to do about it",
    description: "Contact data goes stale faster than most teams realize. Here's why, and how to stay ahead of it.",
    date: "2026-06-12",
    readMins: 4,
    category: "Data hygiene",
    intro:
      "That list you built last year isn't the list you have today. People change jobs, switch numbers, and abandon inboxes. Left alone, a contact list quietly rots — and takes your deliverability with it.",
    sections: [
      { heading: "Data decays around 2% a month", paras: ["Industry estimates put B2B contact decay between roughly 22% and 30% per year — and some segments far higher. Every month, a slice of your list becomes undeliverable without you doing anything wrong."] },
      { heading: "Where the rot comes from", bullets: ["Job changes abandon work emails and direct lines.", "Phone numbers get reassigned or disconnected.", "Free inboxes go dormant and start bouncing.", "Duplicate records pile up across imports and tools."] },
      { heading: "Stay ahead of it", paras: ["Treat list hygiene as routine, not a one-time cleanup. Re-verify before every major send, validate new contacts at capture, and re-check anything older than a quarter. A flat-priced tool makes this affordable to do regularly instead of dreading the cost."] },
    ],
  },
  {
    slug: "email-vs-phone-validation",
    title: "Email vs phone validation: why you need both",
    description: "Most tools verify email and stop there. For sales teams that call and email, that's only half the job.",
    date: "2026-06-08",
    readMins: 4,
    category: "Guides",
    intro:
      "If your team only emails, email verification is enough. But the moment reps pick up the phone, unverified numbers cost you just as much wasted time as dead inboxes.",
    sections: [
      { heading: "The blind spot in most verifiers", paras: ["Nearly every email verification tool ignores phone numbers entirely — phone validation is a separate product you'd have to buy and integrate. So teams clean their emails and keep dialing disconnected numbers."] },
      { heading: "What phone validation tells you", bullets: ["Whether a number is active or disconnected.", "Line type — mobile, landline or VoIP.", "Carrier and country.", "Whether it's worth a rep's time to dial."] },
      { heading: "One pass beats two tools", paras: ["Verifying email and phone in the same upload means one clean file covers your whole outreach — email and calls. BounceBlock bundles both at one flat price, which is rare in a category that's overwhelmingly email-only."] },
    ],
  },
  {
    slug: "clean-a-purchased-lead-list",
    title: "How to clean a purchased lead list safely",
    description: "Bought lists are notoriously messy. Verify before you risk your domain on them.",
    date: "2026-06-03",
    readMins: 5,
    category: "Data hygiene",
    intro:
      "Purchased and aggregated lists are a fast way to fill the pipeline — and a fast way to wreck your sender reputation if you send to them raw. Here's how to clean one before it touches your domain.",
    sections: [
      { heading: "Assume it's dirty", paras: ["Purchased lists routinely contain a high share of invalid addresses, spam traps, duplicates and wrong numbers. Sending to them unverified is one of the quickest ways to get flagged."] },
      { heading: "Clean it in three steps", bullets: ["Verify every email and drop invalids, disposables and obvious spam-trap patterns.", "Validate phone numbers so reps don't dial dead lines.", "Deduplicate against itself and your existing CRM."] },
      { heading: "Then warm up slowly", paras: ["Even a clean purchased list should be eased into — send to your most likely-valid segments first and ramp volume gradually. Verifying up front is what makes that safe instead of reckless."] },
    ],
  },
  {
    slug: "protect-your-sender-reputation",
    title: "Cold email deliverability: protect your sender reputation",
    description: "Sender reputation is the invisible score that decides whether you reach the inbox. Here's how to protect it.",
    date: "2026-05-28",
    readMins: 6,
    category: "Deliverability",
    intro:
      "You can write the perfect email and still never get seen if your sender reputation is poor. Mailbox providers score every sender, and that score decides inbox vs spam. Protecting it starts with your list.",
    sections: [
      { heading: "What sender reputation is", paras: ["It's a trust score mailbox providers assign to your sending domain and IP, based on signals like bounce rate, spam complaints, engagement and sending consistency. A bad reputation means even legitimate mail gets filtered."] },
      { heading: "List quality is the foundation", paras: ["Bounces and spam-trap hits are among the fastest ways to tank reputation — and both come straight from unverified lists. Clean the list and you remove the biggest risk at the source."] },
      { heading: "A deliverability checklist", bullets: ["Verify lists before every send and keep bounce rate under 2%.", "Authenticate your domain with SPF, DKIM and DMARC.", "Remove unengaged contacts periodically.", "Warm up new domains and keep volume steady.", "Make unsubscribing easy to avoid spam complaints."] },
      { heading: "Where BounceBlock fits", paras: ["BounceBlock handles the list-quality half of the equation: verified emails, validated phones, no duplicates — so the contacts you send to are real, and your reputation stays intact."] },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
