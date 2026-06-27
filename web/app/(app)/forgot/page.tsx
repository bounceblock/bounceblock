import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/marketing/AuthShell";
import { requestReset } from "./actions";

export const metadata: Metadata = { title: "Reset password" };

export default function ForgotPage({ searchParams }: { searchParams: { sent?: string; error?: string } }) {
  return (
    <AuthShell>
      <h1 className="font-serif text-3xl">Reset your password</h1>
      <p className="mt-2 text-[15px] text-ink-2">Enter your email and we&rsquo;ll send a reset link.</p>

      {searchParams.sent && (
        <p className="mt-5 rounded-md border border-brand/30 bg-brand-wash/60 px-3.5 py-2.5 text-[13px] text-brand-deep">
          If an account exists for that email, a reset link is on its way.
        </p>
      )}
      {searchParams.error && (
        <p className="mt-5 rounded-md border border-invalid/30 bg-invalid/5 px-3.5 py-2.5 text-[13px] text-invalid">
          {searchParams.error}
        </p>
      )}

      <form action={requestReset} className="mt-7 grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-[13px] font-medium text-ink-2">Email</span>
          <input name="email" type="email" required placeholder="you@company.com" autoComplete="email"
            className="rounded-md border border-hair bg-raised px-3.5 py-2.5 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-wash" />
        </label>
        <Button type="submit">Send reset link</Button>
      </form>

      <p className="mt-5 text-center text-sm text-ink-2">
        <Link href="/login" className="font-medium text-brand-deep underline">Back to log in</Link>
      </p>
    </AuthShell>
  );
}
