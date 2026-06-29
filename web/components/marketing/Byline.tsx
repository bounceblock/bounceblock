import Link from "next/link";
import type { Author } from "@/lib/authors";

/**
 * Author byline used on reviews, research, case studies and blog posts.
 * Links to the author's profile page — the E-E-A-T attribution Google looks
 * for. `prefix` lets a review say "Reviewed by" vs a post's "Written by".
 */
export function Byline({ author, prefix = "Written by", date, readMins }: { author: Author; prefix?: string; date?: string; readMins?: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-wash text-[14px] font-semibold text-brand-deep">
        {author.initials}
      </span>
      <div className="text-[13.5px] leading-tight">
        <div className="text-ink-3">{prefix}</div>
        <Link href={`/authors/${author.id}`} className="font-semibold text-ink hover:text-brand-deep">
          {author.name}
        </Link>
        <span className="text-ink-3"> · {author.role}</span>
        {(date || readMins) && (
          <div className="mt-0.5 text-ink-3">
            {date}
            {date && readMins ? " · " : ""}
            {readMins ? `${readMins} min read` : ""}
          </div>
        )}
      </div>
    </div>
  );
}
