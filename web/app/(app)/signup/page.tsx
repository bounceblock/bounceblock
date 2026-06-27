import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/marketing/AuthShell";
import { signup } from "./actions";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage({ searchParams }: { searchParams: { error?: string; ref?: string } }) {
  return (
    <AuthShell>
      <h1 className="font-serif text-3xl">Start free</h1>
      <p className="mt-2 text-[15px] text-ink-2">100 free verifications. No credit card required.</p>

      {searchParams.error && (
        <p className="mt-5 rounded-md border border-invalid/30 bg-invalid/5 px-3.5 py-2.5 text-[13px] text-invalid">
          {searchParams.error}
        </p>
      )}

      <form action={signup} className="mt-7 grid gap-4">
        <input type="hidden" name="ref" defaultValue={searchParams.ref ?? ""} />
        <Field label="Name" name="name" type="text" placeholder="Jane Doe" autoComplete="name" />
        <Field label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
        <Field label="Password" name="password" type="password" placeholder="At least 12 characters" autoComplete="new-password" minLength={12} />
        <Button type="submit">Create free account</Button>
      </form>

      <p className="mt-4 text-center text-xs text-ink-3">
        By signing up you agree to our{" "}
        <Link href="/legal/terms" className="underline">Terms</Link> and{" "}
        <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.
      </p>
      <p className="mt-4 text-center text-sm text-ink-2">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-deep underline">Log in</Link>
      </p>
    </AuthShell>
  );
}

function Field({
  label, name, type, placeholder, autoComplete, minLength,
}: {
  label: string; name: string; type: string; placeholder: string; autoComplete?: string; minLength?: number;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-medium text-ink-2">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        required
        className="rounded-md border border-hair bg-raised px-3.5 py-2.5 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-wash"
      />
    </label>
  );
}
