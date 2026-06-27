"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/email";
import { config } from "@/lib/config";

export async function signup(formData: FormData) {
  if (!config.hasSupabase()) {
    redirect("/signup?error=" + encodeURIComponent("Sign up isn't configured yet."));
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("name") ?? "").trim();
  const ref = String(formData.get("ref") ?? "").trim();

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, referred_by: ref || null },
      emailRedirectTo: `${config.siteUrl()}/dashboard`,
    },
  });
  if (error) redirect("/signup?error=" + encodeURIComponent(error.message));

  try {
    await sendWelcomeEmail(email, fullName);
  } catch {
    // non-blocking — never fail signup on email
  }

  redirect("/dashboard");
}
