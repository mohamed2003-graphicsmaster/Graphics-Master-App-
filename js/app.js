/* GRAPHICS MASTER — Android app (PWA) */
(function(){
const G=window.GM, C=G.CONFIG;
let lang=(function(){try{return localStorage.getItem("gm_app_lang")||"ar"}catch(e){return "ar"}})();
const T=()=>G.I18N[lang];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const L={
 ar:{home:"الرئيسية",services:"الخدمات",works:"الأعمال",order:"اطلب",about:"نحن",
  orderNow:"اطلب تصميمك الآن",seeWorks:"أعمالنا",allWorks:"كل الأعمال",allSvc:"كل الخدمات",featured:"أعمال مميزة",svcs:"خدماتنا",
  install:"تثبيت",how:"طريقة الطلب",why:"لماذا GRAPHICS MASTER؟",time:"المدة",from:"السعر الابتدائي",byOrder:"حسب الطلب",
  uses:"الاستخدامات",gets:"ما ستحصل عليه",files:"الملفات (حسب الاتفاق)",orderSvc:"اطلب الخدمة",
  skills:"مهارات المصمم",chat:"واتساب",fb:"صفحتنا على فيسبوك",back:"إغلاق",prev:"السابق",next:"التالي",
  sent:"تم تجهيز طلبك — هيفتح الواتساب",hello:"أهلاً بيك 👋",none:"لا توجد أعمال في هذا القسم بعد",
  helpInstall:"لتثبيت التطبيق: من قائمة المتصفح (⋮) اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».",
  aboutT:"من نحن",orderT:"اطلب تصميمك",worksT:"معرض الأعمال",svcT:"خدماتنا",homeT:"GRAPHICS MASTER",ctaT:"عندك فكرة؟",ctaP:"ابعتلنا طلبك على الواتساب ونحوّلها لتصميم مميز."},
 en:{home:"Home",services:"Services",works:"Works",order:"Order",about:"About",
  orderNow:"Order your design",seeWorks:"Our work",allWorks:"All work",allSvc:"All services",featured:"Featured work",svcs:"Our services",
  install:"Install",how:"How to order",why:"Why GRAPHICS MASTER?",time:"Time",from:"Starting price",byOrder:"By order",
  uses:"Suitable uses",gets:"What you get",files:"Files (as agreed)",orderSvc:"Order this service",
  skills:"Design skills",chat:"WhatsApp",fb:"Our Facebook page",back:"Close",prev:"Prev",next:"Next",
  sent:"Your order is ready — opening WhatsApp",hello:"Welcome 👋",none:"No work in this category yet",
  helpInstall:"To install: browser menu (⋮) → “Install app” or “Add to Home screen”.",
  aboutT:"About",orderT:"Order a design",worksT:"Portfolio",svcT:"Services",homeT:"GRAPHICS MASTER",ctaT:"Got an idea?",ctaP:"Send your request on WhatsApp and we'll turn it into a great design."}
};
const l=()=>L[lang];
const IC={
 home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
 services:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
 works:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/>',
 order:'<path d="M12 5v14M5 12h14"/>',
 about:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'
};
const WA='<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.4-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.3 2.5 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.5z"/></svg>';
const svcById=id=>G.SERVICES.find(s=>s.id===id);
const catName=id=>(G.CATS.find(c=>c.id===id)||{})[lang]||id;
const workOf=cat=>G.WORKS.find(w=>w.cat===cat);
const wa=t=>"https://wa.me/"+C.whatsapp+"?text="+encodeURIComponent(t);
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("show"),2600)}

