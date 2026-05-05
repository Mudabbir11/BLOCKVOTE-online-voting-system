/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0A2540',
          800: '#1E40AF',
          700: '#3B82F6',
        }
      }
    },
  },
  plugins: [],
}
