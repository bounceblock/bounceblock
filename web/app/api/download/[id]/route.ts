import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { getUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signedUrlForFile } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Redirect to a short-lived signed download URL for the user's own clean file. */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!config.hasSupabase()) {
    return NextResponse.json({ error: "not_configured" }, { status: 404 });
  }
  const user = await getUser();
  if (!user) return NextResponse.redirect(new URL("/login", config.siteUrl()));

  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("verifications")
    .select("result_storage_path, user_id")
    .eq("id", params.id)
    .single();

  if (!data || data.user_id !== user.id || !data.result_storage_path) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const url = await signedUrlForFile(data.result_storage_path, 3600);
  if (!url) return NextResponse.json({ error: "unavailable" }, { status: 404 });
  return NextResponse.redirect(url);
}
