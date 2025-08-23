module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // All files in the src directory
    "./src/app/**/*.{js,ts,jsx,tsx}", // Files in the src/app directory
    "./src/components/**/*.{js,ts,jsx,tsx}", // Files in the src/components directory
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
    require('tailwind-scrollbar-hide'), // If you're using this plugin
  ],
};
