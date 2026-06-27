export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-[660px] text-center">
      <div className="mx-auto mb-4 h-0.5 w-8 rounded bg-brand" />
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-serif text-[clamp(30px,4vw,44px)]">{title}</h2>
      {sub && <p className="mt-4 text-[17.5px] text-ink-2">{sub}</p>}
    </div>
  );
}
