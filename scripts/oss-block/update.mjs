#!/usr/bin/env node
// Regenerates the <!-- oss:start --> ... <!-- oss:end --> block of the profile README
// as one line of links to the user's merged PRs in the curated repos of oss-allowlist.json
// (GitHub search API; latest merged PR per repo; OSS_LIMIT can lower the ceiling of 6).
//   OSS_USER=<login> GH_TOKEN=<token> node scripts/oss-block/update.mjs README.md            # write if changed
//   OSS_USER=<login> GH_TOKEN=<token> node scripts/oss-block/update.mjs README.md --dry-run  # print diff, never write
// OSS_FIXTURE=<file> reads a search-shaped JSON instead of calling the API (tests, no network).
// Always exits 0 unless something is broken; the diff goes to stdout and $GITHUB_STEP_SUMMARY.
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import { lineDiff, parseAllowlist, pickMerged, render, replaceBlock } from './oss-block.mjs'

const [file = 'README.md', ...flags] = process.argv.slice(2)
const dryRun = flags.includes('--dry-run')
const user = process.env.OSS_USER
const limit = Number(process.env.OSS_LIMIT ?? 6)
if (!user) throw new Error('OSS_USER is required')

async function searchMerged() {
  if (process.env.OSS_FIXTURE) return JSON.parse(readFileSync(process.env.OSS_FIXTURE, 'utf8'))
  const q = `author:${user} is:pr is:merged -user:${user}`
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'oss-block', 'X-GitHub-Api-Version': '2022-11-28' }
  if (process.env.GH_TOKEN) headers.Authorization = `Bearer ${process.env.GH_TOKEN}`
  const res = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(q)}&per_page=100`, { headers })
  if (!res.ok) throw new Error(`GitHub search ${res.status}: ${(await res.text()).slice(0, 200)}`)
  return res.json()
}

const body = await searchMerged()
if (body.incomplete_results) throw new Error('GitHub search returned incomplete results; refusing to rewrite the block')
const allowlist = parseAllowlist(JSON.parse(readFileSync(new URL('./oss-allowlist.json', import.meta.url), 'utf8')))
const merged = pickMerged(body.items, user, allowlist, limit)
if (merged.length === 0) throw new Error('no merged PRs in the curated repos; refusing to empty the block')

const before = readFileSync(file, 'utf8')
const after = replaceBlock(before, render(merged))
const sources = merged.map((e) => `${e.repo}#${e.number} merged ${e.mergedAt}`).join('\n')

let report
if (after === before) {
  report = `no change: ${file} OSS block is identical (${merged.length} merged)`
} else {
  const diff = lineDiff(before, after)
  if (!dryRun) writeFileSync(file, after)
  report = `${dryRun ? 'dry run, not written' : `updated ${file}`}: ${diff.split('\n').filter((l) => /^[-+]/.test(l)).length} changed lines\n\`\`\`diff\n${diff}\n\`\`\``
}
console.log(`${report}\n\nsources:\n${sources}`)
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### OSS block\n\n${report}\n\n<details><summary>sources</summary>\n\n\`\`\`\n${sources}\n\`\`\`\n</details>\n`)
}
