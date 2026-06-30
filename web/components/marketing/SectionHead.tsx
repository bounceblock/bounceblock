export function SectionHead({
  eyebrow,
  title,
  sub,
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  /** Heading level for the title. Use "h1" when this is the page's main heading. */
  as?: "h1" | "h2";
}) {
  const headingCls = "mt-3 font-serif text-[clamp(30px,4vw,44px)]";
  return (
    <div className="mx-auto mb-12 max-w-[660px] text-center" data-reveal>
      <div className="mx-auto mb-4 h-0.5 w-8 rounded bg-brand" />
      <span className="eyebrow">{eyebrow}</span>
      {as === "h1" ? (
        <h1 className={headingCls}>{title}</h1>
      ) : (
        <h2 className={headingCls}>{title}</h2>
      )}
      {sub && <p className="mt-4 text-[17.5px] text-ink-2">{sub}</p>}
    </div>
  );
}
