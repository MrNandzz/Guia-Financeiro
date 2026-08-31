/* Service Worker do Piloto.
   Cacheia o "casco" do app (HTML, manifest, ícone) pra ele abrir offline.
   Não cacheia agressivamente: sempre tenta a rede primeiro pros arquivos
   do próprio app, e só usa o cache como reserva — assim, quando você subir
   uma versão nova (mudando CACHE_NAME), o usuário recebe a atualização
   em vez de ficar preso numa versão antiga. */

const CACHE_NAME = 'piloto-pwa-v4';
const APP_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Só mexe em requisições GET.
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === location.origin;

  if (!isSameOrigin) {
    // Fontes do Google, chamadas de API futuras, etc: deixa passar direto
    // pra rede, sem tentar cachear nem interceptar.
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
  );
});
