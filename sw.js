importScripts('/app/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/app/040fa78931b488d5ae44.js",
    "revision": "c546c9848d1d4229ea802421ad79c2bf"
  },
  {
    "url": "/app/0aa4cb37a062b13eee3a.js",
    "revision": "f9c566f99290e5eccc0e2cbbcbcd655c"
  },
  {
    "url": "/app/0fbb09fbffac7ef60961.js",
    "revision": "438b8d317329a3404b747808ccb7e165"
  },
  {
    "url": "/app/338122e07c84b7b679f5.js",
    "revision": "4f907f32ede71cb52965d267d586f562"
  },
  {
    "url": "/app/62ec22d50f27c23e1212.js",
    "revision": "266d70366c5093627b2e31ff5404e2fa"
  },
  {
    "url": "/app/8579dcbdbac81765ec1a.js",
    "revision": "f017d0311ffdd5307a823f83db7f9f94"
  },
  {
    "url": "/app/a392e09a9dfe82dd648f.js",
    "revision": "36ac5ffeaba7fef00b26cff7f4dfb69d"
  },
  {
    "url": "/app/c3e8b2e2ccf220d513a5.js",
    "revision": "7a496f370dd27ced81751f9f3c5c46c2"
  },
  {
    "url": "/app/dc88ba800d3024994eb8.js",
    "revision": "8a0f8a364566be0480cdaa59c9167c90"
  },
  {
    "url": "/app/eeca562d991946636ca4.js",
    "revision": "146a7e629a7cf8e07a504817f0b1b366"
  }
], {
  "cacheId": "NathanBland.github.io",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/app/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
