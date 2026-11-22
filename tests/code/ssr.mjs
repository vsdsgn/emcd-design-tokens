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
    { skeleton: true, label: '7 дней' }, { skeleton: true, size: 'm', selected: true, label: 'Все', metaText: '20' },
  ],
  Checkbox: [{ label: 'Согласен' }, { status: 'on', label: 'Да', description: 'Описание' }, { status: 'indeterminate', size: 's', label: 'Часть' }, { tone: 'danger', controlPosition: 'end', label: 'Ошибка' }],
  Radio: [{ label: 'Один', name: 'r', value: '1' }, { status: true, size: 's', label: 'Два', name: 'r', value: '2' }, { tone: 'danger', controlPosition: 'end', label: 'Три' }],
  RadioGroup: [{ legend: 'Сеть', children: h(R.Radio, { label: 'TRC-20', name: 'n', value: 't' }) }],
  Toggle: [{ label: 'На Coinhold', badge: '8% APR', description: 'Дополнительный доход с намайненного' }, { label: 'Уведомления' }, { status: true, size: 's', controlPosition: 'start', label: 'Вкл', description: 'Описание' }],
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
  Skeleton: [{}, { shape: 'title', width: 200 }, { shape: 'circle', width: 24, height: 24 }, { shape: 'rect', height: 80, style: { marginTop: 4 } }],
  BulkActionBar: [{ count: 2, total: 120, actions: [{ label: 'Перевести в ожидание' }, { label: 'Сменить площадку' }], onMore: () => {}, onClear: () => {} }, { label: 'Выбраны все 120', onClear: () => {} }],
  StatusBar: [{ caption: 'Статусы активных устройств', segments: [{ tone: 'danger', label: 'Сбой', count: 1000, value: '1 000' }, { tone: 'success', label: 'Норма', count: 16500 }, { tone: 'neutral', label: 'Выкл', count: 0, value: '—' }] }, { showCaption: false, showLegend: false, segments: [{ tone: 'danger', label: 'Сбой', count: 1000, value: '1 000' }, { tone: 'success', label: 'Норма', count: 16500 }, { tone: 'neutral', label: 'Выкл', count: 0, value: '—' }] }],
  Progress: [{ label: 'Лимит', value: '6 000 / 10 000 USDT', percent: 60 }, ...['success', 'warning', 'danger'].map((tone) => ({ tone, size: 'm', percent: 90, label: 'x' })), { mode: 'indeterminate', label: 'Загрузка' }],
  Amount: [
    ...['s', 'm', 'l', 'xl'].flatMap((size) => ['none', 'positive', 'negative'].map((sign) => ({ size, sign, value: '0.12345678', ticker: 'BTC', fiat: '≈ $2,731.40' }))),
    { align: 'end', value: 12, ticker: 'USDT', showFiat: false },
    // Tone (19.11): цвет суммы без знака; со знаком не применяется
    ...['success', 'danger'].flatMap((tone) => [{ size: 'xl', tone, value: '≈ $352 665.84', showFiat: false }, { tone, sign: 'positive', value: 1, ticker: 'LTC' }]),
    // Skeleton (19.11): sign не применяется, фиат — при showFiat
    ...['s', 'm', 'l', 'xl'].map((size) => ({ size, sign: 'positive', skeleton: true })), { skeleton: true, align: 'end', showFiat: false, value: '1' },
  ],
  Card: [{ children: 'Контент' }, { level: 0, radius: 'surface', padding: 'l', children: 'x' }, { level: 2, radius: 'inner', padding: 'm', border: false, children: 'x' }, { level: 3, href: '#', children: 'x' }, { onClick: () => {}, children: 'x' }, { level: 2, padding: 'l', ambientLight: true, children: 'Coinhold' }],
  SectionHeader: [{ title: 'Переводить на Coinhold', caption: 'Ещё больше дохода с намайненных монет', trailing: h(R.Toggle, { status: true, label: 'до 9% годовых' }) },
    { size: 's', title: 'Сколько переводить?' }, { size: 's', level: 4, title: 'Прогноз доходности', caption: 'скрыта', showCaption: false },
    { level: 2, title: 'Типы уведомлений', children: h(R.Button, { type: 'text', size: 's', label: 'Отключить всё' }) }, { level: 5, title: 'x', trailing: 'y', showTrailing: false }],
  PageHeader: [{ title: 'Воркеры', subtitle: '12 активных из 14 · хешрейт 1.42 PH/s', actions: [h(R.Button, { key: 's', type: 'secondary', size: 'm', label: 'Экспорт' }), h(R.Button, { key: 'p', type: 'primary', size: 'm', label: 'Подключить' })] },
    { size: 'compact', title: 'Воркеры', subtitle: 'скрыт', showSubtitle: false, actions: h(R.Button, { type: 'primary', size: 'm', label: 'Подключить' }), showActions: false },
    { title: 'worker-1', level: 2, breadcrumbs: h('a', { href: '#' }, 'Воркеры'), tabs: h(R.Tabs, { size: 'l', label: 'Разделы', items: [{ value: 'a', label: 'Обзор' }, { value: 'b', label: 'История' }] }) },
    { size: 'compact', title: 'x', level: 7, tabs: 'табы', showTabs: false }],
  StatCard: [
    { label: 'Хешрейт · 24 ч', value: '124.5', unit: 'TH/s', infoText: 'Средний хешрейт', deltaValue: '+4.2%', deltaCaption: 'к вчера' },
    ...['neutral', 'danger', 'warning', 'success'].flatMap((tone) => ['start', 'center'].map((align) => ({ tone, align, link: true, label: 'Воркеры', value: '12', delta: false }))),
    { deltaTone: 'danger', deltaValue: '−1%', showFooter: true, footer: h('span', null, 'graph'), ambientLight: true, label: 'x', value: '1' }, { skeleton: true }, { skeleton: true, align: 'center', tone: 'success' }, { skeleton: true, align: 'center', delta: false, link: true }, { skeleton: true, showFooter: true, footer: h('span', null, 'graph') },
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
    { size: 'm', inset: false, showDescription: false, divider: true, leading: h(R.Coin, { coin: 'ltc', size: 'm' }), label: '8.9012 LTC', trailing: '≈ $78.90' },
  ],
  Transaction: ['withdrawal', 'deposit', 'reward', 'exchange'].flatMap((type) => ['completed', 'pending', 'failed'].map((status) => ({ type, status, description: '19.11', value: '0.1', ticker: 'BTC', fiat: '≈ $9 512.40' })))
    .concat([{ status: 'completed', value: '0.1', ticker: 'BTC' }, { status: 'pending', statusLabel: 'Ждёт подтверждения', value: '0.1', ticker: 'BTC' }]),
  MenuItem: [{ label: 'Копировать' }, { size: 'l', leading: ico(), trailing: 'x', description: 'Описание', label: 'BTC' }, { tone: 'danger', label: 'Удалить' }, { showSelection: true, defaultSelected: true, label: 'x' }, { selected: true, label: 'x' }, { disabled: true, label: 'x' }],
  Menu: [{ items: [{ group: 'Группа' }, { label: 'A' }, { divider: true }, { label: 'B', tone: 'danger' }] }, { search: true, size: 'l', role: 'listbox', items: [{ label: 'A' }] }],
  Select: [
    { label: 'Монета', options: [{ value: 'btc', label: 'BTC' }, { value: 'eth', label: 'ETH', disabled: true }] },
    { label: 'Сеть', labelPosition: 'on-border', hint: 'Комиссия сети 1 USDT', defaultValue: 'trc', options: [{ value: 'trc', label: 'TRC-20 · Tron' }] },
    { size: 'l', defaultValue: 'btc', defaultOpen: true, options: [{ value: 'btc', label: 'BTC', leading: ico() }] },
    ...['error', 'disabled', 'loading', 'skeleton'].map((state) => ({ state, label: 'x', hint: 'Подсказка', options: [] })), { state: 'loading', open: true, options: [] },
  ],
  PasswordField: [{}, { showRequirements: false, size: 'l', labelPosition: 'above' }, { state: 'error', error: 'Неверный пароль', defaultValue: 'Abc1!' }, { state: 'disabled', defaultVisible: true }],
  // Пачка 3 — экраны майнинга
  Icon: [...['sm', 'md', 'lg', 'xl'].map((size) => ({ name: 'chart-bar', size })), { name: 'file-excel', label: 'Выгрузить' }, { name: 'нет-такой' }],
  Coin: [...['xs', 's', 'm', 'l', 'xl'].map((size) => ({ coin: 'kas', size })), ...['btc', 'ltc', 'doge', 'bitcoin-btc', 'eth'].map((coin) => ({ coin, size: 'm' })),
    { coin: 'usdt', size: 'l', network: true, networkCoin: 'trx' }, { coin: 'btc', size: 'xs', network: true }, { skeleton: true, size: 'm' }, { coin: 'kas', label: 'Kaspa' }],
  CoinStack: [...['s', 'm', 'l'].flatMap((size) => [2, 3, 4].map((count) => ({ size, count, coins: ['kas', 'btc', 'ltc', 'doge'] }))),
    { coins: ['ltc', 'eth', 'btc', 'doge', 'kas', 'bel', 'pep'], count: 2 }, { coins: ['kas', 'eth'], showMore: true, more: '+1', label: 'KAS и ETH' }],
  NavItem: [{ label: 'Майнинг', icon: 'mining-coin', href: '#', selected: true }, { label: 'P2P', icon: 'exchange', badge: true, badgeLabel: '0% Комиссия' },
    { label: 'Стейкинг', icon: 'percentage', badge: h(R.Badge, { size: 's', tone: 'accent', style: 'solid', label: 'Новое' }) }, { label: 'Воркеры', counter: 3 },
    { label: 'Дашборд', collapsed: true, counter: true }, { label: 'Активы', icon: ico(), collapsed: true, selected: true }, { label: 'OnLock', icon: 'lock', disabled: true, href: '#' }],
  KeyValueRow: ['default', 'total', 'muted'].flatMap((emphasis) => [false, true].map((leader) => ({ emphasis, leader, label: 'Комиссия сети', value: '0.00050000 BTC' })))
    .concat(['default', 'total'].map((emphasis) => ({ emphasis, leader: true, skeleton: true, label: 'Текущий хешрейт' }))),
  Search: [{}, { size: 's', text: 'Поиск воркеров' }, { defaultValue: 'worker-1' }, { value: 'x', onChange: () => {} }, { disabled: true, defaultValue: 'x' }],
  SelectCompact: [{ label: 'Монета', options: [{ value: 'kas', label: 'KAS', coin: 'kas' }, { value: 'btc', label: 'BTC', coin: 'btc', disabled: true }] },
    { label: 'Монета', defaultValue: 'btc', defaultOpen: true, options: [{ value: 'kas', label: 'KAS', coin: 'kas' }, { value: 'btc', label: 'BTC', coin: 'btc' }] },
    { text: 'TRC-20', showLeading: false, label: 'Сеть' }, { text: 'KAS + 1', leading: h(R.CoinStack, { coins: ['kas', 'eth'] }) }, { text: 'USDT', disabled: true, leading: h(R.Coin, { coin: 'usdt', size: 'm' }) }],
  DateRangeField: [{}, { from: '01.11.26', to: '19.11.26', hint: 'Выгрузить можно за 3 месяца' }, { state: 'error', error: 'Больше 3 месяцев', from: '01.01.26', to: '19.11.26' },
    { state: 'disabled' }, { state: 'skeleton' }, { labelPosition: 'above', label: 'Период выгрузки' },
    { panel: true, defaultValue: { from: '2026-11-01', to: '2026-11-19' } }, { panel: { today: '2026-11-19', presets: false }, defaultOpen: true, value: { from: '2026-11-01', to: '2026-11-19' }, onChange: () => {}, formatDate: (d) => d }],
  DateCell: [...['default', 'today', 'selected', 'range-start', 'range-middle', 'range-end', 'outside'].map((state) => ({ day: 14, state, label: '14 октября 2026' })), { day: 31, disabled: true }, { children: '1', onClick: () => {} }],
  Calendar: [{ today: '2026-11-19' }, { today: '2026-11-19', defaultValue: '2026-11-14', min: '2026-11-03', max: '2026-11-25' }, { mode: 'range', today: '2026-11-19', defaultValue: { from: '2026-11-03', to: '2026-11-10' } },
    { mode: 'range', today: '2026-11-19', value: { from: '2026-10-28', to: '2026-11-02' }, onChange: () => {}, month: '2026-10-01', onMonthChange: () => {}, isDateDisabled: (d) => d > '2026-11-19' },
    { locale: 'en-US', today: new Date(2026, 10, 19), plain: true, label: 'Дата', onEscape: () => {} }, { weekStart: 0, defaultMonth: '2027-02-10' }],
  DateRangePanel: [{ today: '2026-11-19' }, { today: '2026-11-19', defaultValue: { from: '2026-11-13', to: '2026-11-19' }, onApply: () => {}, onClose: () => {} },
    { presets: false, showReset: false, today: '2026-11-19', value: { from: '2026-11-01', to: null }, onChange: () => {} }, { preset: 'custom', onPresetChange: () => {}, presetItems: [{ value: 'w', label: 'Неделя', days: 7 }, { value: 'custom', label: 'Свой период' }], applyOnSelect: true }],
  PageIndicator: [2, 3, 4, 5].flatMap((count) => [1, count].map((selected) => ({ count, selected }))).concat([{ count: 3, selected: 2, onSelect: () => {} }]),
  LegendSwatch: ['dot', 'line'].flatMap((marker) => [1, 2, 3, 4, 5, 6, 7, 8].map((series) => ({ marker, series }))),
  LegendItem: [{ label: 'Хешрейт, TH/s' }, { label: 'Реджекты, %', series: 4, selected: true, value: '1.2 %', showValue: true }, { label: 'Линия', marker: 'line', series: 5, onClick: () => {} }, { skeleton: true }],
  ChartMetric: [...['default', 'danger', 'warning', 'success'].map((tone) => ({ tone, label: 'Текущий хешрейт', value: '30.15', unit: 'TH/s', icon: true })), { label: 'Текущий хешрейт', skeleton: true, tone: 'danger', icon: true },
    { label: 'Реджекты за 1 день', value: '5.05', unit: '%' }, { label: 'x', value: '1', showUnit: false, unit: 'TH/s', icon: 'chart-bar' }, { label: 'x', value: '1', icon: ico() }],
  TableHeaderCell: [{ label: 'ID', sortable: false, selectAll: true, selectStatus: 'indeterminate' }, ...['start', 'end'].flatMap((align) => ['none', 'ascending', 'descending'].map((sort) => ({ align, sort, onSort: () => {}, label: 'Хешрейт' }))),
    { label: 'Имя и статус', defaultSort: 'descending' }, { label: 'Тип', sortable: false, showFilter: true, showInfo: true }, { skeleton: true, label: 'x' }, { align: 'end', skeleton: true }],
  TableCell: [{ primary: '12 окт 2025', secondary: '10:37' }, { align: 'end', children: h(R.Amount, { value: '10.45', ticker: 'TH/s', align: 'end' }) }, { skeleton: true }, { align: 'end', skeleton: true }, { disabled: true, primary: 'worker-4' }],
  TableRow: [{ children: h(R.TableCell, { primary: 'worker-1' }) }, { density: 'regular', selected: true, children: h(R.TableCell, { primary: 'x' }) }, { onClick: () => {}, children: h(R.TableCell, { primary: 'x' }) }],
  Table: [
    { label: 'Воркеры', columns: [{ key: 'name', label: 'Имя и статус', sortable: true }, { key: 'hr', label: 'Текущий хешрейт', align: 'end', sortable: true, width: 160 }, { key: 'act', label: '', align: 'end', render: () => h(R.IconButton, { size: 's', label: 'Ещё', icon: ico() }) }],
      rows: [{ id: 1, name: h(R.Status, { label: 'worker-1' }), hr: '10.45 TH/s' }, { id: 2, name: 'worker-2', hr: '8.00 TH/s', selected: true }], defaultSort: { key: 'name', dir: 'descending' }, onRowClick: () => {} },
    { density: 'regular', caption: 'История', columns: [{ key: 'd', label: 'Дата' }], rows: [], skeletonRows: 2 },
    { label: 'Свои строки', children: h(R.TableRow, null, h(R.TableCell, { primary: 'x' })) },
  ],
  PromoCard: [...['s', 'm', 'l'].flatMap((size) => ['neutral', 'accent'].map((tone) => ({ size, tone, title: 'Нет оборудования?', description: 'Получи каталог ASIC по выгодным ценам', showMedia: true }))),
    { align: 'center', tone: 'accent', size: 'm', showBadge: true, title: 'Мониторинг', description: 'Следи за площадками', actionLabel: 'Перейти к Мониторингу' },
    { showBadge: true, showClose: false, showAction: false, showDescription: false, title: 'x' }, { size: 'm', showMedia: true, media: 'promo.png', title: 'x', onClose: () => {}, onAction: () => {} }],
  Sidebar: [
    { logo: 'EMCD', language: 'RU', onCollapsedChange: () => {}, cta: h(R.Button, { size: 's', label: 'Подключить' }), account: { name: 'Alexandrewang' },
      items: [{ label: 'Активы', icon: 'wallet', href: '#' }, { label: 'Майнинг', icon: 'mining-coin', selected: true, href: '#' }, { divider: true }, { label: 'P2P', icon: 'exchange', badge: true, badgeLabel: '0% Комиссия' }],
      promo: h(R.PromoCard, { title: '14% ты получил бы', showMedia: true }) },
    { collapsed: true, onCollapsedChange: () => {}, account: { name: 'A' }, items: [{ label: 'Активы', icon: 'wallet' }, { label: 'Майнинг', icon: 'mining-coin', selected: true, counter: 2 }], promo: h('div') },
    { header: h('div', null, 'шапка'), nav: h(R.NavItem, { label: 'x' }), footer: h('div', null, 'низ'), promo: false },
  ],
  ChartCrosshair: [{}, { x: 60, points: [{ y: 40, series: 1 }, { y: 70, series: 4 }] }, ...[2, 3, 5, 6, 7, 8].map((series) => ({ points: [{ y: 50, series }] })), { target: 'bar', x: 30, band: 3 }],
  ChartTooltip: [{ date: '23.06.2026', time: '14:00', rows: [{ label: 'Хешрейт', value: '14.6 TH/s' }] },
    { date: '23.06', rows: [{ label: 'Хешрейт', value: '14.6 TH/s', series: 1 }, { label: 'Реджекты', value: '0.4 %', series: 4, tone: 'danger' }, { label: 'x', value: '1', marker: 'line', series: 5, tone: 'warning' }, { label: 'y', value: '2', series: 2 }] },
    { showDate: false, live: false, rows: Array.from({ length: 6 }, (_, i) => ({ label: 'Плата ' + (i + 1), value: i + ' °C', series: i + 1 })) }, { rows: [], moreLabel: 'ещё', date: 'x' }],
  ChartPlot: [
    ...['bars', 'line', 'area', 'multi-line', 'stacked-bars'].map((type) => ({ type, label: 'Хешрейт за сутки', labels: ['00:00', '04:00', '08:00', '12:00'], series: [{ name: 'A', data: [1, 3, 2, 4] }, { name: 'B', data: [2, 1, 2, 1] }] })),
    { type: 'line-bars', labels: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`), series: [{ name: 'Хешрейт', data: Array.from({ length: 24 }, (_, i) => 12 + (i % 5)) }, { name: 'Реджекты', data: Array.from({ length: 24 }, (_, i) => (i % 3) * 0.6) }] },
    { type: 'dual-area', yLeft: { ticks: [0, 10, 20] }, format: (v) => String(v), series: [{ data: [1, 2] }, { data: [3, 1] }] },
    { type: 'multi-line', series: Array.from({ length: 6 }, (_, i) => ({ data: [i, i + 1, i] })) },
    ...['skeleton', 'empty', 'disabled'].flatMap((state) => [{ type: 'bars', state, series: [{ data: [1, 2] }] }, { type: 'line', state, series: [{ data: [1, 2] }] }]),
    { type: 'line-bars', state: 'skeleton', label: 'Хешрейт и реджекты', labels: ['00:00', '04:00'], series: [{ data: [1, 2] }, { data: [0.5, 1] }] },
    // Hover: точка выбрана (перекрестие + тултип), столбцы — полоса; неинтерактивный — role=img
    { type: 'line-bars', defaultIndex: 1, labels: ['00:00', '04:00', '08:00'], dates: ['23.06', '23.06', '23.06'], times: ['00:00', '04:00', '08:00'],
      series: [{ name: 'Хешрейт', data: [1, 3, 2], unit: 'TH/s', marker: 'line' }, { name: 'Реджекты', data: [0.5, 1, 1.5], format: (v) => v + ' %' }] },
    { type: 'stacked-bars', index: 0, onIndexChange: () => {}, valueFormat: (v) => String(v), series: [{ name: 'A', data: [1, 2] }, { name: 'B', data: [2, 1] }] },
    { type: 'dual-area', index: 1, series: [{ data: [1, 2] }, { data: [3, 1] }] }, { type: 'line', interactive: false, defaultIndex: 0, series: [{ data: [1, 2] }] },
  ],
  ChartCard: [
    { label: 'Хешрейт', metrics: [{ label: 'Текущий хешрейт', value: '30.15', unit: 'TH/s', icon: true }, { label: 'Реджекты за 1 день', value: '5.05', unit: '%' }],
      periods: [{ value: '1d', label: '1 день' }, { value: '7d', label: '7 дней' }, { value: '30d', label: '30 дней' }], legend: [{ label: 'Хешрейт, TH/s' }, { label: 'Реджекты, %', series: 4 }], sum: 'Итого 24.47 TH/s',
      children: h(R.ChartPlot, { type: 'line-bars', series: [{ data: [1, 2] }, { data: [0.5, 1] }], defaultIndex: 0 }) },
    { periods: [{ value: 1, label: '1 д' }], periodSize: 'm', period: 1, onPeriodChange: () => {}, showBottom: false, legend: [{ label: 'x' }] },
    { top: h('div', null, 'верх'), bottom: h('div', null, 'низ'), content: 'график' },
  ],
  Sheet: [{ title: 'Выгрузить историю', children: 'тело', footer: h(R.Button, { label: 'Сформировать' }) }, { title: 'x', fullHeight: true, scrim: false, showGrabber: false, showClose: false }, { open: false }],
  TopBar: [{ level: 'inner', title: 'Калькулятор', onBack: () => {} }, { level: 'inner', platform: 'app', title: 'Настройки', action: h(R.IconButton, { type: 'ghost', label: 'Помощь', icon: h(R.Icon, { name: 'question' }) }) }, { account: 'Alexandrewang', balance: '$123 456', cents: '.78' }, { showBalance: false, account: 'x', logo: h('span', null, 'E') }, { onMenu: () => {}, onAccount: () => {}, onBalance: () => {}, balance: '$1' },
    { platform: 'app', account: 'Alexandrewang', coin: 'BTC', onAdd: () => {}, onAccount: () => {}, onCoin: () => {} },
    { platform: 'app', account: 'a', accountOptions: [{ value: 'a', label: 'Alexandrewang' }, { value: 'b', label: 'farm-2' }], coin: 'BTC', coins: ['btc', 'kas', 'ltc'],
      coinOptions: [{ value: 'btc', label: 'BTC', coin: 'btc' }, { value: 'kas', label: 'KAS', coin: 'kas' }], coinValue: 'btc', onCoinChange: () => {}, addLabel: 'Подключить' }],
  StatusSummary: [{ offline: 9, unstable: 1, active: 40 }, { skeleton: true }, { layout: 'row', skeleton: true }, { layout: 'row', offline: 9, unstable: 1, active: 40, onAllLink: () => {}, onItem: () => {} }, { layout: 'row', showAllLink: false, items: [{ tone: 'success', label: 'Все', value: 50 }] }],
  PromoCarousel: [{ slides: [h(R.PromoCard, { size: 'm', title: 'Забусти свой майнинг', showMedia: true }), h(R.PromoCard, { size: 'm', title: 'Каталог' }), h(R.PromoCard, { size: 'm', title: 'Рефералы' })] },
    { children: [h('div', { key: 1 }, 'a'), h('div', { key: 2 }, 'b')], index: 1, onIndexChange: () => {} }, { slides: [h('div', null, 'один')] }],
  ActionBar: [{ actions: [{ label: 'Подключить', iconLeft: 'plus' }] }, { actions: [{ label: 'Подключить', iconLeft: 'plus' }, { label: 'Создать группу' }] }, { children: h(R.Button, { label: 'x' }) },
    { badge: true, actions: [{ label: 'Фильтры', iconLeft: 'tuning' }, { label: 'Выгрузить', iconLeft: 'file-excel' }] }, { badge: true, badgeText: 'Авто', actions: [{ label: 'Выгрузить' }] }],
  // Пачка 5 (19.11) — App
  FloatingButton: [{ label: 'Добавить воркер' }, { layout: 'icon', size: 'm', type: 'secondary', label: 'Добавить' },
    ...['l', 'm'].flatMap((size) => ['primary', 'secondary'].map((type) => ({ layout: 'extended', size, type, label: 'Выгрузить', icon: 'file-excel' }))),
    { layout: 'extended', loading: true, label: 'Добавить воркер' }, { loading: true, label: 'x' }, { disabled: true, layout: 'extended', label: 'x', icon: ico() }],
  TabBarItem: [{ label: 'Дашборд' }, { selected: true, label: 'Майнинг', icon: 'mining-coin' }, { badgeDot: true, label: 'Кошелёк' }, { selected: true, badgeDot: true, badgeLabel: 'новое', label: 'x', href: '#' },
    { type: 'action', label: 'Быстрые действия', icon: h('span', null, 'E') }, { type: 'action', selected: true, label: 'x' }],
  TabBar: [{ items: [{ label: 'Дашборд' }, { label: 'Майнинг', icon: 'mining-coin' }, { type: 'action', label: 'Быстрые действия', icon: h('span', null, 'E') }, { label: 'Кошелёк', badgeDot: true }, { label: 'Профиль', icon: 'user' }] },
    { items: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }], value: 'b', onChange: () => {}, onAction: () => {}, safeArea: false },
    { defaultValue: 'B', items: [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'D' }, { label: 'E' }, { label: 'F' }] },
    { children: [h(R.TabBarItem, { key: 1, label: 'A', selected: true }), h(R.TabBarItem, { key: 2, label: 'B' })] }],
};

// Обёртки для элементов, которые по правилам HTML живут только внутри таблицы (иначе React предупреждает о вложенности)
const WRAP = {
  TableHeaderCell: (el) => h('table', null, h('thead', null, h('tr', null, el))),
  TableCell: (el) => h('table', null, h('tbody', null, h('tr', null, el))),
  TableRow: (el) => h('table', null, h('tbody', null, el)),
  KeyValueRow: (el) => h('dl', null, el),
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
        const el = h(R[name], props);
        const html = renderToString(h('div', { 'data-theme': theme }, WRAP[name] ? WRAP[name](el) : el));
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
// Вспомогательные модули Vue (реестр иконок, геометрия графика) — рядом со скомпилированными компонентами
for (const f of fs.readdirSync(VUE_SRC).filter((x) => x.endsWith('.js') && x !== 'index.js')) fs.copyFileSync(path.join(VUE_SRC, f), path.join(OUT, f));
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
  DsChip: [[{ label: '360 дней' }], [{ selected: true, label: 'Все', metaText: 20 }], [{ statusDot: true, statusTone: 'danger', label: 'Офлайн', metaText: 4 }], [{ removable: true, selected: true, label: 'BTC', statusDot: true }], [{ size: 'm', disabled: true, label: 'x' }], [{ skeleton: true, label: '7 дней', metaText: 3 }]],
  DsCheckbox: [[{ label: 'Согласен' }], [{ status: 'indeterminate', size: 's', label: 'x', description: 'y' }], [{ status: 'on', tone: 'danger', controlPosition: 'end', label: 'x' }]],
  DsRadio: [[{ label: 'Один', name: 'r', value: '1' }], [{ status: true, size: 's', label: 'x', name: 'r', value: '2' }]],
  DsRadioGroup: [[{ legend: 'Сеть' }, { default: () => 'x' }]],
  DsToggle: [[{ label: 'На Coinhold', badge: '8% APR' }], [{ label: 'Уведомления' }], [{ status: true, controlPosition: 'start', size: 's', label: 'x' }]],
  DsInput: [[{ label: 'Сумма' }], [{ size: 'l', labelPosition: 'above', label: 'x', hint: 'y', counter: '0/64', suffix: 'USDT' }, { leading: vico, trailing: vico }],
    ...['error', 'disabled', 'readonly', 'loading', 'skeleton'].map((state) => [{ state, label: 'x' }])],
  DsTextarea: [[{ label: 'Комментарий' }], [{ size: 'l', label: 'x', maxlength: 200, modelValue: 'Текст' }], [{ state: 'error', error: 'Пусто' }]],
  DsModal: [[{ title: 'Вывод' }, { default: () => 'Текст', footer: () => 'кнопки' }], [{ header: 'coin', footer: 'horizontal', title: 'x', description: 'y', divider: true, width: 'sm' }], [{ header: 'empty', footer: 'none', scrim: false }], [{ open: false }]],
  DsCounter: [[{ value: 12 }], [{ size: 'm', tone: 'accent', value: 3 }], [{ tone: 'danger', value: 99 }]],
  DsStatus: ['success', 'warning', 'danger', 'info', 'neutral'].map((tone) => [{ tone, size: 'm', label: 'Активен' }]).concat([[{ showLabel: false, label: 'x' }]]),
  DsAvatar: [[{ name: 'Иван' }], [{ size: 's', initials: 'И', status: true }], [{ size: 'm', src: 'a.png' }], [{ size: 'l', type: 'icon' }], [{ skeleton: true }]],
  DsDivider: [[{}], [{ label: true }], [{ orientation: 'vertical' }], [{ variant: 'dotted' }]],
  DsSpinner: [[{}], [{ size: 'l', label: 'x' }]],
  DsSkeleton: [[{}], [{ shape: 'title', width: 200 }], [{ shape: 'circle', width: 24, height: 24 }], [{ shape: 'rect', height: '80px' }]],
  DsBulkActionBar: [[{ count: 2, total: 120, actions: [{ label: 'Перевести' }] }]],
  DsStatusBar: [[{ caption: 'Статусы', segments: [{ tone: 'danger', label: 'Сбой', count: 1000, value: '1 000' }, { tone: 'success', label: 'Норма', count: 16500 }, { tone: 'neutral', label: 'Выкл', count: 0, value: '—' }] }]],
  DsProgress: [[{ label: 'Лимит', value: '6 000 / 10 000', percent: 60 }], [{ tone: 'danger', size: 'm', percent: 100 }], [{ mode: 'indeterminate', label: 'x' }]],
  DsAmount: ['s', 'm', 'l', 'xl'].map((size) => [{ size, sign: 'positive', value: '0.1234', ticker: 'BTC', fiat: '≈ $2,731.40' }]).concat([[{ sign: 'negative', align: 'end', value: 5, ticker: 'USDT', showFiat: false }]])
    .concat(['s', 'm', 'l', 'xl'].map((size) => [{ size, skeleton: true, sign: 'positive' }]), [[{ skeleton: true, align: 'end', showFiat: false }]], [[{ size: 'xl', tone: 'success', value: '≈ $352 665.84' }], [{ tone: 'danger', value: '120.01', ticker: '$' }], [{ tone: 'success', sign: 'negative', value: 1 }]]),
  DsCard: [[{}, { default: () => 'x' }], [{ level: 0, radius: 'surface', padding: 'l' }, { default: () => 'x' }], [{ level: 2, href: '#' }, { default: () => 'x' }], [{ level: 2, ambientLight: true }, { default: () => 'x' }]],
  DsSectionHeader: [[{ title: 'Переводить на Coinhold', caption: 'Ещё больше дохода' }, { trailing: () => 'toggle' }], [{ size: 's', title: 'Сколько переводить?' }],
    [{ size: 's', level: 4, title: 'x', caption: 'скрыта', showCaption: false, trailing: 'y', showTrailing: false }], [{ level: 2, title: 'Типы уведомлений', trailing: 'Отключить всё' }], [{ title: 'x' }, { default: () => 'слот' }]],
  DsPageHeader: [[{ title: 'Воркеры', subtitle: '12 активных из 14' }, { actions: () => 'кнопки' }], [{ size: 'compact', title: 'Воркеры', subtitle: 'скрыт', showSubtitle: false }, { actions: () => 'x', tabs: () => 'табы' }],
    [{ level: 2, title: 'worker-1', showActions: false, showTabs: false }, { breadcrumbs: () => 'Воркеры', actions: () => 'x', tabs: () => 'y' }], [{}, { title: () => 'слот' }]],
  DsStatCard: [[{ label: 'Хешрейт', value: '124.5', unit: 'TH/s', infoText: 'x', deltaValue: '+4%', deltaCaption: 'к вчера' }],
    ...['neutral', 'danger', 'warning', 'success'].flatMap((tone) => ['start', 'center'].map((align) => [{ tone, align, link: true, label: 'Воркеры', value: '12', delta: false }])),
    [{ showFooter: true, ambientLight: true, label: 'x', value: 1 }, { footer: () => 'graph' }], [{ skeleton: true, align: 'center' }], [{ skeleton: true, align: 'center', delta: false }], [{ skeleton: true, showFooter: true }, { footer: () => 'graph' }]],
  DsTooltip: [[{ text: 'Подсказка' }], [{ placement: 'end', tone: 'accent', arrow: 'start', text: 'x' }, { default: () => vh('button', null, 'i') }]],
  DsToast: [[{ title: 'Готово', description: 'x' }], [{ tone: 'danger', actions: true, timer: true, duration: 5000, title: 'x' }], [{ layout: 'informer', tone: 'neutral', title: 'x' }]],
  DsSuggest: ['neutral', 'accent', 'success', 'warning', 'danger'].flatMap((tone) => ['card', 'strip'].map((layout) => [{ tone, layout, title: 'Кошелёк', description: 'x', secondaryAction: true }]))
    .concat([[{ layout: 'strip', title: 'x' }, { leading: vico }], [{ showLeading: false, primaryAction: false, close: false, title: 'x' }]]),
  DsTab: ['s', 'm', 'l', 'page'].map((size) => [{ size, label: 'Воркеры', counter: 12 }]).concat([[{ statusDot: true, statusTone: 'warning', selected: true, label: 'Нестабильные', counter: 2 }], [{ skeleton: true, label: 'x' }]]),
  DsTabs: ['s', 'm', 'l', 'page'].map((size) => [{ size, label: 'Разделы', items: [{ label: 'A' }, { label: 'B', counter: 2, statusDot: true, statusTone: 'danger' }] }]),
  DsSegment: [[{ label: 'Список' }], [{ selected: true, tone: 'accent', label: 'x' }], [{ showLabel: false, label: 'x' }, { icon: vico }]],
  DsSegmented: ['s', 'm', 'l'].map((size) => [{ size, label: 'Вид', items: [{ label: 'Список' }, { label: 'Группы' }] }]).concat([[{ block: true, tone: 'accent', items: [{ label: '1' }, { label: '2' }] }]]),
  DsListItem: ['text-first', 'description-first', 'big-value', 'description-only'].map((content) => [{ content, label: 'BTC', description: 'Bitcoin', value: '0.5', subvalue: 'BTC' }])
    .concat([[{ size: 'm', label: 'Дневной доход', description: 'скрыто', showDescription: false }, { trailing: () => 'x' }], [{ size: 'm', inset: false, divider: true, label: '8.9012 LTC', showDescription: false }, { trailing: () => '≈ $78.90' }], [{ href: '#', divider: true, label: 'x' }, { leading: vico }], [{ interactive: true, disabled: true, label: 'x' }]]),
  DsTransaction: ['withdrawal', 'deposit', 'reward', 'exchange'].map((type, i) => [{ type, status: ['completed', 'pending', 'failed', 'completed'][i], value: '0.1', ticker: 'BTC', fiat: '≈ $9 512.40', description: '19.11' }])
    .concat([[{ status: 'completed', value: '0.1', ticker: 'BTC' }]]),
  DsMenuItem: [[{ label: 'Копировать' }], [{ size: 'l', tone: 'danger', label: 'x', description: 'y' }, { leading: vico, trailing: () => 'x' }], [{ showSelection: true, selected: true, label: 'x' }], [{ disabled: true, label: 'x' }]],
  DsMenu: [[{ items: [{ group: 'Группа' }, { label: 'A' }, { divider: true }, { label: 'B', tone: 'danger' }] }], [{ search: true, size: 'l', role: 'listbox', items: [{ label: 'A' }] }]],
  DsSelect: [[{ label: 'Монета', options: [{ value: 'btc', label: 'BTC' }] }], [{ label: 'Сеть', labelPosition: 'on-border', options: [{ value: 'btc', label: 'BTC' }] }], [{ size: 'l', modelValue: 'btc', open: true, options: [{ value: 'btc', label: 'BTC' }, { value: 'x', label: 'X', disabled: true }] }],
    ...['error', 'disabled', 'loading', 'skeleton'].map((state) => [{ state, label: 'x', hint: 'y' }])],
  DsPasswordField: [[{}], [{ showRequirements: false, size: 'l', labelPosition: 'above' }], [{ state: 'error', error: 'Неверный', modelValue: 'Abc1!' }], [{ state: 'disabled', visible: true }]],
  // Пачка 3 — экраны майнинга
  DsIcon: ['sm', 'md', 'lg', 'xl'].map((size) => [{ name: 'chart-bar', size }]).concat([[{ name: 'file-excel', label: 'Выгрузить' }], [{ name: 'нет-такой' }]]),
  DsCoin: ['xs', 's', 'm', 'l', 'xl'].map((size) => [{ coin: 'kas', size }]).concat([[{ coin: 'eth', size: 'm' }], [{ coin: 'usdt', size: 'l', network: true, networkCoin: 'trx' }], [{ skeleton: true }], [{ coin: 'btc', label: 'Bitcoin' }]]),
  DsCoinStack: ['s', 'm', 'l'].map((size) => [{ size, coins: ['kas', 'btc', 'ltc', 'doge'] }]).concat([[{ coins: ['ltc', 'eth', 'btc', 'doge', 'kas'], count: 2 }], [{ coins: ['kas', 'eth'], showMore: true, more: '+1', label: 'x' }]]),
  DsNavItem: [[{ label: 'Майнинг', icon: 'mining-coin', href: '#', selected: true }], [{ label: 'P2P', icon: 'exchange', badge: true, badgeLabel: '0% Комиссия' }], [{ label: 'x', counter: 3 }],
    [{ label: 'Дашборд', collapsed: true, counter: true }], [{ label: 'x', disabled: true, href: '#' }], [{ label: 'x' }, { icon: vico, badge: () => 'бейдж' }]],
  DsKeyValueRow: ['default', 'total', 'muted'].map((emphasis, i) => [{ emphasis, leader: i === 1, label: 'Комиссия сети', value: '0.00050000 BTC' }])
    .concat([[{ leader: true, skeleton: true, label: 'Текущий хешрейт' }], [{ emphasis: 'total', skeleton: true, label: 'Итого' }]]),
  DsSearch: [[{}], [{ size: 's', text: 'Поиск воркеров' }], [{ modelValue: 'worker-1' }], [{ disabled: true, modelValue: 'x' }]],
  DsSelectCompact: [[{ label: 'Монета', options: [{ value: 'kas', label: 'KAS', coin: 'kas' }, { value: 'btc', label: 'BTC', coin: 'btc', disabled: true }] }],
    [{ label: 'Монета', modelValue: 'btc', open: true, options: [{ value: 'kas', label: 'KAS', coin: 'kas' }, { value: 'btc', label: 'BTC', coin: 'btc' }] }],
    [{ text: 'TRC-20', showLeading: false }], [{ text: 'KAS + 1' }, { leading: () => 'стопка' }], [{ text: 'USDT', disabled: true }]],
  DsDateRangeField: [[{}], [{ from: '01.11.26', to: '19.11.26', hint: 'x' }], [{ state: 'error', error: 'x' }], [{ state: 'disabled' }], [{ state: 'skeleton' }],
    [{ panel: true, modelValue: { from: '2026-11-01', to: '2026-11-19' } }], [{ panel: { today: '2026-11-19', presets: false }, open: true, formatDate: (d) => d }]],
  DsDateCell: ['default', 'today', 'selected', 'range-start', 'range-middle', 'range-end', 'outside'].map((state) => [{ day: 14, state, label: '14 октября 2026' }]).concat([[{ day: 31, disabled: true }], [{}, { default: () => '1' }]]),
  DsCalendar: [[{ today: '2026-11-19' }], [{ today: '2026-11-19', modelValue: '2026-11-14', min: '2026-11-03', max: '2026-11-25' }], [{ mode: 'range', today: '2026-11-19', modelValue: { from: '2026-11-03', to: '2026-11-10' } }],
    [{ mode: 'range', today: '2026-11-19', modelValue: { from: '2026-10-28', to: '2026-11-02' }, month: '2026-10-01', isDateDisabled: (d) => d > '2026-11-19' }], [{ locale: 'en-US', plain: true, label: 'Дата' }], [{ weekStart: 0 }]],
  DsDateRangePanel: [[{ today: '2026-11-19' }], [{ today: '2026-11-19', modelValue: { from: '2026-11-13', to: '2026-11-19' } }], [{ presets: false, showReset: false, today: '2026-11-19', modelValue: { from: '2026-11-01', to: null } }],
    [{ preset: 'custom', presetItems: [{ value: 'w', label: 'Неделя', days: 7 }, { value: 'custom', label: 'Свой период' }], applyOnSelect: true }]],
  DsPageIndicator: [2, 3, 4, 5].map((count) => [{ count, selected: count }]).concat([[{ count: 3, selected: 2, interactive: true }]]),
  DsLegendSwatch: ['dot', 'line'].flatMap((marker) => [1, 4, 5, 8].map((series) => [{ marker, series }])),
  DsLegendItem: [[{ label: 'Хешрейт, TH/s' }], [{ label: 'Реджекты, %', series: 4, selected: true, value: '1.2 %', showValue: true }], [{ label: 'x', marker: 'line', series: 6, interactive: true }], [{ skeleton: true }]],
  DsChartMetric: ['default', 'danger', 'warning', 'success'].map((tone) => [{ tone, label: 'Текущий хешрейт', value: '30.15', unit: 'TH/s', icon: true }])
    .concat([[{ label: 'x', value: 1, showUnit: false, icon: 'chart-bar' }], [{ label: 'x', value: 1 }, { icon: vico }], [{ label: 'Текущий хешрейт', skeleton: true, tone: 'danger' }]]),
  DsTableHeaderCell: [[{ label: 'ID', sortable: false, selectAll: true, selectStatus: 'indeterminate' }], ...['start', 'end'].flatMap((align) => ['none', 'ascending', 'descending'].map((sort) => [{ align, sort, label: 'Хешрейт' }]))]
    .concat([[{ label: 'Тип', sortable: false, showFilter: true, showInfo: true }], [{ skeleton: true }]]),
  DsTableCell: [[{ primary: '12 окт 2025', secondary: '10:37' }], [{ align: 'end' }, { default: () => '10.45 TH/s' }], [{ skeleton: true }], [{ disabled: true, primary: 'x' }]],
  DsTableRow: [[{}, { default: () => vh('td', null, 'x') }], [{ density: 'regular', selected: true, interactive: true }, { default: () => vh('td', null, 'x') }]],
  DsTable: [[{ label: 'Воркеры', interactive: true, columns: [{ key: 'name', label: 'Имя', sortable: true }, { key: 'hr', label: 'Хешрейт', align: 'end', sortable: true, width: 160 }],
    rows: [{ id: 1, name: 'worker-1', hr: '10.45 TH/s' }, { id: 2, name: 'worker-2', hr: '8.00 TH/s', selected: true }], sort: { key: 'name', dir: 'descending' } }, { 'cell-name': ({ row }) => `★ ${row.name}` }],
    [{ density: 'regular', caption: 'История', columns: [{ key: 'd', label: 'Дата' }], skeletonRows: 2 }], [{ label: 'x' }, { default: () => vh('tr', null, [vh('td', null, 'x')]) }]],
  DsPromoCard: ['s', 'm', 'l'].flatMap((size) => ['neutral', 'accent'].map((tone) => [{ size, tone, title: 'Нет оборудования?', description: 'Получи каталог', showMedia: true }]))
    .concat([[{ align: 'center', tone: 'accent', size: 'm', showBadge: true, title: 'Мониторинг', description: 'x' }], [{ showBadge: true, showClose: false, showAction: false, title: 'x', media: 'p.png', showMedia: true }]]),
  DsSidebar: [[{ language: 'RU', collapsible: true, account: { name: 'Alexandrewang' }, items: [{ label: 'Активы', icon: 'wallet' }, { label: 'Майнинг', icon: 'mining-coin', selected: true }, { divider: true }, { label: 'P2P', badge: true, badgeLabel: '0%' }] },
    { cta: () => 'cta', promo: () => 'promo', footer: () => 'низ' }],
    [{ collapsed: true, collapsible: true, account: { name: 'A' }, items: [{ label: 'Активы', icon: 'wallet', counter: 2 }] }], [{ promo: false }, { header: () => 'шапка', nav: () => 'nav' }]],
  DsChartPlot: ['bars', 'line', 'area', 'line-bars', 'multi-line', 'dual-area', 'stacked-bars'].map((type) => [{ type, label: 'x', labels: ['00:00', '04:00', '08:00'], series: [{ data: [1, 3, 2] }, { data: [0.5, 1, 1.5] }] }])
    .concat(['skeleton', 'empty', 'disabled'].flatMap((state) => [[{ type: 'bars', state, series: [{ data: [1, 2] }] }], [{ type: 'line', state, series: [{ data: [1, 2] }] }]]))
    .concat([[{ type: 'line-bars', state: 'skeleton', label: 'x', labels: ['00:00', '04:00'], series: [{ data: [1, 2] }, { data: [0.5, 1] }] }]])
    .concat([[{ type: 'line-bars', index: 1, labels: ['00:00', '04:00', '08:00'], dates: ['23.06', '23.06', '23.06'], times: ['00:00', '04:00', '08:00'],
      series: [{ name: 'Хешрейт', data: [1, 3, 2], unit: 'TH/s', marker: 'line' }, { name: 'Реджекты', data: [0.5, 1, 1.5], format: (v) => v + ' %' }] }],
    [{ type: 'stacked-bars', index: 0, valueFormat: (v) => String(v), series: [{ name: 'A', data: [1, 2] }, { name: 'B', data: [2, 1] }] }], [{ type: 'line', interactive: false, index: 0, series: [{ data: [1, 2] }] }]]),
  DsChartCrosshair: [[{}], [{ x: 60, points: [{ y: 40, series: 1 }, { y: 70, series: 4 }] }], ...[2, 3, 5, 6, 7, 8].map((series) => [{ points: [{ y: 50, series }] }]), [{ target: 'bar', x: 30, band: 3 }]],
  DsChartTooltip: [[{ date: '23.06.2026', time: '14:00', rows: [{ label: 'Хешрейт', value: '14.6 TH/s' }] }],
    [{ date: '23.06', rows: [{ label: 'Хешрейт', value: '14.6 TH/s', series: 1 }, { label: 'Реджекты', value: '0.4 %', series: 4, tone: 'danger' }, { label: 'x', value: '1', marker: 'line', series: 5, tone: 'warning' }] }],
    [{ showDate: false, live: false, rows: Array.from({ length: 6 }, (_, i) => ({ label: 'Плата ' + (i + 1), value: i + ' °C', series: i + 1 })) }]],
  DsChartCard: [[{ label: 'Хешрейт', metrics: [{ label: 'Текущий хешрейт', value: '30.15', unit: 'TH/s', icon: true }], periods: [{ value: '1d', label: '1 день' }, { value: '7d', label: '7 дней' }],
    legend: [{ label: 'Хешрейт, TH/s' }, { label: 'Реджекты, %', series: 4 }], sum: 'Итого' }, { default: () => 'график' }], [{ periods: [{ value: 1, label: '1 д' }], periodSize: 'm', period: 1, showBottom: false }],
    [{}, { top: () => 'верх', bottom: () => 'низ', default: () => 'x' }]],
  DsSheet: [[{ title: 'Выгрузить историю' }, { default: () => 'тело', footer: () => 'кнопка' }], [{ title: 'x', fullHeight: true, scrim: false, showGrabber: false, showClose: false }], [{ open: false }]],
  DsTopBar: [[{ level: 'inner', title: 'Калькулятор' }], [{ level: 'inner', platform: 'app', title: 'Настройки' }, { action: () => 'a' }], [{ account: 'Alexandrewang', balance: '$123 456', cents: '.78' }], [{ showBalance: false, account: 'x' }, { logo: () => 'E' }],
    [{ platform: 'app', account: 'Alexandrewang', coin: 'BTC' }], [{ platform: 'app', account: 'a', accountOptions: [{ value: 'a', label: 'Alexandrewang' }], accountValue: 'a', coin: 'BTC', coins: ['btc', 'kas'], coinOptions: [{ value: 'btc', label: 'BTC', coin: 'btc' }] }]],
  DsStatusSummary: [[{ offline: 9, unstable: 1, active: 40 }], [{ skeleton: true }], [{ layout: 'row', skeleton: true }], [{ layout: 'row', offline: 9, unstable: 1, active: 40 }], [{ layout: 'row', showAllLink: false, items: [{ tone: 'success', label: 'Все', value: 50 }] }]],
  DsPromoCarousel: [[{}, { default: () => [vh('div', null, 'a'), vh('div', null, 'b'), vh('div', null, 'c')] }], [{ index: 1, label: 'Анонсы' }, { default: () => [vh('div', null, 'a'), vh('div', null, 'b')] }], [{}, { default: () => vh('div', null, 'один') }]],
  DsActionBar: [[{ actions: [{ label: 'Подключить' }] }], [{ actions: [{ label: 'Подключить' }, { label: 'Создать группу' }] }], [{}, { default: () => 'кнопки' }],
    [{ badge: true, actions: [{ label: 'Фильтры' }, { label: 'Выгрузить' }] }], [{ badge: true, badgeText: 'Авто', actions: [{ label: 'Выгрузить' }] }]],
  // Пачка 5 (19.11) — App
  DsFloatingButton: [[{ label: 'Добавить воркер' }], [{ size: 'm', type: 'secondary', label: 'Добавить' }],
    ...['l', 'm'].flatMap((size) => ['primary', 'secondary'].map((type) => [{ layout: 'extended', size, type, label: 'Выгрузить', icon: 'file-excel' }])),
    [{ layout: 'extended', loading: true, label: 'x' }], [{ disabled: true, layout: 'extended', label: 'x' }, { icon: vico }]],
  DsTabBarItem: [[{ label: 'Дашборд' }], [{ selected: true, label: 'Майнинг', icon: 'mining-coin' }], [{ badgeDot: true, label: 'Кошелёк', href: '#' }],
    [{ type: 'action', label: 'Быстрые действия' }, { icon: () => vh('span', null, 'E') }], [{ type: 'action', selected: true, label: 'x' }]],
  DsTabBar: [[{ items: [{ label: 'Дашборд' }, { label: 'Майнинг', icon: 'mining-coin' }, { type: 'action', label: 'Быстрые действия' }, { label: 'Кошелёк', badgeDot: true }, { label: 'Профиль', icon: 'user' }] }],
    [{ modelValue: 'b', safeArea: false, items: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }] }], [{}, { default: () => 'пункты' }]],
};

const VWRAP = {
  DsTableHeaderCell: (n) => vh('table', null, [vh('thead', null, [vh('tr', null, [n])])]),
  DsTableCell: (n) => vh('table', null, [vh('tbody', null, [vh('tr', null, [n])])]),
  DsTableRow: (n) => vh('table', null, [vh('tbody', null, [n])]),
  DsKeyValueRow: (n) => vh('dl', null, [n]),
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
      const node = vh(Comp, props, slots);
      const app = vue.createSSRApp({ render: () => vh('div', { 'data-theme': theme }, [VWRAP[name] ? VWRAP[name](node) : node]) });
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
