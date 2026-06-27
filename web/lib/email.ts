import nodemailer, { type Transporter } from "nodemailer";
import { config } from "@/lib/config";
import { SITE } from "@/lib/constants";

let transporter: Transporter | null = null;

function getTransport(): Transporter {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

/** Send a transactional email. No-op (logs) until SMTP is configured. */
export async function sendRawEmail(to: string, subject: string, html: string) {
  if (!config.hasSmtp()) {
    console.log(`[email:skipped] to=${to} subject="${subject}" (SMTP not configured)`);
    return;
  }
  await getTransport().sendMail({ from: `${SITE.name} <${SITE.email.hello}>`, to, subject, html });
}

/** Branded HTML wrapper for all emails. */
export function emailShell(body: string) {
  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:0 auto;color:#14233d;line-height:1.55">
    <div style="font-family:Georgia,serif;font-weight:600;font-size:22px;margin-bottom:18px">
      <span style="color:#14233d">Bounce</span><span style="color:#2EA94E">Block</span><span style="color:#1B7FD4">.io</span>
    </div>
    ${body}
    <hr style="border:none;border-top:1px solid #e8e4da;margin:28px 0 14px" />
    <p style="color:#8a8f98;font-size:12px">${SITE.legalName} · ${SITE.domain}<br/>
      You're receiving this because you have a BounceBlock account.</p>
  </div>`;
}

const cta = (href: string, label: string) =>
  `<p><a href="${href}" style="background:#2EA94E;color:#fff;padding:11px 20px;border-radius:999px;text-decoration:none;font-weight:600;display:inline-block">${label}</a></p>`;

// ── operational triggers ──
export function sendWelcomeEmail(to: string, name?: string) {
  return sendRawEmail(
    to,
    `Welcome to ${SITE.name}`,
    emailShell(`<p>Hi ${name || "there"},</p>
      <p>Welcome aboard. Upload a list any time and we'll verify the emails and phones and remove duplicates — your first 100 are free.</p>
      ${cta(`${config.siteUrl()}/verify`, "Clean your first list")}`)
  );
}

export function sendReceiptEmail(to: string, plan: string, amountCents: number) {
  return sendRawEmail(
    to,
    `Your ${SITE.name} receipt`,
    emailShell(`<p>Thanks for subscribing to <b>${plan}</b>.</p>
      <p>Amount: $${(amountCents / 100).toFixed(2)}. Manage your plan any time from your dashboard.</p>
      ${cta(`${config.siteUrl()}/dashboard`, "Go to dashboard")}`)
  );
}

export function sendResultsReadyEmail(to: string, downloadUrl: string, cleanCount: number) {
  return sendRawEmail(
    to,
    "Your clean list is ready",
    emailShell(`<p>Your verified list is ready — <b>${cleanCount.toLocaleString()} clean contacts</b>.</p>
      ${cta(downloadUrl, "Download clean CSV")}`)
  );
}
