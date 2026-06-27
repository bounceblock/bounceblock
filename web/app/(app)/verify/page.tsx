import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";
import { VerifyTool } from "@/components/verify/VerifyTool";

export const metadata: Metadata = { title: "Verify a list" };

export default function VerifyPage() {
  return (
    <AppShell active="verify">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl">Verify a list</h1>
        <p className="mt-2 text-[15px] text-ink-2">
          Upload a CSV — we&rsquo;ll auto-detect your columns and preview the first 100 rows free.
        </p>
        <div className="mt-8">
          <VerifyTool />
        </div>
      </div>
    </AppShell>
  );
}
