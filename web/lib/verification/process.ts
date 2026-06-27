import Papa from "papaparse";
import { verifyRows, aggregate, type PreviewMapping, type PreviewResult, type RowResult } from "./preview";

export const FULL_LIMIT = 25000; // hard cap aligned with the Business plan

export interface FullResult {
  stats: PreviewResult;
  cleanCsv: string;
  cleanRows: number;
}

/**
 * Full processing of an entire list: verify every row, then produce a clean CSV
 * that keeps only deliverable-ish, non-duplicate contacts and annotates each
 * with its verification status.
 *
 * NOTE (Phase 2 hardening): for large lists this must run in a background
 * worker (queue), NOT inline in a request — Vercel function timeouts. See
 * lib/queue.ts. Mock/real selection is automatic via the providers.
 */
export async function runFull(rows: Record<string, string>[], mapping: PreviewMapping): Promise<FullResult> {
  const capped = rows.slice(0, FULL_LIMIT);
  const { results, mock } = await verifyRows(capped, mapping);
  const stats = aggregate(results, mock);
  const { csv, kept } = buildCleanCsv(capped, results);
  return { stats, cleanCsv: csv, cleanRows: kept };
}

/** Keep valid + catch-all, drop invalid + duplicates; annotate with status columns. */
function buildCleanCsv(rows: Record<string, string>[], results: RowResult[]): { csv: string; kept: number } {
  const out: Record<string, string>[] = [];
  rows.forEach((row, i) => {
    const r = results[i];
    const emailOk = !r.email || r.email.status === "valid" || r.email.status === "catch-all";
    if (!emailOk || r.isDup) return;
    out.push({
      ...row,
      bb_email_status: r.email?.status ?? "",
      bb_phone_status: r.phone ? (r.phone.valid ? r.phone.lineType : "invalid") : "",
    });
  });
  return { csv: Papa.unparse(out), kept: out.length };
}
