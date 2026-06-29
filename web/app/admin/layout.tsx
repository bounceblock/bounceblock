import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";

/**
 * Server-side guard for the entire /admin tree (defense-in-depth on top of the
 * middleware allow-list). Non-admins are bounced to login. In demo mode
 * (no Supabase) `isAdmin()` is permissive so the back office is explorable.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/login");
  return <>{children}</>;
}
