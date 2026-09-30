// Pure helpers for the profile README OSS block: no network, no fs.
// Tested in oss-block.test.mjs.
export const START = '<!-- oss:start -->'
export const END = '<!-- oss:end -->'
/** Prefix of the rendered line (the section header lives outside the markers, in the README). */
export const PREFIX = 'PRs mergeados em:'

/** HTML-escape (& < > " ') for text and attribute values. */
export const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

/** Third-party text placed in a markdown line: one line, HTML-escaped, and \\ [ ] backslash-escaped so it cannot open a link. */
export const escapeMarkdownText = (s) => escapeHtml(String(s).replace(/\s+/g, ' ').trim().replace(/[\\[\]]/g, (c) => `\\${c}`))

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

/** Hard ceiling of items in the OSS line (the allowlist and OSS_LIMIT can only lower it). */
export const MAX_ITEMS = 6

const REPO_RE = /^[^/\s]+\/[^/\s]+$/

/** One allowlist entry: "owner/name" or { "repo": "owner/name", "label": "shown text" } -> { repo, label? }. */
function toCurated(x) {
  const c = typeof x === 'string' ? { repo: x } : x
  if (!c || typeof c.repo !== 'string' || !REPO_RE.test(c.repo)) return null
  if (c.label !== undefined && (typeof c.label !== 'string' || !c.label.trim())) return null
  return c.label === undefined ? { repo: c.repo } : { repo: c.repo, label: c.label }
}

/** Validate the curated allowlist: "owner/name" strings or { repo, label } objects, no duplicates, at most MAX_ITEMS. */
export function parseAllowlist(json) {
  const raw = json?.repos
  const repos = Array.isArray(raw) ? raw.map(toCurated) : null
  if (!repos || repos.includes(null)) {
    throw new Error('oss-allowlist.json: "repos" must be an array of "owner/name" or { "repo": "owner/name", "label": "text" }')
  }
  if (new Set(repos.map((r) => r.repo.toLowerCase())).size !== repos.length) throw new Error('oss-allowlist.json: duplicate repo')
  if (repos.length > MAX_ITEMS) throw new Error(`oss-allowlist.json: at most ${MAX_ITEMS} repos, got ${repos.length}`)
  return repos
}

/**
 * Merged PRs in curated repos only. One PR per repo: the most recently merged one.
 * Order follows the allowlist; curated repos without a merged PR are omitted;
 * the user's own repos never count. At most min(limit, MAX_ITEMS) items.
 * An optional curated label replaces the repo name in the link text.
 */
export function pickMerged(items, user, allowlist, limit = MAX_ITEMS) {
  const curated = allowlist.map((x) => (typeof x === 'string' ? { repo: x } : x))
  const rank = new Map(curated.map((c, i) => [c.repo.toLowerCase(), i]))
  const cap = Math.max(0, Math.min(Number.isFinite(limit) ? limit : MAX_ITEMS, MAX_ITEMS))
  return items
    .map(toEntry)
    .filter((e) => e.mergedAt && e.owner.toLowerCase() !== user.toLowerCase() && rank.has(e.repo.toLowerCase()))
    .sort(byMergedDesc)
    .filter((e, i, all) => all.findIndex((x) => x.repo.toLowerCase() === e.repo.toLowerCase()) === i)
    .sort((a, b) => rank.get(a.repo.toLowerCase()) - rank.get(b.repo.toLowerCase()))
    .slice(0, cap)
    .map((e) => {
      const { label } = curated[rank.get(e.repo.toLowerCase())]
      return label === undefined ? e : { ...e, label }
    })
}

/** Only https://github.com/ PR URLs; ( ) < > and whitespace are percent-encoded so the markdown link cannot break. */
export function safeUrl(url) {
  const u = String(url)
  if (!u.startsWith('https://github.com/')) throw new Error(`unexpected PR URL: ${u}`)
  return u.replace(/[()<>\s]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')}`)
}

/** Block body (between the markers): one line, only merged PRs, e.g. `PRs mergeados em: [rspack](pr) · [nanostores](pr)`. */
export function render(merged) {
  return `${PREFIX} ${merged.map((e) => `[${escapeMarkdownText(e.label ?? e.name)}](${safeUrl(e.url)})`).join(' · ')}`
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
