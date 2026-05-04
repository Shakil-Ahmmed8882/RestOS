const { nextui } = require("@nextui-org/react");
const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primaryColor": "#00D019",
        "secondaryColor": "#FF5D02",
        "primary-color": "#00D019",
        "description-text": "#4e4e4e",
        "light-gray": "#c2c2c2",
        "primaryPink": "#F875AA",
        "bgLightPink": "#FFDFDF",
        "bgMistyRose": "#FFF6F6",
        "accent": "#08a88b45",
        "deepPink": "#EA1179",
        "bgBabyBlue": "#AEDEFC",
        "accentColor": "#20C997",
        "bgDark": "#000",
      },
      backgroundImage: {
        "dark-sign-in": "url('/src/assets/img/home/dark-sign-in.jpg')",
        "light-food": "url('/src/assets/img/home/light-food.jpg')",
      },
      animation: {
        blob: "blob 4s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(60px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {},
      themes: {
        light: { layout: {}, colors: {} },
        dark: { layout: {}, colors: {} },
      },
    }),
    daisyui,
  ],
};
