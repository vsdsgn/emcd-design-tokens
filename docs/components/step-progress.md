# Step progress — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Step progress`. Status: beta. Level: unknown.
- Figma: Components, страница «Step progress» (`367:994`), набор `149:1939`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Полоска из 3–7 равных сегментов: сколько шагов пройдено в линейной последовательности без названий. Источник — legacy «slider counter» (Tooltip tour, DS Web и DS App).
- Когда использовать: тултип-тур, онбординг, сторис — над содержимым, на всю ширину контейнера.
- Когда нет: шаги с названиями — Stepper; доля выполнения — Progress.
- Правило выбора варианта:
  - Count: число шагов сценария, 3–7.
  - Step: номер текущего шага, 1…Count; пройденные и текущий — `control/checked`, остальные — `control/track`. Step больше Count не бывает (матрица 25 из 35).
  - Ширина — на всю ширину контейнера, сегменты поровну; высота — `size/track/sm`.
- Не делаем: меньше 3 или больше 7 сегментов; сегменты разной ширины.

## 3. Anatomy
- Корень — горизонтальный ряд, зазор `space/4`, высота `size/track/sm` → Count × `Step segment` (State Done / Current — `control/checked`, Upcoming — `control/track`; `radius/chip`, высота `size/track/sm`).
- Вложено: `Step segment` ×135.
- Служебные слои (вариантов из 25): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет; оси State нет. Состояние каждого сегмента (Done / Current / Upcoming) задаёт ось Step.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Count | 3 · 4 · 5 · 6 · 7 | 3 |
| Step | 1 · 2 · 3 · 4 · 5 · 6 · 7 | 1 |

Матрица: 25 из 35.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % на набор не влияют (на стенде без изменений). «Шаг N из M» — текстом рядом или для читалки, у родителя.
- RTL: направление зеркалится — заполнение идёт от начала строки (справа).

## 7. Events
- Нет: смену Step делает родитель (тур, онбординг, сторис).

## 8. Behavior
- Статичен.

## 9. Accessibility
- Полоска декоративна (`aria-hidden`); позиция — текстом «Шаг 2 из 5» рядом или для читалки.
- Смысл не только цветом: число шагов и текущий шаг передаёт текст.

## 10. Tokens
- `корень`: интервал `space/4`; высота `size/track/sm`.
- `Step segment`: заливка / цвет `control/checked`, `control/track`; высота `size/track/sm`; радиус `radius/chip`.
- Значений без переменной: 25 (напр. `(root):w=240`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Step progress`, вариантов 25 из 35; оси: Count, Step.
- Борда: «Step progress — борда · шаблон v3», разделов 11.
- Описание: 558 знаков, разделы: Status: Level: Когда использовать: A11y: Правила: Матрица:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStepProgress>`; Flutter: `DsStepProgress`.
- Props: `count`: 3 | 4 | 5 | 6 | 7; `step`: 1 | 2 | 3 | 4 | 5 | 6 | 7.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), 200 %; длинный текст и 6 языков — без изменений (текста нет); булевых свойств нет; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web / App: «slider counter» в Tooltip tour → Step progress (Count, Step).

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина корня 240 числом — образец; в макете Fill container.
- Сегменты Upcoming (`control/track`) в Dark L0 и Light L3 — перепроверить видимость стендом (то же у Step segment).
