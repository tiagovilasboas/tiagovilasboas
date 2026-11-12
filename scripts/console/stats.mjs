// Stats slice: a grid of tiles plus a top-languages bar.
import { C, FR, X, esc, heading, slice } from './frame.mjs';

const H = 360;
const SHADES = [C.green, '#00c836', '#00942a', '#006b1f', '#0b3d17'];

export const fmt = (n) => Number(n).toLocaleString('en-US');

function tile(x, y, w, label, value, sub, delay) {
  return `<g class="ln" style="animation-delay:${delay.toFixed(2)}s">
<rect x="${x}" y="${y}" width="${w}" height="76" fill="${C.dark}" fill-opacity=".35" stroke="${C.green}" stroke-opacity=".35"/>
<path d="M${x} ${y + 12}V${y}H${x + 12}" fill="none" stroke="${C.green}" stroke-width="2"/>
<text x="${x + 14}" y="${y + 22}" letter-spacing="2" class="dim" style="font-size:11px">${esc(label)}</text>
<text x="${x + 14}" y="${y + 52}" font-weight="700" class="wh" style="font-size:24px">${esc(value)}</text>
<text x="${x + 14}" y="${y + 68}" class="mid" style="font-size:11px">${esc(sub)}</text>
</g>`;
}

export function buildStats(d) {
  const since = new Date(`${d.createdAt}`);
  const tiles = [
    ['CONTRIBUTIONS', fmt(d.contributions), 'last 365 days'],
    ['PULL REQUESTS', fmt(d.prs.total), `${fmt(d.prs.merged)} merged`],
    ['STARS', fmt(d.stars), `across ${fmt(d.repos)} public repos`],
    ['FOLLOWERS', fmt(d.followers), 'on github'],
    ['CURRENT STREAK', `${d.streak.current}d`, `longest ${d.streak.longest}d`],
    ['ACTIVE DAYS', fmt(d.activeDays), 'last 365 days'],
    ['FORKS', fmt(d.forks), 'of my repos'],
    ['MEMBER SINCE', String(since.getUTCFullYear()), since.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })],
  ];
  const w = 182;
  const gap = 12;
  const cells = tiles.map(([l, v, s], i) => tile(X + (i % 4) * (w + gap), 92 + Math.floor(i / 4) * 92, w, l, v, s, 0.15 + i * 0.08));

  const barW = FR - 36 - X;
  let bx = X;
  const segs = [];
  const legend = [];
  d.languages.forEach((l, i) => {
    const sw = (barW * l.pct) / 100;
    segs.push(`<rect x="${bx.toFixed(1)}" y="300" width="${Math.max(sw - 2, 1).toFixed(1)}" height="10" fill="${SHADES[i % SHADES.length]}"/>`);
    bx += sw;
    legend.push(`<tspan fill="${SHADES[i % SHADES.length]}">■</tspan> <tspan class="fg">${esc(l.name)}</tspan> <tspan class="dim">${l.pct.toFixed(0)}%</tspan>   `);
  });
  const langs = `<g class="ln" style="animation-delay:.9s">
<text x="${X}" y="284" class="dim" style="font-size:12px"><tspan class="gr">$</tspan> top-languages --by bytes</text>
${segs.join('')}
<text x="${X}" y="334" style="font-size:12px">${legend.join('')}</text>
</g>`;

  const body = `${heading(44, 'stats', '// 01')}\n${cells.join('\n')}\n${langs}`;
  const desc = `Stats: ${fmt(d.contributions)} contributions in the last year, ${fmt(d.prs.total)} pull requests (${fmt(d.prs.merged)} merged), `
    + `${fmt(d.stars)} stars, ${fmt(d.followers)} followers, current streak ${d.streak.current} days, longest ${d.streak.longest}. `
    + `Top languages: ${d.languages.map((l) => l.name).join(', ')}.`;
  return slice(H, body, { title: 'Stats', desc });
}