/* ---------- screens ---------- */
const S={
home(){
  const t=T(),x=l(),feat=G.WORKS.filter(w=>w.feat);
  return `<div class="scr">
  <div class="hero"><div><span class="eyebrow">GRAPHIC DESIGN</span><h1>${t.hero.title}</h1><p>${t.hero.text}</p>
    <div class="btns"><a class="btn g sm" href="#/order">${x.orderNow}</a><a class="btn sm" href="#/works">${x.seeWorks}</a></div><div class="tag">✦ ${t.tagline}</div></div>
    <div class="me"><img src="assets/mohamed2.jpg" alt="Mohamed Essam"></div></div>
  <div class="sec"><div class="sec-h"><h2>${x.svcs}</h2><a href="#/services">${x.allSvc}</a></div>
    <div class="hs">${G.SERVICES.map(s=>`<a class="svc-chip" href="#/order?s=${s.id}"><div class="ic">${s.icon}</div>${s[lang].name.replace(/^تصميم /,"").replace(/ Design$/,"")}</a>`).join("")}</div></div>
  <div class="sec"><div class="sec-h"><h2>${x.featured}</h2><a href="#/works">${x.allWorks}</a></div>
    <div class="hs">${feat.map(w=>`<div class="wk" data-open="${G.WORKS.indexOf(w)}" data-list="feat"><img src="${w.thumb}" alt="" loading="lazy"><div><b>${w[lang].t}</b><small>${catName(w.cat)}</small></div></div>`).join("")}</div></div>
  <div class="sec"><div class="sec-h"><h2>${x.why}</h2></div><div class="why">${t.why.map((w,i)=>`<div><span class="n">0${i+1}</span>${w}</div>`).join("")}</div></div>
  <div class="sec"><div class="sec-h"><h2>${x.how}</h2></div><div class="steps">${t.steps.map((s,i)=>`<div class="stp"><span class="dot">${i+1}</span><div><b>${s[0]}</b><span>${s[1]}</span></div></div>`).join("")}</div></div>
  <div class="sec cta"><h2>${x.ctaT}</h2><p>${x.ctaP}</p><a class="btn g block" href="#/order">${x.orderNow}</a></div></div>`;
},
services(){
  const x=l();
  return `<div class="scr">${G.SERVICES.map(s=>{const d=s[lang],w=workOf(s.cat),price=s.price!=null?s.price+" "+C.currency[lang]:x.byOrder;
   return `<div class="card sv" data-sv><div class="sv-h"><div class="th">${w?`<img src="${w.thumb}" alt="" loading="lazy">`:s.icon}</div><div><b>${d.name}</b><small>${s.time[lang]}</small></div><span class="chev">⌄</span></div>
   <div class="sv-b"><p class="muted">${d.desc}</p><div class="meta"><span>⏱ ${x.time}: ${s.time[lang]}</span><span>${x.from}: ${price}</span></div>
   <h4>${x.uses}</h4><ul>${d.uses.map(u=>`<li>${u}</li>`).join("")}</ul><h4>${x.gets}</h4><ul>${d.gets.map(u=>`<li>${u}</li>`).join("")}</ul><h4>${x.files}</h4><p class="muted">${d.files.join(" · ")}</p>
   <a class="btn g block" style="margin-top:14px" href="#/order?s=${s.id}">${x.orderSvc}</a></div></div>`}).join("")}</div>`;
},
works(q){
  const x=l(),f=q.c||"all",cats=G.CATS.filter(c=>G.WORKS.some(w=>w.cat===c.id));
  const list=G.WORKS.map((w,i)=>[w,i]).filter(([w])=>f==="all"||w.cat===f);
  return `<div class="scr"><div class="chips"><button class="chip ${f==="all"?"on":""}" data-c="all">${T().all}</button>${cats.map(c=>`<button class="chip ${f===c.id?"on":""}" data-c="${c.id}">${c[lang]}</button>`).join("")}</div>
  ${list.length?`<div class="grid">${list.map(([w,i])=>`<div class="wk" data-open="${i}" data-list="${f}"><img src="${w.thumb}" alt="" loading="lazy"><div><b>${w[lang].t}</b><small>${catName(w.cat)}</small></div></div>`).join("")}</div>`:`<p class="muted">${x.none}</p>`}</div>`;
},
order(q){
  const f=T().f,x=l();
  return `<div class="scr"><p class="muted" style="margin-bottom:16px">${T().orderSub}</p><form id="of" novalidate>
   <div class="fld"><label>${f.name} *</label><input name="name" autocomplete="name"></div>
   <div class="fld"><label>${f.phone} *</label><input name="phone" type="tel" inputmode="tel" autocomplete="tel"></div>
   <div class="fld"><label>${f.service} *</label><select name="service"><option value="">${f.choose}</option>${G.SERVICES.map(s=>`<option value="${s.id}" ${q.s===s.id?"selected":""}>${s[lang].name}</option>`).join("")}</select></div>
   <div class="fld"><label>${f.details} *</label><textarea name="details" placeholder="${f.detailsPh}"></textarea></div>
   <div class="fld"><label>${f.deadline}</label><input name="deadline" type="date"></div>
   <div class="fld"><label>${f.refs}</label><input name="refs" inputmode="url"></div>
   <button class="btn wa block" type="submit">${WA.replace("<svg","<svg width='22' height='22' style='fill:#fff'")} ${f.send} — ${x.chat}</button></form></div>`;
},
about(){
  const t=T(),x=l();
  return `<div class="scr"><div class="prof"><div class="me"><img src="assets/mohamed2.jpg" alt=""></div><div class="nm">MOHAMED ESSAM</div><div class="rl">GRAPHIC DESIGNER</div></div>
  <div class="card" style="padding:18px;margin-top:18px">${t.aboutText.map(p=>`<p class="muted" style="margin-bottom:10px">${p}</p>`).join("")}</div>
  <div class="sec"><div class="sec-h"><h2>${x.skills}</h2></div>${[["Canva",90],["Picsart",80],["Photoshop",60]].map(([n,v])=>`<div class="skill"><div class="t"><b>${n}</b><span>${v}%</span></div><div class="bar2"><i data-w="${v}"></i></div></div>`).join("")}</div>
  <div class="sec contacts"><a class="btn wa block" href="${wa("")}" target="_blank" rel="noopener">${x.chat}: ${C.whatsappShow||C.whatsapp}</a>
   ${C.socials.facebook?`<a class="btn block" href="${C.socials.facebook}" target="_blank" rel="noopener">${x.fb}</a>`:""}
   <div class="card" style="padding:14px;font-size:.84rem;color:var(--g1)" id="instHelp">${x.helpInstall}</div></div>
  <img class="logo-big" src="assets/gm-logo.png" alt="GRAPHICS MASTER"></div>`;
}};

