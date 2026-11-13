# Table cell / Avatar — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Avatar`. Status: beta. Level: unknown.
- Figma: Components, страница «Table» (`367:42849`), набор `93:670`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с пользователем: аватар 40, имя со значками достижений и подпись второй строкой.
- Когда использовать: пользователь в строке таблицы: аватар, имя, подпись.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item.
- Правило выбора варианта:
  - Только плотность строки 80; аватар 40.
  - Achieves — у пользователя есть достижения; Star achieve / Shield achieve — какой значок показать. Значки — после имени, не больше трёх.
  - Name — одна строка с многоточием; Caption — подпись второй строкой.
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
  - Высота — по строке (Table row); ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: строка плотности 48; больше трёх значков; значки перед именем; перенос имени на вторую строку.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/12`, зазор `space/12`, min-width `size/table-cell/min` (80).
- `avatar` — локальный слой 40 (`action/secondary/default`, `radius/chip`) с иконкой `icon/size/md`.
- `content`: `name row` (зазор `space/4`) — `name` (`text/primary`, `type/label/lg`, `font-weight/medium`) + `achieves` (значки звезды и щита, зазор `space/2`); `caption` — `text/secondary`, тот же кегль. Блок и тексты — Fill, одна строка.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: иконки ×9.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — имя `text/primary`, подпись `text/secondary`.
- Skeleton — одна полоса вместо аватара и текста.
- Disabled — имя и подпись `text/disabled`, значки достижений и глиф аватара погашены.
- Hover — у строки (Table row), не у ячейки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 3 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Name | текст | «UserEmcdMatch» | 3 из 3 |
| Caption | текст | «15 сделок» | 3 из 3 |
| Achieves | булево | вкл | 3 из 3 |
| Star achieve | булево | вкл | 3 из 3 |
| Shield achieve | булево | вкл | 3 из 3 |

- Star achieve и Shield achieve действуют только при Achieves = On.

## 6. Content / slots
- Name — имя пользователя; Caption — короткая подпись («15 сделок»).
- Длинный текст: блок `content` и тексты — Fill, одна строка, усечение многоточием; значки остаются видимыми после усечённого имени.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Значки не зеркалятся.
- Текст 200 %: аватар и значки не растут; имя и подпись усекаются многоточием по ширине ячейки, за корень по ширине не выходят.

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; аватар декоративен (`aria-hidden`), имя — текстом.
- Значки достижений — с текстовой альтернативой.

## 10. Tokens
- `корень`: интервал `space/12`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `avatar`: заливка / цвет `action/secondary/default`; радиус `radius/chip`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `name row`: интервал `space/4`.
- `name`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `achieves`: интервал `space/2`.
- `caption`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 3 (напр. `(root):w=280`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Avatar`, вариантов 3 из 3; оси: State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 742 знаков, разделы: Status: Level: Когда использовать: Правила: Длинный текст: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellAvatar>`; Flutter: `DsTableCellAvatar`.
- Props: `name`: string или слот; `caption`: string или слот; `achieves`: boolean = true; `starAchieve`: boolean = true; `shieldAchieve`: boolean = true.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; усечение и погашение Disabled (правки 13.11) повторно не проверены; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / avatar label text` → Table cell / Avatar (Name, Caption); achieves → Achieves; star achieve → Star achieve; shield achieve → Shield achieve; text badge — свойства в наборе нет.

Осталось доделать (после пакета правок beta 2026-11-13):
- Описание: «Avatar L 40», у Avatar 40 — это Size=M; `avatar` собран локально, не экземпляром Avatar — заменить на Avatar M и поправить описание.
- На решение: Skeleton — одна полоса без круга аватара 40.
- На решение: «не больше трёх значков» и legacy text badge — в наборе два значка, свойств для третьего и text badge нет.
- Ширина корня 280 числом (ширину задаёт колонка; min-width — `size/table-cell/min`).
