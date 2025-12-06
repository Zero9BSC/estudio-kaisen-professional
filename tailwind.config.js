/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#101624',
        secondary: '#FA8C01',
        accent: '#FD4D02',
        dark: '#1E293B',
        light: '#F8F9FA',
        gray: {
          50: '#F8F9FA',
          100: '#E5E7EB',
          500: '#686868',
          900: '#111827',
        }
      },
      fontFamily: {
        'heading': ['Fraunces', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}