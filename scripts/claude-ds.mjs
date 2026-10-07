#!/usr/bin/env node
// Claude DS: обновляет дизайн-систему для Claude Design из репо.
// Берёт текущие файлы артефакта (--base <папка project/ из Artifact read>) и сливает с репо:
//   значения токенов   ← build/json/emcd.{dark,light}.ios.json (подписи токенов и прозу README сохраняет)
//   компоненты репо    ← claude-ds/components/<Comp>/{README.md,preview.html,style.css}
//   статусы            ← claude-ds/status.json (карточка, README компонента, блок в README)
// Пишет только изменившиеся файлы в --out (по умолчанию claude-ds/out/project) и печатает список.
// Публикация — «обнови Claude DS» (docs/claude-ds.md).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const BASE = arg('--base');
const OUT = path.resolve(arg('--out', path.join(ROOT, 'claude-ds/out/project')));
if (!BASE) { console.error('Нужен --base <папка project/ артефакта> (Artifact read). docs/claude-ds.md'); process.exit(2); }
const BRAND = 'emcd';
const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const read = (p) => fs.readFileSync(p, 'utf8');
const exists = (p) => fs.existsSync(p);

const kebab = (k) => k.replace(/([a-z])([A-Z0-9])/g, '$1-$2').replace(/([0-9])([A-Z])/g, '$1-$2').toLowerCase();
const loose = (n) => n.replace(/-/g, ''); // data1 ≡ data-1, space3xs ≡ space-3xs
const isColor = (v) => typeof v === 'string' && /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|oklch\()/i.test(v.trim());
const px = (v) => (typeof v === 'number' ? `${v}px` : String(v));

const base = readJSON(path.join(BASE, 'tokens.json'));
const themes = base.color?.themes?.length ? base.color.themes : [{ id: 'dark', name: 'Dark' }, { id: 'light', name: 'Light' }];
const build = Object.fromEntries(themes.map((t) => [t.id, readJSON(path.join(ROOT, `build/json/${BRAND}.${t.id}.ios.json`))]));
const src = build[themes[0].id];
const status = readJSON(path.join(ROOT, 'claude-ds/status.json')).components;

const GROUP_USAGE = [
  [/^surface-level/, 'Уровень поверхности: L0 страница → L3. Контрол — на уровень выше подложки.'],
  [/^(bg|surface)-/, 'Поверхности и фоны.'], [/^text-/, 'Цвет текста.'], [/^icon-/, 'Цвет иконок.'],
  [/^border-/, 'Обводки и разделители.'], [/^action-/, 'Заливки действий (кнопки).'],
  [/^state-/, 'Слой состояний Hover / Pressed поверх заливки.'], [/^control-/, 'Контролы: поля, чекбоксы, переключатели, сегменты.'],
  [/^status-/, 'Статусы — никогда только цветом, рядом иконка или подпись.'], [/^data-/, 'Серии графиков (без брендовых и статусных цветов).'],
  [/^(glow|light|material|edge|decor)-/, 'Декор Expressive (только pool и Monitoring на мощных устройствах).'],
  [/^(accent|highlight)-/, 'Бренд: акцент и супер-акцент.'], [/^(shadow|skeleton|scrollbar|fade)-/, 'Служебные: тени, скелетоны, скроллбар, затухание края.'],
  [/^fixed-/, 'Не зависит от темы.'], [/^space-/, 'Отступ по шкале.'], [/^radius-/, 'Скругление по роли.'],
];

// ---- tokens.json: значения из репо, подписи и всё прочее — из артефакта ----
const log = { changed: [], added: [], kept: [] };
function merge(family, entries) {
  const old = base[family]?.tokens || [];
  const byLoose = new Map(old.map((t) => [loose(t.name), t]));
  const seen = new Set();
  const out = entries.map(({ name, value }) => {
    const prev = byLoose.get(loose(name));
    if (prev) seen.add(prev.name);
    const usage = prev?.usage || GROUP_USAGE.find(([re]) => re.test(name))?.[1] || '';
    if (!prev) log.added.push(name);
    else if (JSON.stringify(prev.value) !== JSON.stringify(value) || prev.name !== name) log.changed.push(prev.name === name ? name : `${prev.name} → ${name}`);
    return { ...(prev || {}), name, value, usage };
  });
  for (const t of old) if (!seen.has(t.name)) { log.kept.push(t.name); out.push(t); } // нет в репо: оставляем, перечисляем
  return out;
}
const colors = Object.entries(src).filter(([k, v]) => !k.startsWith('brand') && isColor(v))
  .map(([k, v]) => ({ name: kebab(k), value: Object.fromEntries(themes.map((t) => [t.id, String(build[t.id][k] ?? v).toLowerCase()])) }));
