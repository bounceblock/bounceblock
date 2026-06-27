"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const KEY = "bb-cookie-consent";

/** Non-intrusive bottom cookie-consent bar (GDPR/ePrivacy). Saves choice to localStorage. */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "all" | "essential") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    try {
      window.dispatchEvent(new Event("bb-consent"));
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-hair bg-raised/95 p-4 shadow-s3 backdrop-blur-md sm:flex-row sm:p-5">
        <p className="flex-1 text-[13.5px] text-ink-2">
          We use cookies to run the site and improve your experience. See our{" "}
          <Link href="/legal/cookies" className="font-medium text-brand-deep underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2.5">
          <Button onClick={() => decide("essential")} variant="ghost" className="px-4 py-2.5 text-[13.5px]">
            Essential only
          </Button>
          <Button onClick={() => decide("all")} className="px-4 py-2.5 text-[13.5px]">
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
