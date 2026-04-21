const CACHE_NAME = "rumahku-v2";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/assets/style.css",
  "/assets/app.js",
  "/manifest.json",
];

// =========================
// INSTALL
// =========================
self.addEventListener("install", (e) => {
  self.skipWaiting(); // langsung aktif

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// =========================
// ACTIVATE
// =========================
self.addEventListener("activate", (e) => {
  self.clients.claim(); // langsung kontrol page

  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            return caches.delete(k);
          }
        })
      )
    )
  );
});

// =========================
// FETCH (SMART STRATEGY)
// =========================
self.addEventListener("fetch", (e) => {
  const req = e.request;

  // ❗ Skip non-GET request
  if (req.method !== "GET") return;

  // ❗ Skip extension / chrome request
  if (!req.url.startsWith("http")) return;

  // =========================
  // HTML → Network First
  // =========================
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put("/index.html", res.clone());
            return res;
          });
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  // =========================
  // CSS / JS / Assets → Cache First
  // =========================
  e.respondWith(
    caches.match(req).then((cached) => {
      return (
        cached ||
        fetch(req)
          .then((res) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, res.clone());
              return res;
            });
          })
          .catch(() => cached)
      );
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow("/");
      })
  );
});