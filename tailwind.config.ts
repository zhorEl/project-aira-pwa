import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          muted: "hsl(var(--sidebar-muted))",
          accent: "hsl(var(--sidebar-accent))",
          border: "hsl(var(--sidebar-border))",
        },
        // Stitch signature accent — "status-optimal" lime
        optimal: {
          DEFAULT: "hsl(var(--optimal))",
          foreground: "hsl(var(--optimal-foreground))",
        },
        // Verification pipeline spectrum
        verification: {
          draft: "hsl(var(--v-draft))",
          submitted: "hsl(var(--v-submitted))",
          verified: "hsl(var(--v-verified))",
          official: "hsl(var(--v-official))",
        },
        // Commodity map layers
        layer: {
          coffee: "hsl(var(--layer-coffee))",
          cacao: "hsl(var(--layer-cacao))",
          corn: "hsl(var(--layer-corn))",
        },
        // Brand coffee/earth palette
        coffee: {
          50: "#faf6f1",
          100: "#f0e6d9",
          200: "#e0cbb0",
          300: "#cda880",
          400: "#bb8757",
          500: "#a86f3f",
          600: "#915a34",
          700: "#74452c",
          800: "#603a29",
          900: "#523224",
          950: "#2e1a12",
        },
        leaf: {
          50: "#f3f7f0",
          100: "#e3edda",
          200: "#c8dcb8",
          300: "#a3c389",
          400: "#7ea65d",
          500: "#5f8a3f",
          600: "#496d2f",
          700: "#3a5527",
          800: "#304423",
          900: "#293a20",
          950: "#131f0e",
        },
      },
      borderRadius: {
        // Stitch rounded scale: sm .25 / DEFAULT .5 / md .75 / lg 1 / xl 1.5rem
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      fontFamily: {
        // Inter = body/label workhorse; Hanken Grotesk = display/headline
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 6px -1px rgb(0 0 0 / 0.06)",
        card: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        elevated: "0 4px 16px -2px rgb(0 0 0 / 0.10), 0 2px 8px -2px rgb(0 0 0 / 0.06)",
        // Stitch Level 3 pop-over glow + glass panel shadow
        glass: "0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4)",
        glow: "0 0 0 1px hsl(var(--optimal) / 0.20), 0 4px 20px -4px hsl(var(--optimal) / 0.35)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "70%": { boxShadow: "0 0 0 8px hsl(var(--primary) / 0)" },
          "100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-in": "scale-in 0.2s ease-out",
        shimmer: "shimmer 1.6s infinite",
        "pulse-ring": "pulse-ring 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
