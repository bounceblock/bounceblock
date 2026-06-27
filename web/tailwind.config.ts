import type { Config } from "tailwindcss";

/**
 * BounceBlock design tokens.
 * Palette derived from the brand logo: navy "Bounce", brand-green "Block",
 * blue ".io" — set on a warm, light canvas (NO dark theme).
 * Exact shades are refined in the design phase.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF9F6",
        raised: "#FFFFFF",
        sunk: "#F4F2EC",
        ink: {
          DEFAULT: "#14233D", // navy headings
          2: "#46505F", // body
          3: "#8A8F98", // muted
        },
        hair: "#E8E4DA",
        brand: {
          DEFAULT: "#2EA94E", // logo green
          deep: "#1E7E3A",
          wash: "#E9F6EC",
        },
        accentblue: {
          DEFAULT: "#1B7FD4",
          deep: "#14619F",
        },
        valid: "#15A06E",
        unknown: "#D89A2E",
        invalid: "#DE5A4F",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "11px",
        md: "16px",
        lg: "22px",
        xl: "30px",
      },
      boxShadow: {
        s1: "0 1px 2px rgba(20,35,61,.05), 0 1px 1px rgba(20,35,61,.03)",
        s2: "0 4px 14px rgba(20,35,61,.05), 0 2px 5px rgba(20,35,61,.04)",
        s3: "0 18px 44px -14px rgba(20,35,61,.14), 0 6px 16px rgba(20,35,61,.06)",
        glow: "0 10px 28px -8px rgba(46,169,78,.45)",
      },
      maxWidth: {
        site: "1160px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
