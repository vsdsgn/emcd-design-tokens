// Агентный слой: файлы, по которым ИИ-агент (Claude Code, Cursor, Claude Design) собирает экраны из DS 2.0 без чтения всего репо.
// Вход: docs/ds-manifest.json (наборы, оси, свойства, статусы) + scripts/contract-data.mjs (что это / когда / когда нет)
//       + раздел «2. Intent» рукописных контрактов (Input, Textarea).
// Выход: llms.txt (карта репо), design.md (принципы, роли цвета, модель состояний, выбор компонента), docs/api.md (ожидаемый API beta-наборов).
// Запуск: node scripts/agent-docs.mjs [--check]   (--check: ничего не пишет, код 1, если файлы на диске отличаются — для CI)
// Имена props — по тем же правилам, что scripts/parity.mjs: ось → camelCase, State — не prop, служебные и INSTANCE_SWAP не входят.
import fs from 'node:fs';
import { DATA } from './contract-data.mjs';

const check = process.argv.includes('--check');
const manifest = JSON.parse(fs.readFileSync('docs/ds-manifest.json', 'utf8'));
const date = manifest.generated;
const all = manifest.pages.flatMap((p) => p.sets.map((s) => ({ ...s, level: p.level, page: p.page })));
const data = new Map(DATA.map((d) => [d.name, d]));

