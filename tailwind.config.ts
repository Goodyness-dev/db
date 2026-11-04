import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: {
          1: "#0D0D0F",
          2: "#151519",
          3: "#1C1C22",
        },
        border: {
          DEFAULT: "#222228",
          subtle: "#1A1A20",
          bright: "#33333E",
        },
        text: {
          primary: "#F5F5F7",
          secondary: "#9A9AA5",
          muted: "#666675",
        },
        gold: {
          light: "#F3D079",
          DEFAULT: "#D4AF37",
          dark: "#AA8215",
          glow: "rgba(212, 175, 55, 0.15)",
        },
        crimson: {
          light: "#FB7185",
          DEFAULT: "#E11D48",
          dark: "#9F1239",
          glow: "rgba(225, 29, 72, 0.15)",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
