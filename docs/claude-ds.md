# Claude DS — дизайн-система в Claude Design

Артефакт «EMCD DS 2.0»: (ссылка в `docs/private/LINKS.md`, не в git) (тип Design System; Claude Design берёт его в любом чате, Settings → Design systems).

**Правило:** значения токенов, статусы и компоненты, перенесённые в репо, приходят только из репо. Руками на странице артефакта их не правим — следующая синхронизация перезапишет.

## Что откуда

| В артефакте (`project/…`) | Источник |
|---|---|
| значения цветов (Dark / Light), отступов, скруглений, кегли | `build/json/emcd.{dark,light}.ios.json` — Figma Foundations после экспорта |
| подписи токенов, проза README, веса и примеры шрифтов | сам артефакт (сохраняются при синхронизации) |
| статус в карточке, README компонента и таблица в README | `claude-ds/status.json` = эмодзи страницы в Figma Components |
| компонент, перенесённый в репо: `preview.html`, `README.md`, свой блок в `bundle.css` | `claude-ds/components/<Comp>/{preview.html,README.md,style.css}` |
| остальные компоненты (пока) | сам артефакт; переносим в репо, когда компонент становится 🟡 beta |
| `components/bundle.js` (React 18 → `window.EMCD`), `components/index.d.ts` | `claude-ds/bundle/` ← `npm run code` из `packages/react` (пилот: 10 наборов) |

Новые токены получают подпись по группе (можно уточнить на странице — подпись сохранится). Токены, которых нет в репо, не удаляются, а перечисляются.

## Код: React и Vue (с 2026-11-16)

- `packages/react/src/index.js` — компоненты React 18 без JSX и сборщика (`React.createElement`); `packages/react/index.d.ts` — props по контрактам `docs/components/*.md`.
- `packages/vue/src/Ds*.vue` — те же компоненты на Vue 3 (`<script setup>`, `defineModel`); API совпадает, отличие — `variant` вместо `style` у Badge и `v-model` у полей и выбора.
- `packages/styles/components.css` — общий CSS (классы `emcd-*`) из `claude-ds/components/<Comp>/style.css` + мост имён к `build/css`. Подключать после токенов `build/css/index.css`.
- `npm run code` пересобирает CSS, `claude-ds/bundle/bundle.js` и типы; `node scripts/code-build.mjs --check` — проверка, что сборка не отстала.
- Пачка 2 (2026-11-16): Tabs / Tab, Segmented / Segment, Card, StatCard, Amount, Toast, Tooltip, Suggest, Status, Counter, Avatar, Divider, Spinner, Progress, ListItem, Transaction, Select, Menu / MenuItem, PasswordField. `preview.html` пачки 2 сняты с React SSR — разметка совпадает с кодом. Отличия API от Figma: массивы `items` / `options` вместо булевых Tab 3 – 6 и оси Items; `counter` у Tab — число, а не булево; у Divider во Vue `variant` вместо `style`.
- Новый компонент в коде: разметка и CSS — `claude-ds/components/<Comp>/`, React — в `packages/react/src/index.js`, Vue — `packages/vue/src/Ds<Comp>.vue`, типы — `index.d.ts`; затем `npm run code` и «обнови Claude DS». Проверка: SSR React и Vue + скриншоты Light / Dark.

## Статусы

🟢 stable и 🟡 beta — брать в макеты; 🟠 draft — карточка в группе «Draft — в макеты не брать», README компонента говорит то же; 🔴 deprecated — карточка в своей группе (удалить файлы из артефакта — только с ок Стефана). Статус меняем в `status.json` вместе с эмодзи страницы в Figma.

## Когда синхронизировать — «обнови Claude DS»

1. После публикации Foundations: экспорт → `npm run all` → commit/push → «обнови Claude DS».
2. Компонент сменил статус или поменялся в `claude-ds/components` → commit/push → «обнови Claude DS».

## Что делает Claude по «обнови Claude DS»

1. Репо — с main (`git pull` на Mac или clone в контейнере).
2. Artifact `read` артефакта → папка `…/artifacts/<id>/project`.
3. `node scripts/claude-ds.mjs --base <та папка>` → в `claude-ds/out/project` только изменившиеся файлы, список — в выводе и `claude-ds/out/changed.json`. Проверить предупреждения (`var()` без значения, токены без пары в репо).
4. Скопировать их в папку артефакта и опубликовать в тот же url, по 16 файлов за вызов; `project/design-system.json` — последним: прочитать заново и поменять только `lastChange` = `{by: "Stephane", at: <сейчас>, via: "GitHub · vsdsgn/emcd-design-tokens@<sha>", note: "<что изменилось>"}`.
5. Записать дату и sha синхронизации в HANDOFF.

Повторный запуск без изменений в репо даёт 0 файлов — скрипт идемпотентен.

## Ограничения

- Claude Design рендерит только React: Vue — в репо, в README компонента — строка «Код».

- Структуру компонентов из Figma в код переносим вручную (или с Claude) — генерации из Figma нет. Токены синхронизируются автоматически.
- Цвета — бренд EMCD; Geometria и WL в артефакте не показаны (в репо это режимы Brand).
- Пока Foundations не экспортированы, новых имён (`surface-level-*`, `action-accent-*`, `state-layer`, `text-accent-hover`) в `tokens.json` нет; CSS Button держит запасные значения на старые имена.
- Общая секция старого `bundle.css` (`/* Checkbox & Radio */`) заменяется блоком первого компонента из названия; второй дописывается в конец (Radio опирается на `.emcd-check` из Checkbox).
- Проверка превью — рендером: headless Chromium, `tokens.json` → CSS-переменные по теме, `bundle.css` + `preview.html`, Light и Dark; смотреть переполнение высоты `height=` из первой строки.
- CI синхронизацию не проверяет: для неё нужен артефакт (Artifact-инструмент Claude).
