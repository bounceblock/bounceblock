import { Container } from "@/components/ui/Container";

/** Reusable hero band for inner marketing pages. */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hair">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[380px] bg-[radial-gradient(40%_60%_at_30%_30%,rgba(46,169,78,.12),transparent_70%),radial-gradient(36%_50%_at_75%_20%,rgba(27,127,212,.10),transparent_70%)] blur-2xl" />
      <Container className="relative py-16 text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mx-auto mt-3 max-w-3xl font-serif text-[clamp(32px,4.6vw,52px)] leading-[1.05]">{title}</h1>
        {sub && <p className="mx-auto mt-5 max-w-2xl text-[18px] text-ink-2">{sub}</p>}
        {children}
      </Container>
    </section>
  );
}
