<div>
  <h1>Tiago Vilas Boas (Montanha) 🏍️</h1>
  <strong>Staff Software Engineer | Agentic AI · LLMs · Multi-Agent Systems · MCP · RAG</strong><br/>
<sub>React · TypeScript · Node.js · Go · Architecture · Observability · AppSec</sub><br/>
<sub>Construindo software desde 2006 · Hotmart, CI&amp;T, Dextra &amp; Montanha Tech</sub>

  <p><em>Construo condições para que o time tome boas decisões sem depender da minha memória.</em></p>
  <p>🚀 Organizando o caos técnico e criando produtos escaláveis do zero<br/>
     🧠 Agentic AI no dia a dia: LLMs, multi-agent, MCP, memória estruturada e harness<br/>
     🌉 Ponte entre Produto e Engenharia para entregar valor real<br/>
     🎓 Cursando Tecnologia em Segurança da Informação (UNINTER) · AppSec aplicada
  </p>

  <p>
    <a href="https://www.linkedin.com/in/tiagovilasboas/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>
    <a href="https://github.com/tiagovilasboas"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github"/></a>
    <img alt="Visitors" src="https://komarev.com/ghpvc/?username=tiagovilasboas&style=for-the-badge&color=3ECF8E"/>
  </p>
</div>

---

## Sobre mim

> Construo condições para que o time tome boas decisões sem depender da minha memória.

Construindo software desde 2006. Experiência como **Staff Software Engineer e Tech Lead** em alta escala (Hotmart, CI&T, Dextra) e consultoria pela **Montanha Tech**.

Especialidade: **organizar o caos técnico**, reduzir a distância Produto ↔ Engenharia e transformar projetos do zero em produtos escaláveis.

Hoje o foco é **Agentic AI**: orquestro LLMs, multi-agent systems, MCP e RAG (memória estruturada + retrieval) num stack próprio de agentes, com harness e arquitetura de ponta a ponta. Energia vai para arquitetura, performance, estratégia e mentoria de times.

O que me move: problemas complexos, valor de negócio e desenvolver pessoas.

---

## Como estou trabalhando agora

| Prática | Como |
|---------|------|
| **Decisão** | Arquitetura e trade-offs primeiro; código e agents depois. Construo condições para boas decisões sem depender da minha memória. |
| **Agents** | Bridges reais para Cursor, Codex e Kiro (não só chat) |
| **Memória** | Vault Logseq versionado, com contrato de scopes/hubs (RAG estruturado) |
| **Governança** | ADRs, smokes sem mock, HITL em writes de risco, harness L0–L3 |
| **Segurança** | AppSec no ciclo + graduação SI (UNINTER) em andamento |

Não é “usar IA para digitar mais rápido”. É **sistema**: face → gateway → brain → workers → memória → harness.

---

## Arquitetura recente (stack pessoal de agentes)

Stack privado de produção pessoal (**Jarvis**), documentado com ADRs:

```
HUD (Iron-Man UI)
  → FastAPI gateway
    → Brain (Goose / LLMs via OpenRouter e fallbacks)
         ├─ skill retrieve → skills versionadas no vault
         ├─ memória Logseq (contrato RAG: hubs / scopes)
         └─ bridges → Cursor | Codex | Kiro
agent-kit → sync de rules/skills/MCP · doctor · autonomy · matrix L0–L3
```

| Camada | Papel |
|--------|------|
| **Face** | HUD para chat, workers e status |
| **Brain** | Orquestração LLM + skill loop |
| **Workers** | Execução real em IDEs (corp vs pessoal, por custo/domínio) |
| **Memory** | Vault Logseq privado (contrato de scopes/hubs; retrieval estruturado; embeddings no roadmap) |
| **Harness** | `agent-kit`: sync, doctor, eval, launchd autonomy |

