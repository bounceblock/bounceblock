import Link from "next/link";
import { cn } from "@/lib/utils";

/** BounceBlock logo: hexagon + envelope + verified check, with the wordmark. */
export function Logo({
  className,
  showWordmark = true,
  size = 32,
}: {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label="BounceBlock home">
      <LogoMark size={size} />
      {showWordmark && (
        <span className="font-serif text-[20px] font-semibold tracking-tight leading-none">
          <span className="text-ink">Bounce</span>
          <span className="text-brand">Block</span>
          <span className="text-accentblue">.io</span>
        </span>
      )}
    </Link>
  );
}

// Unique gradient id per render (header + footer would otherwise clash).
let markSeq = 0;

export function LogoMark({ size = 32 }: { size?: number }) {
  const gid = `bb-grad-${++markSeq}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#43B14A" />
          <stop offset="1" stopColor="#1E83D8" />
        </linearGradient>
      </defs>
      {/* hexagon */}
      <path d="M32 5 L55 18.5 V45.5 L32 59 L9 45.5 V18.5 Z" fill="none" stroke={`url(#${gid})`} strokeWidth="3.6" strokeLinejoin="round" />
      {/* envelope */}
      <rect x="17" y="25" width="27" height="17.5" rx="2.6" fill="#fff" stroke="#15233D" strokeWidth="2.4" />
      <path d="M18.5 26.5 L30.5 35 L43 26.5" fill="none" stroke="#1E83D8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* verified check badge */}
      <circle cx="45.5" cy="22" r="8.6" fill="#43B14A" stroke="#fff" strokeWidth="2" />
      <path d="M41.6 22 l2.6 2.7 l4.4 -5.1" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
