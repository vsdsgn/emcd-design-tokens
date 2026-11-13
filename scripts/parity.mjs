// Паритет Figma ↔ код. Вход: docs/ds-manifest.json (Figma Components), tokens/**, claude-ds/status.json,
// docs/components/*.md, docs/parity-baseline.json и (если есть) манифест кода.
// Запуск: node scripts/parity.mjs [--code=<файл>] [--strict] [--json]
//   TOKENS   токен стоит в компоненте Figma, но его нет в tokens/** (кроме pendingPublish из baseline) — ошибка
//   BASELINE строка baseline устарела (токен уже есть в репо или больше не используется) — ошибка
//   STATUS   claude-ds/status.json расходится со статусом набора в Figma — ошибка
//   CODE     манифест кода: нет компонента, свойства, значения оси, другое значение по умолчанию, нет токена — ошибка
//   Токены коллекции Brand в Figma названы без префикса (radius/xs), в репо — brand/radius/xs: считаются совпавшими.
//   docs/parity-baseline.json: pendingPublish — токены, ждущие Publish Foundations и экспорта; accepted — известные расхождения
//   ({ match: начало строки ошибки, reason, until: ГГГГ-ММ-ДД }); просроченная или несработавшая строка — ошибка.
//   CONTRACT beta / stable набор без docs/components/<name>.md — совещательно (--strict: ошибка)
// Манифест кода (docs/code-manifest.json или --code): { "components": { "Button": { "props": { "size": { "type": "enum",
//   "values": ["s", "m"], "default": "m" } }, "slots": ["leading"], "tokens": ["--action-primary-default"] } } }
// Имена: ось Figma «Label position» → prop labelPosition; булево «Show label» → showLabel; значение «On border» → on-border.
import fs from 'node:fs';
import path from 'node:path';

const arg = (k) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || '').slice(k.length + 3);
const strict = process.argv.includes('--strict');
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

const manifest = read('docs/ds-manifest.json');
const baseline = fs.existsSync('docs/parity-baseline.json') ? read('docs/parity-baseline.json') : {};
const codePath = arg('code') || (fs.existsSync('docs/code-manifest.json') ? 'docs/code-manifest.json' : '');
const sets = manifest.pages.flatMap((p) => p.sets.map((s) => ({ ...s, level: p.level, page: p.page })));

// tokens/** → имена через «/», как в Figma
const repo = new Set();
const walk = (o, p) => {
  if (!o || typeof o !== 'object') return;
  if ('$value' in o) { repo.add(p.join('/')); return; }
  for (const k of Object.keys(o)) if (!k.startsWith('$')) walk(o[k], [...p, k]);
};
for (const d of fs.readdirSync('tokens')) for (const f of fs.readdirSync(path.join('tokens', d))) walk(read(path.join('tokens', d, f)), []);

const used = new Map(); // токен → наборы
for (const s of sets) for (const list of Object.values(s.tokens || {})) for (const t of list) {
  const name = t.slice(t.indexOf(':') + 1);
  if (!used.has(name)) used.set(name, new Set());
  used.get(name).add(s.name);
}

// базы и служебные слои (manifest.bases): после замены на месте токены живут в них, а не в надстройке
for (const s of (manifest.bases || []).flatMap((p) => p.sets)) for (const name of s.tokens) {
  if (!used.has(name)) used.set(name, new Set());
  used.get(name).add(s.name);
}

const errors = []; const notes = [];
const who = (name) => { const a = [...used.get(name)]; return a.slice(0, 4).join(', ') + (a.length > 4 ? ` +${a.length - 4}` : ''); };

// TOKENS, BRAND, BASELINE
const pending = new Set(baseline.pendingPublish || []);
for (const name of [...used.keys()].sort()) {
  if (repo.has(name)) continue;
  if (repo.has('brand/' + name)) continue;
  if (!pending.has(name)) errors.push(`TOKENS ${name}: в Figma есть, в tokens/** нет (${who(name)})`);
}
for (const name of pending) {
  if (repo.has(name)) errors.push(`BASELINE ${name}: уже есть в tokens/** — убрать из docs/parity-baseline.json`);
  else if (!used.has(name)) errors.push(`BASELINE ${name}: в манифесте Figma не используется — убрать из docs/parity-baseline.json`);
}

// STATUS
const pascal = (s) => s.replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
const byPascal = new Map(sets.map((s) => [pascal(s.name), s]));
const status = read('claude-ds/status.json').components;
for (const [name, st] of Object.entries(status)) {
  const s = byPascal.get(name);
  if (!s) { errors.push(`STATUS ${name}: в claude-ds/status.json есть, набора в Figma нет`); continue; }
  if (s.status !== st) errors.push(`STATUS ${name}: status.json «${st}», Figma «${s.status || 'нет'}»`);
}

