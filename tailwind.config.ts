import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'title': '1fr auto 1fr',
        'left-side': '.1fr auto 1fr',
        'right-side': '1fr auto .1fr'
      },
      gridTemplateRows: {
        'title': '16px 0'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-color': '#FF844B',
        'secondary-color': '#ED9200',
        'tertiary-color': '#12C036',
      },
    },
  },
  plugins: [],
} satisfies Config;
