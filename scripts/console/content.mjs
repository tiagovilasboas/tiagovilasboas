// Everything the profile says, in one place. The renderers only draw it.
// Public name only: Tiago Vilas Boas.

export const LINKS = [
  { key: 'linkedin', label: 'LinkedIn', handle: 'in/tiagovilasboas', url: 'https://www.linkedin.com/in/tiagovilasboas/' },
  { key: 'devto', label: 'DEV.to', handle: '@tiagovilasboas', url: 'https://dev.to/tiagovilasboas' },
  { key: 'downshift', label: 'Downshift', handle: 'downshift-ai', url: 'https://downshift-ai.vercel.app/' },
  { key: 'sponsor', label: 'Sponsor', handle: 'support my oss', url: 'https://github.com/sponsors/tiagovilasboas' },
];

export const DOWNSHIFT = {
  url: 'https://downshift-ai.vercel.app/',
  repo: 'tiagovilasboas/downshift-ai',
  tagline: "Protect your coding agent's context window and route subagents to the right model tier. No LLM in the loop.",
  about: "A single Go binary in your coding agent's hooks. It compacts verbose command output before it pollutes the context, and applies the model and effort the orchestrator chose for each subagent within a policy you declare. Any doubt or error leaves the command untouched.",
  demo: [
    ['$ go test ./internal/...', '# ~4 KB to say everything passed'],
    ['Go test: PASS (53 packages ok, 4 without tests)', '# ~1 KB, same verdict'],
  ],
  install: 'curl -fsSL https://raw.githubusercontent.com/tiagovilasboas/downshift-ai/main/install.sh | sh',
  bullets: [
    ['compaction', 'shrinks clean output, keeps every failure, diff and stack trace verbatim'],
    ['routing', "applies the orchestrator's model tier and effort within your policy.json"],
    ['squad', 'a 14-agent squad you trigger in plain language (downshift full-power)'],
    ['cache-tax', 'prices a cold prompt cache before you pay for it'],
  ],
  harnesses: [['Claude Code', 'done'], ['Codex', 'ok'], ['Cursor', 'ok'], ['Antigravity', 'ok'], ['OpenCode', 'beta'], ['KiroCrew', 'exp']],
  honest: 'Synthetic corpus of 248 outputs: clean runs -82% bytes, whole corpus -72%. Everyday savings not established yet. Tokens, never dollars.',
  ctas: [
    { key: 'site', label: 'Website', handle: 'downshift-ai.vercel.app', url: 'https://downshift-ai.vercel.app/' },
    { key: 'try', label: 'Try it', handle: 'install in 1 line', url: 'https://downshift-ai.vercel.app/#start' },
    { key: 'evidence', label: 'Evidence', handle: 'every claim, a rung', url: 'https://downshift-ai.vercel.app/docs/evidence/' },
    { key: 'star', label: 'Star it', handle: 'on github', url: 'https://github.com/tiagovilasboas/downshift-ai' },
  ],
};

export const IMPACT = [
  {
    title: 'A domain knowledge base in internal Git',
    sub: 'Used as agent context in code review: business rules leave the heads of whoever remembers them and get checked in the PR.',
    url: 'https://dev.to/tiagovilasboas/harness-engineer-como-um-knowledge-base-rag-centralizado-pode-impactar-positivamente-sua-empresa-2ako',
  },
  {
    title: '+10% checkout sales in a month',
    sub: 'After finding why the campaign broke at the moment of payment.',
    url: 'https://dev.to/tiagovilasboas/10-de-conversao-no-checkout-no-mes-a-campanha-quebrava-na-hora-de-pagar-5566',
  },
  {
    title: 'A frontend observability contract adopted by the squads',
    sub: 'The same error and personal-data protection pattern in every front, with an open guide any squad can copy.',
    url: 'https://dev.to/tiagovilasboas/observabilidade-no-frontend-o-http-200-esconde-900-catch-vazios-53jd',
  },
];

export const PROJECTS = [
  { name: 'grok-bot-architecture', lang: 'JavaScript', desc: 'MCP-native multi-agent architecture with desktop agents and human-in-the-loop gates.' },
  { name: 'antigravity-operator', lang: 'Go', desc: 'Outer harness for coding agents: sessions stay scoped, evidence-backed and recoverable.' },
  { name: 'ai-code-review', lang: 'JavaScript', desc: 'Agentic PR review with AppSec guardrails: a HIGH IDOR or leaked secret blocks the merge.' },
  { name: 'sentry-golden-path', lang: 'JavaScript', desc: 'Sentry done right: errors, tracing, releases, alerts and LLM monitoring.' },
  { name: 'dev-to-mcp', lang: 'Go', desc: 'MCP server for the DEV.to API in one Go binary: stdio, no cold start.' },
  { name: 'react-layered-boilerplate', lang: 'TypeScript', desc: 'React + Vite starter with strict layering, TypeScript, tests and CI.' },
];

export const START_HERE = [
  {
    title: 'agyo: architecture',
    sub: 'Where the Go runtime sits between the agent and the OS, and where session state is written.',
    url: 'https://github.com/tiagovilasboas/antigravity-operator/blob/main/docs/ARCHITECTURE.md',
  },
  {
    title: 'ai-code-review: runbooks',
    sub: 'A PR review in about 15 minutes: one skill per pass, a HIGH AuthZ/IDOR or CRITICAL secret becomes BLOCK.',
    url: 'https://github.com/tiagovilasboas/ai-code-review/blob/main/runbooks/00-overview.md',
  },
];

export const EDUCATION = [
  { title: "Bachelor's in Cyber Defense", sub: 'Faculdade Impacta, in progress', url: 'https://www.impacta.edu.br/' },
  { title: 'Agentic AI with LangChain and LangGraph', sub: 'IBM / Coursera, Sep 2026', url: 'https://www.coursera.org/account/accomplishments/verify/B27T6TUQO1NB' },
  { title: 'Security Hardening', sub: 'Google / Coursera, Sep 2026', url: 'https://www.coursera.org/account/accomplishments/verify/MGL4PB651JCX' },
  { title: 'Claude Code: Engineering with AI Agents', sub: 'Vanderbilt / Coursera, Sep 2026', url: 'https://www.coursera.org/account/accomplishments/verify/9EA34R2T1S8S' },
];
