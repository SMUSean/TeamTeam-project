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
          background: '#4AE34A',
          text: '#000000',     
          whiteText:'#ffffff',
          primary: '#289eecff',
          highlight: '#90EE90',
          border: '#72E972',
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

