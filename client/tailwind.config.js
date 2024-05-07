/** @type {import('tailwindcss').Config} */
import { colors } from "@mui/material";
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: colors.blue,
        secondary: colors.red,
        accent: colors.yellow,
        white: "#ffffff",
      },
    },
  },
  plugins: [daisyui],
};
