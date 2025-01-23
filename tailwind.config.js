/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#02343F',
        secondary: '#F5E6D3',
        secondary2: '#F0EDCC',
      }
    },
  },
  plugins: [],
}