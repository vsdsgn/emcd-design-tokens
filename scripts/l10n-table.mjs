const L=[['en','English'],['ru','Русский'],['pt-BR','Português'],['es','Español'],['de','Deutsch'],['ar-u-nu-latn','العربية'],['nl','Nederlands'],['nb','Norsk'],['kk','Қазақша'],['hi','हिन्दी'],['id','Bahasa Indonesia'],['tr','Türkçe'],['th','ไทย'],['vi','Tiếng Việt'],['ja','日本語'],['uk','Українська'],['sl','Slovenščina'],['pl','Polski'],['it','Italiano']];
const d=new Date(Date.UTC(2026,9,5,9,25));
const show=s=>s.replace(/\u00a0/g,'⍽').replace(/\u202f/g,'·');
const rows=L.map(([loc,name])=>{
 const n=new Intl.NumberFormat(loc,{maximumFractionDigits:2}).format(1234567.89);
 const p=new Intl.NumberFormat(loc,{style:'percent',maximumFractionDigits:1}).format(0.125);
 const c=new Intl.NumberFormat(loc,{style:'currency',currency:'USD'}).format(1234.5);
 const crypto=new Intl.NumberFormat(loc,{minimumFractionDigits:8,maximumFractionDigits:8}).format(0.12345678)+'\u00a0BTC';
 const neg=new Intl.NumberFormat(loc,{signDisplay:'exceptZero'}).format(-30)+'\u00a0USDT';
 const compact=new Intl.NumberFormat(loc,{notation:'compact',maximumFractionDigits:1}).format(1200000);
 const date=new Intl.DateTimeFormat(loc,{day:'numeric',month:'long',timeZone:'UTC'}).format(d);
 const dt=new Intl.DateTimeFormat(loc,{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'UTC'}).format(d);
 return `| ${name} | \`${loc}\` | ${show(n)} | ${show(p)} | ${show(c)} | ${show(crypto)} | ${show(neg)} | ${show(compact)} | ${show(date)} | ${show(dt)} |`;
});
console.log('| Язык | Локаль | Число | Процент | USD | Крипто | Изменение | Сокращение | Дата | Дата и время |\n|---|---|---|---|---|---|---|---|---|---|\n'+rows.join('\n'));
