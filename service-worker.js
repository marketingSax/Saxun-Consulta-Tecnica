const CACHE_NAME = 'saxun-tech-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/data_index.js',
  '/data_pdf1.js',
  '/data_pdf2.js',
  '/data_pdf3.js',
  'https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js',
  'https://unpkg.com/lucide@latest'
];

// Instalación: Cachear recursos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto, guardando activos...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activación: Limpiar caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Estrategia Fetch: Cache First para activos locales, Network First para lo demás
self.addEventListener('fetch', event => {
  // No interceptamos llamadas a la API de Netlify ni a Gemini directamente
  if (event.request.url.includes('.netlify/functions')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(networkResponse => {
          // Si el recurso no está en cache y es exitoso, podríamos guardarlo (opcional)
          return networkResponse;
        });
      })
  );
});
