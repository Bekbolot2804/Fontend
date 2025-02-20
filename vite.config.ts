import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Укажите название вашего репозитория
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
});