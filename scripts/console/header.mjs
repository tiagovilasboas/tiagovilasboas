// Top slice: title bar, digital rain, and the "whoami" boot sequence.
import { C, FL, FR, M, X, esc, rng, slice, stagger } from './frame.mjs';

const H = 360;
const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789Z:.=*+<>';
const COL = 20; // column pitch, px
const LEN = 14; // glyphs per stream
const LH = 18; // glyph line height

export const PROFILE = {
  name: 'TIAGO VILAS BOAS',
  bar: ['SYS://MONTANHA // NODE:TIAGO', 'ONLINE · FOLLOW THE WHITE RABBIT'],
  lines: [
    'staff engineer · agentic ai · appsec · observability',
    'in tech since 2006 · leading ai enablement across squads',
    'building downshift: cut your coding agent\'s token use',
  ],
};

/** One falling stream per column; the head glyph is bright, the tail fades. */
export function rain(seed, { x0, x1, y0, y1 }) {
  const rnd = rng(seed);
  const cols = [];
  for (let x = x0; x <= x1; x += COL) {
    if (rnd() < 0.25) continue;
    const dur = 4 + rnd() * 6;
    const delay = -rnd() * dur;
    const right = x > 560; // keep the text side quiet
    const op = right ? 0.07 + rnd() * 0.05 : 0.025 + rnd() * 0.02; // barely there: texture, not foreground
    const spans = [];
    for (let i = 0; i < LEN; i++) {
      const g = GLYPHS[Math.floor(rnd() * GLYPHS.length)];
      const head = i === LEN - 1;
      const a = head ? 0.9 : ((i + 1) / LEN) * 0.7;
      spans.push(`<tspan x="${x}" dy="${LH}" fill="${head ? C.text : C.green}" fill-opacity="${a.toFixed(2)}">${esc(g)}</tspan>`);
    }
    cols.push(`<text class="rn" opacity="${op.toFixed(2)}" style="animation-duration:${dur.toFixed(2)}s;animation-delay:${delay.toFixed(2)}s" y="${y0 - LEN * LH}">${spans.join('')}</text>`);
  }
  const travel = y1 - y0 + LEN * LH;
  const css = `@keyframes fall{from{transform:translateY(0)}to{transform:translateY(${travel}px)}}
.rn{animation:fall linear infinite;font-size:15px}`;
  return { markup: `<g clip-path="url(#rainclip)">${cols.join('\n')}</g>`, css };
}

export function buildHeader(p = PROFILE) {
  const top = M;
  const bar = `<rect x="${FL}" y="${top}" width="${FR - FL}" height="34" fill="${C.dark}" fill-opacity=".55"/>
<line x1="${FL}" y1="${top + 34}" x2="${FR}" y2="${top + 34}" stroke="${C.green}" stroke-opacity=".5"/>
<circle class="dot" cx="${X - 14}" cy="${top + 17}" r="4" fill="${C.green}"/>
<text x="${X}" y="${top + 22}" letter-spacing="2" class="mid" style="font-size:12px">${esc(p.bar[0])}</text>
<text x="${FR - 36}" y="${top + 22}" text-anchor="end" letter-spacing="2" class="mid" style="font-size:12px">${esc(p.bar[1])}</text>`;

  const r = rain(p.name, { x0: FL + 14, x1: FR - 14, y0: top + 34, y1: H });
  const [rows] = stagger([
    `<text x="${X}" y="{y}" class="fg"><tspan class="gr">$</tspan> whoami</text>`,
    null,
    `<text x="${X}" y="{y}" font-weight="800" fill="${C.green}" filter="url(#g)" opacity=".45" style="font-size:44px" letter-spacing="1">${esc(p.name)}</text><text x="${X}" y="{y}" font-weight="800" class="wh" style="font-size:44px" letter-spacing="1">${esc(p.name)}</text>`,
    null,
    ...p.lines.map((l) => `<text x="${X}" y="{y}" class="fg"><tspan class="gr">&gt;&gt;</tspan> ${esc(l)}</text>`),
    null,
    `<text x="${X}" y="{y}" class="fg"><tspan class="gr">$</tspan> <tspan class="cursor gr">█</tspan></text>`,
  ], 100, 32);

  const defs = `<clipPath id="rainclip"><rect x="${FL}" y="${top + 35}" width="${FR - FL}" height="${H - top - 35}"/></clipPath>`;
  const desc = `${p.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}: ${p.lines.join('. ')}.`;
  return slice(H, `${r.markup}\n${bar}\n${rows}`, { title: 'Tiago Vilas Boas', desc, top: true, css: r.css, defs });
}
