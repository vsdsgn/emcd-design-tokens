# Divider — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Divider`. Status: beta. Level: unknown.
- Figma: Components, страница «Divider» (`367:164`), набор `107:1275`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Разделитель: линия 1 px между группами содержимого, с необязательной подписью «или».
- Когда использовать: разделить группы без карточек.
- Когда нет: между каждой строкой списка — хватает отступов.
- Правило выбора варианта:
  - Orientation: Horizontal — между блоками, на всю ширину контейнера; Vertical — между элементами в строке, по высоте строки.
  - Label: Off — по умолчанию; On — только «или» между равноправными способами (вход, оплата); есть только у Horizontal.
  - Style: Solid — по умолчанию; правило применения Dotted не задано.
  - Толщина `border/width/default`, цвет `border/subtle` — у обоих стилей; другие не используем.
- Не делаем: первой или последней строкой блока; рядом с границей карточки; другая толщина или цвет.

## 3. Anatomy
- Линия `Rectangle`: `border/subtle`, толщина `border/width/default`; у Dotted — штрих того же цвета.
- `label` — подпись между двумя линиями (`text/tertiary`, `type/body/sm`), зазор `space/12` (только Label=On).
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Orientation | Horizontal · Vertical | Horizontal |
| Label | Off · On | Off |
| Style | Solid · Dotted | Solid |

Матрица: 6 из 8.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label text | текст | «или» | 2 из 6 |

- Матрица 6 из 8: Orientation=Vertical с Label=On не существует. Label text — только у Label=On.

## 6. Content / slots
- Label text — по умолчанию «или»; короткое слово. Правила длинной подписи нет; длинный текст и языки на стенде проверены только на варианте без подписи.
- Текст 200 %: подпись растёт, линии остаются по центру подписи, обрезки нет (проверено на стенде).
- RTL: симметричен, зеркалить нечего.

## 7. Events
- Нет.

## 8. Behavior
- Статичен.

## 9. Accessibility
- Декоративный — `aria-hidden`; делит смысловые группы — `hr` / `role="separator"`.
- Подпись Label читается как обычный текст.

## 10. Tokens
- `корень`: интервал `space/12`.
- `Rectangle`: заливка / цвет `border/subtle`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `label`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- Значений без переменной: 8 (напр. `(root):w=320`, `(root):w=1`, `(root):h=40`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Divider`, вариантов 6 из 8; оси: Orientation, Label, Style.
- Борда: «Divider — борда · шаблон v3», разделов 11.
- Описание: 939 знаков, разделы: Status: Level: Разделитель: Когда использовать: Правила: A11y: Матрица:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDivider>`; Flutter: `DsDivider`.
- Props: `orientation`: horizontal | vertical; `label`: boolean; `style`: solid | dotted; `labelText`: string или слот.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; длинный текст и языки — только на варианте без подписи; булевых свойств нет; кода нет — parity props пропущена.

## 15. Migration
- DS App `divider text --1.0` → Orientation=Horizontal, Label=On + Label text.
- DS Web: разделители внутри компонентов → Divider (Orientation Horizontal | Vertical, Label=Off).

Осталось доделать (после пакета правок beta 2026-11-13):
- Style=Dotted: в описании нет правила применения.
- Label=On: линии по бокам подписи на дробной координате (бледнее, чем у Label=Off) — выровнять по пикселю.
- Ширина корня 320, толщина 1 и высота 40 — числом.
