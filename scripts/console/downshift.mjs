// The Downshift hero: what it is, a before/after, the install line and the
// honest numbers. One slice, linked to the site; the details live there.
import { C, FR, FRAME, X, clip, dots, esc, grid, heading, slice, stagger, wrap } from './frame.mjs';

const RIGHT = FR - 36;
const WIDTH = RIGHT - X;

function terminal(y, ds) {
  const [cmd, out] = ds.demo;
  const h = 124;
  const b = 28; // window title bar
  const line = (yy, text, note, cls) => `<text x="${X + 16}" y="${yy}" class="${cls}" style="font-size:14px">${esc(text)}</text>`
    + `<text x="${RIGHT - 16}" y="${yy}" text-anchor="end" class="dim" style="font-size:13px">${esc(note)}</text>`;
  return [`<g class="ln" style="animation-delay:.5s">
<rect x="${X}" y="${y}" width="${WIDTH}" height="${h}" rx="6" fill="${C.bg}" stroke="${C.line}"/>
<path d="M${X} ${y + b}H${RIGHT}" stroke="${C.line}"/>
${dots(X + 16, y + 14)}
<text x="${X + WIDTH / 2}" y="${y + 18}" text-anchor="middle" class="dim" style="font-size:12px">downshift — zsh</text>
${line(y + b + 26, cmd[0], cmd[1], 'wh')}
${line(y + b + 48, out[0], out[1], 'gr')}
<line x1="${X + 16}" y1="${y + b + 62}" x2="${RIGHT - 16}" y2="${y + b + 62}" stroke="${C.line}"/>
<text x="${X + 16}" y="${y + b + 82}" style="font-size:13px"><tspan class="gr">$ </tspan><tspan class="bl">${esc(clip(ds.install, Math.floor((WIDTH - 32) / 7.8) - 2))}</tspan></text>
</g>`, y + h];
}

export function buildDownshiftHero(ds, live, counter) {
  const meta = live ? `★ ${live.stars}${live.release ? ` · ${live.release}` : ''}  ${counter}` : counter;
  const parts = [heading(44, 'building/downshift', meta)];
  let y = 92;
  const tag = wrap(ds.tagline, Math.floor(WIDTH / 9.6));
  parts.push(...tag.map((l, i) => `<g class="ln" style="animation-delay:.2s"><text x="${X}" y="${y + i * 24}" font-weight="700" class="wh" style="font-size:16px">${esc(l)}</text></g>`));
  y += tag.length * 24 + 4;
  const [term, ty] = terminal(y + 4, ds);
  parts.push(term);
  const honest = wrap(ds.honest, Math.floor(WIDTH / 7.8) - 3);
  const [notes, ny] = stagger(honest.map((l, i) => `<text x="${X}" y="{y}" class="dim" style="font-size:13px">${i === 0 ? '<tspan class="gr">// </tspan>' : '   '}${esc(l)}</text>`), ty + 30, 20, .8, 0.05);
  parts.push(notes);
  const h = grid(ny + 8);
  const desc = `Downshift: ${ds.tagline} ${ds.honest}`;
  return { file: 'downshift.svg', svg: slice(h, parts.join('\n'), { title: 'Downshift', desc }), alt: desc, href: ds.url, w: FRAME };
}

/** Layout rows: the hero alone; its link goes to the site. */
export function buildDownshift(ds, live, counter) {
  return [[buildDownshiftHero(ds, live, counter)]];
}
