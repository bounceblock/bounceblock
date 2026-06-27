import { NextRequest, NextResponse } from "next/server";
import { mockEmail, mockPhone } from "@/lib/verification/mock";
import { ZeroBounceVerifier } from "@/lib/verification/zerobounce";
import { NumVerifyValidator } from "@/lib/verification/numverify";
import { config } from "@/lib/config";
import { hashKey } from "@/lib/api-keys";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public verification API (Business plan).
 *   POST /api/v1/verify   { "email": "...", "phone": "..." }
 *   Authorization: Bearer <api_key>
 *
 * Live: validates the key against api_keys. Demo (no Supabase): use key "bb_test".
 */
export async function POST(req: NextRequest) {
  if (!rateLimit(`api:${clientIp(req)}`, 60, 60_000).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const key = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!key) return NextResponse.json({ error: "missing_api_key" }, { status: 401 });

  if (config.hasSupabaseAdmin()) {
    const db = createSupabaseAdminClient();
    const { data } = await db.from("api_keys").select("id, revoked_at").eq("key_hash", hashKey(key)).single();
    if (!data || data.revoked_at) {
      return NextResponse.json({ error: "invalid_api_key" }, { status: 401 });
    }
    db.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", data.id);
  } else if (key !== "bb_test") {
    return NextResponse.json({ error: "invalid_api_key", hint: "Use 'bb_test' in demo mode." }, { status: 401 });
  }

  const { email, phone } = (await req.json().catch(() => ({}))) as { email?: string; phone?: string };
  if (!email && !phone) {
    return NextResponse.json({ error: "provide an email or phone" }, { status: 400 });
  }

  const emailMock = !process.env.ZEROBOUNCE_API_KEY;
  const phoneMock = !process.env.NUMVERIFY_API_KEY;

  const emailRes = email ? (emailMock ? mockEmail(email) : await new ZeroBounceVerifier().verifyEmail(email)) : null;
  const phoneRes = phone ? (phoneMock ? mockPhone(phone) : await new NumVerifyValidator().validatePhone(phone)) : null;

  return NextResponse.json({
    email: emailRes
      ? { status: emailRes.status, sub_status: emailRes.subStatus ?? null, did_you_mean: emailRes.didYouMean ?? null }
      : null,
    phone: phoneRes
      ? { valid: phoneRes.valid, line_type: phoneRes.lineType, carrier: phoneRes.carrier ?? null }
      : null,
    mock: emailMock || phoneMock,
  });
}
