import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        space: ["Ubuntu", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        background: "#0d1f3c",
        textPrimary: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
