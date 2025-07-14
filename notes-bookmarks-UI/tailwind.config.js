/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: { card: '0 1px 4px rgba(0,0,0,0.08)' }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};


