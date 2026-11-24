// Миграция компонентов на экране: legacy-экземпляры (DS Web) → наборы DS 2.0, принцип «как оригинал».
// ARGS: {src:<id фрейма>, dry:false}. Размер — по реальной высоте legacy; подпись, иконки, состояние — переносятся.
// Покрыто: baseButton / Button → Button (без подписи → Icon button); Dropdown item → Menu item; base avatar / single → Avatar; base tab item → Tab; base badge → Badge;
// Search → Search; Selector + Input → Select; DateRange.Field → Date range field; base segmented picker group → Segmented;
// DS App: Period selector item → Chip; Selector small / dropdown → Select compact; Badge (Size/Color/style) → Badge; Button Invert=True → Inverted.
const K={Button:'2be8e84200d3048665f4264661a03d47dc58a2b6',MenuItem:'84502ef42addbd0d44b96ac3c74ea04554340dd6',Avatar:'9994f20a363a6e6084adc63705d2f424c7d3e0d5',Tab:'0862e584abdf9f0102f5703fb4fce8fa62f5fd18',Badge:'8b8e47935737e95ffcef6087d42c4d13dfa0c647',IconButton:'316b6554fa0dc6bbb5e07253c6cb92296f62bc44',Search:'5c158f806db5cf294dc41c420c59fc0bad72d0e3',Select:'a935454f75dba75fec4f039820de48de05c031d7',DateRange:'01ca57db2ff92035c73494aedc78e70f428c510f',Segmented:'d219dfa85a2a534d7ed87b994e8426d078c22a93',Chip:'3f74c25f9995add339d0ee560df0f6d00addc344',SelectCompact:'2712424f18f61920c0996b1243473d54418f66a4',BadgeApp:'8b8e47935737e95ffcef6087d42c4d13dfa0c647'};
const SETS={}; async function set(k){ for(let i=0;i<4&&!SETS[k];i++){ try{ SETS[k]=await figma.importComponentSetByKeyAsync(K[k]); }catch(e){} } return SETS[k]; }
function variant(s,want){ const ok=c=>Object.entries(want).every(([a,b])=>c.variantProperties&&c.variantProperties[a]===b); return s.children.find(ok)||null; }
function propKey(inst,base){ return Object.keys(inst.componentProperties).find(k=>k.split('#')[0]===base); }
const fonts=new Set(); async function lf(t){ for(const s of t.getStyledTextSegments(['fontName'])){ const k=s.fontName.family+s.fontName.style; if(!fonts.has(k)){ await figma.loadFontAsync(s.fontName); fonts.add(k);} } }
function texts(n){ return n.findAll(x=>x.type==='TEXT'&&x.visible).sort((a,b)=>a.absoluteTransform[0][2]-b.absoluteTransform[0][2]); }
function icons(n){ return n.findAll(x=>x.type==='INSTANCE'&&x.visible&&x!==n&&/^(ic|icon|smbl)/i.test(x.name)&&x.width<=32); }
function sz(h,map){ let best=null; for(const [k,v] of map){ if(best===null||Math.abs(v-h)<Math.abs(best[1]-h)) best=[k,v]; } return best[0]; }
const root=await figma.getNodeByIdAsync(ARGS.src); const stats={swapped:{},skipped:{},errors:[]};
const cands=root.findAll(n=>n.type==='INSTANCE').filter(i=>{ let p=i.parent; while(p&&p!==root){ if(p.type==='INSTANCE') return false; p=p.parent; } return true; });
for(const inst of cands){ const mc=await inst.getMainComponentAsync(); if(!mc) continue; const sname=(mc.parent&&mc.parent.type==='COMPONENT_SET'?mc.parent.name:mc.name); const vp=inst.variantProperties||{};
 const setKey=mc.parent&&mc.parent.type==='COMPONENT_SET'?mc.parent.key:mc.key; if(Object.values(K).includes(setKey)) continue; // уже DS 2.0
 let kind=null; if(/^baseButton$|^Button$/.test(sname)&&mc.remote) kind='Button'; else if(sname==='Dropdown item') kind='MenuItem'; else if(sname==='base avatar / single') kind='Avatar'; else if(sname==='base tab item') kind='Tab'; else if(/^base badge \//.test(sname)) kind='Badge'; else if(sname==='Search') kind='Search'; else if(sname==='Selector + Input') kind='Select'; else if(sname==='DateRange.Field') kind='DateRange'; else if(/^base segmented picker group/.test(sname)) kind='Segmented'; else if(sname==='Period selector item') kind='Chip'; else if(sname==='Selector small'||sname==='dropdown') kind='SelectCompact'; else if(sname==='Badge'&&mc.remote&&vp.Color) kind='BadgeApp';
 if(!kind){ stats.skipped[sname]=(stats.skipped[sname]||0)+1; continue; }
 try{
  const tx=texts(inst); const label=tx[0]?tx[0].characters:''; const ic=icons(inst); const h=Math.round(inst.height), w=Math.round(inst.width);
  let want={}, after=[];
  if(kind==='Button'){ const T=vp.Type||'Primary'; const map={'Primary':['Primary','Default'],'Secondary base':['Tertiary','Default'],'Secondary accent':['Secondary','Default'],'Stroke base':['Tertiary outline','Default'],'Stroke accent':['Tertiary outline','Default'],'Error':['Primary','Danger'],'Success':['Primary','Default'],'Link':['Text','Default'],'Text':['Text','Default'],'Text accent':['Text','Default'],'white':['Inverted','Default']}[T]||['Tertiary','Default'];
   let size=sz(h,[['XS',24],['S',32],['M',40],['L',48]]); if(map[0]==='Text') size=h<=26?'XS':h<=36?'S':'M';
   want={Type:map[0],Tone:map[1],Size:size,State:vp.Active==='No'?'Disabled':'Default'};
   if(!label&&ic.length){ kind='IconButton'; const it={'Primary':'Primary','Secondary accent':'Secondary','Stroke base':'Tertiary outline','Stroke accent':'Tertiary outline','Link':'Ghost','Text':'Ghost','Text accent':'Text','white':'Inverted','Error':'Primary'}[T]||'Tertiary'; want={Type:it,Tone:T==='Error'?'Danger':'Default',Size:sz(h,[['XS',24],['S',32],['M',40],['L',48]]),Loading:'False',State:vp.Active==='No'?'Disabled':'Default'}; after=[['Icon',(await ic[0].getMainComponentAsync()).id],['Label',ic[0].name.replace(/^ic[-_]?/,'')]]; }
   else {
   const tl=tx[0]; const leftIc=ic.find(i=>tl&&i.absoluteTransform[0][2]<tl.absoluteTransform[0][2]); const rightIc=ic.find(i=>tl&&i.absoluteTransform[0][2]>tl.absoluteTransform[0][2]);
   after=[['Label',label],['Icon left',!!leftIc],['Icon right',!!rightIc]]; if(leftIc) after.push(['Icon left · swap',(await leftIc.getMainComponentAsync()).id]); if(rightIc) after.push(['Icon right · swap',(await rightIc.getMainComponentAsync()).id]); } }
  if(kind==='Button'&&vp.Invert==='True'){ want.Type='Inverted'; want.Tone='Default'; }
  let seg=null, nested=null, slotLead=null;
  if(kind==='Chip'){ want={Size:sz(h,[['S',32],['M',40]]),Selected:vp.Selected==='True'?'On':'Off',State:'Default'}; after=[['Label',label]]; }
  if(kind==='SelectCompact'){ want={State:'Default'}; after=[['Text',label],['Show leading',ic.length>0&&!/arrow|corner|chevron/i.test(ic[0].name)]]; const lead=ic.find(i=>!/arrow|corner|chevron/i.test(i.name)); if(lead){ const k=lead.clone(); figma.currentPage.appendChild(k); k.visible=false; slotLead=k; } }
  if(kind==='BadgeApp'){ const tone={Neutral:'Neutral',Brand:'Accent',Primary:'Accent',Success:'Success',Warning:'Warning',Error:'Danger',Danger:'Danger'}[vp.Color]||'Neutral'; want={Size:{Small:'S',Medium:'M',Large:'L'}[vp.Size]||sz(h,[['XS',16],['S',20],['M',24],['L',32]]),Tone:tone,Style:vp.style==='filled'?'Solid':'Subtle',State:'Default',Content:'Text'}; after=[['Label',label]]; }
  if(kind==='Search'){ want={Size:sz(h,[['M',40],['S',32]]),State:'Default'}; after=[['Text',label]]; }
  if(kind==='Select'){ const lab=inst.findOne(x=>x.type==='TEXT'&&x.name==='Description'); const val=tx.find(x=>x!==lab); want={Size:sz(h,[['M',40],['L',48]]),'Label position':'On border',State:(val&&val.characters)?'Filled':'Default'}; after=[['Label',lab?lab.characters:''],['Show label',!!lab]]; if(val) after.push(['Value',val.characters]); }
  if(kind==='DateRange'){ const lab=inst.findOne(x=>x.type==='TEXT'&&x.name==='Label text'); const ds=inst.findOne(x=>x.type==='TEXT'&&x.name==='Date start text'), de=inst.findOne(x=>x.type==='TEXT'&&x.name==='Date end text'); want={State:vp.Type==='Empty'?'Default':'Filled'}; nested={field:{Size:sz(h,[['M',40],['L',48]])},Field:{Label:lab?lab.characters:'','Show helper':false,Value:ds&&de?ds.characters+' → '+de.characters:''}}; }
  if(kind==='Segmented'){ const items=inst.children.filter(c=>c.type==='INSTANCE'&&c.visible); seg=items.map(c=>({label:(c.findOne(x=>x.type==='TEXT')||{}).characters||'',on:(c.variantProperties||{}).active==='true'})); want={Size:sz(h,[['S',32],['M',40],['L',48]]),Items:String(Math.min(4,Math.max(2,seg.length)))}; }
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
  const keepW=inst.layoutSizingHorizontal, oldW=inst.width; inst.swapComponent(v); inst.resetOverrides(); // переопределения legacy-корня (заливки, обводки) не переносим
  const props={}; for(const [b,val] of after){ const k=propKey(inst,b); if(k) props[k]=val; } if(Object.keys(props).length) inst.setProperties(props);
  if(kind==='MenuItem'&&mi){ const row=inst.exposedInstances.find(e=>e.name==='_List row'); if(row){ const rp={}; const k=b=>Object.keys(row.componentProperties).find(x=>x.split('#')[0]===b);
    rp[k('Label')]=mi.label; if(mi.desc){ rp[k('Description')]=mi.desc; rp[k('Show description')]=true; } else rp[k('Show description')]=false;
    rp[k('Show leading')]=mi.lead.length>0; rp[k('Show trailing')]=mi.trail.length>0; row.setProperties(rp);
    for(const [nm,list] of [['Leading',mi.lead],['Trailing',mi.trail]]){ if(!list.length) continue; const slot=row.findOne(x=>x.type==='SLOT'&&x.name===nm); if(!slot){ list.forEach(n=>n.remove()); continue; } for(const c of [...slot.children]) c.remove(); for(const n of list){ slot.appendChild(n); n.visible=true; } } } }
  if(slotLead){ const slot=inst.findOne(x=>x.type==='SLOT'&&x.name==='Leading'); if(slot){ for(const c of [...slot.children]) c.remove(); slot.appendChild(slotLead); slotLead.visible=true; } else slotLead.remove(); }
  if(seg){ const segs=inst.findAll(x=>x.type==='INSTANCE'&&/^segment \d/.test(x.name)).sort((a,b)=>a.name.localeCompare(b.name)); segs.forEach((n,i)=>{ const d=seg[i]; if(!d) return; const p={}; const lk=Object.keys(n.componentProperties).find(x=>x.split('#')[0]==='Label'); if(lk) p[lk]=d.label; p['Selected']=d.on?'On':'Off'; try{ n.setProperties(p); }catch(e){ stats.errors.push('segment: '+String(e).slice(0,80)); } }); }
  if(nested){ for(const [nm,pp] of Object.entries(nested)){ const ni=inst.exposedInstances.find(e=>e.name===nm)||inst.findOne(x=>x.type==='INSTANCE'&&x.name===nm); if(!ni) continue; const p={}; for(const [b,val] of Object.entries(pp)){ const k=Object.keys(ni.componentProperties).find(x=>x.split('#')[0]===b); if(k&&val!==''&&val!==undefined) p[k]=val; } if(Object.keys(p).length) ni.setProperties(p); } }
  if(keepW==='FILL'){ try{ inst.layoutSizingHorizontal='FILL'; }catch(e){} }
  // 24.11: legacy-кнопка шириной по контейнеру в родителе без auto layout (CTA «Начать майнить») после замены сжималась по подписи — возвращаем прежнюю ширину
  else if(oldW-inst.width>12&&kind!=='Avatar'&&kind!=='Badge'&&kind!=='BadgeApp'){ try{ inst.resize(oldW,inst.height); }catch(e){} }
  stats.swapped[kind]=(stats.swapped[kind]||0)+1;
 }catch(e){ stats.errors.push(kind+': '+String(e).slice(0,100)); } }
return stats;
