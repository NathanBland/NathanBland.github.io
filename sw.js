importScripts('/app/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/app/20f442e9a71bbe859b0f.js",
    "revision": "b720a4e102ce47965576d13e201e91ec"
  },
  {
    "url": "/app/2dd697d5a0bb80616527.js",
    "revision": "f47224aba9ce89b54b952c4048cfb80f"
  },
  {
    "url": "/app/5f2e446d3e30be25a815.js",
    "revision": "8175639ac9499953d3512d464ef1082b"
  },
  {
    "url": "/app/85d589556c89e4bc6e75.js",
    "revision": "aa1585d420391fa37c04a611674e102c"
  },
  {
    "url": "/app/881512400e767a191d08.js",
    "revision": "b810d39d029ef807d63da8762351a33f"
  },
  {
    "url": "/app/94ac10d515b3b5ed394d.js",
    "revision": "b46fc98b18c6ad2d4261a9094622524c"
  },
  {
    "url": "/app/b4bbf995cf290785f306.js",
    "revision": "87dcad0aba084a40174d9a3f399d45e6"
  },
  {
    "url": "/app/bfcd002fe4045d8e680e.js",
    "revision": "baccb3c626151291dffba739ffec62b1"
  },
  {
    "url": "/app/db1ab69c0fe6db64edeb.js",
    "revision": "f29d122470a1b096c0faba4810c109ab"
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
