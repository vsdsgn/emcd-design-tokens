// Доска «Миграция компонентов» (страница «🧭 Миграция компонентов»). Аргументы: ROWS [№, набор, статус, legacy, пары сверки, системные Δ, докрутить, уровень], HEAD, GROUP. Картинки — клоны ячеек доски «Сверка · все компоненты».
const PAGE='🧭 Миграция компонентов';
let page=figma.root.children.find(p=>p.name===PAGE); if(!page){ page=figma.createPage(); page.name=PAGE; }
const cmpPage=await figma.getNodeByIdAsync('172791:158'); await cmpPage.loadAsync();
await figma.setCurrentPageAsync(page);
for(const s of ['Regular','Medium','Bold']) await figma.loadFontAsync({family:'Inter',style:s});
const tl=await figma.teamLibrary.getVariablesInLibraryCollectionAsync('663c113f032f46cf39f7641bd6a67133805a2142');
const key={}; for(const v of tl) if(v.resolvedType==='COLOR') key[v.name]=v.key;
const V={}; async function tv(n){ if(!V[n]) V[n]=await figma.variables.importVariableByKeyAsync(key[n]); return V[n]; }
const theme=await figma.variables.getVariableCollectionByIdAsync((await tv('text/primary')).variableCollectionId);
const DARK=theme.modes.find(m=>m.name==='Dark').modeId;
async function bfill(n,name,kind='fills'){ const v=await tv(name); n[kind]=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:.5,g:.5,b:.5}},'color',v)]; }
async function txt(s,size,style,color,w){ const t=figma.createText(); t.fontName={family:'Inter',style}; t.characters=String(s); t.fontSize=size; t.lineHeight={unit:'PIXELS',value:Math.round(size*1.45)}; await bfill(t,color); if(w){ t.textAutoResize='HEIGHT'; t.resize(w,t.height);} return t; }
function al(dir,gap,name){ const f=figma.createAutoLayout(dir==='H'?'HORIZONTAL':'VERTICAL'); f.itemSpacing=gap; f.fills=[]; if(name) f.name=name; return f; }
let board=page.children.find(n=>n.name==='Миграция компонентов · legacy → DS 2.0');
if(!board){ board=al('V',24,'Миграция компонентов · legacy → DS 2.0'); page.appendChild(board); board.paddingTop=board.paddingBottom=board.paddingLeft=board.paddingRight=48; board.setExplicitVariableModeForCollection(theme,DARK); await bfill(board,'surface/level-0'); }
if(HEAD){ const h=al('V',8,'header'); board.appendChild(h); h.appendChild(await txt('Миграция компонентов: legacy → DS 2.0',40,'Bold','text/primary')); for(const s of HEAD) h.appendChild(await txt(s,16,'Regular','text/secondary',1700)); }
const cmp=await figma.getNodeByIdAsync('172791:159'); const byN={}; for(const r of cmp.children){ const m=r.name.match(/^№ (\d+) ·/); if(m) byN[+m[1]]=r; }
const W={n:48,name:280,cell:290,sys:330,todo:360};
if(GROUP){ const gh=await txt(GROUP,24,'Bold','text/primary'); board.appendChild(gh);
 const th=al('H',16,'шапка'); th.paddingLeft=th.paddingRight=12; for(const [t,w] of [['№',W.n],['Набор DS 2.0 · статус · legacy',W.name],['Production (legacy)',W.cell],['DS 2.0 (Base · Dark)',W.cell],['Отличия от оригинала — системные, по решениям',W.sys],['Докрутить',W.todo]]) th.appendChild(await txt(t,11,'Medium','text/tertiary',w)); board.appendChild(th); }
async function mini(cellName,nums){ const col=al('V',8,cellName); col.resize(W.cell,10); col.primaryAxisSizingMode='AUTO'; col.counterAxisSizingMode='FIXED';
 for(const n of nums){ const r=byN[n]; const c=r&&r.children.find(x=>x.name===cellName); if(!c) continue; const k=c.clone(); col.appendChild(k); k.rescale(W.cell/k.width); }
 return col; }
for(const [n,name,st,leg,pairs,sys,todo,lvl] of ROWS){
 const row=al('H',16,'№ '+n+' · '+name); row.paddingTop=row.paddingBottom=10; row.paddingLeft=row.paddingRight=12; row.cornerRadius=10; row.counterAxisAlignItems='MIN'; await bfill(row,'surface/level-1');
 const flag=!!todo; if(flag){ await bfill(row,'status/warning/solid','strokes'); row.strokeWeight=1; }
 row.appendChild(await txt(String(n).padStart(2,'0'),16,'Bold',flag?'text/warning':'text/accent',W.n));
 const c1=al('V',4,'name'); c1.appendChild(await txt(name,16,'Bold','text/primary',W.name)); c1.appendChild(await txt([st,lvl].filter(Boolean).join(' · ')+(pairs.length?' · сверка № '+pairs.join(', '):''),12,'Medium',st==='draft'?'text/warning':'text/secondary',W.name)); c1.appendChild(await txt('legacy: '+leg,12,'Regular','text/tertiary',W.name)); row.appendChild(c1);
 if(pairs.length){ row.appendChild(await mini('production',pairs)); row.appendChild(await mini('DS 2.0',pairs)); }
 else { row.appendChild(await txt('— пары в production нет',12,'Regular','text/tertiary',W.cell)); row.appendChild(await txt('',12,'Regular','text/tertiary',W.cell)); }
 row.appendChild(await txt(sys,13,'Regular','text/secondary',W.sys));
 row.appendChild(await txt(todo||'—',13,flag?'Medium':'Regular',flag?'text/warning':'text/tertiary',W.todo));
 board.appendChild(row); }
return {board:board.id,page:page.id,n:board.children.length};
