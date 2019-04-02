importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/33ddba5d5abb1294718c.js",
    "revision": "fe71ba6fb12061cc7d3c509a0ba826b6"
  },
  {
    "url": "/_nuxt/3f7f69240c30882899b8.js",
    "revision": "4374e8304d786f2908309fa95ba60ada"
  },
  {
    "url": "/_nuxt/4303575a1bb08a41ffd7.js",
    "revision": "73864beea6b31b71d205ba77b576a2cc"
  },
  {
    "url": "/_nuxt/704523aac619bfd5daa6.js",
    "revision": "9a00b3f15a4e5262c3666c1d444cb40a"
  },
  {
    "url": "/_nuxt/84b04392db3ab1ec6ef0.js",
    "revision": "ab1392a31dd5e4b2914a4a4ad29c0226"
  },
  {
    "url": "/_nuxt/90262f240d1b2f302a15.js",
    "revision": "73d61e97c0e7203d85e4642b7783d1c5"
  },
  {
    "url": "/_nuxt/b46fd3379fd3ae3e238b.js",
    "revision": "0530c20334caf729ba64a834317cb94a"
  },
  {
    "url": "/_nuxt/eee9634f20559caeb485.js",
    "revision": "2b63548494ed2db1383b1144f49a9881"
  }
], {
  "cacheId": "NathanBland.github.io",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
