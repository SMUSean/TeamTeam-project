// tailwind.config.js (ESM)
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        calibri: ['calibri', 'sans-serif'],
      },
      colors: {
        light: {
          background: '#9b6fa7',
          text: '#000000',     
          whiteText:'#ffffff',
          primary: '#289eecff',
          highlight: '#f2f2b8',
          border: '#ccb7c0',
        },
        dark: {
          background: '#2A2030',
          text: '#f0E68C',
          whiteText:'#ffffff',
          primary: '#3faaf1ff',
          highlight: '#6D3D86',
          border: '#1F2937'
        }
      },
    },
  },
  plugins: [],
}

