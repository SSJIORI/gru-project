/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Calibri', 'Anybody', 'ui-sans-serif', 'system-ui'],
        display: ['Monoton', 'Anybody', 'ui-sans-serif'],
        accent: ['Anybody', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#011627',
        porcelain: '#FDFFFC',
        sea: '#2EC4B6',
        strawberry: '#E71D36',
        amber: '#FF9F1C',
        white: '#FFFFFF',
      },
      boxShadow: {
        glow: '0 0 32px rgba(56, 189, 248, 0.24)',
        soft: '0 24px 70px rgba(5, 10, 20, 0.28)',
        neon: '0 30px 60px rgba(1, 22, 39, 0.28)',
      },
    },
  },
  plugins: [],
};
