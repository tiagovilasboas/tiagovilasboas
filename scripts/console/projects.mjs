// Project cards: two per row, each half of the frame and its own link.
import { C, FRAME, esc, slice, wrapN } from './frame.mjs';
import { sectionHead } from './rows.mjs';

const H = 120;
const HALF = FRAME / 2;
const LANG = { Go: '#00ADD8', JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3776AB', Shell: '#89E051' };

function card(p, i, stars) {
  const ox = (i % 2) * HALF;
  const left = ox === 0 ? 30 : 8;
  const right = ox === 0 ? HALF - 8 : HALF - 30;
  const max = Math.floor((right - left - 32) / 7.8);
  const desc = wrapN(p.desc, max, 2);
  const lang = LANG[p.lang] ?? C.green;
  const star = stars > 0 ? `★ ${stars}` : '';
  const body = `<g class="ln" style="animation-delay:${(0.1 + i * 0.08).toFixed(2)}s">
<rect x="${left}" y="10" width="${right - left}" height="100" fill="${C.dark}" fill-opacity=".3" stroke="${C.green}" stroke-opacity=".35"/>
<path d="M${left} 22V10H${left + 12}" fill="none" stroke="${C.green}" stroke-width="2"/>
<text x="${left + 16}" y="36" font-weight="700" class="wh">${esc(p.name)}</text>
<text x="${right - 16}" y="36" text-anchor="end" class="mid" style="font-size:12px">${esc(star)}</text>
${desc.map((l, j) => `<text x="${left + 16}" y="${60 + j * 18}" class="fg" fill-opacity=".72" style="font-size:13px">${esc(l)}</text>`).join('')}
<circle cx="${left + 21}" cy="97" r="4" fill="${lang}"/>
<text x="${left + 31}" y="101" class="dim" style="font-size:11px">${esc(p.lang)}</text>
</g>`;
  const alt = `${p.name} (${p.lang}): ${p.desc}`;
  return {
    file: `project-${p.name}.svg`,
    svg: slice(H, body, { title: p.name, desc: alt, w: HALF, ox }),
    alt,
    href: `https://github.com/tiagovilasboas/${p.name}`,
    w: HALF,
  };
}

/** Returns layout rows: the heading, then pairs of cards. */
export function buildProjects(projects, repoStars = {}, counter = '') {
  const cards = projects.map((p, i) => card(p, i, repoStars[p.name]));
  const rows = [[sectionHead('projects', 'projects', counter, 'ls ~/repos --pinned')]];
  for (let i = 0; i < cards.length; i += 2) rows.push(cards.slice(i, i + 2));
  return rows;
}
