import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/portfolio/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
})
