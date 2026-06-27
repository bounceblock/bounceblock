"use client";

import { useState } from "react";

/** Compact footer newsletter capture. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setDone(true);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return <p className="text-[13.5px] text-brand-deep">Thanks — you&rsquo;re subscribed.</p>;
  }

  return (
    <form onSubmit={submit} className="flex max-w-xs items-center gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Email for deliverability tips"
        className="min-w-0 flex-1 rounded-lg border border-hair bg-raised px-3 py-2 text-[13.5px] outline-none transition focus:border-brand"
      />
      <button
        type="submit"
        disabled={busy}
        className="shrink-0 rounded-lg bg-ink px-3.5 py-2 text-[13.5px] font-semibold text-white disabled:opacity-60"
      >
        {busy ? "…" : "Subscribe"}
      </button>
    </form>
  );
}
