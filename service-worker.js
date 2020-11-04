importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

//caching
workbox.precaching.precacheAndRoute([
  {url: '/index.html', revision: '1'},
  {url: '/nav.html', revision: '1'},
  {url: '/team.html', revision: '1'},
  {url: '/player.html', revision: '1'},
  {url: '/manifest.json', revision: '1'},
  {url: '/pages/about.html', revision: '1'},
  {url: '/pages/contact.html', revision: '1'},
  {url: '/pages/saved.html', revision: '1'},
  {url: '/pages/home.html', revision: '1'},
  {url: '/pages/scorer.html', revision: '1'},
  {url: '/css/materialize.min.css', revision: '1'},
  {url: '/css/style.css', revision: '1'},
  {url: '/js/materialize.min.js', revision: '1'},
  {url: '/js/nav.js', revision: '1'},
  {url: '/js/db.js', revision: '1'},
  {url: '/js/api.js', revision: '1'},
  {url: '/js/idb.js', revision: '1'},
]);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('/team.html?'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'konten-team'
  })
);

workbox.routing.registerRoute(
  new RegExp('/player.html?'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'konten-payer'
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-data'
  })
);

// Menyimpan cache dari JQuery
workbox.routing.registerRoute(
  /^https:\/\/code\.jquery\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'jquery-min-js',
  })
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);
 
/*self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", (event) => {
    var base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
        caches.open(CACHE_NAME).then((cache) => fetch(event.request).then((response) => {
            cache.put(event.request.url, response.clone());
            return response;
          }))
      );
    } else {
      event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request);
        })
      )
    }
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => Promise.all(
          cacheNames.map((cacheName) => {
              if (cacheName != CACHE_NAME) {
                console.log("ServiceWorker: cache " + cacheName + " dihapus");
                return caches.delete(cacheName);
              }
            })
        ))
    );
});*/

//push
self.addEventListener('push', (event) => {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/assets/images/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('MyFootBall PWA', options)
    );
});