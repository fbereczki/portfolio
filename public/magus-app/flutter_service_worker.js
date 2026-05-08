'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "28852d8800248558b8e0e0f3717d588d",
"assets/AssetManifest.bin.json": "ca30761a6dd22d6a93caeeb1c5f93b93",
"assets/assets/database/magus_data.db": "0845a69d87bb25c9dd86678f49b091fb",
"assets/assets/icons/classes/bard.png": "14275e928fa8391ae6a4337bd6a21eda",
"assets/assets/icons/classes/boszorkany.png": "11095391f675a38298d52aa4c0075a84",
"assets/assets/icons/classes/fejvadasz.png": "a43f34846c1e8f5253bfab0d3a167873",
"assets/assets/icons/classes/gladiator.png": "9524e1db2df5b8e7334d2e90b27ce471",
"assets/assets/icons/classes/harcmuvesz.png": "34952eda611c16ec5face4f49e545e4a",
"assets/assets/icons/classes/harcos.png": "db2047cd97922630590db3f9c80ce0bc",
"assets/assets/icons/classes/kardmuvesz.png": "94480cd8ac5a750c41afbd73ec5856bb",
"assets/assets/icons/classes/lovag.png": "1d81c98f16f5fdf079a94adedfeb6be7",
"assets/assets/icons/classes/pap.png": "6a1ba4cb9147f4ec60ae293fbf9b5936",
"assets/assets/icons/classes/paplovag.png": "d27f8e1d0f430d582bd8d444c8377b43",
"assets/assets/icons/classes/tolvaj.png": "fd9da7c4350b4b7920332f2aac61b8fd",
"assets/assets/icons/classes/tuzvarazslo.png": "9524537046d56d8b2679baa0b62db91f",
"assets/assets/icons/classes/varazslo.png": "7f7cb2883c45519c7e228490056c2f86",
"assets/assets/images/paper_background.png": "97adb340d09564baf29dcb53bc2edb6e",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "107d802b82e2ec88d17bff4e83c9d91f",
"assets/google_fonts/Cinzel-Black.ttf": "8a5933bc545e280a8b9eb08f11c64795",
"assets/google_fonts/Cinzel-Bold.ttf": "73f3e4cb3a829bfeb2e6fcef45bf1fca",
"assets/google_fonts/Cinzel-ExtraBold.ttf": "61982123bfbbc48405aba431f974bbf8",
"assets/google_fonts/Cinzel-Medium.ttf": "d7e6c63ebacd0fdb29b188c97103e134",
"assets/google_fonts/Cinzel-Regular.ttf": "5bdef3d27fe339d40fd24fc489ffffbd",
"assets/google_fonts/Cinzel-SemiBold.ttf": "11b5561701383dbd41c7b29778861f0b",
"assets/google_fonts/CinzelDecorative-Black.ttf": "72ffe91045cc4dc525eb24f9a27db557",
"assets/google_fonts/CinzelDecorative-Bold.ttf": "652a6d8cab4bb0e96fd19d36a5c59af6",
"assets/google_fonts/CinzelDecorative-Regular.ttf": "4ad3db6227abe7574acfe479a0214f2b",
"assets/google_fonts/CrimsonText-Bold.ttf": "07d38e714315282bdffc15529ec9e0cf",
"assets/google_fonts/CrimsonText-BoldItalic.ttf": "636c2b089116b929d13cd60dc22a4d6f",
"assets/google_fonts/CrimsonText-Italic.ttf": "6fc5405f80203f3c52ff1cd070664052",
"assets/google_fonts/CrimsonText-Regular.ttf": "287de92dcbc6ce0ba105321467660d21",
"assets/google_fonts/CrimsonText-SemiBold.ttf": "a5852985a89e99605369bf2161aa3e6d",
"assets/google_fonts/CrimsonText-SemiBoldItalic.ttf": "9c9fd31a082c0ecf3bb9befafa5e289f",
"assets/google_fonts/RobotoMono-Bold.ttf": "94a142d9445e0d478fa27c4fb9bb21ca",
"assets/google_fonts/RobotoMono-Medium.ttf": "3fae9eeedf071e97fdd6f1c7adb6b1e9",
"assets/google_fonts/RobotoMono-Regular.ttf": "8c339739001037df8df37a2a76878e63",
"assets/NOTICES": "5f6e6888d85da4f3df636dce8ed81404",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"drift_worker.js": "3a57681b52f6c68292ac63ab80a99eaa",
"favicon.png": "bbb2a05a1378f3d8e66a4bfd380df9db",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"flutter_bootstrap.js": "18a84ac6ab7d650f87834d53ed50fcec",
"icons/Icon-192.png": "8b560773422c4a3c544760cb3c70887b",
"icons/Icon-512.png": "dc54c90af3b9f2d207bf977a4dd195ed",
"icons/Icon-maskable-192.png": "8b560773422c4a3c544760cb3c70887b",
"icons/Icon-maskable-512.png": "dc54c90af3b9f2d207bf977a4dd195ed",
"index.html": "9d4e3793ea9d7929c51d0e9e9f9a3974",
"/": "9d4e3793ea9d7929c51d0e9e9f9a3974",
"main.dart.js": "1bbfe997d8e66d8b9f4cc65c6612fc7f",
"manifest.json": "a48e3f31cd82a1dcdc0b827f266762c4",
"sqlite3.wasm": "2e9fc1ccbb9d15199fccf405b0ceee53",
"version.json": "9ebda09f3be55c46c4993bd072fb7909"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
