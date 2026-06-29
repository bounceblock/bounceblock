import { NextRequest, NextResponse } from "next/server";
import { mockEmail, mockPhone } from "@/lib/verification/mock";
import { ZeroBounceVerifier } from "@/lib/verification/zerobounce";
import { NumVerifyValidator } from "@/lib/verification/numverify";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public single-record check powering the free /tools/email-verifier and
 * /tools/phone-validator widgets. Mock-capable (works with no keys), rate-limited
 * to keep the free tools from becoming a cost/abuse hole.
 */
export async function POST(req: NextRequest) {
  if (!rateLimit(`tool:${clientIp(req)}`, 20, 60_000).ok) {
    return NextResponse.json({ error: "Too many checks. Please wait a minute." }, { status: 429 });
  }

  const { kind, value } = (await req.json().catch(() => ({}))) as { kind?: string; value?: string };
  const input = (value ?? "").trim();
  if (!input) return NextResponse.json({ error: "Enter a value to check." }, { status: 400 });

  if (kind === "email") {
    const res = process.env.ZEROBOUNCE_API_KEY
      ? await new ZeroBounceVerifier().verifyEmail(input)
      : mockEmail(input);
    return NextResponse.json({
      kind: "email",
      status: res.status,
      subStatus: res.subStatus ?? null,
      didYouMean: res.didYouMean ?? null,
      mock: !process.env.ZEROBOUNCE_API_KEY,
    });
  }

  if (kind === "phone") {
    const res = process.env.NUMVERIFY_API_KEY
      ? await new NumVerifyValidator().validatePhone(input)
      : mockPhone(input);
    return NextResponse.json({
      kind: "phone",
      valid: res.valid,
      lineType: res.lineType,
      carrier: res.carrier ?? null,
      country: res.country ?? null,
      mock: !process.env.NUMVERIFY_API_KEY,
    });
  }

  return NextResponse.json({ error: "Unknown check type." }, { status: 400 });
}
