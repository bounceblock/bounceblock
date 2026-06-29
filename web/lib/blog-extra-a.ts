import type { BlogPost } from "@/lib/blog";

/** Phase-1 blog expansion, set A — deliverability + email-verification clusters. */
export const POSTS_A: BlogPost[] = [
  {
    slug: "email-deliverability-guide-2026",
    title: "The 2026 email deliverability guide: how to reach the inbox",
    description: "Everything that decides whether your email lands in the inbox — authentication, reputation, list quality — and how to get each one right.",
    date: "2026-04-24",
    readMins: 8,
    category: "Deliverability",
    intro:
      "You can write the perfect email and still never be seen if it lands in spam. Deliverability is the sum of authentication, reputation, engagement and — above all — list quality. Here's how to get every part right in 2026.",
    sections: [
      { heading: "What deliverability actually means", paras: ["Deliverability is the share of your mail that reaches the inbox rather than the spam folder or a bounce. It isn't one setting — it's the combined result of how you authenticate, how mailbox providers rate your reputation, how recipients engage, and how clean your list is."] },
      { heading: "Authenticate everything", paras: ["SPF, DKIM and DMARC are the three pillars receivers check to confirm you are who you say you are. Publish all three, align them, and move your DMARC policy toward p=reject once your legitimate mail authenticates cleanly. Since 2024, Gmail and Yahoo require this for bulk senders."], bullets: ["SPF: list the servers allowed to send for your domain.", "DKIM: cryptographically sign your mail.", "DMARC: tell receivers what to do with failures, and collect reports."] },
      { heading: "Protect your sender reputation", paras: ["Mailbox providers score your domain and IP on bounces, complaints, engagement and consistency. Hard bounces and spam-trap hits are the fastest way to damage that score — which is why list quality is the foundation everything else sits on."] },
      { heading: "Clean the list before every send", paras: ["The single biggest lever most teams control is hygiene. Verify addresses before each campaign so invalid ones are removed before they bounce, keep your bounce rate under ~2%, and re-check anything older than a quarter. BounceBlock verifies email and phone in one upload and previews your first 100 contacts free."] },
      { heading: "Keep engagement high", paras: ["Send relevant mail to people who want it, make unsubscribing easy, and prune long-inactive contacts. Engagement is increasingly the signal that separates inbox from spam — a smaller, engaged list beats a large, indifferent one."] },
    ],
  },
  {
    slug: "bulk-sender-rules-explained",
    title: "Google, Yahoo & Microsoft bulk-sender rules: what changed",
    description: "The bulk-sender requirements you must meet to keep reaching the inbox — authentication, easy unsubscribe and low complaint rates.",
    date: "2026-04-18",
    readMins: 6,
    category: "Deliverability",
    intro:
      "Since 2024, the big mailbox providers have enforced clear requirements for anyone sending at volume. Miss them and your mail gets throttled or filtered. Here's what they expect.",
    sections: [
      { heading: "Authenticate with SPF, DKIM and DMARC", paras: ["Bulk senders must authenticate their mail with all three standards and publish a DMARC policy. This is no longer best practice — it's a requirement to reach Gmail and Yahoo inboxes at volume."] },
      { heading: "Make unsubscribing one click", paras: ["Provide one-click unsubscribe and honor it quickly. Burying the link or delaying removals drives spam complaints, which is exactly the signal these rules are designed to punish."] },
      { heading: "Keep complaint rates low", paras: ["Stay well under the complaint-rate thresholds providers publish. The way to do that is to mail people who opted in, keep the list fresh, and stop sending to the unengaged before they mark you as spam."] },
      { heading: "Why list quality underpins all of it", paras: ["Every requirement traces back to list quality. A verified, engaged list bounces less, complains less and authenticates cleanly. Verify before each send so you meet the bar automatically rather than reacting to a deliverability drop."] },
    ],
  },
  {
    slug: "keep-bounce-rate-under-2-percent",
    title: "How to keep your bounce rate under 2%",
    description: "Why 2% is the line, what pushes you over it, and the workflow that keeps bounces low before every send.",
    date: "2026-04-11",
    readMins: 5,
    category: "Deliverability",
    intro:
      "Your bounce rate is one of the clearest signals mailbox providers use to judge you. Most healthy senders sit under 2%; cross it and filtering starts. Here's how to stay safe.",
    sections: [
      { heading: "Why 2% is the threshold", paras: ["Around 2% is the widely-accepted safe ceiling for B2B senders. Cold outreach to unverified lists often runs far higher because the data is older and unchecked. Sustained high bounce rates can throttle or block your sending entirely."] },
      { heading: "What pushes you over the line", bullets: ["Old lists where addresses have gone dead.", "Purchased or scraped lists full of invalids.", "Typos captured at signup (gmial.com).", "Role and disposable addresses that never engage."] },
      { heading: "The workflow that keeps it low", paras: ["Verify every list before you send, validate new contacts at the point of capture, and re-verify anything older than 90 days. A flat-priced tool makes verifying-before-every-send affordable, instead of something you ration."] },
    ],
  },
  {
    slug: "sender-reputation-explained",
    title: "Sender reputation explained: how to build and protect it",
    description: "What sender reputation is, the signals that shape it, and how to keep yours high so your mail reaches the inbox.",
    date: "2026-04-04",
    readMins: 6,
    category: "Deliverability",
    intro:
      "Sender reputation is the invisible score that decides inbox versus spam. You can't see it directly, but you can shape it. Here's how it works and how to protect it.",
    sections: [
      { heading: "What it is", paras: ["Reputation is a trust score mailbox providers assign to your sending domain and IP, built from signals like bounce rate, spam complaints, engagement and sending consistency. A poor reputation means even legitimate mail gets filtered."] },
      { heading: "The signals that matter most", bullets: ["Bounce rate — keep it under ~2%.", "Spam complaints — keep them rare.", "Engagement — opens, clicks and replies.", "Consistency — steady volume, no sudden spikes."] },
      { heading: "List quality is the foundation", paras: ["Bounces and spam-trap hits damage reputation fastest, and both come straight from unverified lists. Clean the list and you remove the biggest risk at the source."] },
      { heading: "Repairing a damaged reputation", paras: ["If your reputation has slipped, pause, clean the list thoroughly, and warm back up slowly — sending to your most engaged contacts first and ramping volume gradually as the signals recover."] },
    ],
  },
  {
    slug: "domain-warmup-plan",
    title: "Domain warmup: a step-by-step plan",
    description: "How to warm up a new sending domain over a few weeks so you build reputation instead of getting filtered on day one.",
    date: "2026-03-28",
    readMins: 6,
    category: "Deliverability",
    intro:
      "Send a high volume from a brand-new domain and providers treat you as suspicious. Warming up gradually builds the reputation that gets you to the inbox. Here's a practical plan.",
    sections: [
      { heading: "Why warmup is necessary", paras: ["A new domain has no sending history, so mailbox providers have no reason to trust it. Ramping volume slowly while generating positive engagement signals tells them you're a legitimate sender."] },
      { heading: "A week-by-week ramp", bullets: ["Weeks 1-2: small volumes to your most engaged, hand-picked contacts.", "Weeks 3-4: increase volume gradually, watching bounces and complaints.", "Weeks 5-6: approach full volume only if metrics stay healthy.", "Throughout: keep bounce rate low and engagement high."] },
      { heading: "Start with a clean list", paras: ["Warmup only works if you send to real, engaged people. Verify your warmup list first — a single bounce-heavy send early on can undo weeks of careful ramping."] },
      { heading: "Authenticate before you start", paras: ["Have SPF, DKIM and DMARC in place before the first send. Warming an unauthenticated domain wastes the effort, because failures will hurt you from the start."] },
    ],
  },
  {
    slug: "spf-dkim-dmarc-setup-guide",
    title: "SPF, DKIM & DMARC: the complete setup guide",
    description: "A practical, plain-English guide to setting up the three email authentication standards correctly.",
    date: "2026-03-21",
    readMins: 7,
    category: "Deliverability",
    intro:
      "SPF, DKIM and DMARC are the three records that prove your mail is really yours. Set up wrong, they silently hurt deliverability. Here's how to get each one right.",
    sections: [
      { heading: "SPF: who can send for you", paras: ["SPF is a TXT record listing the servers allowed to send mail for your domain. Include every sending service you use, stay under the 10-DNS-lookup limit, publish only one SPF record, and end it with ~all or -all."] },
      { heading: "DKIM: sign your mail", paras: ["DKIM adds a cryptographic signature using a private key, with the public key published as a TXT record at a selector under your domain. Your email provider generates the keys; you publish the record they give you so receivers can verify the signature."] },
      { heading: "DMARC: tie it together", paras: ["DMARC tells receivers what to do when SPF and DKIM fail — none, quarantine or reject — and where to send reports. Start at p=none with a rua reporting address, confirm your legitimate mail passes, then tighten toward p=reject."] },
      { heading: "Verify your records", paras: ["After publishing, lint each record for the common mistakes — too many SPF lookups, a missing all, a p=none DMARC you forgot to tighten. Our free SPF, DKIM and DMARC checkers catch these in seconds."] },
    ],
  },
  {
    slug: "why-emails-land-in-spam",
    title: "Why your emails land in spam (and how to fix it)",
    description: "The real reasons mail gets filtered — from authentication gaps to dirty lists — and the fixes that move you back to the inbox.",
    date: "2026-03-14",
    readMins: 6,
    category: "Deliverability",
    intro:
      "Landing in spam is rarely about one thing. It's usually a stack of small problems — authentication, reputation, list quality and content — adding up. Here are the common causes and their fixes.",
    sections: [
      { heading: "Authentication gaps", paras: ["Missing or misconfigured SPF, DKIM or DMARC makes your mail look spoofable, and bulk providers now require all three. Fixing authentication is often the single biggest jump in inbox placement."] },
      { heading: "A dirty list", paras: ["Bounces and spam-trap hits from unverified lists are among the fastest ways to get filtered. Verify before every send so invalid and risky addresses never enter the campaign."] },
      { heading: "Poor engagement", paras: ["If recipients don't open, click or reply — and especially if they mark you as spam — providers learn to filter you. Mail people who opted in, prune the unengaged, and make unsubscribing easy."] },
      { heading: "Spammy content and sending patterns", bullets: ["ALL-CAPS subject lines and excessive punctuation.", "Sudden volume spikes from a cold domain.", "Link shorteners and risky attachments.", "No clear unsubscribe option."] },
    ],
  },
  {
    slug: "what-is-email-verification",
    title: "What is email verification and how does it work?",
    description: "A plain-English explanation of email verification — the checks it runs, the statuses it returns, and why it matters.",
    date: "2026-04-21",
    readMins: 5,
    category: "Email verification",
    intro:
      "Email verification checks whether an address is real and able to receive mail — without sending one. Here's what happens under the hood and how to act on the results.",
    sections: [
      { heading: "The checks it runs", bullets: ["Syntax — is the address well-formed?", "Domain and MX — can the domain receive mail?", "Mailbox — does the specific inbox accept mail?", "Risk flags — catch-all, disposable, role-based, duplicate."] },
      { heading: "The statuses you get back", paras: ["A verifier returns a status like valid, invalid, catch-all or unknown. Valid is safe to send; invalid should be removed; catch-all is risky and best sent to cautiously; unknown means the server didn't give a clear answer."] },
      { heading: "Why it matters", paras: ["Sending to unverified lists drives bounces and spam-trap hits, which damage your sender reputation. Verifying first keeps your bounce rate low and your mail in the inbox."] },
      { heading: "Email, phone and company together", paras: ["BounceBlock runs these checks and validates phone numbers and company data in the same upload — one clean file for your whole outreach. Preview your first 100 contacts free."] },
    ],
  },
  {
    slug: "verify-email-without-sending",
    title: "How to verify an email address without sending one",
    description: "Yes, you can confirm an address is likely deliverable without emailing it. Here's how verification does it.",
    date: "2026-04-14",
    readMins: 4,
    category: "Email verification",
    intro:
      "Sending a test email to check an address is slow, risky and tips off the recipient. Verification confirms deliverability without ever sending. Here's how.",
    sections: [
      { heading: "Syntax and domain checks", paras: ["First, the address is checked for valid format and obvious typos. Then its domain is checked for MX records — if there are none, the domain can't receive mail and anything there will bounce."] },
      { heading: "Mailbox-level probing", paras: ["A verifier opens a conversation with the receiving mail server, as a sender would, to learn whether the specific mailbox would accept a message — then stops before actually delivering anything. No email is ever sent."] },
      { heading: "Why not just send a test?", bullets: ["Test sends to bad addresses still count as bounces.", "They can hit spam traps and hurt your reputation.", "They're slow and don't scale to a whole list."] },
      { heading: "What you can't always know", paras: ["Catch-all domains accept everything, so a specific mailbox can't be confirmed from outside — those come back as catch-all rather than valid or invalid, and are best treated as risky."] },
    ],
  },
  {
    slug: "catch-all-emails-explained",
    title: "Catch-all emails: why most verifiers get them wrong",
    description: "What a catch-all domain is, why it's hard to verify, and how to handle catch-all addresses safely.",
    date: "2026-04-07",
    readMins: 5,
    category: "Email verification",
    intro:
      "Catch-all addresses are the trickiest result in email verification. They're not clearly valid or invalid — and how you handle them affects both deliverability and how many real contacts you keep.",
    sections: [
      { heading: "What catch-all means", paras: ["A catch-all (accept-all) domain accepts mail for every possible address, so the receiving server says yes to anything. That makes it impossible to confirm from the outside whether a specific mailbox actually exists."] },
      { heading: "Why it's risky", paras: ["Some catch-all addresses are real and deliverable; others don't exist and will eventually bounce or hit a trap. Treating them all as valid inflates risk; treating them all as invalid throws away real contacts."] },
      { heading: "How to handle them", bullets: ["Send to catch-alls cautiously — start with engaged segments.", "Weight them lower in your quality score.", "Watch their engagement and prune the silent ones.", "Never assume a catch-all list is fully deliverable."] },
      { heading: "A better signal", paras: ["BounceBlock flags catch-all addresses clearly and folds them into a per-list quality score, so you can make an informed call instead of guessing."] },
    ],
  },
  {
    slug: "detect-disposable-emails",
    title: "Disposable emails: how to detect and block them",
    description: "Why throwaway addresses hurt your list and how to keep them out at signup and before you send.",
    date: "2026-03-31",
    readMins: 4,
    category: "Email verification",
    intro:
      "Disposable email addresses self-destruct and never convert. They sneak in at signup to grab a lead magnet or free trial. Here's how to detect and block them.",
    sections: [
      { heading: "What disposable emails are", paras: ["They come from services that hand out temporary inboxes — useful for someone who wants something without giving a real address. They expire fast, never get checked, and never engage."] },
      { heading: "Why they hurt", bullets: ["They inflate list size with contacts who'll never convert.", "They drag down open and click rates.", "They can bounce once the temporary inbox expires."] },
      { heading: "How to detect them", paras: ["Detection matches the address domain against a continuously updated list of known disposable providers, combined with other risk signals. Because new disposable domains appear constantly, a static list isn't enough on its own."] },
      { heading: "Block them at the source", paras: ["The cleanest fix is to verify at the point of capture — a form guard that rejects disposable domains so they never become a record. Verifying existing lists catches the ones already in your database."] },
    ],
  },
  {
    slug: "how-to-clean-an-email-list",
    title: "How to clean an email list before your next campaign",
    description: "A simple, repeatable process to verify, dedupe and prune a list so your next send actually reaches the inbox.",
    date: "2026-03-24",
    readMins: 5,
    category: "Email verification",
    intro:
      "Cleaning a list before you send is the highest-ROI thing most senders can do. Here's a simple process you can run before every campaign.",
    sections: [
      { heading: "Step 1: verify every address", paras: ["Run the whole list through verification to remove invalids, flag catch-all and disposable addresses, and identify role accounts. This is what keeps your bounce rate under control."] },
      { heading: "Step 2: dedupe", paras: ["Remove duplicate records — even when formatting differs — so you don't email the same person twice or skew your reporting. Good cleaning catches dupes your spreadsheet won't."] },
      { heading: "Step 3: prune the unengaged", paras: ["Drop or segment contacts who haven't opened or clicked in a long time. A smaller, engaged list outperforms a large, indifferent one and protects your reputation."] },
      { heading: "Make it a habit", paras: ["Lists decay every month, so clean before every major send and re-verify anything older than a quarter. BounceBlock does verification, phone validation and dedupe in one upload — preview your first 100 rows free."] },
    ],
  },
];
