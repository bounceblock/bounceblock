"use server";

import { redirect } from "next/navigation";
import { sendRawEmail } from "@/lib/email";
import { SITE } from "@/lib/constants";

export async function submitContact(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!email || !message) redirect("/contact?error=1");

  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  try {
    await sendRawEmail(
      SITE.email.support,
      `Contact form — ${name || email}`,
      `<p><b>From:</b> ${esc(name)} (${esc(email)})</p><p>${esc(message)}</p>`,
      { replyTo: email } // reply goes straight to the person who wrote in
    );
  } catch {
    // non-blocking
  }
  redirect("/contact?sent=1");
}