const lengths = (re) => Object.entries(src).filter(([k, v]) => re.test(k) && (typeof v === 'number' || /^\d/.test(String(v)))).map(([k, v]) => ({ name: kebab(k), value: px(v) }));
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const tokens = {
  ...base,
  meta: { ...(base.meta || {}), source: 'github', repo: 'vsdsgn/emcd-design-tokens', paths: { tokens: [`build/json/${BRAND}.{${themes.map((t) => t.id)}}.ios.json`] }, components: 'claude-ds/components' },
  color: { ...base.color, themes, tokens: merge('color', colors) },
  spacing: { ...(base.spacing || {}), tokens: merge('spacing', lengths(/^space/)) },
  radius: { ...(base.radius || {}), tokens: merge('radius', lengths(/^radius/)) },
};
if (base.type) {
  const fam = src.brandFontFamilyText;
  if (fam && tokens.type.families?.sans && !tokens.type.families.sans.includes(`'${fam}'`)) log.changed.push(`font sans → ${fam}`);
  tokens.type = { ...base.type, groups: base.type.groups.map((g) => ({ ...g, styles: g.styles.map((s) => {
    const key = 'type' + camel('-' + s.name.replace(/-strong$/, ''));
    const size = src[key + 'Size'], lh = src[key + 'LineHeight'];
    return { ...s, ...(size != null && { fontSize: px(size) }), ...(lh != null && { lineHeight: px(lh) }) };
  }) })) };
}

// ---- компоненты ----
const STATUS = {
  stable: { e: '🟢', group: '🟢 Stable', note: 'сделан в коде и сверен с макетом — можно брать.' },
  beta: { e: '🟡', group: '🟡 Beta', note: 'дизайн готов — в макеты и разработку; правки ещё возможны.' },
  draft: { e: '🟠', group: '🟠 Draft — в макеты не брать', note: 'дизайн в работе — в макеты не брать, только по прямой просьбе.' },
  deprecated: { e: '🔴', group: '🔴 Deprecated', note: 'не брать.' },
};
const files = new Map([['tokens.json', JSON.stringify(tokens, null, 1) + '\n']]);
const baseComp = path.join(BASE, 'components');
const repoComp = path.join(ROOT, 'claude-ds/components');
const names = new Set([...(exists(baseComp) ? fs.readdirSync(baseComp) : []), ...fs.readdirSync(repoComp)]
  .filter((n) => n !== 'Cover' && (exists(path.join(baseComp, n, 'README.md')) || exists(path.join(repoComp, n)))));
const warn = [];
const pick = (c, f) => (exists(path.join(repoComp, c, f)) ? read(path.join(repoComp, c, f)) : exists(path.join(baseComp, c, f)) ? read(path.join(baseComp, c, f)) : null);
for (const c of [...names].sort()) {
  const st = status[c] || (warn.push(`нет статуса у ${c} в claude-ds/status.json — draft`), 'draft');
  const S = STATUS[st];
  let html = pick(c, 'preview.html');
  if (html) {
    html = html.replace(/^<!--\s*@dsCard([^>]*)-->/, (m, attrs) => {
      const g = (attrs.match(/group="([^"]*)"/) || [])[1] || '';
      let sub = (attrs.match(/subtitle="([^"]*)"/) || [])[1] || '';
      const already = /^(🟢|🟡|🟠|🔴)/.test(g);
      if (!already && g) sub = sub ? `${g} · ${sub}` : g;
      const rest = attrs.replace(/\s*group="[^"]*"/, '').replace(/\s*subtitle="[^"]*"/, '').trim();
      return `<!-- @dsCard group="${S.group}"${sub ? ` subtitle="${sub}"` : ''}${rest ? ' ' + rest : ''} -->`;
    });
    files.set(`components/${c}/preview.html`, html);
  }
  let md = pick(c, 'README.md');
  if (md) {
    const line = `**Статус: ${S.e} ${st}** — ${S.note}`;
    if (/^\*\*Статус: .*$/m.test(md)) md = md.replace(/^\*\*Статус: .*$/m, line);
    else { const p = md.split(/\n\n/); p.splice(p[0].startsWith('#') ? 2 : 1, 0, line); md = p.join('\n\n'); }
    files.set(`components/${c}/README.md`, md);
  }
}
// bundle.css: блоки компонентов из репо заменяют свои секции
let css = exists(path.join(baseComp, 'bundle.css')) ? read(path.join(baseComp, 'bundle.css')) : '';
for (const c of fs.readdirSync(repoComp)) {
  const p = path.join(repoComp, c, 'style.css');
  if (!exists(p)) continue;
  const block = `/* @claude-ds:begin ${c} */\n${read(p).trim()}\n/* @claude-ds:end ${c} */\n\n`;
  const marked = new RegExp(`/\\* @claude-ds:begin ${c} \\*/[\\s\\S]*?/\\* @claude-ds:end ${c} \\*/\\n*`);
  if (marked.test(css)) css = css.replace(marked, block);
  else {
    const start = css.search(new RegExp(`^/\\* ${c} \\*/`, 'm'));
    if (start < 0) css += '\n' + block;
    else {
      const after = css.slice(start + 1).search(/^\/\* [A-Z][A-Za-z ]* \*\/$/m);
      const end = after < 0 ? css.length : start + 1 + after;
      css = css.slice(0, start) + block + css.slice(end);
    }
  }
}
if (css) files.set('components/bundle.css', css);

