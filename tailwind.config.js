/** @type {import('tailwindcss').Config} */
export default  {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      // colors: {
      //   background: {
      //     DEFAULT: "#242424", 
      //     light: "#ffffff", 
      //   },
      //   text: {
      //     DEFAULT: "rgba(255, 255, 255, 0.87)",
      //     light: "#213547", 
      //   },
      //   link: {
      //     DEFAULT: "#646cff",
      //     hover: "#535bf2",
      //     lightHover: "#747bff",
      //   },
      //   button: {
      //     DEFAULT: "#1a1a1a",
      //     light: "#f9f9f9",
      //   },
      // },
    },
  },
  plugins: [],
};
