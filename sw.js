importScripts('/app/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/app/064a48e90ff638b9d357.js",
    "revision": "b1794ec9eb593089e82d08b075ff8663"
  },
  {
    "url": "/app/23722163d7c854c6778c.js",
    "revision": "e37bdb75319204fca3f2f7b8566fb6d5"
  },
  {
    "url": "/app/3f7f69240c30882899b8.js",
    "revision": "4374e8304d786f2908309fa95ba60ada"
  },
  {
    "url": "/app/64206a08295da2fbe462.js",
    "revision": "d37cd29f51cd8900343e29b7fdd31082"
  },
  {
    "url": "/app/878162e7f1a0c75874a7.js",
    "revision": "6fd52aebb8f6c905a8b382dbe422538d"
  },
  {
    "url": "/app/87f50549f3ce11e24f6a.js",
    "revision": "2f116c4e785521a88c9f90f04046566a"
  },
  {
    "url": "/app/9b84ba5af647461c4e35.js",
    "revision": "0d2ca29478931e5c6083a84588b6ea12"
  },
  {
    "url": "/app/9e5c95340df87e610b9d.js",
    "revision": "fe9c677bd7ea8caac4abd4d84b021950"
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
