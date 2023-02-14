//Application->Service worker->enable update on reload and clear storage
//name of storage of browser- if we load image once we don't need to load it every time we go online
const CACHE_NAME = 'version-1'
//stores page when app has no internet
const urlsToCache = [ 'index.html', 'workoffline.html'];
//Install a service
self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)  => {
            console.log('Opened cache');

            return cache.addAll(urlsToCache);
        })
    )
});

//Listen for requests
self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(()=>caches.match('workoffline.html'))
            
        })
    )
});

//Activate the service worker
self.addEventListener('activate',(event)=>{
    const cache_whitelist = [];
    cache_whitelist.push(CACHE_NAME);
    event.waitUntil(
        cache.keys().then((cacheNames)=>Promise.all(
            cacheNames.map((cacheName)=>{
                if(!cache_whitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});