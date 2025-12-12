/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        obised: ['var(--font-obised)', 'sans-serif'],
      },
      colors: {
        base: {
          primaryBg: "#141414",
          primarySurface: "#282828",
          secondarySurface: "#000014"
        },
        text: {
          strong: "#f0f0f0",
          medium: "#a0a0a0",
          subtle: "#606060"
        },
        borderColor: {
          light: "#282828",
          dark: "#000000"
        },
        shadow: {
          soft: "rgba(0,0,0,0.3)",
          strong: "rgba(0,0,0,0.5)"
        },
        accent: {
          DEFAULT: "#f0f0f0",
          hover: "#e0e0e0"
        },
        bg: {
          base: "#141414",
          subtle: "#1E1E1E",
          muted: "#282828",
          inverted: "#f0f0f0"
        },
        btnPrimary: {
          DEFAULT: "#f0f0f0",
          hover: "#e0e0e0",
          text: "#141414"
        },
        btnSecondary: {
          DEFAULT: "#282828",
          hover: "#333333",
          text: "#f0f0f0"
        },
        form: {
          bg: "#141414",
          border: "#282828",
          text: "#f0f0f0",
          focus: "#f0f0f0"
        },
        // Keeping notification structure but mapping to dark theme
        notify: {
          successBg: "#1E1E1E",
          successText: "#f0f0f0",
          warningBg: "#1E1E1E",
          warningText: "#f0f0f0",
          errorBg: "#1E1E1E",
          errorText: "#f0f0f0",
          infoBg: "#1E1E1E",
          infoText: "#f0f0f0"
        }
      }
    }
  },
  plugins: []
};
