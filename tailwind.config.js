/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        space: ['Ubuntu', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        background: '#0d1f3c',
        textPrimary: '#ffffff',
      },
    },
  },
  plugins: [],
}
