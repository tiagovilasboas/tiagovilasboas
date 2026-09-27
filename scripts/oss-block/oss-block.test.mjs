// Run: node --test scripts/oss-block/oss-block.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { lineDiff, pickMerged, render, replaceBlock, START, END } from './oss-block.mjs'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const FIXTURE = here('./fixtures/search-merged.json')
const EXPECTED = readFileSync(here('./fixtures/expected-block.md'), 'utf8').replace(/\n$/, '')
const BLURBS = JSON.parse(readFileSync(here('./oss-blurbs.json'), 'utf8'))

const item = (repo, number, merged_at, title = 't') => ({ repository_url: `https://api.github.com/repos/${repo}`, number, html_url: `https://github.com/${repo}/pull/${number}`, title, pull_request: { merged_at } })
const keys = (entries) => entries.map((e) => `${e.repo}#${e.number}`)

test('pickMerged keeps the latest merged PR per external repo, newest first, limited', () => {
  const got = pickMerged([
    item('a/x', 1, '2026-09-01T00:00:00Z'),
    item('a/x', 2, '2026-09-10T00:00:00Z'),
    item('me/own', 3, '2026-09-20T00:00:00Z'),
    item('b/y', 4, '2026-09-05T00:00:00Z'),
    item('c/z', 5, null),
    item('d/w', 6, '2026-09-11T00:00:00Z'),
  ], 'me', 2)
  assert.deepEqual(keys(got), ['d/w#6', 'a/x#2'])
})

test('order is deterministic: same merge time is broken by URL, whatever the API order', () => {
  const items = [item('b/y', 1, '2026-09-10T00:00:00Z'), item('a/x', 9, '2026-09-10T00:00:00Z'), item('c/z', 2, '2026-09-12T00:00:00Z')]
  const expected = ['c/z#2', 'a/x#9', 'b/y#1']
  assert.deepEqual(keys(pickMerged(items, 'me', 5)), expected)
  assert.deepEqual(keys(pickMerged([...items].reverse(), 'me', 5)), expected)
})

test('render uses curated blurbs, falls back to the escaped PR title, no &nbsp; after the last avatar', () => {
  const merged = pickMerged([item('a/x', 2, '2026-09-10T00:00:00Z', 'fix: <b> "q"'), item('o/p', 3, '2026-09-11T00:00:00Z')], 'me', 5)
  const out = render(merged, { 'o/p#3': { short: 'curto', long: 'longo.' } })
  assert.match(out, /title="o\/p#3: curto"/)
  assert.match(out, /- \[o\/p#3\]\(https:\/\/github.com\/o\/p\/pull\/3\): longo\./)
  assert.match(out, /title="a\/x#2: fix: &lt;b&gt; &quot;q&quot;"/)
  const avatarLines = out.split('\n').filter((l) => l.startsWith('<a '))
  assert.equal(avatarLines.length, 2)
  assert.ok(avatarLines[0].endsWith('</a>&nbsp;'))
  assert.ok(avatarLines[1].endsWith('</a>'))
})

test('render never emits an "in review" line, only merged PRs', () => {
  const merged = pickMerged([item('a/x', 2, '2026-09-10T00:00:00Z'), item('b/y', 3, null)], 'me', 5)
  const out = render(merged, {})
  assert.doesNotMatch(out, /Em revisão|revis[aã]o|in review/i)
  assert.doesNotMatch(out, /b\/y/)
  assert.equal(out.split('\n').at(-1), '- [a/x#2](https://github.com/a/x/pull/2): t')
})

test('replaceBlock only rewrites between markers and is idempotent', () => {
  const readme = `head\n${START}\nold\n${END}\ntail\n`
  const once = replaceBlock(readme, 'new')
  assert.equal(once, `head\n${START}\nnew\n${END}\ntail\n`)
  assert.equal(replaceBlock(once, 'new'), once)
  assert.throws(() => replaceBlock('no markers', 'x'))
})

test('fixture renders exactly the versioned expected block (no network)', () => {
  const { items } = JSON.parse(readFileSync(FIXTURE, 'utf8'))
  assert.equal(render(pickMerged(items, 'tiagovilasboas', 5), BLURBS), EXPECTED)
})

test('every rendered fixture entry has a curated blurb', () => {
  const { items } = JSON.parse(readFileSync(FIXTURE, 'utf8'))
  for (const e of pickMerged(items, 'tiagovilasboas', 5)) {
    assert.ok(BLURBS[`${e.repo}#${e.number}`], `missing blurb for ${e.repo}#${e.number}`)
  }
})

const cli = (readme, ...flags) => spawnSync(process.execPath, [here('./update.mjs'), readme, ...flags], {
  encoding: 'utf8',
  env: { PATH: process.env.PATH, OSS_USER: 'tiagovilasboas', OSS_FIXTURE: FIXTURE },
})

test('CLI (fixture): dry run prints the diff and never writes; write is idempotent', () => {
  const dir = mkdtempSync(join(tmpdir(), 'oss-block-'))
  const readme = join(dir, 'README.md')
  const stale = `# hi\n\n${START}\nold\n${END}\n\n## tail\n`
  writeFileSync(readme, stale)

  const dry = cli(readme, '--dry-run')
  assert.equal(dry.status, 0, dry.stderr)
  assert.match(dry.stdout, /dry run, not written/)
  assert.match(dry.stdout, /^-old$/m)
  assert.equal(readFileSync(readme, 'utf8'), stale)

  const write = cli(readme)
  assert.equal(write.status, 0, write.stderr)
  assert.match(write.stdout, /updated /)
  const once = readFileSync(readme, 'utf8')
  assert.equal(once, `# hi\n\n${START}\n${EXPECTED}\n${END}\n\n## tail\n`)

  const again = cli(readme)
  assert.equal(again.status, 0, again.stderr)
  assert.match(again.stdout, /no change/)
  assert.equal(readFileSync(readme, 'utf8'), once)
})

test('lineDiff shows a pure reordering as moved lines only', () => {
  const d = lineDiff('a\nb\nc\nd', 'b\na\nc\nd')
  const removed = d.split('\n').filter((l) => l.startsWith('-')).map((l) => l.slice(1))
  const added = d.split('\n').filter((l) => l.startsWith('+')).map((l) => l.slice(1))
  assert.equal(removed.length, 1)
  assert.deepEqual(added, removed)
})
