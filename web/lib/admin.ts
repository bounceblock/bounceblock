import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";

/** True if the current request is from an allow-listed admin (or in demo mode). */
export async function isAdmin(): Promise<boolean> {
  if (!config.hasSupabase()) return true; // demo: admin viewable with demo data
  const user = await getUser();
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(user) && admins.includes((user!.email ?? "").toLowerCase());
}
