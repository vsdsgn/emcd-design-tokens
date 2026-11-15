# Аудит draft-наборов (2026-11-15)

Собрано `scripts/draft-audit.mjs` из `docs/ds-manifest.json` — править там, не здесь. Наборы в Figma не менялись.
Это проверка по манифесту, а не «Готово»: плагины `audit` и `variables-check`, стенд и контракт по каждому набору — при переводе в beta.

## Сводка

- Наборов не в beta: 20 (draft 15, другой статус 5: _Page dot (service), _Dot (service), _Step segment (service), _Tooltip arrow (service), Status screen (template)).
- Без замечаний по манифесту: 17 (Calendar, Chart card, Chart plot, Date range panel, Dropdown panel, Empty state, File upload, Page header, Menu, Sidebar, _Page dot, Side panel, Snack, _Dot, _Step segment, _Tooltip arrow, Status screen).
- Наборов с замечанием: DESC — 1, PROPS — 1, BOARD — 1.

Коды: DESC — разделы описания; MATRIX — неполная матрица осей; AXES — булева ось (кроме осей выбора Status / Selected и списка BOOL_OK) или Left / Right; PROPS — свойство не привязано ни в одном варианте; MINMAX — min / max числом; RAW — значения без переменной (без размеров образца на корне и зоны нажатия; строки реестра docs/exceptions.md — в списке RAW_OK); SERVICE — у набора с Hover / Pressed / Focus нет служебных слоёв; BOARD — нет борды v3 или её разделов (разделы, которых у набора нет по смыслу, перечисляет блок «Не собрано в этой версии» на самой борде).

## Уровень не указан в манифесте (20)

| Набор | Страница | Вариантов | Замечания |
|---|---|---|---|
| _Dot | Status | 10 | — |
| _Page dot | Page dot | 2 | — |
| _Step segment | Step segment | 3 | — |
| _Tooltip arrow | Tooltip | 2 | — |
| Calendar | Calendar | 2 | — |
| Chart card | Chart card | 1 | — |
| Chart plot | Chart plot | 23 | — |
| Date range panel | Date range panel | 2 | — |
| Dropdown panel | Dropdown panel | 2 | — |
| Empty state | Empty state | 5 | — |
| File upload | File upload | 6 | — |
| Menu | Menu | 2 | — |
| Modal | Modal | 12 | DESC: нет: Правила: |
| Page header | Header | 2 | — |
| Sheet | Sheet | 1 | PROPS: Items 0 из 1 |
| Side panel | Side panel | 2 | — |
| Sidebar | Navigation | 2 | — |
| Snack | Snack | 5 | — |
| Status screen | Шаблоны экранов (не Base) | 3 | — |
| Tab bar | Tab bar | 1 | BOARD: нет борды v3 |
