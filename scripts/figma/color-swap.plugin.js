// Миграция цветов в Figma: старые переменные (Color, theme, Core Alias, Basic color) → Theme DS 2.0.
// Собирается: python3 scripts/color-swap-build.py --src=<id фрейма> [--dry]  → build/figma/color-swap.js (вставить в use_figma).
// Правила: прямые строки color-map.csv (Keep / Merge / Deprecate с целью); Split — по контексту слоя (имя предка, тип узла, fills/strokes);
// без строки в карте (Basic color Neutral/* и т. п.) — по роли и яркости; текст ↔ иконка; status/*/solid на тексте → text/*.
// Фрейм должен стоять в режимах Theme / Style / Platform / Viewport DS 2.0. Сырые hex не трогает (считает в raw).
const MAP=/*MAP*/{};
const ARGS=/*ARGS*/{};
const SRC=ARGS.src, DRY=!!ARGS.dry;
const THEME_KEY='663c113f032f46cf39f7641bd6a67133805a2142';
const libVars=await figma.teamLibrary.getVariablesInLibraryCollectionAsync(THEME_KEY);
const byName={}; for(const v of libVars) if(v.resolvedType==='COLOR') byName[v.name]=v.key;
const imported={};
async function tv(name){ if(!byName[name]) return null; if(!imported[name]) imported[name]=await figma.variables.importVariableByKeyAsync(byName[name]); return imported[name]; }
const vcache={};
async function legacy(id){ if(id in vcache) return vcache[id]; const v=await figma.variables.getVariableByIdAsync(id); let col=''; if(v){const c=await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId); col=c?c.name:'';} vcache[id]=v?{name:v.name,col,ds2:v.key&&Object.values(byName).includes(v.key)}:null; return vcache[id]; }
function anc(n,re){ let p=n; for(let i=0;i<8&&p;i++){ if(re.test(p.name)) return true; p=p.parent; } return false; }
const isIcon=n=>n.type!=='TEXT'&&(['VECTOR','BOOLEAN_OPERATION','STAR','POLYGON','LINE'].includes(n.type)||anc(n,/^(ic[-_ ]|icon|ico\b|smbl)/i));
function lum(c){ return 0.2126*c.r+0.7152*c.g+0.0722*c.b; }
function byValue(n,prop,c,a){ const L=lum(c);
  if(prop==='strokes') return L>0.5&&a>0.5?'border/strong':'border/subtle';
  if(n.type==='TEXT'||isIcon(n)){ const p=n.type==='TEXT'?'text/':'icon/'; return p+(L>0.85?'primary':L>0.55?'secondary':L>0.35?'tertiary':'disabled'); }
  if(a<0.5) return 'surface/level-2';
  return L<0.05?'surface/level-0':L<0.085?'surface/level-1':L<0.12?'surface/level-2':L<0.2?'surface/level-3':'action/secondary/default'; }
function pick(lg,n,prop,paint){ const nm=lg.name, opts=MAP[nm];
  if(nm==='Color 3 [Back]') return anc(n,/menu|dropdown|popover|tooltip|options|list ?box|select ?list/i)?'surface/raised':'surface/level-2';
  if(nm==='Brand'){ if(prop==='strokes') return 'border/accent'; if(n.type==='TEXT') return 'text/accent'; if(isIcon(n)) return 'icon/accent'; if(anc(n,/checkbox|radio|toggle|switch/i)) return 'control/checked'; return 'action/primary/default'; }
  if(nm==='surface/base'){ if(prop==='fills') return 'surface/level-2'; return anc(n,/checkbox|radio/i)?'border/strong':'border/subtle'; }
  if(nm==='Background/Color accent') return anc(n,/toggle|switch/i)?'control/track':anc(n,/sheet|шторк/i)?'surface/raised':'surface/level-0';
  if(nm==='Background/Color focus') return anc(n,/button|btn/i)?'action/secondary/default':anc(n,/tooltip/i)?'surface/raised':'surface/level-1';
  if(opts) return opts[0][1];
  return null; }
