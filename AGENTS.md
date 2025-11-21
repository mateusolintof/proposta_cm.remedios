Template de Propostas — Guia do Projeto

## 1. Propósito do Template
- Template para criar propostas interativas (landing de proposta) com conteúdo adaptável por cliente.
- Estrutura modular: seções, modais e fluxos podem ser ativados/ajustados conforme a necessidade.
- Este repositório está atualmente configurado para a proposta **CM Remédios • Agentes de IA para Atendimento Comercial**.

## 2. Stack, Ferramentas e Configuração
- **Stack principal**
  - Next.js **15.5.4** (App Router, `src/app`)
  - React **19.1.0**
  - Tailwind CSS **v4** com `@theme inline` (configurado em `src/app/globals.css`)
  - Framer Motion (animações de modais e respeito a `prefers-reduced-motion`)
  - Lucide React (ícones)
  - React Flow (fluxogramas interativos, carregado apenas no cliente)
- **Configuração de build / lint**
  - `next.config.ts` com `NextConfig` padrão (sem ajustes especiais por enquanto).
  - `tsconfig.json` com `strict: true`, `moduleResolution: "bundler"` e alias `@/* -> ./src/*`.
  - ESLint (`eslint.config.mjs`) extendendo `next/core-web-vitals` + `next/typescript`.
  - PostCSS (`postcss.config.mjs`) com `@tailwindcss/postcss`.

## 3. Execução e Scripts
- Requisitos: **Node 18+**.
- Scripts (`package.json`):
  - `npm run dev` — desenvolvimento com Turbopack em `http://localhost:3001`.
  - `npm run build` — build de produção (`next build --turbopack`).
  - `npm start` — start de produção (`next start`).
  - `npm run lint` — roda ESLint.

## 4. Estrutura de Pastas e Arquivos Principais
- `src/app/layout.tsx`
  - Define fontes (`Geist`, `Geist_Mono`, `Montserrat`) via `next/font`.
  - Define `metadata` (título e descrição da proposta atual).
  - Envolve toda a aplicação e aplica variáveis de fonte no `body`.
- `src/app/globals.css`
  - Declara tokens de tema globais:
    - `--background`, `--foreground`.
    - `--prime-primary`, `--prime-accent`, `--prime-dark` (cores principais da identidade).
  - Bloco `@theme inline` mapeia tokens para Tailwind:
    - `--color-prime`, `--color-prime-accent`, `--color-prime-dark`.
    - `--font-sans`, `--font-heading`, `--font-mono`.
  - Utilitários globais:
    - Classes como `.section`, `.section-title`, `.subtitle`, `.btn-primary`, `.badge`, `.hero-kicker`, `.kicker`.
    - Estilos de foco visível e regra de `prefers-reduced-motion`.
  - Estilos para nós do React Flow:
    - `.flow-node`, `.flow-node--primary`, `.flow-node--decision`, `.flow-node--output`.
- `src/app/page.tsx`
  - Componente `Home` da landing de proposta.
  - Define `preparedFor = "CM Remédios"` e `proposalDate = "Novembro 2025"` (atualizar por cliente).
  - Usa `dynamic()` para carregar `FlowDiagram` com `ssr: false`.
  - Controla o estado dos modais via `ModalKind` e `useState`.
  - Seções principais da página (IDs usados no nav):
    - `hero` — Hero/Kicker.
    - `desafio` — Desafio Atual.
    - `solucoes` — Nossas Soluções.
    - `oque-mudou` — Objeções vs Soluções (comparativo).
    - `fluxos` — Fluxo e Ferramentas Inteligentes (React Flow + cards de ferramentas).
    - `plano` — Plano de Implantação.
    - `ganhos` — Ganhos Esperados.
    - `entregaveis` — O que será entregue.
    - `roi` — Viabilidade Financeira (simulador/mini‑charts).
    - `investimento` — Investimento modular + pacote completo.
    - `cta` — Próximos Passos.
  - Nav sticky (header) com âncoras para as seções acima.
  - Usa `Logo` no hero (`mode="cover"`) para exibir a identidade do cliente.
- `src/app/components/Modal.tsx`
  - Modal controlado por `open`/`onClose`.
  - Usa `framer-motion` para transições (overlay + conteúdo).
  - Bloqueia scroll de `body` quando aberto.
  - Fecha com `ESC` e clique no overlay.
  - Prop `size`:
    - `"full"`: modal full-screen (fluxos, CRM, Dashboard).
    - `"md"`: modal médio centralizado (comparativos, briefings, ROI, etc.).
