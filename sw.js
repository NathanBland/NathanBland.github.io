importScripts('/framework/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/framework/211b521cce74b47dd15e.js",
    "revision": "d5922e7b83c804dc7fbb45f0e9e01185"
  },
  {
    "url": "/framework/2a9d348ff5019a659222.js",
    "revision": "f5cbaca58247b0de48a026692ef5875a"
  },
  {
    "url": "/framework/2bf79c4847c6e681b950.js",
    "revision": "67e31c87f3dc47fa1a78fff4116020f3"
  },
  {
    "url": "/framework/2ff0bdd6bcd84fb5ef44.js",
    "revision": "b9e17b52baef38e600f42c1635af8908"
  },
  {
    "url": "/framework/36d444b2aea95af0b32b.js",
    "revision": "703f8d3e0d50a7b0ff2fdfa63bfd0f2d"
  },
  {
    "url": "/framework/3bb043d6186af0c3f093.js",
    "revision": "6e5f1703098164f9a5d0c2140abc9a84"
  },
  {
    "url": "/framework/4493c8f6f6002fc1f668.js",
    "revision": "7ca2dbb01632ef305b725ff49cea600c"
  },
  {
    "url": "/framework/7d7a0202df01a964d2a0.js",
    "revision": "033e0a7872395a1173790eef938a03a8"
  },
  {
    "url": "/framework/9509a8a8def613103c87.js",
    "revision": "b70ccb2bdd35bb7a9a1d734166ef6d3a"
  },
  {
    "url": "/framework/bd5c746264bb09a88478.js",
    "revision": "c4aef595a26e612050be4e8c1773f038"
  }
], {
  "cacheId": "NathanBland.github.io",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/framework/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
