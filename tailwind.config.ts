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
        warm: {
          50: "#fdf8f0",
          100: "#faefd8",
          200: "#f4d9a8",
          300: "#ecbd70",
          400: "#e49e3a",
          500: "#d4831e",
          600: "#b86516",
          700: "#974d16",
          800: "#7b3d18",
          900: "#653417",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e4ede4",
          200: "#c8dbc8",
          300: "#9ec09e",
          400: "#6e9e6e",
          500: "#4e7e4e",
          600: "#3c633c",
          700: "#324f32",
          800: "#2a3f2a",
          900: "#243424",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
