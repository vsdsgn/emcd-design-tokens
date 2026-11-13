# Правки по стенду (после снимка версии Стефана 13.11)

Каждая правка проверена отдельным чтением. Приём для усечения: текст по содержимому + `maxWidth` текстового слоя (Plugin API теперь принимает) — корень растёт до своего max, текст усекается многоточием; в фиксированных контейнерах — текст Fill, одна строка, многоточие.

## 2026-11-13 (ночь)
- **Select compact:** значение усекается (`text` maxWidth 122 = 200 − отступы 8 + 8 − зазор 16 − шеврон 16 − монета 24 − зазор 6), шеврон всегда внутри; Disabled — шеврон `icon/disabled`.
- **Select:** Open — без каретки, значение `text/primary`, шеврон `icon/chevron-up` (подмена экземпляра; поворот во вложенном экземпляре Figma не переопределяет); Disabled — шеврон `icon/disabled` (прежний оверрайд не сохранился: `findAll` по умолчанию пропускал невидимые дочерние слоты — нужен `skipInvisibleInstanceChildren = false`).
- **Disabled гасит вложенные:** Date range field (иконка, подсказка), Input amount (иконка info, валюта → Select compact Disabled), Multiselect (подсказка), Table cell / Avatar (значки, глиф).
- **Длинный текст:** Table cell / Text, Date time, Coin, Image, Avatar — блок `content` Fill, тексты Fill, одна строка, многоточие (End — выравнивание вправо); Accordion заголовок — 2 строки; Key-value row ключ — 2 строки, значение — 1 строка ≤ 200; Stat card — единица рядом с числом (число ≤ 180, единица ≤ 64); Step подпись и описание — 2 строки ≤ 120; Table header cell подпись — Fill, 1 строка; Snack заголовок — 1 строка; Segment подпись — Fill, по центру, 1 строка (в Segmented).
- **Описания:** Active → Current (Step, Step symbol, Step trail), → Selected (Legend item, Nav item); строка «Длинный текст:» у 13 наборов.
