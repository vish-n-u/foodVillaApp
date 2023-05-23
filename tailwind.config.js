/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./Authorization/src/**/*.{html,js,jsx}",
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {},
  },

  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