function fix(t,n,prop){ if(!t) return t;
  if(n.type!=='TEXT'&&isIcon(n)&&t.startsWith('text/')){ const s=t.slice(5); const c='icon/'+s; return byName[c]?c:t; }
  if(n.type==='TEXT'&&t.startsWith('icon/')){ const c='text/'+t.slice(5); return byName[c]?c:t; }
  if(prop==='strokes'&&t.startsWith('surface/')) return 'border/subtle';
  const st=t.match(/^status\/(\w+)\/solid$/); // статус на тексте / иконке → text/* · icon/* (D-contrast)
  if(st&&n.type==='TEXT') return 'text/'+st[1];
  if(st&&isIcon(n)&&byName['icon/'+st[1]]) return 'icon/'+st[1];
  return t; }
const root=await figma.getNodeByIdAsync(SRC);
const ids=[root.id,...root.findAll(()=>true).map(n=>n.id)];
const fontsLoaded=new Set();
async function loadFonts(n){ for(const s of n.getStyledTextSegments(['fontName'])){ const k=s.fontName.family+'|'+s.fontName.style; if(!fontsLoaded.has(k)){ await figma.loadFontAsync(s.fontName); fontsLoaded.add(k);} } }
const stats={swapped:0,already:0,raw:0,byRule:{},unmapped:{},missingTarget:{},mixedText:0};
for(const id of ids){ const n=await figma.getNodeByIdAsync(id); if(!n){stats.gone=(stats.gone||0)+1; continue;}
  for(const prop of ['fills','strokes']){
    const ps=n[prop]; if(ps===figma.mixed){ if(prop==='fills'&&n.type==='TEXT'){ await loadFonts(n); for(const s of n.getStyledTextSegments(['fills'])){ const nf=[]; let ch=false; for(const q of s.fills){ const b=q.boundVariables&&q.boundVariables.color; const lg=b&&await legacy(b.id); if(!lg||lg.ds2){nf.push(q);continue;} let t=pick(lg,n,prop,q); if(!t) t=byValue(n,prop,q.color,q.opacity??1); t=fix(t,n,prop); const v=await tv(t); if(!v){nf.push(q);continue;} nf.push(figma.variables.setBoundVariableForPaint({...q,opacity:q.opacity??1},'color',v)); ch=true; const key=lg.name+' → '+t+' (сегмент)'; stats.byRule[key]=(stats.byRule[key]||0)+1; stats.swapped++; } if(ch&&!DRY) n.setRangeFills(s.start,s.end,nf); } } continue; } if(!Array.isArray(ps)||!ps.length) continue;
    let changed=false; const out=[];
    for(const p of ps){ if(p.type!=='SOLID'){out.push(p);continue;}
      const b=p.boundVariables&&p.boundVariables.color;
      if(!b){ if(p.visible!==false) stats.raw++; out.push(p); continue; }
      const lg=await legacy(b.id);
      if(!lg||lg.ds2){ stats.already++; out.push(p); continue; }
      let t=pick(lg,n,prop,p), how='map';
      if(!t){ t=byValue(n,prop,p.color,p.opacity??1); how='value'; stats.unmapped[lg.col+' :: '+lg.name]=(stats.unmapped[lg.col+' :: '+lg.name]||0)+1; }
      t=fix(t,n,prop);
      const v=await tv(t);
      if(!v){ stats.missingTarget[t]=(stats.missingTarget[t]||0)+1; out.push(p); continue; }
      const key=lg.name+' → '+t+(how==='value'?' (по значению)':''); stats.byRule[key]=(stats.byRule[key]||0)+1;
      out.push(figma.variables.setBoundVariableForPaint({...p,opacity:p.opacity??1},'color',v)); stats.swapped++; changed=true; }
    if(changed&&!DRY){ if(n.type==='TEXT') await loadFonts(n); try{ n[prop]=out; }catch(e){ stats.err=(stats.err||0)+1; stats.lastErr=String(e).slice(0,120);} }
  }
}
stats.byRule=Object.entries(stats.byRule).sort((a,b)=>b[1]-a[1]);
return stats;
