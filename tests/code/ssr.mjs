#!/usr/bin/env node
// Стенд кода компонентов EMCD DS 2.0 (критерий K5): SSR React 18 и Vue 3.
//   React — каждый экспорт packages/react/src/index.js рендерится renderToString с представительными props в Light и Dark;
//           любая ошибка или предупреждение React (console.error / console.warn) — провал.
//   Vue   — каждый packages/vue/src/*.vue компилируется @vue/compiler-sfc и рендерится @vue/server-renderer; предупреждения Vue — провал.
//   Классы — каждый класс emcd-* из разметки обоих фреймворков должен быть в packages/styles/components.css (одни классы на React, Vue и HTML).
// Запуск: npm run test:code (из корня) или cd tests/code && npm ci && node ssr.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const OUT = path.join(HERE, '.out');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const THEMES = ['light', 'dark'];
const failures = [];
const stats = { react: 0, vue: 0, reactComps: 0, vueComps: 0 };
const css = fs.readFileSync(path.join(ROOT, 'packages/styles/components.css'), 'utf8');
const cssClasses = new Set([...css.matchAll(/\.(emcd-[\w-]+)/g)].map((m) => m[1]));
// Классы-маркеры без своих стилей (состояние / обёртка для продукта) — допустимы.
const CLASS_OK = new Set(['emcd', 'emcd-amount--negative', 'emcd-list-item--description-first', 'emcd-tx--withdrawal', 'emcd-tx--deposit', 'emcd-tx--reward', 'emcd-tx--exchange', 'emcd-tx--completed', 'emcd-tx--pending', 'emcd-tx--failed']);
const missingClasses = new Map();
function checkClasses(html, where) {
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    for (const c of m[1].split(/\s+/)) {
      if (c.startsWith('emcd') && !cssClasses.has(c) && !CLASS_OK.has(c)) missingClasses.set(c, where);
    }
  }
}

// Перехват предупреждений: React пишет их в console.error / console.warn.
const captured = [];
const orig = { error: console.error, warn: console.warn };
console.error = (...a) => captured.push(a.map(String).join(' '));
console.warn = (...a) => captured.push(a.map(String).join(' '));
const restore = () => { console.error = orig.error; console.warn = orig.warn; };

// ───────────── React ─────────────
// Исходник копируется в .out, чтобы `react` разрешался из tests/code/node_modules.
fs.copyFileSync(path.join(ROOT, 'packages/react/src/index.js'), path.join(OUT, 'react-index.mjs'));
const React = (await import('react')).default;
const { renderToString } = await import('react-dom/server');
const R = await import(pathToFileURL(path.join(OUT, 'react-index.mjs')).href);
const h = React.createElement;
const ico = () => h('svg', { viewBox: '0 0 24 24', 'aria-hidden': true }, h('path', { d: 'M12 5v14M5 12h14' }));

