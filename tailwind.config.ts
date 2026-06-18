import type { Config } from "tailwindcss";

// "Open ledger / terminal broadsheet" — Open Source Capitalist house style.
//   ink #15120D · paper #FBFAF6 · panel #F2EEE4 · accent ochre #B5832E
//   verified green #2F6B4F (reserved for `official` source badges) · hairline #E7E0D2
// Fonts: Space Grotesk (display) + Inter (body) + IBM Plex Mono (labels/metadata).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#15120D",
          muted: "#5b5346",
          faint: "#8a8174",
        },
        paper: {
          DEFAULT: "#FBFAF6",
          panel: "#F2EEE4",
          sink: "#efe9dd",
        },
        line: "#E7E0D2",
        accent: {
          DEFAULT: "#B5832E",
          soft: "#f4ead2",
          deep: "#8c6420",
        },
        verified: {
          DEFAULT: "#2F6B4F",
          soft: "#e2efe7",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(21,18,13,0.04), 0 1px 12px rgba(21,18,13,0.05)",
        pop: "0 12px 38px rgba(21,18,13,0.16)",
      },
      borderRadius: {
        xl: "0.9rem",
      },
    },
  },
  plugins: [],
};

export default config;
