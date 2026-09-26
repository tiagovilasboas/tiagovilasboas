# Tiago Vilas Boas (Montanha) 🛵

**Staff Software Engineer · Harness Engineering · Agentic AI · AppSec**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiagovilasboas/)
[![DEV.to](https://img.shields.io/badge/DEV.to-0A0A0A?style=flat-square&logo=devdotto&logoColor=white)](https://dev.to/tiagovilasboas)

Construo condições para que as squads tomem boas decisões sem depender da minha memória.

Atuo com tecnologia desde 2006. Staff e Arquiteto Master. Hoje aplico Harness Engineering, Agentic AI e AppSec: arquitetura antes do código, agents com escopo, humano no loop e evidência que dá para reproduzir.

**Agora:** cursando **Graduação em Defesa Cibernética na Faculdade Impacta** e aplicando agents em fluxos reais de engenharia.

**Certificações recentes:**
- [Agentic AI with LangChain and LangGraph — IBM/Coursera](https://www.coursera.org/account/accomplishments/verify/B27T6TUQO1NB) · concluída em setembro de 2026.
- [Security Hardening — Google/Coursera](https://www.coursera.org/account/accomplishments/verify/MGL4PB651JCX) · concluída em setembro de 2026.

## Produto em execução

- [Quinto](https://quinto-eight.vercel.app/): ajuda a fechar as contas do mês e mostra quanto realmente sobra depois de pagar o que já tem valor. Dá pra instalar no celular e usar mesmo sem internet depois do primeiro acesso, e as mudanças sincronizam quando a rede volta.

  App no ar: [quinto-eight.vercel.app](https://quinto-eight.vercel.app/)

- [Frontend Architecture Playbook](https://frontend-architecture-playbook-eight.vercel.app): guia prático pra decidir como organizar o código de sites e apps, com os prós e contras de cada caminho explicados em tom de mentoria. Tudo parte de situações reais que vivi na carreira.

  App no ar: [frontend-architecture-playbook-eight.vercel.app](https://frontend-architecture-playbook-eight.vercel.app)

## Arquitetura, IA e engenharia

- [harness-downshift](https://github.com/tiagovilasboas/harness-downshift): corta o gasto com IA no código mandando cada subtarefa para o modelo do tamanho certo, o barato para o trabalho simples e o mais caro só para o difícil. A escolha segue regras fixas, sem outra IA decidindo, e o projeto ainda está em beta.

  Comando: `downshift try "rename the userId variable" claude-code`

- [agent-measurement](https://github.com/tiagovilasboas/agent-measurement): mede se um agente de IA fez mesmo o trabalho ou só disse que fez. Pega os casos de "falso ok", como o agente dar a tarefa por concluída enquanto uma senha vazou num e-mail que ele mesmo enviou.

  Comando: `./scripts/score.sh false-green`

- [agentic-code-review](https://github.com/tiagovilasboas/agentic-code-review): revisão automática de código que aponta o arquivo, a linha e o tipo de falha de segurança. Não usa IA na decisão, então o resultado é sempre o mesmo.

  Comando: `npm run review -- examples/sample-pr.diff`

- [sentry-golden-path](https://github.com/tiagovilasboas/sentry-golden-path): modelo pronto pra monitorar erros com o Sentry do jeito certo. Os testes falham se alguém tirar a proteção de dados pessoais ou quebrar a configuração.

  Comando: `npm test`

- [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture): como montei uma equipe de assistentes de IA que trabalham juntos, com aprovação humana nas ações de risco. As decisões estão documentadas, e um script confere se a troca de tarefas e os pedidos de aprovação seguem as regras.

  Comando: `node scripts/validate-all.mjs`

- [staff-impact-cases](https://github.com/tiagovilasboas/staff-impact-cases): casos reais e anonimizados do meu trabalho como Staff, avaliados por impacto, profundidade, escopo e decisão. São histórias, não código.

  Comando: `python3 scripts/check-case-headings.py`

- [react-layered-boilerplate](https://github.com/tiagovilasboas/react-layered-boilerplate): ponto de partida pra apps React bem organizados, com camadas separadas, tipagem estrita, testes e CI.

  Comando: `npm run dev`

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

Em revisão: contribuições abertas em MCP, Sentry e vercel/ai.
<!-- oss:end -->

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

