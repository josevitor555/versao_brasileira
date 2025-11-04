/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
      },
      colors: {
        'primary': '#8B7355',
        'secondary': '#D1BB9E',
        'white': '#FFFFFF',
        'accent': '#EAD8C0',
        'background': '#FFF2E1',
        'light': '#F8EDE3',
      }
    },
  },
  plugins: [],
}