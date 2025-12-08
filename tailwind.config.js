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
        },
        
        // Colores de Figma (para usar con clases de Tailwind)
        'figma-navbar-bg': 'var(--primitives-color-ebony-light)',
        'figma-navbar-text': 'var(--primitives-color-white)',
        'figma-ebony': 'var(--primitives-color-ebony)',
      },
      fontFamily: {
        'heading': ['Fraunces', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'heading-h1': ['Fraunces', 'serif'],
        'text-regular-normal': ['Inter', 'sans-serif'],
      },
      spacing: {
        'page-padding': 'var(--spacing-sizing-page-padding-padding-global)',
      },
    },
  },
  plugins: [],
}