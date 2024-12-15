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
        gray: '#2a2a2ab2'
      },
      backgroundColor: {
        primary: "#297bff", // Добавляем кастомный цвет с именем "primary"
      },
      boxShadow: {
        custom: "0 2px 6px 0 rgba(178, 178, 178, 0.2)", // Ваше значение
      },
    },
  },
  plugins: [],
}
