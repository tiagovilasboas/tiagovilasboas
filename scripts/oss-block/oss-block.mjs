// Pure helpers for the profile README OSS block: no network, no fs.
// Tested in oss-block.test.mjs.
export const START = '<!-- oss:start -->'
export const END = '<!-- oss:end -->'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** GitHub search item -> entry. */
export function toEntry(item) {
  const repo = item.repository_url.replace('https://api.github.com/repos/', '')
  const [owner, name] = repo.split('/')
  return { repo, owner, name, number: item.number, url: item.html_url, title: item.title, mergedAt: item.pull_request?.merged_at ?? null }
}

/** Newest merge first; ties broken by URL so the order never depends on API order. */
export function byMergedDesc(a, b) {
  if (a.mergedAt !== b.mergedAt) return a.mergedAt < b.mergedAt ? 1 : -1
  return a.url < b.url ? -1 : a.url > b.url ? 1 : 0
}

/** Merged PRs in other people's repos: latest merged PR per repo, newest first, at most `limit`. */
export function pickMerged(items, user, limit) {
  return items
    .map(toEntry)
    .filter((e) => e.mergedAt && e.owner.toLowerCase() !== user.toLowerCase())
    .sort(byMergedDesc)
    .filter((e, i, all) => all.findIndex((x) => x.repo === e.repo) === i)
    .slice(0, limit)
}

/** Block body (between the markers). Only merged PRs; never an "in review" line. */
export function render(merged, blurbs) {
  const key = (e) => `${e.repo}#${e.number}`
  const avatars = merged.map((e) => {
    const short = blurbs[key(e)]?.short ?? e.title
    return `<a href="${e.url}" title="${esc(`${key(e)}: ${short}`)}"><img src="https://github.com/${e.owner}.png?size=80" width="40" height="40" alt="${esc(e.repo)}"></a>`
  })
  const lines = ['<p>', avatars.join('&nbsp;\n'), '</p>', '', `<sub>${merged.map((e) => esc(e.name)).join(' · ')}</sub>`, '']
  for (const e of merged) {
    lines.push(`- [${key(e)}](${e.url}): ${blurbs[key(e)]?.long ?? e.title}`)
  }
  return lines.join('\n')
}

/** Replace only what sits between the markers. */
export function replaceBlock(readme, block) {
  const s = readme.indexOf(START)
  const e = readme.indexOf(END)
  if (s === -1 || e === -1 || e < s) throw new Error('OSS markers not found or out of order')
  return readme.slice(0, s + START.length) + '\n' + block + '\n' + readme.slice(e)
}

/** Minimal LCS line diff: unchanged lines prefixed with ' ', removed '-', added '+'. */
export function lineDiff(before, after) {
  const a = before.split('\n')
  const b = after.split('\n')
  const lcs = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1])
    }
  }
  const out = []
  let i = 0
  let j = 0
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      out.push(` ${a[i]}`); i += 1; j += 1
    } else if (i < a.length && (j === b.length || lcs[i + 1][j] >= lcs[i][j + 1])) {
      out.push(`-${a[i]}`); i += 1
    } else {
      out.push(`+${b[j]}`); j += 1
    }
  }
  // keep 2 lines of context around changes
  const keep = out.map((l, k) => out.slice(Math.max(0, k - 2), k + 3).some((x) => x[0] !== ' '))
  return out.filter((_, k) => keep[k]).join('\n')
}
