"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { createApiKey } from "@/app/(app)/settings/api-actions";

export function ApiKeysCard() {
  const [key, setKey] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);
  const [err, setErr] = useState("");
  const [pending, start] = useTransition();

  function gen() {
    setErr("");
    start(async () => {
      const r = await createApiKey();
      if (r.error) setErr(r.error);
      else {
        setKey(r.key ?? null);
        setDemo(Boolean(r.demo));
      }
    });
  }

  return (
    <div className="rounded-2xl border border-hair bg-raised p-6 shadow-s1">
      <h2 className="font-serif text-lg">API access</h2>
      <p className="mt-1 text-[14px] text-ink-2">
        Generate a key to verify emails &amp; phones via the API. See the{" "}
        <Link href="/api-docs" className="text-brand-deep underline">docs</Link>.
      </p>

      {key ? (
        <div className="mt-4">
          <div className="rounded-lg border border-hair bg-canvas px-3 py-2.5 font-mono text-[13px] text-ink">{key}</div>
          <p className="mt-2 text-[12.5px] text-ink-3">
            {demo ? "Demo key — connect Supabase to issue real keys." : "Copy this now — it won't be shown again."}
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <Button onClick={gen}>{pending ? "Generating…" : "Generate API key"}</Button>
          {err && <p className="mt-2 text-[13px] text-invalid">{err}</p>}
        </div>
      )}
    </div>
  );
}
