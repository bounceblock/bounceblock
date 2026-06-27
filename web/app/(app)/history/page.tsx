import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { getUser } from "@/lib/auth";
import { config } from "@/lib/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "History" };

interface Row {
  id: string;
  quality_score: number | null;
  clean_count: number;
  rows_processed: number;
  created_at: string;
}

export default async function HistoryPage() {
  const user = await getUser();
  let rows: Row[] = [];

  if (user && config.hasSupabase()) {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from("verifications")
      .select("id, quality_score, clean_count, rows_processed, created_at")
      .eq("user_id", user.id)
      .eq("kind", "full")
      .order("created_at", { ascending: false })
      .limit(50);
    rows = (data as Row[] | null) ?? [];
  }

  return (
    <AppShell active="history">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-3xl">Verification history</h1>
        <p className="mt-1 text-[15px] text-ink-2">Every list you&rsquo;ve cleaned, with downloads.</p>

        {rows.length === 0 ? (
          <div className="mt-8 rounded-xl border border-hair bg-raised p-12 text-center shadow-s1">
            <p className="font-serif text-xl">Nothing here yet</p>
            <p className="mx-auto mt-2 max-w-sm text-[14.5px] text-ink-2">Your cleaned lists and downloads will appear here.</p>
            <div className="mt-5"><Button href="/verify">Verify a list</Button></div>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-xl border border-hair bg-raised shadow-s1">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-hair text-left text-[12.5px] uppercase tracking-wide text-ink-3">
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Rows</th>
                  <th className="px-5 py-3 font-medium">Quality</th>
                  <th className="px-5 py-3 font-medium">Clean</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-hair last:border-0">
                    <td className="px-5 py-3 text-ink-2">{new Date(r.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3">{r.rows_processed.toLocaleString()}</td>
                    <td className="px-5 py-3 font-semibold">{r.quality_score ?? "—"}</td>
                    <td className="px-5 py-3">{r.clean_count.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right"><a href={`/api/download/${r.id}`} className="text-brand-deep hover:underline">Download</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!config.hasSupabase() && (
          <p className="mt-6 text-center text-xs text-ink-3">Demo — connect Supabase to store and download real results.</p>
        )}
      </div>
    </AppShell>
  );
}
