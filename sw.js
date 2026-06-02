const CACHE = 'gestfact-v5';
const FILES = [
  '/gestfact-demo/',
  '/gestfact-demo/index.html',
  '/gestfact-demo/miguel.html',
  '/gestfact-demo/manifest-miguel.json',
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
  if(!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/gestfact-demo/index.html'))));
});
