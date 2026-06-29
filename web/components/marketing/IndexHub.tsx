import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/marketing/FinalCta";

export interface HubItem {
  href: string;
  label: string;
  desc?: string;
}

/** Reusable directory/hub page (countries, tools, glossary, integrations, …). */
export function IndexHub({
  eyebrow,
  title,
  intro,
  items,
  columns = 3,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: HubItem[];
  columns?: 2 | 3 | 4;
}) {
  const cols = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <>
      <section className="relative overflow-hidden border-b border-hair">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[360px] bg-[radial-gradient(40%_60%_at_28%_28%,rgba(46,169,78,.12),transparent_70%),radial-gradient(36%_50%_at_76%_22%,rgba(27,127,212,.1),transparent_70%)] blur-2xl" />
        <Container className="relative py-16">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(30px,4.4vw,48px)] leading-[1.06]">{title}</h1>
          <p className="mt-4 max-w-2xl text-[17px] text-ink-2">{intro}</p>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className={`grid gap-4 ${cols}`}>
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="group rounded-2xl border border-hair bg-raised p-5 shadow-s1 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-s2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[18px] text-ink group-hover:text-brand-deep">{it.label}</span>
                  <span className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
                </div>
                {it.desc && <p className="mt-1.5 text-[13.5px] text-ink-2">{it.desc}</p>}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
