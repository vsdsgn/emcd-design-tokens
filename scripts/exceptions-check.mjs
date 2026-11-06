// docs/exceptions.md: every registry row has value, where, reason and a review date (YYYY-MM-DD); expired rows fail the check.
import { readFileSync } from 'node:fs';
const md = readFileSync('docs/exceptions.md', 'utf8');
const start = md.indexOf('## Реестр');
const end = md.indexOf('\n## ', start + 1);
const rows = md.slice(start, end < 0 ? undefined : end).split('\n').filter((l) => l.startsWith('|')).slice(2);
const today = new Date().toISOString().slice(0, 10);
const bad = [];
for (const r of rows) {
  const c = r.split('|').slice(1, -1).map((x) => x.trim());
  if (c.length !== 4 || c.some((x) => !x)) bad.push(`not 4 filled columns: ${r.slice(0, 60)}`);
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(c[3])) bad.push(`bad review date «${c[3]}»: ${c[0].slice(0, 50)}`);
  else if (c[3] < today) bad.push(`review date ${c[3]} passed: ${c[0].slice(0, 50)}`);
}
bad.forEach((b) => console.log('✗ ' + b));
console.log(bad.length ? `${bad.length} problem(s) in docs/exceptions.md` : `exceptions registry ok (${rows.length} rows)`);
process.exit(bad.length ? 1 : 0);
