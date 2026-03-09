/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Dual dark-mode strategy:
  //   'class'            → html.dark  (existing Tailwind dark: prefix behaviour)
  //   '[data-mode="dark"]' → body[data-mode="dark"]  (Formation token activation)
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
