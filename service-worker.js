/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-2c0b3b6';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./evzen_onegin_001.html","./evzen_onegin_002.html","./evzen_onegin_003.html","./evzen_onegin_004.html","./evzen_onegin_005.html","./evzen_onegin_006.html","./evzen_onegin_007.html","./evzen_onegin_008.html","./evzen_onegin_009.html","./evzen_onegin_010.html","./evzen_onegin_011.html","./evzen_onegin_012.html","./evzen_onegin_013.html","./evzen_onegin_014.html","./evzen_onegin_015.html","./evzen_onegin_016.html","./evzen_onegin_017.html","./evzen_onegin_018.html","./evzen_onegin_019.html","./evzen_onegin_020.html","./evzen_onegin_021.html","./evzen_onegin_022.html","./evzen_onegin_023.html","./evzen_onegin_024.html","./evzen_onegin_025.html","./evzen_onegin_026.html","./evzen_onegin_027.html","./evzen_onegin_028.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
