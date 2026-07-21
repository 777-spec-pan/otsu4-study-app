const CACHE='otsu4-master-v4-20260721';
const ASSETS=['./','./index.html','./questions.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{let x=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',x));return r}).catch(()=>caches.match('./index.html')));return}e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(e.request.method==='GET'&&r.ok){let x=r.clone();caches.open(CACHE).then(c=>c.put(e.request,x))}return r}).catch(()=>caches.match(e.request)))});
