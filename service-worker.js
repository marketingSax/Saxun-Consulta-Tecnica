const CACHE_NAME = 'saxun-tech-v3';
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

// Instalación: Cachear recursos + tomar control INMEDIATAMENTE
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW v3: Cache abierto, guardando activos...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // ← Toma control sin esperar a que se cierren pestañas
  );
});

// Activación: Limpiar caches antiguos + reclamar clientes activos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log('SW v3: Eliminando caché antiguo:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim()) // ← Toma control de todas las pestañas abiertas
  );
});

// Estrategia Fetch: Network First para HTML (siempre fresco), Cache First para assets estáticos
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // No interceptar llamadas a Netlify Functions/Edge Functions ni a Gemini
  if (url.pathname.includes('.netlify') || url.hostname.includes('generativelanguage')) {
    return;
  }

  // Para el HTML principal: Network First (garantiza código actualizado)
  if (url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          const cloned = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Para el resto de assets: Cache First (rendimiento)
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
