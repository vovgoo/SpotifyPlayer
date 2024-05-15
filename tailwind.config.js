/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        'track' : '300px',
        'track-sm' : '200px',
        'range' : '5px',
        'pointer' : '15px',
      },
      width: {
        'track' : '300px',
        'track-sm' : '200px',
        'main-name' : '900px',
        'pointer' : '15px',
      }, 
      lineHeight: {
        'main-name' : '80px',
      }
    },
  },
  plugins: [],
}