// Представительные props: каждое значение каждой оси хотя бы раз + новые свойства 17–19.11.
const RC = {
  Button: [
    ...['primary', 'secondary', 'tertiary', 'tertiary-outline', 'text', 'inverted'].map((type) => ({ type, label: 'Вывести' })),
    ...['xs', 's', 'm', 'l', 'xl'].map((size) => ({ size, label: 'Вывести', iconLeft: ico(), iconRight: ico() })),
    { tone: 'danger', label: 'Удалить' }, { type: 'text', tone: 'danger', label: 'Удалить' }, { loading: true, label: 'Вывести' }, { disabled: true, label: 'Вывести' },
  ],
  IconButton: [
    ...['primary', 'secondary', 'tertiary', 'tertiary-outline', 'ghost', 'text', 'inverted'].map((type) => ({ type, label: 'Закрыть', icon: ico() })),
    ...['xs', 's', 'm', 'l'].map((size) => ({ size, label: 'Закрыть', icon: ico() })),
    { tone: 'danger', label: 'Удалить', icon: ico() }, { loading: true, label: 'Обновить' },
  ],
  Badge: [
    ...['neutral', 'accent', 'success', 'warning', 'danger'].flatMap((tone) => ['subtle', 'solid'].map((style) => ({ tone, style, label: 'Активен' }))),
    ...['s', 'm', 'l'].map((size) => ({ size, label: 'Beta', icon: ico() })), { skeleton: true, label: 'x' },
  ],
  Chip: [
    { label: '360 дней' }, { size: 'm', label: '90 дней', metaText: '8 %' }, { selected: true, label: 'Все', metaText: '20' },
    ...['success', 'warning', 'danger', 'neutral'].map((statusTone) => ({ statusDot: true, statusTone, label: 'Онлайн', metaText: '128' })),
    { selected: true, label: 'BTC', onRemove: () => {} }, { icon: ico(), trailingIcon: ico(), label: 'Монета' }, { disabled: true, label: 'Нет' },
  ],
  Checkbox: [{ label: 'Согласен' }, { status: 'on', label: 'Да', description: 'Описание' }, { status: 'indeterminate', size: 's', label: 'Часть' }, { tone: 'danger', controlPosition: 'end', label: 'Ошибка' }],
  Radio: [{ label: 'Один', name: 'r', value: '1' }, { status: true, size: 's', label: 'Два', name: 'r', value: '2' }, { tone: 'danger', controlPosition: 'end', label: 'Три' }],
  RadioGroup: [{ legend: 'Сеть', children: h(R.Radio, { label: 'TRC-20', name: 'n', value: 't' }) }],
  Toggle: [{ label: 'Уведомления' }, { status: true, size: 's', controlPosition: 'start', label: 'Вкл', description: 'Описание' }],
  Input: [
    { label: 'Сумма', placeholder: '0' }, { size: 'l', labelPosition: 'above', label: 'Адрес', hint: 'Подсказка', counter: '0/64' },
    ...['error', 'disabled', 'readonly', 'loading', 'skeleton'].map((state) => ({ state, label: 'Поле', defaultValue: 'abc' })),
    { label: 'Сумма', error: 'Мало', leading: ico(), trailing: ico(), suffix: 'USDT' },
  ],
  Textarea: [{ label: 'Комментарий' }, { size: 'l', label: 'Обращение', maxLength: 200, defaultValue: 'Текст' }, { state: 'error', error: 'Пусто' }, { state: 'readonly', defaultValue: 'x' }],
  Modal: [
    { title: 'Вывод', children: 'Текст', actions: h(R.Button, { size: 'l', label: 'Вывести' }) },
    { header: 'coin', title: 'Bitcoin', description: 'BTC', footer: 'horizontal', divider: true, width: 'sm', actions: [h(R.Button, { key: 1, size: 'l', type: 'tertiary', label: 'Отмена' }), h(R.Button, { key: 2, size: 'l', label: 'Ок' })] },
    { header: 'empty', footer: 'none', width: 'lg', scrim: false, title: 'Пусто' }, { open: false },
  ],
  Counter: [{ value: 12 }, { size: 'm', tone: 'accent', value: 3 }, { tone: 'danger', value: 99 }],
  Status: ['success', 'warning', 'danger', 'info', 'neutral'].flatMap((tone) => [{ tone, label: 'Активен' }, { tone, size: 'm', label: 'Активен' }]).concat([{ showLabel: false, label: 'Онлайн' }]),
  Avatar: [{ name: 'Иван' }, { size: 's', initials: 'И', status: true }, { size: 'm', src: 'a.png', alt: 'Фото' }, { size: 'l', type: 'icon' }, { skeleton: true }],
  Divider: [{}, { label: true }, { orientation: 'vertical' }, { style: 'dotted' }],
  Spinner: [{}, { size: 'm' }, { size: 'l', label: 'Загружаем' }],
  Progress: [{ label: 'Лимит', value: '6 000 / 10 000 USDT', percent: 60 }, ...['success', 'warning', 'danger'].map((tone) => ({ tone, size: 'm', percent: 90, label: 'x' })), { mode: 'indeterminate', label: 'Загрузка' }],
  Amount: [
    ...['s', 'm', 'l', 'xl'].flatMap((size) => ['none', 'positive', 'negative'].map((sign) => ({ size, sign, value: '0.12345678', ticker: 'BTC', fiat: '≈ $2,731.40' }))),
    { align: 'end', value: 12, ticker: 'USDT', showFiat: false },
  ],
  Card: [{ children: 'Контент' }, { level: 0, radius: 'surface', padding: 'l', children: 'x' }, { level: 2, radius: 'inner', padding: 'm', border: false, children: 'x' }, { level: 3, href: '#', children: 'x' }, { onClick: () => {}, children: 'x' }],
  StatCard: [
    { label: 'Хешрейт · 24 ч', value: '124.5', unit: 'TH/s', infoText: 'Средний хешрейт', deltaValue: '+4.2%', deltaCaption: 'к вчера' },
    ...['neutral', 'danger', 'warning', 'success'].flatMap((tone) => ['start', 'center'].map((align) => ({ tone, align, link: true, label: 'Воркеры', value: '12', delta: false }))),
    { deltaTone: 'danger', deltaValue: '−1%', showFooter: true, footer: h('span', null, 'graph'), ambientLight: true, label: 'x', value: '1' }, { skeleton: true }, { skeleton: true, align: 'center', tone: 'success' },
  ],
  Tooltip: [{ text: 'Подсказка' }, ...['bottom', 'start', 'end'].map((placement) => ({ placement, tone: 'accent', arrow: 'start', text: 'x' })), { text: 'x', children: h('button', null, 'i') }, { text: 'x', open: true, children: h('button', null, 'i') }],
  Toast: [{ title: 'Готово', description: 'Описание' }, ...['success', 'warning', 'danger', 'neutral'].map((tone) => ({ tone, title: 'x', actions: true, timer: true, duration: 5000 })), { layout: 'informer', title: 'Нет сети' }],
  Suggest: [
    ...['neutral', 'accent', 'success', 'warning', 'danger'].flatMap((tone) => ['card', 'strip'].map((layout) => ({ tone, layout, title: 'Кошелёк', description: 'Теперь отдельный адрес', secondaryAction: true }))),
    { layout: 'strip', leading: ico(), title: 'x', close: false }, { showLeading: false, primaryAction: false, title: 'x' },
  ],
  Tab: [
    ...['s', 'm', 'l', 'page'].map((size) => ({ size, label: 'Воркеры', counter: 12 })),
    ...['success', 'warning', 'danger', 'neutral'].map((statusTone) => ({ statusDot: true, statusTone, selected: true, label: 'Активные', counter: 3, counterTone: 'neutral' })),
    { icon: ico(), label: 'x', counterTone: 'danger', counter: 1 }, { disabled: true, label: 'x' }, { skeleton: true, label: 'x' },
  ],
  Tabs: [
    ...['s', 'm', 'l', 'page'].map((size) => ({ size, label: 'Разделы', items: [{ label: 'Начисления' }, { label: 'Выплаты', counter: 2 }, { label: 'Воркеры', statusDot: true, statusTone: 'danger' }] })),
    { defaultValue: 'b', children: [h(R.Tab, { key: 'a', value: 'a', label: 'A' }), h(R.Tab, { key: 'b', value: 'b', label: 'B' })] },
  ],
  Segment: [{ label: 'Список' }, { selected: true, tone: 'accent', label: 'x' }, { showLabel: false, label: 'Иконка', icon: ico() }, { disabled: true, label: 'x' }],
  Segmented: [
    ...['s', 'm', 'l'].map((size) => ({ size, label: 'Вид', items: [{ label: 'Список' }, { label: 'Группы' }] })),
    { tone: 'accent', block: true, items: [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }] },
    { defaultValue: 2, children: [h(R.Segment, { key: 1, value: 1, label: '24 ч' }), h(R.Segment, { key: 2, value: 2, label: '7 д' })] },
  ],
  ListItem: [
    ...['text-first', 'description-first', 'big-value', 'description-only'].flatMap((content) => ['l', 'm'].map((size) => ({ content, size, label: 'BTC', description: 'Bitcoin', value: '0.5', subvalue: 'BTC' }))),
    { label: 'Дневной доход', description: 'скрыто', showDescription: false, trailing: h(R.Amount, { value: 1, ticker: 'BTC', align: 'end' }) },
    { leading: ico(), href: '#', divider: true, label: 'x' }, { onClick: () => {}, disabled: true, label: 'x' },
  ],
  Transaction: ['withdrawal', 'deposit', 'reward', 'exchange'].flatMap((type) => ['completed', 'pending', 'failed'].map((status) => ({ type, status, description: '19.11', value: '0.1', ticker: 'BTC' }))),
  MenuItem: [{ label: 'Копировать' }, { size: 'l', leading: ico(), trailing: 'x', description: 'Описание', label: 'BTC' }, { tone: 'danger', label: 'Удалить' }, { showSelection: true, defaultSelected: true, label: 'x' }, { selected: true, label: 'x' }, { disabled: true, label: 'x' }],
  Menu: [{ items: [{ group: 'Группа' }, { label: 'A' }, { divider: true }, { label: 'B', tone: 'danger' }] }, { search: true, size: 'l', role: 'listbox', items: [{ label: 'A' }] }],
  Select: [
    { label: 'Монета', options: [{ value: 'btc', label: 'BTC' }, { value: 'eth', label: 'ETH', disabled: true }] },
    { size: 'l', defaultValue: 'btc', defaultOpen: true, options: [{ value: 'btc', label: 'BTC', leading: ico() }] },
    ...['error', 'disabled', 'loading', 'skeleton'].map((state) => ({ state, label: 'x', hint: 'Подсказка', options: [] })), { state: 'loading', open: true, options: [] },
  ],
  PasswordField: [{}, { showRequirements: false, size: 'l', labelPosition: 'above' }, { state: 'error', error: 'Неверный пароль', defaultValue: 'Abc1!' }, { state: 'disabled', defaultVisible: true }],
};

