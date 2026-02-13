const CACHE_NAME = 'gemstone-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/gem.html',
  '/style.css',
  '/app.js',
  '/gem.js',
  '/gemstones-data.js',
  '/luster-data.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});