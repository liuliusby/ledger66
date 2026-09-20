var CACHE='blue-v1';
var FILES=['blue.html','blue-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}));return self.clients.claim();});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).catch(function(){
    return caches.match(e.request).then(function(r){return r||caches.match('blue.html');});
  }));
});
