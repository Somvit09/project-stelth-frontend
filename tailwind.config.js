/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': '#EAEAEA',
        'color-secondary': '#D6D6D6',
        'color-tertiary': '#A3A3A3',
        'btn-yellow': '#FFE81F',
        'background-dark': '#202020',
        'background-darker': '#000811',
      },
    },
  },
  plugins: [],
};
