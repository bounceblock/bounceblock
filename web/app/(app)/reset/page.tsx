import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/marketing/AuthShell";
import { setPassword } from "./actions";

export const metadata: Metadata = { title: "Set a new password" };

export default function ResetPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <AuthShell>
      <h1 className="font-serif text-3xl">Set a new password</h1>
      <p className="mt-2 text-[15px] text-ink-2">Choose a new password for your account.</p>

      {searchParams.error && (
        <p className="mt-5 rounded-md border border-invalid/30 bg-invalid/5 px-3.5 py-2.5 text-[13px] text-invalid">
          {searchParams.error}
        </p>
      )}

      <form action={setPassword} className="mt-7 grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-[13px] font-medium text-ink-2">New password</span>
          <input name="password" type="password" required minLength={12} placeholder="At least 12 characters" autoComplete="new-password"
            className="rounded-md border border-hair bg-raised px-3.5 py-2.5 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-wash" />
        </label>
        <Button type="submit">Update password</Button>
      </form>
    </AuthShell>
  );
}
