"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { logEvent } from "@/lib/events";
import { TEAM_LIMIT } from "@/lib/team";

const back = (q = "") => { revalidatePath("/settings"); redirect(`/settings${q}#team`); };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function inviteTeamMember(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!emailRe.test(email)) back("?team_error=" + encodeURIComponent("Enter a valid email address."));

  if (!config.hasSupabaseAdmin()) back("?team_demo=1"); // demo: no-op
  const user = await getUser();
  if (!user) redirect("/login");

  const db = createSupabaseAdminClient();
  const { count } = await db.from("team_members").select("*", { count: "exact", head: true }).eq("owner_id", user.id);
  if ((count ?? 0) >= TEAM_LIMIT) back("?team_error=" + encodeURIComponent(`Team limit reached (${TEAM_LIMIT}).`));

  const { error } = await db.from("team_members").insert({ owner_id: user.id, email, role: "member", status: "invited" });
  if (error) back("?team_error=" + encodeURIComponent(error.code === "23505" ? "That teammate is already invited." : "Could not invite."));
  await logEvent("plan_change", { userId: user.id, email: user.email, metadata: { action: "team_invite", invited: email } });
  back("?team_invited=1");
}

export async function removeTeamMember(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!config.hasSupabaseAdmin()) back("?team_demo=1");
  const user = await getUser();
  if (!user) redirect("/login");
  const db = createSupabaseAdminClient();
  await db.from("team_members").delete().eq("id", id).eq("owner_id", user.id);
  back("?team_removed=1");
}
