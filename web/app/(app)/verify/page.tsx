import type { Metadata } from "next";
import { VerifyTool } from "@/components/verify/VerifyTool";

export const metadata: Metadata = { title: "Verify a list" };

export default function VerifyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl">Verify a list</h1>
      <p className="mt-2 text-[15px] text-ink-2">
        Upload a CSV — we&rsquo;ll auto-detect your columns and preview the first 100 rows free.
      </p>
      <div className="mt-8">
        <VerifyTool />
      </div>
    </div>
  );
}
