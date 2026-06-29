import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { getUsersForExport } from "@/lib/admin-data";
import { toCsv } from "@/lib/csv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Admin-only CSV export of users. */
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const users = await getUsersForExport();
  const csv = toCsv(
    ["id", "email", "plan", "status", "created_at", "last_seen_at"],
    users.map((u) => [u.id, u.email, u.plan, u.status, u.created_at, u.last_seen_at]),
  );
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="bounceblock-users.csv"`,
    },
  });
}
