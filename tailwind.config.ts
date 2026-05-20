import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        paper2: "rgb(var(--paper-2-rgb) / <alpha-value>)",
        paper3: "rgb(var(--paper-3-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        ink2: "rgb(var(--ink-2-rgb) / <alpha-value>)",
        mute: "rgb(var(--mute-rgb) / <alpha-value>)",
        mute2: "rgb(var(--mute-2-rgb) / <alpha-value>)",
        rule: "rgb(var(--rule-rgb) / <alpha-value>)",
        rule2: "rgb(var(--rule-2-rgb) / <alpha-value>)",
        rd: "rgb(var(--rd-rgb) / <alpha-value>)",
        rd2: "rgb(var(--rd-2-rgb) / <alpha-value>)",
        rdsoft: "rgb(var(--rd-soft-rgb) / <alpha-value>)",
        good: "rgb(var(--good-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
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
