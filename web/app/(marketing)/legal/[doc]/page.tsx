import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LEGAL, type LegalSection } from "@/lib/legal";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return Object.keys(LEGAL).map((doc) => ({ doc }));
}

export function generateMetadata({ params }: { params: { doc: string } }): Metadata {
  const d = LEGAL[params.doc];
  return d ? { title: d.title, description: d.summary } : {};
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function LegalPage({ params }: { params: { doc: string } }) {
  const doc = LEGAL[params.doc];
  if (!doc) notFound();

  return (
    <Container className="max-w-3xl py-16">
      <span className="eyebrow">Legal</span>
      <h1 className="mt-3 font-serif text-[clamp(30px,4.2vw,46px)]">{doc.title}</h1>
      <p className="mt-2 text-[13.5px] text-ink-3">Last updated: {doc.updated}</p>
      <p className="mt-5 text-[17px] text-ink-2">{doc.intro}</p>

      {/* table of contents */}
      <nav className="mt-8 rounded-xl border border-hair bg-sunk/40 p-5">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-ink-3">On this page</p>
        <ol className="grid gap-1.5 text-[14px] sm:grid-cols-2">
          {doc.sections.map((s) => (
            <li key={s.heading}>
              <a href={`#${slug(s.heading)}`} className="text-ink-2 transition-colors hover:text-brand-deep">
                {s.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {doc.sections.map((s) => (
          <Section key={s.heading} section={s} />
        ))}
      </div>

      <p className="mt-12 rounded-xl border border-hair bg-sunk/40 p-5 text-[13px] text-ink-3">
        This document is a template provided for convenience and is not legal advice. Have qualified counsel review it
        before you rely on it. Questions: <a href={`mailto:${SITE.email.privacy}`} className="underline">{SITE.email.privacy}</a>.
      </p>

      <p className="mt-6 text-center text-[13.5px] text-ink-3">
        <Link href="/security" className="text-brand-deep underline">Security overview</Link> ·{" "}
        <Link href="/trust" className="text-brand-deep underline">Trust center</Link>
      </p>
    </Container>
  );
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section id={slug(section.heading)} className="scroll-mt-24">
      <h2 className="font-serif text-[24px]">{section.heading}</h2>
      {section.paras?.map((p, i) => (
        <p key={i} className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{p}</p>
      ))}
      {section.bullets && (
        <ul className="mt-3 grid gap-2">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15.5px] text-ink-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="mt-4 overflow-hidden rounded-xl border border-hair">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-hair bg-sunk/50 text-left">
                {section.table.headers.map((h) => (
                  <th key={h} className="px-4 py-2.5 font-semibold text-ink">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i} className="border-b border-hair last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 text-ink-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
