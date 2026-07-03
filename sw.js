const CACHE = 'gestfact-v15';

self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if(url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(function(res){
        var clone = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
        return res;
      })
      .catch(function(){
        return caches.match(e.request);
      })
  );
});
