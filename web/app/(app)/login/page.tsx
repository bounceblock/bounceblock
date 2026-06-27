import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AuthShell } from "@/components/marketing/AuthShell";
import { login } from "./actions";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <AuthShell>
      <h1 className="font-serif text-3xl">Welcome back</h1>
      <p className="mt-2 text-[15px] text-ink-2">Log in to verify lists and download clean files.</p>

      {searchParams.error && (
        <p className="mt-5 rounded-md border border-invalid/30 bg-invalid/5 px-3.5 py-2.5 text-[13px] text-invalid">
          {searchParams.error}
        </p>
      )}

      <form action={login} className="mt-7 grid gap-4">
        <Field label="Email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
        <Field label="Password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
        <Button type="submit">Log in</Button>
      </form>

      <p className="mt-3 text-center text-[13px]">
        <Link href="/forgot" className="text-ink-3 transition-colors hover:text-ink">Forgot password?</Link>
      </p>
      <p className="mt-3 text-center text-sm text-ink-2">
        New here?{" "}
        <Link href="/signup" className="font-medium text-brand-deep underline">Create a free account</Link>
      </p>
    </AuthShell>
  );
}

function Field({
  label, name, type, placeholder, autoComplete,
}: {
  label: string; name: string; type: string; placeholder: string; autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-medium text-ink-2">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="rounded-md border border-hair bg-raised px-3.5 py-2.5 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-wash"
      />
    </label>
  );
}
