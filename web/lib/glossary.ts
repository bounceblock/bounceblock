/** Glossary / "learn" pages (`/glossary/[slug]`). Educational, internally linked. */
export interface GlossaryTerm {
  slug: string;
  term: string;
  short: string;      // one-sentence definition (used as meta description)
  body: string[];     // 2-3 intro paragraphs (lead-in; fallback when no sections)
  related: string[];  // slugs of other terms
  // ── Optional long-form. When present the page renders a full structured
  // article: H2 sections, lists, key takeaways and an FAQ (with schema). ──
  sections?: { heading: string; paras?: string[]; bullets?: string[] }[];
  takeaways?: string[];
  faq?: { q: string; a: string }[];
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "email-verification",
    term: "Email verification",
    short: "The process of checking whether an email address is real and able to receive mail, without sending one.",
    body: [
      "Email verification is the process of confirming that an email address is correctly formatted, that its domain is configured to receive mail, and that the specific mailbox is likely to accept a message — all without actually sending anything. It is how marketing, sales and operations teams remove invalid addresses from a list before a campaign, so those addresses never get the chance to hard-bounce and drag down deliverability.",
      "Every email list decays. People change jobs, abandon old inboxes, mistype addresses on forms, and sign up with throwaway accounts. Industry estimates put that decay at roughly 2–2.5% of a typical B2B list every month, which compounds to a quarter or more of a list going stale within a year. Verification is the routine that counters that decay: it identifies which addresses are still real and reachable so you only spend reputation, budget and effort on contacts that can actually receive your mail.",
    ],
    related: ["bounce-rate", "catch-all-email", "mx-record", "email-deliverability"],
    sections: [
      {
        heading: "How email verification works, step by step",
        paras: [
          "A good verifier doesn't make a single yes/no guess — it runs a sequence of independent checks, each one cheaper and faster than the last would be on its own, and stops escalating as soon as it has a confident answer. The checks build on each other, moving from the format of the address all the way to the behaviour of the receiving mail server.",
        ],
        bullets: [
          "Syntax check — confirms the address is well-formed (a valid local part, an @, and a domain with a real top-level domain) and flags obvious typos like \"gmial.com\".",
          "Domain and MX check — queries DNS to confirm the domain exists and publishes MX (mail exchange) records, meaning it is actually configured to receive email.",
          "Mailbox probe — opens an SMTP conversation with the receiving server and asks whether the specific mailbox exists, without ever delivering a message.",
          "Risk classification — layers in extra signals (disposable domain, role account, catch-all behaviour, known spam traps) to label the address by risk, not just existence.",
        ],
      },
      {
        heading: "What the results mean: valid, invalid, catch-all and unknown",
        paras: [
          "Verification returns a status, not just a flag, because not every address is a clean pass or fail. Understanding the four common outcomes tells you exactly what to do with each contact.",
        ],
        bullets: [
          "Valid — the mailbox exists and is accepting mail. Safe to send.",
          "Invalid — the address is malformed, the domain can't receive mail, or the mailbox doesn't exist. Remove it; sending will hard-bounce.",
          "Catch-all (accept-all) — the domain accepts mail for every address, so a specific mailbox can't be confirmed from the outside. Treat with caution and send mainly to engaged segments.",
          "Unknown — the receiving server was temporarily unreachable or wouldn't answer. Re-check later before deciding.",
        ],
      },
      {
        heading: "Real-time verification vs bulk list cleaning",
        paras: [
          "There are two moments to verify, and mature teams use both. Real-time verification happens through an API at the point of capture — the instant someone submits a signup or lead form — so a bad address is rejected before it ever enters your database. Bulk verification happens in batches: you upload an existing list (a CRM export, an event sheet, a purchased file) and clean it in one pass before a campaign.",
          "The two are complementary. Real-time verification keeps new data clean at the source; bulk verification removes the decay that accumulates in data you already hold. Because the same underlying engine powers both, you get consistent results whether you're checking one address or a million.",
        ],
      },
      {
        heading: "Why it matters: bounce rate and sender reputation",
        paras: [
          "Mailbox providers like Gmail, Outlook and Yahoo decide whether your mail reaches the inbox based partly on how many of your messages bounce. A high bounce rate signals that you're mailing a list you don't maintain, which erodes the sender reputation attached to your domain and IP. Once that reputation drops, even your mail to valid, engaged subscribers starts landing in spam.",
          "Most healthy senders keep their bounce rate at or under roughly 2%. Cold outreach to unverified or purchased lists routinely runs far higher — sometimes 20–30% — which is enough to get throttled or blocked outright. Verifying before every send is the most direct lever you control to keep that number in the safe zone and protect the reputation you've built.",
        ],
      },
      {
        heading: "How accurate is email verification?",
        paras: [
          "Verification is highly accurate for the things it can observe directly: syntax errors, dead domains, missing MX records and non-existent mailboxes are caught reliably. Where certainty drops is with catch-all domains, where the server accepts everything and genuinely won't reveal whether a single mailbox exists — there, the honest answer is \"catch-all,\" not a false \"valid.\"",
          "A trustworthy verifier is transparent about that uncertainty rather than guessing. It returns catch-all and unknown statuses where appropriate and combines existence checks with risk signals, so you get a realistic picture instead of false confidence. Pairing verification with engagement data (who actually opens and clicks) closes most of the remaining gap.",
        ],
      },
      {
        heading: "Best practices: when and how often to verify",
        bullets: [
          "Verify at the point of capture with an API or form guard, so bad addresses never enter your system.",
          "Re-verify any list before a major campaign — especially cold, purchased or event lists.",
          "Re-check contacts older than about a quarter, since data decays continuously.",
          "Suppress, don't just delete, hard-bounced and repeatedly unengaged addresses so they don't creep back in.",
          "Verify email and phone together where you do both call and email outreach, so one clean record covers every channel.",
        ],
      },
      {
        heading: "Common email verification mistakes",
        paras: [
          "Most of the value in verification is lost not because the tool is wrong, but because of how teams use it. A few avoidable mistakes account for the majority of bounces that slip through even on lists that were technically \"verified.\"",
        ],
        bullets: [
          "Verifying once and never again — a list cleaned six months ago has already decayed by 10–15%; verification is a recurring habit, not a one-off.",
          "Treating every catch-all as valid — catch-all addresses can bounce after acceptance, so lumping them in with confirmed-valid contacts quietly inflates bounce rate.",
          "Cleaning after import instead of at capture — letting bad addresses into the CRM first means you also pay to store, sync and market to them before removing them.",
          "Ignoring role and disposable flags — a syntactically valid info@ or burner address still drags down engagement and should be handled deliberately.",
          "Deleting bad addresses instead of suppressing them — without a suppression list, the same bad address re-enters from the next import.",
        ],
      },
      {
        heading: "Where verification fits in your stack",
        paras: [
          "Verification isn't a standalone chore; it's a layer that plugs into the systems you already run. At the front door, an API or form guard verifies addresses the moment they're submitted on a signup, lead or checkout form, so your database stays clean at the source. In the middle, scheduled bulk verification cleans CRM and marketing-platform lists on a recurring cadence. And before any major campaign, a final pre-send pass catches whatever decayed since the last clean.",
          "Done well, the result is that verification becomes invisible: bad addresses simply never accumulate. The same engine that gates your forms cleans your lists and powers your pre-send checks, so a contact that's marked valid in your CRM means the same thing everywhere. That consistency is what lets sales, marketing and operations trust the data instead of second-guessing it.",
        ],
      },
      {
        heading: "How much does email verification cost, and is it worth it?",
        paras: [
          "Pricing usually follows one of two models. The traditional model sells verification credits — you buy a pack and spend one credit per address checked — which is predictable for one-off cleans but penalises you for verifying often, exactly the behaviour that keeps a list healthy. The alternative is a flat subscription that includes a generous monthly allowance, so re-verifying regularly doesn't cost you more each time.",
          "On the question of whether it's worth it, the maths is usually decisive. A single send to an unverified list can spike bounces, damage the sender reputation you've spent months building, and drop your inbox placement for every subsequent campaign — costs that dwarf the price of verification. When you weigh the wasted sends, the skewed analytics and the reputation risk against a few dollars per thousand addresses, verifying almost always pays for itself on the first campaign.",
          "The most cost-effective setup verifies email, phone and company together in one pass rather than buying three separate tools. One clean record then serves every channel — email, calls and SMS — which is both cheaper and simpler than stitching point solutions together.",
        ],
      },
    ],
    takeaways: [
      "Email verification checks whether an address is real and deliverable without sending a message.",
      "It runs in stages: syntax, domain/MX, mailbox probe, then risk classification.",
      "Results come back as valid, invalid, catch-all or unknown — each tells you what to do.",
      "The payoff is a low bounce rate and a protected sender reputation.",
      "Verify at capture, before every send, and again as data ages.",
    ],
    faq: [
      { q: "How can you verify an email without sending one?", a: "A verifier opens an SMTP conversation with the receiving mail server and asks whether the mailbox exists, then ends the conversation before any message is delivered. Combined with DNS and MX checks, that's enough to judge deliverability without the recipient ever seeing anything." },
      { q: "Is email verification 100% accurate?", a: "It's highly accurate for syntax, dead domains and non-existent mailboxes. The unavoidable grey area is catch-all domains, which accept mail for every address and won't confirm a specific mailbox. A good verifier reports those as 'catch-all' rather than guessing." },
      { q: "Does a 'valid' result mean the email will convert?", a: "No — valid means the address exists and can receive mail. Whether the person engages depends on your content, targeting and permission. Verification protects deliverability; it doesn't replace relevance." },
      { q: "How often should I verify my list?", a: "Verify new contacts at capture, clean any list before a major send, and re-verify the whole list at least quarterly because contact data decays by roughly 2–2.5% every month." },
      { q: "What's the difference between bulk and real-time verification?", a: "Bulk verification cleans an existing list in one batch; real-time verification checks a single address live via an API, usually at signup. Most teams use both — real-time to stay clean, bulk to remove accumulated decay." },
      { q: "Is email verification GDPR-compliant?", a: "Verifying addresses you already collected lawfully is generally a legitimate data-quality activity. Choose a provider that processes data securely, deletes uploaded files promptly, and doesn't sell or reuse your list — and verification supports compliance by keeping your data accurate." },
    ],
  },
  {
    slug: "catch-all-email",
    term: "Catch-all email",
    short: "A domain configured to accept mail for every address, so a verifier can't confirm a specific mailbox exists.",
    body: [
      "A catch-all (also called accept-all) domain is configured to accept email sent to any address at that domain, whether or not the mailbox actually exists. Send to valid@company.com and it's accepted; send to asdfghjkl@company.com and it's accepted too. Because the receiving server says yes to everything, no outside checker can confirm whether a specific mailbox is real — so an email verifier returns a \"catch-all\" status instead of a definite valid or invalid.",
      "Catch-all is one of the most misunderstood results in email verification. It is not a sign that an address is fake, and it is not a guarantee that it's real — it simply means the domain won't tell you. That ambiguity is exactly why catch-all addresses need their own handling strategy rather than being lumped in with confirmed-valid contacts.",
    ],
    related: ["email-verification", "email-deliverability", "bounce-rate", "role-based-email"],
    sections: [
      {
        heading: "What makes a domain catch-all",
        paras: [
          "A catch-all domain has its mail server set up to receive everything addressed to it and sort out what to do with each message internally, rather than rejecting unknown recipients at the door. Many organisations do this deliberately, and for good reasons.",
        ],
        bullets: [
          "To avoid losing mail sent to a mistyped but recoverable address (jon.smith@ instead of john.smith@).",
          "To capture messages to former employees or discontinued departments and route them to a shared inbox.",
          "As a side effect of how some hosted email and security gateways are configured by default.",
          "To make address harvesting harder, since attackers can't probe which mailboxes exist.",
        ],
      },
      {
        heading: "Why catch-all addresses are risky to email",
        paras: [
          "The risk is uncertainty. Within a catch-all domain, some addresses lead to real, monitored mailboxes and some lead nowhere — and the server accepts both at the SMTP layer. A message to a non-existent mailbox may be silently discarded, or it may bounce later when the internal system processes it, after the receiving server already told you \"accepted.\"",
          "That delayed-bounce behaviour is what makes catch-alls dangerous at scale. You can send to a list of catch-all addresses, see them accepted, and only discover days later that a chunk of them bounced — by which time the damage to your sender reputation is already done. Treating every catch-all as valid is one of the most common ways a clean-looking list quietly inflates a bounce rate.",
        ],
      },
      {
        heading: "How verifiers detect catch-all behaviour",
        paras: [
          "A verifier identifies a catch-all by testing the domain's honesty. It probes the mail server with an address that almost certainly doesn't exist — a random string mailbox. If the server accepts that obviously-fake address, the domain is accepting everything, so it's flagged catch-all. If the server rejects the fake address but accepts a real one, the domain is giving honest answers and individual mailboxes can be confirmed.",
          "This is why the same verification engine can return a confident \"valid\" for one domain and only \"catch-all\" for another: it depends entirely on whether the receiving server is willing to distinguish real mailboxes from fake ones.",
        ],
      },
      {
        heading: "Should you email catch-all addresses?",
        paras: [
          "Cautiously, and selectively — not never, and not freely. A blanket cold blast to catch-all addresses is risky because you can't predict the bounce rate. But excluding every catch-all wholesale can mean dropping a large share of legitimate B2B contacts, since many corporate domains are catch-all by policy.",
          "The pragmatic approach is to score and segment them. Send to catch-all addresses that show other positive signals (engaged history, a non-role local part, a domain with valid MX and clean authentication) and hold back the rest. Warm them through engaged segments first, watch the bounce behaviour, and promote the ones that prove deliverable.",
        ],
        bullets: [
          "Do send to catch-alls in engaged, opted-in segments where you have prior interaction.",
          "Don't include unknown catch-alls in a large cold campaign that could spike bounces.",
          "Weight catch-all lower in any lead-quality or send-priority score rather than discarding outright.",
        ],
      },
      {
        heading: "Reducing catch-all risk across your list",
        paras: [
          "Because catch-all is a property of the domain, not something you can fix on a single address, the goal is risk management rather than elimination. Combine verification status with engagement and authentication signals, send conservatively to start, and let real-world results tell you which catch-all contacts are safe. Over time this turns an ambiguous bucket into a scored, send-ready segment.",
        ],
      },
      {
        heading: "A worked example: the same address on two domains",
        paras: [
          "Imagine you're verifying jane.doe@ on two different company domains. On the first, the mail server rejects an obviously fake address (xqz123@firstco.com) but accepts jane.doe@ — so the verifier can confidently say the mailbox exists and returns valid. On the second, the server accepts both jane.doe@ and the fake xqz123@secondco.com — so it can only return catch-all, even though Jane's mailbox may be perfectly real.",
          "Identical name, identical intent, two different answers — purely because of how each receiving server is configured. This is why a catch-all result tells you about the domain's behaviour, not about the person. Treating the second Jane as \"bad\" would wrongly discard a real contact; treating her as confidently \"good\" would ignore real bounce risk. The right move is to score her with the additional signals you do have.",
        ],
      },
      {
        heading: "Catch-all and modern B2B email",
        paras: [
          "Catch-all is especially common in B2B, where many companies run accept-all configurations on their corporate domains for legitimate operational reasons. That means a B2B list cleaned with a naive \"drop everything that isn't confirmed valid\" rule can lose a large share of genuinely reachable decision-makers — an expensive over-correction.",
          "The practical consequence is that B2B senders need a catch-all strategy, not a catch-all filter. Layer the catch-all status together with firmographic and engagement data: a catch-all address at a target-account domain, attached to a named contact who has engaged before, is very different from a catch-all at an unknown domain with no history. Verification gives you the status; your scoring model decides what to do with it. That combination is what separates a list that's merely \"clean\" from one that's actually optimised for both deliverability and reach.",
        ],
      },
      {
        heading: "Catch-all and your bounce rate: what actually happens",
        paras: [
          "The reason catch-all deserves careful handling comes down to timing. When you send to a catch-all domain, the receiving server accepts the message at the SMTP layer — your email platform records it as delivered. Only later, when the domain's internal mail system tries to route the message to a mailbox that doesn't exist, does it generate a bounce, sometimes hours or a day after the fact.",
          "That lag is what makes catch-alls deceptive. A campaign can show a healthy delivered count at send time and then accumulate delayed bounces that quietly push your real bounce rate up. Because mailbox providers judge you on those eventual failures, a batch of bad catch-alls can damage reputation even though the initial send looked clean. This is precisely why treating every catch-all as a confirmed valid is one of the most common hidden causes of a creeping bounce rate.",
          "The takeaway isn't to fear catch-alls, but to account for their delayed behaviour: send to them in controlled segments, watch the bounce reports over the days that follow, and let that real evidence — not the optimistic send-time number — tell you which catch-all contacts are safe to keep mailing.",
        ],
      },
      {
        heading: "Building a catch-all sending policy",
        paras: [
          "A repeatable policy beats case-by-case guessing. The simplest effective approach sorts catch-all addresses into tiers and treats each tier differently, so you capture the upside of real contacts while containing the downside of the fake ones.",
        ],
        bullets: [
          "Tier 1 — catch-all addresses with prior engagement or at a known target account: include in normal sends.",
          "Tier 2 — catch-all addresses with supporting signals (named contact, valid MX, clean authentication) but no history: send in smaller, monitored batches first.",
          "Tier 3 — catch-all addresses with no other positive signal: hold back from large campaigns, or test in a tiny seed batch before committing.",
          "Across all tiers — weight catch-all lower in lead-priority scoring and review bounce reports after each send to promote or demote addresses between tiers.",
        ],
      },
    ],
    takeaways: [
      "A catch-all domain accepts mail for every address, real or not.",
      "Verifiers return 'catch-all' because the server won't confirm individual mailboxes.",
      "Catch-all isn't fake or valid — it's unknown, and can bounce after acceptance.",
      "Detection works by probing the server with a random, almost-certainly-fake address.",
      "Score and segment catch-alls rather than blindly sending to — or dropping — them all.",
    ],
    faq: [
      { q: "Does catch-all mean the email is fake?", a: "No. It means the domain accepts mail for every address, so no external checker can confirm whether that specific mailbox exists. Some catch-all addresses are perfectly real; the domain just won't reveal which." },
      { q: "Is it safe to send to catch-all addresses?", a: "Selectively. Send to catch-alls that show other positive signals or prior engagement, and hold unknown ones back from large cold campaigns where a hidden bounce spike could hurt your reputation." },
      { q: "Why does one domain verify cleanly and another only as catch-all?", a: "It depends on the receiving server. Honest servers reject fake mailboxes, so real ones can be confirmed as valid. Catch-all servers accept everything, leaving the verifier no way to distinguish real from fake." },
      { q: "How do I lower the risk from catch-all contacts?", a: "Combine the catch-all status with engagement history and authentication signals, send conservatively at first, and watch the actual bounce behaviour before scaling up to that segment." },
      { q: "Should I just remove all catch-all addresses to be safe?", a: "Usually no — especially in B2B, where many legitimate corporate domains are catch-all by policy. Removing them all can drop a large share of real decision-makers. Score and segment them instead of deleting wholesale." },
      { q: "Do catch-all addresses count as deliverable?", a: "They're uncertain, not deliverable. The server accepts mail for every address, so some catch-alls are real and some aren't — and the fake ones can bounce after acceptance. Treat them as a separate, scored category rather than as confirmed-valid." },
      { q: "Are catch-all domains more common in B2B or B2C?", a: "Far more common in B2B. Many companies run accept-all configurations on their corporate domains, while consumer mailbox providers like Gmail and Outlook reject non-existent addresses, so they verify cleanly." },
      { q: "What status should I assign a catch-all in my CRM?", a: "Keep it as its own status — 'catch-all' or 'accept-all' — rather than folding it into valid or invalid. That preserves the uncertainty so your sending rules and lead scoring can treat it as a distinct, lower-confidence category." },
      { q: "Can email verification ever confirm a catch-all mailbox?", a: "Not from the outside, because the server accepts every address. The only ways to gain confidence are indirect: prior engagement from that contact, or sending a controlled test and watching for a delayed bounce. Verification reports the catch-all status honestly rather than guessing." },
    ],
  },
  {
    slug: "disposable-email",
    term: "Disposable email",
    short: "A temporary, throwaway address from a service designed to self-destruct after short-term use.",
    body: [
      "A disposable email address (also called a temporary, throwaway or burner address) comes from a service that hands out short-lived inboxes on demand. Someone uses one to grab a lead magnet, claim a free trial, or get past a registration wall without handing over their real address — then the inbox expires, often within minutes or hours, and is never checked again.",
      "Disposable addresses look valid on the surface: they have correct syntax, a working domain, and a live mailbox at the moment of signup, so a basic check passes them. The problem is that they're engineered to be abandoned. They never convert, never engage, and quietly corrupt the metrics you use to judge a campaign — which is why detecting and filtering them at the point of capture matters as much as catching outright-invalid addresses.",
    ],
    related: ["role-based-email", "email-verification", "form-guard", "list-hygiene"],
    sections: [
      {
        heading: "How disposable email services work",
        paras: [
          "Disposable email providers run public, no-signup inboxes on a rotating set of domains. A visitor opens the site, is handed a random address on one of those domains, receives whatever confirmation or magnet they came for, and walks away. The inbox self-destructs on a timer, and the domain is recycled for the next visitor.",
          "Because these services constantly add and retire domains to evade blocklists, there is no fixed, final list of disposable domains. New ones appear every week. That moving target is the central challenge of disposable detection and the reason a one-time, hard-coded list goes stale quickly.",
        ],
      },
      {
        heading: "Why disposable signups hurt your business",
        paras: [
          "Disposable addresses cost you in ways that don't show up until later. They inflate your signup numbers with people who were never going to become customers, then vanish — leaving you to pay for, store, and market to records that can never respond.",
        ],
        bullets: [
          "They never convert: the inbox is gone before your nurture sequence even starts.",
          "They distort metrics: open and click rates, conversion rates and list growth all look different from reality.",
          "They enable abuse: free trials, referral bonuses and promo codes get farmed with throwaway accounts.",
          "They waste spend: every disposable record still costs sending volume, storage and CRM seats.",
          "They can hurt deliverability: when a temporary inbox expires, later sends to it bounce.",
        ],
      },
      {
        heading: "How disposable detection works",
        paras: [
          "Detection works primarily by matching the address's domain against a continuously updated list of known disposable providers. Because new domains appear constantly, the quality of detection depends heavily on how fresh and how broad that list is — a stale list misses the newest throwaway services.",
          "Strong detection doesn't stop at the list. It combines domain matching with other risk signals — newly registered domains, patterns common to burner services, and the absence of any real organisation behind the domain — so that even unlisted disposable domains can be flagged by behaviour rather than by name alone.",
        ],
      },
      {
        heading: "Disposable vs other risky address types",
        paras: [
          "Disposable is one of several risk categories a verifier tracks, and it's worth distinguishing from its neighbours because each calls for a different response.",
        ],
        bullets: [
          "Disposable vs invalid — a disposable address is technically valid at signup; an invalid one never works at all.",
          "Disposable vs free webmail — a Gmail or Outlook address is free but durable and real; disposable addresses are designed to disappear.",
          "Disposable vs role-based — a role account (info@, sales@) is a shared but genuine mailbox; disposable is throwaway by design.",
          "Disposable vs catch-all — catch-all is about the domain accepting everything; disposable is about the address being deliberately temporary.",
        ],
      },
      {
        heading: "How to block disposable emails at signup",
        paras: [
          "The most effective place to stop disposable addresses is the form itself, in real time, before the record is ever created. A form guard or verification API checks the address the instant it's submitted and rejects or flags known disposable domains — so your CRM stays clean at the source instead of needing a cleanup later.",
          "For lists you already hold, a bulk verification pass identifies and removes disposable addresses that slipped in before you had front-door protection. Combining both — real-time blocking going forward and a one-time cleanup of existing data — gets you to a list where the signups you're paying attention to are the ones that can actually become customers.",
        ],
      },
      {
        heading: "The real cost of a single disposable signup",
        paras: [
          "It's tempting to dismiss one throwaway signup as harmless, but the cost compounds quietly across your whole funnel. That single record consumes a contact slot in your CRM (which you often pay for per seat or per contact), takes up sending volume in every campaign it's included in, and skews the denominator of every rate you calculate — so your open rate, click rate and conversion rate all read lower than the truth.",
          "Multiply that by the volume a popular lead magnet or free trial attracts, and disposable signups can distort the numbers you use to make budget decisions. If 15% of a campaign's recipients were never reachable, the campaign looks worse than it performed — and you might cut something that's actually working. Filtering disposables isn't about being strict for its own sake; it's about making sure the metrics you steer by reflect real, reachable people.",
        ],
      },
      {
        heading: "Disposable detection and false positives",
        paras: [
          "A fair question with any blocklist-based system is whether legitimate users get caught in it. Well-built disposable detection minimises false positives by being precise about what counts as disposable: it targets domains whose entire purpose is temporary, throwaway inboxes — not free webmail providers like Gmail or Outlook, which are durable and used by real people every day.",
          "The trade-off to manage is freshness versus caution. Block too aggressively and you risk rejecting an unusual-but-real domain; block too loosely and new burner services slip through. The strongest approach treats the clearest disposable domains as hard blocks and softer signals as flags for review rather than outright rejection — so you stop the obvious throwaways while giving genuine edge cases a path through. As with catch-all, the goal is an informed decision per address, not a blunt all-or-nothing rule.",
        ],
      },
      {
        heading: "Disposable email, fraud and abuse prevention",
        paras: [
          "Disposable addresses aren't only a marketing-quality problem; they're a favourite tool for abuse. Because they're free, instant and untraceable, they let one person create unlimited accounts — which is exactly what's needed to farm free trials, claim signup bonuses repeatedly, stack referral rewards, or pass the email-confirmation step on fake accounts at scale.",
          "For any product with a free tier, a referral program, or promotional credits, unfiltered disposable signups translate directly into lost revenue and distorted growth metrics. Ten thousand \"new users\" mean very little if a large share are throwaway accounts created to exploit an offer. Blocking disposable domains at registration is therefore as much a fraud-prevention control as a list-quality one — it raises the cost of creating throwaway accounts and protects the unit economics of anything you give away.",
          "The same real-time check that keeps your marketing list clean does double duty here: rejecting disposable domains at the signup form stops abuse before an account exists, which is far cheaper than detecting and clawing it back afterward.",
        ],
      },
      {
        heading: "Disposable, temporary and burner: are they the same?",
        paras: [
          "The terms disposable, temporary, throwaway and burner are used more or less interchangeably for the same thing: an address from a service that hands out short-lived public inboxes designed to be abandoned. There's no meaningful technical difference between them — they all describe an address that isn't meant to last.",
          "What's worth distinguishing is the newer category of email-masking and forwarding services, such as Apple's Hide My Email or address aliases from privacy-focused providers. These look superficially similar — they generate an unusual-looking address — but they're fundamentally different: the alias forwards to a real, durable mailbox the person actually monitors, so mail genuinely reaches them. Good detection treats these masked-but-real addresses differently from true disposables, because blocking a privacy-conscious customer who used an Apple relay would mean turning away a real, reachable person. The distinction matters: disposable means abandoned, while masked means forwarded to someone who's really there.",
        ],
      },
    ],
    takeaways: [
      "Disposable emails are temporary inboxes designed to be abandoned after one use.",
      "They pass basic checks because they're valid at signup, then never engage or convert.",
      "Detection relies on a continuously updated domain list plus behavioural risk signals.",
      "They inflate signups, skew metrics, enable trial abuse and waste spend.",
      "Block them at the form in real time, and clean existing lists in bulk.",
    ],
    faq: [
      { q: "Why can't a basic check catch disposable emails?", a: "Disposable addresses have valid syntax, a working domain and a live mailbox at signup, so a format check passes them. Catching them requires matching the domain against an up-to-date list of disposable providers plus behavioural risk signals." },
      { q: "Do disposable email domains change often?", a: "Constantly. Providers add and retire domains to evade blocklists, so detection quality depends on how fresh the reference list is. A static, one-time list goes out of date quickly." },
      { q: "Is a Gmail or Yahoo address disposable?", a: "No. Free webmail addresses are durable and real — people keep them for years. Disposable addresses come from services built specifically to hand out temporary inboxes that self-destruct." },
      { q: "What's the best way to stop disposable signups?", a: "Verify at the point of capture with a form guard or API so disposable domains are rejected before the record is created, and run a bulk verification pass to remove ones already in your list." },
      { q: "Can users get around a disposable email blocker?", a: "A determined user can find a domain you haven't listed yet, which is why detection has to stay continuously updated and combine the domain list with behavioural signals. The goal is to raise the effort enough that casual abuse stops, not to claim it's impossible." },
      { q: "Does blocking disposable emails reduce my signups?", a: "It reduces your signup count, but only by removing people who were never reachable or going to convert. Real signups are unaffected, and your engagement and conversion rates become more accurate once throwaway accounts are filtered out." },
      { q: "Is a masked address like Apple's Hide My Email disposable?", a: "No. Masking and forwarding services route to a real, durable mailbox the person actually monitors, so mail genuinely reaches them. Good detection treats these differently from true disposables, which are designed to be abandoned." },
      { q: "Do disposable emails hurt my sender reputation?", a: "Indirectly, yes. When a temporary inbox expires, later sends to it bounce, and those bounces erode reputation like any other. Filtering disposables at signup keeps them out of your sending list before they can cause that damage." },
      { q: "Which businesses see the most disposable signups?", a: "Anything with a valuable free offer: free trials, lead magnets, gated content, referral bonuses and promo credits all attract throwaway accounts. The more enticing the thing behind the email gate, the more disposable signups you'll see — and the more value real-time filtering adds." },
    ],
  },
  {
    slug: "hard-vs-soft-bounce",
    term: "Hard bounce vs soft bounce",
    short: "A hard bounce is a permanent delivery failure; a soft bounce is a temporary one.",
    body: [
      "When an email can't be delivered, the receiving mail server sends back a bounce — a non-delivery report explaining why. Those bounces split into two categories that demand very different responses: hard bounces, which are permanent failures, and soft bounces, which are temporary. Telling them apart is one of the most important habits in list management, because confusing the two either keeps dead addresses on your list or wrongly discards recoverable ones.",
      "The distinction matters because mailbox providers watch your bounces closely. A pattern of permanent failures tells Gmail, Outlook and Yahoo that you're mailing a list you don't maintain — and that perception quietly moves your future mail from the inbox to the spam folder. Knowing which bounces to act on, and how fast, is what keeps that from happening.",
    ],
    related: ["bounce-rate", "sender-reputation", "email-deliverability", "email-verification"],
    sections: [
      {
        heading: "What a hard bounce is",
        paras: [
          "A hard bounce is a permanent delivery failure: the receiving server is telling you this address will never accept your mail, so don't try again. Hard bounces are the ones that damage reputation, and the addresses behind them should be removed from active sending immediately.",
        ],
        bullets: [
          "The mailbox doesn't exist — a typo, a former employee, or a made-up address.",
          "The domain doesn't exist or has no mail servers (no MX records).",
          "The mailbox has been closed or permanently disabled.",
          "The receiving server has blocked your domain or IP outright.",
        ],
      },
      {
        heading: "What a soft bounce is",
        paras: [
          "A soft bounce is a temporary failure: the address is real, but the message couldn't be delivered right now. Mail systems treat soft bounces as retryable and will usually attempt redelivery over a period of hours or days before giving up.",
        ],
        bullets: [
          "The mailbox is full and temporarily can't accept new mail.",
          "The receiving server is down, overloaded or rate-limiting you.",
          "The message is too large for the recipient's limits.",
          "The send was temporarily deferred (greylisted) as an anti-spam measure.",
        ],
      },
      {
        heading: "Why hard bounces are so dangerous",
        paras: [
          "Hard bounces are a direct, fast-acting signal of poor list hygiene. Because a hard bounce can only happen when you mail an address that was never reachable, a cluster of them tells mailbox providers you're sending to a list you haven't verified. Even a low single-digit hard-bounce percentage is enough to drag down the sender reputation attached to your domain and IP.",
          "The knock-on effect is what makes them costly: once reputation drops, your deliverability falls for everyone on the list, including your most engaged subscribers. A single careless send to an old, unverified list can undo months of carefully built reputation, which is why hard-bounced addresses should be suppressed the moment they're identified.",
        ],
      },
      {
        heading: "How to handle each type",
        paras: [
          "The two bounce types call for opposite reflexes. Hard bounces should be removed (suppressed) immediately and permanently — never mail them again. Soft bounces should be monitored: let your email platform retry, and only treat an address as dead once it has soft-bounced repeatedly across several sends, at which point it behaves like a hard bounce and should be suppressed too.",
          "Suppression is better than deletion. Keep hard-bounced addresses on a do-not-send list rather than simply deleting the record, so the same bad address can't be re-imported from another source and quietly re-enter your sending.",
        ],
        bullets: [
          "Hard bounce → suppress immediately; never retry.",
          "Soft bounce → allow automatic retries; investigate if it persists.",
          "Repeated soft bounces (e.g. across 3+ sends) → treat as hard and suppress.",
          "Always suppress rather than delete, to stop bad addresses creeping back in.",
        ],
      },
      {
        heading: "Preventing bounces before they happen",
        paras: [
          "The cheapest bounce is the one that never occurs. Verifying a list before you send removes the non-existent mailboxes and dead domains that cause hard bounces, so they're gone before they can register against your reputation. Verification can't prevent every soft bounce — a full mailbox or a momentary server outage is outside your control — but it eliminates the permanent failures that actually do the damage.",
          "Pairing pre-send verification with disciplined suppression of the bounces you do receive keeps your bounce rate in the safe zone (generally at or under about 2%) and your sender reputation intact over the long run.",
        ],
      },
      {
        heading: "How to read a bounce code",
        paras: [
          "Every bounce carries a status code that tells you why it failed, and learning to read them turns a vague \"it bounced\" into a clear action. Mail servers use three-digit SMTP reply codes, often with a more precise enhanced status code attached. The leading digit is the quickest tell of whether you're looking at a hard or soft failure.",
        ],
        bullets: [
          "5.x.x codes (e.g. 550 \"no such user\") are permanent failures — hard bounces. Suppress the address.",
          "4.x.x codes (e.g. 452 \"mailbox full\", 421 \"service unavailable\") are temporary — soft bounces. Allow retries.",
          "5.1.1 specifically means the mailbox doesn't exist — a textbook hard bounce.",
          "Block-style 5xx messages mentioning reputation or spam mean the receiver is refusing you, which is a reputation problem to fix, not just an address to drop.",
        ],
      },
      {
        heading: "Automating bounce handling in your platform",
        paras: [
          "Reading codes by hand doesn't scale, so the goal is to let your email platform act on them automatically. Most email service providers parse bounce codes for you and maintain a suppression list, automatically removing hard-bounced addresses from future sends. The important thing is to make sure that automation is switched on and that suppression is shared across your tools — a hard bounce caught by your ESP should also be reflected in your CRM, or the same address gets re-imported and re-sent.",
          "Where automation still needs a human decision is the boundary cases: how many consecutive soft bounces should trigger suppression (commonly three to five across separate sends), and what to do with addresses that bounce for reputation reasons rather than non-existence. Setting those rules once, and feeding verification in ahead of the send so fewer bounces happen at all, turns bounce handling from a reactive cleanup into a quiet, automatic safeguard.",
        ],
      },
      {
        heading: "What bounce rate is acceptable, and how to calculate it",
        paras: [
          "Bounce rate is simply the share of your sent messages that bounced: divide the number of bounces by the number of emails sent, then multiply by 100. If you sent 10,000 emails and 200 bounced, that's a 2% bounce rate. It's worth tracking hard and soft bounces separately, because the hard-bounce figure is the one that maps most directly to list quality and reputation risk.",
          "As a rule of thumb, most healthy senders keep their total bounce rate at or under about 2%, and their hard-bounce rate well below that. Climb past a few percent and mailbox providers start to read it as a sign you're not maintaining your list, which invites throttling and spam-foldering. Cold outreach to unverified or purchased lists routinely blows past these thresholds — sometimes 20–30% — which is enough to do real, lasting reputation damage in a single send.",
          "The practical implication is that bounce rate is a lagging indicator you can control in advance. By verifying a list before you send, you remove the addresses that would have bounced, so the rate you report stays in the safe zone by design rather than by luck.",
        ],
      },
      {
        heading: "Bounces vs blocks vs deferrals",
        paras: [
          "Not every failed delivery is a bounce in the list-hygiene sense, and conflating them leads to the wrong fix. A true bounce relates to the address or mailbox: it doesn't exist (hard) or it's temporarily unavailable (soft). A block is different — the receiving server is refusing your mail because of who you are, citing reputation, a blocklist, or content, even though the address itself may be perfectly valid.",
          "A deferral (greylisting) is different again: the server is asking you to try again shortly as an anti-spam tactic, and legitimate mail is usually accepted on the retry. Reading these apart matters because the remedy differs. A surge of hard bounces means clean your list; a surge of blocks means investigate your reputation, authentication or content; a wave of deferrals usually resolves itself on retry. Verification fixes the first category at the source, which also indirectly helps the second by keeping the bounce-driven reputation damage that triggers blocks from happening in the first place.",
        ],
      },
    ],
    takeaways: [
      "A hard bounce is permanent; a soft bounce is temporary and retryable.",
      "Hard bounces signal poor list hygiene and damage sender reputation fast.",
      "Suppress hard bounces immediately; let soft bounces retry, then suppress if they persist.",
      "Suppress rather than delete so bad addresses can't be re-imported.",
      "Verifying before a send removes the addresses that cause hard bounces in the first place.",
    ],
    faq: [
      { q: "What's the main difference between a hard and soft bounce?", a: "A hard bounce is a permanent delivery failure (the address or domain doesn't exist, or you're blocked), while a soft bounce is temporary (a full mailbox, a server outage, an oversized message). Hard bounces should be removed; soft bounces are retried." },
      { q: "How many hard bounces are too many?", a: "Even a low single-digit percentage is risky. Most healthy senders keep their total bounce rate at or under about 2%, and hard bounces in particular should be suppressed immediately because they damage reputation quickly." },
      { q: "Should I delete hard-bounced addresses?", a: "Suppress them rather than delete them. Keeping them on a do-not-send list prevents the same bad address from being re-imported from another source and re-entering your sending." },
      { q: "Can I prevent bounces entirely?", a: "You can eliminate most hard bounces by verifying your list before every send, which removes non-existent mailboxes and dead domains. Some soft bounces (a full inbox, a momentary outage) are outside your control." },
      { q: "What does a 550 bounce code mean?", a: "550 is a permanent rejection — a hard bounce. Often it's '550 no such user' (the mailbox doesn't exist), but it can also signal that the receiver is blocking you for reputation reasons. Check the accompanying text: a missing mailbox means suppress; a reputation block means investigate." },
      { q: "How many soft bounces before I remove an address?", a: "A common rule is to suppress after three to five consecutive soft bounces across separate sends. By that point the address is behaving like a permanent failure, even if each individual attempt was technically temporary." },
      { q: "Do bounces affect my sender reputation?", a: "Hard bounces do, significantly — they signal you're mailing an unmaintained list, which is one of the fastest ways to lose reputation. Soft bounces have little effect unless they persist. This is why hard-bounced addresses should be suppressed immediately." },
    ],
  },
  {
    slug: "sender-reputation",
    term: "Sender reputation",
    short: "A trust score mailbox providers assign to your sending domain and IP that decides inbox vs spam.",
    body: [
      "Sender reputation is the trust score that mailbox providers — Gmail, Outlook, Yahoo and the rest — assign to the domain and IP address you send from. It isn't a single published number; it's an internal, continuously updated judgement based on how recipients react to your mail and how well you follow sending norms. That judgement is the single biggest factor in whether your messages reach the inbox or get filtered to spam.",
      "Think of it as credit for email. It takes consistent, careful behaviour over time to build, and it can be damaged quickly by a few bad sends. The good news is that the inputs are mostly within your control, and the most powerful one — list quality — is also the easiest to manage with verification.",
    ],
    related: ["spam-trap", "bounce-rate", "email-deliverability", "dmarc"],
    sections: [
      {
        heading: "What shapes your sender reputation",
        paras: [
          "Providers weigh a basket of signals, and no single one tells the whole story. But a handful carry most of the weight, and they all trace back to whether you're mailing people who want your email.",
        ],
        bullets: [
          "Bounce rate — frequent hard bounces signal an unmaintained list and hurt reputation fast.",
          "Spam complaints — recipients marking you as spam is one of the most damaging signals; Gmail and Yahoo expect this kept under 0.3%, ideally below 0.1%.",
          "Engagement — opens, clicks and replies tell providers people want your mail; deletions-without-reading and ignored messages say the opposite.",
          "Spam-trap hits — landing on trap addresses is a strong indicator of poor list hygiene.",
          "Authentication — properly published SPF, DKIM and DMARC records prove your mail is really yours.",
          "Sending consistency — steady, predictable volume builds trust; sudden spikes look like compromise or spam.",
        ],
      },
      {
        heading: "Domain reputation vs IP reputation",
        paras: [
          "Reputation actually has two layers. IP reputation is tied to the server address your mail leaves from; domain reputation is tied to the domain in your From address and your authentication. Both matter, but domain reputation has become the more durable and important of the two, because it follows you even if you change sending infrastructure.",
          "Your IP situation also shapes risk. On a shared IP, you inherit the reputation of everyone else sending from it — good or bad. On a dedicated IP, the reputation is entirely yours to build and protect, which is powerful but requires enough consistent volume to establish trust in the first place.",
        ],
      },
      {
        heading: "Why list quality is the foundation",
        paras: [
          "Most of the signals that damage reputation — hard bounces and spam-trap hits especially — come straight from mailing addresses you shouldn't have mailed. That's why list quality sits underneath everything else. You can authenticate perfectly and send beautiful content, but if a meaningful share of your list is invalid or unengaged, the reputation hit follows anyway.",
          "Verifying your list before every send is the most direct lever here. It removes the non-existent mailboxes that cause hard bounces and helps you avoid recycled spam traps hiding in old, decayed data — neutralising the biggest reputation risks before a single message goes out.",
        ],
      },
      {
        heading: "How to build and protect a strong reputation",
        bullets: [
          "Verify every list before you send, and validate new contacts at the point of capture.",
          "Publish and align SPF, DKIM and DMARC so providers can confirm your mail is genuinely yours.",
          "Send to people who opted in, make unsubscribing easy, and honour it instantly.",
          "Keep volume steady and warm up gradually when ramping a new domain or IP.",
          "Watch engagement and prune long-inactive subscribers before they become complaints or traps.",
        ],
      },
      {
        heading: "How to recover a damaged reputation",
        paras: [
          "Reputation can be rebuilt, but only by fixing the root cause first — there's no shortcut around it. Start by diagnosing what went wrong: a bounce spike from an unverified list, a complaint surge from an aggressive campaign, or authentication that was never set up. Clean and verify the list, tighten authentication, and pull back to your most engaged subscribers.",
          "Then re-warm patiently. Rebuild volume gradually while keeping bounces and complaints low, and let consistent positive engagement slowly restore trust. Recovery takes longer than the damage did, which is the best argument for protecting reputation proactively rather than repairing it after the fact.",
        ],
      },
      {
        heading: "How to monitor your sender reputation",
        paras: [
          "You can't manage what you don't measure, and while providers keep the exact score private, they expose enough signals to track the trend. A small set of free and built-in tools gives you a reliable early-warning system for reputation problems before they tank a campaign.",
        ],
        bullets: [
          "Google Postmaster Tools — shows domain and IP reputation, spam-complaint rate and authentication results for mail sent to Gmail.",
          "Your ESP's analytics — bounce rate, complaint rate and engagement trends per campaign are the fastest day-to-day proxy.",
          "Blocklist checks — periodically confirm your domain and sending IP aren't listed on major DNSBLs.",
          "Seed and inbox-placement tests — sending to a set of seed addresses shows whether you're landing in inbox vs spam across providers.",
        ],
      },
      {
        heading: "Common sender-reputation myths",
        paras: [
          "Reputation attracts a lot of folklore, and acting on the myths wastes effort that should go to the fundamentals. One persistent belief is that buying a fresh domain or IP resets a bad reputation — in practice, a brand-new sender starts with no trust and has to warm up from scratch, and providers are wary of sudden volume from unknown sources, so it's rarely the shortcut people hope for.",
          "Another myth is that clever content tricks — avoiding certain \"spam words,\" or hiding unsubscribe links — improve placement. Modern filtering is driven far more by sender behaviour and recipient engagement than by individual words, and hiding the unsubscribe link backfires by pushing frustrated recipients to hit the spam button instead. The unglamorous truth is that reputation is earned through the basics: a verified list, proper authentication, wanted mail, and consistency over time. There's no setting that substitutes for them.",
        ],
      },
      {
        heading: "Shared vs dedicated IP: which is right for you",
        paras: [
          "One of the biggest structural choices affecting reputation is whether you send from a shared or a dedicated IP address. On a shared IP, your mail leaves from a server pool used by many senders, and you inherit the collective reputation of everyone on it. That's an advantage if the pool is well-managed — the established volume gives you instant standing — but a liability if another sender on the pool behaves badly.",
          "A dedicated IP gives you complete control: the reputation is entirely yours, isolated from everyone else. The catch is that it has to be warmed up from zero and needs consistent volume to maintain trust — providers are suspicious of a new IP that suddenly sends in bulk, and an underused dedicated IP never builds a stable reputation. As a rough guide, lower-volume or irregular senders are usually better served by a reputable shared pool, while high-volume, consistent senders benefit from a dedicated IP they can build and protect. Either way, domain reputation and list quality matter more than the IP choice itself.",
        ],
      },
      {
        heading: "How long does it take to build sender reputation?",
        paras: [
          "Building reputation is a gradual process measured in weeks, not days, because providers want to see a consistent track record before they extend trust. A new domain or IP starts with no reputation at all, which is why warmup — ramping volume up slowly while sending to your most engaged contacts — is essential. Pushing high volume from a cold sender is one of the fastest ways to land in spam from day one.",
          "A typical warmup runs over several weeks, starting with small daily volumes to highly engaged recipients and increasing gradually as positive signals accumulate. What \"good\" looks like at the end is steady inbox placement, a bounce rate comfortably under about 2%, complaint rates below 0.1%, and engagement that holds up as volume grows. Because reputation reflects recent behaviour, it also needs maintaining: a long gap in sending or a sudden spike can unsettle it, so consistency is the through-line from warmup into steady-state sending.",
        ],
      },
    ],
    takeaways: [
      "Sender reputation is the trust score providers assign to your sending domain and IP.",
      "It's driven by bounce rate, spam complaints, engagement, authentication and consistency.",
      "Domain reputation now outweighs IP reputation because it follows you across infrastructure.",
      "List quality is the foundation — hard bounces and spam traps do the most damage.",
      "Build it with verification, authentication and engagement; recovery is slower than damage.",
    ],
    faq: [
      { q: "Can I see my sender reputation as a number?", a: "Not directly — providers keep their scoring internal. You can monitor proxies for it: bounce rate, spam-complaint rate, engagement, and tools like Google Postmaster Tools that surface domain and IP reputation signals for your mail." },
      { q: "What damages sender reputation the fastest?", a: "Hard bounces from unverified lists, spam complaints, and spam-trap hits. All three usually come from mailing addresses you shouldn't have, which is why list verification is the most effective protection." },
      { q: "Is domain or IP reputation more important?", a: "Both matter, but domain reputation has become more important because it follows you even if you change sending infrastructure, and it's tied to your authentication. On a shared IP you also inherit other senders' reputation." },
      { q: "How long does it take to recover a damaged reputation?", a: "Longer than it took to damage. After fixing the root cause — verifying the list, tightening authentication, pulling back to engaged contacts — you re-warm gradually over weeks while keeping bounces and complaints low." },
      { q: "Does buying a new domain reset a bad reputation?", a: "Not usefully. A brand-new domain starts with no trust and has to be warmed up from scratch, and providers are wary of sudden volume from unknown senders. It's almost always better to fix the root cause and rebuild than to start over." },
      { q: "How can I check my sender reputation for free?", a: "Use Google Postmaster Tools for Gmail-bound mail, watch the bounce, complaint and engagement trends in your ESP, and periodically check your domain and IP against major blocklists. Together these give a reliable read on the trend." },
      { q: "Does sending volume affect sender reputation?", a: "Yes — both the level and the consistency. Sudden spikes look like spam or a compromised account, and long gaps let trust lapse. Steady, predictable volume (with gradual warmup when ramping) builds and maintains reputation best." },
      { q: "What's a good spam complaint rate?", a: "Below 0.1% is the target, and Gmail and Yahoo require bulk senders to stay under 0.3%. Crossing that threshold is one of the fastest ways to damage reputation, because a complaint is the strongest negative signal a recipient can send." },
      { q: "Can one bad campaign ruin my sender reputation?", a: "A single send to a large, unverified or unengaged list can absolutely cause lasting damage through a bounce or complaint spike. Reputation is slow to build and quick to lose, which is why verifying and segmenting before a big send matters so much." },
    ],
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
      "Email deliverability is the practical measure of how much of your mail actually reaches the inbox — not just whether it was accepted by the receiving server, but whether it landed where the recipient will see it rather than in spam or in the bin. It is the discipline that sits between writing an email and that email being read, and it is where most of the money in email marketing is quietly won or lost.",
      "Deliverability is not one setting you switch on; it's the combined result of several systems working together: authentication, sender reputation, list quality, engagement and infrastructure. You can write a perfect message to a perfect offer and still never be seen if any of those foundations is weak. The encouraging part is that the biggest lever — list quality — is also the one most directly in your control.",
    ],
    related: ["sender-reputation", "bounce-rate", "list-hygiene", "dmarc"],
    sections: [
      {
        heading: "Deliverability vs delivery rate",
        paras: [
          "These two terms get used interchangeably, but they mean different things, and the gap between them is where problems hide. Delivery rate measures whether the receiving server accepted your message — it counts everything that didn't bounce. Deliverability (or inbox placement) measures whether that accepted mail actually reached the inbox rather than the spam folder.",
          "A 99% delivery rate can still hide a serious deliverability problem: the mail was accepted, but most of it went to spam. That's why delivery rate alone is a misleading health check, and why inbox placement is the number that actually reflects whether your audience sees you.",
        ],
      },
      {
        heading: "The pillars of deliverability",
        paras: [
          "Inbox placement rests on a few foundations that reinforce each other. Weakness in any one drags down the rest.",
        ],
        bullets: [
          "Authentication — SPF, DKIM and DMARC prove your mail is genuinely from you and isn't spoofed.",
          "Sender reputation — the trust score providers attach to your domain and IP, built from your sending history.",
          "List quality — verified, engaged, permission-based contacts; the foundation everything else sits on.",
          "Engagement — opens, clicks and replies tell providers people want your mail.",
          "Content and infrastructure — a clean sending setup, sensible volume, and messages that don't trip spam filters.",
        ],
      },
      {
        heading: "The 2024 Gmail and Yahoo sender requirements",
        paras: [
          "In early 2024, Gmail and Yahoo introduced shared requirements for bulk senders (broadly, those sending around 5,000+ messages a day) that turned long-standing best practices into hard rules. Meeting them is now table stakes for reaching the inbox at volume.",
        ],
        bullets: [
          "Authenticate your mail with SPF, DKIM and DMARC, properly aligned.",
          "Keep your spam-complaint rate below 0.3%, and ideally under 0.1%.",
          "Offer one-click unsubscribe and honour opt-outs within a couple of days.",
          "Only send wanted mail to people who opted in — which depends on a clean, verified list.",
        ],
      },
      {
        heading: "How to diagnose a deliverability problem",
        paras: [
          "When mail starts landing in spam, work through the pillars in order rather than guessing. Confirm your authentication is published and aligned; check your reputation signals (bounce rate, complaint rate, and provider tools like Google Postmaster); look hard at list quality, since decayed or purchased lists are the most common culprit; and review whether a recent change in volume, content or sending platform coincided with the drop.",
          "Most deliverability problems trace back to either authentication that was never set up correctly or a list that was sent to without being verified. Both are fixable, and both are far cheaper to prevent than to recover from.",
        ],
      },
      {
        heading: "How to improve deliverability",
        bullets: [
          "Verify your list before every send to strip out the bounces and traps that erode reputation.",
          "Publish and align SPF, DKIM and DMARC, and move your DMARC policy toward enforcement over time.",
          "Send to engaged, opted-in subscribers and prune the long-inactive before they complain.",
          "Keep volume steady and warm up new domains or IPs gradually.",
          "Make unsubscribing effortless — a visible opt-out beats a frustrated spam complaint every time.",
        ],
      },
      {
        heading: "A pre-send deliverability checklist",
        paras: [
          "Before a major campaign goes out, a short pre-flight check catches the issues that quietly send mail to spam. Running through it every time turns deliverability from a thing you investigate after a bad send into something you protect before one.",
        ],
        bullets: [
          "List verified — the send list has been cleaned, with invalids and risky addresses removed.",
          "Authentication green — SPF, DKIM and DMARC all pass and align for your sending domain.",
          "Reputation healthy — recent bounce and complaint rates are within safe limits (bounces ≤ ~2%, complaints < 0.1%).",
          "Engaged audience — you're sending to people who opted in and have engaged recently, not a dormant or purchased list.",
          "Easy unsubscribe — a visible, working, one-click opt-out is in place and honoured promptly.",
          "Sensible volume — the send fits your normal sending pattern rather than a sudden spike.",
        ],
      },
      {
        heading: "Why deliverability is a moving target",
        paras: [
          "Deliverability is never permanently \"solved,\" because the environment keeps shifting. Mailbox providers update their filtering continuously, raise the bar on requirements (as Gmail and Yahoo did in 2024), and weight engagement more heavily over time. Meanwhile your own list is decaying every month, and each new campaign adds fresh signals — good or bad — to your reputation.",
          "That's why the teams with the best inbox placement treat deliverability as an ongoing discipline rather than a one-time setup. They verify on a recurring schedule, monitor their reputation signals, keep authentication current, and prune disengaged subscribers before they become complaints. The single habit that does the most work across all of it is list verification, because it removes the bounces and spam-trap hits that cause the fastest, most lasting reputation damage — keeping the foundation solid while everything else around it changes.",
        ],
      },
      {
        heading: "Inbox placement rate: the metric that matters",
        paras: [
          "If delivery rate is the metric that flatters you, inbox placement rate is the one that tells the truth. It measures the share of your accepted mail that actually reaches the inbox rather than the spam folder — the number that determines whether your audience ever sees you. A campaign can be 99% delivered and still have a poor inbox placement rate if most of that mail is being filtered to spam.",
          "Because providers don't report placement directly, you measure it with seed testing: send to a representative set of seed addresses across the major mailbox providers and observe where the mail lands — inbox, spam or missing — for each. Run that test on important campaigns and you get an early, honest read on problems that delivery rate would hide. A falling placement rate is usually the first visible symptom of a reputation or authentication issue, which makes it one of the most valuable signals to watch.",
          "Improving placement comes back to the same fundamentals: authenticate properly, verify your list so bounces don't erode reputation, send wanted mail to engaged people, and keep volume steady. Placement is the scoreboard; those habits are how you move it.",
        ],
      },
      {
        heading: "B2B vs B2C deliverability: what's different",
        paras: [
          "Deliverability isn't identical across audiences, and the differences change how you should manage a list. B2B sending leans on corporate domains, which are far more likely to be catch-all and are often protected by security gateways that scrutinise inbound mail. That makes verification status harder to pin down and puts extra weight on authentication and a clean sending reputation to clear those gateways.",
          "B2C sending mostly hits the big consumer mailbox providers — Gmail, Yahoo, Outlook.com — where engagement signals dominate and the 2024 bulk-sender rules apply most directly. There, complaint rate and recipient interaction carry enormous weight, so list hygiene and genuine opt-in matter even more. The common thread across both is that a verified, engaged, permission-based list is the foundation; what shifts is the surrounding emphasis — authentication and gateway-readiness in B2B, engagement and complaint management in B2C.",
        ],
      },
    ],
    takeaways: [
      "Deliverability measures inbox placement, not just whether mail was accepted.",
      "Delivery rate can look great while most mail quietly lands in spam.",
      "It rests on authentication, reputation, list quality, engagement and infrastructure.",
      "Gmail and Yahoo's 2024 rules made SPF/DKIM/DMARC and a <0.3% complaint rate mandatory at volume.",
      "Verifying your list is the most direct lever you control to protect it.",
    ],
    faq: [
      { q: "What's the difference between delivery rate and deliverability?", a: "Delivery rate counts mail the receiving server accepted (didn't bounce). Deliverability — or inbox placement — measures whether that accepted mail reached the inbox rather than the spam folder. You can have a high delivery rate and poor deliverability at the same time." },
      { q: "Why is my email going to spam?", a: "Usually authentication that isn't set up or aligned, a damaged sender reputation, or a list that wasn't verified before sending. Work through those pillars in order; list quality and authentication are the most common causes." },
      { q: "What are the Gmail and Yahoo sender rules?", a: "Since 2024, bulk senders must authenticate with SPF, DKIM and DMARC, keep spam complaints under 0.3%, and offer one-click unsubscribe. Meeting them is now required to reach the inbox at volume." },
      { q: "What's the single best thing I can do for deliverability?", a: "Verify your list before every send. It removes the non-existent mailboxes and spam traps that cause bounces and reputation damage — the root of most deliverability problems — and it's entirely within your control." },
      { q: "What is a good inbox placement rate?", a: "The higher the better — strong senders aim for the large majority of accepted mail reaching the inbox rather than spam. Because providers don't report it directly, you estimate it with seed testing and watch the trend over time rather than chasing a single fixed number." },
      { q: "How do I test where my emails actually land?", a: "Use seed testing: send to a set of seed addresses across Gmail, Yahoo, Outlook and others, then check whether each copy landed in inbox, spam or went missing. It's the most direct way to see real inbox placement, which delivery rate hides." },
      { q: "Does email content affect deliverability?", a: "Some, but far less than people think. Sender behaviour, authentication, list quality and engagement dominate. Egregious spam-like content can hurt, but tweaking individual words won't fix a deliverability problem rooted in reputation or a poor list." },
      { q: "Why did my deliverability suddenly drop?", a: "Common causes are a send to an unverified or old list (a bounce spike), a complaint surge from an aggressive campaign, an authentication change that broke alignment, or a sudden volume increase. Work through those in order; list quality and authentication are the usual culprits." },
      { q: "Do SPF, DKIM and DMARC guarantee inbox placement?", a: "No — they're necessary but not sufficient. Authentication makes you eligible for the inbox and is required by Gmail and Yahoo at volume, but reputation, list quality and engagement decide whether you actually land there. Think of it as the entry ticket, not the destination." },
      { q: "How does verifying my list improve deliverability?", a: "It removes the non-existent mailboxes and recycled spam traps that cause hard bounces — the signals that erode sender reputation fastest. With those gone before the send, your bounce rate stays low and your reputation, and therefore your inbox placement, holds up." },
    ],
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
