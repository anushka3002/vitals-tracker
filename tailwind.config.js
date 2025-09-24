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
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        health: {
          heart: '#ef4444',
          oxygen: '#10b981',
          blood: '#8b5cf6',
          temp: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}
