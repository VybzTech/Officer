/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Urban Gravity Brand Colors - Yellow/Gold Theme
        primary: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#FFCA08", // Brand Primary (Fixed to user request)
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Dashboard specific colors (Brown/Black aesthetic)
        sidebar: {
          DEFAULT: "#fff", // Deep rich brown-black
          hover: "#eee", // Lighter warm brown for hover
          active: "#ffed63ff", // Active state brown
          border: "#ddd",
          text: "#111", // Warm gray/beige for text
          // DEFAULT: "#1A120B", // Deep rich brown-black
          // hover: "#2C1E12", // Lighter warm brown for hover
          // active: "#3E2A1B", // Active state brown
          // border: "#2C1E12",
          // text: "#D0C8C0", // Warm gray/beige for text
        },
        surface: {
          DEFAULT: "#ffffff",
          raised: "#fcfbf9", // Very subtle warm tint
          overlay: "#ffffff",
          border: "#e7e5e4", // Warm gray border
        },
        // Status colors
        success: {
          DEFAULT: "#10b981",
          light: "#34d399",
          dark: "#059669",
        },
        warning: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },
        danger: {
          DEFAULT: "#ef4444",
          light: "#f87171",
          dark: "#dc2626",
        },
        // Lagos theme accent
        lagos: {
          green: "#008751",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "system-ui", "-apple-system", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        hubot: ["Hubot", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        premium:
          "0 10px 15px -3px rgba(26, 18, 11, 0.05), 0 4px 6px -2px rgba(26, 18, 11, 0.025)",
        "premium-lg":
          "0 20px 25px -5px rgba(26, 18, 11, 0.03), 0 10px 10px -5px rgba(26, 18, 11, 0.01)",
        glow: "0 0 20px rgba(255, 202, 8, 0.2)",
        "glow-sm": "0 0 10px rgba(255, 202, 8, 0.15)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
