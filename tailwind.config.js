/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"], // Include jsx for React components
  theme: {
    extend: {
      colors:{
        'baby-blue': {
          400: '#89CFF0',
        }
      }
    },
  },
  plugins: [],
};
