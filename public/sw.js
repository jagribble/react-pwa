importScripts("../precacheManifest.1e94ebbf0b736b63379454bc95d23ba4.js", "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js");

workbox.core.setCacheNameDetails({
  prefix: 'website-cache',
  precache: 'precache',
  runtime: 'runtime',
});

// runtime cache
// 1. stylesheet
workbox.routing.registerRoute(
  new RegExp(/\.css$/),
  new workbox.strategies.CacheFirst({
    cacheName: 'website-cache-Stylesheets',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 20, // only cache 20 request
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp(/\.js$/),
  new workbox.strategies.CacheFirst({
    cacheName: 'website-cache-js',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 20, // only cache 20 request
        purgeOnQuotaError: true,
      }),
    ],
  }),
);
// 2. images
workbox.routing.registerRoute(
  new RegExp(/\.(png|svg|jpg|jpeg)$/),
  new workbox.strategies.CacheFirst({
    cacheName: 'website-cache-Images',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

// 3. cache news articles result
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'website-cache-app',
    cacheExpiration: {
      maxAgeSeconds: 60 * 30, // cache the news content for 30mn
    },
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://cdn.contentful.com/spaces/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'website-cache-api',
    cacheExpiration: {
      maxAgeSeconds: 60 * 30, // cache the news content for 30mn
    },
  }),
);

workbox.precaching.precacheAndRoute([]);

