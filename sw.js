importScripts('/app/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/app/280389e2757fa59c68a4.js",
    "revision": "46964b3cdd50a88abdb2355858edf6ec"
  },
  {
    "url": "/app/33ddba5d5abb1294718c.js",
    "revision": "fe71ba6fb12061cc7d3c509a0ba826b6"
  },
  {
    "url": "/app/3f7f69240c30882899b8.js",
    "revision": "4374e8304d786f2908309fa95ba60ada"
  },
  {
    "url": "/app/4303575a1bb08a41ffd7.js",
    "revision": "73864beea6b31b71d205ba77b576a2cc"
  },
  {
    "url": "/app/5f30f57558d84e8e15d4.js",
    "revision": "80374ef4bdbd8d99b1e6aa8adaece821"
  },
  {
    "url": "/app/84b04392db3ab1ec6ef0.js",
    "revision": "ab1392a31dd5e4b2914a4a4ad29c0226"
  },
  {
    "url": "/app/94007796e763512004a9.js",
    "revision": "bbfff3a6bdf00250cce4693a000ec0a4"
  },
  {
    "url": "/app/eee9634f20559caeb485.js",
    "revision": "2b63548494ed2db1383b1144f49a9881"
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
