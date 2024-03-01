/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        tekur:["Tektur","sans-serif"],
        "lexendDeca":["Lexend Deca", "sans-serif"],
        NatoSans:["Noto Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}