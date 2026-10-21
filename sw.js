const V = "gm-app-v1";
const SHELL = ["./","index.html","css/app.css","js/app.js","js/data.js","manifest.webmanifest",
  "assets/gm-mark.png","assets/gm-logo.png","assets/mohamed2.jpg",
  "icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET") return;
  const u=new URL(r.url);
  // الخطوط وغيرها من الخارج: الشبكة أولًا ثم الكاش
  if(u.origin!==location.origin){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r)));
    return;
  }
  // ملفات التطبيق: الكاش أولًا ثم الشبكة (ويتخزن الجديد)
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{
    if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));}
    return res;
  }).catch(()=>caches.match("index.html"))));
});
