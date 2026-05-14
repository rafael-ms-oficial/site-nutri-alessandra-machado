import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#7A2F2F",
          dark: "#5c2020",
          light: "#9a4040",
        },
        "rose-gold": {
          DEFAULT: "#D2B09F",
          light: "#e8d4c8",
          dark: "#b89080",
        },
        "soft-pink": "#F4EBE2",
        "light-beige": "#FAF7F2",
        "text-dark": "#2A2A2A",
        "text-muted": "#6B6B6B",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(122, 47, 47, 0.08)",
        card: "0 8px 40px rgba(122, 47, 47, 0.10)",
        hover: "0 12px 48px rgba(122, 47, 47, 0.16)",
      },
      backgroundImage: {
        "grain-texture":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
