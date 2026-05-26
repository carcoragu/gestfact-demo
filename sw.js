const CACHE = 'gestfact-v1';
const FILES = [
  '/gestfact-demo/',
  '/gestfact-demo/index.html',
  '/gestfact-demo/logo.png',
  '/gestfact-demo/portada.jpg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/gestfact-demo/index.html'))));
});
