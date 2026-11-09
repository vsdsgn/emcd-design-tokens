# Промпт для Claude Code — DSP Export и Vue (2026-11-09)

Скопировать блок ниже в Claude Code (репо дизайн-системы или `multigeo/ds-playground`).

```
Контекст: EMCD DS 2.0. Источник правды — Figma (Foundations, Components, Icons) → экспорт → tokens/ → build/ в репо vsdsgn/emcd-design-tokens. DSP — multigeo/ds-playground (code.emcdtech.com). Foundations, Components и Icons опубликованы 2026-11-09 (репо: 14cd245 и новее). DSP Export (плагин в Figma, нужен VPN) запускает разработчик; ты проверяешь результат и реализуешь изменения в коде.

Сначала прочитай по порядку: docs/HANDOFF.md, docs/OPEN-QUESTIONS.md (блок «Решения Стефана 2026-11-09»), docs/dsp.md, docs/dev-handoff-2026-11-06.md (полный список изменений компонентов), docs/component-contract.md. Не опирайся на память чата.

Что нового к 2026-11-09:
1. Токены. Platform: новые os/safe-area/top|bottom|left|right (CSS: --os-safe-area-*). Значения справочные для макетов (iOS top 59 / bottom 34, Android 24 / 24, Web и Mobile web 0); в коде брать системные insets (env(safe-area-inset-*), нативные insets), не эти числа и не rem-конвертацию. Шесть токенов Theme помечены Deprecated, удаление в следующем major, в новом коде не использовать: action/tertiary/hover, action/tertiary/pressed, surface/hover, surface/active, control/segment-hover, action/secondary/hover. Hover и Pressed рисует слой state/layer с opacity из state/hover и state/pressed.
2. Компоненты: полный список — docs/dev-handoff-2026-11-06.md. Релиз MAJOR (Alert и Banner → Suggest; Toast; Badge и Counter разделены; Button Tone; Table cell Transaction Direction Debit → Unexpected; пути иконок symbol/flag → media/flag, symbol/os → media/os). Статусы: beta у 13 (Chip, Tab, Status, Tab bar item, Breadcrumb item, Checkbox, Radio, Toggle, Input, Textarea, Badge, Counter, Segment) и у Button, Icon button; остальные draft.
3. Решено, но в Figma ещё не сделано (отдельный Publish позже): слоты Sidebar и Select compact; булевы Show filter, Show info, Show more у Table header cell и Table cell / Buttons; свойство «Show safe area» → «Safe margin» (control/safe-margin; токен в Platform уже есть). Не закладывай эти API как окончательные.
4. Icons: все пять спорных иконок остаются (arrow-down, arrow-up, refresh, sort-up, user); Symbols и Media пока в файле Icons. Вопрос «шрифт или SVG во Flutter» пока не решаем, не трогай.

Задачи:
A. Проверка DSP Export. Сверь diff MR с docs/dev-handoff-2026-11-06.md и пунктами 1–4. Расхождения Figma ↔ список ↔ код выпиши отчётом (имя, что в Figma, что в коде). В сгенерированных файлах руками ничего не правь.
B. Vue 3. Реализуй или обнови по приоритету: Suggest; Toast (решение Стефана 2026-11-09: Layout = Card | Informer, Informer это то же, что Header, мобильный; Snack — отдельный компонент, не значение Layout; в Figma Snack вынесен в отдельный набор: Tone = Neutral | Info | Success | Warning | Danger, свойства Title, Icon, Action; уже опубликован, расхождения с DSP Export запиши в отчёт); Badge и Counter как два компонента; Button с осью Tone; Table cell Transaction (Direction = Unexpected, знак в слое sign, число в Value). Таймеры и стек Toast по решению 06.11: Success и Info 5 с, Warning 8 с, Danger не закрывается сам; стек до 3, зазор 8; пауза при hover и фокусе; Web справа сверху, App сверху.
C. Нельзя: удалять Deprecated-токены и компоненты, переименовывать публичное API без deprecated и предупреждения, менять значения токенов руками, править Редполитику или Confluence.

Правила: одна задача — один способ; состояния Hover, Pressed, Disabled, Focus одинаковой логики во всех компонентах; «готово» только после проверки всех вариантов, осей и свойств.

Отчёт в конце: что сделано, что не сделано и почему, список расхождений Figma ↔ код, вопросы к Стефану (по одному пункту каждый, только по Vue и DSP).
```
