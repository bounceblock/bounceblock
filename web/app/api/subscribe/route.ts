import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Newsletter subscribe. Phase 6: wire to your ESP / a `subscribers` table.
 * For now it validates + rate-limits and acknowledges.
 */
export async function POST(req: NextRequest) {
  if (!rateLimit(`subscribe:${clientIp(req)}`, 5, 60_000).ok) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  // TODO: persist to a subscribers table / push to ESP.
  console.log(`[subscribe] ${email}`);
  return NextResponse.json({ ok: true });
}
