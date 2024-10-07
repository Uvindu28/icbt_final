/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      brown: '#CDA582',
      white: '#FFFFFF',
      black: '#000000',
      light_brown: '#744B28',
      gray_black: '#313131',
      cyn: '#F9ECE1',
      light_yellow: '#F9ECE1',
      rose:'#EE66A6',
      red2:'#ef4444',
      maroon:'#2f1313',
      maroon2:'#631313',
      maroon3:'#a10707',
      redee_light:'#EF4848',
      roseee:'#FBA0A0',
      orange:'#F86F1A',
      red : '#ff0000',
      blue : '#1877F2',
      blue_light : '#adcefa',
      darkblue : '#052855',
      gray:'#c8c8c8',
      orange: {
        500: '#C09A79',
        600: '#A07F65',
      },
      yellow: '#FFEB00',
    },
    extend: {
      fontFamily:{
        Poppins:["Poppins", 'sans-serif'],
      },
      
    },
  },
  plugins: [],
}

