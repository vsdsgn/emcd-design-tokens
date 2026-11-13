// Правила аудита набора по манифесту (DESC, MATRIX, AXES, PROPS, MINMAX, RAW, SERVICE, BOARD).
// Общие для scripts/draft-audit.mjs (отчёт) и scripts/contract-build.mjs (раздел 14 draft-контрактов).
// Вход: набор манифеста + boards и boardMissing его страницы. Выход: [[код, текст], …].
const DESC_REQUIRED = ['Когда использовать:', 'Правила:', 'A11y:'];
const INTERACTIVE = new Set(['Hover', 'Pressed', 'Focus', 'Focused']);
const BOOL = [['Off', 'On'], ['False', 'True'], ['No', 'Yes']];
// Базы: у надстройки с раскрытым экземпляром базы в каждом варианте служебные слои живут в базе (SERVICE не проверяем).
// Input — член семьи _Field base: Select и Date range field стоят на нём.
const BASES = ['_Field base', '_Selection control', '_List row', 'Input'];
// Не фокусируемые наборы: Hover — подсказка для указателя, с клавиатуры цель — родитель (Chart card, область прокрутки).
const NO_FOCUS = new Set(['Chart axis label', 'Chart plot', 'Scrollbar']);
// Оси выбора Off / On законны: это состояние выбора, а не включение слоя (то же в audit-parity.plugin.js).
const BOOL_AXIS_OK = new Set(['Status', 'Selected']);
// Булевы оси, которые меняют состав слоёв или раскладку и потому остаются осью (тот же список — BOOL_OK в audit-parity.plugin.js).
const BOOL_OK = { 'Card': ['Border'], 'Coin': ['Network'], 'Divider': ['Label'], 'Overlay': ['Blur'], 'Accordion': ['Open'], 'Avatar group': ['More'], 'Input amount': ['Filled'], 'Nav item': ['Collapsed'], 'Date range panel': ['Presets'], 'Sidebar': ['Collapsed'] };
// Сырые значения, которые не считаются: ширина / высота образца на корне и размеры зоны нажатия (их сверяет audit.plugin.js).
const RAW_SAMPLE = /^\(root\):[wh]=|^hit area[^:]*:[wh]=/;
// Сырые значения из реестра docs/exceptions.md (набор → шаблон значения). Строка реестра снята — убрать и отсюда.
const RAW_OK = {
  'Coin': /^network:r=/, 'Avatar group': /^\(root\):gap=-/, 'Coin stack': /^\(root\):gap=-/,
  'Chart card': /^track:[wh]=220$/,
  'Scrollbar': /^thumb:h=48$|^thumb:w=48$/, // длина образца бегунка (реестр: ширина / высота образца)
  // временные до токенов прозрачности
  'Spinner': /^track:o=0\.2$/, 'Code cell': /^digit:o=0\.5$/, 'Chart crosshair': /^halo:o=0\.24$/,
  'Tooltip tour': /^step:o=0\.72$/, 'Chart plot': /^(bar:o=0\.35|halo:o=0\.24|area:o=0\.45)$/,
};
// min / max числом, для которых токен size/* заведён и ждёт Publish Foundations (временные строки реестра).
const MINMAX_OK = {}; // с 2026-11-13 (после Publish 28 size/*) пуст
const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

export function findings(s) {
  const f = [];
  // DESC: первая строка — Status, обязательные разделы описания
  const miss = DESC_REQUIRED.filter((h) => !s.descHeads.includes(h));
  if (!s.statusFirstLine) miss.unshift('Status: первой строкой');
  if (miss.length) f.push(['DESC', `нет: ${miss.join(', ')}`]);
  // MATRIX: вариантов меньше, чем полная матрица осей, и в описании нет строки «Матрица:» с правилом, каких сочетаний нет
  if (s.variants < s.full && !s.descHeads.includes('Матрица:')) f.push(['MATRIX', `${s.variants} из ${s.full}`]);
  // AXES: булева ось вместо свойства; Left / Right вместо Start / End
  for (const [axis, values] of Object.entries(s.axes || {})) {
    if (BOOL.some((b) => sameSet(values, b)) && !BOOL_AXIS_OK.has(axis) && !(BOOL_OK[s.name.replace(/ · пилот$/, '')] || []).includes(axis)) f.push(['AXES', `\`${axis}\` — булева ось (${values.join(' | ')})`]);
    if (values.includes('Left') || values.includes('Right')) f.push(['AXES', `\`${axis}\` — Left / Right вместо Start / End`]);
  }
  // PROPS: свойство не привязано ни в одном варианте. Частичную привязку (слой есть, свойство не привязано) ловит
  // audit-parity.plugin.js: по манифесту не видно, есть ли слой в варианте (Skeleton, другая раскладка).
  const loose = (s.props || []).filter((p) => p.bound === 0);
  if (loose.length) f.push(['PROPS', loose.map((p) => `${p.name} ${p.bound} из ${s.variants}`).join('; ')]);
  // MINMAX: min / max числом
  const base = s.name.replace(/ · пилот$/, '');
  const raw = (s.minmax || []).filter((x) => x.endsWith('RAW')).map((x) => x.replace(' RAW', '')).filter((x) => MINMAX_OK[base] !== x);
  if (raw.length) f.push(['MINMAX', raw.join(', ')]);
  // RAW: значения без переменной
  const rawKinds = (s.raw || []).filter((x) => !RAW_SAMPLE.test(x) && !(RAW_OK[base] && RAW_OK[base].test(x)));
  if (rawKinds.length) f.push(['RAW', rawKinds.slice(0, 4).map((x) => `\`${x}\``).join(', ') + (rawKinds.length > 4 ? ` и ещё ${rawKinds.length - 4}` : '')]);
  // SERVICE: у интерактивного набора — кольцо фокуса, зона нажатия, безопасное поле
  const interactive = Object.values(s.axes || {}).some((v) => v.some((x) => INTERACTIVE.has(x)));
  const onBase = BASES.some((b) => (s.nested || {})[b] === s.variants);
  if (interactive && !onBase && !NO_FOCUS.has(s.name.replace(/ · пилот$/, ''))) {
    const l = s.layers || {};
    const no = [];
    if (!l.ring) no.push('кольца фокуса');
    if (!l.hitWeb && !l.hitApp && !l.hit) no.push('зоны нажатия');
    if (!l.safe) no.push('безопасного поля');
    if (no.length) f.push(['SERVICE', `нет ${no.join(', ')}`]);
  }
  // BOARD: борда v3 и её разделы
  if (!s.boards.some((b) => b.v3)) f.push(['BOARD', 'нет борды v3']);
  // Разделы, которых нет у компонента по смыслу, перечислены на самой борде в блоке «— · Не собрано в этой версии».
  else if (s.boardMissing.length && !s.boards.some((b) => b.v3 && (b.sections || []).some((x) => /Не собрано/.test(x)))) f.push(['BOARD', `нет разделов ${s.boardMissing.join(', ')}`]);
  return f;
}
