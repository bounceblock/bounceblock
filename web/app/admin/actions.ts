"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { config } from "@/lib/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";

export async function changePlan(formData: FormData) {
  if (!(await isAdmin())) redirect("/login");
  const userId = String(formData.get("userId"));
  const plan = String(formData.get("plan"));
  if (config.hasSupabaseAdmin()) {
    const db = createSupabaseAdminClient();
    await db.from("profiles").update({ plan }).eq("id", userId);
  }
  revalidatePath(`/admin/users/${userId}`);
  redirect(`/admin/users/${userId}?updated=1`);
}

export async function grantCredit(formData: FormData) {
  if (!(await isAdmin())) redirect("/login");
  const userId = String(formData.get("userId"));
  const cents = Number(formData.get("cents") ?? 0);
  if (config.hasSupabaseAdmin()) {
    const db = createSupabaseAdminClient();
    const { data } = await db.from("profiles").select("referral_credit_cents").eq("id", userId).single();
    await db.from("profiles").update({ referral_credit_cents: (data?.referral_credit_cents ?? 0) + cents }).eq("id", userId);
  }
  revalidatePath(`/admin/users/${userId}`);
  redirect(`/admin/users/${userId}?updated=1`);
}
