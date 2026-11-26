#!/usr/bin/env python3
"""Итоговые таблицы миграции (26.11) для Стефана: 1) цвета → токены, 2) production-компоненты → DS 2.0.
Колонка «Как сделать» — для решений Стефана: пусто = оставляем как есть.
Вход: docs/migration/foundations-color.csv (scripts/color-migration.py) + правила общего файла (ниже); счётчики — прогоны 25–26.11 в общем файле.
Выход: docs/migration/table-colors.csv, docs/migration/table-components.csv."""
import csv
from pathlib import Path
R = Path(__file__).resolve().parent.parent
P = ['Mining Web','Mining App','Monitoring','WL B2B','WL B2C','Geometria Web','Geometria App','Mining US','Firmware']
AB = {'MW':'Mining Web','MA':'Mining App','Mon':'Monitoring','B2B':'WL B2B','B2C':'WL B2C','GW':'Geometria Web','GA':'Geometria App','US':'Mining US','FW':'Firmware'}

# ---------- 2. Компоненты ----------
# (уровень, legacy, DS 2.0, статус, {продукт: число}, правило / отличие от production)
C = [
 # заменено
 ('Атом','baseButton · Button (DS Web / DS App / Geometria)','Button / Icon button','заменено',dict(Mon=602,GW=134,GA=40,B2B=106,B2C=147,US=54,FW=32,MW=645,MA=395),'Type: Secondary base → Tertiary, Stroke → Tertiary outline, Error → Primary Danger, Link / Text → Text; Geometria Secondary / Tertiary / Disabled; размер 24 / 32 / 40 / 48 по высоте (36 → 32, шкала DS); без подписи → Icon button; серый Primary → Tertiary'),
 ('Атом','Links','Button · Type=Text','заменено',dict(GA=8,US=16,B2C=4,GW=6,MW=17,MA=62),'решение 26.11: ссылка-действие — текстовая кнопка, отдельного Link нет'),
 ('Атом','Переключатель языка RU / EN (кнопка с серой заливкой поверх)','Select compact','заменено',dict(Mon=93,B2B=26,B2C=27,GA=2,US=4,FW=4,MW=22,MA=29),'правило: Button не перекрашиваем; язык — Select compact'),
 ('Атом','base badge / <tone> · Badge (App)','Badge','заменено',dict(Mon=221,B2C=212,US=16,FW=13,GW=6,MW=161,MA=196),'neutral / brand / danger / success / warning → Neutral / Accent / Danger / Success / Warning; filled → Solid'),
 ('Атом','base badge counter · сounter · Counter badge','Badge · Content=Number','заменено',dict(B2C=10,MW=6,MA=4),'Counter слит в Badge (22.11)'),
 ('Атом','base badge status (точка 8 px)','Status без подписи','заменено',dict(B2C=21,Mon=1,MW=14),''),
 ('Атом','Sidebar item','Nav item','заменено',dict(Mon=574,US=40,FW=17,MW=137,MA=8),'подпись, иконка, выбранный; текст бейджа («14% APY», «New») — во вложенном Badge, при замене не перенесён'),
 ('Атом','baseCheckbox · checkbox · Checkbox','Checkbox (без подписи)','заменено',dict(Mon=396,B2B=61,GA=1,FW=1,B2C=11,GW=4,MW=28,MA=55),'рамка видна всегда, в таблицах тоже (решение 26.11); legacy with box=false (рамка при наведении) не переносим'),
 ('Атом','baseToggle · toggle','Toggle (без подписи)','заменено',dict(Mon=9,B2B=5,US=18,B2C=18,MW=129,MA=8),'включённый — accent (как в DS)'),
 ('Атом','base tab item · tab item · tabs/x · navbar-item · #Submenu tab · Menu Item (Geometria)','Tab','заменено',dict(Mon=546,GA=4,US=25,B2C=26,GW=29,MW=588,MA=49),'S 32 / M 48 / L 56 по высоте; подменю — M'),
 ('Атом','baseChip / base --1.5 · Period selector item','Chip','заменено',dict(Mon=138,B2C=39,MW=125,MA=95,GW=12,B2B=18,US=7),''),
 ('Атом','base avatar / single · avatar','Avatar','заменено',dict(Mon=7,B2B=25,MW=9),''),
 ('Атом','Separator','Divider','заменено',dict(B2C=1,Mon=9,MW=12,MA=1),''),
 ('Молекула','input · baseInput · Input · Input & Select · input & select · Selector + Input · Select White','Input / Select / Search / Password field','заменено',dict(Mon=70,GW=178,GA=52,B2B=28,B2C=33,US=13,FW=33,MW=239,MA=106),'Size M 40 / L 48 (решение 26.11; в продуктах 56 и 64); подпись всегда видна — на рамке (плейсхолдер её не заменяет); с шевроном → Select, с лупой → Search, с глазом → Password field (вложенный Input открыт, Publish 26.11 — размер и подпись как у соседних полей); в Light — белое с обводкой'),
 ('Молекула','Selector small · dropdown','Select compact','заменено',dict(Mon=114,B2B=14,B2C=82,US=4,GA=1,MW=71,MA=38),''),
 ('Молекула','Search','Search','заменено',dict(Mon=11,B2B=26,GA=1,MW=39,MA=4),''),
 ('Молекула','Dropdown item','Menu item','заменено',dict(Mon=30,B2B=6,MW=136,MA=14),''),
 ('Молекула','DateRange.Field','Date range field','заменено',dict(Mon=2,B2C=7,MW=15,MA=3),''),
 ('Молекула','base segmented picker group','Segmented','заменено',dict(Mon=7,B2C=8,MW=57,MA=2),'сегменты делят ширину поровну (набор исправлен и опубликован 26.11)'),
 ('Молекула','Accordion · accordion --1.5','Accordion','заменено',dict(Mon=17,GW=5,GA=5,US=4,MW=68,MA=102),'Open = !Collapsed; текст раскрытого — в слот; M на Compact, L на Web'),
 ('Молекула','List (App) · Coinhold-строки в App · строки с toggle','List item M · Toggle M','заменено',dict(MA=316,US=14),'Amount справа (сумма начисления зелёная — Amount Positive); строка с toggle → Toggle с описанием'),
 ('Организм','tabs (App, полоса tabs/x)','Tabs M','заменено',dict(MA=41),'вкладки делят ширину или прокрутка; подпись 14 вместо 16 (Tabs M)'),
 ('Иконка','ic-* · smbl-* · монеты','DS Icons · symbol/coin','заменено',dict(Mon=4631,GW=1353,GA=297,B2B=531,B2C=1215,US=655,FW=348,MW=9982,MA=3047),'размер прежний, цвет — переменная DS; +35 алиасов 26.11 (corner-small → chevron, profile → user …); соцсети и магазины → Logo (Mono), icon/social и icon/store удалены 26.11; знак EMCD — Brand logo'),
 # осталось
 ('Атом','avatar group line','Avatar group','заменено',dict(B2C=13,US=9,Mon=3,MW=63,MA=12),'Person: Count 2 / 3 / 4, Size S — набор дополнен и опубликован 26.11; размер по аватару (XS 20 · S 24 · M 32 · L 40), нахлёст 20 %; в коде — AvatarGroup (React / Vue)'),
 ('Атом','baseRadio · Radiogroup · Radio','Radio · List item + Radio','нужна карта',dict(Mon=2,MW=13,MA=74,GW=1),''),
 ('Атом','Switch · baseCheckbox with text','Toggle · Checkbox с подписью','нужна карта',dict(MA=6,GW=1,MW=5),''),
 ('Атом','badge/30px · table / badge · .🔸 badge','Badge','нужна карта',dict(MA=10,MW=8,B2C=1),''),
 ('Атом','Button / Desktop · Buttons / Desktop-tablet · Button / Mobile · button float · button xsmall','Button / Icon button / Floating button','нужна карта',dict(MW=114,US=5,GW=3,MA=10),'ещё один legacy-набор кнопок майнинга (Type / Size / Icon / State)'),
 ('Атом','baseCircleLoader · base divider layout · empty state','Progress circle · Divider · Empty state','нужна карта',dict(Mon=1,MA=2,MW=8),''),
 ('Молекула','base segmented picker item / text (без группы) · SegmentedPicker · ViewSelector','Segmented','нужна карта',dict(Mon=45,B2B=31,B2C=6,MW=6,GW=11),'одиночные сегменты собрать в Segmented по родителю'),
 ('Молекула','Input amount · input amount · search · Dropdown · Slider','Input amount · Search · Select · Slider','нужна карта',dict(MA=8,MW=9),''),
 ('Молекула','base notification · Notifications · Notification Center · informer','Toast · Notification','нужна карта',dict(Mon=7,B2B=2,MW=5,B2C=2,GA=1,GW=3,MA=3),''),
 ('Молекула','tooltip · base tooltip · tooltip tour · Onboarding tooltip','Tooltip · Tooltip tour','нужна карта',dict(Mon=3,MW=13,MA=2,FW=1),''),
 ('Молекула','Step Trail · Step Text · Step Symbol · slider counter','Step progress · Step','нужна карта',dict(Mon=8),''),
 ('Молекула','base Banner --2.0 · baseCard / banner','Suggest','нужна карта',dict(FW=1,MW=1),'Banner и Alert в DS 2.0 — deprecated (→ Suggest / Toast)'),
 ('Часть','.field.left · .field.right · #corner input · .period','слоты Input (Leading / Trailing)','решить',dict(Mon=138,B2B=35,B2C=39,GA=1,GW=1,MW=35,MA=28),'остатки рядом с заменёнными полями: удалить или перенести в слот'),
 ('Часть','Content · Left · Right · Left addon · Right slot · label · .text (части строк)','слоты List item','вместе с List item',dict(Mon=57,B2B=4,B2C=30,GW=65,US=14,MW=265,MA=239),'уходят вместе со строкой'),
 ('Организм','Coinhold list item · Row · Cell · Summ item · CH card · List · list','List item · Card','нужна карта',dict(Mon=10,MW=20,MA=28,GA=11,GW=44),''),
 ('Организм','tabs · tabs / fix · Navigation submenu · base tabbar --1.5 · navbar-lvl-2 · navbar tab · Tab menu','Tabs','нужна карта',dict(MA=35,US=8,Mon=9,MW=46,B2C=34,GA=3,GW=5),'контейнеры, где вкладки не tabs/x; полоса Web — Tabs L, подменю — второй уровень'),
 ('Организм','sidebar / default · sidebar · .🔸 fm sidebar · SideMenu · Sidebar banner','Sidebar','нужна карта',dict(MW=146,US=6,Mon=1,GW=17,FW=2),'баланс и кнопки CHW — вне DS (решение); бейджи пунктов — в Nav item'),
 ('Организм','Navbar mobile · Navbar desktop · Toolbar · navigation bar · //title · Header · Headers / Main pages','Top bar · Page header','нужна карта',dict(MW=83,Mon=1,MA=53,US=3,B2C=2,GW=27,FW=1),''),
 ('Организм','tabbar · --2.0-- tabbar · ic_tabbar_stage · BottomNavi','Tab bar','нужна карта',dict(MA=96,US=5,MW=6,GA=9,GW=14),''),
 ('Организм','base modal header / footer · modal content · Modal bar · modal footer · Modal · Mobile Modal','Modal (Web) · Sheet (App)','нужна карта',dict(Mon=27,B2B=3,B2C=6,GA=2,GW=5,MW=43,MA=62),'legacy собран из отдельных частей'),
 ('Организм','base overlay · overlay · Overlay','surface/overlay (подложка)','нужна карта',dict(Mon=52,B2B=12,B2C=15,MW=25,MA=16,FW=3),'прямоугольник с токеном, компонента не нужно'),
 ('Организм','cell · line · stroke · table / * · table title / * · header-table','Table cell · Table row · Table header cell','нужна карта',dict(MW=672,US=14),'таблицы майнинга Web'),
 ('Виджет','Account · StatisticCard · Currency Item · Profile block · AuthorizationWidget · SettingsVerification · GroupItem · TaskCard','Stat card · Balance widget · конструкции','решить',dict(MW=18,GW=55,GA=8,B2C=2,Mon=3),'продуктовые виджеты: собрать из DS или оставить продукту'),
 ('Иконка','icon · #icon · ic-* без пары в DS','DS Icons','решить',dict(Mon=109,B2B=30,B2C=62,MA=173,MW=90,US=9,FW=2,GA=2),'нет в Icons: добавить или подобрать замену'),
 ('—','base EMCD Logo · Logotype · ic-emcd-icon','логотип / Nav icon (Expressive)','оставить',dict(Mon=128,MW=65,MA=291,US=23,FW=4,GW=17,GA=7),'бренд'),
 ('—','home indicator · status bar · Keyboard · Cursor · hand','системное (iOS / макет)','оставить',dict(MA=270,GA=47,GW=38,US=15,MW=62,Mon=21,B2B=5,B2C=2),''),
 ('—','.Onboarding image · .app icon · picture slot · Photo · Iconly Pro · .chart · Chip (Firmware)','иллюстрации','оставить',dict(MA=31,US=7,MW=46,Mon=15,GW=10,GA=1,FW=101,B2C=1),''),
 # 26.11: компоненты DS 2.0, которых не было в таблице — с legacy-парой → нужна карта, без пары → новый в DS 2.0
 ('Молекула','DataPicker · DateRange.Panel · PeriodGrid · PeriodPresets · PeriodGridItem','Date range panel · Calendar · Date cell','нужна карта',{},''),
 ('Организм','bar widget · graphics · data pointer · layout / tooltip','Chart card · Chart plot · Chart crosshair · Chart tooltip · Chart metric · Marker','нужна карта',{},''),
 ('Молекула','legends','Legend item','нужна карта',{},''),
 ('Атом','—','Sparkline','новый в DS 2.0',{},''),
 ('Молекула','multiselect_input · Selectable list item','Multiselect · Multiselect option · Dropdown panel','нужна карта',{},''),
 ('Атом','base carousel indicator','Page indicator · Promo carousel','нужна карта',{},''),
 ('Молекула','— (промо-баннеры продуктов)','Promo card','новый в DS 2.0',{},''),
 ('Атом','base scrollbar · scroll controller','Scrollbar','нужна карта',{},''),
 ('Молекула','sum list item (App)','Key-value row','нужна карта',{},''),
 ('Организм','txn-card-history (App)','Transaction','нужна карта',{},''),
 ('Организм','Success screen · Status screen (App)','Status screen · Status summary','нужна карта',{},''),
 ('Атом','Progress RTL · baseProgressCircle (App)','Progress','нужна карта',{},''),
 ('Молекула','— (textarea)','Textarea','новый в DS 2.0',{},''),
 ('Молекула','— (код подтверждения)','Code input · Code cell','новый в DS 2.0',{},''),
 ('Молекула','— (загрузка файла)','File upload','новый в DS 2.0',{},''),
 ('Молекула','— (пагинация)','Pagination · Pagination item','новый в DS 2.0',{},''),
 ('Молекула','— (хлебные крошки)','Breadcrumbs · Breadcrumb item','новый в DS 2.0',{},''),
 ('Молекула','— (адрес кошелька)','Address','новый в DS 2.0',{},''),
 ('Атом','— (shimmer в коде App)','Skeleton','новый в DS 2.0',{},''),
 ('Молекула','— (заголовок секции)','Section header','новый в DS 2.0',{},''),
 ('Молекула','— (группа выбора)','Selection group · Radio card','новый в DS 2.0',{},''),
 ('Организм','— (панель действий)','Action bar · Bulk action bar','новый в DS 2.0',{},''),
 ('Организм','— (боковая панель)','Side panel','новый в DS 2.0',{},''),
 ('—','status bar · home indicator (iOS / Android)','Status bar','новый в DS 2.0',{},'Стефан 26.11: системные обвязки платформ затащить в DS'),
]
def keep_how(path, key):  # 26.11: ответы Стефана в «Как сделать» не затираем при пересборке
    try: return {r[key]: r['Как сделать'] for r in csv.DictReader(open(path)) if r.get('Как сделать')}
    except FileNotFoundError: return {}
