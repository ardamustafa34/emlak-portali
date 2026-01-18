const CACHE_NAME = 'v5';
// Buraya eklediğin her dosya, uygulamanın çalışması için "zorunlu" hale gelir.
const ASSETS = [
  '/',
  '/index.html',
  '/map.html',
  '/emlak-ilanlari.html',
  '/contact.html',
  '/login.html',
  '/css-file/style.css', // CSS yolunu tekrar kontrol et
  '/assets/js/auth.js',
  '/icon-192.png',       // Yeni eklediğin resim
  '/icon-512.png'        // Yeni eklediğin resim

];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Dosyalar önbelleğe alınıyor...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Beklemeyi atla
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Hemen kontrolü ele al
});