self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing service worker ...', event);
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
                console.log('[Service Worker] Precaching app shell');
                cache.add('/src/js/app.js');

            }));
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating service worker ...', event);
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

