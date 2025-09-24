/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          pink: '#FCC7D7',
        },
        secondary: {
          lavender: '#D8D3E7',
        },
        accent: {
          purple: '#8546EF',
        },
        neutral: {
          light: '#9CA3AF',
          medium: '#6B7280', 
          dark: '#374151',
          darker: '#1F2937',
        }
      },
      fontFamily: {
        manrope: ['Amiri', 'serif'],
      },
      spacing: {
        '8': '8px',
        '16': '16px', 
        '24': '24px',
        '32': '32px',
      },
      borderRadius: {
        'card': '16px',
        'chat': '24px',
      }
    },
  },
  plugins: [],
};