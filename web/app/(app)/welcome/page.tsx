import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { getUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Welcome" };
export const dynamic = "force-dynamic";

const STEPS = [
  { n: 1, title: "Upload a list", desc: "Drop in a CSV — we auto-detect your email, phone and company columns.", href: "/verify", cta: "Verify a list" },
  { n: 2, title: "Preview free", desc: "See your first 100 contacts verified and your quality score, before you pay anything." },
  { n: 3, title: "Download clean data", desc: "Process the full list, then download a verified, deduplicated file ready to send." },
];

export default async function WelcomePage() {
  const user = await getUser();
  const name = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[460px] bg-[radial-gradient(40%_60%_at_30%_25%,rgba(46,169,78,.14),transparent_70%),radial-gradient(36%_50%_at_74%_20%,rgba(27,127,212,.11),transparent_70%)] blur-2xl" />
      <div className="relative mx-auto max-w-2xl px-6 py-16">
        <Logo />
        <h1 className="mt-8 font-serif text-[clamp(30px,4.6vw,46px)] leading-[1.07]">
          Welcome{name ? `, ${name}` : ""} — let&rsquo;s clean your first list
        </h1>
        <p className="mt-4 text-[17px] text-ink-2">
          You&rsquo;ve got 100 free verifications to start. Here&rsquo;s how it works — it takes about two minutes.
        </p>

        <div className="mt-10 grid gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="flex items-start gap-4 rounded-2xl border border-hair bg-raised p-6 shadow-s1">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-wash font-serif text-[16px] font-semibold text-brand-deep">{s.n}</span>
              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-xl">{s.title}</h2>
                <p className="mt-1 text-[15px] text-ink-2">{s.desc}</p>
                {s.href && (
                  <Link href={s.href} className="mt-2 inline-block text-[14px] font-semibold text-brand-deep hover:underline">{s.cta} →</Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/verify" size="lg">Verify my first list →</Button>
          <Link href="/dashboard" className="text-[14px] font-medium text-ink-2 transition-colors hover:text-ink">Skip to dashboard</Link>
        </div>

        <p className="mt-8 text-[13px] text-ink-3">
          Need ideas? Browse <Link href="/use-cases" className="text-brand-deep underline">use cases</Link> or read the{" "}
          <Link href="/blog/how-to-clean-an-email-list" className="text-brand-deep underline">list-cleaning guide</Link>.
        </p>
      </div>
    </main>
  );
}
