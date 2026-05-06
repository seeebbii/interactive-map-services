import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0F",
          surface: "#14141C",
          panel: "#0F0F16",
          card: "#191925",
          border: "#27272F",
          borderSoft: "rgba(255,255,255,0.06)",
        },
        bone: {
          DEFAULT: "#E5E5EC",
          muted: "#8B8B97",
          dim: "#5F5F6A",
        },
        signal: {
          DEFAULT: "#00E5FF",
          hot: "#22F5FF",
          dim: "#00B7CC",
        },
        cat: {
          food: "#FF6B47",
          ride: "#FFC93D",
          grocery: "#5BD68A",
          courier: "#3DC9F0",
          fintech: "#7B7AFF",
          streaming: "#D169FF",
          superapp: "#FF5BB0",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        tight: "-0.015em",
        wider: "0.08em",
        widest: "0.12em",
      },
      fontSize: {
        "2xs": ["10px", "1.2"],
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        pulseSoft: "pulseSoft 2.6s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%,100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
