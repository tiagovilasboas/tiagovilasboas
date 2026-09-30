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
<p>
<a href="https://github.com/web-infra-dev/rspack/pull/15900" title="web-infra-dev/rspack#15900: build com child compiler não quebra mais o CSS"><img src="https://github.com/web-infra-dev.png?size=80" width="40" height="40" alt="web-infra-dev/rspack"></a>&nbsp;
<a href="https://github.com/web-infra-dev/rspress/pull/3710" title="web-infra-dev/rspress#3710: Enter com a busca fechada não dá mais erro"><img src="https://github.com/web-infra-dev.png?size=80" width="40" height="40" alt="web-infra-dev/rspress"></a>&nbsp;
<a href="https://github.com/NodeSecure/js-x-ray/pull/723" title="NodeSecure/js-x-ray#723: importações com crase não escapam mais do alerta"><img src="https://github.com/NodeSecure.png?size=80" width="40" height="40" alt="NodeSecure/js-x-ray"></a>&nbsp;
<a href="https://github.com/punkpeye/fastmcp/pull/392" title="punkpeye/fastmcp#392: ferramentas com pares de chave e valor anunciadas do jeito certo"><img src="https://github.com/punkpeye.png?size=80" width="40" height="40" alt="punkpeye/fastmcp"></a>&nbsp;
<a href="https://github.com/alecthomas/chroma/pull/1387" title="alecthomas/chroma#1387: números do Go moderno coloridos do jeito certo"><img src="https://github.com/alecthomas.png?size=80" width="40" height="40" alt="alecthomas/chroma"></a>
</p>

<sub>rspack · rspress · js-x-ray · fastmcp · chroma</sub>

- [web-infra-dev/rspack#15900](https://github.com/web-infra-dev/rspack/pull/15900): o bundler deixa de alterar as opções do loader de CSS que o usuário passou, e o build não quebra mais quando um plugin cria um segundo compilador, como o html-webpack-plugin.
- [web-infra-dev/rspress#3710](https://github.com/web-infra-dev/rspress/pull/3710): sites de documentação feitos com o framework deixam de dar erro na página quando alguém aperta Enter com a busca fechada.
- [NodeSecure/js-x-ray#723](https://github.com/NodeSecure/js-x-ray/pull/723): o scanner de segurança de pacotes npm passa a pegar importações escritas com crase, que antes escapavam do alerta.
- [punkpeye/fastmcp#392](https://github.com/punkpeye/fastmcp/pull/392): servidores MCP feitos com a biblioteca passam a anunciar do jeito certo as ferramentas que recebem pares de chave e valor.
- [alecthomas/chroma#1387](https://github.com/alecthomas/chroma/pull/1387): o colorizador de código passa a mostrar certo os números do Go moderno, como `0o644`.
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

- [Harness Engineering: uma fonte de verdade entre Cursor, Kiro, Codex e seus agentes](https://dev.to/tiagovilasboas/harness-engineering-uma-fonte-de-verdade-entre-cursor-kiro-codex-e-seus-agentes-4ji5): um repositório Git central com symlinks pra manter as mesmas regras e skills em todas as ferramentas de IA.
- [Antigravity Operator: Helping AI Coding Agents Stay on Track](https://dev.to/tiagovilasboas/antigravity-operator-helping-ai-coding-agents-stay-on-track-216n): memória de sessão, dashboard local e Chrome isolado pros agentes não perderem o fio.
- [Harness Engineer: como um knowledge base (RAG) centralizado pode impactar positivamente sua empresa](https://dev.to/tiagovilasboas/harness-engineer-como-um-knowledge-base-rag-centralizado-pode-impactar-positivamente-sua-empresa-2ako): a base de conhecimento que o agente consulta antes de comentar o PR.
- [Mesmo com GraphRAG, o agent se perde sem contrato de memória](https://dev.to/tiagovilasboas/mesmo-com-graphrag-o-agent-se-perde-sem-contrato-de-memoria-hc8): o contrato do que o agente pode lembrar e por onde ele entra, porque sem isso o índice só erra mais rápido.
- [+10% de vendas no checkout no mês. A campanha quebrava na hora de pagar](https://dev.to/tiagovilasboas/10-de-conversao-no-checkout-no-mes-a-campanha-quebrava-na-hora-de-pagar-5566): performance ligada ao resultado, não ao bundle isolado.
- [Observabilidade no frontend: o BFF respondia 200, mas o clique falhava](https://dev.to/tiagovilasboas/observabilidade-no-frontend-o-http-200-esconde-900-catch-vazios-53jd): falhas silenciosas no frontend e um caminho de instrumentação.
- [O prompt de AppSec que eu criei achou 4 gaps de segurança](https://dev.to/tiagovilasboas/prompt-appsec-4-gaps-autorizacao-1k77): evidência, falso-positivo e autorização antes de abrir uma issue.

[Ver todos os artigos no DEV.to](https://dev.to/tiagovilasboas)

## Formação

- Cursando **Graduação em Defesa Cibernética na Faculdade Impacta**.
- [Agentic AI with LangChain and LangGraph (IBM/Coursera)](https://www.coursera.org/account/accomplishments/verify/B27T6TUQO1NB), concluída em setembro de 2026.
- [Security Hardening (Google/Coursera)](https://www.coursera.org/account/accomplishments/verify/MGL4PB651JCX), concluída em setembro de 2026.
- [Claude Code: Engineering with AI Agents (Vanderbilt/Coursera)](https://www.coursera.org/account/accomplishments/verify/9EA34R2T1S8S), concluída em setembro de 2026.

[LinkedIn](https://www.linkedin.com/in/tiagovilasboas/) · [DEV.to](https://dev.to/tiagovilasboas)
