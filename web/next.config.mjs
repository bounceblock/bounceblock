const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self' data:;
  connect-src 'self' https://plausible.io https://*.supabase.co https://api.zerobounce.net https://apilayer.net https://api.stripe.com;
  frame-src https://js.stripe.com https://checkout.stripe.com https://*.stripe.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  webpack: (config, { nextRuntime }) => {
    // The Edge middleware imports @supabase/ssr → supabase-js, which statically
    // references node-only fallbacks — `ws` (in realtime-js) and
    // `@supabase/node-fetch`. They're only used when a global WebSocket/fetch is
    // missing, which never happens on the Edge runtime, but Vercel's Edge bundler
    // rejects them ("referencing unsupported modules"). Exclude them from the
    // Edge bundle only; the Node server build keeps node-fetch for API routes.
    if (nextRuntime === "edge") {
      config.resolve.alias = {
        ...config.resolve.alias,
        ws: false,
        "@supabase/node-fetch": false,
      };
    }
    return config;
  },
};

export default nextConfig;
