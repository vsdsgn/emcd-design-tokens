// Миграция компонентов на экране: legacy-экземпляры (DS Web) → наборы DS 2.0, принцип «как оригинал».
// ARGS: {src:<id фрейма>, dry:false}. Размер — по реальной высоте legacy; подпись, иконки, состояние — переносятся.
// Покрыто: baseButton / Button → Button; Dropdown item → Menu item; base avatar / single → Avatar; base tab item → Tab; base badge → Badge.
const K={Button:'2be8e84200d3048665f4264661a03d47dc58a2b6',MenuItem:'84502ef42addbd0d44b96ac3c74ea04554340dd6',Avatar:'9994f20a363a6e6084adc63705d2f424c7d3e0d5',Tab:'0862e584abdf9f0102f5703fb4fce8fa62f5fd18',Badge:'8b8e47935737e95ffcef6087d42c4d13dfa0c647'};
const SETS={}; async function set(k){ if(!SETS[k]) SETS[k]=await figma.importComponentSetByKeyAsync(K[k]); return SETS[k]; }
function variant(s,want){ const ok=c=>Object.entries(want).every(([a,b])=>c.variantProperties&&c.variantProperties[a]===b); return s.children.find(ok)||null; }
function propKey(inst,base){ return Object.keys(inst.componentProperties).find(k=>k.split('#')[0]===base); }
const fonts=new Set(); async function lf(t){ for(const s of t.getStyledTextSegments(['fontName'])){ const k=s.fontName.family+s.fontName.style; if(!fonts.has(k)){ await figma.loadFontAsync(s.fontName); fonts.add(k);} } }
function texts(n){ return n.findAll(x=>x.type==='TEXT'&&x.visible).sort((a,b)=>a.absoluteTransform[0][2]-b.absoluteTransform[0][2]); }
function icons(n){ return n.findAll(x=>x.type==='INSTANCE'&&x.visible&&x!==n&&/^(ic|icon|smbl)/i.test(x.name)&&x.width<=32); }
function sz(h,map){ let best=null; for(const [k,v] of map){ if(best===null||Math.abs(v-h)<Math.abs(best[1]-h)) best=[k,v]; } return best[0]; }
const root=await figma.getNodeByIdAsync(ARGS.src); const stats={swapped:{},skipped:{},errors:[]};
const cands=root.findAll(n=>n.type==='INSTANCE').filter(i=>{ let p=i.parent; while(p&&p!==root){ if(p.type==='INSTANCE') return false; p=p.parent; } return true; });
for(const inst of cands){ const mc=await inst.getMainComponentAsync(); if(!mc) continue; const sname=(mc.parent&&mc.parent.type==='COMPONENT_SET'?mc.parent.name:mc.name); const vp=inst.variantProperties||{};
 let kind=null; if(/^baseButton$|^Button$/.test(sname)&&mc.remote) kind='Button'; else if(sname==='Dropdown item') kind='MenuItem'; else if(sname==='base avatar / single') kind='Avatar'; else if(sname==='base tab item') kind='Tab'; else if(/^base badge \//.test(sname)) kind='Badge';
 if(!kind){ stats.skipped[sname]=(stats.skipped[sname]||0)+1; continue; }
 try{
  const tx=texts(inst); const label=tx[0]?tx[0].characters:''; const ic=icons(inst); const h=Math.round(inst.height), w=Math.round(inst.width);
  let want={}, after=[];
  if(kind==='Button'){ const T=vp.Type||'Primary'; const map={'Primary':['Primary','Default'],'Secondary base':['Tertiary','Default'],'Secondary accent':['Secondary','Default'],'Stroke base':['Tertiary outline','Default'],'Stroke accent':['Tertiary outline','Default'],'Error':['Primary','Danger'],'Success':['Primary','Default'],'Link':['Text','Default'],'Text':['Text','Default'],'Text accent':['Text','Default'],'white':['Inverted','Default']}[T]||['Tertiary','Default'];
   let size=sz(h,[['XS',24],['S',32],['M',40],['L',48]]); if(map[0]==='Text') size=h<=26?'XS':h<=36?'S':'M';
   want={Type:map[0],Tone:map[1],Size:size,State:vp.Active==='No'?'Disabled':'Default'};
   if(!label&&ic.length){ stats.skipped['baseButton без подписи → Icon button']=(stats.skipped['baseButton без подписи → Icon button']||0)+1; continue; }
   const tl=tx[0]; const leftIc=ic.find(i=>tl&&i.absoluteTransform[0][2]<tl.absoluteTransform[0][2]); const rightIc=ic.find(i=>tl&&i.absoluteTransform[0][2]>tl.absoluteTransform[0][2]);
   after=[['Label',label],['Icon left',!!leftIc],['Icon right',!!rightIc]]; if(leftIc) after.push(['Icon left · swap',(await leftIc.getMainComponentAsync()).id]); if(rightIc) after.push(['Icon right · swap',(await rightIc.getMainComponentAsync()).id]); }
  let mi=null;
  if(kind==='MenuItem'){ want={Size:h>46?'L':'M',Tone:'Default',State:vp.State==='Hover'?'Hover':'Default'};
   const lab=inst.findOne(x=>x.type==='TEXT'&&x.name==='Label'&&x.visible), des=inst.findOne(x=>x.type==='TEXT'&&x.name==='Description'&&x.visible);
   const la=inst.findOne(x=>x.name==='Left addon'&&x.visible), rs=inst.findOne(x=>x.name==='Right slot'&&x.visible);
   const grab=n=>{ if(!n||!('children' in n)) return []; return n.children.filter(c=>c.visible).map(c=>{ const k=c.clone(); figma.currentPage.appendChild(k); k.visible=false; return k; }); };
   mi={label:lab?lab.characters:label,desc:des?des.characters:'',lead:grab(la),trail:grab(rs)}; }
  if(kind==='Avatar'){ want={Size:sz(w,[['2XS',16],['XS',20],['S',24],['M',32],['L',40],['XL',56]]),Type:'Text',Network:'Off',State:'Default'}; after=[['Initials',label||'A']]; }
  if(kind==='Tab'){ want={Size:sz(h,[['S',40],['M',48],['L',56]]),Selected:vp.selected==='true'?'On':'Off',State:'Default'}; after=[['Label',label],['Counter',tx.length>1]]; }
  if(kind==='Badge'){ const tone={neutral:'Neutral',brand:'Accent',danger:'Danger',success:'Success',warning:'Warning'}[(sname.match(/\/ (\w+)/)||[])[1]]||'Neutral'; want={Size:{sm:'S',md:'M',lg:'L'}[vp.size]||sz(h,[['XS',16],['S',20],['M',24],['L',32]]),Tone:tone,Style:vp.style==='filled'?'Solid':'Subtle',State:'Default',Content:'Text'}; after=[['Label',label]]; }
  const s=await set(kind); const v=variant(s,want); if(!v){ stats.errors.push(kind+' нет варианта '+JSON.stringify(want)); continue; }
  if(ARGS.dry){ stats.swapped[kind]=(stats.swapped[kind]||0)+1; continue; }
  const keepW=inst.layoutSizingHorizontal; inst.swapComponent(v);
  const props={}; for(const [b,val] of after){ const k=propKey(inst,b); if(k) props[k]=val; } if(Object.keys(props).length) inst.setProperties(props);
  if(kind==='MenuItem'&&mi){ const row=inst.exposedInstances.find(e=>e.name==='_List row'); if(row){ const rp={}; const k=b=>Object.keys(row.componentProperties).find(x=>x.split('#')[0]===b);
    rp[k('Label')]=mi.label; if(mi.desc){ rp[k('Description')]=mi.desc; rp[k('Show description')]=true; } else rp[k('Show description')]=false;
    rp[k('Show leading')]=mi.lead.length>0; rp[k('Show trailing')]=mi.trail.length>0; row.setProperties(rp);
    for(const [nm,list] of [['Leading',mi.lead],['Trailing',mi.trail]]){ if(!list.length) continue; const slot=row.findOne(x=>x.type==='SLOT'&&x.name===nm); if(!slot){ list.forEach(n=>n.remove()); continue; } for(const c of [...slot.children]) c.remove(); for(const n of list){ slot.appendChild(n); n.visible=true; } } } }
  if(keepW==='FILL'){ try{ inst.layoutSizingHorizontal='FILL'; }catch(e){} }
  stats.swapped[kind]=(stats.swapped[kind]||0)+1;
 }catch(e){ stats.errors.push(kind+': '+String(e).slice(0,100)); } }
return stats;
