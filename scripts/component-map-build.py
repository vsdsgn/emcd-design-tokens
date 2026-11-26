# Общая таблица legacy → DS 2.0 по всем продуктам общего файла миграции (26.11). Данные — прогоны migrate-components 25.11 и «⚑ runner · inventory» 26.11.
# Вывод: docs/migration/component-map-all.csv (+ build/component-map.json для страницы-артефакта). Обновлять INV / TGT после каждого прохода.
import csv, json
P=['Mining Web','Mining App','Monitoring','WL B2B','WL B2C','Geometria Web','Geometria App','Mining US','Firmware']
ab={'MW':'Mining Web','MA':'Mining App','Mon':'Monitoring','B2B':'WL B2B','B2C':'WL B2C','GW':'Geometria Web','GA':'Geometria App','US':'Mining US','FW':'Firmware'}
# заменено автоматически (сумма по прогонам 25.11)
runs={'Mon':[dict(Button=58,Segmented=3,Badge=4,Select=5,BadgeApp=3),dict(SelectCompact=91,Button=75,Badge=28,BadgeApp=20,Search=2,Segmented=1),dict(Button=28,SelectCompact=9,Badge=14,BadgeApp=7,Search=6),dict(Button=170,BadgeApp=16,DateRange=2,MenuItem=20,Badge=41,SelectCompact=14,Tab=35,Select=2,Segmented=1),dict(Button=271,Badge=70,BadgeApp=47,Search=3,Segmented=2,MenuItem=10,Avatar=7)],
'GW':[dict(Button=51,BadgeApp=3,IconButton=8,Chip=6),dict(Button=46,Chip=6),dict(Button=27,BadgeApp=3,IconButton=10)],
'GA':[dict(Button=32,IconButton=8,Search=1,SelectCompact=1)],
'B2B':[dict(Button=60,Select=22,Search=13,SelectCompact=7,MenuItem=6,Chip=3),dict(Button=46,Search=13,SelectCompact=7,Chip=15,Select=6)],
'B2C':[dict(Button=62,IconButton=1,Segmented=5,SelectCompact=44,Badge=63,BadgeApp=9,Select=5,Tab=12),dict(Button=84,Select=12,Badge=94,BadgeApp=20,SelectCompact=38,Tab=6,DateRange=7,Segmented=3)],
'US':[dict(Button=54,Select=13,SelectCompact=4,Chip=7,Badge=1,BadgeApp=15)],
'FW':[dict(Badge=9,Button=32,BadgeApp=4,Select=13)],
'MW':[dict(Search=4,Button=54,MenuItem=12,Select=16,Segmented=9,SelectCompact=36,DateRange=6,Chip=4),dict(Badge=9,Button=105,BadgeApp=5,Segmented=2,Select=20,Chip=54,Tab=4,Search=1,Avatar=1,DateRange=1),dict(Segmented=33,Tab=56,Search=31,Button=149,DateRange=5,Badge=18,SelectCompact=20,MenuItem=82,BadgeApp=4,Select=6),dict(Button=95,BadgeApp=27,Badge=15,Segmented=8,Chip=7,SelectCompact=1),dict(Button=79,BadgeApp=14,SelectCompact=7,Badge=28,Select=2,Segmented=1,Search=1),dict(Button=163,Badge=16,Search=2,MenuItem=42,BadgeApp=21,Select=5,DateRange=3,Tab=8,Segmented=4,SelectCompact=7)],
'MA':[dict(Button=43,Search=2,MenuItem=14,SelectCompact=2,Chip=8),dict(Button=45,Select=7,Chip=12,SelectCompact=13,Segmented=2,Search=2,Badge=9),dict(Tab=7,Button=114,SelectCompact=20,Chip=20,Select=20,BadgeApp=41,IconButton=1),dict(Button=95,Select=21,BadgeApp=71,Chip=8,SelectCompact=1,DateRange=1),dict(BadgeApp=71,Button=98,IconButton=2,Chip=8,SelectCompact=2,DateRange=2,Select=18)]}
done={}
for k,rs in runs.items():
  for r in rs:
    for kind,n in r.items():
      kk={'IconButton':'Button','BadgeApp':'Badge'}.get(kind,kind); done.setdefault(kk,{}); done[kk][ab[k]]=done[kk].get(ab[k],0)+n
