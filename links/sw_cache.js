const cache_name = 'v3';

// Call install event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed!');
  // e.waitUntil(
  //   caches.open(cache_name)
  //   .then(cache => {
  //     console.log('Service Worker: Caching Files');
  //     cache.addAll(cache_assets);
  //   })
  //   .then(() => self.skipWaiting())
  //   // .catch(err => console.log(`Service Worker Error: ${err}`))
  // );

});

// Call activate event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  // e.waitUntil(
  //   caches.keys().then(cacheNames => {
  //     return Promise.all(
  //       cacheNames.map(cache => {
  //         if (cache != cache_name) {
  //           console.log('Service Worker: Clearing Old Cache');
  //           return caches.delete(cache);
  //         }
  //       })
  //     );
  //   }).then(() => self.skipWaiting())
  // );
});

self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching');
  // console.log(e.request.url);
  // e.respondWith(
  //   fetch(e.request)
  //   .then(res => {
  //     // Make a clone of the response
  //     const resClone = res.clone();
  //     // Open cache
  //     caches.open(cache_name)
  //       .then(cache => {
  //         // Add the response to the cache
  //         cache.put(e.request, resClone);
  //       });
  //     return res;
  //   }).catch(err => caches.match(e.request).then(res => res))
  // );
});