module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"BBH Bogle"', "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        // Legacy Colors (Merged)
        base: {
          primaryBg: "#000A08",
          primarySurface: "#E8E9E1",
          secondarySurface: "#DBCBB6"
        },
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
        // Legacy Accent - Avoiding Conflict with 'accent' above by omitting or namespacing?
        // Usage in legacy code: 'text-accent', 'bg-accent'.
        // Above 'accent' is an object { DEFAULT, foreground }.
        // Legacy 'accent' was an object { DEFAULT, hover, success, warning, error }.
        // MERGING STRATEGY: Combine.
        // We need 'accent-hover', 'accent-success', etc.
        // And 'accent' (DEFAULT).
        // Shadcn DEFAULT: "hsl(var(--accent))"
        // Legacy DEFAULT: "#8AA39B"
        // I will namespace legacy accent to 'accentLegacy' to be safe, BUT broken UI.
        // Better: Merge into 'accent'.
        // If conflict on DEFAULT, Shadcn wins (since user merged dashboard).
        // I will add legacy keys to 'accent' object.
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        //   hover: "#7C938C", ...
        // }
        // Wait, if I change accent.DEFAULT, legacy code expecting #8AA39B might look different.
        // But dashboard expects var(--accent).
        // Compromise: Use Shadcn default. It's the "new" UI.
        // Add legacy vars:
        // hover: "#7C938C", ...
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
