// Данные борды v3 из контракта: `docs/components/<slug>.md` + `docs/ds-manifest.json` → JSON для `scripts/figma/board-v3.plugin.js`.
// Борда собирается только из контракта и живого набора в Figma — поэтому «контракт = борда» по построению.
// Запуск: node scripts/board-data.mjs --out=<папка> [--only="Notification,Tab"]. На каждую борду v3 — файл <id борды>.json.
// Борда с несколькими наборами (Table cells, Input + аддоны): первый набор — главный, остальные идут блоками «Наборы страницы».
import fs from 'node:fs';

const arg = (k) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || '').slice(k.length + 3);
const out = arg('out');
const only = arg('only') ? new Set(arg('only').split(',').map((x) => x.trim())) : null;
if (!out) { console.error('board-data: нужен --out=<папка>'); process.exit(1); }
const manifest = JSON.parse(fs.readFileSync('docs/ds-manifest.json', 'utf8'));
const kebab = (s) => s.replace(/^_/, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
const pascal = (s) => s.replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
const EMPTY = /^(—|не описано|Не описано|Нет\.?$)/;

// Наборы, у которых борда названа иначе, и борды на несколько наборов. Ключ — имя борды без « — борда · шаблон v3».
const BOARD_SETS = {
  'Table cells': (p) => p.sets.filter((s) => /^Table cell/.test(s.name)).map((s) => s.name),
  Input: (p) => ['Input', ...p.sets.filter((s) => /^Input addon/.test(s.name)).map((s) => s.name)],
  Tooltip: () => ['Tooltip'],
};

function parse(name) {
  const file = `docs/components/${kebab(name)}.md`;
  if (!fs.existsSync(file)) return null;
  const md = fs.readFileSync(file, 'utf8');
  const sec = {};
  let cur = null;
  for (const line of md.split('\n')) {
    const m = line.match(/^## (\d+)\. /);
    if (m) { cur = m[1]; sec[cur] = []; continue; }
    if (cur) sec[cur].push(line);
  }
  // Пункты раздела: «- текст»; вложенные «  - текст» приклеиваются к родителю списком.
  const items = (n, stopAtBlank) => {
    const res = [];
    for (const l of sec[n] || []) {
      if (stopAtBlank && res.length && !l.trim()) break;
      const top = l.match(/^- (.*)/); const sub = l.match(/^\s+- (.*)/);
      if (top) res.push({ t: top[1], sub: [] }); else if (sub && res.length) res[res.length - 1].sub.push(sub[1]);
    }
    return res;
  };
  const flat = (n, stop) => items(n, stop).map((x) => x.t).filter((x) => !EMPTY.test(x));
  const intent = items('2');
  const pick = (re) => { const x = intent.find((i) => re.test(i.t)); if (!x) return []; const head = x.t.replace(re, '').trim(); return [...(head && !EMPTY.test(head) ? [head] : []), ...x.sub]; };
  const id = (sec['1'] || []).join(' ');
  const what = intent.length && !/^(Когда|Правило|Не делаем)/.test(intent[0].t) && !EMPTY.test(intent[0].t) ? intent[0].t : '';
  const never = pick(/^Не делаем:/).flatMap((x) => x.split(/;\s+/)).map((x) => x.replace(/\.$/, '').trim()).filter(Boolean);
  const tokens = flat('10').filter((x) => /^`/.test(x)).map((x) => { const m = x.match(/^`([^`]+)`:\s*(.*)$/); return m ? [m[1], m[2].replace(/\.$/, '')] : null; }).filter(Boolean);
  const service = flat('10').find((x) => /^Служебные слои/.test(x));
  const minmax = flat('10').find((x) => /^Min \/ max/.test(x));
  const code = (sec['13'] || []).filter((l) => /^- /.test(l)).map((l) => l.slice(2));
  return {
    file,
    status: (id.match(/Status: (\w+)/) || [])[1] || 'draft',
    platforms: ((id.match(/Платформы: ([^\n]*?)\.(\s|$)/) || [])[1] || '').trim(),
    what,
    use: pick(/^Когда использовать:/), dont: pick(/^Когда нет:/), rule: pick(/^Правило выбора варианта:/), never,
    anatomy: flat('3').filter((x) => !/^(Вложено|Служебные слои|Слои с токенами)/.test(x)),
    nested: (flat('3').find((x) => /^Вложено/.test(x)) || '').replace(/^Вложено:\s*/, ''),
    states: flat('4').filter((x) => !/^Оси State нет/.test(x)),
    content: flat('6'), events: flat('7'), behavior: flat('8'), a11y: flat('9'),
    tokens, service: service ? service.replace(/^Служебные слои[^:]*:\s*/, '') : '', minmax: minmax ? minmax.replace(/^Min \/ max корня:\s*/, '') : '',
    platformNotes: flat('11'), codeLines: code, migration: flat('15', true).filter((x) => !/^В описании Figma строки Legacy нет/.test(x)),
  };
}

// Где набор вложен в другие наборы — для раздела 07 «Примеры в составе».
const usedIn = {};
for (const p of manifest.pages) for (const s of p.sets) for (const k of Object.keys(s.nested || {})) (usedIn[k] = usedIn[k] || []).push({ name: s.name, id: s.id });
fs.mkdirSync(out, { recursive: true });
const done = []; const skipped = [];
for (const p of manifest.pages) for (const b of p.boards || []) {
  if (!b.v3) continue;
  const bname = b.name.replace(/ — борда.*/, '');
  if (only && !only.has(bname)) continue;
  const names = BOARD_SETS[bname] ? BOARD_SETS[bname](p) : [bname];
  const sets = names.map((n) => { const s = p.sets.find((x) => x.name === n); const c = parse(n); return s && c ? { id: s.id, name: n, ...c, codeName: `Ds${pascal(n)}` } : null; }).filter(Boolean);
  if (!sets.length) { skipped.push(`${bname}: набора или контракта нет`); continue; }
  // Дополнительным наборам борды нужны только назначение, правило выбора и токены.
  for (let i = 1; i < sets.length; i++) { const { id, name, what, rule, tokens } = sets[i]; sets[i] = { id, name, what, rule, tokens }; }
  const D = { board: b.id, boardName: b.name, pageId: p.pageId, page: p.page, name: bname, generated: manifest.generated, sets, usedIn: (usedIn[names[0]] || []).filter((x) => !names.includes(x.name)).slice(0, 4) };
  fs.writeFileSync(`${out}/${b.id.replace(':', '-')}.json`, JSON.stringify(D));
  done.push(`${b.id} ${bname} · наборов ${sets.length} · ${sets[0].status}`);
}
console.log(done.join('\n'));
if (skipped.length) console.log('ПРОПУЩЕНО:\n' + skipped.join('\n'));
