// Run: node --test scripts/oss-block/oss-block.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { lineDiff, MAX_ITEMS, parseAllowlist, parseOverrides, pickMerged, render, replaceBlock, START, END } from './oss-block.mjs'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const FIXTURE = here('./fixtures/search-merged.json')
const EXPECTED = readFileSync(here('./fixtures/expected-block.md'), 'utf8').replace(/\n$/, '')
const ALLOWLIST = parseAllowlist(JSON.parse(readFileSync(here('./oss-allowlist.json'), 'utf8')))
const OVERRIDES = parseOverrides(JSON.parse(readFileSync(here('./oss-overrides.json'), 'utf8')))

const item = (repo, number, merged_at, title = 't') => ({ repository_url: `https://api.github.com/repos/${repo}`, number, html_url: `https://github.com/${repo}/pull/${number}`, title, pull_request: { merged_at } })
const keys = (entries) => entries.map((e) => `${e.repo}#${e.number}`)

test('render is one bullet per merged PR, described by its title', () => {
  const out = render(pickMerged([item('a/x', 2, '2026-09-10T00:00:00Z', 'fix: one'), item('b/y', 3, '2026-09-11T00:00:00Z', 'feat: two')], 'me', ['a/x', 'b/y']))
  assert.equal(out, '- [x #2](https://github.com/a/x/pull/2): fix: one\n- [y #3](https://github.com/b/y/pull/3): feat: two')
  assert.doesNotMatch(out, /Em revisão|revis[aã]o|in review/i)
})

