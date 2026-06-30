"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";
import { Button } from "@/components/ui/Button";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { PLANS } from "@/lib/plans";
import { cn } from "@/lib/utils";

export function Pricing({ headingAs = "h2" }: { headingAs?: "h1" | "h2" } = {}) {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20">
      <Container>
        <SectionHead
          as={headingAs}
          eyebrow="Simple, flat pricing"
          title="One price. No credits. No surprises."
          sub="Pay a flat monthly rate and verify your lists — emails and phones included. Cancel anytime."
        />

        {/* billing toggle */}
        <div className="-mt-6 mb-11 flex items-center justify-center gap-3.5">
          <span className={cn("text-[14.5px] font-medium", annual ? "text-ink-3" : "text-ink")}>Monthly</span>
          <button
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((a) => !a)}
            className={cn(
              "relative h-7 w-[50px] rounded-full border transition-colors",
              annual ? "border-brand bg-brand" : "border-hair bg-sunk"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-s1 transition-transform",
                annual ? "translate-x-[23px]" : "translate-x-0.5"
              )}
            />
          </button>
          <span className={cn("text-[14.5px] font-medium", annual ? "text-ink" : "text-ink-3")}>Annual</span>
          <span className="rounded-full border border-brand/25 bg-brand-wash px-2.5 py-0.5 text-[11.5px] font-semibold text-brand-deep">
            Save 2 months
          </span>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => {
            const price = annual ? plan.priceAnnualPerMonth : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className={cn(
                  "lift relative flex flex-col rounded-[22px] border bg-raised p-7 shadow-s1",
                  plan.popular ? "border-brand shadow-s3 hover:shadow-s3" : "border-hair hover:border-brand/40 hover:shadow-s2"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3.5 py-1 text-[11px] font-semibold text-white shadow-glow">
                    MOST POPULAR
                  </span>
                )}
                <div className="text-[15px] font-semibold text-ink-2">{plan.name}</div>
                <div className="mt-2.5 font-serif text-[42px] font-semibold leading-none tracking-tight">
                  ${price}
                  {price > 0 && <span className="font-sans text-sm font-medium text-ink-3"> /mo</span>}
                </div>
                <div className="mb-5 mt-1 text-[13.4px] text-ink-2">
                  {plan.quota.toLocaleString()} verifications / month
                  {annual && price > 0 && <span className="block text-[12px] text-ink-3">billed annually</span>}
                </div>
                <ul className="mb-6 grid gap-2.5 text-[13.4px] text-ink-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-brand">
                        <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.id === "free" ? (
                  <Button href="/signup" variant="ghost" className="mt-auto w-full">Start free</Button>
                ) : (
                  <CheckoutButton plan={plan.id} variant={plan.popular ? "accent" : "ghost"} className="mt-auto w-full">
                    Choose {plan.name}
                  </CheckoutButton>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-7 text-center text-sm text-ink-3">
          14-day money-back guarantee · You never pay for &ldquo;unknown&rdquo; results
        </p>
      </Container>
    </section>
  );
}