// README: проза сохраняется, блок статусов — генерируется
const order = Object.keys(STATUS).filter((k) => k !== 'deprecated');
const rows = order.map((k) => [k, [...names].sort().filter((c) => (status[c] || 'draft') === k)]).filter(([, l]) => l.length);
const blockMd = ['<!-- claude-ds:status -->', '## Статусы компонентов', '',
  'Статус совпадает с эмодзи страницы в Figma Components. Собирая экраны, бери 🟢 stable и 🟡 beta; 🟠 draft — только если об этом прямо попросили (компонент ещё поменяется).', '',
  '| Статус | Компоненты |', '|---|---|', ...rows.map(([k, l]) => `| ${STATUS[k].e} ${k} | ${l.join(', ')} |`), '',
  'Система собирается из репозитория `vsdsgn/emcd-design-tokens` (docs/claude-ds.md). Правки — в репо, не на этой странице: следующая синхронизация их перезапишет.',
  '<!-- /claude-ds:status -->'].join('\n');
let readme = read(path.join(BASE, 'README.md'));
const MARK = /<!-- claude-ds:status -->[\s\S]*?<!-- \/claude-ds:status -->/;
readme = MARK.test(readme) ? readme.replace(MARK, blockMd) : `${readme.trimEnd()}\n\n${blockMd}\n`;
files.set('README.md', readme);

// ---- проверка var() без значения ----
const declared = new Set(['color', 'spacing', 'radius', 'shadow'].flatMap((f) => (tokens[f]?.tokens || []).map((t) => t.name))
  .concat(Object.keys(tokens.type?.families || {}).map((k) => `font-${k}`)));
const all = [...files.entries()].filter(([p]) => /\.(css|html)$/.test(p));
for (const n of fs.readdirSync(baseComp || '.')) { const p = path.join(baseComp, n, 'preview.html'); if (exists(p) && !files.has(`components/${n}/preview.html`)) all.push([`components/${n}/preview.html`, read(p)]); }
const local = new Set(all.flatMap(([, t]) => [...t.matchAll(/(^|[;{\s"'])--([a-z0-9-]+)\s*:/g)].map((m) => m[2])));
const missing = new Map();
for (const [p, t] of all) for (const m of t.matchAll(/var\(--([a-z0-9-]+)\s*\)/g)) if (!declared.has(m[1]) && !local.has(m[1])) missing.set(m[1], [...new Set([...(missing.get(m[1]) || []), p.split('/')[1] || p])]);

// ---- запись только изменившегося ----
fs.rmSync(OUT, { recursive: true, force: true });
const changedFiles = [];
for (const [rel, txt] of files) {
  const bp = path.join(BASE, rel);
  if (exists(bp) && read(bp) === txt) continue;
  const op = path.join(OUT, rel); fs.mkdirSync(path.dirname(op), { recursive: true }); fs.writeFileSync(op, txt);
  changedFiles.push(rel);
}
console.log(`claude-ds: изменено файлов ${changedFiles.length} → ${path.relative(ROOT, OUT) || OUT}`);
for (const f of changedFiles) console.log('  · ' + f);
console.log(`токены: изменено ${log.changed.length}, добавлено ${log.added.length}, нет в репо (оставлены) ${log.kept.length}`);
if (log.added.length) console.log('  + ' + log.added.join(', '));
if (log.kept.length) console.log('  ? нет в репо: ' + log.kept.join(', '));
for (const w of warn) console.warn('  ! ' + w);
if (missing.size) { console.warn(`  ! var() без значения (${missing.size}):`); for (const [n, w] of missing) console.warn(`    --${n} (${w.join(', ')})`); }
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(path.join(path.dirname(OUT), 'changed.json'), JSON.stringify(changedFiles, null, 1));
