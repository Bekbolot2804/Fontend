const CACHE_NAME = 'my-app-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/desktop-wide.png',
  '/icons/mobile-narrow.png',
  '/vite.svg',
  '/manifest.json',
  '/assets/index-Bcf2U2Y1.js',  // пример пути после сборки
  '/assets/index-C8C0uoyg.css',
];

// Установка
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Обработка запросов
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => 
      response || fetch(e.request)
    )
  );
});