// Static check: build/css against package.json "browserslist" (support floor). Fails on any feature outside it.
import postcss from 'postcss'; import doiuse from 'doiuse';
import { readFileSync, readdirSync } from 'node:fs';
const browsers = JSON.parse(readFileSync('package.json', 'utf8')).browserslist;
const hits = [];
for (const f of readdirSync('build/css').filter((x) => x.endsWith('.css')))
  await postcss([doiuse({ browsers, ignore: ['css-variables-not-defined'], onFeatureUsage: (u) => hits.push(`${f}: ${u.message}`) })])
    .process(readFileSync(`build/css/${f}`, 'utf8'), { from: f });
hits.forEach((h) => console.log('✗ ' + h));
console.log(hits.length ? `${hits.length} compat issues for ${browsers.join(', ')}` : `build/css ok for ${browsers.join(', ')}`);
process.exit(hits.length ? 1 : 0);
