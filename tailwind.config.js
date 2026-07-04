/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#06070d",
        graphite: "#10131e",
        ion: "#5de1ff",
        ultraviolet: "#8f5cff",
        solar: "#ffd166",
        mint: "#80ffcc",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Satoshi", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 45px rgba(93, 225, 255, 0.22)",
        violet: "0 0 60px rgba(143, 92, 255, 0.28)",
      },
    },
  },
  plugins: [],
};
