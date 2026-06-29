import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";

/** Allow-listed admin emails from ADMIN_EMAILS (lower-cased). */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Sync check against an already-loaded user (avoids a second getUser round-trip). */
export function isAdminUser(user: { email?: string | null } | null): boolean {
  if (!config.hasSupabase()) return true; // demo: admin viewable with demo data
  return Boolean(user) && adminEmails().includes((user!.email ?? "").toLowerCase());
}

/** True if the current request is from an allow-listed admin (or in demo mode). */
export async function isAdmin(): Promise<boolean> {
  if (!config.hasSupabase()) return true;
  return isAdminUser(await getUser());
}
