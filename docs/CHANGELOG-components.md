# Журнал изменений компонентов DS 2.0

Формат: дата · что · где. Пишется после каждой группы правок.

## 2026-10-19 (чат 2 · пункт 1 порядка работ: починка вёрстки)
- «12 · Локали и RTL» (Checkbox, Radio, Toggle, Chip, Badge, Status, Tab, Segment, Breadcrumb item, Tab bar item, Button): подпись режима переносится, длинный режим `long` переносит текст внутри карточки (раньше вылезал за край), `ar` прижат вправо, карточки сетки одной высоты. Проверено скриншотом на Checkbox.
- Таблицы бордов (18 бордов Button … Progress circle): ячейки с превью компонента выровнены влево (раньше центрировались и «плыли» между строками M / S). Матрицы состояний не затронуты (проверено на Checkbox).
- Найдено, не исправлено (Checkbox, остальные — проверить тем же): карточки анатомии разной высоты в одной строке; кольцо фокуса в сетке состояний рисуется чёрным; курсор в Hover / Pressed перекрывает подпись.

## 2026-10-19
- Tab: Off Hover и Pressed получили серую полоску снизу (Hover — `border/default`, Pressed — `control/border/default`); цвет текста не меняется на акцентный. Решение Стефана.
- Segment: тени убраны из Base (4 эффекта); для Expressive вернуть позже.
- Борды v3: курсоры в сетках состояний пересажены на центр инстанса (Checkbox, Radio, Toggle, Chip, Icon button, Tab, Segment, Pagination item, Date cell, Breadcrumb item, Tab bar item); 34 лишних курсора в ячейках «нет» удалены.
- Card: создан мастер (Level 1–3 × Radius Surface 24 · Container 16 · Inner 8 × Padding S/M/L × Border), борда 664:74000.
- Badge: L = 32 (было 36).
- Борды v3: Segment, Progress, Skeleton, Scrollbar, Page dot, Legend swatch, Step symbol, Chart crosshair, Avatar group, Spinner, Progress circle, Code cell, Pagination item, Date cell, Breadcrumb item, Tab bar item, Tabs, Segmented, Card.
- Блок «12 · Локали и RTL» на 11 бордах; коллекция Locale samples: режимы long и short.
- Icons: 8 направленных иконок помечены «RTL: зеркалится».
- Foundations (Brand): `font/family/fallback-arabic`, `-devanagari`, `-thai`, `-japanese` — черновик, не опубликовано.
- Принят первый фидбек Стефана: FEEDBACK-2026-10-19.md.

## 2026-10-18
- Борды v3: Checkbox, Radio, Toggle, Chip (без Vertical), Icon button, Badge, Counter, Status, Divider, Avatar, Tab; старые борды v2 → 🗄 Старые доски.

