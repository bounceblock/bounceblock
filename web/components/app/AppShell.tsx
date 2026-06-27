import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { getUser } from "@/lib/auth";
import { logout } from "@/app/(app)/actions";
import { cn } from "@/lib/utils";

type NavKey = "dashboard" | "verify" | "history" | "billing" | "settings";

const NAV: { key: NavKey; label: string; href: string; icon: React.ReactNode }[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: <PathIcon d="M4 13h7V4H4zM13 20h7v-9h-7zM13 4v5h7V4zM4 20h7v-5H4z" /> },
  { key: "verify", label: "Verify a list", href: "/verify", icon: <PathIcon d="M5 12.5l4 4 10-10" /> },
  { key: "history", label: "History", href: "/history", icon: <PathIcon d="M12 8v5l3 2M21 12a9 9 0 11-9-9" /> },
  { key: "billing", label: "Billing", href: "/billing", icon: <PathIcon d="M3 7h18v10H3zM3 11h18" /> },
  { key: "settings", label: "Settings", href: "/settings", icon: <PathIcon d="M12 15a3 3 0 100-6 3 3 0 000 6zM4 12h2m12 0h2M12 4v2m0 12v2" /> },
];

/** Authenticated product shell: left sidebar (desktop) + top nav (mobile). */
export async function AppShell({ active, children }: { active: NavKey; children: React.ReactNode }) {
  const user = await getUser();
  const email = user?.email ?? "Demo mode";

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-hair bg-raised/40 p-4 md:flex">
        <div className="px-2 py-1.5">
          <Logo />
        </div>
        <nav className="mt-5 grid gap-1">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors",
                active === n.key ? "bg-brand-wash text-brand-deep" : "text-ink-2 hover:bg-sunk"
              )}
            >
              {n.icon}
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-hair pt-3">
          <div className="truncate px-3 py-1 text-[12px] text-ink-3">{email}</div>
          <form action={logout}>
            <button className="w-full rounded-lg px-3 py-2 text-left text-[14px] text-ink-2 transition-colors hover:bg-sunk">
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile header + nav */}
        <header className="flex items-center justify-between border-b border-hair px-5 py-3 md:hidden">
          <Logo />
          <form action={logout}>
            <button className="text-sm text-ink-2">Log out</button>
          </form>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-hair px-4 py-2 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium",
                active === n.key ? "bg-brand-wash text-brand-deep" : "text-ink-2"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 p-6 md:p-9">{children}</main>
      </div>
    </div>
  );
}

function PathIcon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
