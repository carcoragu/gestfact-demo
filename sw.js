const CACHE = 'gestfact-v6';
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
  var path = new URL(e.request.url).pathname;
  if(!FILES.includes(path)) return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/gestfact-demo/index.html'))));
});