AUTO=[('Button','baseButton · Button (DS Web / DS App / Geometria)','Button / Icon button','Атом','Type → Type (Secondary base → Tertiary, Stroke → Tertiary outline, Error → Primary Danger, Link/Text → Text); размер по высоте 24/32/40/48; без подписи → Icon button; серый Primary → Tertiary'),
('Select','Selector + Input','Select','Молекула','подпись на рамке, значение → Value, Filled по наличию'),
('SelectCompact','Selector small · dropdown','Select compact','Молекула','текст + ведущая иконка в слот'),
('Search','Search','Search','Молекула','M 40 / S 32'),
('Badge','base badge / <tone> · Badge (App)','Badge','Атом','neutral/brand/danger/success/warning → Neutral/Accent/Danger/Success/Warning; filled → Solid'),
('Tab','base tab item','Tab','Атом','S 32 / M 48 / L 56, selected'),
('Segmented','base segmented picker group','Segmented','Молекула','2–4 сегмента, ширина делится поровну'),
('Chip','Period selector item · baseChip (Geometria)','Chip','Атом','S/M по высоте, Selected'),
('MenuItem','Dropdown item','Menu item','Молекула','Label / Description, слоты Leading / Trailing'),
('DateRange','DateRange.Field','Date range field','Молекула','даты «начало → конец»'),
('Avatar','base avatar / single','Avatar','Атом','размер по ширине, инициалы')]
# осталось (верхний уровень, после замены) — инвентаризация 26.11
INV={
'Sidebar item':dict(Mon=581,MW=137,US=40,FW=17),'sidebar / default · .🔸 fm sidebar · SideMenu':dict(MW=131,US=5,FW=2,GW=16),
'baseCheckbox · checkbox · Checkbox':dict(Mon=403,B2B=61,B2C=11,MW=28,MA=55,FW=1,GW=4,GA=1),
'baseToggle · toggle':dict(Mon=7,B2B=5,B2C=18,MW=129,US=18),
'Radiogroup':dict(MA=72),
'tab item · tabs/x · navbar-item · Menu Item (Geometria)':dict(Mon=353,US=25,MA=34,GA=4,MW=251,GW=29),
'#Submenu tab':dict(Mon=158,MW=257,B2C=8),
'tabs · base tabbar --1.5 · tabs / fix · TabMenu · Tab menu · Navigation submenu · navbar-lvl-2':dict(MA=73,US=8,Mon=9,B2C=34,GW=5,GA=3,MW=14),
'baseChip / base --1.5':dict(Mon=138,B2C=39,MW=56,MA=11),
'base segmented picker item / text (без группы) · SegmentedPicker · ViewSelector':dict(Mon=45,B2B=31,B2C=6,GW=11),
'input · baseInput · Input · #corner input':dict(Mon=63,B2C=40,MW=166,MA=61,FW=20,GW=3),
'Input & Select · input & select · input / --password (Geometria)':dict(GW=172,GA=55),
'Select White (Geometria)':dict(GW=3),
'.field.left · .field.right (части поля)':dict(Mon=134,B2B=35,B2C=10,MW=29,MA=26,GA=1),
'Button / Desktop · Buttons / Desktop-tablet':dict(MW=114,US=5),
'Links':dict(MA=62,MW=17,US=16,B2C=4,GA=8,GW=6),
'base overlay · overlay · Overlay':dict(Mon=52,B2B=12,B2C=15,MW=14,MA=16,FW=3),
'base modal header / footer · modal content · modal footer · Modal bar · Modal · modal header / fullscreen':dict(Mon=22,B2B=3,B2C=3,MA=49,GW=3,GA=2),
'Accordion · accordion --1.5 · GroupItem':dict(Mon=17,GW=8,GA=12,US=4,MW=68,MA=106,B2C=2),
'base notification · Notifications':dict(Mon=7,B2B=2,B2C=2,GA=1),
'base Banner --2.0':dict(FW=1),'tooltip':dict(FW=1),
'avatar · avatar group line':dict(B2B=25,B2C=13,Mon=3,MW=63,MA=12,US=9),
'List · Coinhold list item · Row · Cell · Summ item':dict(MA=139,Mon=10,MW=19,GA=11,GW=44),
'Content · Left · Right · Left addon · Right slot (части строк)':dict(MA=622,MW=261,US=42,Mon=26,B2B=4,B2C=18,GW=65),
'cell · line · stroke · table / * · table title / *':dict(MW=618,US=12),
'tabbar · BottomNavi · ic_tabbar_stage':dict(MA=91,US=5,GA=9,GW=14),
'navigation bar · Navbar mobile · Toolbar · //title':dict(MA=47,US=3,MW=62,B2C=2),
'Navbar · Header · Header-title · Subheader':dict(FW=1,GW=25),
'Step Trail · Step Text':dict(Mon=6),
'base badge status':dict(B2C=21,MW=14),'base badge counter · сounter':dict(B2C=10),'badge/30px':dict(MA=10),
'Separator':dict(Mon=9),
'StatisticCard · Currency Item · Account':dict(GW=26,MW=18),
'baseFocus':dict(MW=21,B2B=67),
'base EMCD Logo · Logotype · ic-emcd-icon':dict(Mon=128,MW=67,MA=293,US=25,FW=4,GW=13,GA=7),
'Системное: Keyboard, home indicator, status bar, Cursor, hand':dict(MA=264,US=14,GA=48,GW=35,B2C=3,Mon=19,MW=23,B2B=5),
'Иллюстрации: .Onboarding image, .app icon, picture slot, Fixed Aspect Ratio, Iconly Pro, .chart, Chip (Firmware)':dict(MA=27,US=7,MW=15,Mon=13,GW=10,GA=1,FW=101),
'Иконки — алиасы (corner-small-*, profile, pen-edit, lines-menu, kebab-x3, close-small, eye-open, check-small, smbl-status-*, bonkcoin, qr_small, arrow select_list_down, calc, …)':dict(MA=260,MW=270,Mon=290,B2B=98,B2C=130,US=35,FW=12,GW=7,GA=4),
}
TGT={
'Sidebar item':('Nav item','Организм','нужна карта: selected → Selected, иконка → слот, подпись','нужна карта'),
'sidebar / default · .🔸 fm sidebar · SideMenu':('Sidebar','Организм','как на майнинге Web (Sidebar DS, баланс / CHW не переносим)','нужна карта'),
'baseCheckbox · checkbox · Checkbox':('Checkbox','Атом','status active/default → Checked, disable → Disabled, danger → Error; with box=false → без подписи','нужна карта'),
'baseToggle · toggle':('Toggle','Атом','active → On, size → S/M, disable','нужна карта'),
'Radiogroup':('Radio (List item + Radio)','Молекула','как «Ручной вывод» App: List item + Radio','нужна карта'),
'tab item · tabs/x · navbar-item · Menu Item (Geometria)':('Tab','Атом','active → Selected, размер по высоте','нужна карта'),
'#Submenu tab':('Tab (S)','Атом','подменю — Tab S внутри Tabs; Active → Selected','нужна карта'),
'tabs · base tabbar --1.5 · tabs / fix · TabMenu · Tab menu · Navigation submenu · navbar-lvl-2':('Tabs','Молекула','контейнер вкладок; App — «Tabs · прокрутка» (как майнинг App)','нужна карта'),
'baseChip / base --1.5':('Chip','Атом','active → Selected, size → S/M, disable','нужна карта'),
'base segmented picker item / text (без группы) · SegmentedPicker · ViewSelector':('Segmented','Молекула','одиночные item собрать в Segmented по родителю','нужна карта'),
'input · baseInput · Input · #corner input':('Input','Молекула','type (with label / without) → Label position; size по высоте 48/56/64; state → State; .field.left/right → слоты','нужна карта'),
'Input & Select · input & select · input / --password (Geometria)':('Input / Select','Молекула','Filled → State Filled, Error → Error, Copy Link → слот Trailing (copy)','нужна карта'),
'Select White (Geometria)':('Select','Молекула','—','нужна карта'),
'.field.left · .field.right (части поля)':('Input — слоты Leading / Trailing','Часть','уходят вместе с полем','вместе с Input'),
'Button / Desktop · Buttons / Desktop-tablet':('Button / Icon button','Атом','ещё один legacy-набор кнопок майнинга (Type/Size/Icon/State) — дописать в правила Button','нужна карта'),
'Links':('Button · Text','Атом','Size → XS/S, Active → акцент','нужна карта'),
'base overlay · overlay · Overlay':('Overlay (surface/overlay)','Часть','прямоугольник с токеном, компонента не нужно','нужна карта'),
'base modal header / footer · modal content · modal footer · Modal bar · Modal · modal header / fullscreen':('Modal / Sheet','Организм','Web — Modal (header / body / footer); App — Sheet','нужна карта'),
'Accordion · accordion --1.5 · GroupItem':('Accordion','Молекула','Collapsed → Open; GroupItem (Openned) — Accordion со списком','нужна карта'),
'base notification · Notifications':('Toast / List item','Молекула','base notification → Toast; Notifications (центр уведомлений) → List item','нужна карта'),
'base Banner --2.0':('Banner','Молекула','—','нужна карта'),'tooltip':('Tooltip','Молекула','—','нужна карта'),
'avatar · avatar group line':('Avatar / Avatar group','Атом','как Avatar group на Web','нужна карта'),
'List · Coinhold list item · Row · Cell · Summ item':('List item','Молекула','как майнинг App (List item M, Amount trailing)','нужна карта'),
'Content · Left · Right · Left addon · Right slot (части строк)':('List item — слоты','Часть','уходят вместе со строкой','вместе с List item'),
'cell · line · stroke · table / * · table title / *':('Table cell / Table row / Table header cell','Организм','таблицы майнинга Web; сначала проверить Table DS на 1–2 экранах','нужна карта'),
'tabbar · BottomNavi · ic_tabbar_stage':('Tab bar','Организм','как майнинг App (Tab bar)','нужна карта'),
'navigation bar · Navbar mobile · Toolbar · //title':('Top bar','Организм','как майнинг App (Top bar Root / Inner)','нужна карта'),
'Navbar · Header · Header-title · Subheader':('Page header','Организм','—','нужна карта'),
'Step Trail · Step Text':('Stepper','Молекула','—','нужна карта'),
'base badge status':('Status (точка)','Атом','status → Tone','нужна карта'),'base badge counter · сounter':('Counter','Атом','—','нужна карта'),'badge/30px':('Badge','Атом','—','нужна карта'),
'Separator':('Divider','Атом','—','нужна карта'),
'StatisticCard · Currency Item · Account':('Stat card / Balance widget','Организм','проверить по месту','решить'),
'baseFocus':('— (кольцо фокуса встроено в DS)','Часть','удалить слой','нужна карта'),
'base EMCD Logo · Logotype · ic-emcd-icon':('Логотип (Illustrations)','—','оставить как есть, бренд','оставить'),
'Системное: Keyboard, home indicator, status bar, Cursor, hand':('— (системное iOS / макет)','—','оставить','оставить'),
'Иллюстрации: .Onboarding image, .app icon, picture slot, Fixed Aspect Ratio, Iconly Pro, .chart, Chip (Firmware)':('— (иллюстрации)','—','оставить; Iconly Pro — проверить замену на DS Icons','оставить'),
'Иконки — алиасы (corner-small-*, profile, pen-edit, lines-menu, kebab-x3, close-small, eye-open, check-small, smbl-status-*, bonkcoin, qr_small, arrow select_list_down, calc, …)':('DS Icons','Иконка','chevron-*, user, edit, menu, more-horizontal, close, eye, check, check-circle / alert-circle, ¤bonk, qr, chevron-down, calculator; суффиксы -x2/-x3','алиасы'),
}
rows=[]
for kind,leg,ds,cat,rule in AUTO:
  d=done.get(kind,{}); rows.append(dict(legacy=leg,ds2=ds,cat=cat,status='заменено',rule=rule,**{p:d.get(p,0) for p in P}))
for leg,d in INV.items():
  ds,cat,rule,st=TGT[leg]; rows.append(dict(legacy=leg,ds2=ds,cat=cat,status=st,rule=rule,**{p:d.get([k for k,v in ab.items() if v==p][0],0) for p in P}))
for r in rows: r['total']=sum(r[p] for p in P)
order={'заменено':0,'алиасы':1,'нужна карта':2,'вместе с Input':3,'вместе с List item':3,'решить':4,'оставить':5}
rows.sort(key=lambda r:(order[r['status']],-r['total']))
cols=['legacy','ds2','cat','status','total']+P+['rule']
with open('/srv/emcd-design-tokens/docs/migration/component-map-all.csv','w',newline='') as f:
  w=csv.DictWriter(f,fieldnames=cols); w.writeheader(); [w.writerow(r) for r in rows]
json.dump(dict(cols=cols,rows=rows,P=P),open('build/component-map.json','w'),ensure_ascii=False)
from collections import Counter
c=Counter(); 
for r in rows: c[r['status']]+=r['total']
print(len(rows),dict(c))
