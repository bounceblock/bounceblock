import { emailShell, sendRawEmail } from "@/lib/email";
import { config } from "@/lib/config";
import { SITE } from "@/lib/constants";

/**
 * The 8 lifecycle email sequences (Phase 6). This is the full definition —
 * subjects + branded bodies + triggers. A scheduler (cron/worker) calls
 * `sendSequenceEmail(to, key, step, ctx)` when each trigger condition is met.
 * Until SMTP + a scheduler are configured, sends are no-ops (logged).
 */

export interface SequenceCtx {
  name?: string;
  plan?: string;
  used?: number;
  quota?: number;
  referralCredit?: number;
}

export interface SequenceEmail {
  subject: string;
  body: (ctx: SequenceCtx) => string;
}

export interface EmailSequence {
  key: string;
  name: string;
  trigger: string;
  emails: SequenceEmail[];
}

const btn = (href: string, label: string) =>
  `<p><a href="${href}" style="background:#2EA94E;color:#fff;padding:11px 20px;border-radius:999px;text-decoration:none;font-weight:600;display:inline-block">${label}</a></p>`;
const url = (path: string) => `${config.siteUrl()}${path}`;
const hi = (ctx: SequenceCtx) => `<p>Hi ${ctx.name || "there"},</p>`;

export const SEQUENCES: EmailSequence[] = [
  {
    key: "welcome",
    name: "Welcome",
    trigger: "On signup",
    emails: [
      { subject: `Welcome to ${SITE.name}`, body: (c) => `${hi(c)}<p>Welcome aboard! Upload any list and we'll verify emails and phones and remove duplicates. Your first 100 are free.</p>${btn(url("/verify"), "Clean your first list")}` },
      { subject: "A 2-minute way to clean any list", body: (c) => `${hi(c)}<p>Quick tip: drag a CSV into BounceBlock and we auto-detect your columns. You'll see exactly what's wrong before you pay.</p>${btn(url("/verify"), "Try it now")}` },
      { subject: "Why we check phones too", body: (c) => `${hi(c)}<p>Most tools stop at email. We validate phone numbers in the same upload, so your whole outreach is covered.</p>${btn(url("/pricing"), "See plans")}` },
    ],
  },
  {
    key: "conversion",
    name: "Conversion",
    trigger: "Free user reaches 80% of monthly allowance",
    emails: [
      { subject: "You're getting value from BounceBlock", body: (c) => `${hi(c)}<p>You've used ${c.used ?? 80} of your ${c.quota ?? 100} free verifications this month. Upgrade for full downloads and more headroom.</p>${btn(url("/pricing"), "Upgrade")}` },
      { subject: "Unlock full clean files", body: (c) => `${hi(c)}<p>On a paid plan you get the full verified file, phone validation and history. Flat price, cancel anytime.</p>${btn(url("/pricing"), "Choose a plan")}` },
      { subject: "Last few free verifications", body: (c) => `${hi(c)}<p>You're almost at your monthly limit. Upgrade to keep cleaning lists without interruption.</p>${btn(url("/pricing"), "Upgrade now")}` },
      { subject: "14-day money-back guarantee", body: (c) => `${hi(c)}<p>Try any paid plan risk-free — full refund within 14 days, no questions asked.</p>${btn(url("/pricing"), "Start a plan")}` },
    ],
  },
  {
    key: "retention",
    name: "Retention",
    trigger: "7 days inactive",
    emails: [
      { subject: "We miss you", body: (c) => `${hi(c)}<p>Lists go stale ~2% a month. Re-verify before your next send to keep bounces low.</p>${btn(url("/verify"), "Clean a list")}` },
      { subject: "Your sender reputation will thank you", body: (c) => `${hi(c)}<p>A quick verification before each campaign protects your deliverability. It takes two minutes.</p>${btn(url("/verify"), "Verify now")}` },
      { subject: "Anything we can help with?", body: (c) => `${hi(c)}<p>Reply to this email any time — we're happy to help you get clean lists out the door.</p>` },
    ],
  },
  {
    key: "expansion",
    name: "Expansion",
    trigger: "Pro user at 80% usage",
    emails: [
      { subject: "Running low on verifications", body: (c) => `${hi(c)}<p>You've used ${c.used ?? 4000} of ${c.quota ?? 5000} this month. Business gives you 25,000/mo plus API access.</p>${btn(url("/pricing"), "See Business")}` },
      { subject: "More headroom + API access", body: (c) => `${hi(c)}<p>Verify at the point of capture with the BounceBlock API on Business.</p>${btn(url("/pricing"), "Upgrade")}` },
      { subject: "Scale your list hygiene", body: (c) => `${hi(c)}<p>Bigger lists, team seats and a developer API — all on the Business plan.</p>${btn(url("/pricing"), "Compare plans")}` },
    ],
  },
  {
    key: "winback",
    name: "Win-back",
    trigger: "Subscription cancelled",
    emails: [
      { subject: "Sorry to see you go", body: (c) => `${hi(c)}<p>Your account is still here whenever you need clean lists again. Your data stays for 30 days.</p>${btn(url("/pricing"), "Reactivate")}` },
      { subject: "Come back to clean lists", body: (c) => `${hi(c)}<p>Re-subscribe any time — same flat pricing, email + phone in one pass.</p>${btn(url("/pricing"), "Resubscribe")}` },
      { subject: "A little something to return", body: (c) => `${hi(c)}<p>We'd love to have you back. Reply and let us know what would make BounceBlock a fit.</p>` },
    ],
  },
  {
    key: "monthly",
    name: "Monthly report",
    trigger: "Monthly, paid users",
    emails: [
      { subject: "Your BounceBlock month in review", body: (c) => `${hi(c)}<p>This month you verified ${c.used ?? 0} contacts on your ${c.plan ?? "Pro"} plan. Keep your lists clean before every send.</p>${btn(url("/dashboard"), "View dashboard")}` },
    ],
  },
  {
    key: "referral",
    name: "Referral thank-you",
    trigger: "Successful referral",
    emails: [
      { subject: "You earned a referral credit 🎉", body: (c) => `${hi(c)}<p>Thanks for spreading the word — we've added a $${c.referralCredit ?? 10} credit to your account.</p>${btn(url("/dashboard"), "See your credit")}` },
    ],
  },
  {
    key: "feedback",
    name: "Feedback / NPS",
    trigger: "30 days after signup",
    emails: [
      { subject: "How are we doing?", body: (c) => `${hi(c)}<p>You've been with BounceBlock a month. On a scale of 0–10, how likely are you to recommend us? Just reply with a number — it really helps.</p>` },
    ],
  },
];

export function getSequence(key: string) {
  return SEQUENCES.find((s) => s.key === key);
}

/** Send one email from a sequence. Scheduler supplies (key, step, ctx). */
export async function sendSequenceEmail(to: string, key: string, step: number, ctx: SequenceCtx = {}) {
  const seq = getSequence(key);
  const email = seq?.emails[step];
  if (!email) return;
  await sendRawEmail(to, email.subject, emailShell(email.body(ctx)));
}
