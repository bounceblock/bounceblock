import type { EmailResult, PhoneResult, PhoneLineType } from "./types";

/**
 * Deterministic, realistic MOCK verification used when API keys aren't
 * configured yet (demo mode). Same input → same output, so previews are stable.
 * Replaced transparently by the real providers once keys are set.
 */

const TYPO_DOMAINS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmail.con": "gmail.com",
  "hotnail.com": "hotmail.com",
  "hotmial.com": "hotmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "outlok.com": "outlook.com",
};

const ROLE_LOCALS = new Set([
  "info", "contact", "sales", "admin", "hello", "support", "office", "team", "billing", "noreply",
]);

const DISPOSABLE = new Set([
  "mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com", "trashmail.com",
]);

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mockEmail(raw: string): EmailResult {
  const email = raw.trim();
  const e = email.toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
    return { email, status: "invalid", subStatus: "syntax_error" };
  }
  const [local, domain] = e.split("@");
  if (TYPO_DOMAINS[domain]) {
    return { email, status: "invalid", subStatus: "possible_typo", didYouMean: `${local}@${TYPO_DOMAINS[domain]}` };
  }
  if (DISPOSABLE.has(domain)) {
    return { email, status: "invalid", subStatus: "disposable" };
  }
  if (ROLE_LOCALS.has(local)) {
    return { email, status: "catch-all", subStatus: "role_based" };
  }
  // Spread the remainder into a realistic distribution (~72/14/14).
  const b = hash(e) % 100;
  if (b < 72) return { email, status: "valid" };
  if (b < 80) return { email, status: "catch-all", subStatus: "accept_all" };
  if (b < 88) return { email, status: "unknown", subStatus: "greylisted" };
  return { email, status: "invalid", subStatus: "mailbox_not_found" };
}

const CARRIERS = ["Verizon", "AT&T", "T-Mobile", "Vodafone", "Sprint", "Mint Mobile"];

export function mockPhone(raw: string): PhoneResult {
  const phone = raw.trim();
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return { phone, valid: false, lineType: "unknown" };
  }
  const h = hash(digits);
  if (h % 10 === 3) return { phone, valid: false, lineType: "unknown" };
  const lineType: PhoneLineType = h % 6 === 0 ? "landline" : h % 11 === 0 ? "voip" : "mobile";
  return {
    phone,
    valid: true,
    lineType,
    carrier: CARRIERS[h % CARRIERS.length],
    country: "United States",
  };
}
