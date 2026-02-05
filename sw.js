
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Pass-through for online-first experience
  e.respondWith(fetch(e.request));
});
