const cacheName = 'indonesia_covid19';
const filesToCache = [
    './',
    '/index.html',
    '/src/assets/bootstrap.min.css',
    '/src/assets/style.css',
    'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
    'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
    '/src/index.js',
    '/src/main.js',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});
/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(caches.match(e.request).then(function(res) {
            return res || fetch(e.request);
        })
    );
});