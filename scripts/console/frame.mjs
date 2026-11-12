// The console frame every slice shares: Matrix palette, side rails, grid, and
// the heading style. Each slice is W wide and a multiple of 40px tall so the
// grid lines up when GitHub stacks the images.

export const W = 880;
export const M = 16; // transparent margin, room for the glow
export const FL = M;
export const FR = W - M;
export const X = 52; // text left edge

export const C = {
  green: '#00ff41',
  mid: '#00b82e',
  dim: '#2f7a3f',
  dark: '#0b3d17',
  bg: '#010803',
  text: '#a8f5b8',
  white: '#e4ffe9',
};

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

export const up40 = (v) => Math.ceil(v / 40) * 40;

const BASE_CSS = `text{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace;font-size:15px}
.dim{fill:${C.dim}}.gr{fill:${C.green}}.mid{fill:${C.mid}}.fg{fill:${C.text}}.wh{fill:${C.white}}
@keyframes fadein{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:none}}
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
.ln{animation:fadein .35s ease-out both}
.cursor{animation:blink 1.05s step-end infinite}
.dot{animation:pulse 2s ease-in-out infinite}`;

const DEFS = `<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${C.green}" stroke-opacity=".05"/></pattern>
<pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" fill-opacity=".35"/></pattern>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="g" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>`;

/** Wraps a slice body in the shared frame. top/bottom draw the closing edges. */
export function slice(h, body, { title, desc, top = false, bottom = false, css = '', defs = '' }) {
  if (h % 40 !== 0) throw new Error(`slice height ${h} is not a multiple of 40`);
  const y0 = top ? M : 0;
  const y1 = bottom ? h - M : h;
  let rails = `M${FL} ${y0}V${y1}M${FR} ${y0}V${y1}`;
  if (top) rails += `M${FL} ${y0}H${FR}`;
  if (bottom) rails += `M${FL} ${y1}H${FR}`;
  const gy0 = top ? y0 : -40;
  const gy1 = bottom ? y1 : h + 40;
  const glow = `M${FL} ${gy0}V${gy1}M${FR} ${gy0}V${gy1}` + (top ? `M${FL} ${y0}H${FR}` : '') + (bottom ? `M${FL} ${y1}H${FR}` : '');
  let corners = '';
  if (top) corners += `<path d="M${FL - 7} ${y0 + 18}V${y0 - 7}H${FL + 18}"/><path d="M${FR - 18} ${y0 - 7}H${FR + 7}V${y0 + 18}"/>`;
  if (bottom) corners += `<path d="M${FL - 7} ${y1 - 18}V${y1 + 7}H${FL + 18}"/><path d="M${FR - 18} ${y1 + 7}H${FR + 7}V${y1 - 18}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}" role="img" aria-labelledby="t d">
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<style>
${BASE_CSS}
${css}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<defs>
${DEFS}
${defs}
</defs>
<path d="${glow}" fill="none" stroke="${C.green}" stroke-width="3" opacity=".5" filter="url(#glow)"/>
<rect x="${FL}" y="${y0}" width="${FR - FL}" height="${y1 - y0}" fill="${C.bg}"/>
<rect x="${FL}" y="${y0}" width="${FR - FL}" height="${y1 - y0}" fill="url(#grid)"/>
${body}
<rect x="${FL}" y="${y0}" width="${FR - FL}" height="${y1 - y0}" fill="url(#scan)" pointer-events="none"/>
<path d="${rails}" fill="none" stroke="${C.green}" stroke-width="1.2"/>
<g fill="none" stroke="${C.green}" stroke-width="2">${corners}</g>
</svg>
`;
}

/** Section heading: "~/name" with a glowing underline and a counter on the right. */
export function heading(y, name, counter) {
  return `<text x="${X}" y="${y}" font-weight="700" fill="${C.green}" filter="url(#g)" opacity=".8" style="font-size:20px">~/</text>
<text x="${X}" y="${y}" font-weight="700" style="font-size:20px"><tspan class="gr">~/</tspan><tspan class="wh">${esc(name)}</tspan></text>
<text x="${FR - 36}" y="${y}" text-anchor="end" letter-spacing="2" fill="${C.dim}" style="font-size:12px">${esc(counter)}</text>
<line x1="${X}" y1="${y + 14}" x2="${FR - 36}" y2="${y + 14}" stroke="${C.green}" stroke-opacity=".35"/>
<line x1="${X}" y1="${y + 14}" x2="${X + 120}" y2="${y + 14}" stroke="${C.green}" stroke-width="2"/>
<line x1="${X}" y1="${y + 14}" x2="${X + 120}" y2="${y + 14}" stroke="${C.green}" stroke-width="3" filter="url(#g)"/>`;
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
