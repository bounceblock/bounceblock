import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const REASSURE = ["100 free credits", "No credit card", "Cancel anytime"];

export function FinalCta() {
  return (
    <section className="py-20">
      <Container>
        <div data-reveal="scale" className="relative overflow-hidden rounded-[28px] border border-hair bg-gradient-to-b from-tint to-brand-wash px-10 py-16 text-center">
          <div className="pointer-events-none absolute inset-x-0 -top-32 h-80 bg-[radial-gradient(40%_60%_at_50%_30%,rgba(46,169,78,.18),transparent_70%)] blur-2xl" />
          <h2 className="relative font-serif text-[clamp(31px,4.4vw,50px)]">Stop wasting hours on dead leads.</h2>
          <p className="relative mx-auto mt-4 max-w-[470px] text-[18px] text-ink-2">
            Upload your list and see how clean it really is — free, in under two minutes.
          </p>
          <div className="relative mt-7">
            <Button href="/signup" size="lg">Clean my list free →</Button>
          </div>
          <div className="relative mt-5 flex flex-wrap justify-center gap-5 text-[13.3px] text-ink-3">
            {REASSURE.map((r) => (
              <span key={r} className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-brand">
                  <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {r}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
