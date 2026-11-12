// GitHub data for the console: one GraphQL query, normalized into the shape
// the renderers read (scripts/console/data/profile.json).

export const QUERY = `query($login: String!) {
  user(login: $login) {
    login createdAt
    followers { totalCount }
    pullRequests { totalCount }
    merged: pullRequests(states: MERGED) { totalCount }
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC, first: 100) {
      totalCount
      nodes {
        stargazerCount forkCount
        languages(first: 6, orderBy: {field: SIZE, direction: DESC}) { edges { size node { name } } }
      }
    }
    contributionsCollection {
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
    }
  }
}`;

/** Current streak counts back from today (or yesterday, if today is still empty). */
export function streaks(calendar, today) {
  let longest = 0;
  let run = 0;
  for (const [, n] of calendar) {
    run = n > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  const days = calendar.filter(([d]) => d <= today);
  let i = days.length - 1;
  if (i >= 0 && days[i][0] === today && days[i][1] === 0) i -= 1;
  let current = 0;
  for (; i >= 0 && days[i][1] > 0; i--) current += 1;
  return { current, longest };
}

export function topLanguages(repos, limit = 5) {
  const bytes = new Map();
  for (const r of repos) {
    for (const e of r.languages.edges) bytes.set(e.node.name, (bytes.get(e.node.name) ?? 0) + e.size);
  }
  const sorted = [...bytes].sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, limit);
  const sum = top.reduce((a, [, n]) => a + n, 0) || 1;
  return top.map(([name, n]) => ({ name, pct: (n / sum) * 100 }));
}

/** raw: the GraphQL response ({data:{user}} or {user}). today: YYYY-MM-DD. */
export function normalize(raw, today) {
  const u = (raw.data ?? raw).user;
  if (!u) throw new Error('GraphQL response has no user');
  const repos = u.repositories.nodes;
  const calendar = u.contributionsCollection.contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => [d.date, d.contributionCount]);
  return {
    updated: today,
    login: u.login,
    createdAt: u.createdAt.slice(0, 10),
    followers: u.followers.totalCount,
    prs: { total: u.pullRequests.totalCount, merged: u.merged.totalCount },
    repos: u.repositories.totalCount,
    stars: repos.reduce((a, r) => a + r.stargazerCount, 0),
    forks: repos.reduce((a, r) => a + r.forkCount, 0),
    contributions: u.contributionsCollection.contributionCalendar.totalContributions,
    activeDays: calendar.filter(([, n]) => n > 0).length,
    streak: streaks(calendar, today),
    languages: topLanguages(repos),
    calendar,
  };
}
