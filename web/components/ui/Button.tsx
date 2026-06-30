import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "accent" | "dark" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ease-out active:translate-y-0 active:scale-[.985]";

const variants: Record<Variant, string> = {
  accent: "bg-brand text-white shadow-glow hover:-translate-y-0.5 hover:bg-brand-deep",
  dark: "bg-ink text-white hover:-translate-y-0.5 hover:shadow-s3",
  ghost: "bg-raised text-ink border border-hair hover:border-ink-3 hover:-translate-y-0.5 hover:shadow-s1",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children: React.ReactNode;
}

export function Button({ href, variant = "accent", size = "md", className, onClick, type = "button", children }: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
