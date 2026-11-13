# Chart metric — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Chart metric`. Status: draft. Level: molecule.
- Figma: Components, страница «Chart metric» (`1012:19`), набор `101:1011`.

## 2. Intent
- Показатель над графиком: подпись + значение (Heading/MD), иконка опционально. Tone — значение вне нормы (Отключен — Danger, реджекты выше нормы — Warning).
- Когда использовать: ключевое значение над графиком (текущий хешрейт, прибыль).
- Когда нет: список показателей — Key-value row; карточка с динамикой — Stat card.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label`, `value row`, `icon`, `value`.
- Вложено: иконки ×4.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Tone | Default · Danger · Warning · Success | — |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Текущий хешрейт» | 4 из 4 |
| Value | текст | «89.94 TH/s» | 4 из 4 |
| Icon | булево | выкл | 4 из 4 |
| Icon · swap | замена экземпляра | `icon/lightning` | 4 из 4 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- подпись и значение — один блок (role="group", aria-label «Текущий хешрейт: 89,94 TH/s»); цвет не единственный носитель тона — рядом иконка или знак.

## 10. Tokens
- `корень`: интервал `space/4`.
- `label`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `value row`: интервал `space/4`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `value`: заливка / цвет `text/danger`, `text/primary`, `text/success`, `text/warning`; типографика `font-weight/bold`, `font/family/display`, `type/heading/md`.
- Min / max корня: maxWidth 240 числом.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Chart metric`, вариантов 4 из 4; оси: Tone.
- Борда: «Chart metric — борда · шаблон v3», разделов 9.
- Описание: 800 знаков, разделы: Status: Level: Показатель над графиком: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartMetric>`; Flutter: `DsChartMetric`.
- Props: `tone`: default | danger | warning | success; `label`: string или слот; `value`: string или слот; `icon`: boolean = false.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: «Текущий хешрейт / Хешрейт за 1 день / Реджекты» (mining, WL), «Средняя температура / Плата N» (monitoring) —…
