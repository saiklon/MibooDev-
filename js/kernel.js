(() => {
"use strict";
const $=s=>document.querySelector(s),content=$("#screen-content"),statusTitle=$("#status-title"),footer=$("#screen-footer");
const state={screen:"home",index:0,playing:false,track:0,volume:65,history:[]};
const apps=[{name:"Música",icon:"♫",id:"music"},{name:"Fotos",icon:"▧",id:"photos"},{name:"Juegos",icon:"◆",id:"games"},{name:"Notas",icon:"▤",id:"notes"},{name:"Ajustes",icon:"⚙",id:"settings"},{name:"Acerca de",icon:"ⓘ",id:"about"}];
const tracks=[{title:"Midnight Drive",artist:"NANO LAB",album:"Prototype Sessions"},{title:"Silver Lines",artist:"NANO LAB",album:"Prototype Sessions"},{title:"Analog Dreams",artist:"NANO LAB",album:"Prototype Sessions"}];
const views={
home:{title:"iPod",items:apps.map(a=>({label:a.name,icon:a.icon,id:a.id}))},
music:{title:"Música",items:[{label:"Ahora suena",icon:"♫",id:"now"},{label:"Todas las canciones",icon:"≡",id:"songs"},{label:"Álbumes",icon:"▣",id:"albums"},{label:"Artistas",icon:"♙",id:"artists"},{label:"Listas",icon:"☷",id:"playlists"}]},
photos:{title:"Fotos",items:[{label:"Biblioteca",icon:"▧",id:"photo-library"},{label:"Presentación",icon:"▷",id:"slideshow"}]},
games:{title:"Juegos",items:[{label:"Brick",icon:"▦",id:"brick"},{label:"Music Quiz",icon:"♫",id:"quiz"},{label:"Solitaire",icon:"♠",id:"solitaire"}]},
notes:{title:"Notas",items:[{label:"Notas de NANO LAB",icon:"▤",id:"note"}]},
settings:{title:"Ajustes",items:[{label:"Volumen",icon:"◖",id:"volume"},{label:"Información",icon:"ⓘ",id:"device-info"},{label:"Tema",icon:"◐",id:"theme"}]},
about:{title:"Acerca de",items:[{label:"NANO OS v0.1.0",icon:"ⓘ",id:"version"},{label:"Hardware objetivo",icon:"▣",id:"hardware"}]}
};
function render(){
const view=views[state.screen]||views.home;statusTitle.textContent=view.title;footer.textContent=state.screen==="home"?"SELECT":"MENU";
if(state.screen==="now"){renderNow();return;}
if(["songs","albums","artists","playlists"].includes(state.screen)){renderList(view.title,state.screen==="songs"?tracks.map((t,i)=>({label:t.title,icon:"♫",id:"track-"+i})): [{label:"Prototype Sessions",icon:"▣",id:"track-0"}]);return;}
if(state.screen==="volume"){content.innerHTML='<div class="screen-title">Volumen</div><div class="info-view"><div class="info-card">Nivel: <b>'+state.volume+'%</b></div><div class="progress"><i style="width:'+state.volume+'%"></i></div><p>Usa ◀ y ▶ para ajustar.</p></div>';return;}
if(["device-info","version","hardware"].includes(state.screen)){content.innerHTML='<div class="screen-title">Información</div><div class="info-view"><div class="info-card"><b>NANO OS</b><br>Versión 0.1.0<br>Prototipo web</div><div class="info-card">Objetivo: iPod nano 3G<br>Modelo A1236 · 4 GB<br>Firmware original: 1.1.3</div><small>Simulación independiente. No conectado al hardware.</small></div>';return;}
if(state.screen==="theme"){content.innerHTML='<div class="screen-title">Tema</div><div class="info-view"><div class="info-card">Apple Classic Evolution<br><small>Gris aluminio · interfaz clara</small></div></div>';return;}
if(["photo-library","slideshow","note","brick","quiz","solitaire"].includes(state.screen)){const msg={"photo-library":"La galería estará disponible en una siguiente versión.","slideshow":"Presentación de fotografías: módulo en desarrollo.","note":"NANO LAB<br><br>Un pequeño dispositivo.<br>Una gran aventura tecnológica.","brick":"Brick: módulo de juego en desarrollo.","quiz":"Music Quiz: módulo de juego en desarrollo.","solitaire":"Solitaire: módulo de juego en desarrollo."};content.innerHTML='<div class="screen-title">'+view.title+'</div><div class="info-view"><div class="info-card">'+msg[state.screen]+'</div></div>';return;}
renderList(view.title,view.items);
}
function renderList(title,items){state.index=Math.max(0,Math.min(state.index,items.length-1));content.innerHTML='<div class="menu-list">'+items.map((it,i)=>'<div class="menu-row '+(i===state.index?'selected':'')+'"><span class="menu-icon">'+it.icon+'</span><span>'+it.label+'</span><span class="menu-arrow">›</span></div>').join('')+'</div>';}
function renderNow(){const t=tracks[state.track];content.innerHTML='<div class="now-playing"><div class="album-art">♫</div><div class="track-meta"><strong>'+t.title+'</strong><span>'+t.artist+'</span><span>'+t.album+'</span><div class="progress"><i style="width:'+(state.playing?38:0)+'%"></i></div><span>'+(state.playing?'▶ Reproduciendo':'Ⅱ En pausa')+'</span></div></div>';}
function enter(){const item=(views[state.screen]||views.home).items?.[state.index];if(!item)return;if(item.id.startsWith("track-")){state.track=Number(item.id.split("-")[1]);state.screen="now";state.index=0;}else if(item.id==="now"){state.screen="now";}else if(views[item.id]){state.history.push(state.screen);state.screen=item.id;state.index=0;}else{state.screen=item.id;state.index=0;}render();}
function back(){if(state.screen==="home")return;if(state.screen==="now"){state.screen="music";state.index=0;}else{state.screen=state.history.pop()||"home";state.index=0;}render();}
function move(d){if(state.screen==="volume"){state.volume=Math.max(0,Math.min(100,state.volume+d*5));render();return;}if(state.screen==="now"){state.track=(state.track+d+tracks.length)%tracks.length;render();return;}const items=(views[state.screen]||views.home).items||[];state.index=(state.index+d+items.length)%items.length;render();}
function action(a){if(a==="menu")back();if(a==="select")enter();if(a==="prev")move(-1);if(a==="next")move(1);if(a==="play"){state.playing=!state.playing;if(state.screen!=="now")state.screen="now";render();}}
document.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",()=>action(b.dataset.action)));
document.addEventListener("keydown",e=>{if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter","Escape"," ","m","M"].includes(e.key))e.preventDefault();if(e.key==="ArrowUp")move(-1);if(e.key==="ArrowDown")move(1);if(e.key==="ArrowLeft")action("prev");if(e.key==="ArrowRight")action("next");if(e.key==="Enter")action("select");if(e.key==="Escape"||e.key==="m"||e.key==="M")action("menu");if(e.key===" ")action("play");});
const wheel=$("#wheel");let lastAngle=null,accumulator=0;
wheel.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;wheel.setPointerCapture(e.pointerId);const r=wheel.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);lastAngle=Math.atan2(dy,dx);accumulator=0;});
wheel.addEventListener("pointermove",e=>{if(lastAngle===null)return;const r=wheel.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),angle=Math.atan2(dy,dx);let diff=angle-lastAngle;if(diff>Math.PI)diff-=Math.PI*2;if(diff< -Math.PI)diff+=Math.PI*2;accumulator+=diff;lastAngle=angle;if(Math.abs(accumulator)>.42){move(accumulator>0?1:-1);accumulator=0;}});
wheel.addEventListener("pointerup",()=>lastAngle=null);wheel.addEventListener("pointercancel",()=>lastAngle=null);
function tick(){const d=new Date();$("#clock").textContent=d.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});$("#battery").textContent="▰▰▰";}tick();setInterval(tick,15000);render();
})();