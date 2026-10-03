---
title: "Harness Engineering de negócio: o control plane que o Cursor não fecha"
published: false
description: "Skills, MCP e routing são o harness do desenvolvedor. Empresa precisa de gateway, token governance, blast radius e evals — senão o request de R$0,02 vira R$4."
tags: ai, architecture, devops, braziliandevs
---

O erro comum da empresa é começar assim: "vamos comprar Claude Code para todo mundo."

Eu já mapeei o harness do desenvolvedor. Contexto, rules, skills, MCP, agentes, routing, modelos pequenos versus frontier, RAG, HITL. Isso fecha a camada de quem está na cadeira. Não fecha a camada da empresa.

O salto para Harness Engineering em nível enterprise é perceber que o harness deixa de ser só produtividade e vira um control plane corporativo de IA.

No artigo do [padrão por fluxo](https://dev.to/tiagovilasboas/claude-code-copilot-e-cursor-na-empresa-um-padrao-por-fluxo-571i) eu escrevi que não achei, em produção, um control plane único com as caixas desta peça e URL de loja. Este texto não inventa esse produto. Desenha o mapa. Sem o mapa, a empresa compra seat. Com o mapa, ela opera uma AI Platform.

## Neste artigo

1. O harness do desenvolvedor não fecha o mapa
2. O control plane
3. O fluxo começa antes do agente
4. A arquitetura empresarial tende a ter um gateway central
5. Token governance muda o jogo
6. Model routing corporativo
7. Segurança fica antes, durante e depois do LLM
8. Evals viram CI/CD da IA
9. Observability também muda
10. Onde entram as stacks
11. Quem é o Harness Engineer nisso tudo
12. O que falta no topo

## 1. O harness do desenvolvedor não fecha o mapa

[Fonte de verdade entre Cursor, Kiro e Codex](https://dev.to/tiagovilasboas/harness-engineering-uma-fonte-de-verdade-entre-cursor-kiro-codex-e-seus-agentes-4ji5). [Cinco camadas do agent](https://dev.to/tiagovilasboas/harness-engineering-as-5-camadas-do-agent-memory-context-skills-agents-e-tools-2oog). [Model routing](https://dev.to/tiagovilasboas/model-routing-para-software-engineers-como-escolher-o-llm-certo-dentro-de-cada-harness-o5g). [Knowledge base no code review](https://dev.to/tiagovilasboas/harness-engineer-como-um-knowledge-base-rag-centralizado-pode-impactar-positivamente-sua-empresa-2ako). Isso é o harness de quem escreve código.

A empresa pergunta outra coisa.

Quanto IA custou este mês? Qual squad gasta mais? Qual modelo tem melhor ROI? Por que estamos usando Opus? O agente pode abrir PR? Pode mergear? Pode ler produção? Dados pessoais podem chegar no prompt?

Quem só configura Claude Code, Cursor e MCP não responde isso. Quem desenha o control plane responde.

## 2. O control plane

Eu penso assim:

```
                    BUSINESS / GOVERNANCE
     Finance • Security • Legal • Compliance • Engineering
                          │
                          ▼
                 ┌─────────────────┐
                 │ AI CONTROL PLANE│
                 │ / AI PLATFORM   │
                 └────────┬────────┘
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
   Identity/RBAC      Policies          FinOps
   Teams/Projects     Guardrails        Budgets
   SSO/OIDC           Data rules        Quotas
        │                 │                  │
        └─────────────────┼──────────────────┘
                          ▼
                 ┌─────────────────┐
                 │  AI GATEWAY     │
                 │                 │
                 │ Routing         │
                 │ Fallback        │
                 │ Model allowlist │
                 │ Token control   │
                 │ Rate limits     │
                 │ Caching         │
                 └────────┬────────┘
                          │
             ┌────────────┴───────────┐
             │                        │
       Harness Runtime          Agent Runtime
             │                        │
      Context / Skills          LangGraph etc.
      MCP / Rules               State / HITL
      Tool permissions          Workflows
             │                        │
             └────────────┬───────────┘
                          ▼
                  LLM / MODEL LAYER
          ┌────────┬────────┬────────┐
        OpenAI  Anthropic  Gemini  OSS/local
          │          │        │        │
          └──────────┴────────┴────────┘
                          │
                          ▼
                 TOOLS / COMPANY DATA
          Git • Jira • DB • APIs • AWS
          Browser • Slack • CI/CD • Docs
```

É nessa direção que a infraestrutura atual está indo. Gateways corporativos já incorporam routing, fallback, observabilidade, provider allowlists, Zero Data Retention e budgets por time, projeto, chave e usuário. Em vez de deixar cada aplicação conversar direto com OpenAI, Anthropic, Google.

O cérebro de governança fica acima do workflow. LangGraph orquestra estado. Não governa a empresa.

## 3. O fluxo começa antes do agente

O Harness Engineer / AI Platform Engineer começa antes da ferramenta.

```
1. Business problem
        ↓
2. Risk classification
        ↓
3. Data classification
        ↓
4. Allowed capabilities
        ↓
5. Approved models/providers
        ↓
6. Architecture / Harness
        ↓
7. Evals
        ↓
8. Controlled rollout
        ↓
9. Observability
        ↓
10. FinOps / ROI
        ↓
11. Continuous governance
```

Por exemplo: "queremos IA fazendo code review."

Antes de escolher Claude, Codex ou GLM, alguém precisa responder:

- pode ler código proprietário?
- pode enviar esse código para qualquer provider?
- pode acessar produção?
- pode abrir PR?
- pode aprovar PR?
- pode executar shell?
- pode consultar Jira?
- quais repositórios?
- dados pessoais podem chegar ao prompt?
- logs podem armazenar prompt/resposta?
- qual gasto máximo por execução?
- qual modelo é necessário para cada etapa?
- quando precisa de aprovação humana?

Esse é o Harness Engineering de negócio. Modelo vem depois do perímetro. Eu já tinha escrito isso no padrão por fluxo. Aqui a lista vira contrato.

## 4. A arquitetura empresarial tende a ter um gateway central

O [Downshift](https://github.com/tiagovilasboas/harness-downshift) está conceitualmente alinhado com esta camada: escolher o modelo certo antes do spawn, em vez de deixar cada harness falar sozinho com o frontier. Ele ainda não é o control plane da empresa. É a tese de routing no runtime do desenvolvedor.

Em vez disso:

```
Cursor ───────> Anthropic
Codex ────────> OpenAI
App A ────────> Gemini
Agent B ──────> Bedrock
Script C ─────> OpenRouter
```

você quer:

```
Cursor ───┐
Kiro ─────┤
Codex ────┤
Claude ───┤
Agents ───┤
Apps ─────┤
CI/CD ────┘
          ↓
     AI Gateway
          ↓
     Policy Engine
          ↓
     Model Router
          ↓
 ┌────────┼──────────┐
OpenAI Anthropic Google OSS
```

O gateway passa a saber:

```
who
team
project
environment
task
model
provider
tokens_in
tokens_out
cached_tokens
latency
cost
tool_calls
policy_decisions
errors
fallbacks
```

Essa camada importa porque request count não é suficiente para IA. Um gateway de IA acompanha o ciclo da inferência e os tokens consumidos.

Sem esses campos, a fatura chega e ninguém sabe se o gasto foi coding barato, critic em frontier ou um agente preso em loop.

## 5. Token governance muda o jogo

Você não deveria controlar somente:

```
max_tokens = 8000
```

Isso é o nível mais baixo.

Enterprise precisa de vários limites simultâneos:

```
Organization
 └── Business Unit
      └── Team
           └── Project
                └── Application
                     └── Agent
                          └── User
                               └── Invocation
```

Cada nível pode ter:

- Monthly budget
- Daily budget
- TPM
- RPM
- Max tokens/request
- Max reasoning iterations
- Max tool calls
- Max runtime
- Max concurrency
- Allowed models

A [Vercel](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets) já descreve budgets independentes para team, project, API key e user, verificando os limites antes das chamadas. Os budgets empilham: se qualquer um estourou, a request é recusada.

A AWS, no [AgentCore Harness](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness-operations.html), formaliza controles muito próximos do que estou chamando de harness:

- `maxIterations`
- `timeoutSeconds`
- `maxTokens`
- `idleRuntimeSessionTimeout`
- `maxLifetime`

Justamente para impedir que um agente autônomo entre num loop e queime recurso indefinidamente.

Esse é o conceito que eu quero cravar:

**Token governance não é somente otimização de custo. É resource governance.**

Porque um agente pode fazer:

```
1 user request
→ planner
→ 5 subagents
→ each one calls 3 tools
→ retry
→ reflection
→ critic
→ retry
→ frontier model
```

A solicitação de R$0,02 vira talvez R$4 sem ninguém perceber. Número ilustrativo, não fatura. O ponto é a árvore, não o decimal. No [model routing](https://dev.to/tiagovilasboas/model-routing-para-software-engineers-como-escolher-o-llm-certo-dentro-de-cada-harness-o5g) eu já tinha dito: a conta deixa de ser um modelo e vira uma árvore. Aqui a árvore precisa de teto.

## 6. Model routing corporativo

Você não precisa colocar Opus, Sol ou frontier para tudo.

Pode ter política:

```
Task classification
       ↓
Simple?
 ├─ yes → local/small model
 │
 └─ no
     ↓
Coding?
 ├─ mechanical → cheap coding model
 └─ architectural → stronger model
                         ↓
                 confidence < threshold?
                         ↓
                    frontier model
```

Ou:

```
Tier 0  rules / regex / classifiers
Tier 1  small local model
Tier 2  cheap hosted model
Tier 3  frontier model
Tier 4  frontier + human approval
```

Isso não é mais só teoria. Dados publicados pela Vercel em julho de 2026, no [AI Gateway Production Index](https://vercel.com/blog/ai-gateway-production-index-july-2026), mostraram que modelos open-weight chegaram a 29% dos tokens trafegados no gateway, consumindo menos de 4% do spend naquele conjunto de tráfego. Quase um terço dos tokens por um vigésimo quinto dos dólares. Relato do fornecedor, recorte de junho, tráfego anonimizado do gateway deles. Não é a fatura da sua empresa. É um bom exemplo de como dá para desacoplar volume de token de custo de frontier.

É exatamente a tese que eu venho explorando no Downshift e no model routing: small-first, frontier só quando a tarefa pede.

## 7. Segurança fica antes, durante e depois do LLM

Eu dividiria em três camadas.

### Antes da chamada

- Authentication
- Authorization
- Data classification
- PII detection/redaction
- Prompt injection filtering
- Provider policy
- Model allowlist
- Context filtering

Exemplo:

```
source_code = CONFIDENTIAL
allowed:
  Bedrock Claude
  Azure/OpenAI enterprise
blocked:
  random-provider.example
  unapproved-openrouter-model
```

Gateways atuais já permitem provider allowlists impostas no centro, inclusive impedindo que um coding agent contorne a regra na própria chamada.

### Durante

- Tool permissions
- Sandbox
- Network restrictions
- Filesystem boundaries
- Secrets isolation
- MCP allowlist
- Command allowlist
- Rate limits
- Iteration limits

Um conceito para guardar: **blast radius**.

A Anthropic descreveu recentemente a [abordagem de containment](https://www.anthropic.com/engineering/how-we-contain-claude) exatamente nessa linha: quanto mais autonomia e acesso um agente recebe, maior o potencial de dano, então a plataforma precisa limitar o raio de impacto. Não é só classificador de prompt. É o que o agente é capaz de tocar.

Por exemplo:

```
Agent
 ├─ git.read       ✓
 ├─ git.write      ✓
 ├─ PR.create      ✓
 ├─ PR.merge       HUMAN APPROVAL
 ├─ prod.read      ✓
 ├─ prod.write     ✗
 └─ secrets.read   ✗
```

Isso é muito mais importante do que só "prompt guardrail".

### Depois

- Output validation
- DLP
- Policy validation
- Audit log
- Trace
- Human approval
- Evaluation
- Anomaly detection

[Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html), por exemplo, permite avaliar inputs e outputs, aplicar políticas e mascarar informação sensível.

A regra de ouro: o modelo não é o perímetro. O perímetro é o que ele pode ver, o que pode chamar e o que pode sair.

## 8. Evals viram CI/CD da IA

Você não troca:

```
Claude X → GPT Y
```

porque apareceu um benchmark melhor.

Você tem um dataset interno:

```
evals/
 ├─ refactoring/
 ├─ bug-fix/
 ├─ security/
 ├─ architecture/
 ├─ sql/
 ├─ customer-support/
 └─ company-domain/
```

E avalia:

- quality
- accuracy
- tool success
- security violations
- latency
- tokens
- cost
- hallucinations
- human acceptance

Então:

```
Model candidate
      ↓
Offline eval
      ↓
Security eval
      ↓
Cost eval
      ↓
Canary
      ↓
5% traffic
      ↓
25%
      ↓
100%
```

Isso transforma:

"Eu acho o Claude melhor"

em:

"Para bug fixing no nosso monorepo, modelo A teve 92% de task completion por US$0,31/task; B teve 94% por US$1,92."

Isso é conversa de Staff/Principal com o negócio. Benchmark público escolhe candidato. Eval interno decide o que entra em produção.

## 9. Observability também muda

Não é só Sentry de erro.

Um LLM/Agent trace deveria parecer algo assim:

```
request_id
user_id
team
feature
agent
workflow
model_requested
model_selected
routing_reason
provider
fallback
prompt_tokens
cached_tokens
output_tokens
latency
TTFT
tools_called
tool_latency
tool_failure
iterations
guardrail_actions
policy_decisions
cost
final_status
human_feedback
```

Aí você consegue responder pergunta de diretoria:

- Quanto IA custou este mês?
- Qual squad gasta mais?
- Qual modelo tem melhor ROI?
- Por que estamos usando Opus?
- Quanto economizamos com routing?
- Quantos PRs foram gerados?
- Quantos foram aceitos?
- Qual custo por PR aceito?
- Qual custo por bug resolvido?

A Anthropic já promove métricas desse tipo para Claude Code enterprise: [usage e value](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics) ligando uso da IA a commits, PRs e custo por commit, além de [spend caps](https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide) por usuário, time e organização. Relato do fornecedor. Fórmula do value tab é ajustável. Não trata como prova causal de produtividade. Trata como o tipo de telemetria que a diretoria vai pedir.

Isso mostra a transição:

```
Token observability
        ↓
Cost observability
        ↓
Productivity observability
        ↓
Business ROI
```

Sem o primeiro, o último é slide.

## 10. Onde entram as stacks

Hoje eu separaria assim:

```
┌─────────────────────────────┐
│ Developer Harness           │
│ Cursor / Claude Code        │
│ Codex / Kiro / etc.         │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ Enterprise AI Gateway       │
│ Vercel AI Gateway           │
│ LiteLLM / custom            │
│ Bedrock / Cloud gateways    │
│ Downshift-like layer        │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ Orchestration               │
│ LangGraph                   │
│ LangChain                   │
│ custom workflows            │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ State / Memory / Knowledge  │
│ PostgreSQL                  │
│ Redis                       │
│ Vector DB                   │
│ Object storage              │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ Tools                       │
│ MCP                         │
│ REST                        │
│ GitHub/Jira/Slack           │
│ Browser/DB/Cloud            │
└─────────────────────────────┘
```

Em volta de tudo:

- OpenTelemetry
- Tracing
- Secrets Manager
- IAM
- RBAC
- DLP
- SIEM
- FinOps
- Evals
- Policy-as-Code
- Audit

Eu não colocaria LangGraph como cérebro da arquitetura toda. Ele é excelente para workflow, state e orchestration.

O cérebro de governança fica acima dele.

O harness do desenvolvedor continua existindo. Skills, rules, MCP, identidade no time. Só que agora ele deságua num gateway que a empresa enxerga. Sem isso, cada IDE vira um shadow IT de tokens.

## 11. Quem é o Harness Engineer nisso tudo

Não é:

"a pessoa que configura Claude Code, Cursor e MCP."

É mais próximo disto:

**Harness Engineer projeta a camada que conecta pessoas, agentes, modelos, contexto, ferramentas e infraestrutura da empresa, estabelecendo como a IA pode agir, quanto pode gastar, quais dados pode acessar e como suas decisões são observadas e governadas.**

Ele está no cruzamento de:

```
             AI/ML
               ▲
               │
Platform ◄── Harness ──► Security
               │
               ▼
             FinOps
               │
               ▼
            Business
```

Por isso um bom Harness Engineer precisa entender um pouco de:

AI engineering + platform engineering + architecture + DevEx + security + observability + FinOps.

Não necessariamente ser o maior especialista de cada um.

Ele precisa conseguir desenhar a fronteira entre eles.

Configurar o IDE é o harness do usuário. Desenhar o control plane é o harness da empresa. Os dois existem. Só o segundo conversa com Finance, Legal e Security sem virar teatro.

## 12. O que falta no topo

Olhando o que eu já publiquei — routing, modelos pequenos, Downshift, MCP, agentes, governança — boa parte da parte de baixo e do meio deste desenho já está no mapa. O que vale aprofundar agora é o topo:

```
Business case
       ↓
Risk classification
       ↓
AI policy
       ↓
Identity / entitlements
       ↓
Budgets / chargeback
       ↓
Model governance
       ↓
Evals / approval gates
       ↓
Operational metrics
       ↓
ROI
```

Esse é o pedaço que transforma a discussão de "como usar agentes" em "como uma empresa opera uma AI Platform".

Para Staff/Principal, é o salto: sair do harness que acelera o PR e desenhar o control plane que a empresa consegue governar.

Seat não é resultado. Gateway sem política é proxy caro. Eval sem rollout é laboratório. Observability sem ROI é dashboard. O mapa só fecha quando as onze etapas da seção 3 existem de verdade — não quando o logo do agente aparece no onboarding.