Evidências públicas adjacentes: [kiro-playbook](https://github.com/tiagovilasboas/kiro-playbook) · [frontend-cursor-rules](https://github.com/tiagovilasboas/frontend-cursor-rules) · [frontend-architecture-playbook](https://github.com/tiagovilasboas/frontend-architecture-playbook)

---

## O que eu faço

| Área | Foco |
|------|------|
| **Arquitetura** | System design, full stack, APIs resilientes, modernização de legado |
| **Agentic AI** | LLMs, multi-agent, MCP, RAG estruturado, harness e governança |
| **AppSec** | Segurança desde o design, hardening, LGPD, boas práticas em nuvem/APIs |
| **Observabilidade** | Sentry, Grafana, New Relic, métricas que viram decisão |
| **Mentoria** | Carreira, Tech Lead, code review, trade-offs explícitos |
| **Entrega** | React, TypeScript, Node.js, Go · CI/CD · AWS/Azure |

---

## Tech Stack

<details>
<summary><b>Agentic AI</b> LLMs · MCP · RAG · Multi-Agent · Cursor · Codex · Goose</summary>
<p align="center">
  <img src="https://img.shields.io/badge/LLMs-111111?style=for-the-badge" alt="LLMs"/>
  <img src="https://img.shields.io/badge/MCP-0A66C2?style=for-the-badge" alt="MCP"/>
  <img src="https://img.shields.io/badge/RAG-3ECF8E?style=for-the-badge" alt="RAG"/>
  <img src="https://img.shields.io/badge/Multi--Agent-6E40C9?style=for-the-badge" alt="Multi-Agent"/>
  <img src="https://img.shields.io/badge/Cursor-000000?style=for-the-badge" alt="Cursor"/>
  <img src="https://img.shields.io/badge/Codex-412991?style=for-the-badge" alt="Codex"/>
</p>
</details>

<details>
<summary><b>Core</b> React · Vue · TypeScript · Next.js · Nuxt · Node.js</summary>
<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white" alt="Nuxt"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
</p>
</details>

<details>
<summary><b>Back-end & Data</b> Go · GraphQL · Supabase · Redis · MySQL · PostgreSQL</summary>
<p align="center">
  <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go"/>
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL"/>
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
</p>
</details>

<details>
<summary><b>Observabilidade</b> Sentry · Grafana · New Relic</summary>
<p align="center">
  <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white" alt="Sentry"/>
  <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana"/>
  <img src="https://img.shields.io/badge/New_Relic-008C99?style=for-the-badge&logo=newrelic&logoColor=white" alt="New Relic"/>
</p>
</details>

<details>
<summary><b>Cloud & Infra</b> AWS · Azure · Vercel · Docker · Kubernetes</summary>
<p align="center">
  <img src="https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS"/>
  <img src="https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white" alt="Azure"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes"/>
</p>
</details>

---

## Projetos e cases

### Em destaque
- **[Chat at Scale](https://github.com/tiagovilasboas/chat-at-scale)**: laboratório Staff de mensageria (MVP → arquitetura distribuída), trade-offs e observabilidade.
- **Agentic stack (Jarvis)**: arquitetura pessoal de agentes descrita acima (repo privado; evidência pública via playbooks e cursor-rules).

### Consultoria (cases reais)
- **Varejo (grande marca):** pricing em escala com Nuxt, IA e Supabase.
- **Móveis de luxo:** arquitetura de gestão financeira pós-venda.
- **Edtech / creators (marketplace de pagamentos):** Staff / Tech Lead em plataforma de pagamentos: checkout, webhooks e assinaturas; race conditions e falhas silenciosas com impacto em receita.
- **Integridade financeira:** idempotência, hardening de webhooks e correção de splits / vendas duplicadas.
- **Operação do seller:** exports e jobs travados, taxas/reembolsos e retentativa de recorrência.
- **Observabilidade multi-produto:** Sentry por domínio (React/Nuxt/Go), mapas de risco e evidência de impacto financeiro (Grafana).
- **Tracking e engajamento:** GA4 em escala + restauração de push notifications críticas.
- **Staff leverage:** post-mortems, ADRs, dashboards de negócio e multi-agent ops para investigação/fix em paralelo.

### Open source e side projects

| Projeto | Resumo |
|---------|--------|
| **[Frontend Architecture Playbook](https://github.com/tiagovilasboas/frontend-architecture-playbook)** | Padrões, trilhas Staff e regras de IA ([cursor-rules](https://github.com/tiagovilasboas/frontend-cursor-rules)). |
| **Boilerplates** | [React Layered](https://github.com/tiagovilasboas/react-layered-boilerplate) · [React Vite](https://github.com/tiagovilasboas/react-vite-boilerplate). |
| **[Ponto PJ](https://github.com/tiagovilasboas/ponto-pj)** | Controle de horas B2B/PJ. |
| **[kiro-playbook](https://github.com/tiagovilasboas/kiro-playbook)** | Steerings, skills e hooks para agentic IDEs. |

---

## Busco

**Staff Software Engineer**, **AI Engineer**, Staff/Principal em Agentic AI, ou papéis equivalentes e acima, em times que levam a sério escala, arquitetura e engenharia com LLMs.

---

## Analytics

<div align="center">
  <img src="https://raw.githubusercontent.com/tiagovilasboas/tiagovilasboas/main/github-stats.svg" height="165" alt="GitHub Stats"/>
  <img src="https://raw.githubusercontent.com/tiagovilasboas/tiagovilasboas/main/github-streak.svg" height="165" alt="GitHub Streak"/>
</div>
<br/>

<img src="https://raw.githubusercontent.com/tiagovilasboas/tiagovilasboas/main/github-contribution-grid-snake.svg" alt="Contribution Snake" width="100%"/>

<details>
<summary>Mais métricas</summary>
<br/>
<img src="https://raw.githubusercontent.com/tiagovilasboas/tiagovilasboas/main/github-metrics.svg" alt="GitHub Metrics" width="100%"/>
</details>

---

## Contato

📧 [tcarvalhovb@gmail.com](mailto:tcarvalhovb@gmail.com) · 💼 [LinkedIn](https://www.linkedin.com/in/tiagovilasboas/) · 📅 [Agendar 30 min](https://calendly.com/tcarvalhovb/)

---

<div align="center">
  <sub>Agentic workspace: system prompts e personas locais orquestram contexto técnico para Cursor / Claude / Codex.</sub><br/>
  <sub>Se algum projeto te ajudou, considere dar uma estrela.</sub>
</div>
