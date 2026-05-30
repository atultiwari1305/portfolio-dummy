import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg-2)",
        panel: "var(--surface)",
        panel2: "var(--surface-2)",
        line: "var(--border)",
        lineStrong: "var(--border-strong)",
        ink: "var(--text)",
        muted: "var(--text-dim)",
        faint: "var(--text-faint)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        accentSoft: "var(--accent-soft)",
        onAccent: "var(--on-accent)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1140px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
        livePulse: {
          "0%": { boxShadow: "0 0 0 0 var(--glow)" },
          "70%": { boxShadow: "0 0 0 6px transparent" },
          "100%": { boxShadow: "0 0 0 0 transparent" },
        },
        slideLine: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(280%)" },
        },
        dsaPulse: {
          "0%,100%": { transform: "scaleY(0.45)" },
          "50%": { transform: "scaleY(1)" },
        },
        typeDot: {
          "0%,60%,100%": { transform: "translateY(0)", opacity: "0.4" },
          "30%": { transform: "translateY(-4px)", opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        livePulse: "livePulse 2.4s infinite",
        slideLine: "slideLine 2s cubic-bezier(0.22,1,0.36,1) infinite",
        dsaPulse: "dsaPulse 2.6s ease-in-out infinite",
        typeDot: "typeDot 1.2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
