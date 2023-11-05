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
    colors:{
      "primaryColor":"#EA1179",
      "primaryPink":"#F875AA",
      "bgLightPink":"#FFDFDF",
      "bgMistyRose":"#FFF6F6",
      "bgBabyBlue":"#AEDEFC",
      accentColor:"#20C997",
      "bgDark":"#4C4C4C",
    },//https://colorhunt.co/palette/f875aaffdfdffff6f6aedefc
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(
    {
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        // ... custom themes
      },
    }
  ), daisyui],
};
