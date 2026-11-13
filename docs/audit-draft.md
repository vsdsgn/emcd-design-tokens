# Аудит draft-наборов (2026-11-13)

Собрано `scripts/draft-audit.mjs` из `docs/ds-manifest.json` — править там, не здесь. Наборы в Figma не менялись.
Это проверка по манифесту, а не «Готово»: плагины `audit` и `variables-check`, стенд и контракт по каждому набору — при переводе в beta.

## Сводка

- Наборов не в beta: 97 (draft 94, без статуса 3: Card, Dot, _Tooltip arrow).
- Без замечаний по манифесту: 0.
- Наборов с замечанием: BOARD — 95, RAW — 78, DESC — 60, MINMAX — 38, PROPS — 17, AXES — 16, SERVICE — 10, MATRIX — 6.

Коды: DESC — разделы описания; MATRIX — неполная матрица осей; AXES — булева ось или Left / Right; PROPS — свойство привязано не во всех вариантах (часть — по делу: свойство есть только у вариантов со слотом); MINMAX — min / max числом; RAW — значения без переменной (часть — размеры служебных слоёв); SERVICE — у набора с Hover / Pressed / Focus нет служебных слоёв; BOARD — нет борды v3 или её разделов (у неинтерактивного набора разделы 04 «Состояния», 05 «Зоны» могут быть не нужны — решается при контракте).

## Атомы (25)

