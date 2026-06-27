"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "bb-cookie-consent";

/**
 * Privacy-friendly, cookieless analytics (Plausible-compatible).
 * Loads only when (a) a domain is configured AND (b) the visitor accepted all
 * cookies. Reacts live to the cookie-consent banner via the "bb-consent" event.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        setConsented(localStorage.getItem(KEY) === "all");
      } catch {
        setConsented(false);
      }
    };
    check();
    window.addEventListener("bb-consent", check);
    return () => window.removeEventListener("bb-consent", check);
  }, []);

  if (!domain || !consented) return null;

  return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
}
