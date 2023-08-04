/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        custom: {
          grayEC: '#ECECEC',
          gray21: '#212A3E',
          gray39: '#393646',
          yellowE0: '#E0B20D',
          grayC4: '#C4DFDF',
          gray6C: '#6C737E',
          btnHover: '#2B2835',
        },
      },
    },
  },
  plugins: [],
};
