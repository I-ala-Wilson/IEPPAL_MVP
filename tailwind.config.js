/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        offwhite: "#f9f5f0",
        darksidebar: "#111827",
        pastelPink: "#FF758C",
        pastelOrange: "#FF7EB3"
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Nunito', 'sans-serif']
      }
    }
  },
  plugins: []
};
