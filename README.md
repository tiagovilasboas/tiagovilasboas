# Tiago Vilas Boas (Montanha) 🛵

**Staff Engineer · Agentic AI · AppSec · Observability**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiagovilasboas/)
[![DEV.to](https://img.shields.io/badge/DEV.to-0A0A0A?style=flat-square&logo=devdotto&logoColor=white)](https://dev.to/tiagovilasboas)
[![Sponsor](https://img.shields.io/badge/Sponsor-EA4AAA?style=flat-square&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/tiagovilasboas)

I build the conditions for squads to make good decisions without depending on my memory.

I lead AI enablement across squads. I've worked in tech since 2006 and today apply Harness Engineering, Agentic AI and AppSec: architecture before code, scoped agents, a human in the loop, and evidence you can reproduce.

## 🔧 Building now: Downshift

<a href="https://downshift-ai.vercel.app/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tiagovilasboas/downshift-ai/main/docs/brand/downshift-logo-dark.svg">
    <img src="https://raw.githubusercontent.com/tiagovilasboas/downshift-ai/main/docs/brand/downshift-logo-light.svg" alt="Downshift" width="260">
  </picture>
</a>

**Cut your coding agent's token use. No LLM in the loop.**

A single Go binary that sits in your coding agent's hooks. It compacts verbose command output before it fills the context window, and applies the model the orchestrator chose for each subagent within the bounds of a policy you declare. Any doubt or error leaves the command or spawn untouched.

```text
$ go test ./internal/...            # ~4 KB to say everything passed
Go test: PASS (53 packages ok, 4 without tests)   # ~1 KB, same verdict
```

```bash
curl -fsSL https://raw.githubusercontent.com/tiagovilasboas/downshift-ai/main/install.sh | sh && downshift setup && downshift doctor
```

- **Output compaction (on by default):** clean, noisy output (test runs, `git status`, repeated logs) is compacted; failures, diffs and stack traces stay verbatim. It also learns which commands need new compressors.
- **Subagent model delegation:** the orchestrator picks agent, model and effort; Downshift applies it within your `policy.json` and reports tokens per harness. It never raises a tier on its own and never touches your main session's model, so the prompt cache stays intact.
- **Agent orchestration:** a 12-agent squad you trigger in plain language (`downshift full-force`, `downshift shift security`).
- **Cache hygiene (`cache-tax`) and opt-in code intelligence:** price a cold prompt cache before you pay for it; pack only the symbols a change affects.

Works with **Claude Code** (completed), **Codex** and **Cursor** (functional), **Antigravity** (functional), **OpenCode** (beta), and **KiroCrew** (experimental). Only Claude Code rewrites commands automatically; on the others the agent runs the compactor itself.

Honest numbers: on a synthetic corpus of 248 command outputs, clean runs shrink by 82% in bytes and the whole corpus by 24% (failures pass through unchanged). Savings on everyday use are not established yet, and Downshift reports tokens, never dollars. Every claim has a rung on the [evidence ladder](https://downshift-ai.vercel.app/docs/evidence/).

[![Website](https://img.shields.io/badge/website-downshift--ai.vercel.app-22C55E?style=flat-square)](https://downshift-ai.vercel.app/)
[![Release](https://img.shields.io/github/v/release/tiagovilasboas/downshift-ai?include_prereleases&label=release&style=flat-square)](https://github.com/tiagovilasboas/downshift-ai/releases)
[![Build](https://img.shields.io/github/actions/workflow/status/tiagovilasboas/downshift-ai/ci.yml?branch=main&style=flat-square&label=build)](https://github.com/tiagovilasboas/downshift-ai/actions/workflows/ci.yml)
[![Stars](https://img.shields.io/github/stars/tiagovilasboas/downshift-ai?style=flat-square)](https://github.com/tiagovilasboas/downshift-ai/stargazers)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square)](https://github.com/tiagovilasboas/downshift-ai/blob/main/LICENSE)

**[🌐 Website](https://downshift-ai.vercel.app/) · [🇧🇷 Versão em Português](https://downshift-ai.vercel.app/pt-br/) · [Try it](https://downshift-ai.vercel.app/#start) · [Architecture](https://downshift-ai.vercel.app/docs/architecture/) · [Discussions](https://github.com/tiagovilasboas/downshift-ai/discussions) · ⭐ [Star it](https://github.com/tiagovilasboas/downshift-ai)**

## Impact

- [A domain knowledge base in internal Git](https://dev.to/tiagovilasboas/harness-engineer-como-um-knowledge-base-rag-centralizado-pode-impactar-positivamente-sua-empresa-2ako), used as context by agents in code review: business rules leave the heads of whoever remembers them and get checked in the PR.
- [+10% checkout sales in a month](https://dev.to/tiagovilasboas/10-de-conversao-no-checkout-no-mes-a-campanha-quebrava-na-hora-de-pagar-5566), after finding why the campaign broke at the moment of payment.
- [A frontend observability contract](https://dev.to/tiagovilasboas/observabilidade-no-frontend-o-http-200-esconde-900-catch-vazios-53jd) adopted by the squads: the same error and personal-data protection pattern in every front, with an open guide any squad can copy ([sentry-golden-path](https://github.com/tiagovilasboas/sentry-golden-path)). *(Articles in Portuguese.)*

## 📌 Other projects

<!-- Curated: agentic AI, AppSec and observability first, then the best-starred. Stars are live shields.io badges. -->

<table>
  <tr>
    <td width="50%" valign="top">
      <b><a href="https://github.com/tiagovilasboas/grok-bot-architecture">grok-bot-architecture</a></b><br/>
      <sub>MCP-native multi-agent architecture with desktop agents and human-in-the-loop gates.</sub><br/>
      <img height="18" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square" alt="JavaScript"/>
      <a href="https://github.com/tiagovilasboas/grok-bot-architecture/stargazers"><img height="18" src="https://img.shields.io/github/stars/tiagovilasboas/grok-bot-architecture?style=social" alt="stars"/></a>
    </td>
    <td width="50%" valign="top">
      <b><a href="https://github.com/tiagovilasboas/antigravity-operator">antigravity-operator</a></b><br/>
      <sub>Outer harness for coding agents on Google AI Pro: sessions stay scoped, evidence-backed and recoverable.</sub><br/>
      <img height="18" src="https://img.shields.io/badge/-Go-00ADD8?style=flat-square" alt="Go"/>
      <a href="https://github.com/tiagovilasboas/antigravity-operator/stargazers"><img height="18" src="https://img.shields.io/github/stars/tiagovilasboas/antigravity-operator?style=social" alt="stars"/></a>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <b><a href="https://github.com/tiagovilasboas/ai-code-review">ai-code-review</a></b><br/>
      <sub>Agentic PR review with AppSec guardrails: one skill per pass, and a HIGH AuthZ/IDOR or CRITICAL secret blocks the merge.</sub><br/>
      <img height="18" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square" alt="JavaScript"/>
      <a href="https://github.com/tiagovilasboas/ai-code-review/stargazers"><img height="18" src="https://img.shields.io/github/stars/tiagovilasboas/ai-code-review?style=social" alt="stars"/></a>
    </td>
    <td width="50%" valign="top">
      <b><a href="https://github.com/tiagovilasboas/sentry-golden-path">sentry-golden-path</a></b><br/>
      <sub>Staff guide to Sentry done right: errors, tracing, releases, alerts and AI/LLM monitoring, with a pattern any squad can copy.</sub><br/>
      <img height="18" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square" alt="JavaScript"/>
      <a href="https://github.com/tiagovilasboas/sentry-golden-path/stargazers"><img height="18" src="https://img.shields.io/github/stars/tiagovilasboas/sentry-golden-path?style=social" alt="stars"/></a>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <b><a href="https://github.com/tiagovilasboas/dev-to-mcp">dev-to-mcp</a></b><br/>
      <sub>MCP server for the DEV.to API in one Go binary: stdio, no cold start.</sub><br/>
      <img height="18" src="https://img.shields.io/badge/-Go-00ADD8?style=flat-square" alt="Go"/>
      <a href="https://github.com/tiagovilasboas/dev-to-mcp/stargazers"><img height="18" src="https://img.shields.io/github/stars/tiagovilasboas/dev-to-mcp?style=social" alt="stars"/></a>
    </td>
    <td width="50%" valign="top">
      <b><a href="https://github.com/tiagovilasboas/react-layered-boilerplate">react-layered-boilerplate</a></b><br/>
      <sub>React + Vite starter with strict layering, TypeScript, tests and CI.</sub><br/>
      <img height="18" src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square" alt="TypeScript"/>
      <a href="https://github.com/tiagovilasboas/react-layered-boilerplate/stargazers"><img height="18" src="https://img.shields.io/github/stars/tiagovilasboas/react-layered-boilerplate?style=social" alt="stars"/></a>
    </td>
  </tr>
</table>

## Start here

| Resource | What's inside |
| --- | --- |
| [agyo: architecture](https://github.com/tiagovilasboas/antigravity-operator/blob/main/docs/ARCHITECTURE.md) | Where the Go runtime sits between the agent and the OS, and where session state is written |
| [ai-code-review: runbooks](https://github.com/tiagovilasboas/ai-code-review/blob/main/runbooks/00-overview.md) | A PR review in about 15 minutes: one skill per pass, a HIGH AuthZ/IDOR or CRITICAL secret becomes BLOCK, findings without `path:line` are dropped |

## Contributions

I send small, tested fixes to projects I use. Some examples:

<!-- oss:start -->
- [lefthook #1566](https://github.com/evilmartians/lefthook/pull/1566): fail_on_changes no longer breaks the hook when a submodule is staged.
- [goose #12629](https://github.com/aaif-goose/goose/pull/12629): first-time CLI configure asks for the goose mode and saves it.
- [laya #968](https://github.com/NandhaKishorM/laya/pull/968): fine-tune warns when predictions collapse to the class prior.
- [openai-agents-python #4961](https://github.com/openai/openai-agents-python/pull/4961): the session history limit is no longer sent as the Conversations API page size.
- [rspack #15900](https://github.com/web-infra-dev/rspack/pull/15900): lightningcss-loader stops mutating user options, so child compilers build again.
- [gosec #1760](https://github.com/securego/gosec/pull/1760): G102 now flags binding to the IPv6 unspecified address.
- [nanostores #437](https://github.com/nanostores/nanostores/pull/437): listenKeys fires for deep keys changed through a parent key.
- [OmniRoute #15800](https://github.com/diegosouzapw/OmniRoute/pull/15800): flags combo steps pinned to models that disappeared from the synced catalog.
- [OmniRoute #15925](https://github.com/diegosouzapw/OmniRoute/pull/15925): optional cleanup of those steps after a model sync.
- [OmniRoute #17101](https://github.com/diegosouzapw/OmniRoute/pull/17101): cleanup of a locked snapshot is retried instead of crashing the background task.
- [TanStack Query #11679](https://github.com/TanStack/query/pull/11679): queued scoped mutations start again while the window is unfocused.
<!-- oss:end -->

## Education

- Currently pursuing a **Bachelor's in Cyber Defense at Faculdade Impacta**.
- [Agentic AI with LangChain and LangGraph (IBM/Coursera)](https://www.coursera.org/account/accomplishments/verify/B27T6TUQO1NB), completed September 2026.
- [Security Hardening (Google/Coursera)](https://www.coursera.org/account/accomplishments/verify/MGL4PB651JCX), completed September 2026.
- [Claude Code: Engineering with AI Agents (Vanderbilt/Coursera)](https://www.coursera.org/account/accomplishments/verify/9EA34R2T1S8S), completed September 2026.

## Contact

- [LinkedIn](https://www.linkedin.com/in/tiagovilasboas/)
- [Articles on DEV.to](https://dev.to/tiagovilasboas)
- [Support my open source work](https://github.com/sponsors/tiagovilasboas)
