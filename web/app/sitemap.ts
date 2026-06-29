import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { LEGAL } from "@/lib/legal";
import { INDUSTRIES, USE_CASES, ALTERNATIVES } from "@/lib/seo-data";
import { POSTS, getCategories } from "@/lib/blog";
import { TOOLS } from "@/lib/tools";
import { GLOSSARY } from "@/lib/glossary";
import { INDEXED_COUNTRIES } from "@/lib/countries";
import { INTEGRATIONS } from "@/lib/integrations";
import { PRODUCTS } from "@/lib/products";
import { ROLES } from "@/lib/roles";
import { FEATURES } from "@/lib/features";
import { COMPARE_PAIRS } from "@/lib/compare";
import { REVIEWS } from "@/lib/reviews";
import { CASE_STUDIES } from "@/lib/case-studies";
import { RESEARCH } from "@/lib/research";
import { RESOURCES } from "@/lib/resources";
import { AUTHORS } from "@/lib/authors";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  // priority tiers
  const core = ["", "/pricing", "/product", "/features", "/tools", "/glossary", "/phone-validation", "/compare"]; // 0.9
  const hubs = [
    "/about", "/security", "/trust", "/compliance", "/case-studies", "/integrations",
    "/status", "/industries", "/use-cases", "/alternatives", "/locations", "/contact",
    "/api-docs", "/blog", "/demo", "/careers", "/help",
    "/reviews", "/research", "/resources", "/authors",
  ]; // 0.7

  // Only indexable pages are advertised here. Parked (noindex) sets — local
  // city pages, best-alternative, and the long-tail country pages — are
  // intentionally EXCLUDED until they carry genuinely unique content.
  const programmatic: string[] = [
    ...PRODUCTS.map((p) => `/product/${p.slug}`),
    ...FEATURES.map((f) => `/features/${f.slug}`),
    ...TOOLS.map((t) => `/tools/${t.slug}`),
    ...GLOSSARY.map((g) => `/glossary/${g.slug}`),
    ...INDEXED_COUNTRIES.map((c) => `/phone-validation/${c.slug}`),
    ...INTEGRATIONS.map((i) => `/integrations/${i.slug}`),
    ...ROLES.map((r) => `/for/${r.slug}`),
    ...INDUSTRIES.map((e) => `/industry/${e.slug}`),
    ...USE_CASES.map((e) => `/use-case/${e.slug}`),
    ...ALTERNATIVES.map((e) => `/alternative/${e.slug}`),
    ...getCategories().map((c) => `/blog/category/${c.slug}`),
    ...COMPARE_PAIRS.map((p) => `/compare/${p.slug}`),
    ...REVIEWS.map((r) => `/reviews/${r.slug}`),
    ...CASE_STUDIES.map((c) => `/case-studies/${c.slug}`),
    ...RESEARCH.map((r) => `/research/${r.slug}`),
    ...RESOURCES.map((r) => `/resources/${r.slug}`),
    ...AUTHORS.map((a) => `/authors/${a.id}`),
  ]; // 0.6

  const legal = Object.keys(LEGAL).map((k) => `/legal/${k}`); // 0.3

  const entries: MetadataRoute.Sitemap = [];
  const push = (paths: string[], priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) => {
    for (const p of paths) entries.push({ url: `${base}${p}`, changeFrequency, priority: p === "" ? 1 : priority });
  };

  push(core, 0.9, "weekly");
  push(hubs, 0.7, "weekly");
  push(programmatic, 0.6, "monthly");
  push(legal, 0.3, "yearly");

  // blog posts carry their publish date as lastModified
  for (const p of POSTS) {
    entries.push({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly", priority: 0.6 });
  }

  return entries;
}
