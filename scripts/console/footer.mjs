// Closing slice: a small framed box at the end of the profile.
import { C, X, esc, slice } from './frame.mjs';

export function buildFooter(login) {
  const body = `<text x="${X}" y="52" class="dim"><tspan class="gr">$</tspan> exit</text>
<text x="${X}" y="76" class="dim">connection to <tspan class="gr">${esc(login)}</tspan> closed. <tspan fill="${C.dim}">// there is no spoon</tspan></text>`;
  return slice(120, body, { title: 'End of profile', desc: 'Connection closed.', top: true, bottom: true });
}
