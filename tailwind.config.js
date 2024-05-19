/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#113946",
        main: "#FBFBFE"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

