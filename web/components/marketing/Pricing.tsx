import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/marketing/SectionHead";
import { Button } from "@/components/ui/Button";
import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { PLANS } from "@/lib/plans";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <Container>
        <SectionHead
          eyebrow="Simple, flat pricing"
          title="One price. No credits. No surprises."
          sub="Pay a flat monthly rate and verify your lists — emails and phones included. Cancel anytime."
        />
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-[22px] border bg-raised p-7 shadow-s1",
                plan.popular ? "border-brand shadow-s3" : "border-hair"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3.5 py-1 text-[11px] font-semibold text-white shadow-glow">
                  MOST POPULAR
                </span>
              )}
              <div className="text-[15px] font-semibold text-ink-2">{plan.name}</div>
              <div className="mt-2.5 font-serif text-[42px] font-semibold leading-none tracking-tight">
                ${plan.priceMonthly}
                {plan.priceMonthly > 0 && <span className="font-sans text-sm font-medium text-ink-3"> /mo</span>}
              </div>
              <div className="mb-5 mt-1 text-[13.4px] text-ink-2">{plan.quota.toLocaleString()} verifications / month</div>
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
          ))}
        </div>
        <p className="mt-7 text-center text-sm text-ink-3">
          14-day money-back guarantee · You never pay for &ldquo;unknown&rdquo; results · Save 2 months with annual billing
        </p>
      </Container>
    </section>
  );
}
