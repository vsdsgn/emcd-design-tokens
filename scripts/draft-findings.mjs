// Правила аудита набора по манифесту (DESC, MATRIX, AXES, PROPS, MINMAX, RAW, SERVICE, BOARD).
// Общие для scripts/draft-audit.mjs (отчёт) и scripts/contract-build.mjs (раздел 14 draft-контрактов).
// Вход: набор манифеста + boards и boardMissing его страницы. Выход: [[код, текст], …].
const DESC_REQUIRED = ['Когда использовать:', 'Правила:', 'A11y:'];
const INTERACTIVE = new Set(['Hover', 'Pressed', 'Focus', 'Focused']);
const BOOL = [['Off', 'On'], ['False', 'True'], ['No', 'Yes']];
const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

export function findings(s) {
  const f = [];
  // DESC: первая строка — Status, обязательные разделы описания
  const miss = DESC_REQUIRED.filter((h) => !s.descHeads.includes(h));
  if (!s.statusFirstLine) miss.unshift('Status: первой строкой');
  if (miss.length) f.push(['DESC', `нет: ${miss.join(', ')}`]);
  // MATRIX: вариантов меньше, чем полная матрица осей
  if (s.variants < s.full) f.push(['MATRIX', `${s.variants} из ${s.full}`]);
  // AXES: булева ось вместо свойства; Left / Right вместо Start / End
  for (const [axis, values] of Object.entries(s.axes || {})) {
    if (BOOL.some((b) => sameSet(values, b))) f.push(['AXES', `\`${axis}\` — булева ось (${values.join(' | ')})`]);
    if (values.includes('Left') || values.includes('Right')) f.push(['AXES', `\`${axis}\` — Left / Right вместо Start / End`]);
  }
  // PROPS: свойство привязано не во всех вариантах
  const loose = (s.props || []).filter((p) => p.bound < s.variants);
  if (loose.length) f.push(['PROPS', loose.map((p) => `${p.name} ${p.bound} из ${s.variants}`).join('; ')]);
  // MINMAX: min / max числом
  const raw = (s.minmax || []).filter((x) => x.endsWith('RAW')).map((x) => x.replace(' RAW', ''));
  if (raw.length) f.push(['MINMAX', raw.join(', ')]);
  // RAW: значения без переменной
  if (s.rawCount) f.push(['RAW', `${s.rawCount} (напр. ${(s.raw || []).slice(0, 2).map((x) => `\`${x}\``).join(', ')})`]);
  // SERVICE: у интерактивного набора — кольцо фокуса, зона нажатия, безопасное поле
  const interactive = Object.values(s.axes || {}).some((v) => v.some((x) => INTERACTIVE.has(x)));
  if (interactive) {
    const l = s.layers || {};
    const no = [];
    if (!l.ring) no.push('кольца фокуса');
    if (!l.hitWeb && !l.hitApp && !l.hit) no.push('зоны нажатия');
    if (!l.safe) no.push('безопасного поля');
    if (no.length) f.push(['SERVICE', `нет ${no.join(', ')}`]);
  }
  // BOARD: борда v3 и её разделы
  if (!s.boards.some((b) => b.v3)) f.push(['BOARD', 'нет борды v3']);
  else if (s.boardMissing.length) f.push(['BOARD', `нет разделов ${s.boardMissing.join(', ')}`]);
  return f;
}
