# Сверка форм legacy → DS 2.0 (2026-10-04)

Метод: страница «🔁 Migration» в Components — для каждой строки берём основной компонент legacy и DS 2.0 и сравниваем по размерам вариантов: высота, радиус, внутренний отступ, кегль. Правило миграции: форма ±4 px, оси 1:1, отличия — только под шкалу токенов или решения DS 2.0.

## Исправлено

- **Segmented**: контейнер был фиксированной высоты 40 во всех размерах, сегменты внутри 24–48. Теперь обнимает содержимое: S 32 · M 40 · L 48 · XL 56 (legacy sm 44 / lg 56).
- **Button**: в таблице миграции было «Large 48 → L» — на деле legacy Large = 56 → XL; Small 36 → S 32 (−4).

## Совпадает (в пределах ±4)

Select compact (1:1), Input amount, Slider, List item (L 76 / M 64 vs 77), Accordion (L 65 vs 64), Toggle (28/24 = 1:1), Counter (16), Progress circle (S 24), Chip (md 44 → M 40, sm 36 → S 32 — ровно −4), Checkbox/Radio (24 → 20), Avatar 20/28/36 → 20/32/40.

## Отличия — решения DS 2.0, на ревью

- **Кегль контролов 16 → 14**: Chip, Checkbox, Radio, Toggle, Input, кнопки M — во всём DS 2.0 Body 14 у контролов M; legacy местами 16.
- **Радиус Modal 16 → 24, Sheet 12 → 24** — крупные оверлеи DS 2.0 скруглены сильнее.
- **Avatar large 44 → L 56** — шкала DS 2.0; 44 нет.
- **Counter кегль 10 → 12** — минимальный кегль DS 2.0.
- Сравнение не применимо (в строке legacy — обёртка или экран, а не компонент): Table, Menu, Toast, Alert, Banner, Tabs, Tooltip, Empty state, Sidebar, Chart card, Stepper.
