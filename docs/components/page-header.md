# Page header — контракт · draft (2026-11-14)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Page header`. Status: draft. Level: unknown.
- Figma: Components, страница «Header» (`366:5290`), набор `67:410`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `breadcrumbs`, `title row`, `text`, `title`, `subtitle`, `Actions`, `Button`, `Tabs`.
- Вложено: `Breadcrumbs` ×2, `Button` ×4, `Tabs` ×2.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | Large · Compact | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Воркеры» | 2 из 2 |
| Subtitle | текст | «12 активных из 14 · хешрейт 1.42 PH/s» | 2 из 2 |
| Show subtitle | булево | вкл | 2 из 2 |
| Breadcrumbs | булево | выкл | 2 из 2 |
| Show actions | булево | вкл | 2 из 2 |
| Show tabs | булево | выкл | 2 из 2 |
| Actions | SLOT | `undefined` | 2 из 2 |
| Tabs | SLOT | `undefined` | 2 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/12`, `space/16`; отступы `control/padding-x/lg`, `space/4`, `space/8`.
- `breadcrumbs`: интервал `space/8`.
- `title row`: интервал `space/12`, `space/16`.
- `text`: интервал `space/4`; мин. ширина `size/page-header/text-min`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/lg`, `type/heading/xl`.
- `subtitle`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `Actions`: интервал `space/8`.
- `Button`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/2`; высота `control/height/md`; мин. ширина `size/button/min`; отступы `space/8`; радиус `radius/control`.
- `Tabs`: интервал `space/16`, `space/24`; обводка `border/subtle`.
- Значений без переменной: 2 (напр. `(root):w=1120`, `(root):w=375`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Page header`, вариантов 2 из 2; оси: Size.
- Борда: «Page header — борда · шаблон v3», разделов 10.
- Описание: 940 знаков, разделы: Status: Level: Шапка страницы: Size: Правила: A11y: Когда использовать: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPageHeader>`; Flutter: `DsPageHeader`.
- Props: `size`: large | compact; `title`: string или слот; `subtitle`: string или слот; `showSubtitle`: boolean = true; `breadcrumbs`: boolean = false; `showActions`: boolean = true; `showTabs`: boolean = false; `actions`: string или слот; `tabs`: string или слот.

## 14. Acceptance (2026-11-14)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web `widget Navigation header` → Page header (Size Large / Compact; Breadcrumbs, слоты Tabs и Actions); DS App шапка (`navigation bar`) → Top bar — набора нет, решить Page header vs Top bar. Нужен скрин прода App.
