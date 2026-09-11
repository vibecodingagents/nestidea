/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1C2733",
        mist: "#F3F7FA",
        paper: "#FFFFFF",
        brand: "#28A5DD",
        "brand-dark": "#1D84B5",
        moss: "#3F8F5F",
        "moss-dark": "#2E6E45",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};
