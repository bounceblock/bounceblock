"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { REFERRAL_CREDIT_USD } from "@/lib/referral";

/** "Refer & earn" card with a copyable referral link. */
export function ReferralCard({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="rounded-2xl border border-brand/25 bg-brand-wash/50 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl">Refer &amp; earn ${REFERRAL_CREDIT_USD}</h2>
          <p className="mt-1 text-[14px] text-ink-2">
            Share your link — you both get a ${REFERRAL_CREDIT_USD} credit when a friend subscribes.
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-hair bg-raised py-1.5 pl-3.5 pr-1.5">
        <input
          readOnly
          value={url}
          aria-label="Your referral link"
          className="min-w-0 flex-1 bg-transparent text-[13.5px] text-ink-2 outline-none"
        />
        <Button onClick={copy} className="px-4 py-2 text-sm">
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
