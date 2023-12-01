/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      linearButton: "linear-gradient(to right, #2E4CEE, #221EBF, #040F75)",
      customblack: "#0F0F0F",      // other colors...
    },
    backgroundImage: {
      linearButton: "linear-gradient(to right, #2E4CEE, #221EBF, #040F75)",
      // other background images...
    },

    extend: {
      height: {
        "screen-150": "13px", // This means 150% of the viewport height
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],};
