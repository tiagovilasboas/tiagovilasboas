// A row of four link buttons, one SVG per button so each can be its own link.
// Each button is a quarter of the frame (220px) and knows where it sits (ox).
import { C, FRAME, esc, slice } from './frame.mjs';

const H = 80;

function button(item, i, n, prefix) {
  const w = FRAME / n;
  const ox = i * w;
  const left = i === 0 ? 30 : 8;
  const right = i === n - 1 ? w - 30 : w - 8;
  const delay = (0.1 + i * 0.1).toFixed(2);
  const body = `<g class="ln" style="animation-delay:${delay}s">
<rect x="${left}" y="14" width="${right - left}" height="52" fill="${C.dark}" fill-opacity=".4" stroke="${C.green}" stroke-opacity=".45"/>
<path d="M${left} 26V14H${left + 12}M${right - 12} 66H${right}V54" fill="none" stroke="${C.green}" stroke-width="2"/>
<text x="${left + 14}" y="37" font-weight="700" class="wh"><tspan class="gr">[${i + 1}]</tspan> ${esc(item.label)}</text>
<text x="${left + 14}" y="55" class="dim" style="font-size:11px">${esc(item.handle)}</text>
<text x="${right - 12}" y="37" text-anchor="end" class="gr">↗</text>
</g>`;
  return {
    file: `${prefix}-${item.key}.svg`,
    svg: slice(H, body, { title: item.label, desc: `${item.label}: ${item.handle}`, w, ox }),
    href: item.url,
    alt: `${item.label}: ${item.handle}`,
    w,
  };
}

/** items: [{key, label, handle, url}] (4). Returns one layout row of tiles. */
export function buildButtons(items, prefix) {
  return items.map((it, i) => button(it, i, items.length, prefix));
}
