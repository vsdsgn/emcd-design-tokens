# Аудит draft-наборов (2026-11-19)

Собрано `scripts/draft-audit.mjs` из `docs/ds-manifest.json` — править там, не здесь. Наборы в Figma не менялись.
Это проверка по манифесту, а не «Готово»: плагины `audit` и `variables-check`, стенд и контракт по каждому набору — при переводе в beta.

## Сводка

- Наборов не в beta: 10 (draft 5, другой статус 5: _Page dot (service), _Dot (service), _Step segment (service), _Tooltip arrow (service), Status screen (template)).
- Без замечаний по манифесту: 8 (File upload, _Page dot, Side panel, Snack, _Dot, _Step segment, _Tooltip arrow, Status screen).
- Наборов с замечанием: SERVICE — 1, DESC — 1, BOARD — 1.

Коды: DESC — разделы описания; MATRIX — неполная матрица осей; AXES — булева ось (кроме осей выбора Status / Selected и списка BOOL_OK) или Left / Right; PROPS — свойство не привязано ни в одном варианте; MINMAX — min / max числом; RAW — значения без переменной (без размеров образца на корне и зоны нажатия; строки реестра docs/exceptions.md — в списке RAW_OK); SERVICE — у набора с Hover / Pressed / Focus нет служебных слоёв; BOARD — нет борды v3 или её разделов (разделы, которых у набора нет по смыслу, перечисляет блок «Не собрано в этой версии» на самой борде).

## Уровень не указан в манифесте (10)

| Набор | Страница | Вариантов | Замечания |
|---|---|---|---|
| _Dot | Status | 10 | — |
| _Page dot | Page dot | 2 | — |
| _Step segment | Step segment | 3 | — |
| _Tooltip arrow | Tooltip | 2 | — |
| File upload | File upload | 6 | — |
| Search | Search | 10 | SERVICE: нет кольца фокуса, зоны нажатия, безопасного поля |
| Section header | Section header | 2 | DESC: нет: Когда использовать:<br>BOARD: нет борды v3 |
| Side panel | Side panel | 2 | — |
| Snack | Snack | 5 | — |
| Status screen | Шаблоны экранов (не Base) | 3 | — |
