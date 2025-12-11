module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // ---------------------------------------------------------
        // 1. Base Color System
        // ---------------------------------------------------------
        base: {
          primaryBg: "#000A08",
          primarySurface: "#E8E9E1",
          secondarySurface: "#DBCBB6"
        },

        // ---------------------------------------------------------
        // 2. Neutral Palette (Text, Borders, Shadows)
        // ---------------------------------------------------------
        text: {
          strong: "#0F1A18",
          medium: "#4F5856",
          subtle: "#7C8481"
        },
        borderColor: {
          light: "#D6D7D2",
          dark: "#1A2421"
        },
        shadow: {
          soft: "rgba(0,10,8,0.15)",
          strong: "rgba(0,10,8,0.25)"
        },

        // ---------------------------------------------------------
        // 3. Accent Colors
        // ---------------------------------------------------------
        accent: {
          DEFAULT: "#8AA39B",
          hover: "#7C938C",
          success: "#6B8F71",
          warning: "#C29B59",
          error: "#A45A52"
        },

        // ---------------------------------------------------------
        // 4. Background Layers
        // ---------------------------------------------------------
        bg: {
          base: "#E8E9E1",
          subtle: "#F5F5F2",
          muted: "#DBCBB6",
          inverted: "#000A08"
        },

        // ---------------------------------------------------------
        // 5. Components (Buttons, Inputs, Tables, Notifications)
        // ---------------------------------------------------------

        // Primary Button
        btnPrimary: {
          DEFAULT: "#8AA39B",
          hover: "#7C938C",
          active: "#6E837E",
          text: "#000A08"
        },

        // Secondary Button
        btnSecondary: {
          DEFAULT: "#DBCBB6",
          hover: "#D1BFAA",
          active: "#C4B39F",
          text: "#000A08"
        },

        // Ghost Button
        btnGhost: {
          border: "#4F5856",
          text: "#4F5856",
          hover: "rgba(0,10,8,0.08)"
        },

        // Input Styles
        form: {
          bg: "#FFFFFF",
          border: "#D6D7D2",
          text: "#0F1A18",
          focus: "#8AA39B"
        },

        // Table Colors
        table: {
          headerBg: "#DBCBB6",
          headerText: "#000A08",
          rowOdd: "#FFFFFF",
          rowEven: "#F5F5F2",
          rowHover: "#E8E9E1"
        },

        // Notifications
        notify: {
          successBg: "#E7F3EC",
          successText: "#6B8F71",
          warningBg: "#FAF3E2",
          warningText: "#C29B59",
          errorBg: "#F7E8E7",
          errorText: "#A45A52",
          infoBg: "#E8E9E1",
          infoText: "#0F1A18"
        }
      }
    }
  },
  plugins: []
};
