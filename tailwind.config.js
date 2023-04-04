/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "hsl(0, 0%, 0%)",
        darkPurple: "hsl(257, 67%, 51%)",
        purple: "hsl(257, 100%, 64%)",
        red: "hsl(347, 97%, 70%)",
        yellow: "hsl(41, 100%, 70%)",
        white: "hsl(0, 0%, 100%)",
      },
      fontSize: {
        900: ["3.5rem", "4.4375rem"],
        800: ["2rem", "2.5625rem"],
        700: ["1.5rem", "1.9375rem"],
        600: ["1.25rem", "1.625rem"],
        500: ["1rem", "1.25rem"],
        400: ["1rem", "1.3125rem"],
      },
      boxShadow: {
        normalBig: "0px 10px 0px #000000",
        hoverBig: "0px 10px 0px #5C2DD5",
        normalSmall: "0px 5px 0px #000000",
        hoverSmall: "0px 5px 0px #5C2DD5",
      },
    },
  },
  plugins: [],
};