HOW_C = keep_how(R/'docs/migration/table-components.csv', 'Production (legacy)')
HOW_K = keep_how(R/'docs/migration/table-colors.csv', 'Legacy')
rows = []
for lvl, leg, ds, st, d, rule in C:
    n = {AB[k]: v for k, v in d.items()}
    rows.append([lvl, leg, ds, st, HOW_C.get(leg, ''), sum(n.values()), rule] + [n.get(p, '') for p in P])
with open(R/'docs/migration/table-components.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['Уровень','Production (legacy)','DS 2.0','Статус','Как сделать','Всего','Правило / отличие от production'] + P); w.writerows(rows)

# ---------- 1. Цвета ----------
src = list(csv.DictReader(open(R/'docs/migration/foundations-color.csv')))
out = []
for r in src:
    dE = ' / '.join(x for x in [r['dE_light'], r['dE_dark']] if x)
    out.append([r['source'], r['legacy'], r['role'], r['target'], r['action'], '', r['before_light'], r['after_light'], r['before_dark'], r['after_dark'], dE, r['status'], r['decision'], r['impact'], r['note']])
# правила общего файла (25–26.11): источники, которых нет в карте legacy, и сырые hex
X = [
 ('Geometria','Semantic/Text/Primary · Secondary · Tertiary · Placeholder','текст','text/primary · secondary · tertiary','Rule'),
 ('Geometria','Semantic/Text/Link','ссылка / кнопка / обводка','text/link · action/primary/default · border/accent','Split'),
 ('Geometria','Semantic/Border/Primary · Secondary · Link','обводка','border/subtle · border/strong · border/accent','Rule'),
 ('Geometria','Semantic/Status/Process · Danger · Success · Warning','статус','accent/subtle · status/*/solid (текст — text/*)','Rule'),
 ('Geometria','Components/Button/Primary · Secondary · Tertiary · Disabled · Danger / Background','кнопка','action/primary · secondary · secondary (Tertiary серая) · disabled · danger','Rule'),
 ('Geometria','Components/Input/Background · Border · BorderTyping','поле','control/surface/default · control/border/default · control/border/focus','Rule'),
 ('Geometria','Components/Modal/Overlay · Core/Brand/ElectricGreen','подложка · акцент','surface/overlay · highlight/solid','Rule'),
 ('Geometria','Components/Logo/*','логотип','не трогаем','Keep'),
 ('Geometria','Semantic/Background/* · Semantic/Icon/*','фон · иконка','по значению (Light): уровни surface, icon/*','Value'),
 ('WL B2B / WL B2C','pallete gray/* · white/* · violet/*','фон / текст / обводка','по значению с учётом темы (Light / Dark)','Value'),
 ('Все продукты','Basic color Neutral/* · Green/* · Light/*','фон / текст','по значению; насыщенные (графики) — оставлены','Value'),
 ('Firmware','EMCD Web demo · source CSS (web/text-*, web/bg-*)','фон / текст','по значению (Dark)','Value'),
 ('Тёмные продукты','сырой hex #0a0a0a · #111111 · #1a1a1a · #232323 · #2d2d2d (фон)','фон','surface/level-0 · 1 · 2 · 3 · control/track','Raw hex'),
 ('Тёмные продукты','сырой hex #fafafa · #d0d0d0 · #a3a3a3 · #7a7a7a · #4d4d4d (текст / иконка)','текст / иконка','text|icon/primary · secondary · secondary · tertiary · disabled','Raw hex'),
 ('Тёмные продукты','сырой hex #8f42ff · #43a047 · #e53935 · #f59e0b','акцент / статус','action/primary · text/accent · success · danger · warning','Raw hex'),
 ('Все продукты','насыщенные цвета графиков без переменной DS','графики','оставлены как есть (нет токенов chart/*)','Keep'),
]
for s_, leg, role, tgt, act in X:
    out.append([s_, leg, role, tgt, act, '', '', '', '', '', '', 'общий файл 25–26.11', '', '', 'правило скрипта color-swap / raw-hex'])
# ---------- решения Стефана 26.11 ----------
# 1) отдельные hover-цвета → основной цвет + слой состояний 6 % (своих hover-токенов нет)
# 2) без потребителей / без пары → блок «Удалено» внизу (не мигрируем)
# 3) «по роли слоя» → разложено на строки «семейство + роль → токен» (правила color-swap byValue + скан общего файла 26.11)
# 4) Geometria: свой accent (#1470ff → #105fdb), статусы и нейтральные — общие EMCD; Color 3 / 4 [Text] — по значению
HOVER = {'Brand fill hover','Success hover / Green [Hover]','Attention hover','Geo App · Pallete/Brand fill hover','Geo App · Pallete/Green [Hover]','background/brand/bold-1'}
GONE = {'accent soft','accent bold','accent background','Back [Primary] 2','Geo App · Pallete/Inactive [Back]'}
DUP = {'Monitoring · pallete/violet/200','Monitoring · pallete/red/200','Monitoring · pallete/orange/200','Monitoring · pallete/green/300','Monitoring · Collection 1/Color 1 [Text]','Web App · Text Color 3','Geo · Pallete/Semantic/* (копия legacy Color)'}
D26 = 'решение 26.11'
def role(src, leg, rl, tgt, note):
    return [src, leg, rl, tgt, 'Split', '', '', '', '', '', '', '=', D26 + ': по роли слоя', '', note]
SPLIT = {
 'Basic color · Neutral/* напрямую': [
  role('Core','Basic color · Neutral/*','текст / иконка (тёмные продукты)','text|icon/primary · secondary · tertiary · disabled','по яркости: светлее #d9 → primary · #8c–#d9 → secondary · #59–#8c → tertiary · темнее → disabled'),
  role('Core','Basic color · Neutral/*','текст / иконка (светлые: WL, Geo, сайт)','text|icon/primary · secondary · tertiary · disabled · on-accent','темнее #33 → primary · до #73 → secondary · до #a6 → tertiary · светлее → disabled; почти белый на акценте → on-accent'),
  role('Core','Basic color · Neutral/*','обводка','border/strong · border/subtle','непрозрачная контрастная (светлая на тёмном / тёмная на светлом) → strong, остальные → subtle'),
  role('Core','Basic color · Neutral/*','фон (тёмные продукты)','surface/level-0 · 1 · 2 · 3 · action/secondary/default','до #0d → L0 · до #16 → L1 · до #1f → L2 · до #33 → L3 · светлее → action/secondary; полупрозрачный → L2'),
  role('Core','Basic color · Neutral/*','фон (светлые продукты)','surface/level-1 · 0 · 3 · inverse · action/secondary/default','#fe+ → L1 · светлее #f2 → L0 · светлее #e6 → L3 · тёмный → inverse · остальные → action/secondary'),
 ],
 'Basic color · Green / Red / Amber/* напрямую': [
  role('Core','Basic color · Green / Red / Amber · Orange · Sky · Violet','текст','text/success · danger · warning · info · accent','по оттенку (Green → success, Red → danger, Amber / Orange → warning, Sky / Blue → info, Violet → accent)'),
  role('Core','Basic color · Green / Red / Amber · Orange · Sky · Violet','иконка','icon/success · danger · warning · info · accent','скан 26.11: Orange/300 в иконках (MW, MA, Mon, FW, US), Green/300'),
  role('Core','Basic color · Green / Red / Amber · Orange · Sky · Violet','фон насыщенный (500–700)','status/*/solid · Violet → action/primary/default','скан 26.11: Amber/500, Green/700, Violet/500 (WL B2B), Sky/500'),
  role('Core','Basic color · Green / Red / Amber · Orange · Sky · Violet','фон-тинт (50–200 / 800–900)','status/*/subtle · Violet → accent/subtle',''),
 ],
 'Basic color · Yellow/500': [['Core','Basic color · Yellow/500','','highlight/solid','Merge','','','#ebff00','#ebff00','#ebff00','0.0','=',D26,'Web App 28 · App 28 · WL B2B 21','текст на нём — text/on-highlight']],
 'WL B2B · pallete/*-300 (9 серий графиков)': [
  role('WL B2B','WL B2B · pallete/*/300 · green/400','серии графиков','data/1 … data/8','по порядку серий: violet → 1 · green → 2 · orange → 3 · red → 4 · pink → 5 · amber → 6 · blue → 7 · myata / mint → 8; 9-я серия — повтор data/8 с штриховкой (скан 26.11: ~800 заливок)'),
 ],
 'WL B2B · pallete/*-600…800 (тинты)': [
  role('WL B2B','WL B2B · pallete/*/600–800','тинты статусов и тегов','status/success · danger · warning · info/subtle · accent/subtle','по оттенку: green → success · red → danger · orange / amber → warning · blue → info · violet → accent'),
  role('WL B2B','WL B2B · pallete red/200 · green/300 · violet/200','текст','text/danger · text/success · text/accent','скан 26.11: 85 текстов (суммы, статусы)'),
 ],
 'Geo · Variable collection/* (Black / Green / Bright white / Electric Blue)': [
  role('Geo','Geo · Variable collection/Black','текст / иконка · фон','text|icon/primary · surface/inverse',''),
  role('Geo','Geo · Variable collection/Bright white','фон · текст на акценте','surface/level-1 · text/on-accent',''),
  role('Geo','Geo · Variable collection/Electric Blue','заливка · текст / иконка','action/primary/default · text|icon/accent','Geo accent (бренд Geometria)'),
  role('Geo','Geo · Variable collection/Green','акцент-маркер','highlight/solid','как Core/Brand/ElectricGreen'),
 ],
 'Monitoring · Variables/Theme/* (внешний UI-кит)': [
  role('Product','Monitoring · Theme/text-primary · text-secondary','текст','text/primary · text/secondary','скан 26.11: в общем файле не осталось — заменено по значению'),
  role('Product','Monitoring · Theme/primary-main · action-selected','заливка · выбранная строка','action/primary/default · state/layer@10',''),
 ],
}
fin, gone = [], []
for r in out:
    leg = r[1]
    if leg in SPLIT: fin += SPLIT[leg]; continue
    if leg == 'Basic color Neutral/* · Green/* · Light/*': continue  # заменено разложенными строками выше
    if leg in GONE: r[4] = 'Удалено'; r[11] = '—'; r[12] = D26 + ': не мигрируем (нет потребителей / только old-страницы)'; gone.append(r); continue
    if leg in HOVER: r[4] = 'Merge'; r[3] = r[3].replace('+layer@6', ' + state/layer@6'); r[12] = D26 + ': hover = основной цвет + слой 6 %'
    if leg in DUP: r[4] = 'Merge'; r[12] = D26 + ': локальный дубль → токен'
    if r[0].startswith('Geo') and not r[12]: r[12] = D26 + ': Geo — свой accent, статусы и нейтральные EMCD'
    fin.append(r)
out = fin + gone
for r in out: r[5] = r[5] or HOW_K.get(r[1], '')
with open(R/'docs/migration/table-colors.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['Источник','Legacy','Роль','Токен DS 2.0','Действие','Как сделать','Light до','Light после','Dark до','Dark после','ΔE (L / D)','Статус','Решение','Где используется','Примечание']); w.writerows(out)
print('components', len(rows), 'colors', len(out))
