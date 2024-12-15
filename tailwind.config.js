/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,tsx}", 
    "./src/components/**/*.{html,js,jsx,tsx}" // Исправленный путь
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#297bff", // Добавляем кастомный цвет с именем "primary"
      },
      backgroundColor: {
        primary: "#297bff", // Добавляем кастомный цвет с именем "primary"
      },
    },
  },
  plugins: [],
}
