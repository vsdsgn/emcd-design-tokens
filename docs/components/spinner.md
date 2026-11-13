# Spinner — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Spinner`. Status: beta. Level: unknown.
- Figma: Components, страница «Progress» (`366:3115`), набор `4:20`. Платформы: Web, Mobile web, iOS, Android.
- Лежит на странице Progress.

## 2. Intent
- Индикатор загрузки: действие идёт, длительность неизвестна.
- Когда использовать: короткое действие с неизвестной длительностью — в кнопке, в блоке.
- Когда нет: загрузка данных — Skeleton.
- Правило выбора варианта:
  - Size: по соседней иконке или тексту — S `icon/size/sm`, M `icon/size/md`, L `icon/size/lg`.
  - Один спиннер на блок; в кнопке — вместо иконки или подписи, ширина кнопки не меняется.
  - Дольше 10 с — добавить текст, что происходит.
- Не делаем: несколько спиннеров в одном блоке; свой цвет вместо цвета родителя; спиннер вместо Skeleton при загрузке данных.

## 3. Anatomy
- `track` — кольцо `icon/primary` с прозрачностью 20 %; `arc` — дуга `icon/primary`. Цвет наследуется от родителя (по умолчанию `text/primary`); размер — `icon/size/*` (режим Platform).
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L | S |

Матрица полная: 3 вариантов.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % не влияют.
- RTL: не зеркалится.

## 7. Events
- Нет.

## 8. Behavior
- Вращение 1 с, linear — в коде (в Figma статичен).
- «Уменьшить движение»: вместо вращения — медленная пульсация прозрачности.

## 9. Accessibility
- `role="status"` с именем «Загрузка» или `aria-busy` у контейнера.
- Внутри кнопки — `aria-busy` у кнопки, сам спиннер скрыт от читалки.

## 10. Tokens
- `корень`: высота `icon/size/control`, `icon/size/lg`, `icon/size/sm`; ширина `icon/size/control`, `icon/size/lg`, `icon/size/sm`.
- `track`: заливка / цвет `icon/primary`; высота `icon/size/lg`, `icon/size/md`, `icon/size/sm`; ширина `icon/size/lg`, `icon/size/md`, `icon/size/sm`.
- `arc`: заливка / цвет `icon/primary`.
- Значений без переменной: 3 (напр. `track:o=0.2`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- iOS / Android: M и L крупнее, чем на Web (`icon/size/*` по Platform); S не меняется.

## 12. Figma projection
- Набор `Spinner`, вариантов 3 из 3; оси: Size.
- Борда: «Progress — борда · шаблон v3», разделов 9.
- Описание: 932 знаков, разделы: Status: Level: Индикатор загрузки. Когда использовать: Поиск: Legacy: Motion: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSpinner>`; Flutter: `DsSpinner`.
- Props: `size`: s | m | l.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; текста и булевых свойств нет; анимация в Figma не проверяется; кода нет — parity props пропущена.

## 15. Migration
- Legacy `ic-loader` → Spinner (Size S | M | L).

Осталось доделать (после пакета правок beta 2026-11-13):
- Size=M: корень привязан к `icon/size/control`, дорожка — к `icon/size/md`; свести к одному токену.
- Прозрачность дорожки 0.2 — числом.