- `src/app/components/FlowDiagram.tsx`
  - Define o tipo `FlowKind = "agendamento" | "triagem-noshow" | "faq"`.
  - Função `nodesAndEdges(kind)` retorna nós e arestas específicos por fluxo:
    - `agendamento`: fluxo de SDR IA com **Agenda Unificada (sistemas da clínica + particular)** e registro no CRM.
    - `triagem-noshow`: fluxo de lembretes D‑1/D‑2h, confirmação, reagendamento e fila de espera.
    - `faq`: fluxo de FAQ Inteligente (procedimentos, recuperação, valores/convênios, corpo clínico, localização) com escalonamento para humano.
  - Usa `ReactFlow`, `useNodesState`, `useEdgesState`, `addEdge`.
  - Respeita `prefers-reduced-motion` (desativa `animated` nas arestas quando necessário).
- `src/app/components/Logo.tsx`
  - Componente utilitário para logo do cliente.
  - Props:
    - `mode: "contain" | "cover"` (default: `"contain"`).
    - `containerWidth`/`containerHeight` para `mode="cover"`.
  - Tenta carregar várias fontes em fallback:
    - `/branding/logo-21anos.png`
    - `/branding/cmremedios-logo.png`
    - `/branding/logo.svg`
  - Usa `<img>` com `onError` para avançar para o próximo asset.
- `public/branding/`
  - `cmremedios-logo.png` — logo oficial da CM Remédios.
  - `logo-21anos.png` — logo comemorativa (fallback).
  - `logo-placeholder.svg` — placeholder para novas propostas.
  - `README.md` — anotações específicas de branding (se necessário).
- `public/prints/`
  - `gmn.png`, `avaliacao.png`, `reclameaqui1.png`, `reclameaqui2.png` — prints usados na seção **Desafio Atual**.
- `public/docs/arquitetura.md`
  - Documento de diagnóstico/arquitetura com métricas, gargalos e modelo de solução (fonte para os números e textos dos painéis/modais).

## 5. Branding, Tema e Identidade
- Identificação do cliente
  - Atualizar em `src/app/page.tsx`:
    - `preparedFor` — nome da organização (ex.: `"CM Remédios"`).
    - `proposalDate` — data da proposta (ex.: `"Novembro 2025"`).
  - Atualizar `metadata.title`/`metadata.description` em `layout.tsx` quando mudar de cliente.
- Logos
  - Colocar a logo principal em `public/branding/` (ex.: `logo.svg` ou `cliente-logo.png`).
  - Header usa `next/image` em `page.tsx` (`/branding/...`).
  - O hero usa o componente `Logo` com fallback entre arquivos.
- Cores (tema)
  - Em `src/app/globals.css`, ajustar:
    - `--prime-primary` (cor principal).
    - `--prime-accent` (cor de destaque).
    - `--prime-dark` (tom escuro para textos/destaques).
  - Boas práticas:
    - Garantir contraste mínimo AA (WCAG) para textos e botões.
    - Evitar cores hardcoded nas seções — preferir tokens.
- Tipografia
  - `Montserrat` como fonte principal (headings e corpo).
  - `Geist` e `Geist_Mono` disponíveis; usar preferencialmente `--font-montserrat` via `@theme`.

## 6. Conteúdo da Página por Seção
- **Hero (`#hero`)**
  - Kicker: `"PROPOSTA DE SOLUÇÃO COM IA"`.
  - Título: benefício claro (ex.: “Agentes de IA para Atendimento Comercial”).
  - Subtítulo: frase curta de valor (automação ponta a ponta).
  - Badges com `preparedFor` e `proposalDate`.
  - Logo em destaque (modo `cover`) ao lado direito.
- **Desafio Atual (`#desafio`)**
  - Contexto do cliente (volume de leads, agenda, visibilidade).
  - Prints reais (`/prints/...`) com avaliações e reclamações.
  - Bloco “Gargalos Identificados” com lista de problemas operacionais/comerciais.
- **Nossas Soluções (`#solucoes`)**
  - 4 cards principais:
    - SDR Qualificador + Agendamento (WhatsApp).
    - FAQ Inteligente (Educacional).
    - Anti No‑Show + Follow‑Up.
    - CRM + Dashboard.
  - Painel “Soluções Inteligentes” com CRM, Dashboard, predição, insights e relatórios.
  - Painel “Confiabilidade e Segurança” (fallback humano, monitoramento, LGPD, segurança, suporte).
  - Botão “Ver mais” abre modal `valueinfo`.
- **O que mudou? (`#oque-mudou`)**
  - Coluna “OBJEÇÕES” com objeções comuns a IA/robôs/integrações.
  - Coluna “SOLUÇÕES” com:
    - Sistema MultiAgent.
    - Sistemas Modulares (FAQ, Agendamento, fluxos específicos por turno).
    - No‑show e fila de espera.
    - Agente de Pesquisa e Satisfação.
