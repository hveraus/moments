import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/moments/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ticket: resolve(__dirname, 'ticket.html'),
      },
    },
  },
})
