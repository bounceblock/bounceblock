import type { Metadata } from "next";

/**
 * Page-level metadata helper. Sets the canonical URL (resolved against
 * `metadataBase` from the root layout) and a matching per-page OpenGraph block,
 * so every indexable page declares its own canonical + share card instead of
 * inheriting the site default. `path` must be an absolute site path ("/pricing").
 */
export function pageMeta({ title, description, path, noindex }: { title?: string; description?: string; path: string; noindex?: boolean }): Metadata {
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    // Parked pages (templated near-duplicates pending unique content) are kept
    // crawlable for links but kept OUT of the index — robots: index:false.
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url: path,
      type: "website",
    },
  };
}
