/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#1E3A8A',
        customGreen: '#10B981',
        customOrange: '#F97316',
        medAqua: '#82dbba',
        customPurple: '#9966CC',
        medAquaLight: '#E0F5EE',
      },
    },
  },
  plugins: [],
});
