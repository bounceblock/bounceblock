import { NextRequest, NextResponse } from "next/server";
import { runFull, FULL_LIMIT } from "@/lib/verification/process";
import type { PreviewMapping } from "@/lib/verification/preview";
import { config } from "@/lib/config";
import { getUser } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getOrCreateUsage, incrementUsage } from "@/lib/usage";
import { persistFullRun } from "@/lib/verification/persist";
import { logEvent } from "@/lib/events";
import type { PlanId } from "@/lib/plans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Full-list processing: verify all rows, return stats + a clean CSV.
 *
 * Demo (no Supabase): runs openly so the flow is testable.
 * Live: requires auth → enforces monthly quota → persists upload/verification,
 * stores the clean file, emails a download link, and meters usage.
 *
 * TODO (scale): run via the queue worker for very large lists instead of inline.
 */
export async function POST(req: NextRequest) {
  if (!rateLimit(`process:${clientIp(req)}`, 10, 60_000).ok) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429 });
  }

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

  // ── Live path: auth + quota + persistence ──
  if (config.hasSupabase()) {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

    if (config.hasSupabaseAdmin()) {
      const db = createSupabaseAdminClient();
      const { data: profile } = await db.from("profiles").select("plan").eq("id", user.id).single();
      const plan = ((profile?.plan as PlanId) ?? "free") as PlanId;
      const usage = await getOrCreateUsage(db, user.id, plan);
      const toProcess = Math.min(rows.length, FULL_LIMIT);

      if (usage.used + toProcess > usage.quota) {
        await logEvent("quota_exceeded", { userId: user.id, email: user.email, metadata: { used: usage.used, quota: usage.quota } });
        return NextResponse.json(
          { error: "quota_exceeded", used: usage.used, quota: usage.quota },
          { status: 402 }
        );
      }

      try {
        const result = await runFull(rows, mapping);
        const { downloadUrl, verificationId } = await persistFullRun({
          db,
          userId: user.id,
          email: user.email ?? null,
          mapping,
          rowCount: rows.length,
          result: result.stats,
          cleanCsv: result.cleanCsv,
        });
        await incrementUsage(db, usage.id, usage.used, result.stats.analyzed);
        await logEvent("verify_full", {
          userId: user.id,
          email: user.email,
          metadata: { rows: result.stats.analyzed, score: result.stats.qualityScore, verificationId },
        });
        return NextResponse.json({
          mock: result.stats.mock,
          stats: result.stats,
          cleanRows: result.cleanRows,
          cleanCsv: result.cleanCsv,
          downloadUrl,
          verificationId,
        });
      } catch {
        return NextResponse.json({ error: "Processing failed. Please try again." }, { status: 500 });
      }
    }
    // Supabase auth configured but no service role — process without persistence.
  }

  // ── Demo / no-persistence path ──
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
