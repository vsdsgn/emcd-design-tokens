// Проход цвета курсором по странице общего файла (25.11): ARGS {page, row, scr, n=15, theme}. Возвращает следующий курсор {row, scr} или 'done'.
// Для больших рядов, где migrate-colors упирается в таймаут. Режимы не трогает (их ставит migrate-colors).
// figma.skipInvisibleInstanceChildren=false обязателен: с true первый проход пропускал слои внутри экземпляров (чекбоксы WL B2B остались тёмными).
figma.skipInvisibleInstanceChildren=false;
const svc=figma.root.children.find(p=>p.name==="⚑ Скрипты миграции"); await svc.loadAsync();
const AF=Object.getPrototypeOf(async function(){}).constructor;
const CS=new AF('ARGS',svc.children.find(n=>n.name==="⚑ builder · color-swap").characters), RH=new AF('ARGS',svc.children.find(n=>n.name==="⚑ builder · raw-hex").characters);
const p=await figma.getNodeByIdAsync(ARGS.page); await p.loadAsync(); const rows=p.children.filter(n=>n.type==='FRAME'&&n.name.startsWith('⟶')).sort((a,b)=>a.y-b.y);
let r=ARGS.row, k=ARGS.scr||0, left=ARGS.n||15, s=0, h=0;
while(left>0&&r<rows.length){ const sc=rows[r].children.filter(c=>c.type==='FRAME'); if(k>=sc.length){ r++; k=0; continue; } const f=sc[k]; s+=(await CS({src:f.id,theme:ARGS.theme})).swapped||0; if(ARGS.theme==='Dark') h+=(await RH({src:f.id})).bound||0; k++; left--; }
return {next: r<rows.length?{row:r,scr:k}:'done', swapped:s, raw:h, rows:rows.length};
