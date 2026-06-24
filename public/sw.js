/* Este archivo debe estar colocado en la carpeta raíz del sitio. */

// @ts-nocheck
/* global self, ServiceWorkerGlobalScope, caches, fetch */

const VERSION = "1.8" 
const CACHE = "pwamd"

const ARCHIVOS = [
  "index.html",
  "gps.html",
  "camara.html",
  "ayuda.html",
  "css/estilos.css",
  "css/material-symbols-outlined.css",
  "css/transicion_pestanas.css",
  "favicon.ico",
  "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
  "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
  "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
  "fonts/Roboto-Italic-VariableFont_wdth,wght.ttf",
  "fonts/Roboto-VariableFont_wdth,wght.ttf",
  "img/maskable_icon_x48.png",
  "img/maskable_icon_x72.png",
  "img/maskable_icon_x96.png",
  "img/maskable_icon_x128.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x384.png",
  "img/maskable_icon_x512.png",
  "img/maskable_icon_x1600.png",
  "img/screenshot_horizontal.png",
  "img/screenshot_vertical.png",
  "js/nav-tab-fixed.js",
  "js/registraServiceWorker.js",
  "libclienteweb/abreElementoHtml.js",
  "libclienteweb/cierraElementoHtml.js",
  "libclienteweb/ES_APPLE.js",
  "libclienteweb/getAttribute.js",
  "libclienteweb/manejaErrores.js",
  "libclienteweb/muestraTextoDeAyuda.js",
  "libclienteweb/ProblemDetailsError.js",
  "libclienteweb/querySelector.js",
  "libclienteweb/resaltaSiEstasEn.js",
  "libmde/md-app-bar.js",
  "libmde/md-filled-button.css",
  "libmde/md-filled-text-field.css",
  "libmde/md-list.css",
  "libmde/md-menu.css",
  "libmde/md-options-menu.js",
  "libmde/md-outline-button.css",
  "libmde/md-select-menu.js",
  "libmde/md-tab.css",
  "material-tokens/css/baseline.css",
  "material-tokens/css/colors.css",
  "material-tokens/css/elevation.css",
  "material-tokens/css/motion.css",
  "material-tokens/css/palette.css",
  "material-tokens/css/shape.css",
  "material-tokens/css/state.css",
  "material-tokens/css/theme/dark.css",
  "material-tokens/css/theme/light.css",
  "material-tokens/css/typography.css",
  "site.webmanifest",
  "ungap/es.js",
  "/"
]

if (self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener("install", (evt) => {
    evt.waitUntil(llenaElCache())
  })

  self.addEventListener("fetch", (evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaLaRespuestaEnElCache(evt))
    }
  })

  self.addEventListener("activate", (evt) => {
    console.log(`Service Worker ${VERSION} activo.`)
    evt.waitUntil(self.clients.claim())
  })
}

async function llenaElCache() {
  const keys = await caches.keys()
  for (const key of keys) await caches.delete(key)
  const cache = await caches.open(CACHE)
  await cache.addAll(ARCHIVOS)
}

async function buscaLaRespuestaEnElCache(evt) {
  const cache = await caches.open(CACHE)
  const response = await cache.match(evt.request, { ignoreSearch: true })
  return response || fetch(evt.request)
}