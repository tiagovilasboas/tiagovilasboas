// The Downshift hero: what it is, a before/after, the install line, what it
// does, where it runs and the honest numbers. One slice, linked to the site.
import { C, FR, FRAME, X, clip, esc, grid, heading, slice, stagger, wrap } from './frame.mjs';
import { buildButtons } from './buttons.mjs';

const RIGHT = FR - 36;
const WIDTH = RIGHT - X;
const STATUS = { done: C.green, ok: C.mid, beta: '#c8e05a', exp: C.dim };

function terminal(y, ds) {
  const [cmd, out] = ds.demo;
  const h = 96;
  const line = (yy, text, note, cls) => `<text x="${X + 16}" y="${yy}" class="${cls}" style="font-size:13px">${esc(text)}</text>`
    + `<text x="${RIGHT - 16}" y="${yy}" text-anchor="end" class="dim" style="font-size:12px">${esc(note)}</text>`;
  return [`<g class="ln" style="animation-delay:.5s">
<rect x="${X}" y="${y}" width="${WIDTH}" height="${h}" fill="#000" fill-opacity=".45" stroke="${C.green}" stroke-opacity=".3"/>
${line(y + 26, cmd[0], cmd[1], 'fg')}
${line(y + 48, out[0], out[1], 'gr')}
<line x1="${X + 16}" y1="${y + 62}" x2="${RIGHT - 16}" y2="${y + 62}" stroke="${C.green}" stroke-opacity=".15"/>
<text x="${X + 16}" y="${y + 82}" style="font-size:12px"><tspan class="gr">$ </tspan><tspan class="wh">${esc(clip(ds.install, 98))}</tspan></text>
</g>`, y + h];
}

function chips(y, harnesses) {
  let x = X;
  const out = harnesses.map(([name, st]) => {
    const w = (name.length + st.length + 3) * 7.2 + 20;
    const chip = `<rect x="${x}" y="${y}" width="${w}" height="24" fill="${C.dark}" fill-opacity=".35" stroke="${STATUS[st] ?? C.dim}" stroke-opacity=".6"/>`
      + `<text x="${x + 10}" y="${y + 16}" style="font-size:12px"><tspan class="wh">${esc(name)}</tspan><tspan fill="${STATUS[st] ?? C.dim}"> ${esc(st)}</tspan></text>`;
    x += w + 8;
    return chip;
  });
  return [`<g class="ln" style="animation-delay:1.1s">${out.join('')}</g>`, y + 24];
}

export function buildDownshiftHero(ds, live, counter) {
  const meta = live ? `★ ${live.stars}${live.release ? ` · ${live.release}` : ''}  ${counter}` : counter;
  const parts = [heading(44, 'building/downshift', meta)];
  let y = 92;
  const tag = wrap(ds.tagline, Math.floor(WIDTH / 9.6));
  parts.push(...tag.map((l, i) => `<g class="ln" style="animation-delay:.2s"><text x="${X}" y="${y + i * 24}" font-weight="700" class="wh" style="font-size:16px">${esc(l)}</text></g>`));
  y += tag.length * 24 + 4;
  const about = wrap(ds.about, Math.floor(WIDTH / 7.8));
  const [aboutRows, ay] = stagger(about.map((l) => `<text x="${X}" y="{y}" class="fg" fill-opacity=".72" style="font-size:13px">${esc(l)}</text>`), y, 19, 0.3, 0.05);
  parts.push(aboutRows);
  const [term, ty] = terminal(ay + 4, ds);
  parts.push(term);
  const [bullets, by] = stagger(ds.bullets.map(([k, v]) => `<text x="${X}" y="{y}" style="font-size:13px"><tspan class="gr">▸ ${esc(k.padEnd(11))}</tspan><tspan class="fg">${esc(v)}</tspan></text>`), ty + 32, 22, 0.7, 0.08);
  parts.push(bullets);
  const [chipRow, cy] = chips(by + 2, ds.harnesses);
  parts.push(chipRow);
  const honest = wrap(ds.honest, Math.floor((WIDTH - 24) / 7.4));
  const [notes, ny] = stagger(honest.map((l, i) => `<text x="${X}" y="{y}" class="dim" style="font-size:12px">${i === 0 ? '<tspan class="gr">// </tspan>' : '   '}${esc(l)}</text>`), cy + 34, 18, 1.2, 0.05);
  parts.push(notes);
  const h = grid(ny + 8);
  const desc = `Downshift: ${ds.tagline} ${ds.about}`;
  return { file: 'downshift.svg', svg: slice(h, parts.join('\n'), { title: 'Downshift', desc }), alt: desc, href: ds.url, w: FRAME };
}

/** Layout rows: the hero, then the call-to-action buttons. */
export function buildDownshift(ds, live, counter) {
  return [[buildDownshiftHero(ds, live, counter)], buildButtons(ds.ctas, 'downshift')];
}
