const CACHE_NAME = 'habitos-app-v2.0.0';
const APP_SHELL = [
  './', './index.html', './manifest.json', './browserconfig.xml',
  './css/variables.css', './css/reset.css', './css/typography.css', './css/global.css',
  './css/animations.css', './css/utilities.css', './css/components.css', './css/desktop.css',
  './css/pages/home.css', './css/pages/calendar.css', './css/pages/statistics.css',
  './css/pages/settings.css', './css/pages/day.css', './css/pages/achievements.css', './css/pages/backup.css',
  './js/app.js', './js/router.js', './js/storage.js', './js/backup.js', './js/achievements.js',
  './js/theme.js', './js/constants.js', './js/utils.js',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png', './assets/icons/logo.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
