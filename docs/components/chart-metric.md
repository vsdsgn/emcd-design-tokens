# Chart metric — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Chart metric`. Status: beta. Level: unknown.
- Figma: Components, страница «Chart metric» (`1012:19`), набор `101:1011`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Показатель над графиком: подпись и крупное значение, при необходимости иконка слева от значения.
- Когда использовать: ключевое значение над графиком (текущий хешрейт, прибыль).
- Когда нет: список показателей — Key-value row; карточка с динамикой — Stat card.
- Правило выбора варианта:
  - Tone отражает смысл значения, а не оценку: Default — значение в норме; Danger — вне нормы, критично («Отключен»); Warning — вне нормы, требует внимания (реджекты выше нормы); Success — подтверждённо хорошее значение.
  - Icon: Off — по умолчанию; On — иконка слева от значения (Icon · swap — иконка из `icon/*`).
  - Value — число до 228 по ширине, длиннее — формат K / M / T; единицы отделяются тонким пробелом.
- Не делаем: длинное число без формата K / M / T; цвет как единственный носитель тона.

## 3. Anatomy
- Корень — вертикальный стек (`space/4`), max-width `size/chart-metric/max`: `label` (`text/secondary`, `type/body/sm`) и `value row`.
- `value row` (`space/4`): `icon` (`icon/size/md`, свойства Icon и Icon · swap) + `value` (`font/family/display`, `type/heading/md`, `font-weight/bold`; цвет по Tone: `text/primary` / `text/danger` / `text/warning` / `text/success`).
- Вложено: иконки ×4.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет. Tone — не состояние, а смысл значения. Загрузка — Skeleton у родителя.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Tone | Default · Danger · Warning · Success | Default |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Текущий хешрейт» | 4 из 4 |
| Value | текст | «89.94 TH/s» | 4 из 4 |
| Icon | булево | выкл | 4 из 4 |
| Icon · swap | замена экземпляра | `icon/lightning` | 4 из 4 |

## 6. Content / slots
- Label — короткое название показателя: одна строка, max-width 228, усечение многоточием; полный текст — в `title` / тултипе.
- Value — число с единицей, max-width 228; длиннее — продукт сокращает до K / M / T до передачи (многоточие в макете — только защита). Число — в формате локали.
- Языки (de, ar, hi, th, ja, kk): по высоте не обрезаются; длинное усекается по тем же правилам.
- RTL: число и единица не зеркалятся, блок выравнивается по началу строки, иконка — со стороны начала.
- Текст 200 %: блок растёт вместе с кеглем, обрезки и наложений нет.

## 7. Events
- Нет.

## 8. Behavior
- Статичен.

## 9. Accessibility
- Подпись и значение — один блок: `role="group"`, `aria-label` «Текущий хешрейт: 89,94 TH/s».
- Цвет не единственный носитель тона — рядом иконка или знак.

## 10. Tokens
- `корень`: интервал `space/4`; maxw `size/chart-metric/max`.
- `label`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `value row`: интервал `space/4`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `value`: заливка / цвет `text/danger`, `text/primary`, `text/success`, `text/warning`; типографика `font-weight/bold`, `font/family/display`, `type/heading/md`.
- Min / max корня: maxWidth 240 size/chart-metric/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Chart metric`, вариантов 4 из 4; оси: Tone.
- Борда: «Chart metric — борда · шаблон v3», разделов 9.
- Описание: 884 знаков, разделы: Status: Level: Показатель над графиком: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartMetric>`; Flutter: `DsChartMetric`.
- Props: `tone`: default | danger | warning | success; `label`: string или слот; `value`: string или слот; `icon`: boolean = false.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (label 228, value 228).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- Песочница графиков: «Текущий хешрейт / Хешрейт за 1 день / Реджекты» (mining, WL), «Средняя температура / Плата N» (monitoring) → Label + Value; значение вне нормы → Tone Danger | Warning.

Осталось доделать (после пакета правок beta 2026-11-13):
- Иконка при Icon = On не красится в тон (у `icon` нет токена цвета) — решить, наследует ли она цвет значения.
