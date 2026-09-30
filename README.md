# Tiago Vilas Boas (Montanha) 🛵

**Staff Engineer · Agentic AI · AppSec · Observabilidade**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiagovilasboas/)
[![DEV.to](https://img.shields.io/badge/DEV.to-0A0A0A?style=flat-square&logo=devdotto&logoColor=white)](https://dev.to/tiagovilasboas)

Construo condições para que as squads tomem boas decisões sem depender da minha memória.

Lidero enablement de IA entre squads. Atuo com tecnologia desde 2006 e hoje aplico Harness Engineering, Agentic AI e AppSec: arquitetura antes do código, agents com escopo, humano no loop e evidência que dá para reproduzir.

**Impacto:**
- [Uma base de conhecimento de domínio no Git interno](https://dev.to/tiagovilasboas/harness-engineer-como-um-knowledge-base-rag-centralizado-pode-impactar-positivamente-sua-empresa-2ako), usada como contexto pelos agentes no code review: a regra de negócio sai da cabeça de quem lembra e passa a ser checada no PR.
- [+10% de vendas no checkout no mês](https://dev.to/tiagovilasboas/10-de-conversao-no-checkout-no-mes-a-campanha-quebrava-na-hora-de-pagar-5566), depois de achar por que a campanha quebrava na hora de pagar.
- [Um contrato de observabilidade de frontend](https://dev.to/tiagovilasboas/observabilidade-no-frontend-o-http-200-esconde-900-catch-vazios-53jd) adotado pelos squads: o mesmo padrão de erro e de proteção de dado pessoal em cada front, com um guia aberto pra qualquer squad copiar ([sentry-golden-path](https://github.com/tiagovilasboas/sentry-golden-path)).

## Open source

<!-- oss:start -->
OSS: [rspack](https://github.com/web-infra-dev/rspack/pull/15900) · [openai-agents-python](https://github.com/openai/openai-agents-python/pull/4961) · [nanostores](https://github.com/nanostores/nanostores/pull/437) · [fastmcp](https://github.com/punkpeye/fastmcp/pull/392)
<!-- oss:end -->

## Arquitetura, IA e engenharia

- [ai-agent-evals](https://github.com/tiagovilasboas/ai-agent-evals): mede se um agente de IA fez mesmo o trabalho ou só disse que fez. Pega os casos de "falso ok", como o agente dar a tarefa por concluída enquanto uma senha vazou num e-mail que ele mesmo enviou.

  Comando: `./scripts/score.sh false-green`

- [ai-code-review](https://github.com/tiagovilasboas/ai-code-review): revisão automática de código que aponta o arquivo, a linha e o tipo de falha de segurança. Não usa IA na decisão, então o resultado é sempre o mesmo.

  Comando: `npm run review -- examples/sample-pr.diff`

- [harness-downshift](https://github.com/tiagovilasboas/harness-downshift): corta o gasto com IA no código mandando cada subtarefa para o modelo do tamanho certo, o barato para o trabalho simples e o mais caro só para o difícil. A escolha segue regras fixas, sem outra IA decidindo, e o projeto ainda está em beta.

  Comando: `downshift try "rename the userId variable" claude-code`

- [sentry-golden-path](https://github.com/tiagovilasboas/sentry-golden-path): modelo pronto pra monitorar erros com o Sentry do jeito certo. Os testes falham se alguém tirar a proteção de dados pessoais ou quebrar a configuração.

  Comando: `npm test`

- [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture): como montei uma equipe de assistentes de IA que trabalham juntos, com aprovação humana nas ações de risco. As decisões estão documentadas, e um script confere se a troca de tarefas e os pedidos de aprovação seguem as regras.

  Comando: `node scripts/validate-all.mjs`

- [dev-to-mcp](https://github.com/tiagovilasboas/dev-to-mcp): servidor MCP em Go que deixa agentes de IA lerem e publicarem no DEV.to, num binário só.

  Comando: `go build -o dist/dev-to-mcp .`

- [staff-engineering-case-studies](https://github.com/tiagovilasboas/staff-engineering-case-studies): casos reais e anonimizados do meu trabalho como Staff, avaliados por impacto, profundidade, escopo e decisão. São histórias, não código.

  Comando: `python3 scripts/check-case-headings.py`

- [react-layered-boilerplate](https://github.com/tiagovilasboas/react-layered-boilerplate): ponto de partida pra apps React bem organizados, com camadas separadas, tipagem estrita, testes e CI.

  Comando: `npm test`

- [Frontend Architecture Playbook](https://frontend-architecture-playbook-eight.vercel.app): guia que uso em mentorias pra discutir decisões e trade-offs de arquitetura front-end, a partir de situações reais da minha trajetória.

## Artigos em destaque

- [O prompt de AppSec que eu criei achou 4 gaps de segurança](https://dev.to/tiagovilasboas/prompt-appsec-4-gaps-autorizacao-1k77): contrato de hunt com requisito ASVS e denominador; virou issues públicas de hardening em Formbricks, Dub e Cal.com, e silêncio onde o controle segurava.
- [+10% de vendas no checkout no mês. A campanha quebrava na hora de pagar](https://dev.to/tiagovilasboas/10-de-conversao-no-checkout-no-mes-a-campanha-quebrava-na-hora-de-pagar-5566): bundle, SSR e CDN ligados ao número de vendas do backoffice, não ao Lighthouse.
- [Observabilidade no frontend: o BFF respondia 200, mas o clique falhava](https://dev.to/tiagovilasboas/observabilidade-no-frontend-o-http-200-esconde-900-catch-vazios-53jd): um contrato de Sentry em quatro frontends (domínio, dedup, máscara de PII, sample), com o kit aberto no [sentry-golden-path](https://github.com/tiagovilasboas/sentry-golden-path).
- [Harness Engineer: como um knowledge base (RAG) centralizado pode impactar positivamente sua empresa](https://dev.to/tiagovilasboas/harness-engineer-como-um-knowledge-base-rag-centralizado-pode-impactar-positivamente-sua-empresa-2ako): a base de regras que o agente consulta antes de comentar o PR, com um AGENTS.md pronto pra copiar.
- [Antigravity Operator: Helping AI Coding Agents Stay on Track](https://dev.to/tiagovilasboas/antigravity-operator-helping-ai-coding-agents-stay-on-track-216n): meu primeiro projeto open source, em Go (v0.4.1): estado de sessão, dashboard local e os limites de segurança declarados.
- [Claude Code, Copilot e Cursor na empresa: um padrão por fluxo](https://dev.to/tiagovilasboas/claude-code-copilot-e-cursor-na-empresa-um-padrao-por-fluxo-571i): um agente padrão por fluxo, com políticas e evals comuns, apoiado em cases e pesquisas públicas com fonte.
- [O effort da tarefa: quando pensar demais vira stage 3 na fatura do agente](https://dev.to/tiagovilasboas/o-effort-da-tarefa-quando-pensar-demais-vira-stage-3-na-fatura-do-agente-1h3d): quanto raciocínio dar ao agente por classe de tarefa, com a documentação oficial de cada provedor e a heurística do [harness-downshift](https://github.com/tiagovilasboas/harness-downshift).

[Ver todos os artigos no DEV.to](https://dev.to/tiagovilasboas)

## Formação

- Cursando **Graduação em Defesa Cibernética na Faculdade Impacta**.
- [Agentic AI with LangChain and LangGraph (IBM/Coursera)](https://www.coursera.org/account/accomplishments/verify/B27T6TUQO1NB), concluída em setembro de 2026.
- [Security Hardening (Google/Coursera)](https://www.coursera.org/account/accomplishments/verify/MGL4PB651JCX), concluída em setembro de 2026.
- [Claude Code: Engineering with AI Agents (Vanderbilt/Coursera)](https://www.coursera.org/account/accomplishments/verify/9EA34R2T1S8S), concluída em setembro de 2026.

[LinkedIn](https://www.linkedin.com/in/tiagovilasboas/) · [DEV.to](https://dev.to/tiagovilasboas)
