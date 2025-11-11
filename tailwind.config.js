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
          DEFAULT: '#1e3a8a', // blue-900
          light: '#3b82f6',   // blue-500
        },
        accent: {
          DEFAULT: '#0891b2', // cyan-600
          light: '#06b6d4',   // cyan-500
        },
        annotation: '#fbbf24', // amber-400
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