const kebab = (s) => s.replace(/^_/, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
const pascal = (s) => s.replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
const camel = (s) => { const p = pascal(s); return p[0].toLowerCase() + p.slice(1); };
const val = (s) => String(s).trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
const SERVICE_PROPS = new Set(['Focus ring', 'Show hit area', 'Safe margin']);
// Надстройки над базой: свойства живут на вложенном слое базы (exposed), в манифесте у набора их нет — берём список базы.
// Страницы баз в манифест не входят; список — из docs/components/field-base.md, раздел «5. Properties».
const T = (name) => ({ name, type: 'TEXT' }), B = (name, def) => ({ name, type: 'BOOLEAN', def }), SL = (name) => ({ name, type: 'SLOT' });
const BASE_PROPS = {
  '_Field base': [T('Label'), B('Show label', true), T('Value'), T('Helper'), B('Show helper', false), T('Counter'), B('Show counter', false),
    B('Show leading', false), B('Show inline', false), B('Show trailing', false), SL('Leading'), SL('Inline'), SL('Trailing')],
};
const baseOf = (s) => Object.keys(BASE_PROPS).find((b) => (s.nested || {})[b] === s.variants);
const LEVEL = { atom: 'атом', molecule: 'молекула', organism: 'организм' };
const contract = (name) => `docs/components/${kebab(name)}.md`;
const cell = (s) => String(s || '—').replace(/\|/g, '/').replace(/\.$/, '');

// Что это / когда / когда нет: из contract-data, иначе из раздела «2. Intent» рукописного контракта.
function intent(name) {
  const d = data.get(name);
  if (d) return { what: d.what, use: d.use, dont: d.dont };
  const f = contract(name);
  if (!fs.existsSync(f)) return {};
  const sec = (fs.readFileSync(f, 'utf8').match(/^## 2\. Intent\n([\s\S]*?)(?=^## )/m) || [])[1] || '';
  const pick = (k) => (sec.match(new RegExp(`^- ${k}:\\s*(.+)$`, 'm')) || [])[1];
  return { what: pick('Что это'), use: pick('Когда использовать'), dont: pick('Когда нет') };
}

const beta = all.filter((s) => s.status === 'beta');
const draft = all.filter((s) => s.status === 'draft');
const other = all.filter((s) => s.status !== 'beta' && s.status !== 'draft');
const bases = fs.readdirSync('docs/components').filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
  .filter((k) => !beta.some((s) => kebab(s.name) === k) && !draft.concat(other).some((s) => kebab(s.name) === k)).sort();

// ---------- docs/api.md ----------
function api(s) {
  const L = [`## ${s.name}`, ''];
  const i = intent(s.name);
  L.push(`${LEVEL[s.level]} · beta · Vue \`<Ds${pascal(s.name)}>\` · Flutter \`Ds${pascal(s.name)}\` · контракт \`${contract(s.name)}\``, '');
  if (i.what) L.push(i.what, '');
  const rows = [];
  for (const [a, v] of Object.entries(s.axes || {})) {
    if (a === 'State') continue;
    rows.push(`| \`${camel(a)}\` | ${v.map(val).join(' \\| ')} | по правилу контракта | ось ${a} |`);
  }
  const base = baseOf(s);
  for (const p of (s.props || []).concat(base ? BASE_PROPS[base] : [])) {
    if (SERVICE_PROPS.has(p.name) || p.type === 'INSTANCE_SWAP') continue;
    const t = { TEXT: 'string', BOOLEAN: 'boolean', SLOT: 'slot' }[p.type] || p.type;
    const d = p.type === 'BOOLEAN' ? String(p.def === true) : '—';
    rows.push(`| \`${camel(p.name)}\` | ${t} | ${d} | свойство ${p.name}${base ? ` (слой \`Field\`, база \`${base}\`)` : ''} |`);
  }
  if (rows.length) L.push('| Prop | Тип / значения | По умолчанию | В Figma |', '|---|---|---|---|', ...rows, '');
  else L.push('Props нет.', '');
  const st = (s.axes || {}).State;
  if (st) {
    const flags = [[/disabled/i, 'disabled'], [/error/i, 'error'], [/read/i, 'readonly'], [/loading/i, 'loading'], [/skeleton/i, 'skeleton']].filter(([re]) => st.some((x) => re.test(x))).map(([, n]) => `\`${n}\``);
    L.push(`Состояния в Figma: ${st.join(' · ')} — ось State в код не идёт: Hover / Pressed / Focus даёт платформа${flags.length ? `; ${flags.join(', ')} — boolean props` : ''}.`, '');
  }
  const swaps = (s.props || []).filter((p) => p.type === 'INSTANCE_SWAP').map((p) => p.name.replace(/ · swap$/, ''));
  if (swaps.length) L.push(`Иконки (${swaps.join(', ')}) в коде — слот или имя иконки, а не boolean + swap.`, '');
  return L.join('\n');
}
const apiMd = [
  `# Ожидаемый API компонентов — beta (${date})`,
  '',
  'Собрано `scripts/agent-docs.mjs` из `docs/ds-manifest.json` — править не здесь, а в Figma (потом манифест) или в `scripts/contract-data.mjs`.',
  'Это **ожидаемый** API по правилам имён `scripts/parity.mjs`: кода (DSP, Vue `ui-emcd-web`, Flutter) в доступе нет (`docs/dsp-check-2026-11-12.md`). Когда появится манифест кода — `npm run parity` сверит.',
  '',
  'Правила имён: набор → `Ds` + PascalCase; ось → camelCase prop, значения — kebab-case; `State` — не prop; служебные свойства (Focus ring, Show hit area, Safe margin) в код не идут.',
  'Значение оси по умолчанию — по правилу из раздела «2. Intent» контракта (вариант по умолчанию в Figma у части наборов пока другой — `docs/OPEN-QUESTIONS.md`).',
  'Планируемые переименования при замене наборов (MAJOR, `docs/dev-handoff-2026-11-12.md`): `iconLeft` / `iconRight` → `iconStart` / `iconEnd`; ось выбранности — одна на систему.',
  '',
  ...beta.map(api),
].join('\n');

// ---------- design.md ----------
const pickRows = beta.map((s) => { const i = intent(s.name); return `| [${s.name}](${contract(s.name)}) | ${cell(i.what)} | ${cell(i.use)} | ${cell(i.dont)} |`; });
const designMd = `# EMCD DS 2.0 — design.md (${date})

Для агента, который собирает или проверяет интерфейс EMCD. Короткая выжимка правил; подробности — по ссылкам.
Собрано \`scripts/agent-docs.mjs\`: таблица выбора компонента — из манифеста Figma и контрактов, остальное — текст в скрипте. Править там, не здесь.

## 1. Принципы

1. **Система, а не UI kit.** Одна задача — один способ. У каждого варианта жёсткое правило применения; если правило не подходит — не изобретать вариант, а взять другой компонент.
2. **Только семантические токены.** Примитивы (\`color/*\`, \`dimension/*\`) приватны. Значение без токена — только из списка \`docs/exceptions.md\`.
3. **Оси вместо копий.** Brand (EMCD · Geometria · WL Default) × Theme (Light · Dark) × Platform (Web · Mobile web · iOS · Android) × Viewport (Compact … XLarge) × Style (Base · Expressive) + уровень поверхности L0–L3. Компонент один; разницу дают режимы токенов.
4. **Одна модель состояний** для всех компонентов (раздел 4). Hover / Pressed не подбираются цветом на глаз.
5. **Статус решает, можно ли брать.** beta — в макеты и разработку; draft — не брать; stable — сверен с кодом. Сейчас: beta ${beta.length}, draft ${draft.length}, stable 0.
6. **Доступность — часть компонента:** кольцо фокуса, зона нажатия ≥ \`touch/min\` (Web 24, касание 44), контраст WCAG 2.2 AA, статус — никогда только цветом.
7. **Style: Base по умолчанию.** Expressive (свечения, материалы, кромки) — только pool и Monitoring на мощных устройствах; правила — \`docs/style.md\`.

## 2. Роли цвета (коллекция Theme)

| Группа | Роль | Правило |
|---|---|---|
| \`bg/*\` | фон страницы | \`bg/base\` = L0 |
| \`surface/level-0…3\` | уровни поверхностей | уровни отделяются подложкой, не обводкой; контрол — на уровень выше подложки; \`surface/current\` — уровень под компонентом (\`data-surface="0..3"\`) |
| \`surface/raised\`, \`surface/overlay\` | плавающие поверхности | меню, поповеры, модалки — через \`_Overlay surface\` |
| \`text/*\`, \`icon/*\` | текст и иконки | primary — сплошной; secondary 72 %, tertiary 56 %, disabled 40 %; цветной текст (\`text/accent\`, \`text/danger\` …) — на L0–L2, на L3 не ставить |
| \`border/*\` | обводки и разделители | \`subtle\` · \`default\` · \`strong\` (≥ 3:1); фокус — \`border/focus-ring\`, нейтральный |
| \`action/*\` | заливки действий | primary · secondary · tertiary · danger · inverse · accent · disabled. Primary — на L0–L2, Secondary — на L0–L1 |
| \`control/*\` | поля и контролы выбора | \`control/surface/*\`, \`control/border/*\`, \`control/checked\` |
| \`status/*\` | success · warning · danger · info · neutral | \`subtle\` (плашка) · \`border\` · \`solid\` · \`on-subtle\` (текст); рядом всегда иконка или подпись |
| \`accent/*\`, \`highlight/*\` | бренд | акцент и супер-акцент; выбранное — \`accent/subtle\` + \`text/accent\` |
| \`data/1–8\` | серии графиков | не брать брендовые и статусные цвета для данных |
| \`state/layer\`, \`state/layer-inverse\` | слой состояния | см. раздел 4 |
| \`skeleton/*\`, \`scrollbar/*\`, \`fade/*\`, \`shadow/*\` | служебные | — |
| \`fixed/*\` | не зависит от темы | текст на изображениях, промо |
| \`glow/*\` и коллекция Style | декор Expressive | только там, где Style = Expressive |

Размеры, отступы, радиусы, типографика — коллекции Platform и Viewport: \`control/height/*\` (S 32 · M 40 · L 48 · XL 56), \`space/*\`, \`radius/*\` (по роли: \`radius/control\`, \`radius/container\`), \`type/*\`, \`icon/size/*\`.

## 3. Уровни поверхностей

L0 — страница; L1 — карточка / секция; L2 — вложенный блок; L3 — последний. Глубже L3 не вкладывать.
Обводки и плашки полупрозрачные: контраст к своему уровню одинаков на L0–L3 в обеих темах. Подробнее — \`docs/components.md\` «Уровни поверхностей».

## 4. Модель состояний

| Группа | Hover | Pressed | Disabled | Selected |
|---|---|---|---|---|
| Плашка (Button, Icon button, Chip, Segment, строки списков) | слой \`state/layer\` × \`state/hover\` 6 % | слой × \`state/pressed\` 10 %; у кнопок ещё масштаб 0.96 | токены \`*/disabled\`, без Hover | \`accent/subtle\` + \`text/accent\` |
| На тёмной или цветной плашке (Inverted, Primary, выбранный Chip) | слой \`state/layer-inverse\` | то же | как выше | — |
| Поле (Input, Textarea, Select …) | слой, обводка остаётся \`control/border/default\` | нет | как выше | Focus — \`control/border/focus\` + кольцо |
| Контрол выбора (Checkbox, Radio, Toggle) | слой на глифе 6 % | 10 % + 0.96 | 8 % / ползунок 40 % | \`control/checked\` |
| Навигация (Tab, Nav item, Tab bar item) | слой / цвет текста | — | \`*/disabled\` | индикатор \`border/accent\` |
| Текстовый (Text-кнопка, ссылка, Breadcrumb) | цвет текста | цвет текста | \`text/disabled\` | — |

- В коде слой — один \`::before\`: \`background: var(--state-layer); opacity: var(--state-hover)\` (в CSS \`--state-hover: 0.06\`, \`--state-pressed: 0.1\`; во Flutter-JSON — проценты 6 и 10).
- Движение: 120 мс \`motion/duration/feedback\`, \`motion/easing/standard\`; «уменьшить движение» — длительности ≈ 0, без масштаба. Кольцо фокуса — сразу, только с клавиатуры.
- Hover — только с указателем; на касании Hover нет, Pressed остаётся; хаптик \`haptic/press\` — iOS, Android, Mobile web.
- Загрузка: < 300 мс — ничего; до 1 с — Spinner на месте действия; дольше — Skeleton в форме контента; действие — кнопка в Loading.
- Источник: \`docs/components.md\` «Модель состояний», \`docs/components/service-layers.md\`, \`docs/motion.md\`.

## 5. Как выбрать компонент

Сначала задача, потом компонент:

- Запустить действие → **Button**; то же без подписи, узнаваемой иконкой → **Icon button**; действие внутри строки текста → Button Type=Text.
- Ввести строку → **Input**; несколько строк → **Textarea**; единица, «Max», шеврон, степпер внутри поля → **Input addon / …** в слоте поля.
- Выбрать несколько независимых → **Checkbox**; один из 2–5 → **Radio**; включить настройку сразу, без «Сохранить» → **Toggle**.
- Фильтр или вариант из видимого набора → **Chip**; режим или период из 2–4 → Segmented (элемент — **Segment**); разделы одного экрана → Tabs (элемент — **Tab**).
- Основные разделы продукта на Compact → Tab bar (элемент — **Tab bar item**); путь назад по уровням → Breadcrumbs (элемент — **Breadcrumb item**).
- Пометка-свойство («Новое», «Beta») → **Badge**; количество → **Counter**; состояние, которое обновляется само (online / offline) → **Status**.

Компоненты, которые можно брать (beta):

| Компонент | Что это | Когда | Когда нет |
|---|---|---|---|
${pickRows.join('\n')}

Правила выбора варианта (Type, Tone, Size …) — раздел «2. Intent» контракта компонента. Props — \`docs/api.md\`.
Остальные ${draft.length} наборов — draft: в макеты и код не брать (список — \`llms.txt\`). Если задача не закрывается beta-компонентом — не собирать свой из примитивов, а записать в \`docs/OPEN-QUESTIONS.md\`.

## 6. Устройство компонента

- **База + надстройки.** Общая конструкция живёт в базе, компонент — надстройка над ней: \`_Field base\` (поля), \`_Selection control\` (Checkbox / Radio / Toggle), \`_List row\` (строки списков и меню), \`_Overlay surface\` (плавающие поверхности). Базы в макетах напрямую не используются.
- **Служебные слои** у каждого интерактивного компонента: \`_State layer\`, \`_Focus ring\`, \`_Hit area\`, \`_Safe margin\` — \`docs/components/service-layers.md\`.
- **Контракт** — 15 разделов по \`docs/component-contract.md\`; контракт = описание в Figma = борда = манифест.
- **Свойства или слоты:** текст и булевы — свойства; произвольное содержимое — слот. Иконка — замена экземпляра, не вариант на иконку.
- **RTL:** leading ↔ trailing зеркалятся, смысловые стрелки отражаются, цифры и латиница — нет (\`docs/rtl.md\`). Длинные языки (de, kk): +35 % ширины.

## 7. Чего не делать

- Не использовать примитивы и hex; не подбирать Hover / Pressed цветом вместо слоя состояния.
- Не ставить две Primary рядом; Secondary — не глубже L1; Primary — не на L3 в тёмной теме.
- Не передавать статус только цветом; не убирать кольцо фокуса; не делать зону нажатия меньше \`touch/min\`.
- Не брать draft-наборы и не менять stable без deprecated + major.
- Не включать Expressive там, где он не разрешён; не вкладывать поверхности глубже L3.
`;

// ---------- llms.txt ----------
const byLevel = (list) => ['atom', 'molecule', 'organism'].map((l) => {
  const n = list.filter((s) => s.level === l).map((s) => s.name);
  return n.length ? `- ${LEVEL[l]} (${n.length}): ${n.join(', ')}` : null;
}).filter(Boolean);
const llms = `# EMCD Design System 2.0

> Дизайн-система EMCD: токены (Figma Foundations → W3C DTCG → CSS и Flutter-JSON) и компоненты (Figma Components) для Mining web app, мобильного приложения на Flutter, сайта, white-label и Geometria. Оси: Brand × Theme × Platform × Viewport × Style, уровни поверхностей L0–L3. Язык документации — русский. Состояние на ${date}: beta ${beta.length} наборов, draft ${draft.length}, stable 0.

Правда — репо и Figma. Ключи файлов Figma и ссылки на артефакты лежат в закрытом \`docs/private/LINKS.md\` и в git не попадают.
Собрано \`scripts/agent-docs.mjs\` — править там, не здесь.

## Начать отсюда

- [design.md](design.md): принципы, роли цвета, модель состояний, как выбрать компонент
- [docs/api.md](docs/api.md): ожидаемый API (props) beta-компонентов для Vue и Flutter
- [docs/HANDOFF.md](docs/HANDOFF.md): текущий этап, принятые правила, что сделано последним
- [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md): открытые вопросы и парковка идей
- [docs/HOW-IT-WORKS.md](docs/HOW-IT-WORKS.md): как устроены репо, скрипты и проверки
- [CLAUDE.md](CLAUDE.md): правила работы агента в этом репо

## Токены

- [README.md](README.md): слои токенов, структура, подключение на вебе
- [tokens/](tokens): исходники W3C DTCG, по файлу на режим коллекции
- [build/css/ds.min.css](build/css/ds.min.css): CSS-переменные одним файлом (\`data-brand\`, \`data-theme\`, \`data-platform\`, \`data-style\`, \`data-surface\`)
- [build/json/](build/json): плоские токены brand × theme × ios|android (+ expressive) для Flutter
- [docs/exceptions.md](docs/exceptions.md): единственный список значений без токена
- [docs/sizing.md](docs/sizing.md), [docs/platforms.md](docs/platforms.md), [docs/style.md](docs/style.md), [docs/motion.md](docs/motion.md), [docs/effects.md](docs/effects.md), [docs/rtl.md](docs/rtl.md), [docs/typography-l10n.md](docs/typography-l10n.md): размеры, платформы, Base / Expressive, движение, эффекты, RTL, типографика и языки
- [docs/a11y-contrast-standard.md](docs/a11y-contrast-standard.md): контраст (WCAG 2.2 AA, APCA)
- Сборка: \`npm ci && npm run all\`

## Компоненты: правила

- [docs/components.md](docs/components.md): одна задача — один способ, свойства и слоты, доступность, уровни поверхностей, модель состояний, обводки
- [docs/component-contract.md](docs/component-contract.md): схема контракта (15 разделов)
- [docs/ds-manifest.json](docs/ds-manifest.json): манифест Figma Components — наборы, оси, свойства, токены, статусы
- [docs/migration/components.csv](docs/migration/components.csv): legacy DS Web / App → DS 2.0
- [docs/CHANGELOG-components.md](docs/CHANGELOG-components.md): история изменений компонентов

## Компоненты: beta — можно брать

${beta.map((s) => `- [${s.name}](${contract(s.name)}): ${cell(intent(s.name).what || intent(s.name).use)}`).join('\n')}

## Базы и служебные слои (в макетах напрямую не используются)

${bases.map((k) => `- [${k}](docs/components/${k}.md)`).join('\n')}

## Компоненты: draft — не брать

${byLevel(draft).join('\n')}
${other.length ? `- без статуса (${other.length}): ${other.map((s) => s.name).join(', ')}\n` : ''}
## Проверки

- \`npm run parity\`: манифест Figma ↔ токены, статусы, манифест кода
- \`npm run contracts -- --check\`: контракты ↔ манифест
- \`npm run agent-docs -- --check\`: этот файл, design.md и docs/api.md ↔ манифест
- \`npm run exceptions\`: значения без токена ↔ docs/exceptions.md
- \`npm run a11y\`: контраст семантических пар
- В Figma: \`scripts/figma/audit.plugin.js\`, \`variables-check.plugin.js\`, \`audit-parity.plugin.js\`

## Дополнительно

- [docs/dev-handoff-2026-11-12.md](docs/dev-handoff-2026-11-12.md): что изменилось для разработки
- [docs/claude-ds.md](docs/claude-ds.md): дизайн-система для Claude Design
- [docs/dsp.md](docs/dsp.md): Design System Platform
- [docs/how-to-change.md](docs/how-to-change.md): как вносить изменения
`;

const out = { 'llms.txt': llms, 'design.md': designMd, 'docs/api.md': apiMd };
let diff = 0;
for (const [f, text] of Object.entries(out)) {
  const cur = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
  if (cur === text) continue;
  diff++;
  if (check) console.log(`расходится: ${f}`); else { fs.writeFileSync(f, text); console.log(`записан: ${f}`); }
}
console.log(`agent-docs: beta ${beta.length}, draft ${draft.length}; ${check ? 'расходится' : 'обновлено'} ${diff}`);
if (check && diff) process.exit(1);