| Набор | Страница | Вариантов | Замечания |
|---|---|---|---|
| _Tooltip arrow | Tooltip | 2 | DESC: нет: Status: первой строкой, Когда использовать:, Правила:, A11y:<br>RAW: 4 (напр. `(root):w=26`, `(root):h=9`)<br>BOARD: нет разделов 12 |
| Amount | Amount | 12 | DESC: нет: Когда использовать:, Правила:<br>BOARD: нет разделов 05, 07, 08 |
| Avatar | Avatar | 12 | DESC: нет: A11y:<br>PROPS: Initials 4 из 12<br>RAW: 24 (напр. `(root):w=20`, `(root):h=20`)<br>BOARD: нет разделов 04, 05, 08, 12 |
| Card | Card | 72 | DESC: нет: Status: первой строкой, Когда использовать:, Правила:, A11y:<br>AXES: `Border` — булева ось (On \| Off)<br>RAW: 324 (напр. `(root):sw=1`, `(root):w=320`)<br>BOARD: нет разделов 04, 05, 07, 08, 12 |
| Chart axis label | Chart axis label | 8 | PROPS: Label 6 из 8<br>MINMAX: maxw=64<br>SERVICE: нет кольца фокуса, зоны нажатия, безопасного поля<br>BOARD: нет разделов 05, 07, 08, 12 |
| Circle timer | Circle timer | 8 | RAW: 48 (напр. `(root):w=16`, `(root):h=16`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Code cell | Code cell | 12 | DESC: нет: Когда использовать:, Правила:, A11y:<br>RAW: 28 (напр. `(root):w=64`, `(root):h=68`)<br>SERVICE: нет зоны нажатия, безопасного поля<br>BOARD: нет разделов 04, 05, 07, 12 |
| Coin | Coin | 10 | AXES: `Network` — булева ось (Off \| On)<br>RAW: 30 (напр. `(root):w=16`, `(root):h=16`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Date cell | Date cell | 10 | DESC: нет: Когда использовать:, Правила:, A11y:<br>RAW: 40 (напр. `(root):w=40`, `(root):h=40`)<br>BOARD: нет разделов 07, 12 |
| Divider | Divider | 6 | DESC: нет: Правила:, A11y:<br>MATRIX: 6 из 8<br>AXES: `Label` — булева ось (Off \| On)<br>PROPS: Label text 1 из 6<br>RAW: 11 (напр. `(root):w=320`, `(root):w=1`)<br>BOARD: нет разделов 04, 05, 07, 08, 12 |
| Dot | Status | 10 | DESC: нет: Status: первой строкой, Когда использовать:, Правила:, A11y:<br>BOARD: нет разделов 05, 07 |
| Legend swatch | Legend swatch | 16 | RAW: 32 (напр. `(root):w=12`, `(root):h=12`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Multiselect option | Multiselect | 4 | RAW: 4 (напр. `(root):w=280`)<br>BOARD: нет разделов 07, 08 |
| Overlay | Overlay | 2 | AXES: `Blur` — булева ось (Off \| On)<br>RAW: 4 (напр. `(root):w=480`, `(root):h=320`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Page dot | Page dot | 2 | DESC: нет: Когда использовать:, Правила:, A11y:<br>AXES: `Selected` — булева ось (Off \| On)<br>RAW: 4 (напр. `(root):w=6`, `(root):h=6`)<br>BOARD: нет разделов 04, 05, 07, 12 |
| Pagination item | Pagination item | 10 | DESC: нет: Когда использовать:, Правила:<br>MINMAX: minw=32, minw=40<br>RAW: 40 (напр. `(root):w=32`, `(root):h=32`)<br>BOARD: нет разделов 07, 12 |
| Progress | Progress | 8 | RAW: 16 (напр. `(root):w=320`, `track:h=4`)<br>BOARD: нет разделов 04, 05, 07, 12 |
| Progress circle | Progress | 3 | DESC: нет: Когда использовать:, Правила:<br>PROPS: Value 2 из 3<br>RAW: 12 (напр. `(root):w=24`, `(root):h=24`)<br>BOARD: нет разделов 04, 05, 07, 12 |
| Scrollbar | Scrollbar | 6 | DESC: нет: Правила:<br>RAW: 24 (напр. `(root):w=12`, `(root):h=120`)<br>SERVICE: нет кольца фокуса, зоны нажатия, безопасного поля<br>BOARD: нет разделов 04, 05, 07, 12 |
| Skeleton | Skeleton | 7 | RAW: 14 (напр. `(root):w=200`, `(root):h=12`)<br>BOARD: нет разделов 04, 05, 07, 12 |
| Spinner | Progress | 3 | DESC: нет: Правила:, A11y:<br>RAW: 11 (напр. `track:o=0.2`, `track:w=16`)<br>BOARD: нет разделов 04, 05, 07, 12 |
| Step segment | Step segment | 3 | DESC: нет: Когда использовать:, Правила:, A11y:<br>RAW: 6 (напр. `(root):w=40`, `(root):h=4`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Step symbol | Step symbol | 12 | DESC: нет: Когда использовать:, Правила:, A11y:<br>PROPS: Number 3 из 12<br>RAW: 24 (напр. `(root):w=24`, `(root):h=24`)<br>BOARD: нет разделов 04, 05, 07, 12 |
| Step trail | Step trail | 6 | DESC: нет: Когда использовать:, Правила:, A11y:<br>RAW: 12 (напр. `(root):w=80`, `(root):h=24`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Tooltip | Tooltip | 24 | DESC: нет: Когда использовать:, Правила:, A11y:<br>AXES: `Placement` — Left / Right вместо Start / End<br>PROPS: Text 8 из 24<br>MINMAX: minw=58, maxw=320, minh=58<br>BOARD: нет разделов 12 |

## Молекулы (57)

| Набор | Страница | Вариантов | Замечания |
|---|---|---|---|
| Accordion | Accordion | 20 | DESC: нет: Правила:<br>AXES: `Open` — булева ось (Off \| On)<br>PROPS: Label 16 из 20<br>RAW: 60 (напр. `(root):w=400`, `hit area · web:w=400`)<br>BOARD: нет разделов 07 |
| Address | Address | 4 | DESC: нет: Когда использовать:, Правила:<br>RAW: 4 (напр. `(root):w=360`)<br>BOARD: нет разделов 05, 07, 08 |
| Avatar group | Avatar group | 6 | DESC: нет: Когда использовать:, Правила:, A11y:<br>AXES: `More` — булева ось (Off \| On)<br>RAW: 6 (напр. `(root):gap=-4`, `(root):gap=-6`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Breadcrumbs | Breadcrumbs | 3 | DESC: нет: Правила:<br>BOARD: нет разделов 05, 07, 08 |
| Chart crosshair | Chart crosshair | 2 | RAW: 5 (напр. `(root):w=24`, `(root):h=200`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Chart metric | Chart metric | 4 | MINMAX: maxw=240<br>BOARD: нет разделов 05, 07, 08, 12 |
| Chart tooltip | Chart tooltip | 4 | MINMAX: minw=168<br>BOARD: нет разделов 05, 07, 08, 12 |
| Checkbox group | Checkbox group | 12 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: maxw=480<br>BOARD: нет разделов 05, 07, 08 |
| Code input | Code input | 8 | DESC: нет: Когда использовать:, Правила:<br>MINMAX: maxw=400<br>BOARD: нет разделов 05, 07 |
| Coin stack | Coin stack | 9 | RAW: 9 (напр. `(root):gap=-6`, `(root):gap=-7`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Date range field | Date range field | 5 | MINMAX: minw=160<br>RAW: 15 (напр. `(root):w=320`, `hit area · web:w=320`)<br>BOARD: нет разделов 05, 07, 08 |
| Floating button | Floating button | 8 | DESC: нет: Правила:<br>RAW: 28 (напр. `(root):w=56`, `(root):h=56`)<br>BOARD: нет разделов 07, 08, 12 |
| Input addon / Clear | Input | 1 | DESC: нет: Когда использовать:, Правила:, A11y:<br>RAW: 5 (напр. `(root):w=20`, `(root):h=20`) |
| Input addon / Icon | Input | 1 | DESC: нет: Когда использовать:, Правила:, A11y: |
| Input amount | Input amount | 10 | AXES: `Filled` — булева ось (False \| True)<br>MINMAX: minw=160<br>RAW: 12 (напр. `(root):w=395`, `(root):sw=1`)<br>SERVICE: нет зоны нажатия, безопасного поля<br>BOARD: нет разделов 05, 07, 08 |
| Key-value row | Payout summary | 3 | DESC: нет: Когда использовать:, Правила:<br>RAW: 4 (напр. `(root):w=360`, `(root):sw=1`)<br>BOARD: нет разделов 05, 07, 08 |
| Legend item | Legend item | 4 | PROPS: Label 3 из 4; Value 3 из 4; Show value 3 из 4<br>MINMAX: maxw=160<br>RAW: 8 (напр. `hit area · web:w=68`, `hit area · web:h=24`)<br>BOARD: нет разделов 07, 08 |
| List item | List item | 64 | DESC: нет: Правила:<br>RAW: 64 (напр. `(root):w=375`)<br>BOARD: нет разделов 07, 08 |
| Menu item | Menu item | 16 | DESC: нет: Когда использовать:, Правила:<br>RAW: 16 (напр. `(root):w=290`)<br>BOARD: нет разделов 05, 07, 08 |
| Multiselect | Multiselect (контейнер) | 8 | RAW: 17 (напр. `(root):w=320`, `(root):gap=8`)<br>BOARD: нет разделов 05, 07, 08 |
| Nav item | Nav item | 8 | AXES: `Collapsed` — булева ось (Off \| On)<br>RAW: 32 (напр. `(root):w=218`, `(root):h=36`)<br>BOARD: нет разделов 07, 08 |
| Notification | Notification | 2 | DESC: нет: Когда использовать:, Правила:<br>MINMAX: maxw=400<br>BOARD: нет разделов 05, 07, 08 |
| Page indicator | Page indicator | 14 | DESC: нет: Правила:<br>MATRIX: 14 из 20<br>BOARD: нет разделов 05, 07, 08, 12 |
| Pagination | Pagination | 4 | DESC: нет: Правила:<br>BOARD: нет разделов 05, 07, 08, 12 |
| Password field | Password field | 4 | DESC: нет: Когда использовать:, Правила:<br>MINMAX: minw=160<br>RAW: 8 (напр. `(root):w=320`, `field:h=66`)<br>BOARD: нет разделов 05, 07, 08 |
| Promo card | Promo card | 4 | RAW: 14 (напр. `(root):sw=1`, `(root):w=222`)<br>BOARD: нет разделов 05, 07, 08 |
| Radio card | Radio card | 8 | AXES: `Status` — булева ось (Off \| On)<br>RAW: 16 (напр. `(root):sw=1`, `(root):w=400`)<br>SERVICE: нет зоны нажатия, безопасного поля<br>BOARD: нет разделов 05, 07, 08 |
| Radio group | Radio group | 12 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: maxw=480<br>BOARD: нет разделов 05, 07, 08 |
| Segmented | Segmented | 12 | RAW: 12 (напр. `(root):w=240`, `(root):w=280`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Select | Select | 24 | MINMAX: minw=160<br>SERVICE: нет зоны нажатия, безопасного поля<br>BOARD: нет разделов 05, 07, 08 |
| Select compact | Select | 5 | DESC: нет: Правила:<br>MINMAX: maxw=200<br>RAW: 15 (напр. `(root):h=36`, `hit area · fine:w=114`)<br>SERVICE: нет безопасного поля<br>BOARD: нет разделов 05, 07, 08 |
| Snack | Snack | 5 | MINMAX: minw=280<br>RAW: 10 (напр. `(root):gap=12`, `(root):w=343`)<br>BOARD: нет борды v3 |
| Stat card | Stat card | 2 | PROPS: Label 1 из 2; Value 1 из 2; Unit 1 из 2; Info 1 из 2; Delta 1 из 2; Delta caption 1 из 2; Show footer 1 из 2; Footer 1 из 2<br>MINMAX: minw=280<br>RAW: 2 (напр. `(root):w=280`)<br>BOARD: нет разделов 05, 07, 08 |
| Step | Stepper | 3 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: maxw=160<br>BOARD: нет разделов 05, 07, 08 |
| Step progress | Step progress | 25 | DESC: нет: Правила:<br>MATRIX: 25 из 35<br>RAW: 50 (напр. `(root):w=240`, `(root):h=4`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Suggest | Suggest | 12 | RAW: 14 (напр. `(root):sw=1`, `(root):w=480`)<br>BOARD: нет разделов 05, 07, 08 |
| Table cell / Avatar | Table | 3 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 6 (напр. `(root):w=280`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Badge | Table | 3 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 6 (напр. `(root):w=160`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Buttons | Table | 3 | DESC: нет: Когда использовать:, Правила:, A11y:<br>PROPS: Button 2 2 из 3; Button 3 2 из 3<br>MINMAX: minw=80<br>RAW: 6 (напр. `(root):w=132`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Coin | Table | 6 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 12 (напр. `(root):w=161`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Date time | Table | 6 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 12 (напр. `(root):w=180`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Icon | Table | 6 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 12 (напр. `(root):w=80`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Image | Table | 3 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 6 (напр. `(root):w=300`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / More | Table | 3 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 6 (напр. `(root):w=80`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Progress | Table | 3 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 6 (напр. `(root):w=154`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Star | Table | 6 | DESC: нет: Когда использовать:, Правила:, A11y:<br>AXES: `Active` — булева ось (Off \| On)<br>MINMAX: minw=80<br>RAW: 12 (напр. `(root):w=80`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Status | Table | 3 | MINMAX: minw=80<br>RAW: 6 (напр. `(root):w=160`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Text | Table | 6 | DESC: нет: Когда использовать:, Правила:, A11y:<br>AXES: `Align` — Left / Right вместо Start / End<br>MINMAX: minw=80<br>RAW: 12 (напр. `(root):w=184`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Toggle | Table | 3 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 6 (напр. `(root):w=80`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table cell / Transaction | Table | 12 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: minw=80<br>RAW: 24 (напр. `(root):w=132`, `(root):h=80`)<br>BOARD: нет разделов 07, 08 |
| Table header cell | Table | 20 | DESC: нет: Когда использовать:<br>MATRIX: 20 из 24<br>AXES: `Align` — Left / Right вместо Start / End<br>PROPS: Show filter 18 из 20; Show info 18 из 20<br>MINMAX: minw=80<br>RAW: 80 (напр. `(root):w=160`, `(root):h=44`)<br>BOARD: нет разделов 07, 08 |
| Table row | Table | 8 | DESC: нет: Когда использовать:, Правила:<br>RAW: 8 (напр. `(root):h=48`, `(root):h=80`)<br>SERVICE: нет зоны нажатия, безопасного поля<br>BOARD: нет разделов 07, 08 |
| Tabs | Tabs | 4 | DESC: нет: A11y:<br>BOARD: нет разделов 05, 07, 08, 12 |
| Toast | Toast | 10 | PROPS: Description 5 из 10; Actions 5 из 10; Icon 5 из 10; Show description 5 из 10; Timer 5 из 10; Safe area 5 из 10<br>MINMAX: minw=280<br>RAW: 15 (напр. `(root):sw=1`, `(root):w=400`)<br>BOARD: нет разделов 05, 07, 08 |
| Toggle group | Toggle group | 4 | DESC: нет: Когда использовать:, Правила:, A11y:<br>MINMAX: maxw=480<br>BOARD: нет разделов 05, 07, 08 |
| Tooltip tour | Tooltip tour | 4 | MINMAX: minw=58, maxw=320<br>RAW: 8 (напр. `(root):w=320`, `step:o=0.72`)<br>BOARD: нет разделов 05, 07, 08 |
| Transaction | Transaction | 12 | DESC: нет: Когда использовать:, Правила:<br>RAW: 24 (напр. `(root):w=400`, `(root):h=64`)<br>BOARD: нет разделов 05, 07, 08 |

## Организмы (15)

| Набор | Страница | Вариантов | Замечания |
|---|---|---|---|
| Calendar | Calendar | 2 | DESC: нет: Правила:<br>BOARD: нет разделов 05, 07, 08, 12 |
| Chart card | Chart | 4 | DESC: нет: A11y:<br>PROPS: Show bottom 2 из 4; Bottom 2 из 4<br>RAW: 6 (напр. `(root):w=580`, `(root):w=343`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Chart plot | Chart | 23 | MATRIX: 23 из 35<br>RAW: 260 (напр. `(root):w=473`, `(root):h=140`)<br>SERVICE: нет кольца фокуса, зоны нажатия, безопасного поля<br>BOARD: нет разделов 05, 07, 08, 12 |
| Date range panel | Date range panel | 2 | AXES: `Presets` — булева ось (On \| Off)<br>RAW: 4 (напр. `(root):sw=1`, `calendar column:gap=12`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Dropdown panel | Dropdown panel | 2 | RAW: 9 (напр. `(root):gap=12`, `(root):sw=1`)<br>BOARD: нет разделов 05, 07, 08, 12 |
| Empty state | Empty state | 5 | MATRIX: 5 из 6<br>PROPS: Show illustration 4 из 5; Illustration 4 из 5<br>RAW: 5 (напр. `(root):w=560`, `(root):w=320`)<br>BOARD: нет разделов 05, 07, 08 |
| File upload | File upload | 5 | DESC: нет: Когда использовать:, Правила:<br>RAW: 6 (напр. `(root):w=360`, `(root):o=0.5`)<br>SERVICE: нет зоны нажатия, безопасного поля<br>BOARD: нет разделов 05, 07, 08 |
| Menu | Menu | 2 | MINMAX: minw=160, maxw=320<br>RAW: 2 (напр. `(root):w=300`)<br>BOARD: нет разделов 05, 07, 08 |
| Modal | Modal | 12 | DESC: нет: Когда использовать:, Правила:<br>PROPS: Title 8 из 12; Header description 4 из 12; Footer slot 9 из 12<br>RAW: 12 (напр. `(root):w=560`)<br>BOARD: нет разделов 05, 07, 08 |
| Page header | Header | 2 | RAW: 2 (напр. `(root):w=1120`, `(root):w=375`)<br>BOARD: нет разделов 05, 07, 08 |
| Sheet | Sheet | 2 | PROPS: Title 1 из 2; Show grabber 1 из 2; Show close 1 из 2; Show footer 1 из 2; Header actions 1 из 2; Body 1 из 2; Footer 1 из 2; Show header actions 1 из 2; Items 1 из 2<br>MINMAX: maxw=640<br>RAW: 2 (напр. `(root):w=375`)<br>BOARD: нет разделов 05, 07, 08 |
| Side panel | Side panel | 2 | RAW: 4 (напр. `(root):w=400`, `(root):h=720`)<br>BOARD: нет разделов 05, 07, 08 |
| Sidebar | Navigation | 2 | AXES: `Collapsed` — булева ось (Off \| On)<br>PROPS: Balance 1 из 2<br>RAW: 4 (напр. `(root):w=240`, `(root):h=800`)<br>BOARD: нет разделов 05, 07, 08 |
| Status screen | Empty state | 3 | DESC: нет: Когда использовать:, Правила:<br>RAW: 3 (напр. `(root):w=375`)<br>BOARD: нет разделов 05, 07, 08 |
| Tab bar | Tab bar | 1 | RAW: 2 (напр. `(root):sw=1`, `(root):w=375`)<br>BOARD: нет разделов 07 |
