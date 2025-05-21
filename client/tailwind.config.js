/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "100%", // Optional: keeps container responsive
        md: "100%",
        lg: "100%",
        xl: "1280px", // This is 7xl
        "2xl": "1280px", // Also limit 2xl to 1280px (7xl)
      },
    },
    extend: {
      fontFamily: {
        primary: ["Bricolage Grotesque", "sans-serif"],
        secondary: ["Space Grotesk", "sans-serif"],
        inherit: "inherit",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
        "spin-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        "sparkle-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(180deg)",
          },
        },
        "sparkle-fade": {
          "0%": {
            transform: "scale(0)",
            opacity: 0,
          },
          "50%": {
            transform: "scale(1)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(0)",
            opacity: 0,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "spin-slow": "spin-slow 6s linear infinite",
        "sparkle-spin": "sparkle-spin 1s linear infinite",
        "sparkle-fade": "sparkle-fade 0.5s linear forwards",
      },
      boxShadow: {
        myshadow_sm: "2px 2px 0px",
        myshadow_md: "4px 4px 0px",
        myshadow_lg: "6px 6px 0px",
        myshadow_xl: "12px 12px 0px",
        myshadow_sm_down: "0px 2px 0px",
        myshadow_md_down: "0px 4px 0px",
        myshadow_lg_down: "0px 6px 0px",
        myshadow_xl_down: "0px 12px 0px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
