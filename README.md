# Tiago Vilas Boas (Montanha) 🛵

**Staff Software Engineer · Harness Engineering · Agentic AI · AppSec**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiagovilasboas/)
[![DEV.to](https://img.shields.io/badge/DEV.to-0A0A0A?style=flat-square&logo=devdotto&logoColor=white)](https://dev.to/tiagovilasboas)

Construo condições para que as squads tomem boas decisões sem depender da minha memória.

Atualmente: Staff Engineer no Squad ADM (Cogna/Voomp), montando frente de Enablement e aplicando Harness Engineering em code review com IA.

Atuo com tecnologia desde 2006. Hoje aplico Harness Engineering, Agentic AI e AppSec: arquitetura antes do código, agents com escopo, humano no loop e evidência que dá para reproduzir.

**Impacto:**
- [+10% de vendas no checkout no mês](https://dev.to/tiagovilasboas/10-de-conversao-no-checkout-no-mes-a-campanha-quebrava-na-hora-de-pagar-5566), depois de achar por que a campanha quebrava na hora de pagar.
- [Um contrato de observabilidade de frontend](https://dev.to/tiagovilasboas/observabilidade-no-frontend-o-http-200-esconde-900-catch-vazios-53jd) adotado pelos squads: o mesmo padrão de erro e de proteção de dado pessoal em cada front, com um guia aberto pra qualquer squad copiar ([sentry-golden-path](https://github.com/tiagovilasboas/sentry-golden-path)).

## Open source

<!-- oss:start -->
<p>
<a href="https://github.com/punkpeye/fastmcp/pull/392" title="punkpeye/fastmcp#392: ferramentas com pares de chave e valor anunciadas do jeito certo"><img src="https://github.com/punkpeye.png?size=80" width="40" height="40" alt="punkpeye/fastmcp"></a>&nbsp;
<a href="https://github.com/NodeSecure/js-x-ray/pull/723" title="NodeSecure/js-x-ray#723: importações com crase não escapam mais do alerta"><img src="https://github.com/NodeSecure.png?size=80" width="40" height="40" alt="NodeSecure/js-x-ray"></a>&nbsp;
<a href="https://github.com/nanostores/nanostores/pull/437" title="nanostores/nanostores#437: aviso certo quando um campo aninhado muda"><img src="https://github.com/nanostores.png?size=80" width="40" height="40" alt="nanostores/nanostores"></a>&nbsp;
<a href="https://github.com/alecthomas/chroma/pull/1387" title="alecthomas/chroma#1387: números do Go moderno coloridos do jeito certo"><img src="https://github.com/alecthomas.png?size=80" width="40" height="40" alt="alecthomas/chroma"></a>&nbsp;
<a href="https://github.com/openai/openai-agents-python/pull/4961" title="openai/openai-agents-python#4961: histórico longo de conversa sem erro"><img src="https://github.com/openai.png?size=80" width="40" height="40" alt="openai/openai-agents-python"></a>
</p>

<sub>fastmcp · js-x-ray · nanostores · chroma · openai-agents-python</sub>

- [punkpeye/fastmcp#392](https://github.com/punkpeye/fastmcp/pull/392): servidores MCP feitos com a biblioteca passam a anunciar do jeito certo as ferramentas que recebem pares de chave e valor.
- [NodeSecure/js-x-ray#723](https://github.com/NodeSecure/js-x-ray/pull/723): o scanner de segurança de pacotes npm passa a pegar importações escritas com crase, que antes escapavam do alerta.
- [nanostores/nanostores#437](https://github.com/nanostores/nanostores/pull/437): apps que observam um campo dentro de um estado aninhado passam a ser avisados quando esse campo muda de verdade.
- [alecthomas/chroma#1387](https://github.com/alecthomas/chroma/pull/1387): o colorizador de código passa a mostrar certo os números do Go moderno, como `0o644`.
- [openai/openai-agents-python#4961](https://github.com/openai/openai-agents-python/pull/4961): sessões de agente com histórico longo deixam de dar erro ao buscar as mensagens com limite de itens.

Em revisão: [punkpeye/fastmcp#405](https://github.com/punkpeye/fastmcp/pull/405) · [getsentry/sentry-javascript#16553](https://github.com/getsentry/sentry-javascript/pull/16553) · [vercel/ai#6292](https://github.com/vercel/ai/pull/6292)
<!-- oss:end -->

## Produtos

- [harness-downshift](https://github.com/tiagovilasboas/harness-downshift): roteamento de modelo por custo. Manda cada subtarefa pro modelo do tamanho certo, sem outra IA decidindo.

- [Nexo](https://github.com/tiagovilasboas/obsidian-nexo) · [Nexo Graph](https://github.com/tiagovilasboas/obsidian-nexo-graph): tema e plugin de grafo para Obsidian. Da identidade visual à interação.

- [Quinto](https://quinto-eight.vercel.app/): PWA offline-first pra controle financeiro familiar. Funciona sem internet, sincroniza quando a rede volta.

- [dev-to-mcp](https://github.com/tiagovilasboas/dev-to-mcp): servidor MCP em Go que conecta agentes de IA à API do DEV.to.

Também: [agentic-code-review](https://github.com/tiagovilasboas/agentic-code-review) · [sentry-golden-path](https://github.com/tiagovilasboas/sentry-golden-path) · [staff-impact-cases](https://github.com/tiagovilasboas/staff-impact-cases)

## Mentorias e material de apoio

- [Frontend Architecture Playbook](https://frontend-architecture-playbook-eight.vercel.app): guia interativo de apoio a mentorias para discutir decisões, trade-offs e evolução de arquitetura front-end. Parte de situações reais da minha trajetória.

  App no ar: [frontend-architecture-playbook-eight.vercel.app](https://frontend-architecture-playbook-eight.vercel.app)

## Artigos em destaque

- [+10% de vendas no checkout no mês. A campanha quebrava na hora de pagar](https://dev.to/tiagovilasboas/10-de-conversao-no-checkout-no-mes-a-campanha-quebrava-na-hora-de-pagar-5566): performance ligada ao resultado, não ao bundle isolado.
- [Observabilidade no frontend: o HTTP 200 esconde centenas de catch vazios](https://dev.to/tiagovilasboas/observabilidade-no-frontend-o-http-200-esconde-900-catch-vazios-53jd): falhas silenciosas no frontend e um caminho de instrumentação.
- [O prompt de AppSec que eu criei achou 4 gaps de segurança](https://dev.to/tiagovilasboas/prompt-appsec-4-gaps-autorizacao-1k77): evidência, falso-positivo e autorização antes de abrir uma issue.
- [Cursor, Kiro, ChatGPT: três harness, uma arquitetura](https://dev.to/tiagovilasboas/cursor-kiro-chatgpt-tres-harness-uma-arquitetura-7li): memória compartilhada, skills e separação de contextos.

[Ver todos os artigos no DEV.to](https://dev.to/tiagovilasboas)

## Formação

- Cursando **Graduação em Defesa Cibernética na Faculdade Impacta**.
- [Agentic AI with LangChain and LangGraph (IBM/Coursera)](https://www.coursera.org/account/accomplishments/verify/B27T6TUQO1NB), concluída em setembro de 2026.
- [Security Hardening (Google/Coursera)](https://www.coursera.org/account/accomplishments/verify/MGL4PB651JCX), concluída em setembro de 2026.

[LinkedIn](https://www.linkedin.com/in/tiagovilasboas/) · [DEV.to](https://dev.to/tiagovilasboas)

[![Buy me a coffee](assets/buy-me-a-coffee.svg)](https://buymeacoffee.com/nexoobsidian)
