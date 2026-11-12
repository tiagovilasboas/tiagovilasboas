// The console frame every slice shares: Matrix palette, side rails, grid, and
// the heading style. GitHub stacks the images, so every slice is a multiple of
// 40px tall and offsets its grid by its x position (ox) inside the 880px frame.

export const FRAME = 880;
export const M = 16; // transparent margin, room for the glow
export const FL = M;
export const FR = FRAME - M;
export const X = 52; // text left edge
export const CHAR = 9; // monospace advance at 15px, for wrapping

export const C = {
  green: '#00ff41',
  mid: '#00b82e',
  dim: '#3a8a4c',
  dark: '#0b3d17',
  line: '#0f5a24',
  bg: '#010803',
  text: '#a8f5b8',
  white: '#e4ffe9',
};

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

/** Greedy word wrap to at most `max` characters per line. */
export function wrap(text, max) {
  const lines = [];
  let cur = '';
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    if (cur && cur.length + 1 + word.length > max) { lines.push(cur); cur = word; } else cur = cur ? `${cur} ${word}` : word;
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Cuts text to `max` characters, ending with an ellipsis when it had to cut. */
export const clip = (text, max) => (text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`);

/** Wraps to at most `n` lines; the last one is clipped if text is left over. */
export function wrapN(text, max, n) {
  const lines = wrap(text, max);
  if (lines.length <= n) return lines;
  return [...lines.slice(0, n - 1), clip(lines.slice(n - 1).join(' '), max)];
}

/** Rounds content height up to the 40px grid. */
export const grid = (h) => Math.ceil(h / 40) * 40;

const BASE_CSS = `text{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace;font-size:15px}
.dim{fill:${C.dim}}.gr{fill:${C.green}}.mid{fill:${C.mid}}.fg{fill:${C.text}}.wh{fill:${C.white}}
@keyframes fadein{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:none}}
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
.ln{animation:fadein .35s ease-out both}
.cursor{animation:blink 1.05s step-end infinite}
.dot{animation:pulse 2s ease-in-out infinite}`;

const defs = (ox) => `<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse" x="${-ox % 40}"><path d="M40 0H0V40" fill="none" stroke="${C.green}" stroke-opacity=".045"/></pattern>
<pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" fill-opacity=".22"/></pattern>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="g" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="3.5"/></filter>`;

/**
 * Wraps a slice body in the shared frame.
 * w/ox: slice width and x offset inside the frame (half cards, link buttons).
 * top/bottom: draw the closing edges.
 */
export function slice(h, body, { title, desc, w = FRAME, ox = 0, top = false, bottom = false, css = '', defs: extra = '' }) {
  if (h % 40 !== 0) throw new Error(`slice height ${h} is not a multiple of 40`);
  const isLeft = ox === 0;
  const isRight = ox + w === FRAME;
  const x0 = isLeft ? FL : 0;
  const x1 = isRight ? w - M : w;
  const y0 = top ? M : 0;
  const y1 = bottom ? h - M : h;
  const v = [];
  if (isLeft) v.push(x0);
  if (isRight) v.push(x1);
  let rails = v.map((x) => `M${x} ${y0}V${y1}`).join('');
  if (top) rails += `M${x0} ${y0}H${x1}`;
  if (bottom) rails += `M${x0} ${y1}H${x1}`;
  const gy0 = top ? y0 : -40;
  const gy1 = bottom ? y1 : h + 40;
  const glow = v.map((x) => `M${x} ${gy0}V${gy1}`).join('') + (top ? `M${x0} ${y0}H${x1}` : '') + (bottom ? `M${x0} ${y1}H${x1}` : '');
  let corners = '';
  if (top && isLeft) corners += `<path d="M${x0 - 7} ${y0 + 18}V${y0 - 7}H${x0 + 18}"/>`;
  if (top && isRight) corners += `<path d="M${x1 - 18} ${y0 - 7}H${x1 + 7}V${y0 + 18}"/>`;
  if (bottom && isLeft) corners += `<path d="M${x0 - 7} ${y1 - 18}V${y1 + 7}H${x0 + 18}"/>`;
  if (bottom && isRight) corners += `<path d="M${x1 - 18} ${y1 + 7}H${x1 + 7}V${y1 - 18}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d">
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<style>
${BASE_CSS}
${css}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<defs>
${defs(ox)}
${extra}
</defs>
${glow ? `<path d="${glow}" fill="none" stroke="${C.green}" stroke-width="3" opacity=".4" filter="url(#glow)"/>` : ''}
<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="${C.bg}"/>
<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#grid)"/>
${body}
<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#scan)" pointer-events="none"/>
${rails ? `<path d="${rails}" fill="none" stroke="${C.green}" stroke-width="1.2"/>` : ''}
<g fill="none" stroke="${C.green}" stroke-width="2">${corners}</g>
</svg>
`;
}

/** Section heading: "~/name" with a glowing underline and a counter on the right. */
export function heading(y, name, counter, right = FR - 36) {
  return `<text x="${X}" y="${y}" font-weight="700" fill="${C.green}" filter="url(#g)" opacity=".6" style="font-size:20px">~/</text>
<text x="${X}" y="${y}" font-weight="700" style="font-size:20px"><tspan class="gr">~/</tspan><tspan class="wh">${esc(name)}</tspan></text>
<text x="${right}" y="${y}" text-anchor="end" letter-spacing="2" class="dim" style="font-size:12px">${esc(counter)}</text>
<line x1="${X}" y1="${y + 14}" x2="${right}" y2="${y + 14}" stroke="${C.green}" stroke-opacity=".25"/>
<line x1="${X}" y1="${y + 14}" x2="${X + 120}" y2="${y + 14}" stroke="${C.green}" stroke-width="2"/>
<line x1="${X}" y1="${y + 14}" x2="${X + 120}" y2="${y + 14}" stroke="${C.green}" stroke-width="3" filter="url(#g)" opacity=".7"/>`;
}

/** rows: markup with {y}, or null for a small spacer. Returns [markup, nextY]. */
export function stagger(rows, y0, lh, delay0 = 0.15, step = 0.12) {
  const out = [];
  let y = y0;
  let i = 0;
  for (const r of rows) {
    if (r === null) { y += 14; continue; }
    i += 1;
    out.push(`<g class="ln" style="animation-delay:${(delay0 + i * step).toFixed(2)}s">${r.replaceAll('{y}', String(y))}</g>`);
    y += lh;
  }
  return [out.join('\n'), y];
}

/** Tiny deterministic PRNG so the same seed always draws the same picture. */
export function rng(seed) {
  let h = 2166136261;
  for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  let s = h || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}