test('block is a single list: one PR per line, each with its title or its override, overrides listed once', () => {
  const { items } = JSON.parse(readFileSync(FIXTURE, 'utf8'))
  const merged = pickMerged(items, 'tiagovilasboas', ALLOWLIST)
  const lines = render(merged, OVERRIDES).split('\n')
  assert.equal(lines.length, merged.length + OVERRIDES.length)
  for (const line of lines) assert.match(line, /^- \[[^\]]+ #\d+\]\(https:\/\/github\.com\/[^)\s]+\/pull\/\d+\): \S/)
  assert.equal(new Set(lines.map((l) => l.slice(l.indexOf('](') + 2, l.indexOf('):')))).size, lines.length)
  merged.forEach((e, i) => assert.ok(lines[i].endsWith(`): ${e.title}`), lines[i]))
  OVERRIDES.forEach((o, i) => assert.equal(lines[merged.length + i], `- [${o.text}](${o.url}): ${o.description}`))
})

test('an override on a picked PR replaces its text and description in place, without a second bullet', () => {
  const merged = pickMerged([item('a/x', 1, '2026-09-10T00:00:00Z', 'fix: raw title')], 'me', ['a/x'])
  const overrides = parseOverrides({ prs: [{ url: 'https://github.com/A/X/pull/1', text: 'X #1', description: 'curated <b>' }, { url: 'https://github.com/c/z/pull/9', text: 'Z #9', description: 'pinned' }] })
  assert.equal(render(merged, overrides), '- [X #1](https://github.com/a/x/pull/1): curated &lt;b&gt;\n- [Z #9](https://github.com/c/z/pull/9): pinned')
  assert.throws(() => parseOverrides({ prs: [{ url: 'https://evil/pull/1', text: 't', description: 'd' }] }), /prs/)
  assert.throws(() => parseOverrides({ prs: [{ url: 'https://github.com/a/b/pull/1', text: ' ', description: 'd' }] }), /prs/)
  assert.throws(() => parseOverrides({ prs: [{ url: 'https://github.com/a/b/pull/1', text: 't' }] }), /prs/)
  const dup = { url: 'https://github.com/a/b/pull/1', text: 't', description: 'd' }
  assert.throws(() => parseOverrides({ prs: [dup, { ...dup, url: 'https://github.com/A/B/pull/1' }] }), /duplicate/)
})

test('only merged PRs: a curated repo whose PRs are all unmerged is omitted', () => {
  const got = pickMerged([item('a/x', 1, null), item('b/y', 2, '2026-09-10T00:00:00Z')], 'me', ['a/x', 'b/y'])
  assert.deepEqual(keys(got), ['b/y#2'])
})

test('repos outside the allowlist are ignored, even if merged and newer; own repos never count', () => {
  const got = pickMerged([
    item('z/uncurated', 9, '2026-09-30T00:00:00Z'),
    item('me/own', 8, '2026-09-29T00:00:00Z'),
    item('a/x', 1, '2026-09-01T00:00:00Z'),
  ], 'me', ['a/x', 'me/own'])
  assert.deepEqual(keys(got), ['a/x#1'])
})

test('one PR per repo: the most recently merged; order follows the allowlist, case-insensitive', () => {
  const got = pickMerged([
    item('a/x', 1, '2026-09-01T00:00:00Z'),
    item('A/X', 2, '2026-09-10T00:00:00Z'),
    item('b/y', 3, '2026-09-20T00:00:00Z'),
  ], 'me', ['b/y', 'a/x'])
  assert.deepEqual(keys(got), ['b/y#3', 'A/X#2'])
})

test('ceiling: at most 7 items; OSS_LIMIT can lower it but never raise it', () => {
  const eight = ['a/a', 'b/b', 'c/c', 'd/d', 'e/e', 'f/f', 'g/g', 'h/h']
  assert.throws(() => parseAllowlist({ repos: eight }), /at most 7/)
  assert.throws(() => parseAllowlist({ repos: ['a/a', 'A/a'] }), /duplicate/)
  assert.throws(() => parseAllowlist({ repos: ['a/a', { repo: 'A/A', label: 'x' }] }), /duplicate/)
  assert.throws(() => parseAllowlist({ repos: ['not-a-repo'] }), /owner\/name/)
  const items = eight.map((r, i) => item(r, i + 1, `2026-09-1${i}T00:00:00Z`))
  assert.equal(MAX_ITEMS, 7)
  assert.equal(pickMerged(items, 'me', eight).length, 7)
  assert.equal(pickMerged(items, 'me', eight, 99).length, 7)
  assert.equal(pickMerged(items, 'me', eight, 2).length, 2)
  assert.ok(ALLOWLIST.length <= MAX_ITEMS)
})

test('optional curated label replaces the repo name in the link text and is escaped', () => {
  assert.deepEqual(parseAllowlist({ repos: ['a/x', { repo: 'b/y', label: 'why' }] }), [{ repo: 'a/x' }, { repo: 'b/y', label: 'why' }])
  assert.throws(() => parseAllowlist({ repos: [{ repo: 'b/y', label: '  ' }] }), /owner\/name/)
  assert.throws(() => parseAllowlist({ repos: [{ repo: 'b/y', label: 7 }] }), /owner\/name/)
  assert.throws(() => parseAllowlist({ repos: [{ label: 'no repo' }] }), /owner\/name/)
  const merged = pickMerged([item('a/x', 1, '2026-09-10T00:00:00Z'), item('b/y', 2, '2026-09-11T00:00:00Z')], 'me', ['a/x', { repo: 'b/y', label: '<img src=x onerror=alert(1)> "q" & [x]' }])
  assert.equal(render(merged), '- [x #1](https://github.com/a/x/pull/1): t\n- [&lt;img src=x onerror=alert(1)&gt; &quot;q&quot; &amp; \\[x\\] #2](https://github.com/b/y/pull/2): t')
})

test('live allowlist: lefthook first, goose second, at the ceiling, plain repo names; dropped repos are not curated', () => {
  assert.deepEqual(ALLOWLIST.map((c) => c.repo), ['evilmartians/lefthook', 'aaif-goose/goose', 'NandhaKishorM/laya', 'openai/openai-agents-python', 'web-infra-dev/rspack', 'securego/gosec', 'nanostores/nanostores'])
  assert.equal(ALLOWLIST.length, MAX_ITEMS)
  assert.ok(ALLOWLIST.every((c) => c.label === undefined))
  const { items } = JSON.parse(readFileSync(FIXTURE, 'utf8'))
  for (const dropped of ['alecthomas/chroma', 'pipefy/ai-toolkit', 'punkpeye/fastmcp']) {
    assert.ok(items.some((i) => i.html_url.includes(dropped) && i.pull_request.merged_at), `fixture keeps a merged ${dropped} PR`)
  }
  const out = render(pickMerged(items, 'tiagovilasboas', ALLOWLIST))
  assert.doesNotMatch(out, /chroma|pipefy|fastmcp/)
  assert.match(out, /^- \[lefthook #1565\]\(https:\/\/github\.com\/evilmartians\/lefthook\/pull\/1565\): .+\n- \[goose #\d+\]\([^)]+\): .+\n- \[laya #849\]\(https:\/\/github\.com\/NandhaKishorM\/laya\/pull\/849\): /)
})

test('repo names and URLs with special characters are escaped and cannot break the link', () => {
  const evil = { repository_url: 'https://api.github.com/repos/o/<img src=x onerror=alert(1)>"&[x]', number: 1, html_url: 'https://github.com/o/r/pull/1) [pwn](https://evil', title: 't', pull_request: { merged_at: '2026-09-10T00:00:00Z' } }
  const out = render(pickMerged([evil], 'me', ['o/<img src=x onerror=alert(1)>"&[x]']))
  assert.equal(out, '- [&lt;img src=x onerror=alert(1)&gt;&quot;&amp;\\[x\\] #1](https://github.com/o/r/pull/1%29%20[pwn]%28https://evil): t')
  assert.doesNotMatch(out, /<img/)
  assert.throws(() => render([{ name: 'x', url: 'javascript:alert(1)' }]), /unexpected PR URL/)
})

test('README: the block under "## Contribuições" is the only PR list; no hand-written PR bullets outside it', () => {
  const readme = readFileSync(here('../../README.md'), 'utf8')
  assert.ok(readme.includes(`## Contribuições\n\nContribuo com correções pequenas e testadas em projetos que eu uso. Alguns exemplos:\n\n${START}\n- [`), 'header/intro drifted')
  const body = readme.slice(readme.indexOf(START) + START.length + 1, readme.indexOf(END) - 1)
  assert.ok(body.split('\n').every((l) => l.startsWith('- [')))
  const outside = readme.slice(0, readme.indexOf(START)) + readme.slice(readme.indexOf(END))
  assert.doesNotMatch(outside, /^- \[[^\]]*#\d+\]\(https:\/\/github\.com\/[^)]+\/pull\/\d+\)/m)
  for (const o of OVERRIDES) assert.ok(body.includes(`- [${o.text}](${o.url}): ${o.description}`), o.url)
  assert.doesNotMatch(readme, /^## Open source$/m)
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
  assert.equal(render(pickMerged(items, 'tiagovilasboas', ALLOWLIST), OVERRIDES), EXPECTED)
})

const cli = (readme, env, ...flags) => spawnSync(process.execPath, [here('./update.mjs'), readme, ...flags], {
  encoding: 'utf8',
  env: { PATH: process.env.PATH, OSS_USER: 'tiagovilasboas', OSS_FIXTURE: FIXTURE, ...env },
})

test('CLI (fixture): dry run prints the diff and never writes; write is idempotent', () => {
  const dir = mkdtempSync(join(tmpdir(), 'oss-block-'))
  const readme = join(dir, 'README.md')
  const stale = `# hi\n\n${START}\nold\n${END}\n\n## tail\n`
  writeFileSync(readme, stale)

  const dry = cli(readme, {}, '--dry-run')
  assert.equal(dry.status, 0, dry.stderr)
  assert.match(dry.stdout, /dry run, not written/)
  assert.match(dry.stdout, /^-old$/m)
  assert.equal(readFileSync(readme, 'utf8'), stale)

  const write = cli(readme, {})
  assert.equal(write.status, 0, write.stderr)
  assert.match(write.stdout, /updated /)
  const once = readFileSync(readme, 'utf8')
  assert.equal(once, `# hi\n\n${START}\n${EXPECTED}\n${END}\n\n## tail\n`)

  const again = cli(readme, {})
  assert.equal(again.status, 0, again.stderr)
  assert.match(again.stdout, /no change/)
  assert.equal(readFileSync(readme, 'utf8'), once)
})

test('CLI (fixture): OSS_LIMIT lowers the ceiling', () => {
  const dir = mkdtempSync(join(tmpdir(), 'oss-block-'))
  const readme = join(dir, 'README.md')
  writeFileSync(readme, `${START}\n${END}\n`)
  const r = cli(readme, { OSS_LIMIT: '2' })
  assert.equal(r.status, 0, r.stderr)
  assert.equal(readFileSync(readme, 'utf8'), `${START}\n- [lefthook #1565](https://github.com/evilmartians/lefthook/pull/1565): fix: diff push files against the merge base with the default branch\n- [goose #12629](https://github.com/aaif-goose/goose/pull/12629): feat(cli): prompt for goose mode during first-time configure\n${OVERRIDES.map((o) => `- [${o.text}](${o.url}): ${o.description}\n`).join('')}${END}\n`)
})

test('lineDiff shows a pure reordering as moved lines only', () => {
  const d = lineDiff('a\nb\nc\nd', 'b\na\nc\nd')
  const removed = d.split('\n').filter((l) => l.startsWith('-')).map((l) => l.slice(1))
  const added = d.split('\n').filter((l) => l.startsWith('+')).map((l) => l.slice(1))
  assert.equal(removed.length, 1)
  assert.deepEqual(added, removed)
})
