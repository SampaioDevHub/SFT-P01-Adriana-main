// next.config.js
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 365 },
        },
      },
      {
        urlPattern: /^https:\/\/cdn.jsdelivr.net\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'jsdelivr',
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
        },
      },
      {
        urlPattern: /^\/_next\/image\?url=.+/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'next-image',
          expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: /^\/_next\/.*/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'next-static',
          expiration: { maxEntries: 128, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: /^\/.*$/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offline-pages',
          expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 },
          networkTimeoutSeconds: 10,
        },
      },
    ],
  });
   
  module.exports = withPWA({
    reactStrictMode: true,
  });
  