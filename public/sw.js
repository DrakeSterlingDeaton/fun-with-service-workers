
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    
    // for any fetch request, check the cache first to see if that request has been cached.
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    // return the cached value (if it exists)
                    return response;
                } else {
                    // otherwise, send the fetch request
                    return fetch(event.request);
                }
            })
            
    );
});