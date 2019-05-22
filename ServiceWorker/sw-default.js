/* eslint-disable */
// Let's use the local version of Workbox instead of CDN
importScripts('js/workbox-v4.3.1/workbox-sw.js');

// SETTINGS

// Path prefix to load modules locally
workbox.setConfig({
    modulePathPrefix: 'js/workbox-v4.3.1/',
});

// Turn on logging
workbox.setConfig({
    debug: true,
});

// Modify SW update cycle
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([]);

// RUNTIME CACHING

// Google fonts
workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'googleapis',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30,
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('/'),
    new workbox.strategies.CacheFirst()
);
