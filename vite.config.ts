import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // server: { port: 3000 },
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/proxy": {
        target: "http://localhost:8080/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, "/"),
      },
    },
  },
})
