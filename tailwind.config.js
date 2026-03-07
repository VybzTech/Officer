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
          500: "#ffd608", // Brand Primary (Fixed to user request)
          550: "#FFCA08", // Brand Primary (Fixed to user request)
          600: "#f9bf00",
          700: "#d99a06",
          800: "#b45309",
          900: "#92400e",
          950: "#78350f",
          1000: "#451a03",
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
          dark: "#d99a06",
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
        gold: {
          50: "#fffdf0",
          100: "#fff9c4",
          200: "#fff28a",
          300: "#ffea4d",
          400: "#ffe01a",
          500: "#FFD700", // Solid Gold
          600: "#cca300",
          700: "#997a00",
          800: "#665200",
          900: "#332900",
        },
        brown: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#482e1a", // Deep Brown
          600: "#3e2a1b",
          700: "#2f2014",
          800: "#1f150d",
          900: "#100a06",
          primary: "#482e1a",
          dark: "#3E2A1B"
        }
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
