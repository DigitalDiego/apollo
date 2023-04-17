/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppinsLight: "PoppinsLight",
        poppinsSemiBold: "PoppinsSemiBold",
        lobster: "Lobster",
      },
    },
  },
  plugins: [],
};
