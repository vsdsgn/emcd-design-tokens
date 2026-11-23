# Bulk action bar — контракт · draft (2026-11-23)

Заготовка: собрана автоматически. Набор заменён на месте (2026-11-13): фон, радиус и тень — слой `overlay surface`, нераскрытый экземпляр базы `_Overlay surface`; свойства набора не менялись. Поверхность, токены и приёмка базы — `docs/components/overlay-surface.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Bulk action bar`. Status: draft. Level: unknown.
- Figma: Components, страница «Bulk action bar» (`2398:15`), компонент `2398:16`.

## 2. Intent
- Полоса массовых действий над выбранными строками таблицы: «Выбрано N из M», до двух действий (Button Tertiary M), «⋯» — остальные (удаление — там, с подтверждением Modal sm), «Снять выбор» (Icon button Ghost). Новый набор 22.11 (Мониторинг «Устройства», B2B Users).
- Когда использовать: выбрана хотя бы одна строка таблицы (Select all в шапке, Checkbox первой ячейкой); Web — плавающая по центру над низом окна, Compact — над Tab bar.
- Когда нет: одно действие над строкой — в строке («⋯» → Menu); действия страницы — Page header.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `overlay surface`, `count`, `actions`, `action 1`, `action 2`, `more`, `close`.
- Вложено: `_Overlay surface` ×1, `Button` ×2, `Icon button` ×2.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Count | текст | «Выбрано 2 из 120» | 1 из 1 |
| Show action 2 | булево | вкл | 1 из 1 |
| Show more | булево | вкл | 1 из 1 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role=toolbar «Действия с выбранными»; число — aria-live=polite; Esc снимает выбор.

## 10. Tokens
- `корень`: интервал `space/12`; отступы `space/16`, `space/8`; радиус `radius/control`.
- `overlay surface`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/raised`; радиус `radius/control`.
- `count`: заливка / цвет `text/primary`; типографика `font/family/text`, `type/label/md`.
- `actions`: интервал `space/8`.
- `action 1`: заливка / цвет `action/secondary/default`; интервал `space/4`; высота `control/height/md`; мин. ширина `size/button/min`; отступы `space/12`; радиус `radius/control`.
- `action 2`: заливка / цвет `action/secondary/default`; интервал `space/4`; высота `control/height/md`; мин. ширина `size/button/min`; отступы `space/12`; радиус `radius/control`.
- `more`: заливка / цвет `action/secondary/default`; интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `close`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Компонент `Bulk action bar`; оси: нет.
- Борда: шаблона v3 нет.
- Описание: 918 знаков, разделы: Status: Level: Когда использовать: Когда нет: Правила: A11y:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`BulkActionBar`), Vue `packages/vue/src/DsBulkActionBar.vue`, CSS `claude-ds/components/BulkActionBar/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsBulkActionBar>`; Flutter: `DsBulkActionBar`.
- Props: `count`: string или слот; `showAction2`: boolean = true; `showMore`: boolean = true.

## 14. Acceptance (2026-11-23)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): `audit` 0, OVERLAY и SERVICE 0; остаток (числа min / max и др.) — в замечаниях ниже и в `docs/components/overlay-surface.md`, раздел 14. Стенд — на пилоте базы.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - BOARD: нет борды v3

## 15. Migration
- Legacy: Мониторинг: панель справа снизу «Выбрано N из M» + кнопки столбиком.
