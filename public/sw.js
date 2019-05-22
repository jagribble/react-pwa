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
workbox.precaching.precacheAndRoute([
  {
    "url": "img/icons/icon-128x128.png",
    "revision": "58404066fd14263736f15873bf84af26"
  },
  {
    "url": "img/icons/icon-144x144.png",
    "revision": "3ee15cb3f7b85596084e99de8abff746"
  },
  {
    "url": "img/icons/icon-152x152.png",
    "revision": "a00eae54953904a9295bfc00779a3e5e"
  },
  {
    "url": "img/icons/icon-192x192.png",
    "revision": "afb3f5d50a028f8748298da1ee0f1797"
  },
  {
    "url": "img/icons/icon-384x384.png",
    "revision": "2e42c039273ed0d2134b6689ef0fc1a4"
  },
  {
    "url": "img/icons/icon-512x512.png",
    "revision": "86aa3e001fee7b01b64f2a6502168ac9"
  },
  {
    "url": "img/icons/icon-72x72.png",
    "revision": "db7104bc3106d01ee7bd237535fbe064"
  },
  {
    "url": "img/icons/icon-96x96.png",
    "revision": "bf8695d7783d21a1f3eb4f12bcb482ce"
  },
  {
    "url": "img/logo.ico",
    "revision": "ea29e755f5c6d53f8f7e5048f44f50b8"
  },
  {
    "url": "js/build.js",
    "revision": "073c27e4c4f4f15f143c8261649dc2a5"
  },
  {
    "url": "js/index.html",
    "revision": "f85da6a29aacc212836392dad44b1a15"
  },
  {
    "url": "stylesheets/style.css",
    "revision": "2acee875e092540f3c46e1147ad60198"
  }
]);

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
