import { NextRequest, NextResponse } from "next/server";
import { runPreview, type PreviewMapping } from "@/lib/verification/preview";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Free 100-row preview. Accepts the client-parsed rows + column mapping,
 * runs verification (real providers when keys are set, mock otherwise),
 * dedupes, scores, and returns aggregate stats + sample rows.
 *
 * TODO (Phase 2 hardening): IP rate-limiting + hash-cache to protect the
 * anonymous preview from being a cost/abuse hole.
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

  if (rows.length === 0) {
    return NextResponse.json({ error: "No rows to verify." }, { status: 400 });
  }
  if (!mapping.email && !mapping.phone) {
    return NextResponse.json({ error: "Map at least an email or phone column." }, { status: 400 });
  }

  try {
    const result = await runPreview(rows, mapping);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
