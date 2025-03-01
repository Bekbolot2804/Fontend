import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://172.20.10.8:8080",
        changeOrigin: true,
      },
    },
    host: "0.0.0.0",
    port: 3000
  },
})
