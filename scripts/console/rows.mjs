// List sections: a heading slice, then one full-width row per item so every
// row can be its own link. Used by impact, start-here, contributions, education.
import { C, FR, FRAME, X, clip, esc, grid, heading, slice, wrapN } from './frame.mjs';

const RIGHT = FR - 36;
const CH13 = 7.8; // monospace advance at 13px
const CH12 = 7.2;

const tile = (file, svg, alt, href) => ({ file, svg, alt, href, w: FRAME });

/** A short slice with only the section heading and its prompt line. */
export function sectionHead(key, name, counter, prompt) {
  const body = `${heading(44, name, counter)}
<g class="ln" style="animation-delay:.2s"><text x="${X}" y="96" class="dim"><tspan class="gr">$</tspan> ${esc(prompt)}</text></g>`;
  return tile(`${key}.svg`, slice(120, body, { title: name, desc: `Section: ${name}` }), name);
}

/** A row with an index, a bold title and up to two lines of detail. */
export function listRow(key, i, item) {
  const max = Math.floor((RIGHT - 80 - X - 56) / CH13);
  const sub = item.sub ? wrapN(item.sub, max, 2) : [];
  const content = 34 + sub.length * 19;
  const h = grid(content + 6);
  const t = Math.floor((h - content) / 2) + 14; // title baseline, content centred
  const idx = String(i + 1).padStart(2, '0');
  const lines = sub.map((s, j) => `<text x="${X + 56}" y="${t + 22 + j * 19}" class="fg" fill-opacity=".72" style="font-size:13px">${esc(s)}</text>`).join('');
  const body = `<g class="ln" style="animation-delay:${(0.1 + i * 0.08).toFixed(2)}s">
<text x="${X}" y="${t}" class="gr" style="font-size:13px">0x${idx}</text>
<text x="${X + 56}" y="${t}" font-weight="700" class="wh">${esc(clip(item.title, max))}</text>
${lines}
<text x="${RIGHT}" y="${t}" text-anchor="end" class="mid" style="font-size:12px">open ↗</text>
<line x1="${X}" y1="${h - 1}" x2="${RIGHT}" y2="${h - 1}" stroke="${C.green}" stroke-opacity=".14" stroke-dasharray="2 4"/>
</g>`;
  const alt = item.sub ? `${item.title}. ${item.sub}` : item.title;
  return tile(`${key}-${idx}.svg`, slice(h, body, { title: item.title, desc: alt }), alt, item.url);
}

/** A one-line row: "label: text", for long lists like contributions. */
export function compactRow(key, i, item) {
  const max = Math.floor((RIGHT - 40 - X - 20) / CH12);
  const text = clip(item.text, Math.max(max - item.label.length - 2, 10));
  const idx = String(i + 1).padStart(2, '0');
  const body = `<g class="ln" style="animation-delay:${(0.1 + i * 0.05).toFixed(2)}s">
<text x="${X}" y="25" style="font-size:12px"><tspan class="gr">▸ ${esc(item.label)}</tspan><tspan class="fg" fill-opacity=".75">  ${esc(text)}</tspan></text>
<text x="${RIGHT}" y="25" text-anchor="end" class="mid" style="font-size:12px">↗</text>
</g>`;
  const alt = `${item.label}: ${item.text}`;
  return tile(`${key}-${idx}.svg`, slice(40, body, { title: item.label, desc: alt }), alt, item.url);
}

/** Heading plus one row per item. Returns layout rows (one tile each). */
export function buildList(key, name, counter, prompt, items, row = listRow) {
  return [[sectionHead(key, name, counter, prompt)], ...items.map((it, i) => [row(key, i, it)])];
}
