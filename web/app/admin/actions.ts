"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { config } from "@/lib/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";
import { logAdminAction } from "@/lib/admin-audit";
import { logEvent } from "@/lib/events";
import { quotaForPlan, type PlanId } from "@/lib/plans";

/** Read a user's email for audit context (best-effort). */
async function emailFor(userId: string): Promise<string | null> {
  if (!config.hasSupabaseAdmin()) return null;
  const db = createSupabaseAdminClient();
  const { data } = await db.from("profiles").select("email").eq("id", userId).single();
  return data?.email ?? null;
}

function done(userId: string) {
  revalidatePath(`/admin/users/${userId}`);
  redirect(`/admin/users/${userId}?updated=1`);
}

export async function changePlan(formData: FormData) {
  if (!(await isAdmin())) redirect("/login");
  const userId = String(formData.get("userId"));
  const plan = String(formData.get("plan"));
  if (config.hasSupabaseAdmin()) {
    const db = createSupabaseAdminClient();
    const { data: prev } = await db.from("profiles").select("plan, email").eq("id", userId).single();
    await db.from("profiles").update({ plan }).eq("id", userId);
    await logAdminAction("change_plan", { targetUserId: userId, targetEmail: prev?.email ?? null, detail: { from: prev?.plan, to: plan } });
    await logEvent("plan_change", { userId, email: prev?.email, metadata: { from: prev?.plan, to: plan, by: "admin" } });
  }
  done(userId);
}

export async function grantCredit(formData: FormData) {
  if (!(await isAdmin())) redirect("/login");
  const userId = String(formData.get("userId"));
  const cents = Number(formData.get("cents") ?? 0);
  if (config.hasSupabaseAdmin()) {
    const db = createSupabaseAdminClient();
    const { data } = await db.from("profiles").select("referral_credit_cents, email").eq("id", userId).single();
    await db.from("profiles").update({ referral_credit_cents: (data?.referral_credit_cents ?? 0) + cents }).eq("id", userId);
    await logAdminAction("grant_credit", { targetUserId: userId, targetEmail: data?.email ?? null, detail: { cents } });
  }
  done(userId);
}

export async function setSuspended(formData: FormData) {
  if (!(await isAdmin())) redirect("/login");
  const userId = String(formData.get("userId"));
  const suspend = String(formData.get("suspend")) === "1";
  if (config.hasSupabaseAdmin()) {
    const db = createSupabaseAdminClient();
    const email = await emailFor(userId);
    await db.from("profiles").update({ status: suspend ? "suspended" : "active" }).eq("id", userId);
    await logAdminAction(suspend ? "suspend" : "reactivate", { targetUserId: userId, targetEmail: email });
  }
  done(userId);
}

export async function resetUsage(formData: FormData) {
  if (!(await isAdmin())) redirect("/login");
  const userId = String(formData.get("userId"));
  if (config.hasSupabaseAdmin()) {
    const db = createSupabaseAdminClient();
    const email = await emailFor(userId);
    const { data: profile } = await db.from("profiles").select("plan").eq("id", userId).single();
    const quota = quotaForPlan(((profile?.plan as PlanId) ?? "free"));
    // Reset the current-period counter to zero (keep the quota for the plan).
    await db.from("usage").update({ verifications_used: 0, plan_quota: quota }).eq("user_id", userId);
    await logAdminAction("reset_usage", { targetUserId: userId, targetEmail: email, detail: { quota } });
  }
  done(userId);
}
