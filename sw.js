importScripts('/app/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/app/065944ee89051ae50d6f.js",
    "revision": "1b7b716b2ffd32f92dac0a119568daf1"
  },
  {
    "url": "/app/1119f04f1adfb13a99e2.js",
    "revision": "dfb77cac22bf2a7b24d7ad6793528844"
  },
  {
    "url": "/app/402a1d80ad02bd161cc5.js",
    "revision": "77f770b65906249976d63a20a6249e6f"
  },
  {
    "url": "/app/722774a069b1bc0a299b.js",
    "revision": "d4589e1e90930e50d8716d1966a632c3"
  },
  {
    "url": "/app/9e5c95340df87e610b9d.js",
    "revision": "fe9c677bd7ea8caac4abd4d84b021950"
  },
  {
    "url": "/app/e1cb7c8422f4674725d4.js",
    "revision": "7b0ce9e429015bd7a47f30b3173357ba"
  },
  {
    "url": "/app/eca99b84f5f56ab0050b.js",
    "revision": "af206c2f4007b9830a610c7bb19e7d76"
  },
  {
    "url": "/app/fad8fc0378981fa06f5a.js",
    "revision": "e0d543d7ea33f4bb9e36dcf9ba9dd507"
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
