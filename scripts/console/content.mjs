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
  demo: [
    ['$ go test ./internal/...', '# ~4 KB to say everything passed'],
    ['Go test: PASS (53 packages ok, 4 without tests)', '# ~1 KB, same verdict'],
  ],
  install: 'curl -fsSL https://raw.githubusercontent.com/tiagovilasboas/downshift-ai/main/install.sh | sh',
  honest: 'Synthetic corpus: -72% bytes. Everyday savings not proven yet. Tokens, never dollars.',
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

// Open source: the strongest merged PRs first, then a link to all of them.
export const OSS = {
  featured: ['openai-agents-python', 'TanStack Query', 'rspack', 'gosec'],
  max: 4,
  all: {
    label: 'all',
    text: 'every merged PR to projects I do not own',
    url: 'https://github.com/pulls?q=is%3Apr+author%3Atiagovilasboas+is%3Amerged+-user%3Atiagovilasboas',
  },
};
