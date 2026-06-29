/** Blog content (Phase 6). Real, useful SEO articles for the BounceBlock audience. */
import { POSTS_A } from "@/lib/blog-extra-a";
import { POSTS_B } from "@/lib/blog-extra-b";

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
  /** Optional explicit author override; otherwise derived from category. */
  authorId?: string;
}

/**
 * Map a post to an author id (E-E-A-T byline). Uses an explicit `authorId`
 * if set, else assigns by topic so each post has a credible, on-topic byline.
 */
export function postAuthorId(post: { authorId?: string; category: string }): string {
  if (post.authorId) return post.authorId;
  const c = post.category.toLowerCase();
  if (c.includes("phone")) return "priya-nair";
  if (c.includes("deliverability")) return "maya-okonkwo";
  if (c.includes("data") || c.includes("company")) return "daniel-reyes";
  if (c.includes("verification")) return "daniel-reyes";
  if (c.includes("hygiene") || c.includes("lead")) return "priya-nair";
  return "maya-okonkwo";
}

const CORE_POSTS: BlogPost[] = [
  {
    slug: "how-to-reduce-email-bounce-rate",
    title: "How to reduce your email bounce rate (and why it matters)",
    description: "A practical guide to lowering bounce rates, protecting deliverability, and keeping your sender reputation healthy.",
    date: "2026-06-20",
    readMins: 10,
    category: "Deliverability",
    intro:
      "Your bounce rate is one of the clearest signals mailbox providers use to judge whether you're a sender worth trusting. Let a list go stale and bounces creep up — and suddenly even your good emails land in spam. This guide explains what bounces are, why the 2% threshold matters, and the practical workflow that keeps your bounce rate low before every send.",
    sections: [
      { heading: "What counts as a bounce", paras: ["A bounce is simply an email that couldn't be delivered. When a receiving mail server rejects your message, it sends back a non-delivery report explaining why — and those reports fall into two very different categories that demand very different responses. Getting the distinction right is the foundation of keeping your bounce rate under control.", "The reason bounces matter so much is that mailbox providers like Gmail, Outlook and Yahoo watch them closely. A pattern of failures tells them you're mailing a list you don't actively maintain, and that perception quietly moves your future mail from the inbox toward the spam folder — even for the subscribers who genuinely want to hear from you."] },
      { heading: "Hard bounces vs soft bounces: the difference that matters", paras: ["A hard bounce is a permanent failure: the address doesn't exist, the domain is wrong, or the mailbox has been closed. The receiving server is telling you this address will never accept your mail, so you should stop trying. Hard bounces are the dangerous ones — they're the clearest signal of poor list hygiene, and even a low single-digit percentage is enough to damage your sender reputation.", "A soft bounce is a temporary failure: the address is real, but the message couldn't be delivered right now — a full mailbox, a server that's down, or a message that's too large. Mail systems usually retry soft bounces over a period of hours or days. The rule of thumb is simple: remove hard bounces immediately, and let soft bounces retry, suppressing them only if they persist across several sends."] },
      { heading: "Why a 2% bounce rate is the line", paras: ["Most healthy B2B senders keep their total bounce rate at or under roughly 2%. It isn't a magic number published by any single provider, but it's the widely-accepted safe ceiling — stay under it and you're signalling a well-maintained list; climb past it and you start looking like a sender who doesn't clean their data.", "Cold outreach to unverified or purchased lists routinely runs far higher, often 7–10% and sometimes 20–30%, because the data is older and unchecked. Since Gmail and Yahoo tightened their bulk-sender requirements in 2024, sustained high bounce rates carry real consequences: throttling, spam-foldering, or outright blocking of your sending."] },
      { heading: "How to calculate your bounce rate", paras: ["Bounce rate is the number of bounces divided by the number of emails sent, expressed as a percentage. Send 10,000 emails and have 200 bounce, and your bounce rate is 2%. It's worth tracking your hard-bounce rate separately, because that's the figure most directly tied to list quality and reputation risk.", "Treating bounce rate as a lagging indicator you can control in advance is the key mental shift. By the time a high rate shows up in your campaign report, the reputation damage is already done. The goal is to act before the send, not after — which is exactly what verification lets you do."] },
      { heading: "What pushes your bounce rate up", bullets: ["Old lists where addresses have quietly gone dead since you collected them.", "Purchased, rented or scraped lists full of invalid and never-opted-in addresses.", "Typos captured at signup — gmial.com, hotmial.com and the like.", "Role accounts (info@, sales@) and disposable domains that never engage.", "A long gap since the list was last verified, letting normal decay accumulate."] },
      { heading: "Verify your list before every send", paras: ["The single most effective way to lower your bounce rate is to verify your list before each campaign. A verification pass checks every address for valid syntax, confirms the domain has mail servers, and probes whether the specific mailbox exists — all without sending anything — then removes the addresses that would have bounced before they ever get the chance.", "This is the highest-ROI habit in email marketing. The cost of verifying is trivial next to the cost of a damaged reputation, and because it happens before the send, it prevents the bounces rather than just reporting them afterward. Flat-priced verification makes cleaning before every send affordable, instead of something you ration to save credits."] },
      { heading: "Validate new contacts at the point of capture", paras: ["The cleanest data is data you never let in. Validating an email the moment it's submitted on a signup or lead form — using a real-time API or form guard — stops invalid addresses, disposable domains and obvious typos from ever entering your database. A form guard can even surface a typo suggestion inline, so a user fixes 'gmial.com' on the spot.", "Front-door validation works hand in hand with periodic bulk cleaning: real-time checks keep new data clean, and bulk verification removes the decay that accumulates in records you already hold. Together they keep your database trending toward clean rather than slowly degrading."] },
      { heading: "Remove role accounts and disposable addresses", paras: ["Not every deliverable address is a good one. Role accounts like info@, sales@ and support@ reach a shared inbox rather than a person, engage poorly, and are more likely to generate complaints. Disposable addresses from throwaway-email services are valid at signup but engineered to vanish, so they never convert and eventually bounce when the temporary inbox expires.", "A good verification pass flags both, so you can decide how to handle them — many senders exclude role and disposable addresses from cold campaigns entirely. Removing them keeps your engagement metrics honest and trims the addresses most likely to push your bounce rate up over time."] },
      { heading: "Re-verify aging lists and suppress bad addresses", paras: ["Contact data decays continuously — roughly 2–2.5% of a typical list every month — as people change jobs and abandon inboxes. That means a list verified six months ago has already drifted, so re-verifying anything older than about a quarter is essential before you trust it for a major send.", "When you do receive bounces, suppress them rather than simply deleting the records. Keeping hard-bounced addresses on a do-not-send list stops the same bad address being re-imported from another source and quietly re-entering your sending — one of the most common ways a cleaned list slowly re-fills with junk."] },
      { heading: "Warm up new domains and keep volume steady", paras: ["If you're sending from a new domain or IP, ramp volume gradually rather than blasting at full scale on day one. Mailbox providers distrust sudden volume from an unknown sender, and a bounce-heavy first send can damage a brand-new reputation before you've had a chance to build one. Start with your most engaged contacts and increase volume only while bounces and complaints stay low.", "Even on an established domain, consistency matters. Sudden spikes look like compromise or spam, so steady, predictable sending — to a verified, engaged list — is what keeps both your bounce rate and your reputation healthy over the long run."] },
      { heading: "What a high bounce rate actually costs you", paras: ["The visible cost of a bounce is the wasted send, but that's the smallest part. The real damage is to your sender reputation, which is shared across your whole domain — so a bounce-heavy campaign drags down inbox placement for every future send, including to your most engaged, valuable subscribers.", "There's a metrics cost too. Bounces distort the numbers you steer by: open and click rates are calculated against delivered mail, so a list full of dead addresses makes every campaign look worse than it performed, and you risk cutting things that actually work. And there's an opportunity cost — every euro and hour spent storing, sending to and analysing dead records is one not spent on real prospects. A single bad send to an unverified list can set your deliverability back for weeks, which is why prevention is so much cheaper than recovery."] },
      { heading: "Bounce rate benchmarks by list type", paras: ["What counts as a 'normal' bounce rate depends heavily on where the list came from, and knowing the rough benchmarks helps you spot trouble early. A well-maintained, opted-in list verified before each send should sit comfortably under 2%, often well below 1%. A signup or lead-form list that hasn't been cleaned in a while will drift higher as it ages.", "Purchased, scraped or long-dormant lists are a different story — they routinely bounce at 10%, 20% or more, because the data is old and was never verified. If you're seeing a bounce rate far above 2%, the cause is almost always the list, not the content or the timing. The fix is to verify before sending, which pulls even a risky list back toward the safe zone by removing the addresses that would have bounced."] },
      { heading: "Build verification into your sending routine", paras: ["Lowering your bounce rate once is easy; keeping it low is about habit. The teams with the healthiest sending build verification into the rhythm of their work: new contacts validated at the point of capture, every list cleaned before a major send, and the core database re-verified at least quarterly to remove accumulated decay.", "Because contact data decays every month, a list verified six months ago has already drifted, so set-and-forget doesn't work. Flat-priced verification makes the habit affordable — you can clean as often as the data's age warrants without watching a credit balance — so the behaviour that protects your deliverability is the one your tooling encourages rather than penalises."] },
      { heading: "Re-engagement before removal", paras: ["Before you delete a chunk of unengaged-but-valid contacts, it's often worth a re-engagement attempt. Some subscribers go quiet for ordinary reasons — a busy stretch, a change of priorities — and a well-timed 'still want to hear from us?' email can win a share of them back, which is cheaper than acquiring new contacts to replace them.", "The key is to keep the re-engagement send itself clean and small: verify the segment first so you're not bouncing on dead addresses while trying to revive the live ones, and send only to the most recently active of the dormant group. Those who still don't engage after a clear, easy chance to opt back in can be suppressed with confidence — you've given them the choice, and continuing to mail them only risks complaints and reputation damage."] },
      { heading: "The fastest fix", paras: ["If you take one thing away, make it this: run your list through a verification tool before every campaign. BounceBlock checks syntax, domain, MX records and the live mailbox, flags catch-all, disposable and role addresses, and removes duplicates — so you only send to addresses that actually exist. Because it also validates phone numbers in the same upload, one clean file covers email, calls and SMS.", "You can preview your first 100 contacts free in under two minutes, with a full quality score, before paying anything — so you can see exactly how clean your list really is and how far below the 2% line your next send will land."] },
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
    readMins: 10,
    category: "Deliverability",
    intro:
      "You can write the perfect email and still never get seen if your sender reputation is poor. Mailbox providers score every sender, and that score decides inbox versus spam. This guide breaks down what shapes your reputation, why list quality is the foundation, and exactly how to protect — and if necessary rebuild — the trust that gets your mail delivered.",
    sections: [
      { heading: "What sender reputation is", paras: ["Sender reputation is the trust score mailbox providers — Gmail, Outlook, Yahoo and the rest — assign to the domain and IP you send from. It isn't a single published number; it's an internal, continuously updated judgement based on how recipients react to your mail and how well you follow sending norms. That judgement is the single biggest factor in whether your messages reach the inbox or get filtered to spam.", "Think of it as credit for email. It takes consistent, careful behaviour over time to build, and it can be damaged quickly by a few bad sends. The encouraging part is that the inputs are mostly within your control — and the most powerful one, list quality, is also the easiest to manage."] },
      { heading: "Domain reputation vs IP reputation", paras: ["Reputation actually has two layers. IP reputation is tied to the server address your mail leaves from; domain reputation is tied to the domain in your From address and your authentication. Both matter, but domain reputation has become the more durable and important of the two, because it follows you even if you change sending infrastructure.", "Your IP situation also shapes risk. On a shared IP, you inherit the reputation of everyone else sending from it — good or bad. On a dedicated IP, the reputation is entirely yours to build and protect, which is powerful but requires enough consistent volume to establish trust in the first place. For most senders, getting domain reputation and list quality right matters more than the IP choice itself."] },
      { heading: "The signals that shape your reputation", bullets: ["Bounce rate — frequent hard bounces signal an unmaintained list and hurt fast; keep it under ~2%.", "Spam complaints — one of the most damaging signals; Gmail and Yahoo expect this kept under 0.3%, ideally below 0.1%.", "Engagement — opens, clicks and replies tell providers people want your mail.", "Spam-trap hits — landing on trap addresses is a strong indicator of poor list hygiene.", "Authentication — properly published SPF, DKIM and DMARC prove your mail is genuinely yours.", "Consistency — steady, predictable volume builds trust; sudden spikes look like spam or compromise."] },
      { heading: "List quality is the foundation", paras: ["Most of the signals that damage reputation — hard bounces and spam-trap hits especially — come straight from mailing addresses you shouldn't have mailed. That's why list quality sits underneath everything else. You can authenticate perfectly and send beautiful content, but if a meaningful share of your list is invalid or unengaged, the reputation hit follows anyway.", "Verifying your list before every send is the most direct lever here. It removes the non-existent mailboxes that cause hard bounces and helps you avoid recycled spam traps hiding in old, decayed data — neutralising the biggest reputation risks before a single message goes out."] },
      { heading: "Why cold email is especially risky", paras: ["Cold outreach starts from a position of low trust with mailbox providers, because you're contacting people who haven't engaged with you before. That makes every misstep more costly: a bounce spike or complaint surge on a cold campaign does outsized damage compared with the same mistake on an engaged, opted-in list.", "The implication isn't that cold email is impossible — it's that it demands stricter hygiene. Verify cold lists especially carefully, start with smaller, well-targeted sends, and watch your bounce and complaint signals closely before scaling. Sending a large cold blast to an unverified list is one of the fastest ways to torch a domain's reputation."] },
      { heading: "Authenticate your domain", paras: ["SPF, DKIM and DMARC are the three records that prove your mail is really yours, and since 2024 they're required for bulk senders to reach Gmail and Yahoo. SPF lists the servers allowed to send for your domain, DKIM cryptographically signs your mail, and DMARC tells receivers what to do with messages that fail — and collects reports so you can see who's sending as you.", "Publish all three, make sure they align, and move your DMARC policy from p=none toward p=reject once you've confirmed your legitimate mail authenticates cleanly. Authentication won't fix a bad list on its own, but without it even a clean list will struggle to reach the inbox."] },
      { heading: "Keep spam complaints low", paras: ["A spam complaint is the strongest negative signal a recipient can send, and providers weigh it heavily. Gmail and Yahoo require bulk senders to keep complaint rates below 0.3%, and ideally under 0.1% — cross that line and your mail starts getting throttled or filtered regardless of how clean your list is otherwise.", "The way to keep complaints low is straightforward: only mail people who genuinely opted in, make unsubscribing effortless with a visible one-click option, and honour opt-outs immediately. A frustrated recipient who can't find the unsubscribe link will hit the spam button instead — which is far worse for you than letting them leave."] },
      { heading: "Warm up new domains and stay consistent", paras: ["A brand-new domain has no reputation, so providers are wary of sudden volume from it. Warming up — ramping volume gradually over a few weeks while sending to your most engaged contacts — is how you build trust from zero without getting filtered on day one.", "Consistency matters beyond warmup, too. Because reputation reflects recent behaviour, a long gap in sending or a sudden spike can unsettle it. Steady, predictable volume to a verified, engaged list is the through-line that keeps your reputation healthy from warmup into steady-state sending."] },
      { heading: "How to monitor and recover your reputation", paras: ["You can't see the exact score, but you can track its proxies. Google Postmaster Tools surfaces domain and IP reputation for Gmail-bound mail; your ESP's bounce, complaint and engagement trends are the fastest day-to-day read; and periodic blocklist checks confirm you're not listed somewhere that hurts delivery.", "If your reputation has slipped, recovery is possible but only by fixing the root cause first. Diagnose what went wrong — usually a bounce spike from an unverified list or a complaint surge from an aggressive campaign — then clean and verify the list, tighten authentication, and pull back to your most engaged subscribers. Re-warm patiently from there. Recovery takes longer than the damage did, which is the best argument for protecting reputation proactively."] },
      { heading: "Engagement is increasingly the deciding signal", paras: ["For years, reputation was mostly about bounces and complaints. Today, mailbox providers lean heavily on engagement — whether recipients open, click, reply, or instead delete without reading and ignore you. Strong engagement tells providers your mail is wanted; weak engagement tells them the opposite, and your placement drifts toward spam accordingly.", "The practical consequence is that a smaller, engaged list beats a larger, indifferent one for reputation. Pruning long-inactive subscribers before they become complaints, and sending relevant mail to people who genuinely want it, actively builds reputation rather than just avoiding harm. Engagement and list quality reinforce each other: a verified list of people who opted in is also the list most likely to engage."] },
      { heading: "Common sender-reputation myths", paras: ["Reputation attracts a lot of folklore, and acting on the myths wastes effort that should go to the fundamentals. One persistent belief is that buying a fresh domain or IP resets a bad reputation. In practice, a brand-new sender starts with no trust and has to warm up from scratch, and providers are wary of sudden volume from unknown sources — so it's rarely the shortcut people hope for.", "Another myth is that clever content tricks — avoiding certain 'spam words' or hiding the unsubscribe link — improve placement. Modern filtering is driven far more by sender behaviour and recipient engagement than by individual words, and hiding the unsubscribe link backfires by pushing frustrated recipients to hit the spam button instead. The unglamorous truth is that reputation is earned through the basics: a verified list, proper authentication, wanted mail, and consistency over time."] },
      { heading: "How long reputation takes to build", paras: ["Building reputation is measured in weeks, not days, because providers want to see a consistent track record before they extend trust. A new domain or IP starts with none at all, which is why warmup — ramping volume slowly while sending to your most engaged contacts — is essential. Pushing high volume from a cold sender is one of the fastest ways to land in spam from day one.", "What 'good' looks like at the end of a warmup is steady inbox placement, a bounce rate comfortably under 2%, complaint rates below 0.1%, and engagement that holds up as volume grows. Because reputation reflects recent behaviour, it also needs maintaining — a long gap in sending or a sudden spike can unsettle it, so consistency is the through-line from warmup into steady-state sending."] },
      { heading: "A pre-send reputation checklist", bullets: ["List verified — invalid and risky addresses removed before this send.", "Authentication green — SPF, DKIM and DMARC all pass and align.", "Bounce rate healthy — comfortably under the ~2% threshold.", "Complaints low — under 0.1%, with a visible one-click unsubscribe in place.", "Engaged audience — sending to people who opted in and have engaged recently.", "Sensible volume — the send fits your normal pattern, not a sudden spike."] },
      { heading: "When to worry about your reputation", paras: ["A few warning signs mean your reputation needs attention now rather than later. A sudden drop in open rates, mail that used to inbox now landing in spam, a spike in bounces or complaints after a particular send, or a notification in Google Postmaster Tools showing your domain reputation slipping — any of these is a signal to pause and diagnose before sending more.", "The instinct to push harder when results dip is exactly wrong here; sending more to a list that's already hurting you accelerates the damage. The right response is to stop, identify the cause — usually an unverified or unengaged list — clean thoroughly, confirm your authentication, and resume gradually to your most engaged contacts. Catching it early, while the dip is small, is the difference between a quick recovery and weeks of rebuilding."] },
      { heading: "Where BounceBlock fits", paras: ["BounceBlock handles the list-quality half of the equation — the foundation everything else sits on. It verifies emails, validates phones and removes duplicates in one upload, so the contacts you send to are real, reachable and deduplicated, and the bounces and spam-trap hits that do the most reputation damage are removed before they can occur.", "Pair that with proper authentication and genuine opt-in, and you've covered the inputs that matter most. Preview your first 100 contacts free to see how clean your list really is before your next send."] },
    ],
  },
];

/** All posts, newest first. */
export const POSTS: BlogPost[] = [...CORE_POSTS, ...POSTS_A, ...POSTS_B].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

/** URL-safe slug for a category label (e.g. "Company & data" → "company-and-data"). */
export function categorySlug(label: string): string {
  return label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Distinct categories with post counts, most-populated first. */
export function getCategories(): { slug: string; label: string; count: number }[] {
  const map = new Map<string, { label: string; count: number }>();
  for (const p of POSTS) {
    const slug = categorySlug(p.category);
    const cur = map.get(slug);
    if (cur) cur.count++;
    else map.set(slug, { label: p.category, count: 1 });
  }
  return [...map.entries()].map(([slug, v]) => ({ slug, ...v })).sort((a, b) => b.count - a.count);
}

export function getCategory(slug: string) {
  return getCategories().find((c) => c.slug === slug);
}

export function postsInCategory(slug: string): BlogPost[] {
  return POSTS.filter((p) => categorySlug(p.category) === slug);
}

/**
 * Internal links from a post to relevant product/tool/glossary pages, keyed by
 * category. Strengthens internal linking from blog content to "money" pages —
 * one of the highest-leverage SEO levers.
 */
type ResLink = { href: string; label: string };
const RESOURCES: Record<string, ResLink[]> = {
  Deliverability: [
    { href: "/glossary/email-deliverability", label: "Email deliverability" },
    { href: "/glossary/sender-reputation", label: "Sender reputation" },
    { href: "/tools/spf-checker", label: "SPF checker" },
    { href: "/tools/dmarc-checker", label: "DMARC checker" },
    { href: "/product/email-verification", label: "Email verification" },
  ],
  "Email verification": [
    { href: "/glossary/email-verification", label: "What is email verification?" },
    { href: "/glossary/catch-all-email", label: "Catch-all email" },
    { href: "/tools/email-verifier", label: "Free email verifier" },
    { href: "/product/bulk-email-verification", label: "Bulk verification" },
  ],
  "Phone validation": [
    { href: "/glossary/phone-validation", label: "Phone validation" },
    { href: "/glossary/line-type", label: "Line type" },
    { href: "/tools/phone-validator", label: "Free phone validator" },
    { href: "/product/phone-verification", label: "Phone verification" },
  ],
  "Company & data": [
    { href: "/glossary/data-enrichment", label: "Data enrichment" },
    { href: "/glossary/firmographics", label: "Firmographics" },
    { href: "/product/company-verification", label: "Company verification" },
    { href: "/product/data-enrichment", label: "Lead & data enrichment" },
  ],
  "Lead gen": [
    { href: "/glossary/list-hygiene", label: "List hygiene" },
    { href: "/tools/bounce-rate-calculator", label: "Bounce-rate calculator" },
    { href: "/product/email-verification", label: "Email verification" },
  ],
};
const DEFAULT_RES: ResLink[] = [
  { href: "/glossary/list-hygiene", label: "List hygiene" },
  { href: "/glossary/bounce-rate", label: "Bounce rate" },
  { href: "/tools/email-verifier", label: "Free email verifier" },
  { href: "/product/email-verification", label: "Email verification" },
];

export function resourcesFor(category: string): ResLink[] {
  return RESOURCES[category] ?? DEFAULT_RES;
}
