# Counter — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Counter`. Status: beta. Level: unknown.
- Figma: Components, страница «Badge» (`366:6`), набор `43:16`. Платформы: Web, Mobile web, iOS, Android.
- Лежит на странице Badge.

## 2. Intent
- Число рядом с табом, пунктом меню или иконкой (уведомления). Не статус.
- Когда использовать: количество непрочитанного или элементов в разделе.
- Когда нет: суммы и проценты — текст или Badge; статус — Badge / Status.
- Правило выбора варианта:
  - Tone: Neutral — количество в табах и фильтрах; Accent — новое, требует внимания; Danger — ошибки и проблемы (неактивные воркеры).
  - Size: S 16 — в табах M и на иконках; M 20 — в табах L и пунктах меню.

## 3. Anatomy
- Корень: капсула (`radius/full`), min-width = высота.
- `value` — число.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | S |
| Tone | Neutral · Accent · Danger | Neutral |

Матрица полная: 6 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Value | текст | «12» | 6 из 6 |

## 6. Content / slots
- Больше 99 — «99+». Ширина: min 16 / 20, max 40 (значение 28).
- Цифры не переводятся и не зеркалятся в RTL.

## 7. Events
- Нет.

## 8. Behavior
- Статичен; смена значения — без анимации.

## 9. Accessibility
- Число входит в доступное имя родителя («Воркеры, 3 неактивных»); сам счётчик — `aria-hidden`.

## 10. Tokens
- `корень`: заливка / цвет `action/secondary/default`, `control/checked`, `status/danger/solid`; maxw `size/counter/max`; minh `size/counter-height/md`, `size/counter-height/sm`; мин. ширина `size/counter-height/md`, `size/counter-height/sm`; отступы `space/4`, `space/6`; радиус `radius/full`.
- `value`: заливка / цвет `text/on-accent`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Min / max корня: minWidth 16 size/counter-height/sm, maxWidth 40 size/counter/max, minHeight 16 size/counter-height/sm, minWidth 20 size/counter-height/md, minHeight 20 size/counter-height/md.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Counter`, вариантов 6 из 6; оси: Size, Tone.
- Борда: «Badge — борда · шаблон v3», разделов 11.
- Описание: 699 знаков, разделы: Status: Level: Счётчик: Когда использовать: Правила: A11y: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCounter>`; Flutter: `DsCounter`.
- Props: `size`: s | m; `tone`: neutral | accent | danger; `value`: string или слот.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 40` (записанное исключение) и `maxWidth 28 @value` числом; min-width — `size/counter-height/*`.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `Badge counter`: status neutral | danger → Tone Neutral | Danger; Accent — новое; размеры S | M.