- **Fluxo e Ferramentas Inteligentes (`#fluxos`)**
  - Cards de “Agentes de IA” mapeando para `FlowKind`:
    - Agente de Agendamento (kind `"agendamento"`).
    - Agente Anti No‑Show / Pré‑triagem (kind `"triagem-noshow"`).
    - FAQ Inteligente (kind `"faq"`).
    - Botão “Ver fluxo” abre modal `{ type: "solution", kind, title }` com `FlowDiagramLazy`.
  - Cards de “Ferramentas”:
    - CRM Comercial — abre modal `crm`.
    - Dashboard de Gestão — abre modal `dashboard`.
- **Plano de Implantação (`#plano`)**
  - 4 fases em cards clicáveis:
    - Fase 1: Imersão e Arquitetura.
    - Fase 2: Desenvolvimento dos Agentes.
    - Fase 3: Integrações e Painéis.
    - Fase 4: Go‑Live e Estabilização.
  - Ao clicar, abre modal `phases` com `PhaseDetailModalContent` (objetivos, atividades, entregáveis).
- **Ganhos Esperados (`#ganhos`)**
  - Painéis com resultados esperados (aumento de conversão, redução de no‑show, aumento de consultas).
  - Botões para modais:
    - `conquistas` — ganhos operacionais e comerciais.
    - `inteligencia` — inteligência em tempo real.
    - `insights` — exemplos de insights acionáveis.
    - `relatorios` — relatórios avançados com cruzamento de dados (inclui versão alinhada ao doc de arquitetura).
  - Sempre incluir disclaimer: números ilustrativos; ajustar para dados reais.
- **O que será entregue (`#entregaveis`)**
  - Card “Setup Tecnológico” (agentes, integrações, painéis).
  - Card “Serviços & Garantias” (treinamento, monitoramento assistido, LGPD e suporte).
- **Viabilidade Financeira / ROI (`#roi`)**
  - Cards com três métricas base (leads/mês, conversão projetada, ticket médio).
  - Botão “Abrir Calculadora de ROI” → modal `roi`:
    - Simulação de recuperação de leads e aumento de receita.
    - mini‑charts em SVG para tendências.
  - Disclaimer explícito sobre números ilustrativos.
- **Investimento (`#investimento`)**
  - Cards de módulos:
    - Agente FAQ + Informações Gerais.
    - Agendamento Inteligente (destaque).
    - Agente Pré‑triagem + Anti No‑Show.
    - Agente Pós‑venda.
  - Valores de implementação (one‑shot) + recorrência.
  - Card com resumo de pacote completo, condições gerais e observações.
- **Próximos Passos (`#cta`)**
  - 3 passos:
    - Alinhamento final.
    - Aprovação da proposta.
    - Início do projeto.
  - Evitar CTAs de marketing (ex.: “comprar agora”); foco em passos de projeto.

## 7. Modais — Conteúdo e Formato
- Componente base (`Modal.tsx`)
  - `size="full"` para fluxos complexos (React Flow, CRM, Dashboard).
  - `size="md"` para comparativos, fases, insights, ROI etc.
  - Acessibilidade:
    - `role="dialog"` + `aria-modal="true"`.
    - Fecha com tecla ESC.
    - Clique no overlay fecha o modal.
- Modais de Fluxo (`type: "solution"`)
  - Usam `FlowKind` em `FlowDiagram`.
  - Cada fluxo com 6–12 nós, textos curtos e arestas animadas.
  - Estilização usa classes `.flow-node*` definidas em `globals.css`.
- Modal `crm`
  - Kanban com funis:
    - Funil principal, Follow‑up, Agendados.
    - Cada coluna com cards de leads (especialidade, valor, origem, status).
  - Sidebar com indicadores: total de leads, taxa de conversão, ticket médio.
- Modal `dashboard`
  - Estrutura de “Dashboard” com abas conceituais:
    - Visão geral, funil de conversão, visão de agendamentos.
  - Cards de KPIs, mini‑gráficos e explicações textuais.
- Modal `phases`
  - Usa `PhaseDetailModalContent` com listas de itens por fase (objetivos, atividades, integrações, entregáveis).
- Modal `valueinfo`
  - Comparativo “gestão às cegas” vs “gestão inteligente”.
  - Destaque para visibilidade de CRM, dashboards e relatórios.
