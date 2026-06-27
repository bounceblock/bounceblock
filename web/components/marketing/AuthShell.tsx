const BULLETS = ["100 free verifications", "Email + phone in one pass", "No credit card required"];

/** Split-screen wrapper for auth pages: brand panel + form. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-[calc(100vh-66px)] md:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1E7E3A] via-[#15857F] to-[#1B5FA8] p-12 text-white md:flex">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <span className="relative font-serif text-[22px] font-semibold">BounceBlock.io</span>
        <div className="relative">
          <h2 className="font-serif text-[34px] leading-[1.15]">Clean leads in.<br />Higher conversions out.</h2>
          <ul className="mt-7 grid gap-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[15px] text-white/90">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4 4 10-10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <blockquote className="relative text-[14.5px] text-white/85">
          “Cut our bounce rate from 14% to under 2% on the first upload.”
          <span className="mt-1 block text-[13px] text-white/65">— Maya Okafor, Northwind Realty</span>
        </blockquote>
      </aside>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
