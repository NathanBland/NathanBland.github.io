importScripts('/app/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/app/2497a31e54eff1fbe5d3.js",
    "revision": "2b8805b4fe0f26dcfe69f43c4f7381d6"
  },
  {
    "url": "/app/31dc9c6afb46caf02400.js",
    "revision": "4e4db320a381b5d6888c4fc2f5cc650c"
  },
  {
    "url": "/app/33ddba5d5abb1294718c.js",
    "revision": "fe71ba6fb12061cc7d3c509a0ba826b6"
  },
  {
    "url": "/app/6c5b6d3bcab714b14e79.js",
    "revision": "d66926ec865339b62eb830838536f7ef"
  },
  {
    "url": "/app/722774a069b1bc0a299b.js",
    "revision": "d4589e1e90930e50d8716d1966a632c3"
  },
  {
    "url": "/app/7cc8bb9546c86836b8a9.js",
    "revision": "ba528a791debe1a0dfd601c38bf97535"
  },
  {
    "url": "/app/ac895e6321c69c068a62.js",
    "revision": "c20dee5d6b6133fca4b42d0437bcdf41"
  },
  {
    "url": "/app/ffaea2b25bf772d69deb.js",
    "revision": "2462c1d3a50e01f2e31a2ee3460bd0d4"
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
