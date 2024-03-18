/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tekur: ["Tektur", "sans-serif"],
        lexendDeca: ["Lexend Deca", "sans-serif"],
        NatoSans: ["Noto Sans", "sans-serif"],
      },
      animation: {
        spinner: "spinner 1s forwards infinite",
      },
      keyframes: {
        spinner: {
          "0%": {
            borderTop: "skyblue 5px solid",
          },
          "25%": {
            borderRight: "skyblue 5px solid",
          },
          "50%": {
            borderBottom: "skyblue 5px solid",
          },
          "75%": {
            borderLeft: "skyblue 5px solid",
          },
        },
      },
    },
  },
  plugins: [],
};
