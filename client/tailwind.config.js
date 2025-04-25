// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f9eb',
          100: '#e9f0c9',
          200: '#d6e495',
          300: '#c2d460',
          400: '#aac236',
          500: '#88a81a', // Main brand color
          600: '#6b8614',
          700: '#50650f',
          800: '#36440a',
          900: '#1f2805',
        },
        secondary: {
          50: '#f6f8fd',
          100: '#e5edf9',
          200: '#c5d7f0',
          300: '#9ab9e4',
          400: '#6993d3',
          500: '#4471c4', // Secondary brand color
          600: '#3458a8',
          700: '#284283',
          800: '#1c2f5e',
          900: '#101c39',
        },
        accent: {
          50: '#fef2f2',
          100: '#fde3db',
          200: '#fbc3ad',
          300: '#f89c7b',
          400: '#f47150',
          500: '#e84c28', // Accent color for CTAs
          600: '#c73a1a',
          700: '#9c2e14',
          800: '#70210e',
          900: '#471508',
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/rice-field-pattern.jpg')",
        'farmer-pattern': "url('/src/assets/images/farmer-pattern.png')",
        'grain-texture': "url('/src/assets/images/grain-texture.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}