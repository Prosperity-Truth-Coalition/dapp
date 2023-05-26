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
        "blurple": "#5865F2",
        "greenish": "#57F287",
        "yellowish": "#FEE75C",
        "fushia": "#EB459E",
        "redish": "#ED4245",
      },
        
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
