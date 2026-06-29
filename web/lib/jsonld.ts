import { SITE } from "@/lib/constants";
import { PLANS } from "@/lib/plans";

/** SoftwareApplication + price offers — eligible for product/app rich results. */
export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: SITE.description,
    url: SITE.url,
    offers: PLANS.filter((p) => p.priceMonthly > 0).map((p) => ({
      "@type": "Offer",
      name: `${p.name} plan`,
      price: String(p.priceMonthly),
      priceCurrency: "USD",
      category: "subscription",
      url: `${SITE.url}/pricing`,
    })),
  };
}

/** BreadcrumbList for programmatic landing pages (SERP breadcrumb trail). */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path}`,
    })),
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    logo: `${SITE.url}/brand/logo.png`,
    email: SITE.email.hello,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", email: SITE.email.support },
      { "@type": "ContactPoint", contactType: "billing support", email: SITE.email.billing },
      { "@type": "ContactPoint", contactType: "privacy", email: SITE.email.privacy },
      { "@type": "ContactPoint", contactType: "security", email: SITE.email.security },
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };
}

export function articleLd(p: { title: string; description: string; date: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    url: `${SITE.url}/blog/${p.slug}`,
    image: `${SITE.url}/opengraph-image`,
    author: { "@type": "Organization", name: SITE.legalName },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/brand/logo.png` } },
  };
}

export function definedTermLd(t: { term: string; short: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: t.term,
    description: t.short,
    url: `${SITE.url}/glossary/${t.slug}`,
    inDefinedTermSet: `${SITE.url}/glossary`,
  };
}

/** Person schema for author / reviewer profiles (E-E-A-T). */
export function personLd(a: { id: string; name: string; role: string; bio: string; expertise: string[]; linkedin?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    jobTitle: a.role,
    description: a.bio,
    knowsAbout: a.expertise,
    url: `${SITE.url}/authors/${a.id}`,
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
    ...(a.linkedin ? { sameAs: [a.linkedin] } : {}),
  };
}

/** Review schema — a Review of a software product, scored by our editor. */
export function reviewLd(r: { itemName: string; score: number; author: string; summary: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "SoftwareApplication", name: r.itemName, applicationCategory: "BusinessApplication" },
    reviewRating: { "@type": "Rating", ratingValue: r.score, bestRating: 5, worstRating: 1 },
    author: { "@type": "Person", name: r.author },
    publisher: { "@type": "Organization", name: SITE.name },
    reviewBody: r.summary,
    url: `${SITE.url}/reviews/${r.slug}`,
  };
}

/** Dataset schema for original research / data studies (authority signal). */
export function datasetLd(d: { name: string; description: string; date: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: d.name,
    description: d.description,
    datePublished: d.date,
    url: `${SITE.url}/research/${d.slug}`,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    license: `${SITE.url}/legal/terms`,
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
