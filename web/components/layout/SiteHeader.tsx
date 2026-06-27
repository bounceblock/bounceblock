"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NAV, type NavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Sticky, responsive marketing header with dropdown menus + a mobile drawer. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-canvas/75 backdrop-blur-md backdrop-saturate-150 transition-colors",
        scrolled ? "border-b border-hair" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-site items-center gap-6 px-7 py-3.5">
        <Logo />

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <DesktopItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <Link href="/login" className="text-[14.5px] font-medium text-ink-2 transition-colors hover:text-ink">
            Log in
          </Link>
          <Button href="/signup">Start free</Button>
        </div>

        <button
          className="ml-auto grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-sunk md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <BurgerIcon />}
        </button>
      </div>

      {open && (
        <div className="border-t border-hair bg-canvas md:hidden">
          <nav className="mx-auto max-w-site px-5 py-3">
            {NAV.map((item) => (
              <MobileItem
                key={item.label}
                item={item}
                expanded={expanded === item.label}
                onToggle={() => setExpanded((e) => (e === item.label ? null : item.label))}
                onNavigate={() => setOpen(false)}
              />
            ))}
            <div className="mt-3 grid gap-2 border-t border-hair pt-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-center text-[15px] font-medium text-ink-2"
              >
                Log in
              </Link>
              <Button href="/signup" className="w-full">
                Start free
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function DesktopItem({ item }: { item: NavItem }) {
  if (!item.children) {
    return (
      <Link
        href={item.href!}
        className="rounded-lg px-3 py-2 text-[14.5px] font-medium text-ink-2 transition-colors hover:text-ink"
      >
        {item.label}
      </Link>
    );
  }
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-[14.5px] font-medium text-ink-2 transition-colors hover:text-ink">
        {item.label}
        <Chevron className="transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="w-[320px] rounded-xl border border-hair bg-raised p-2 shadow-s3">
          {item.children.map((c) => (
            <Link key={c.label} href={c.href} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-sunk">
              <div className="text-[14px] font-semibold text-ink">{c.label}</div>
              {c.desc && <div className="mt-0.5 text-[12.5px] text-ink-3">{c.desc}</div>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileItem({
  item,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  if (!item.children) {
    return (
      <Link href={item.href!} onClick={onNavigate} className="block rounded-lg px-3 py-3 text-[15.5px] font-medium text-ink">
        {item.label}
      </Link>
    );
  }
  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[15.5px] font-medium text-ink"
      >
        {item.label}
        <Chevron className={cn("transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="ml-3 border-l border-hair pl-3">
          {item.children.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2.5 text-[14.5px] text-ink-2 transition-colors hover:text-ink"
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BurgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