// CONTRACT
const kebab = (s) => s.replace(/^_/, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
const contracts = new Set(fs.existsSync('docs/components') ? fs.readdirSync('docs/components').map((f) => f.replace(/\.md$/, '')) : []);
const need = sets.filter((s) => (s.status === 'beta' || s.status === 'stable') && !contracts.has(kebab(s.name)));
for (const s of need) (strict ? errors : notes).push(`CONTRACT ${s.name} (${s.status}): нет docs/components/${kebab(s.name)}.md`);

// CODE
const camel = (s) => { const p = pascal(s); return p[0].toLowerCase() + p.slice(1); };
const val = (s) => String(s).trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
const SERVICE = new Set(['Focus ring', 'Show hit area', 'Safe margin']);
const cssVar = (t) => '--' + t.replace(/[/.]/g, '-');
let codeNote = 'манифест кода не передан (DSP, Vue, Flutter недоступны) — сверка props пропущена';
if (codePath) {
  const code = read(codePath).components || {};
  codeNote = `манифест кода: ${codePath}, компонентов ${Object.keys(code).length}`;
  for (const s of sets.filter((x) => !x.name.startsWith('_') && (x.status === 'beta' || x.status === 'stable'))) {
    const c = code[pascal(s.name)];
    if (!c) { errors.push(`CODE ${s.name}: компонента ${pascal(s.name)} в коде нет`); continue; }
    const props = c.props || {};
    for (const [axis, values] of Object.entries(s.axes || {})) {
      if (axis === 'State') continue; // состояния — не props
      const p = props[camel(axis)];
      if (!p) { errors.push(`CODE ${s.name}: нет prop ${camel(axis)} (ось «${axis}»)`); continue; }
      const have = new Set((p.values || []).map(val));
      const miss = values.map(val).filter((v) => !have.has(v) && !(p.type === 'boolean' && /^(true|false|on|off|yes|no)$/.test(v)));
      if (miss.length) errors.push(`CODE ${s.name}.${camel(axis)}: нет значений ${miss.join(', ')}`);
    }
    for (const p of s.props || []) {
      if (SERVICE.has(p.name) || p.type === 'INSTANCE_SWAP') continue;
      const key = camel(p.name);
      const inCode = props[key] || (c.slots || []).includes(key);
      if (!inCode) { errors.push(`CODE ${s.name}: нет prop или слота ${key} («${p.name}»)`); continue; }
      if (p.type === 'BOOLEAN' && props[key] && props[key].default != null && props[key].default !== p.def) errors.push(`CODE ${s.name}.${key}: default ${props[key].default}, Figma ${p.def}`);
    }
    if (c.tokens) {
      const have = new Set(c.tokens);
      const miss = [...new Set(Object.values(s.tokens || {}).flat().map((t) => t.slice(t.indexOf(':') + 1)))].filter((t) => !have.has(cssVar(t)) && !have.has(cssVar('brand/' + t)));
      if (miss.length) errors.push(`CODE ${s.name}: в коде нет токенов ${miss.slice(0, 8).join(', ')}${miss.length > 8 ? ` +${miss.length - 8}` : ''}`);
    }
  }
}

// accepted: известные расхождения из baseline
const today = new Date().toISOString().slice(0, 10);
for (const a of baseline.accepted || []) {
  const hit = errors.filter((e) => e.startsWith(a.match));
  if (!hit.length) { errors.push(`BASELINE accepted «${a.match}»: расхождения больше нет — убрать из docs/parity-baseline.json`); continue; }
  if (!a.reason || !/^\d{4}-\d{2}-\d{2}$/.test(a.until || '') || a.until < today) { errors.push(`BASELINE accepted «${a.match}»: нет причины или срок ${a.until || '—'} прошёл`); continue; }
  for (const e of hit) { errors.splice(errors.indexOf(e), 1); notes.push(`ЖДЁТ до ${a.until}: ${e} — ${a.reason}`); }
}

const summary = { manifest: manifest.generated, sets: sets.length, tokensUsed: used.size, tokensInRepo: repo.size, pendingPublish: pending.size, errors: errors.length, notes: notes.length };
if (process.argv.includes('--json')) console.log(JSON.stringify({ summary, errors, notes, code: codeNote }, null, 1));
else {
  errors.forEach((e) => console.log('✗ ' + e));
  notes.forEach((n) => console.log('· ' + n));
  console.log(codeNote);
  console.log(`parity: манифест ${summary.manifest}, наборов ${summary.sets}, токенов в компонентах ${summary.tokensUsed}, ждут Publish ${summary.pendingPublish}; ошибок ${errors.length}, совещательных ${notes.length}`);
}
process.exit(errors.length ? 1 : 0);
