module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--color-background)",
        success: "var(--success-color)",
        error: "var(--error-color)",
        warning: "var(--warning-color)",
        text: "var(--text-color)",
        icon: "var(--icon-color)",
        border: "var(--border-color)",
      },
      fontFamily: {
        arabic: "var(--font-family)",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
  ],
};
