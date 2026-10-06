# Размеры: минимумы и максимумы

Решение Стефана 2026-10-06: у каждого компонента — логика min / max с учётом платформ, современных экранов и «старых малюток».

## Диапазон экранов

| Что | Значение | Откуда |
|---|---|---|
| Самый узкий экран | **320** (`layout/min-viewport`) | iPhone SE 1-го поколения, старые Android, веб при увеличении 400 % (WCAG 1.4.10 Reflow) |
| Типичный телефон | 360–430 | Android 360–412, iPhone 375–430 |
| Планшет | 600–1024 | Viewport Medium / Expanded |
| Десктоп | 1200–1600+ | Viewport Large / XLarge; контент не шире `layout/content-max` |

**Главное правило:** любой `min-width` компонента ≤ **288** = 320 − 2 × `layout/margin` (16). Тогда на 320 ничего не вылезает за экран и не даёт горизонтальной прокрутки.
Второе правило: на широких экранах ограничиваем **длину строки и ширину полей**, а не растягиваем всё до края (`size/text/measure` 640, `layout/content-max`).

## Токены (Foundations → Platform, одинаковы на платформах, кроме оговорённых)

| Токен | px | Где |
|---|---|---|
| `layout/min-viewport` | 320 | граница поддержки, тесты 320 |
| `size/button/min` | 64 | Button с текстом (не Text, не Icon button) |
| `size/field/min` | 160 | Input, Select, Textarea, Input amount, Password field, Multiselect |
| `size/field/max` | 480 | ширина поля в форме на широком экране (правило раскладки формы, не ограничение компонента) |
| `size/text/measure` | 640 | описания в Alert, Banner, Modal, Empty state |
| `size/menu/min` / `max` | 160 / 320 | Menu, выпадающие списки |
| `size/tooltip/max` | 320 | Tooltip (≤ 3 строк) |
| `size/popover/max` | 360 | поповеры |
| `size/toast/max` | 400 | Toast: ширина = min(400, экран − 32) |
| `size/modal/sm` / `md` / `lg` | 400 / 560 / 720 | Modal; на Compact (< 600) → Sheet |
| `size/sheet/max` | 640 | Sheet на планшете центрируется |
| `size/side-panel` | 400 | Side panel; на Compact — на всю ширину |
| `size/card/min` | 280 | карточки в сетке (Stat card), Alert, Banner |
| `size/chip/max` | 240 | Chip, дальше «…» |
| `size/badge/max` | 160 | Badge, дальше «…» |
| `size/table-cell/min` | 80 | колонки таблицы; таблица шире экрана скроллится в своём контейнере |

Высоты: `touch/min` (Web 24 / касание 44) и размеры контролов S–XL — уже в системе.

## В Figma

Значения min / max проставлены в мастерах Components 2026-10-06 (сырыми числами — новые токены ещё не опубликованы). **После публикации Foundations** — запустить `scripts/figma/bind-sizes.plugin.js` в Components (use_figma): привяжет minWidth / maxWidth к `size/*`.
Текст в Chip и Badge — одна строка с обрезкой «…».

## В коде

`min-width: var(--size-field-min)`, `max-width: min(var(--size-toast-max), 100% - 2 * var(--layout-margin))`. Flutter — `BoxConstraints` из тех же токенов. Обрезка — `text-overflow: ellipsis` + полный текст в `title` / тултипе.

## Проверка

Экраны 320 / 360 / 390 / 768 / 1280 / 1920; текст 200 % (WCAG 1.4.4); длинные строки (немецкий, казахский) — страница «🔍 Stress · длинный текст».
