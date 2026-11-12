#!/usr/bin/env node
// Renders the console SVGs into assets/console/ from a GitHub GraphQL response.
//
//   gh api graphql -f query="$(node scripts/console/render.mjs --print-query)" -F login=tiagovilasboas \
//     | node scripts/console/render.mjs
//
// Reads the response on stdin, writes scripts/console/data/profile.json and the SVGs.
// With --data <file> it skips stdin and renders from a saved profile.json.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCity } from './city.mjs';
import { QUERY, normalize } from './data.mjs';
import { buildFooter } from './footer.mjs';
import { buildHeader } from './header.mjs';
import { buildStats } from './stats.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');

export function renderAll(d) {
  return {
    'header.svg': buildHeader(),
    'stats.svg': buildStats(d),
    'city.svg': buildCity(d.calendar, d.updated),
    'footer.svg': buildFooter(d.login),
  };
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
  const out = join(ROOT, 'assets', 'console');
  mkdirSync(out, { recursive: true });
  const files = Object.entries(renderAll(d));
  for (const [name, svg] of files) writeFileSync(join(out, name), svg);
  console.log(`rendered ${files.length} SVGs for ${d.login} (${d.contributions} contributions)`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
