# Chart crosshair — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Chart crosshair`. Status: beta. Level: unknown.
- Figma: Components, страница «Chart crosshair» (`1012:15`), набор `101:981`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Перекрестие под курсором на графике: вертикальная линия с точкой серии или подсветка полосы столбца. Работает вместе с Chart tooltip.
- Когда использовать: линия или полоса выбранной точки при наведении или выборе стрелками.
- Когда нет: выделение столбца без перекрестия — Chart plot, состояние Hover.
- Правило выбора варианта:
  - Target: Line — линейные графики и области (линия + точка серии); Bar — столбцы (подсветка полосы).
  - Цвет точки — `data/N` серии, задаётся в экземпляре; линия — всегда `border/default`.
- Не делаем: перехват нажатий; цвет линии, отличный от `border/default`.

## 3. Anatomy
- Line: `line` — вертикальная линия (`border/default`; в Dark на L0–L1 слабая, но различима — оставлено, стенд 15.11); `point` — точка серии (`border/accent` — серия 1 бренд, 17.11, обводка `surface/current` (совпадает с подложкой на любом уровне, 15.11), `border/width/focus`); `halo` — ореол точки (`border/accent`, прозрачность 0.24).
- Bar: `band` — полоса на ширину столбца (`status/neutral/subtle`).
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет: перекрестие показано, пока точка выбрана (курсор над графиком, касание, стрелки), иначе скрыто.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Target | Line · Bar | Line |

Матрица полная: 2 вариантов.

## 6. Content / slots
- Текста нет: значение точки показывает Chart tooltip.
- Текст 200 %: размер не меняется (проверено на стенде). Высота — по высоте плота.
- RTL: не зеркалится, положение — по точке данных.

## 7. Events
- Нет своих: положение и видимость выставляет график (наведение, касание, стрелки). Нажатия не перехватывает.

## 8. Behavior
- Следует за курсором; на касании остаётся до тапа вне графика.
- «Уменьшить движение»: без плавного движения.

## 9. Accessibility
- Стрелки Влево и Вправо двигают перекрестие по точкам; значение озвучивается через `aria-live=polite` («23.06, 32 °C»).

## 10. Tokens
- `line`: заливка / цвет `border/default`.
- `halo`: заливка / цвет `border/accent`.
- `point`: заливка / цвет `border/accent`; обводка `surface/current`; толщина обводки `border/width/focus`.
- `band`: заливка / цвет `status/neutral/subtle`.
- Значений без переменной: 5 (напр. `(root):w=24`, `(root):h=200`, `halo:o=0.24`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Chart crosshair`, вариантов 2 из 2; оси: Target.
- Борда: «Chart crosshair — борда · шаблон v3», разделов 12.
- Описание: 753 знаков, разделы: Status: Level: Перекрестие под курсором: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`ChartCrosshair`), Vue `packages/vue/src/DsChartCrosshair.vue`, CSS `claude-ds/components/ChartCrosshair/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsChartCrosshair>`; Flutter: `DsChartCrosshair`.
- Props: `target`: line | bar.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; свойств нет; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web widget Graph (crosshair) → Target Line | Bar.
