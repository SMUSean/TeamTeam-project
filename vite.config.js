// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'node:path'
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  clearScreen: false,
  server: {
    host: '0.0.0.0',
        port: 3080,
    // Uncomment if you really use local HTTPS certs:
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem')),
    // },
    proxy: {
      '/api': 'http://localhost:5555',
    },
    watch: {
      usePolling: true,
      interval: 500,
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**']
    }
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
