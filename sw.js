var cacheName = 'TechiePWA-cache-v1';
var filesToCache = [
  'index.html',
  'styles/bootstrap.min'
];

self.addEventListener('install', function(event) {
  console.log('Installed sw.js', event);
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cn) {
                    if(cn !== cacheName){
                        return caches.delete(cn);
                    }
                })
            );
        })
    );
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function(event) {
  // Calling event.respondWith means we're in charge
  // of providing the response. We pass in a promise
  // that resolves with a response object
  event.respondWith(
    // First we look for something in the caches that
    // matches the request
    caches.match(event.request).then(function(response) {
      // If we get something, we return it, otherwise
      // it's null, and we'll pass the request to
      // fetch, which will use the network.
      return response || fetch(event.request);
    })
  );
});
