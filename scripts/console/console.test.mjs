import assert from 'node:assert/strict';
import { test } from 'node:test';
import { levels } from './city.mjs';
import { normalize, streaks, topLanguages } from './data.mjs';
import { esc, slice } from './frame.mjs';
import { renderAll } from './render.mjs';

function rawFixture() {
  const days = [];
  const start = Date.UTC(2025, 10, 9); // a Sunday
  for (let i = 0; i < 371; i++) {
    const date = new Date(start + i * 86400000).toISOString().slice(0, 10);
    days.push({ date, contributionCount: i % 5 === 0 ? 0 : (i * 7) % 23 });
  }
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push({ contributionDays: days.slice(i, i + 7) });
  return {
    data: {
      user: {
        login: 'tiagovilasboas',
        createdAt: '2012-07-19T00:00:00Z',
        followers: { totalCount: 74 },
        pullRequests: { totalCount: 10 },
        merged: { totalCount: 8 },
        repositories: {
          totalCount: 2,
          nodes: [
            { stargazerCount: 5, forkCount: 1, languages: { edges: [{ size: 300, node: { name: 'Go' } }, { size: 100, node: { name: 'Shell' } }] } },
            { stargazerCount: 2, forkCount: 0, languages: { edges: [{ size: 100, node: { name: 'Go' } }] } },
          ],
        },
        contributionsCollection: { contributionCalendar: { totalContributions: 999, weeks } },
      },
    },
  };
}

test('streaks: current skips an empty today, longest counts the best run', () => {
  const cal = [['2026-01-01', 1], ['2026-01-02', 0], ['2026-01-03', 2], ['2026-01-04', 3], ['2026-01-05', 0]];
  assert.deepEqual(streaks(cal, '2026-01-05'), { current: 2, longest: 2 });
  assert.deepEqual(streaks(cal, '2026-01-04'), { current: 2, longest: 2 });
  assert.deepEqual(streaks([['2026-01-01', 0]], '2026-01-01'), { current: 0, longest: 0 });
});

test('topLanguages sums bytes across repos and returns percentages', () => {
  const langs = topLanguages(rawFixture().data.user.repositories.nodes);
  assert.equal(langs[0].name, 'Go');
  assert.equal(Math.round(langs[0].pct), 80);
  assert.equal(Math.round(langs.reduce((a, l) => a + l.pct, 0)), 100);
});

test('levels: quartiles over non-zero days, safe on an empty year', () => {
  assert.deepEqual(levels([0, 0, 0]), [1, 1, 1]);
  assert.deepEqual(levels([0, 1, 2, 3, 4]), [2, 3, 4]);
});

test('normalize maps the GraphQL response and rejects a missing user', () => {
  const d = normalize(rawFixture(), '2026-11-12');
  assert.equal(d.stars, 7);
  assert.equal(d.forks, 1);
  assert.equal(d.calendar.length, 371);
  assert.equal(d.createdAt, '2012-07-19');
  assert.throws(() => normalize({ data: { user: null } }, '2026-11-12'), /no user/);
});

test('every slice is valid-looking SVG, deterministic, and on the 40px grid', () => {
  const d = normalize(rawFixture(), '2026-11-12');
  const a = renderAll(d);
  const b = renderAll(d);
  assert.deepEqual(Object.keys(a), ['header.svg', 'stats.svg', 'city.svg', 'footer.svg']);
  for (const [name, svg] of Object.entries(a)) {
    assert.equal(svg, b[name], `${name} is not deterministic`);
    assert.match(svg, /^<svg [^>]*role="img"/, name);
    assert.ok(svg.trimEnd().endsWith('</svg>'), name);
    assert.equal(Number(svg.match(/height="(\d+)"/)[1]) % 40, 0, name);
    assert.doesNotMatch(svg, /undefined|NaN|\[object/, name);
    assert.match(svg, /<title id="t">[^<]+<\/title>/, name);
  }
});

test('the header only shows the public name', () => {
  const svg = renderAll(normalize(rawFixture(), '2026-11-12'))['header.svg'];
  assert.match(svg, /TIAGO VILAS BOAS/);
  assert.match(svg, /<title id="t">Tiago Vilas Boas<\/title>/);
});

test('esc and slice guard the frame', () => {
  assert.equal(esc(`<a href="x">&'`), '&lt;a href=&quot;x&quot;&gt;&amp;&#39;');
  assert.throws(() => slice(50, '', { title: 't', desc: 'd' }), /multiple of 40/);
});
