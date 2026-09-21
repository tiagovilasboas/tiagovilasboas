# Tiago Vilas Boas (Montanha) 🛵

**Staff Software Engineer · Harness Engineering · Agentic AI · AppSec**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiagovilasboas/)
[![DEV.to](https://img.shields.io/badge/DEV.to-0A0A0A?style=flat-square&logo=devdotto&logoColor=white)](https://dev.to/tiagovilasboas)

Construo condições para que as squads tomem boas decisões sem depender da minha memória.

Atuo com tecnologia desde 2006. Staff e Arquiteto Master. Hoje aplico Harness Engineering, Agentic AI e AppSec: arquitetura antes do código, agents com escopo, humano no loop e evidência que dá para reproduzir.

**Agora:** cursando **Graduação em Defesa Cibernética na Faculdade Impacta** e aplicando agents em fluxos reais de engenharia.

**Certificação atual:** [Agentic AI with LangChain and LangGraph — IBM/Coursera](https://www.coursera.org/account/accomplishments/verify/B27T6TUQO1NB) · concluída em setembro de 2026.

## Produto em execução

- [Quinto](https://quinto-eight.vercel.app/): PWA completa e offline-first para fechamento financeiro mensal, com persistência local, banco em produção e regras legais incorporadas ao domínio.
- [Frontend Architecture Playbook](https://frontend-architecture-playbook-eight.vercel.app): playbook vivo para decisões de arquitetura front-end.

## Arquitetura, IA e engenharia

- [harness-downshift](https://github.com/tiagovilasboas/harness-downshift): roteador determinístico de subagentes — classifica cada task, mapeia para o tier de modelo certo e reescreve o spawn antes de ele acontecer. Hook adapters para Claude Code, Cursor e Codex; telemetria local; benchmark com matriz de confusão e tier accuracy. O projeto que mais me fez pensar sobre o que separa um script de uma plataforma.
- [agent-measurement](https://github.com/tiagovilasboas/agent-measurement): eval harness; `false-green` pega withhold/`ok` falso com secret vazado (`./scripts/score.sh false-green`).
- [llm-guide-for-coding](https://github.com/tiagovilasboas/llm-guide-for-coding): base, custo e Anti-Auto; `node scripts/cost.mjs` estima USD e flag Auto (`npm run check`).
- [agentic-code-review](https://github.com/tiagovilasboas/agentic-code-review): CLI `npm run review` no diff. Finding com `path:line` + CWE; motor determinístico, sem LLM.
- [sentry-golden-path](https://github.com/tiagovilasboas/sentry-golden-path): golden path Sentry com `npm test` que falha se sampling/PII/tags quebrarem a premissa Staff.
- [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture): ADRs de crew, HITL e conectores; prova em `node scripts/validate-all.mjs` (fixtures broken/fixed).
- [staff-impact-cases](https://github.com/tiagovilasboas/staff-impact-cases): INDEX de cases Staff (PT-BR) com rubrica impacto/profundidade/escopo; evidência narrativa, não produto.
- [react-layered-boilerplate](https://github.com/tiagovilasboas/react-layered-boilerplate): React com arquitetura em camadas, DI, TypeScript estrito, testes e CI.

## Artigos em destaque

### Harness, agentes e proximidade com o negócio

- [Harness Engineering: o dev que não conhece vai ficar pra trás?](https://dev.to/tiagovilasboas/harness-engineering-o-dev-que-nao-conhece-vai-ficar-pra-tras-5cn6) — contexto, ferramentas, permissões e auditoria ao redor do modelo.
- [Cursor, Kiro, ChatGPT: três harness, uma arquitetura](https://dev.to/tiagovilasboas/cursor-kiro-chatgpt-tres-harness-uma-arquitetura-7li) — memória compartilhada, skills e separação de contextos.
- [FDE: o cargo de engenharia que eu não conhecia](https://dev.to/tiagovilasboas/fde-o-cargo-de-engenheiro-que-eu-nao-conhecia-e-que-talvez-voce-tambem-nao-1j3c) — engenharia que conecta código, ambiente do cliente e resultado de negócio.

### Staff, observabilidade e AppSec

- [+10% de conversão no checkout no mês](https://dev.to/tiagovilasboas/10-de-conversao-no-checkout-no-mes-a-campanha-quebrava-na-hora-de-pagar-5566) — performance ligada ao resultado, não ao bundle isolado.
- [Observabilidade no frontend: o HTTP 200 esconde ~900 catch vazios](https://dev.to/tiagovilasboas/observabilidade-no-frontend-o-http-200-esconde-900-catch-vazios-53jd) — quatro frontends, falhas silenciosas e um caminho de instrumentação.
- [O prompt de AppSec que eu criei achou 4 gaps de segurança](https://dev.to/tiagovilasboas/prompt-appsec-4-gaps-autorizacao-1k77) — evidência, falso-positivo e autorização antes de abrir uma issue.

[Ver todos os artigos no DEV.to](https://dev.to/tiagovilasboas)

[LinkedIn](https://www.linkedin.com/in/tiagovilasboas/) · [DEV.to](https://dev.to/tiagovilasboas) · [tcarvalhovb@gmail.com](mailto:tcarvalhovb@gmail.com)

<div align="center">
  <img src="https://raw.githubusercontent.com/tiagovilasboas/tiagovilasboas/main/github-contribution-grid-snake.svg" alt="Contribution snake" width="100%"/>
</div>

