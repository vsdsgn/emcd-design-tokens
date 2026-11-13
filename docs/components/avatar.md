# Avatar — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Avatar`. Status: draft. Level: atom.
- Figma: Components, страница «Avatar» (`367:265`), набор `108:1270`.

## 2. Intent
- Аватар пользователя / субаккаунта / контрагента P2P. Size XS 20 · S 32 · M 40 · L 56 (legacy micro / small / medium / large). Type Text (инициалы), Icon, Image (замените заливку картинкой).
- Когда использовать: пользователь, монета, устройство.
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `circle`, `initials`, `status`, `icon`, `image (заменить)`, `placeholder`.
- Вложено: иконки ×4.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | XS · S · M · L | — |
| Type | Text · Icon · Image | — |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Initials | текст | «E» | 4 из 12 |
| Status | булево | выкл | 12 из 12 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- декоративный — скрыт от читалки, иначе имя.

## 10. Tokens
- `circle`: заливка / цвет `accent/subtle`, `action/secondary/default`; радиус `radius/chip`.
- `initials`: заливка / цвет `text/secondary`; типографика `font-weight/bold`, `font-weight/medium`, `font/family/display`, `font/family/text`, `type/heading/sm`, `type/label/md`, `type/label/sm`.
- `status`: заливка / цвет `status/success/solid`; обводка `surface/level-1`; толщина обводки `border/width/focus`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `image (заменить)`: заливка / цвет `accent/subtle`.
- `placeholder`: заливка / цвет `text/accent`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Значений без переменной: 24 (напр. `(root):w=20`, `(root):h=20`, `(root):w=32`, `(root):h=32`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Avatar`, вариантов 12 из 12; оси: Size, Type.
- Борда: «Avatar — борда · шаблон v3», разделов 8.
- Описание: 625 знаков, разделы: Status: Level: Правила: Когда использовать: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsAvatar>`; Flutter: `DsAvatar`.
- Props: `size`: xs | s | m | l; `type`: text | icon | image; `initials`: string или слот; `status`: boolean = false.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: A11y:
  - PROPS: Initials 4 из 12
  - RAW: 24 (напр. `(root):w=20`, `(root):h=20`)
  - BOARD: нет разделов 04, 05, 08, 12

## 15. Migration
- Legacy: avatar (status, size md/sm, state), base avatar / single (size, var=text/icon/icon action/image) (DS Web)
