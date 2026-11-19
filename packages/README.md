# Код компонентов EMCD DS 2.0 (пилот)

| Папка | Что |
|---|---|
| `styles/components.css` | общий CSS компонентов (классы `emcd-*`), генерируется `npm run code`; подключать после `build/css/index.css` |
| `react/` | React 18: `src/index.js` (без JSX), типы `index.d.ts` |
| `vue/` | Vue 3: `src/Ds*.vue`, `src/index.js` |

Пилот: Button, Icon button, Badge, Chip, Checkbox, Radio (+ Radio group), Toggle, Input, Textarea, Modal.
Пачка 2: Tabs (+ Tab), Segmented (+ Segment), Card, Stat card, Amount, Toast, Tooltip, Suggest, Status, Counter, Avatar, Divider, Spinner, Progress, List item, Transaction, Select, Menu (+ Menu item), Password field.
Пачка 3 (экраны майнинга): Icon, Coin, Coin stack, Nav item, Key-value row, Search, Select compact, Date range field, Page indicator, Legend swatch, Legend item, Chart metric, Table header cell, Table cell, Table row, Table (паттерн), Promo card, Sidebar, Chart plot, Chart card; конструкции (draft) — Top bar, Status summary, Promo carousel, Action bar.
Иконки и монеты для кода — реестр `scripts/icons-code.mjs` (из `icons/svg` и `icons/symbols/coin`): блок `// @icons:begin` в `react/src/index.js` и `vue/src/icons.js`; `npm run code` запускает его перед `code-build`.
Контролы неуправляемые по умолчанию (без `value` / `v-model` — своё состояние; прототип кликается), с `value` + `onChange` — управляемые. Props — по контрактам `docs/components/*.md`. Тема, бренд и платформа — атрибуты `data-theme`, `data-brand`, `data-platform` на `<html>` (`build/css`).

```html
<html data-theme="dark" data-brand="emcd" data-platform="web">
<link rel="stylesheet" href="build/css/index.css">
<link rel="stylesheet" href="packages/styles/components.css">
```

React: `import { Button } from '…/packages/react/src/index.js'` → `<Button type="primary" label="Вывести" />`.
Vue: `import { DsButton } from '…/packages/vue/src'` → `<DsButton type="primary" label="Вывести" />`.

## Проверка — `npm run test:code`

Стенд `tests/code/` (свой `package.json`: react 18.3.1, react-dom, vue 3.5, @vue/server-renderer, @vue/compiler-sfc; корневые devDependencies не трогает):
- React — каждый экспорт `react/src/index.js` рендерится `renderToString` с представительными props (все значения осей + свойства 17–19.11) в Light и Dark; ошибка или предупреждение React — провал;
- Vue — каждый `vue/src/*.vue` компилируется `@vue/compiler-sfc` и рендерится `@vue/server-renderer`; предупреждение Vue — провал;
- классы — каждый `emcd-*` из разметки обоих фреймворков должен быть в `styles/components.css`.

Новый компонент — добавить представительные props в `tests/code/ssr.mjs` (без них стенд падает).

## Приведено к контрактам 17–19.11

| Набор | Что изменилось |
|---|---|
| Button | `size`: + `xs` 24 (только Web, без min-width); `xl` — только App (главный CTA внизу экрана); поля и зазор иконка — подпись по замеру Figma 19.11: XS 4 / 2, S 6 / 4, M 12 / 4, L 12 / 4, XL 16 / 4; min-width 64; иконки цвета подписи; Text — без отступов, `action-primary-default` |
| Icon button | `size`: `xs` · `s` · `m` · `l` (XL снят) |
| Badge | Subtle · Neutral — `status-neutral-subtle` + обводка `border-subtle`, текст `text-secondary` |
| Counter | квадрат `radius-sm`; Neutral — обводка `border-subtle`, цифра `text-secondary` |
| Chip | Selected — белая инверсная плашка, Meta `text-inverse-secondary`, слой состояний обычный; `statusDot` + `statusTone`; Disabled — без подложки |
| Tab / Tabs | `size`: `page` вместо `xl` (64, heading-md Medium); `statusDot` + `statusTone`; Counter — квадрат |
| Status | точка 6 у S и M; подпись Medium, `text-primary`; общая точка `.emcd-dot` для Tab и Chip |
| Amount | S 12 / M 14 — шрифт текста с табличными цифрами (моно снято); L — `heading-lg` (Web 24, Compact 20) Bold, тикер того же кегля Medium; XL — display; `align` start · end |
| Stat card | `tone` neutral · danger · warning · success; `align` start · center (поля 4 / 32); `link` + `onLink` (Icon button XS: Danger — Secondary Danger, иначе Tertiary); min-width снят |
| Suggest | Strip — `radius-inner`, без иконки (если не передан `leading`), заголовок label-md цвета тона, крестик в строке |
| List item | `showDescription` (по умолчанию true) |
| Segmented / Segment | `size`: `s` · `m` · `l` (XL снят); сегмент не уже 64 / 80 / 96; подпись S — label-sm |
| Input / Select / Textarea / Password field | `size`: `m` · `l` (XL снят); Input — `labelPosition` по умолчанию `on-border`; Hover — обводка `control-border-hover`; Textarea — `size` |
| Card | Padding L — 24 сверху и снизу, 32 по бокам |
| Progress | значение — шрифт текста (моно снято) |
| Modal | кнопки футера — Button L (было XL) |

Пакеты пока не публикуются в npm: разработка забирает исходники; DSP / ui-emcd-web сверяет с ними свои компоненты.
