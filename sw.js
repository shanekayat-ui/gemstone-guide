const CACHE_NAME = 'gemstone-v2';
const urlsToCache = [
  '/gemstone-guide/',
  '/gemstone-guide/index.html',
  '/gemstone-guide/gem.html',
  '/gemstone-guide/style.css',
  '/gemstone-guide/app.js',
  '/gemstone-guide/gem.js',
  '/gemstone-guide/gemstones-data.js',
  '/gemstone-guide/luster-data.js'
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
