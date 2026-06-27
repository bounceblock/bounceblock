import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { logout } from "@/app/(app)/actions";
import { cn } from "@/lib/utils";

type AdminKey = "overview" | "users" | "verifications" | "subscriptions" | "payments";

const NAV: { key: AdminKey; label: string; href: string }[] = [
  { key: "overview", label: "Overview", href: "/admin" },
  { key: "users", label: "Users", href: "/admin/users" },
  { key: "verifications", label: "Verifications", href: "/admin/verifications" },
  { key: "subscriptions", label: "Subscriptions", href: "/admin/subscriptions" },
  { key: "payments", label: "Payments", href: "/admin/payments" },
];

/** Admin CRM shell — separate from the customer app. */
export function AdminShell({ active, children }: { active: AdminKey; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-hair bg-ink p-4 text-white md:flex">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Logo showWordmark={false} size={26} />
          <span className="font-serif text-[17px] font-semibold">Admin</span>
        </div>
        <nav className="mt-5 grid gap-1">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className={cn(
                "rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors",
                active === n.key ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-3">
          <Link href="/dashboard" className="block rounded-lg px-3 py-2 text-[13px] text-white/70 hover:bg-white/10">← Customer app</Link>
          <form action={logout}>
            <button className="w-full rounded-lg px-3 py-2 text-left text-[14px] text-white/70 hover:bg-white/10">Log out</button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <nav className="flex gap-1 overflow-x-auto border-b border-hair bg-ink px-4 py-2 md:hidden">
          {NAV.map((n) => (
            <Link key={n.key} href={n.href} className={cn("whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-medium", active === n.key ? "bg-white/15 text-white" : "text-white/70")}>
              {n.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1 p-6 md:p-9">{children}</main>
      </div>
    </div>
  );
}
