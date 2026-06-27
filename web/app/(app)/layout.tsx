import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { getUser } from "@/lib/auth";
import { logout } from "./actions";

/** App shell for product routes (login, signup, verify, dashboard). */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-hair bg-raised/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-site items-center justify-between px-7 py-3.5">
          <Logo />
          <div className="flex items-center gap-5 text-sm">
            {user ? (
              <>
                <Link href="/dashboard" className="text-ink-2 transition-colors hover:text-ink">Dashboard</Link>
                <Link href="/verify" className="text-ink-2 transition-colors hover:text-ink">Verify</Link>
                <Link href="/settings" className="text-ink-2 transition-colors hover:text-ink">Settings</Link>
                <form action={logout}>
                  <button className="text-ink-2 transition-colors hover:text-ink">Log out</button>
                </form>
              </>
            ) : (
              <Link href="/" className="text-ink-2 transition-colors hover:text-ink">← Back to site</Link>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
