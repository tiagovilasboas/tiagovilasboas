// Contribution city: one isometric building per day of the last year,
// taller and brighter for busier days, under a sky of digital rain.
import { C, FR, X, esc, heading, rng, slice } from './frame.mjs';
import { rain } from './header.mjs';

const H = 680;
const TW = 25; // iso tile width
const TH = 12.5; // iso tile height
const OX = 152.5; // grid origin inside the slice
const OY = 262;
const HMAX = 118; // tallest building, px
export const ROOFS = ['#0b4d1c', '#00862a', '#00c836', C.green];
const WIN_ON = '#7dff9e';
const WIN_SIDE = '#3fdc6a';
const WIN_OFF = '#04170a';

const p = (x, y) => `${x.toFixed(1)},${y.toFixed(1)}`;

/** GitHub-style quartile thresholds over the non-zero days. */
export function levels(counts) {
  const nz = counts.filter((n) => n > 0).sort((a, b) => a - b);
  if (nz.length === 0) return [1, 1, 1];
  const q = (f) => nz[Math.min(nz.length - 1, Math.floor(nz.length * f))];
  return [q(0.25), q(0.5), q(0.75)];
}

function windows(rnd, faces, h) {
  const on = [];
  const side = [];
  const off = [];
  const flick = [];
  for (const [face, a, b] of faces) {
    for (let r = 0; r < Math.floor((h - 6) / 7); r++) {
      const v0 = 5 + r * 7;
      for (const u0 of [0.18, 0.58]) {
        const lit = rnd() < 0.55;
        if (!lit && rnd() < 0.5) continue;
        const pts = [[u0, v0], [u0 + 0.26, v0], [u0 + 0.26, v0 + 3.2], [u0, v0 + 3.2]]
          .map(([u, v]) => p(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - v));
        const seg = `M${pts.join('L')}Z`;
        if (!lit) off.push(seg);
        else if (rnd() < 0.03) flick.push([seg, face]);
        else (face === 'l' ? on : side).push(seg);
      }
    }
  }
  const out = [];
  if (off.length) out.push(`<path d="${off.join('')}" fill="${WIN_OFF}"/>`);
  if (on.length) out.push(`<path d="${on.join('')}" fill="${WIN_ON}"/>`);
  if (side.length) out.push(`<path d="${side.join('')}" fill="${WIN_SIDE}"/>`);
  flick.forEach(([seg, face], i) => out.push(`<path class="f${i % 3}" d="${seg}" fill="${face === 'l' ? WIN_ON : WIN_SIDE}"/>`));
  return out.join('');
}

export function buildCity(calendar, updated) {
  const days = calendar.map(([d, n]) => [new Date(`${d}T00:00:00Z`), n]);
  const counts = days.map(([, n]) => n);
  const total = counts.reduce((a, b) => a + b, 0);
  const peak = Math.max(1, ...counts);
  const lv = levels(counts);
  const rnd = rng(`${updated}-${total}`);
  const start = days.length ? days[0][0] : new Date();

  const cells = days.map(([d, n]) => {
    const idx = Math.round((d - start) / 86400000) + start.getUTCDay();
    return [Math.floor(idx / 7), d.getUTCDay(), n];
  });
  cells.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]) || a[0] - b[0]); // back to front

  const shapes = [];
  for (const [w, dow, n] of cells) {
    const cx = OX + ((w - dow) * TW) / 2;
    const cy = OY + ((w + dow) * TH) / 2;
    const L = [cx - TW / 2, cy];
    const R = [cx + TW / 2, cy];
    const T = [cx, cy - TH / 2];
    const B = [cx, cy + TH / 2];
    if (n === 0) {
      shapes.push(`<path d="M${p(...T)}L${p(...R)}L${p(...B)}L${p(...L)}Z" fill="#06180b" stroke="${C.bg}" stroke-width=".6"/>`);
      continue;
    }
    const h = 8 + (HMAX - 8) * Math.sqrt(n / peak);
    const level = lv.filter((t) => n > t).length;
    const [Tu, Ru, Bu, Lu] = [T, R, B, L].map(([x, y]) => [x, y - h]);
    shapes.push(`<path d="M${p(...L)}L${p(...B)}L${p(...Bu)}L${p(...Lu)}Z" fill="#0a2a12"/>`
      + `<path d="M${p(...B)}L${p(...R)}L${p(...Ru)}L${p(...Bu)}Z" fill="#061c0c"/>`
      + `<path d="M${p(...Tu)}L${p(...Ru)}L${p(...Bu)}L${p(...Lu)}Z" fill="${ROOFS[level]}"/>`
      + windows(rnd, [['l', L, B], ['r', B, R]], h));
  }

  const busiest = days.reduce((m, cur) => (cur[1] > m[1] ? cur : m), [null, 0]);
  const active = counts.filter((n) => n > 0).length;
  const fmtDay = (d) => d.toLocaleString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const info = [
    `<tspan class="gr" font-weight="700">${total.toLocaleString('en-US')}</tspan> contributions · last 365 days`,
    busiest[1] ? `busiest day <tspan class="fg">${fmtDay(busiest[0])}</tspan> · ${busiest[1]}` : '',
    `${active} active days`,
  ].filter(Boolean).map((t, i) => `<text x="${FR - 36}" y="${300 + i * 20}" text-anchor="end" class="dim" style="font-size:12px">${t}</text>`).join('');

  const sky = rain(`sky-${updated}`, { x0: 500, x1: FR - 30, y0: 110, y1: 250 });
  const legend = ['#06180b', ...ROOFS].map((c, i) => `<rect x="${X + 52 + i * 16}" y="642" width="11" height="11" fill="${c}"/>`).join('');
  const body = `${heading(44, 'contribution-city', '// 02')}
<g class="ln" style="animation-delay:.15s"><text x="${X}" y="96" class="dim"><tspan class="gr">$</tspan> render-city --last 365d <tspan fill="${C.dim}"># one building per day</tspan></text></g>
${sky.markup}
${info}
${shapes.join('')}
<text x="${X}" y="652" class="dim" style="font-size:11px">quiet</text>${legend}<text x="${X + 52 + 5 * 16 + 6}" y="652" class="dim" style="font-size:11px">skyscraper</text>`;
  const css = `${sky.css}
@keyframes fl{0%,40%,100%{opacity:1}45%,60%{opacity:.1}}
.f0{animation:fl 5s infinite}.f1{animation:fl 7s infinite 2s}.f2{animation:fl 9s infinite 4s}`;
  const defs = '<clipPath id="rainclip"><rect x="480" y="110" width="360" height="150"/></clipPath>';
  const desc = `Contribution city: an isometric skyline with one building per day of the last year, taller and brighter for busier days. ${total.toLocaleString('en-US')} contributions`
    + (busiest[1] ? `, busiest day ${fmtDay(busiest[0])} with ${busiest[1]}` : '') + '.';
  return slice(H, body, { title: "Contribution city", desc, bottom: true, css, defs });
}