- Modais `conquistas`, `inteligencia`, `insights`, `relatorios`
  - **Conquistas**: ganhos operacionais (24/7, automação, agenda unificada, follow‑up).
  - **Inteligência**: métricas operacionais, inteligência comercial e análise preditiva.
  - **Insights**: insights táticos (melhores horários, objeções recorrentes, canais mais rentáveis).
  - **Relatórios**: visão executiva e detalhada; versão alinhada com métricas do doc de arquitetura.
- Modal `roi`
  - Simulador conceitual de ROI (leads, conversão, ticket, receita estimada).
  - Inclui texto de orientação e disclaimers.

## 8. Fluxos (React Flow) — Como editar/criar
- Para adicionar um novo fluxo:
  1. Em `src/app/components/FlowDiagram.tsx`:
     - Atualize `export type FlowKind` com o novo identificador.
     - Adicione um `case` em `nodesAndEdges(kind)` retornando `nodes` e `edges`.
  2. Em `src/app/page.tsx`:
     - Adicione um card na seção `#fluxos` mapeando para o novo `FlowKind`.
     - O botão “Ver fluxo” deve abrir `{ type: "solution", kind: <novoKind>, title: "<Nome do fluxo>" }`.
- Boas práticas de fluxos:
  - 6–12 nós por diagrama.
  - Títulos curtos, foco em legibilidade.
  - Cores consistentes com tema (usar classes `.flow-node*`).
  - Usar `fitViewOptions` para enquadramento adequado.

## 9. Estilo, Conteúdo e Convenções
- Linguagem
  - Português (pt‑BR), tom consultivo e direto.
  - Focar em benefícios e impacto (evitar jargão excessivo).
- Código
  - TypeScript com tipos explícitos para props e estruturas (ex.: `FlowKind`, `ModalKind`).
  - Evitar variáveis de uma letra e comentários supérfluos.
  - Manter consistência com a estrutura atual de `page.tsx` (seções e modais).
- CSS / Tailwind
  - Priorizar tokens definidos em `globals.css` ao invés de cores hardcoded.
  - Reutilizar utilitários (`.section`, `.card`, `.btn-primary`, `.badge`).
  - Ícones Lucide entre 16–20 px nos cards.

## 10. Acessibilidade e Desempenho
- Acessibilidade
  - Fornecer `alt` descritivo para logos/imagens (prints, logos, ícones relevantes).
  - Garantir contraste mínimo AA para textos e botões.
  - `prefers-reduced-motion: reduce` já tratado em `globals.css` e no React Flow.
- Desempenho
  - Prefira SVG para logos e ícones; otimize PNG/JPG.
  - Evitar imagens pesadas no hero; reaproveitar assets em `public/branding/` e `public/prints/`.
  - React Flow é carregado via `dynamic` (`ssr: false`) — manter esse padrão.

## 11. Como Adaptar para um Novo Cliente
1. Duplicar este repositório ou criar um novo branch.
2. Atualizar identidade:
   - `preparedFor` e `proposalDate` em `src/app/page.tsx`.
   - `metadata` em `src/app/layout.tsx`.
   - Logos em `public/branding/` (ajustar paths em `page.tsx` e `Logo.tsx`, se necessário).
   - Cores em `src/app/globals.css` (`--prime-*`).
3. Ajustar conteúdo:
   - Revisar todas as seções em `page.tsx` (Desafio, Soluções, Fluxos, Ganhos, ROI, Investimento, CTA).
   - Atualizar métricas e valores (ROI, ganhos, investimento) conforme dados do cliente.
4. Ajustar fluxos:
   - Atualizar `nodesAndEdges` em `FlowDiagram.tsx` e cards da seção `#fluxos`.
5. Revisar acessibilidade, responsividade e contraste.

## 12. Repositório e Fluxo de Trabalho
- Este template começa sem remoto. Quando necessário, crie o remoto e configure `origin`.
- Padrão de commits sugerido:
  - `feat:`, `chore:`, `fix:`, `refactor:`, etc.
- Antes de entregar:
  - Rodar `npm run lint` e `npm run build` localmente.

## 13. Checklist de Entrega
- [ ] Atualizar `preparedFor` e `proposalDate` em `src/app/page.tsx`.
- [ ] Substituir o logo do cliente em `public/branding/` e garantir fallback correto em `Logo.tsx`.
- [ ] Ajustar `--prime-*` em `src/app/globals.css` conforme a identidade do cliente.
- [ ] Revisar textos de seções e modais para o contexto do cliente (incluindo métricas e exemplos).
- [ ] Validar contraste, acessibilidade (foco/alt) e responsividade (mobile/desktop).
- [ ] Conferir métricas/valores, adicionar disclaimers onde necessário (ROI, ganhos, relatórios).
- [ ] Validar fluxos do React Flow (nós, arestas, fitView).
