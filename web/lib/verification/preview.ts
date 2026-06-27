import type { EmailResult, PhoneResult } from "./types";
import { ZeroBounceVerifier } from "./zerobounce";
import { NumVerifyValidator } from "./numverify";
import { mockEmail, mockPhone } from "./mock";

export const PREVIEW_LIMIT = 100;
const CONCURRENCY = 12;

export interface PreviewMapping {
  email?: string;
  phone?: string;
  name?: string;
  company?: string;
}

export type SampleTone = "valid" | "invalid" | "unknown" | "dupe";

export interface PreviewSample {
  value: string;
  kind: "email" | "phone";
  label: string;
  tone: SampleTone;
}

export interface PreviewResult {
  analyzed: number;
  mock: boolean;
  email: { valid: number; invalid: number; catchAll: number; unknown: number; total: number };
  phone: { valid: number; invalid: number; total: number };
  duplicates: number;
  qualityScore: number;
  cleanCount: number;
  samples: PreviewSample[];
}

/** Per-row verification outcome — the shared unit for preview and full processing. */
export interface RowResult {
  email: EmailResult | null;
  phone: PhoneResult | null;
  isDup: boolean;
}

const get = (row: Record<string, string>, col?: string) => (col ? (row[col] ?? "").trim() : "");

/** Bounded-concurrency async map (protects real provider rate limits). */
async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  const run = async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length || 1) }, run));
  return out;
}

/**
 * Verify a set of rows: dedupe + verify each email/phone (real providers when
 * keys are set, deterministic mock otherwise). Shared by preview and full runs.
 */
export async function verifyRows(
  rows: Record<string, string>[],
  mapping: PreviewMapping
): Promise<{ results: RowResult[]; mock: boolean }> {
  const emailMock = !process.env.ZEROBOUNCE_API_KEY;
  const phoneMock = !process.env.NUMVERIFY_API_KEY;
  const zb = new ZeroBounceVerifier();
  const nv = new NumVerifyValidator();

  const seenEmail = new Set<string>();
  const seenPhone = new Set<string>();
  const dupFlags = rows.map((row) => {
    const em = get(row, mapping.email).toLowerCase();
    const ph = get(row, mapping.phone).replace(/\D/g, "");
    let dup = false;
    if (em) seenEmail.has(em) ? (dup = true) : seenEmail.add(em);
    if (ph) seenPhone.has(ph) ? (dup = true) : seenPhone.add(ph);
    return dup;
  });

  const emailResults = await mapLimit(rows, CONCURRENCY, (row): Promise<EmailResult | null> => {
    const v = get(row, mapping.email);
    if (!v) return Promise.resolve(null);
    return emailMock ? Promise.resolve(mockEmail(v)) : zb.verifyEmail(v);
  });
  const phoneResults = await mapLimit(rows, CONCURRENCY, (row): Promise<PhoneResult | null> => {
    const v = get(row, mapping.phone);
    if (!v) return Promise.resolve(null);
    return phoneMock ? Promise.resolve(mockPhone(v)) : nv.validatePhone(v);
  });

  const results: RowResult[] = rows.map((_, i) => ({
    email: emailResults[i],
    phone: phoneResults[i],
    isDup: dupFlags[i],
  }));
  return { results, mock: emailMock || phoneMock };
}

/** Aggregate per-row results into stats + quality score + sample findings. */
export function aggregate(results: RowResult[], mock: boolean): PreviewResult {
  const analyzed = results.length;

  const email = { valid: 0, invalid: 0, catchAll: 0, unknown: 0, total: 0 };
  const phone = { valid: 0, invalid: 0, total: 0 };
  let duplicates = 0;
  let cleanCount = 0;

  for (const r of results) {
    if (r.isDup) duplicates++;
    if (r.email) {
      email.total++;
      if (r.email.status === "valid") email.valid++;
      else if (r.email.status === "invalid") email.invalid++;
      else if (r.email.status === "catch-all") email.catchAll++;
      else email.unknown++;
    }
    if (r.phone) {
      phone.total++;
      r.phone.valid ? phone.valid++ : phone.invalid++;
    }
    const keepEmail = !r.email || r.email.status === "valid" || r.email.status === "catch-all";
    if (keepEmail && !r.isDup) cleanCount++;
  }

  const emailGood = email.valid + 0.5 * email.catchAll;
  const ratioEmail = email.total ? emailGood / email.total : 1;
  const ratioPhone = phone.total ? phone.valid / phone.total : null;
  const dupRatio = analyzed ? duplicates / analyzed : 0;
  const score =
    ratioPhone != null
      ? ratioEmail * 0.6 + ratioPhone * 0.25 + (1 - dupRatio) * 0.15
      : ratioEmail * 0.85 + (1 - dupRatio) * 0.15;
  const qualityScore = Math.max(0, Math.min(100, Math.round(score * 100)));

  return { analyzed, mock, email, phone, duplicates, qualityScore, cleanCount, samples: buildSamples(results) };
}

export async function runPreview(rows: Record<string, string>[], mapping: PreviewMapping): Promise<PreviewResult> {
  const { results, mock } = await verifyRows(rows.slice(0, PREVIEW_LIMIT), mapping);
  return aggregate(results, mock);
}

function emailLabel(r: EmailResult): { label: string; tone: SampleTone } {
  switch (r.status) {
    case "valid":
      return { label: "Valid", tone: "valid" };
    case "catch-all":
      return { label: "Catch-all", tone: "unknown" };
    case "unknown":
      return { label: "Unknown", tone: "unknown" };
    default:
      return {
        label:
          r.subStatus === "possible_typo" ? "Invalid · typo" : r.subStatus === "disposable" ? "Disposable" : "Undeliverable",
        tone: "invalid",
      };
  }
}

function buildSamples(results: RowResult[]): PreviewSample[] {
  const out: PreviewSample[] = [];
  const want: Record<SampleTone, number> = { dupe: 1, invalid: 2, unknown: 1, valid: 2 };
  const got: Record<SampleTone, number> = { dupe: 0, invalid: 0, unknown: 0, valid: 0 };
  const push = (s: PreviewSample) => {
    if (out.length >= 6 || got[s.tone] >= want[s.tone]) return;
    out.push(s);
    got[s.tone]++;
  };

  for (const r of results) {
    if (r.isDup && r.email) {
      push({ value: r.email.email, kind: "email", label: "Duplicate", tone: "dupe" });
      continue;
    }
    if (r.email) {
      const { label, tone } = emailLabel(r.email);
      push({ value: r.email.email, kind: "email", label, tone });
    }
    if (r.phone) {
      if (r.phone.valid) push({ value: r.phone.phone, kind: "phone", label: `${cap(r.phone.lineType)} · active`, tone: "valid" });
      else push({ value: r.phone.phone, kind: "phone", label: "Disconnected", tone: "invalid" });
    }
  }
  return out;
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
