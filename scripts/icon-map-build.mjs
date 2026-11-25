// Карта legacy-иконок → компоненты DS 2.0 Icons (25.11, миграция экранов).
// Источники: docs/icons-audit.csv (new_name ← legacy_names) и docs/migration/icon-keys.tsv (ключи компонентов Icons).
// Монеты: legacy ic_bitcoin_btc / smbl-kaspa-kas / ic_ canxium_cau → symbol/coin/* по тикеру (последнее слово имени).
// Выход: docs/migration/icon-map.json — { "<legacy name>": "<key>" }, плюс { "_coin:<ticker>": key }.
import fs from 'node:fs';
const keys = Object.fromEntries(fs.readFileSync('docs/migration/icon-keys.tsv', 'utf8').trim().split('\n').slice(1).map((l) => l.split('\t')));
const rows = fs.readFileSync('docs/icons-audit.csv', 'utf8').trim().split('\n').slice(1);
const parse = (l) => { const out = []; let cur = '', q = false; for (const ch of l) { if (ch === '"') q = !q; else if (ch === ',' && !q) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out; };
const map = {}; let miss = [];
for (const l of rows) { const [name, , , legacy] = parse(l); if (!keys[name]) { miss.push(name); continue; }
  for (const part of (legacy || '').split(/,\s*(?![^()]*\))/)) { const n = part.replace(/\s*\(\d+\)\s*$/, '').trim(); if (n && !/^\d+$/.test(n)) map[n] = keys[name]; } }
// Ручные пары (25.11, экраны майнинга App): имени нет в аудите или оно не сводится к DS по правилу.
const ALIAS = { ic_arrow_list: 'icon/chevron-right', ic_arrow_list_down: 'icon/chevron-down', 'ic-corner-small-down-x1': 'icon/chevron-down', 'ic-corner-small-down': 'icon/chevron-down', 'ic-info-tooltip': 'icon/info', 'ic-time': 'icon/history', ic_ethereum_classic: 'symbol/coin/ethereum-classic-etc', ic_Gram: 'symbol/coin/toncoin-ton', calculator: 'icon/calculator' };
for (const [l, n] of Object.entries(ALIAS)) if (keys[n]) map[l] = keys[n];
for (const [n, k] of Object.entries(keys)) if (n.startsWith('symbol/coin/')) map['_coin:' + n.split('/').pop().split('-').pop()] = k;
fs.writeFileSync('docs/migration/icon-map.json', JSON.stringify(map, null, 0));
console.log('legacy→DS:', Object.keys(map).filter((k) => !k.startsWith('_')).length, '· монет:', Object.keys(map).filter((k) => k.startsWith('_coin')).length, '· new_name без ключа (нет в Icons или не опубликован):', miss.length);
