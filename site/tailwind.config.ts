import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        paper2: "#F3F1EA",
        paper3: "#E8E5DC",
        ink: "#0E0E0C",
        ink2: "#2A2A26",
        mute: "#74746C",
        mute2: "#AAA89F",
        rule: "#E1DED4",
        rule2: "#C9C6BB",
        rd: "#DC2233",
        rd2: "#A8141F",
        rdsoft: "#FCE6E9",
        good: "#1E7A45",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1320px",
        prose: "62ch",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        soft1: "0 1px 2px rgba(10,10,9,0.04), 0 4px 8px -4px rgba(10,10,9,0.06)",
        soft2: "0 1px 2px rgba(10,10,9,0.05), 0 12px 24px -12px rgba(10,10,9,0.12), 0 24px 48px -24px rgba(10,10,9,0.10)",
        soft3: "0 2px 4px rgba(10,10,9,0.04), 0 24px 48px -16px rgba(10,10,9,0.14), 0 48px 96px -32px rgba(10,10,9,0.14)",
        red: "0 12px 32px -12px rgba(220,34,51,0.40), 0 24px 64px -24px rgba(220,34,51,0.28)",
      },
      keyframes: {
        spin360: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
      },
      animation: {
        slow: "spin360 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
