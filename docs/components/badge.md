# Badge — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Badge`. Status: beta. Level: unknown.
- Figma: Components, страница «Badge» (`366:6`), набор `44:255`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Неинтерактивная метка статуса или свойства («Активен», «Новое», «−5 %», монета). Нажать нельзя.
- Когда использовать: статус строки или карточки, пометки «Новое», «Beta».
- Когда нет: действие — Button / Chip; количество — Counter; длинный текст — Alert; состояние, которое обновляется само, — Status.
- Правило выбора варианта:
  - Tone: Success — работает / выплачено; Warning — требует внимания; Danger — ошибка / неактивен; Info — нейтральное сообщение; Accent — промо / новое; Neutral — свойство без оценки.
  - Style: Subtle — по умолчанию (таблицы, списки); Solid — одна главная метка на карточке или экране.
  - Size: S 20 — таблицы и плотные списки; M 24 — карточки и шапки; L 32 — крупные заголовки, промо. Рядом с Button S — Badge L.
- Не делаем: больше двух бейджей подряд; декоративная иконка; цвет как единственный носитель смысла.

## 3. Anatomy
- Корень: подложка (тон × стиль), радиус, отступы.
- `label` — текст; `icon` — смысловая иконка слева (Icon + Icon · swap); `close` / `chevron` — справа; свойства `Close · deprecated` и `Chevron · deprecated` (с 13.11): в новых макетах не включать, интерактив — Chip.
- Вложено: иконки ×117.
- Служебные слои (вариантов из 39): кольцо фокуса 39 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default; Skeleton — один на размер, от тона и стиля не зависит (поэтому матрица 39 из 72: 36 Default + 3 Skeleton).
- Кольцо фокуса — только у кликабельного бейджа; бейдж с крестиком или шевроном — это Chip.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L | S |
| Tone | Neutral · Accent · Success · Warning · Danger · Info | Neutral |
| Style | Subtle · Solid | Subtle |
| State | Skeleton · Default | Default |

Матрица: 39 из 72.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Активен» | 39 из 39 |
| Icon | булево | выкл | 39 из 39 |
| Icon · swap | замена экземпляра | `icon/plus` | 39 из 39 |
| Close · deprecated | булево | выкл | 39 из 39 |
| Chevron · deprecated | булево | выкл | 39 из 39 |
| Focus ring | булево | выкл | 39 из 39 · служебное |

## 6. Content / slots
- Длинный текст: одна строка, усечение многоточием по max-width 160 (подпись 112); полный текст — в `title` / тултипе.
- Иконка — только смысловая: галочка, часы, монета.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.

## 7. Events
- Нет. Кликабельный бейдж — `click` (в коде это кнопка). Удаляемый или раскрывающийся — Chip, не Badge.

## 8. Behavior
- Статичен. Skeleton — блик `Skeleton` (pulse при «Уменьшить движение»).

## 9. Accessibility
- Текст читается как часть строки; цвет не единственный носитель смысла — текст есть всегда.
- Контраст текста: Subtle — `status/*/on-subtle`, `accent/on-subtle` (≥ 5.7:1); Solid — `text/on-accent`, у Warning — `text/on-warning`.
- Close (deprecated) в старых макетах — отдельная кнопка с `aria-label`; в новых — Chip.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`, `action/inverse/default`, `action/secondary/default`, `control/checked`, `skeleton/base`, `status/danger/solid`, `status/danger/subtle`, `status/info/solid`, `status/info/subtle`, `status/success/solid`, `status/success/subtle`, `status/warning/solid`, `status/warning/subtle`; интервал `space/4`, `space/6`, `space/8`; высота `size/badge-height/lg`, `size/badge-height/md`, `size/badge-height/sm`; maxw `size/badge/max`; отступы `control/padding-x/md`, `control/padding-x/sm`, `space/8`; радиус `radius/control-sm`, `radius/sm`.
- `label`: заливка / цвет `accent/on-subtle`, `status/danger/on-subtle`, `status/info/on-subtle`, `status/success/on-subtle`, `status/warning/on-subtle`, `text/inverse`, `text/on-accent`, `text/on-warning`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`, `type/label/sm`.
- `skeleton bar`: заливка / цвет `skeleton/shimmer`; радиус `radius/xs`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-inner`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring`.
- Min / max корня: maxWidth 160 size/badge/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Badge`, вариантов 39 из 72; оси: Size, Tone, Style, State.
- Борда: «Badge — борда · шаблон v3», разделов 11.
- Описание: 1665 знаков, разделы: Status: Level: Бейдж: Когда использовать: Правила тона: Правила стиля: Размер: Цвета текста: Иконка: A11y: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsBadge>`; Flutter: `DsBadge`.
- Props: `size`: s | m | l; `tone`: neutral | accent | success | warning | danger | info; `style`: subtle | solid; `label`: string или слот; `icon`: boolean = false; `closeDeprecated`: boolean = false; `chevronDeprecated`: boolean = false.
- Состояния (Skeleton, Default) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 112 @label` числом (корень — `size/badge/max`).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `base badge / {neutral|brand|danger|success|warning} --1.5` → Tone Neutral | Accent | Danger | Success | Warning; Info — новый тон.
- size lg | md | sm → Size L | M | S; style tinted | filled → Style Subtle | Solid; state skeleton → State=Skeleton.
- var `text eraseble` → Close; `text counter` → Counter; `coin` → Icon + Icon · swap (монеты — в Symbols); `next` → Chevron.

Осталось доделать (после пакета правок beta 2026-11-13):
- Close / Chevron переведены в Deprecated 13.11 (решение 9 доски); удалить свойства после замены экземпляров в продуктах на Chip — с «ок» Стефана.
- max-width подписи 112 — числом (вложенный слой).