/* ---------- router / shell ---------- */
const TABS=["home","services","works","order","about"];
function parse(){const h=location.hash.replace(/^#\/?/,"")||"home";const [r,qs]=h.split("?");const q=Object.fromEntries(new URLSearchParams(qs||""));return [S[r]?r:"home",q];}
function shell(r){
  const x=l(),titles={home:x.homeT,services:x.svcT,works:x.worksT,order:x.orderT,about:x.aboutT};
  return `<header class="bar">${r==="home"?`<div class="brand"><img src="assets/gm-mark.png" alt=""><b>GRAPHICS <span>MASTER</span></b></div>`:`<div class="ttl">${titles[r]}</div>`}
    <div class="acts"><button class="ibtn in ${deferred?"show":""}" id="inst">⬇ ${x.install}</button><button class="ibtn" id="lang">${lang==="ar"?"EN":"عربي"}</button></div></header>
  <main id="screen"></main>
  ${(r==="order"||r==="about")?"":`<a class="fab" href="${wa("")}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA}</a>`}
  <nav class="tabs">${TABS.map(k=>`<button class="tab ${k==="order"?"ord":""} ${k===r?"on":""}" data-t="${k}">${k==="order"?`<span class="pill"><svg viewBox="0 0 24 24">${IC[k]}</svg></span>`:`<svg viewBox="0 0 24 24">${IC[k]}</svg>`}<span>${x[k]}</span></button>`).join("")}</nav>`;
}
let curR=null, deferred=null, vw={list:[],i:0};
function render(){
  const [r,q]=parse(); document.documentElement.lang=lang; document.documentElement.dir=T().dir;
  if(curR!==r+lang||!$("#screen")){ $("#app").innerHTML=shell(r); curR=r+lang; bindShell(); }
  else { $$(".tab").forEach(b=>b.classList.toggle("on",b.dataset.t===r)); }
  const sc=$("#screen"); sc.innerHTML=S[r](q); sc.scrollTop=0; bindScreen(r,q);
}
function bindShell(){
  $$(".tab").forEach(b=>b.onclick=()=>{location.hash="#/"+b.dataset.t});
  $("#lang").onclick=()=>{lang=lang==="ar"?"en":"ar";try{localStorage.setItem("gm_app_lang",lang)}catch(e){};curR=null;render()};
  $("#inst").onclick=async()=>{if(!deferred)return;deferred.prompt();await deferred.userChoice;deferred=null;$("#inst").classList.remove("show")};
}
function bindScreen(r,q){
  $$("[data-sv] .sv-h").forEach(h=>h.onclick=()=>h.parentElement.classList.toggle("open"));
  $$(".chip").forEach(c=>c.onclick=()=>{location.hash="#/works?c="+c.dataset.c});
  $$("[data-open]").forEach(el=>el.onclick=()=>{
    const f=el.dataset.list; const idx=G.WORKS.map((w,i)=>i).filter(i=>f==="feat"?G.WORKS[i].feat:(f==="all"||G.WORKS[i].cat===f));
    vw.list=idx; vw.i=Math.max(0,idx.indexOf(+el.dataset.open)); openViewer();
  });
  if(r==="about") setTimeout(()=>$$(".bar2 i").forEach(i=>i.style.width=i.dataset.w+"%"),150);
  const of=$("#of"); if(of) of.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(of)),f=T().f;
    $$("#of .err").forEach(n=>n.classList.remove("err"));
    const miss=["name","phone","service","details"].filter(k=>!d[k]); miss.forEach(k=>$(`[name=${k}]`,of).classList.add("err"));
    if(miss.length){toast(f.req);return;}
    const sv=svcById(d.service)[lang].name;
    const txt=`GRAPHICS MASTER — ${T().orderTitle}\n${f.name}: ${d.name}\n${f.phone}: ${d.phone}\n${f.service}: ${sv}\n${f.deadline}: ${d.deadline||"-"}\n${f.details}: ${d.details}\n${f.refs}: ${d.refs||"-"}`;
    toast(l().sent); setTimeout(()=>{window.open(wa(txt),"_blank")||(location.href=wa(txt))},500); of.reset();};
}

/* ---------- viewer ---------- */
function viewer(){
  const v=document.createElement("div"); v.id="viewer";
  v.innerHTML=`<div class="vw-top"><button class="ibtn" id="vc">✕ ${l().back}</button><span class="muted" id="vn"></span></div><div class="vw-img" id="vi"></div><div class="vw-info"><h3 id="vt"></h3><p id="vd"></p><div class="vw-nav"><button class="btn sm" id="vp">‹</button><a class="btn g sm" id="vo" href="#/order">${l().orderSvc}</a><button class="btn sm" id="vx">›</button></div></div>`;
  document.body.appendChild(v);
  $("#vc").onclick=closeViewer; $("#vp").onclick=()=>step(-1); $("#vx").onclick=()=>step(1);
  $("#vo").onclick=()=>closeViewer();
  let sx=0; v.addEventListener("touchstart",e=>{sx=e.touches[0].clientX},{passive:true});
  v.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>60) step(dx<0?1:-1)});
  document.addEventListener("keydown",e=>{if(!v.classList.contains("open"))return; if(e.key==="Escape")closeViewer(); if(e.key==="ArrowRight")step(1); if(e.key==="ArrowLeft")step(-1)});
}
function openViewer(){
  const v=$("#viewer"); const w=G.WORKS[vw.list[vw.i]];
  $("#vi").innerHTML=`<img src="${w.img}" alt="${w[lang].t}">`; $("#vt").textContent=w[lang].t; $("#vd").textContent=w[lang].d;
  $("#vn").textContent=(vw.i+1)+" / "+vw.list.length; const s=G.SERVICES.find(s=>s.cat===w.cat); $("#vo").href="#/order?s="+(s?s.id:"");
  $("#vc").innerHTML="✕ "+l().back; $("#vo").textContent=l().orderSvc; v.classList.add("open");
}
function closeViewer(){$("#viewer").classList.remove("open")}
function step(d){vw.i=(vw.i+d+vw.list.length)%vw.list.length;openViewer()}

/* ---------- boot ---------- */
window.addEventListener("hashchange",()=>{closeViewer();render()});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;const b=$("#inst");if(b)b.classList.add("show")});
window.addEventListener("appinstalled",()=>{deferred=null;const b=$("#inst");if(b)b.classList.remove("show")});
viewer(); render();
setTimeout(()=>$("#splash").classList.add("off"),1100);
if("serviceWorker" in navigator && location.protocol.startsWith("http")){ navigator.serviceWorker.register("sw.js").catch(()=>{}); }
})();
