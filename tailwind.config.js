/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#0f1117',
        panel: '#171a23',
        accent: '#7c5cff',
        accent2: '#22d3ee',
      },
    },
  },
  plugins: [],
};
