import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Site base path. '/' locally; the GitHub Pages workflow sets VITE_BASE=/modern_delhi_infotech/
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
})
