# Код компонентов EMCD DS 2.0 (пилот)

| Папка | Что |
|---|---|
| `styles/components.css` | общий CSS компонентов (классы `emcd-*`), генерируется `npm run code`; подключать после `build/css/index.css` |
| `react/` | React 18: `src/index.js` (без JSX), типы `index.d.ts` |
| `vue/` | Vue 3: `src/Ds*.vue`, `src/index.js` |

Пилот: Button, Icon button, Badge, Chip, Checkbox, Radio (+ Radio group), Toggle, Input, Textarea, Modal. Props — по контрактам `docs/components/*.md`. Тема, бренд и платформа — атрибуты `data-theme`, `data-brand`, `data-platform` на `<html>` (`build/css`).

```html
<html data-theme="dark" data-brand="emcd" data-platform="web">
<link rel="stylesheet" href="build/css/index.css">
<link rel="stylesheet" href="packages/styles/components.css">
```

React: `import { Button } from '…/packages/react/src/index.js'` → `<Button type="primary" label="Вывести" />`.
Vue: `import { DsButton } from '…/packages/vue/src'` → `<DsButton type="primary" label="Вывести" />`.

Пакеты пока не публикуются в npm: разработка забирает исходники; DSP / ui-emcd-web сверяет с ними свои компоненты.
