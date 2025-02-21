import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate', // Автоматическое обновление Service Worker
      manifest: {
        name: 'Tile Notes',
        short_name: 'Tile Notes',
        start_url: '/Frontend/', // Убедитесь, что путь корректен
        display: 'standalone',
        background_color: '#fdfdfd',
        theme_color: '#db4938',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/icon-192x192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/icon-512x512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/desktop.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide', // Для десктопов
          },
          {
            src: '/screenshots/mobile.png',
            sizes: '1080x1920',
            type: 'image/png',
            form_factor: 'narrow', // Для мобильных
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,jpg,ico}'], // Автоматическое кэширование
      },
    }),
  ],
  base: '/Fontend/', // Укажите название вашего репозитория
  server: {
    https: true,
    port: 3000,
    proxy: {
      '/proxy': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, '/'),
      },
    },
  },
});