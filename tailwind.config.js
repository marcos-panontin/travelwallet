/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
        backgroundImage:{
        'cats': 'url(/src/images/backgroundImage.png)'
      },
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        outer: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 1px 5px -1px rgb(0 0 0 / 1.1)',
        custom: '3px -9px 7px -5px rgba(0,0,0,0.75), -4px -7px 6px -5px rgba(0,0,0,0.75)',
        customwhite: '0 6px 30px 0px rgb(255 255 255 / 20%), 0 6px 9px -6px rgb(255 255 255)',
      },
      animation: {
        sunAnimation: 'sunGrow 0.2s linear 0.2s',
        moonAnimation: 'moonGrow 0.2s linear 0.2s',
      },
      keyframes: {
        sunGrow: {
          '0%, 100%': { backgroundSize: '14px 14px' },
          '50%': { backgroundSize: '11px 11px' },
        },
        moonGrow: {
          '0%, 100%': { backgroundSize: '14px 14px' },
          '50%': { backgroundSize: '11px 11px' },
        },
      }
    },
  },
  plugins: [],
}