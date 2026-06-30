"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal driver. Mounted once in the marketing layout.
 *
 * Strategy (SEO + a11y safe):
 *  - The hidden state lives behind `html.reveal-ready`, a class this component
 *    adds on mount. So server-rendered / no-JS HTML is always fully visible and
 *    crawlable; we only "hide-then-reveal" once JS is confirmed.
 *  - Under prefers-reduced-motion we reveal everything immediately.
 *  - A single IntersectionObserver watches every `[data-reveal]`; a
 *    MutationObserver re-scans after client-side route changes.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    const observed = new WeakSet<Element>();
    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
        .forEach((el) => {
          if (!observed.has(el)) {
            observed.add(el);
            io.observe(el);
          }
        });
    };

    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
