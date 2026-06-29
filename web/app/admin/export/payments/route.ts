import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { getAdminPayments } from "@/lib/admin-data";
import { toCsv } from "@/lib/csv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Admin-only CSV export of payments. */
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const { payments } = await getAdminPayments();
  const csv = toCsv(
    ["id", "user_id", "amount_cents", "currency", "status", "created_at"],
    payments.map((p) => [p.id, p.user_id, p.amount, p.currency, p.status, p.created_at]),
  );
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="bounceblock-payments.csv"`,
    },
  });
}
