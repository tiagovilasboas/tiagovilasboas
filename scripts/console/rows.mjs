// List sections: a heading slice, then one full-width row per item so every
// row can be its own link. Used by impact and contributions.
import { C, FR, FRAME, X, clip, esc, grid, heading, slice, wrap, wrapN } from './frame.mjs';

const RIGHT = FR - 36;
const CH14 = 8.4; // monospace advance at 14px (detail text)
const CH13 = 7.8; // at 13px (compact rows)
const CH15 = 9; // at 15px (titles)

const tile = (file, svg, alt, href) => ({ file, svg, alt, href, w: FRAME });

/** A short slice with only the section heading and its prompt line. */
export function sectionHead(key, name, counter, prompt) {
  const body = `${heading(44, name, counter)}
<g class="ln" style="animation-delay:.2s"><text x="${X}" y="96" class="dim"><tspan class="gr">$</tspan> ${esc(prompt)}</text></g>`;
  return tile(`${key}.svg`, slice(120, body, { title: name, desc: `Section: ${name}` }), name);
}

/** A row with an index, a bold title and up to two lines of detail. */
export function listRow(key, i, item) {
  const avail = RIGHT - 80 - X - 56;
  const max = Math.floor(avail / CH14);
  const sub = item.sub ? wrapN(item.sub, max, 2) : [];
  const content = 34 + sub.length * 21;
  const h = grid(content + 2);
  const t = Math.floor((h - content) / 2) + 14; // title baseline, content centred
  const idx = String(i + 1).padStart(2, '0');
  const lines = sub.map((s, j) => `<text x="${X + 56}" y="${t + 23 + j * 21}" class="fg" fill-opacity=".85" style="font-size:14px">${esc(s)}</text>`).join('');
  const body = `<g class="ln" style="animation-delay:${(0.1 + i * 0.08).toFixed(2)}s">
<text x="${X}" y="${t}" class="gr" style="font-size:13px">0x${idx}</text>
<text x="${X + 56}" y="${t}" font-weight="700" class="wh">${esc(clip(item.title, Math.floor(avail / CH15)))}</text>
${lines}
<text x="${RIGHT}" y="${t}" text-anchor="end" class="bl" style="font-size:13px">open ↗</text>
<line x1="${X}" y1="${h - 1}" x2="${RIGHT}" y2="${h - 1}" stroke="${C.line}" stroke-dasharray="2 4"/>
</g>`;
  const alt = item.sub ? `${item.title}. ${item.sub}` : item.title;
  return tile(`${key}-${idx}.svg`, slice(h, body, { title: item.title, desc: alt }), alt, item.url);
}

/** A compact row: "▸ label  text", wrapping to a second line when the text is long. */
export function compactRow(key, i, item) {
  const max = Math.floor((RIGHT - 40 - X - 20) / CH13);
  const first = Math.max(max - item.label.length - 4, 10);
  const [head, ...rest] = wrap(item.text, first);
  const lines = rest.length ? [head, clip(rest.join(' '), max - 4)] : [head];
  const h = lines.length === 1 ? 40 : 80;
  const y0 = lines.length === 1 ? 25 : 35;
  const idx = String(i + 1).padStart(2, '0');
  const body = `<g class="ln" style="animation-delay:${(0.1 + i * 0.05).toFixed(2)}s">
<text x="${X}" y="${y0}" style="font-size:13px"><tspan class="gr">▸ </tspan><tspan class="bl">${esc(item.label)}</tspan><tspan class="fg" fill-opacity=".85">  ${esc(lines[0])}</tspan></text>
${lines[1] ? `<text x="${X + 4 * CH13}" y="${y0 + 21}" class="fg" fill-opacity=".85" style="font-size:13px">${esc(lines[1])}</text>` : ''}
<text x="${RIGHT}" y="${y0}" text-anchor="end" class="bl" style="font-size:13px">↗</text>
</g>`;
  const alt = `${item.label}: ${item.text}`;
  return tile(`${key}-${idx}.svg`, slice(h, body, { title: item.label, desc: alt }), alt, item.url);
}

/** Heading plus one row per item. Returns layout rows (one tile each). */
export function buildList(key, name, counter, prompt, items, row = listRow) {
  return [[sectionHead(key, name, counter, prompt)], ...items.map((it, i) => [row(key, i, it)])];
}
