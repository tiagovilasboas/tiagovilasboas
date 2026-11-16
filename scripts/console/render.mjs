#!/usr/bin/env node
// Renders the console SVGs into assets/console/ and the README from a GitHub GraphQL response.
//
//   gh api graphql -f query="$(node scripts/console/render.mjs --print-query)" -F login=tiagovilasboas \
//     | node scripts/console/render.mjs
//
// Reads the response on stdin, writes scripts/console/data/profile.json, the SVGs and README.md.
// With --data <file> it skips stdin and renders from a saved profile.json.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildButtons } from './buttons.mjs';
import { buildCity } from './city.mjs';
import { DOWNSHIFT, IMPACT, LINKS, OSS as OSS_PICK } from './content.mjs';
import { parseContributions } from './contributions.mjs';
import { QUERY, normalize } from './data.mjs';
import { buildDownshift } from './downshift.mjs';
import { buildFooter } from './footer.mjs';
import { buildHeader } from './header.mjs';
import { buildReadme } from './readme.mjs';
import { buildList, compactRow } from './rows.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const OSS = join(ROOT, 'scripts', 'oss-block', 'contributions.md');

const full = (file, svg, alt) => [{ file, svg, alt, w: 880 }];

/** The featured contributions that exist, topped up with the newest, then the "all" row. */
export function pickContributions(all, pick = OSS_PICK) {
  const has = (c, name) => c.label.startsWith(`${name} #`);
  const featured = pick.featured.map((n) => all.find((c) => has(c, n))).filter(Boolean);
  const rest = all.filter((c) => !featured.includes(c));
  return [...featured, ...rest].slice(0, pick.max).concat(pick.all);
}

/** The whole console, top to bottom, as layout rows of tiles. */
export function layout(d, contributions) {
  return [
    full('header.svg', buildHeader(), 'Tiago Vilas Boas. Staff engineer: agentic AI, AppSec, observability. In tech since 2006, leading AI enablement across squads. Building Downshift.'),
    ...buildButtons(LINKS, 'link'),
    ...buildDownshift(DOWNSHIFT, d.downshift, '// 01'),
    ...buildList('impact', 'impact', '// 02', 'cat impact.log  # articles in Portuguese', IMPACT),
    full('city.svg', buildCity(d), 'Contribution city: contributions, merged pull requests, stars and current streak, over an isometric skyline with one building per day of the last year.'),
    ...buildList('oss', 'contributions', '// 04', 'gh pr list --author @me --state merged  # small, tested fixes to projects I use', pickContributions(contributions), compactRow),
    full('footer.svg', buildFooter(d.login), 'Connection closed.'),
  ];
}

/** Flattens the layout into {file: svg} plus the README text. */
export function renderAll(d, contributions = []) {
  const rows = layout(d, contributions);
  const files = Object.fromEntries(rows.flat().map((t) => [t.file, t.svg]));
  return { files, readme: buildReadme(rows) };
}

function main(argv) {
  if (argv.includes('--print-query')) { process.stdout.write(QUERY); return; }
  const at = argv.indexOf('--data');
  const dataFile = join(HERE, 'data', 'profile.json');
  let d;
  if (at >= 0) {
    d = JSON.parse(readFileSync(argv[at + 1], 'utf8'));
  } else {
    d = normalize(JSON.parse(readFileSync(0, 'utf8')), new Date().toISOString().slice(0, 10));
    mkdirSync(dirname(dataFile), { recursive: true });
    writeFileSync(dataFile, `${JSON.stringify(d, null, 1)}\n`);
  }
  const { files, readme } = renderAll(d, parseContributions(readFileSync(OSS, 'utf8')));
  const out = join(ROOT, 'assets', 'console');
  mkdirSync(out, { recursive: true });
  for (const f of readdirSync(out)) if (f.endsWith('.svg') && !(f in files)) rmSync(join(out, f));
  for (const [name, svg] of Object.entries(files)) writeFileSync(join(out, name), svg);
  writeFileSync(join(ROOT, 'README.md'), readme);
  console.log(`rendered ${Object.keys(files).length} SVGs and README.md for ${d.login} (${d.contributions} contributions)`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
