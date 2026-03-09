/**
 * WOW Expense Tracker — Service Worker
 *
 * Strategy: cache-first for the app shell (index.html, icons, manifest).
 * CDN resources (React, Firebase, Tailwind, fonts) are fetched live on first
 * load and cached automatically, so the app works offline after the first visit.
 *
 * Bump CACHE_VERSION when deploying breaking changes to force a cache refresh.
 */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `wow-tracker-${CACHE_VERSION}`;

const APP_SHELL = [
  '/WOW-Blip-Office-Expense-Tracker/',
  '/WOW-Blip-Office-Expense-Tracker/index.html',
  '/WOW-Blip-Office-Expense-Tracker/manifest.json',
  '/WOW-Blip-Office-Expense-Tracker/icons/icon-192.png',
  '/WOW-Blip-Office-Expense-Tracker/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Cache successful same-origin and CDN responses
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
