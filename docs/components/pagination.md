# Pagination — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Pagination`. Status: draft. Level: molecule.
- Figma: Components, страница «Pagination» (`367:629`), набор `148:10702`.

## 2. Intent
- Пагинация таблиц и списков.
- Когда использовать: длинные таблицы на Web (воркеры, выплаты, устройства), когда важно знать позицию и прыгать по страницам.
- Когда нет: ленты на Compact — «Показать ещё» / бесконечная прокрутка; < 2 страниц — не показываем.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `previous`, `Pagination item`, `ellipsis`, `next`, `range`.
- Вложено: иконки ×8, `Pagination item` ×12.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Pages · Compact | — |
| Size | S · M | — |

Матрица полная: 4 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- <nav aria-label="Пагинация">, текущая — aria-current="page", стрелки «Предыдущая/Следующая страница». Клавиатура: Tab по элементам, Enter/Space. |

## 10. Tokens
- `корень`: интервал `space/4`.
- `previous`: интервал `space/6`; высота `control/height/md`, `control/height/sm`; радиус `radius/control`, `radius/control-sm`; ширина `control/height/md`, `control/height/sm`.
- `Pagination item`: заливка / цвет `accent/subtle`; мин. ширина `control/height/md`, `control/height/sm`; отступы `control/padding-x/sm`, `space/8`; радиус `radius/control`, `radius/control-sm`.
- `ellipsis`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `next`: интервал `space/6`; высота `control/height/md`, `control/height/sm`; радиус `radius/control`, `radius/control-sm`; ширина `control/height/md`, `control/height/sm`.
- `range`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`; отступы `space/8`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Pagination`, вариантов 4 из 4; оси: Type, Size.
- Борда: «Pagination — борда · шаблон v3», разделов 9.
- Описание: 830 знаков, разделы: Status: Level: Когда использовать: Pages — Prev/next — A11y: Хаптик:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPagination>`; Flutter: `DsPagination`.
- Props: `type`: pages | compact; `size`: s | m.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Правила:
  - BOARD: нет разделов 05, 07, 08, 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
