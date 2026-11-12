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
import { DOWNSHIFT, EDUCATION, IMPACT, LINKS, PROJECTS, START_HERE } from './content.mjs';
import { parseContributions } from './contributions.mjs';
import { QUERY, normalize } from './data.mjs';
import { buildDownshift } from './downshift.mjs';
import { buildFooter } from './footer.mjs';
import { buildHeader } from './header.mjs';
import { buildProjects } from './projects.mjs';
import { buildReadme } from './readme.mjs';
import { buildList, compactRow } from './rows.mjs';
import { buildStats } from './stats.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const OSS = join(ROOT, 'scripts', 'oss-block', 'contributions.md');

const full = (file, svg, alt) => [{ file, svg, alt, w: 880 }];

/** The whole console, top to bottom, as layout rows of tiles. */
export function layout(d, contributions) {
  return [
    full('header.svg', buildHeader(), 'Tiago Vilas Boas. Staff engineer: agentic AI, AppSec, observability. In tech since 2006, leading AI enablement across squads. Building Downshift.'),
    buildButtons(LINKS, 'link'),
    ...buildDownshift(DOWNSHIFT, d.downshift, '// 01'),
    full('stats.svg', buildStats(d), 'GitHub stats: contributions in the last year, pull requests, stars, followers, streaks and top languages.'),
    full('city.svg', buildCity(d.calendar, d.updated), 'Contribution city: an isometric skyline with one building per day of the last year, taller and brighter for busier days.'),
    ...buildList('impact', 'impact', '// 04', 'cat impact.log  # articles in Portuguese', IMPACT),
    ...buildProjects(PROJECTS, d.repoStars, '// 05'),
    ...buildList('start', 'start-here', '// 06', 'open --first', START_HERE),
    ...buildList('oss', 'contributions', '// 07', 'gh pr list --author @me --state merged  # small, tested fixes to projects I use', contributions, compactRow),
    ...buildList('edu', 'education', '// 08', 'ls ~/certs', EDUCATION),
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
