"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";
import { JsonLd } from "@/components/JsonLd";
import { faqLd } from "@/lib/jsonld";
import { cn } from "@/lib/utils";

const QA = [
  ["How accurate is the verification?", "BounceBlock runs multi-step checks — syntax, domain, MX records, live SMTP mailbox pings, plus catch-all and disposable detection — to reach 99%+ accuracy on deliverable verdicts. Phone numbers are validated for line type and active status."],
  ["What happens to my uploaded data?", "Your file is encrypted with AES-256, processed, and permanently deleted within 24 hours. We never sell or share your contacts — verification is the only thing we ever do with them. GDPR and CCPA compliant from day one."],
  ["Do you really include phone validation?", "Yes — in the same upload, at no extra cost. Most email verification tools don't touch phone numbers. BounceBlock validates both, so one clean file covers your whole outreach."],
  ["Is it really flat pricing, not credits?", "One flat monthly price with a generous monthly allowance — no per-credit math, no surprise overage bills. Start free with 100 verifications, upgrade when you need more."],
  ["Can I try it before paying?", "Absolutely. Upload a list and preview your first 100 results free — no credit card. You'll see exactly how many bad contacts are hiding before you decide to unlock the full clean file."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20">
      <JsonLd data={faqLd(QA.map(([q, a]) => ({ q, a })))} />
      <Container>
        <SectionHead eyebrow="Questions" title="Everything you might ask" />
        <div className="mx-auto grid max-w-[780px] gap-3">
          {QA.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-[16px] border border-hair bg-raised shadow-s1">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-semibold"
                >
                  {q}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    className={cn("shrink-0 text-ink-3 transition-transform duration-300", isOpen && "rotate-180 text-brand")}
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[15px] text-ink-2">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
