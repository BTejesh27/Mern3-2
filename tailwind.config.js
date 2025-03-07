/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      animation: {
        'gradient-x': 'gradient 15s ease infinite',
        'rainbow-spin': 'rainbow-spin 3s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': '0% 50%'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': '100% 50%'
          },
        },
        'rainbow-spin': {
          '0%': {
            filter: 'hue-rotate(0deg)',
          },
          '100%': {
            filter: 'hue-rotate(360deg)',
          },
        },
      },
    },
  },
  safelist: [
    'ring-orange-500',
    'ring-purple-500',
    'ring-blue-500',
    'ring-green-500',
    'from-orange-500',
    'via-purple-500',
    'to-blue-500',
    'from-orange-600',
    'via-purple-600',
    'to-blue-600',
  ],
  plugins: [],
};