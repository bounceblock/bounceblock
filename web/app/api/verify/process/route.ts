import { NextRequest, NextResponse } from "next/server";
import { runFull } from "@/lib/verification/process";
import type { PreviewMapping } from "@/lib/verification/preview";
import { config } from "@/lib/config";
import { getUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Full-list processing: verify all rows, return aggregate stats + a clean CSV.
 *
 * When Supabase is configured this requires auth (decision: full results gated
 * behind signup). In demo mode (no keys) it runs openly so the flow is testable.
 *
 * TODO (Phase 2 hardening): enforce plan + monthly usage quota; persist
 * upload/verification rows; store the file in Storage; email the download link;
 * and run via the queue worker for large lists instead of inline.
 */
export async function POST(req: NextRequest) {
  let body: { rows?: Record<string, string>[]; mapping?: PreviewMapping };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const rows = Array.isArray(body.rows) ? body.rows : [];
  const mapping = body.mapping ?? {};
  if (rows.length === 0) return NextResponse.json({ error: "No rows to process." }, { status: 400 });
  if (!mapping.email && !mapping.phone) {
    return NextResponse.json({ error: "Map at least an email or phone column." }, { status: 400 });
  }

  if (config.hasSupabase()) {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  try {
    const result = await runFull(rows, mapping);
    return NextResponse.json({
      mock: result.stats.mock,
      stats: result.stats,
      cleanRows: result.cleanRows,
      cleanCsv: result.cleanCsv,
    });
  } catch {
    return NextResponse.json({ error: "Processing failed. Please try again." }, { status: 500 });
  }
}
