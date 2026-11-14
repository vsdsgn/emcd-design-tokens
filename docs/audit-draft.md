# Аудит draft-наборов (2026-11-14)

Собрано `scripts/draft-audit.mjs` из `docs/ds-manifest.json` — править там, не здесь. Наборы в Figma не менялись.
Это проверка по манифесту, а не «Готово»: плагины `audit` и `variables-check`, стенд и контракт по каждому набору — при переводе в beta.

## Сводка

- Наборов не в beta: 21 (draft 21, без статуса 0: —).
- Без замечаний по манифесту: 19 (Calendar, Chart card, Chart plot, Date range panel, Dropdown panel, Empty state, Status screen, File upload, Page header, List item, Menu, Sidebar, Sheet, Side panel, Snack, Suggest, Toast, _Tooltip arrow, Tooltip).
- Наборов с замечанием: DESC — 1, BOARD — 1.

Коды: DESC — разделы описания; MATRIX — неполная матрица осей; AXES — булева ось (кроме осей выбора Status / Selected и списка BOOL_OK) или Left / Right; PROPS — свойство не привязано ни в одном варианте; MINMAX — min / max числом; RAW — значения без переменной (без размеров образца на корне и зоны нажатия; строки реестра docs/exceptions.md — в списке RAW_OK); SERVICE — у набора с Hover / Pressed / Focus нет служебных слоёв; BOARD — нет борды v3 или её разделов (разделы, которых у набора нет по смыслу, перечисляет блок «Не собрано в этой версии» на самой борде).
