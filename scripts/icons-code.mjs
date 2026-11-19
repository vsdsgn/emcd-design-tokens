#!/usr/bin/env node
// Реестр иконок и монет для кода компонентов (Icon, Coin): из icons/svg/<name>.svg и icons/symbols/coin/*.svg.
//   packages/react/src/index.js — блок между «// @icons:begin» и «// @icons:end» (бандл React — один файл без import)
//   packages/vue/src/icons.js   — тот же реестр для Vue (DsIcon, DsCoin)
// Запуск: node scripts/icons-code.mjs [--check]   (--check: ничего не пишет, код 1, если реестр устарел)
// Набор — иконки экранов майнинга (сайдбар, шапка, таблицы, графики) + служебные иконки компонентов; добавить иконку — в LIST и перезапустить.
// Разметка иконок — как в icons/svg (обводка currentColor, 1.5, vector-effect non-scaling-stroke); цвета монет — из Symbols, от темы не зависят.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CHECK = process.argv.includes('--check');

export const LIST = [
  // таблицы и сортировка
  'sort', 'sort-line-down', 'sort-line-up', 'filter', 'info',
  // контролы и навигация
  'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'arrow-right', 'arrow-left', 'arrow-new-tab', 'close', 'check', 'plus', 'minus',
  'menu', 'more-horizontal', 'more-vertical', 'dots-grid', 'search', 'calendar', 'list', 'folder', 'folder-add', 'tuning', 'eye', 'eye-off', 'copy', 'link', 'refresh',
  // действия и показатели майнинга
  'chart-bar', 'file-excel', 'download', 'send', 'question', 'lightning', 'trend-up', 'settings', 'user', 'users', 'bell-notifications', 'calculator', 'history',
  // пункты сайдбара Web App (Активы · Криптокарта · Майнинг · Торговля · P2P · Coinhold · Стейкинг · Indesk · OnLock)
  'wallet', 'card', 'mining-coin', 'exchange', 'coinhold-coins', 'percentage', 'suitcase', 'lock', 'web', 'gift', 'rocket',
];
// Монеты: тикер → файл icons/symbols/coin
const COIN_FILES = { btc: 'bitcoin-btc', kas: 'kaspa-kas', ltc: 'litecoin-ltc', doge: 'dogecoin-doge', eth: 'ethereum-eth', usdt: 'tether-usdt' };

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
function parse(svg, where) {
  const m = svg.match(/<svg\b([^>]*)>([\s\S]*)<\/svg>/);
  if (!m) throw new Error(`icons-code: не SVG — ${where}`);
  const viewBox = (m[1].match(/viewBox="([^"]+)"/) || [])[1];
  const body = m[2].replace(/\s*\n\s*/g, '').trim();
  if (/<!--|<script|<style|\sid="/i.test(body)) throw new Error(`icons-code: комментарий, script, style или id в ${where}`);
  return { viewBox, body };
}

const icons = {};
for (const n of LIST) {
  const f = `icons/svg/${n}.svg`;
  if (!fs.existsSync(path.join(ROOT, f))) throw new Error(`icons-code: нет ${f}`);
  icons[n] = parse(read(f), f);
}
// Логотипы (Media · Logo, Mono — заливка currentColor): имя иконки → файл icons/symbols/logo
const LOGO_FILES = { 'logo-emcd': 'emcd' };
for (const [n, file] of Object.entries(LOGO_FILES)) icons[n] = parse(read(`icons/symbols/logo/${file}.svg`), file);
const coins = {};
for (const [t, file] of Object.entries(COIN_FILES)) coins[t] = parse(read(`icons/symbols/coin/${file}.svg`), file);

const json = (o) => '{\n' + Object.entries(o).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n') + '\n}';
const block = `// @icons:begin — генерирует scripts/icons-code.mjs из icons/svg и icons/symbols/coin; не править руками.
// Иконки: имя → { viewBox, body } (обводка currentColor; logo-* — заливка currentColor). Монеты: тикер → { viewBox, body } (цвета Symbols).
const ICONS = ${json(icons)};
const COINS = ${json(coins)};
// @icons:end`;
const vue = `// Реестр иконок и монет для DsIcon / DsCoin. Генерирует scripts/icons-code.mjs из icons/svg и icons/symbols/coin — не править руками.
export const ICONS = ${json(icons)};
export const COINS = ${json(coins)};
`;

let diff = 0;
const reactPath = 'packages/react/src/index.js';
const src = read(reactPath);
const re = /\/\/ @icons:begin[\s\S]*?\/\/ @icons:end/;
if (!re.test(src)) throw new Error('icons-code: в packages/react/src/index.js нет блока // @icons:begin … // @icons:end');
const nextSrc = src.replace(re, () => block);
for (const [p, s] of [[reactPath, nextSrc], ['packages/vue/src/icons.js', vue]]) {
  const cur = fs.existsSync(path.join(ROOT, p)) ? read(p) : '';
  if (cur === s) continue;
  diff++;
  if (CHECK) console.error(`icons-code: ${p} устарел — node scripts/icons-code.mjs`);
  else { fs.writeFileSync(path.join(ROOT, p), s); console.log('записан:', p); }
}
console.log(`icons-code: иконок ${LIST.length}, монет ${Object.keys(coins).length}; ${CHECK ? 'расходится' : 'обновлено'} ${diff}`);
if (CHECK && diff) process.exit(1);
