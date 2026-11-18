// Link buttons in a 2x2 grid, one SVG per button so each can be its own link.
// Each button is half the frame (440px) and knows where it sits (ox), so it
// stays readable when the README scales down on a phone.
import { C, FRAME, clip, esc, slice } from './frame.mjs';

const H = 80;
const HALF = FRAME / 2;

function button(item, i, prefix) {
  const col = i % 2;
  const ox = col * HALF;
  const left = col === 0 ? 30 : 8;
  const right = col === 0 ? HALF - 8 : HALF - 30;
  const delay = (0.1 + i * 0.1).toFixed(2);
  const handle = clip(item.handle, Math.floor((right - left - 28 - 36) / 7.4));
  const body = `<g class="ln" style="animation-delay:${delay}s">
<rect x="${left}" y="14" width="${right - left}" height="52" rx="6" fill="${C.dark}" stroke="${C.line}"/>
<text x="${left + 14}" y="37" font-weight="700" class="wh"><tspan class="gr">[${i + 1}]</tspan> ${esc(item.label)}</text>
<text x="${left + 14}" y="56" class="dim" style="font-size:12px">${esc(handle)}</text>
<text x="${right - 14}" y="46" text-anchor="end" class="bl">↗</text>
</g>`;
  return {
    file: `${prefix}-${item.key}.svg`,
    svg: slice(H, body, { title: item.label, desc: `${item.label}: ${item.handle}`, w: HALF, ox }),
    href: item.url,
    alt: `${item.label}: ${item.handle}`,
    w: HALF,
  };
}

/** items: [{key, label, handle, url}]. Returns layout rows of two tiles each. */
export function buildButtons(items, prefix) {
  const tiles = items.map((it, i) => button(it, i, prefix));
  const rows = [];
  for (let i = 0; i < tiles.length; i += 2) rows.push(tiles.slice(i, i + 2));
  return rows;
}
