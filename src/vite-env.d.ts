/// <reference types="vite/client" />

// Добавьте это для Service Worker
interface Navigator {
    serviceWorker: {
      register: (path: string) => Promise<ServiceWorkerRegistration>;
    };
  }