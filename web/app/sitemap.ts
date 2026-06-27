import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { LEGAL } from "@/lib/legal";
import { INDUSTRIES, USE_CASES, ALTERNATIVES, LOCAL } from "@/lib/seo-data";
import { POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const corePaths = [
    "",
    "/pricing",
    "/about",
    "/security",
    "/trust",
    "/compliance",
    "/case-studies",
    "/integrations",
    "/status",
    "/industries",
    "/use-cases",
    "/alternatives",
    "/locations",
    "/contact",
    "/api-docs",
    "/blog",
    ...POSTS.map((p) => `/blog/${p.slug}`),
    ...Object.keys(LEGAL).map((k) => `/legal/${k}`),
    ...INDUSTRIES.map((e) => `/industry/${e.slug}`),
    ...USE_CASES.map((e) => `/use-case/${e.slug}`),
    ...ALTERNATIVES.map((e) => `/alternative/${e.slug}`),
    ...LOCAL.map((e) => `/city/${e.slug}`),
  ];
  return corePaths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
}
