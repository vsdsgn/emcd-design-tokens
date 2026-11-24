// Привязка «сырых» hex (без переменной) к токенам DS 2.0 — только точные совпадения с legacy-палитрой (тёмная тема).
// ARGS: {src:<id фрейма>}. Текст → text/*, иконки (вектор в слое ic-/icon) → icon/*, фон фрейма / прямоугольника → уровни, обводки → border/*.
// Не трогает: векторы вне иконок (иллюстрации, монеты, логотипы), полупрозрачные заливки, статусные заливки.
const TEXT={'#fafafa':'primary','#ffffff':'primary','#d0d0d0':'secondary','#a3a3a3':'secondary','#7a7a7a':'tertiary','#4d4d4d':'disabled','#8f42ff':'accent','#43a047':'success','#4db051':'success','#e53935':'danger','#f44336':'danger','#f59e0b':'warning'};
const BACK={'#0a0a0a':'surface/level-0','#111111':'surface/level-1','#1a1a1a':'surface/level-2','#232323':'surface/level-3','#2d2d2d':'control/track','#8f42ff':'action/primary/default'};
const STROKE={'#1a1a1a':'border/subtle','#232323':'border/subtle','#2d2d2d':'border/subtle','#8f42ff':'border/accent'};
const THEME_KEY='663c113f032f46cf39f7641bd6a67133805a2142';
const lib=await figma.teamLibrary.getVariablesInLibraryCollectionAsync(THEME_KEY); const key={}; for(const v of lib) if(v.resolvedType==='COLOR') key[v.name]=v.key;
const V={}; async function tv(n){ if(!key[n]) return null; if(!(n in V)){ V[n]=null; for(let i=0;i<4&&!V[n];i++){ try{ V[n]=await figma.variables.importVariableByKeyAsync(key[n]); }catch(e){} } } return V[n]; }
const hx=c=>'#'+[c.r,c.g,c.b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');
function anc(n,re){ let p=n; for(let i=0;i<6&&p;i++){ if(re.test(p.name)) return true; p=p.parent; } return false; }
const root=await figma.getNodeByIdAsync(ARGS.src); const st={bound:0,skipped:0,byRule:{},missing:{}};
const fonts=new Set(); async function lf(n){ for(const s of n.getStyledTextSegments(['fontName'])){ const k=s.fontName.family+s.fontName.style; if(!fonts.has(k)){ await figma.loadFontAsync(s.fontName); fonts.add(k);} } }
const ids=[root.id,...root.findAll(()=>true).map(n=>n.id)];
for(const id of ids){ const n=await figma.getNodeByIdAsync(id); if(!n) continue;
 for(const prop of ['fills','strokes']){ const ps=n[prop]; if(!Array.isArray(ps)||!ps.length) continue; let ch=false; const out=[];
  for(const p of ps){ if(p.type!=='SOLID'||p.visible===false||(p.boundVariables&&p.boundVariables.color)||(p.opacity??1)<1){ out.push(p); continue; }
   const h=hx(p.color); let t=null;
   const isVec=['VECTOR','BOOLEAN_OPERATION','STAR','POLYGON','LINE','ELLIPSE'].includes(n.type);
   const inIcon=anc(n,/^(ic[-_ ]|icon|ico\b)/i);
   if(prop==='strokes'&&!isVec) t=STROKE[h]||null;
   else if(n.type==='TEXT'&&prop==='fills') t=TEXT[h]?'text/'+TEXT[h]:null;
   else if(isVec&&inIcon) t=TEXT[h]?'icon/'+TEXT[h]:null;
   else if(prop==='fills'&&['FRAME','RECTANGLE','COMPONENT','INSTANCE'].includes(n.type)) t=BACK[h]||null;
   if(!t){ st.skipped++; out.push(p); continue; }
   const v=await tv(t); if(!v){ st.missing[t]=(st.missing[t]||0)+1; out.push(p); continue; }
   out.push(figma.variables.setBoundVariableForPaint({...p,opacity:1},'color',v)); ch=true; st.bound++; const k=h+' '+(n.type==='TEXT'?'текст':isVec?'иконка':prop==='strokes'?'обводка':'фон')+' → '+t; st.byRule[k]=(st.byRule[k]||0)+1; }
  if(ch){ if(n.type==='TEXT') await lf(n); try{ n[prop]=out; }catch(e){ st.err=(st.err||0)+1; } } } }
st.byRule=Object.entries(st.byRule).sort((a,b)=>b[1]-a[1]).slice(0,12); return st;