const exported = Object.keys(R).filter((k) => k !== 'components');
for (const name of exported) {
  const cases = RC[name];
  if (!cases) { failures.push(`React ${name}: нет представительных props в tests/code/ssr.mjs`); continue; }
  stats.reactComps++;
  for (const theme of THEMES) {
    cases.forEach((props, i) => {
      captured.length = 0;
      try {
        const html = renderToString(h('div', { 'data-theme': theme }, h(R[name], props)));
        stats.react++;
        checkClasses(html, `React ${name}#${i}`);
        if (captured.length) failures.push(`React ${name}#${i} (${theme}): предупреждение — ${captured[0].slice(0, 300)}`);
      } catch (e) { failures.push(`React ${name}#${i} (${theme}): ${e.message}`); }
    });
  }
}
for (const name of Object.keys(RC)) if (!exported.includes(name)) failures.push(`React ${name}: в тестах есть, в экспорте нет`);

// ───────────── Vue ─────────────
const { parse, compileScript } = await import('@vue/compiler-sfc');
const VUE_SRC = path.join(ROOT, 'packages/vue/src');
const vueFiles = fs.readdirSync(VUE_SRC).filter((f) => f.endsWith('.vue')).sort();
for (const f of vueFiles) {
  const src = fs.readFileSync(path.join(VUE_SRC, f), 'utf8');
  const { descriptor, errors } = parse(src, { filename: f });
  if (errors.length) { failures.push(`Vue ${f}: разбор — ${errors[0].message}`); continue; }
  try {
    const out = compileScript(descriptor, { id: f, inlineTemplate: true, isProd: false });
    const code = out.content.replace(/from '\.\/(\w+)\.vue'/g, "from './$1.mjs'");
    fs.writeFileSync(path.join(OUT, f.replace(/\.vue$/, '.mjs')), code);
  } catch (e) { failures.push(`Vue ${f}: компиляция — ${e.message}`); }
}
const vue = await import('vue');
const { renderToString: vueRender } = await import('@vue/server-renderer');
const vh = vue.h;
const vico = () => vh('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }, [vh('path', { d: 'M12 5v14M5 12h14' })]);

// Vue: [props, slots?]. Имена props — как в DsX.vue (Badge style → variant, Chip onRemove → removable).
const VC = {
  DsButton: [[{ label: 'Вывести' }], ...['xs', 's', 'l', 'xl'].map((size) => [{ size, label: 'x' }, { iconLeft: vico, iconRight: vico }]), [{ type: 'text', tone: 'danger', label: 'x' }], [{ loading: true, label: 'x' }]],
  DsIconButton: [...['xs', 's', 'm', 'l'].map((size) => [{ size, label: 'Закрыть' }, { default: vico }]), [{ type: 'ghost', tone: 'danger', loading: true, label: 'x' }]],
  DsBadge: [[{ label: 'Активен' }], [{ size: 'l', tone: 'success', variant: 'solid', label: 'x' }, { icon: vico }], [{ size: 's', tone: 'accent' }], [{ skeleton: true, label: 'x' }]],
  DsChip: [[{ label: '360 дней' }], [{ selected: true, label: 'Все', metaText: 20 }], [{ statusDot: true, statusTone: 'danger', label: 'Офлайн', metaText: 4 }], [{ removable: true, selected: true, label: 'BTC', statusDot: true }], [{ size: 'm', disabled: true, label: 'x' }]],
  DsCheckbox: [[{ label: 'Согласен' }], [{ status: 'indeterminate', size: 's', label: 'x', description: 'y' }], [{ status: 'on', tone: 'danger', controlPosition: 'end', label: 'x' }]],
  DsRadio: [[{ label: 'Один', name: 'r', value: '1' }], [{ status: true, size: 's', label: 'x', name: 'r', value: '2' }]],
  DsRadioGroup: [[{ legend: 'Сеть' }, { default: () => 'x' }]],
  DsToggle: [[{ label: 'Уведомления' }], [{ status: true, controlPosition: 'start', size: 's', label: 'x' }]],
  DsInput: [[{ label: 'Сумма' }], [{ size: 'l', labelPosition: 'above', label: 'x', hint: 'y', counter: '0/64', suffix: 'USDT' }, { leading: vico, trailing: vico }],
    ...['error', 'disabled', 'readonly', 'loading', 'skeleton'].map((state) => [{ state, label: 'x' }])],
  DsTextarea: [[{ label: 'Комментарий' }], [{ size: 'l', label: 'x', maxlength: 200, modelValue: 'Текст' }], [{ state: 'error', error: 'Пусто' }]],
  DsModal: [[{ title: 'Вывод' }, { default: () => 'Текст', footer: () => 'кнопки' }], [{ header: 'coin', footer: 'horizontal', title: 'x', description: 'y', divider: true, width: 'sm' }], [{ header: 'empty', footer: 'none', scrim: false }], [{ open: false }]],
  DsCounter: [[{ value: 12 }], [{ size: 'm', tone: 'accent', value: 3 }], [{ tone: 'danger', value: 99 }]],
  DsStatus: ['success', 'warning', 'danger', 'info', 'neutral'].map((tone) => [{ tone, size: 'm', label: 'Активен' }]).concat([[{ showLabel: false, label: 'x' }]]),
  DsAvatar: [[{ name: 'Иван' }], [{ size: 's', initials: 'И', status: true }], [{ size: 'm', src: 'a.png' }], [{ size: 'l', type: 'icon' }], [{ skeleton: true }]],
  DsDivider: [[{}], [{ label: true }], [{ orientation: 'vertical' }], [{ variant: 'dotted' }]],
  DsSpinner: [[{}], [{ size: 'l', label: 'x' }]],
  DsProgress: [[{ label: 'Лимит', value: '6 000 / 10 000', percent: 60 }], [{ tone: 'danger', size: 'm', percent: 100 }], [{ mode: 'indeterminate', label: 'x' }]],
  DsAmount: ['s', 'm', 'l', 'xl'].map((size) => [{ size, sign: 'positive', value: '0.1234', ticker: 'BTC', fiat: '≈ $2,731.40' }]).concat([[{ sign: 'negative', align: 'end', value: 5, ticker: 'USDT', showFiat: false }]]),
  DsCard: [[{}, { default: () => 'x' }], [{ level: 0, radius: 'surface', padding: 'l' }, { default: () => 'x' }], [{ level: 2, href: '#' }, { default: () => 'x' }]],
  DsStatCard: [[{ label: 'Хешрейт', value: '124.5', unit: 'TH/s', infoText: 'x', deltaValue: '+4%', deltaCaption: 'к вчера' }],
    ...['neutral', 'danger', 'warning', 'success'].flatMap((tone) => ['start', 'center'].map((align) => [{ tone, align, link: true, label: 'Воркеры', value: '12', delta: false }])),
    [{ showFooter: true, ambientLight: true, label: 'x', value: 1 }, { footer: () => 'graph' }], [{ skeleton: true, align: 'center' }]],
  DsTooltip: [[{ text: 'Подсказка' }], [{ placement: 'end', tone: 'accent', arrow: 'start', text: 'x' }, { default: () => vh('button', null, 'i') }]],
  DsToast: [[{ title: 'Готово', description: 'x' }], [{ tone: 'danger', actions: true, timer: true, duration: 5000, title: 'x' }], [{ layout: 'informer', tone: 'neutral', title: 'x' }]],
  DsSuggest: ['neutral', 'accent', 'success', 'warning', 'danger'].flatMap((tone) => ['card', 'strip'].map((layout) => [{ tone, layout, title: 'Кошелёк', description: 'x', secondaryAction: true }]))
    .concat([[{ layout: 'strip', title: 'x' }, { leading: vico }], [{ showLeading: false, primaryAction: false, close: false, title: 'x' }]]),
  DsTab: ['s', 'm', 'l', 'page'].map((size) => [{ size, label: 'Воркеры', counter: 12 }]).concat([[{ statusDot: true, statusTone: 'warning', selected: true, label: 'Нестабильные', counter: 2 }], [{ skeleton: true, label: 'x' }]]),
  DsTabs: ['s', 'm', 'l', 'page'].map((size) => [{ size, label: 'Разделы', items: [{ label: 'A' }, { label: 'B', counter: 2, statusDot: true, statusTone: 'danger' }] }]),
  DsSegment: [[{ label: 'Список' }], [{ selected: true, tone: 'accent', label: 'x' }], [{ showLabel: false, label: 'x' }, { icon: vico }]],
  DsSegmented: ['s', 'm', 'l'].map((size) => [{ size, label: 'Вид', items: [{ label: 'Список' }, { label: 'Группы' }] }]).concat([[{ block: true, tone: 'accent', items: [{ label: '1' }, { label: '2' }] }]]),
  DsListItem: ['text-first', 'description-first', 'big-value', 'description-only'].map((content) => [{ content, label: 'BTC', description: 'Bitcoin', value: '0.5', subvalue: 'BTC' }])
    .concat([[{ size: 'm', label: 'Дневной доход', description: 'скрыто', showDescription: false }, { trailing: () => 'x' }], [{ href: '#', divider: true, label: 'x' }, { leading: vico }], [{ interactive: true, disabled: true, label: 'x' }]]),
  DsTransaction: ['withdrawal', 'deposit', 'reward', 'exchange'].map((type, i) => [{ type, status: ['completed', 'pending', 'failed', 'completed'][i], value: '0.1', ticker: 'BTC', description: '19.11' }]),
  DsMenuItem: [[{ label: 'Копировать' }], [{ size: 'l', tone: 'danger', label: 'x', description: 'y' }, { leading: vico, trailing: () => 'x' }], [{ showSelection: true, selected: true, label: 'x' }], [{ disabled: true, label: 'x' }]],
  DsMenu: [[{ items: [{ group: 'Группа' }, { label: 'A' }, { divider: true }, { label: 'B', tone: 'danger' }] }], [{ search: true, size: 'l', role: 'listbox', items: [{ label: 'A' }] }]],
  DsSelect: [[{ label: 'Монета', options: [{ value: 'btc', label: 'BTC' }] }], [{ size: 'l', modelValue: 'btc', open: true, options: [{ value: 'btc', label: 'BTC' }, { value: 'x', label: 'X', disabled: true }] }],
    ...['error', 'disabled', 'loading', 'skeleton'].map((state) => [{ state, label: 'x', hint: 'y' }])],
  DsPasswordField: [[{}], [{ showRequirements: false, size: 'l', labelPosition: 'above' }], [{ state: 'error', error: 'Неверный', modelValue: 'Abc1!' }], [{ state: 'disabled', visible: true }]],
};

for (const f of vueFiles) {
  const name = f.replace(/\.vue$/, '');
  const cases = VC[name];
  if (!cases) { failures.push(`Vue ${name}: нет представительных props в tests/code/ssr.mjs`); continue; }
  const file = path.join(OUT, name + '.mjs');
  if (!fs.existsSync(file)) continue;
  let Comp;
  try { Comp = (await import(pathToFileURL(file).href)).default; } catch (e) { failures.push(`Vue ${name}: импорт — ${e.message}`); continue; }
  stats.vueComps++;
  for (const theme of THEMES) {
    for (const [i, [props, slots]] of cases.entries()) {
      const warns = [];
      const app = vue.createSSRApp({ render: () => vh('div', { 'data-theme': theme }, [vh(Comp, props, slots)]) });
      app.config.warnHandler = (msg) => warns.push(msg);
      app.config.errorHandler = (err) => { throw err; };
      captured.length = 0;
      try {
        const html = await vueRender(app);
        stats.vue++;
        checkClasses(html, `Vue ${name}#${i}`);
        const w = warns[0] || captured[0];
        if (w) failures.push(`Vue ${name}#${i} (${theme}): предупреждение — ${String(w).slice(0, 300)}`);
      } catch (e) { failures.push(`Vue ${name}#${i} (${theme}): ${e.message}`); }
    }
  }
}
for (const name of Object.keys(VC)) if (!vueFiles.includes(name + '.vue')) failures.push(`Vue ${name}: в тестах есть, файла нет`);

for (const [c, where] of missingClasses) failures.push(`Класс ${c} (${where}) — нет в packages/styles/components.css`);

restore();
fs.rmSync(OUT, { recursive: true, force: true });
console.log(`test:code — React: компонентов ${stats.reactComps}/${exported.length}, рендеров ${stats.react} (Light + Dark); Vue: компонентов ${stats.vueComps}/${vueFiles.length}, рендеров ${stats.vue} (Light + Dark); классов emcd-* в CSS: ${cssClasses.size}`);
if (failures.length) {
  console.log(`ПРОВАЛ: ${failures.length}`);
  for (const f of failures.slice(0, 80)) console.log('  ✗ ' + f);
  process.exit(1);
}
console.log('ОК: ошибок и предупреждений нет');
