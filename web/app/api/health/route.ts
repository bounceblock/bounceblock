import { NextResponse } from "next/server";

/** Lightweight liveness probe (used by UptimeRobot, deploy checks). */
export function GET() {
  return NextResponse.json({ status: "ok", service: "bounceblock", phase: 1 });
}
