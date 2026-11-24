// Доска «Миграция токенов» (Web Migration test, страница «🧭 Миграция токенов»). Аргументы: ROWS (из build/migration-color.json, см. docs/PLAN-migration.md), FIRST, HEAD.
// ROWS, FIRST (bool), TITLE
const PAGE='🧭 Миграция токенов';
let page=figma.root.children.find(p=>p.name===PAGE); if(!page){ page=figma.createPage(); page.name=PAGE; }
await figma.setCurrentPageAsync(page);
for(const s of ['Regular','Medium','Bold']) await figma.loadFontAsync({family:'Inter',style:s});
const tl=await figma.teamLibrary.getVariablesInLibraryCollectionAsync('663c113f032f46cf39f7641bd6a67133805a2142');
const key={}; for(const v of tl) if(v.resolvedType==='COLOR') key[v.name]=v.key;
const V={}; async function tv(n){ if(!key[n]) return null; if(!V[n]) V[n]=await figma.variables.importVariableByKeyAsync(key[n]); return V[n]; }
const theme=await figma.variables.getVariableCollectionByIdAsync((await tv('text/primary')).variableCollectionId);
const DARK=theme.modes.find(m=>m.name==='Dark').modeId, LIGHT=theme.modes.find(m=>m.name==='Light').modeId;
async function bfill(n,name,kind='fills'){ const v=await tv(name); const p=figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:.5,g:.5,b:.5}},'color',v); n[kind]=[p]; }
function hexPaint(h){ h=h.replace('#',''); const c={r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255}; const a=h.length===8?parseInt(h.slice(6,8),16)/255:1; return {type:'SOLID',color:c,opacity:a}; }
async function txt(s,size,style,color,w){ const t=figma.createText(); t.fontName={family:'Inter',style}; t.characters=String(s); t.fontSize=size; t.lineHeight={unit:'PIXELS',value:Math.round(size*1.4)}; await bfill(t,color); if(w){ t.textAutoResize='HEIGHT'; t.resize(w,t.height);} return t; }
function al(dir,gap,name){ const f=figma.createAutoLayout(dir==='H'?'HORIZONTAL':'VERTICAL'); f.itemSpacing=gap; f.fills=[]; if(name) f.name=name; return f; }
let board=page.children.find(n=>n.name==='Миграция токенов · legacy → DS 2.0');
if(!board){ board=al('V',24,'Миграция токенов · legacy → DS 2.0'); page.appendChild(board); board.x=0; board.y=0; board.paddingTop=board.paddingBottom=48; board.paddingLeft=board.paddingRight=48; board.setExplicitVariableModeForCollection(theme,DARK); await bfill(board,'surface/level-0'); }
if(FIRST){ const h=al('V',8,'header'); board.appendChild(h);
 h.appendChild(await txt('Миграция токенов: legacy → DS 2.0',40,'Bold','text/primary'));
 h.appendChild(await txt(HEAD,16,'Regular','text/secondary',1600)); }
const W={n:48,legacy:300,before:170,arrow:24,target:250,after:170,dE:70,st:190,use:90,note:420};
async function swatchPair(dark,light,isVar){ const box=al('H',8,'swatches'); box.counterAxisAlignItems='CENTER';
 for(const [mode,val,lab] of [[DARK,dark,'D'],[LIGHT,light,'L']]){ const c=al('V',4,lab); c.counterAxisAlignItems='CENTER'; c.setExplicitVariableModeForCollection(theme,mode);
  const bg=figma.createFrame(); bg.resize(56,32); bg.cornerRadius=6; await bfill(bg,'surface/level-0'); bg.strokes=[]; await bfill(bg,'border/default','strokes'); bg.strokeWeight=1; bg.name='L0';
  const sw=figma.createRectangle(); sw.resize(40,20); sw.cornerRadius=4; sw.x=8; sw.y=6; bg.appendChild(sw);
  if(isVar&&val){ const v=await tv(val); if(v){ sw.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:.5,g:.5,b:.5}},'color',v)]; } else sw.fills=[]; }
  else if(val){ sw.fills=[hexPaint(val)]; } else { sw.fills=[]; }
  c.appendChild(bg); c.appendChild(await txt(isVar?(lab==='D'?'Dark':'Light'):(val||'—'),10,'Regular','text/tertiary')); box.appendChild(c); }
 return box; }
const colTitles=[['№','n'],['Legacy-токен · роль','legacy'],['Было (Dark · Light)','before'],['','arrow'],['Токен DS 2.0','target'],['Стало (живая переменная)','after'],['ΔE (D)','dE'],['Действие · статус','st'],['Мест','use'],['Решение · заметка','note']];
const groups={}; for(const r of ROWS){ (groups[r[1]]=groups[r[1]]||[]).push(r); }
for(const [src,rows] of Object.entries(groups)){
 const g=al('V',4,'группа · '+src); board.appendChild(g);
 const gh=await txt(src+' · '+rows.length+' токенов'+(rows.filter(r=>r[16]).length?' · докрутить '+rows.filter(r=>r[16]).length:''),22,'Bold','text/primary'); g.appendChild(gh);
 const th=al('H',16,'шапка'); th.paddingLeft=th.paddingRight=12; for(const [t,k] of colTitles){ const x=await txt(t,11,'Medium','text/tertiary',W[k]); th.appendChild(x);} g.appendChild(th);
 for(const r of rows){ const [n,s,leg,role,bL,bD,tgt,aL,aD,dEd,dEl,act,st,dec,use,note,flag]=r;
  const row=al('H',16,'№ '+n+' · '+leg); row.paddingTop=row.paddingBottom=8; row.paddingLeft=row.paddingRight=12; row.cornerRadius=8; row.counterAxisAlignItems='CENTER'; await bfill(row,'surface/level-1');
  if(flag){ await bfill(row,'status/warning/solid','strokes'); row.strokeWeight=1; }
  row.appendChild(await txt(String(n).padStart(3,'0'),14,'Bold',flag?'text/warning':'text/accent',W.n));
  const lc=al('V',2,'legacy'); lc.appendChild(await txt(leg,14,'Medium','text/primary',W.legacy)); if(role) lc.appendChild(await txt(role,12,'Regular','text/secondary',W.legacy)); row.appendChild(lc);
  const b=await swatchPair(bD,bL,false); row.appendChild(b); b.resize(W.before,b.height); b.layoutSizingHorizontal='FIXED';
  row.appendChild(await txt('→',16,'Regular','text/tertiary',W.arrow));
  row.appendChild(await txt(tgt||'— (удаляется)',14,'Medium',tgt?'text/primary':'text/tertiary',W.target));
  const a=await swatchPair(tgt?tgt:'',tgt?tgt:'',true); row.appendChild(a); a.resize(W.after,a.height); a.layoutSizingHorizontal='FIXED';
  row.appendChild(await txt(dEd===''||dEd===null?'—':String(dEd),13,'Medium',(typeof dEd==='number'&&dEd>8)?'text/warning':'text/secondary',W.dE));
  const sc=al('V',2,'статус'); sc.appendChild(await txt(act,13,'Medium','text/primary',W.st)); sc.appendChild(await txt(st,12,'Regular',flag?'text/warning':(st==='='||st==='≈'?'text/success':'text/secondary'),W.st)); row.appendChild(sc);
  row.appendChild(await txt(use?use.toLocaleString('ru-RU'):'0',13,'Regular','text/secondary',W.use));
  row.appendChild(await txt([dec,note].filter(Boolean).join(' · ')||'—',12,'Regular','text/secondary',W.note));
  g.appendChild(row); }
}
return {board:board.id,page:page.id,children:board.children.length};
