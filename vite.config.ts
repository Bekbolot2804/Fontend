import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "name": "Tile Notes",
    "short_name": "Tile Notes",
    "start_url": "/Fontend/",
    "display": "standalone",
    "background_color": "#fdfdfd",
    "theme_color": "#db4938",
    "orientation": "portrait-primary",
    "icons": [
      {
        "src": "/icon-192x192.png",
        "type": "image/png", "sizes": "192x192"
      },
      {
        "src": "/icon-512x512.png",
        "type": "image/png", "sizes": "512x512"
      }
    ]
      }
    })
  ],
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