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
        black: "#000",
        gold: "#c5a364",
        white: "#fff",
        
      },
        
    },
    fontFamily: {
      fmbolyarsanspro: ["FMBolyarSansPro", "system-ui", "sans-serif"],
    },
     screens: {
      xs: "540px",
      // => @media (min-width: 540px) { ... }

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
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
