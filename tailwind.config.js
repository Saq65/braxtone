module.exports = {
  theme: {
    extend: {
      fontFamily: {
        futura: ["Futura", "Trebuchet MS", "Segoe UI", "sans-serif"],
      },
      colors: {
        primary: "#41a200ff",
        secondary: "#f0f0f0",
        accent: "#ff9900",
        background: "#ffffff",
        text: "#333333",
        muted: "#d0d0d0",
      },
    },
  },
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwind-scrollbar-hide")],
};
