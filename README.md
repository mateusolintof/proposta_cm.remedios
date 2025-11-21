# Proposta — CM Remédios • Agentes de IA para Atendimento Comercial

Landing de proposta interativa para a CM Remédios, focada em **Agentes de IA para Atendimento Comercial**, com fluxos visuais, modais de detalhamento e mini‑dashboards para explicar a solução ponta a ponta.

---

## Stack e Tecnologias

- **Next.js 15.5.4** (App Router, diretório `src/app`)
- **React 19.1.0**
- **Tailwind CSS v4** com `@theme inline` (tokens definidos em `src/app/globals.css`)
- **Framer Motion** — animações de modais e transições suaves
- **Lucide React** — ícones
- **React Flow** — fluxogramas interativos com minimapa, controles e grid

Ferramentas de suporte:

- **TypeScript 5+**
- **ESLint 9+** com `next/core-web-vitals` + `next/typescript`
- **PostCSS** com `@tailwindcss/postcss`

---

## Como rodar (porta 3001)

Requisitos:

- Node **18+**

Passos:

1. Instalar dependências:
   - `npm install`
2. Ambiente de desenvolvimento:
   - `npm run dev` → `http://localhost:3001`
3. Build de produção:
   - `npm run build`
4. Servir build:
   - `npm start`

Scripts úteis:

- `npm run dev` — desenvolvimento (Turbopack)
- `npm run build` — build
- `npm start` — produção
- `npm run lint` — lint (ESLint)

---

## Estrutura do Projeto

Principais arquivos/pastas:

- `src/app/layout.tsx`
  - Define fontes (`Geist`, `Geist_Mono`, `Montserrat`).
  - Define `metadata.title` / `metadata.description` da proposta CM Remédios.
  - Aplica as variáveis de fonte no `body`.

- `src/app/globals.css`
  - Tokens de tema:
    - `--background`, `--foreground`
    - `--prime-primary`, `--prime-accent`, `--prime-dark`
  - Bloco `@theme inline` para Tailwind:
    - `--color-prime`, `--color-prime-accent`, `--color-prime-dark`
    - `--font-sans`, `--font-heading`, `--font-mono`
  - Utilitários:
    - `.section`, `.section-title`, `.subtitle`, `.btn-primary`, `.badge`, `.hero-kicker`, `.kicker`
  - Estilos de acessibilidade:
    - Foco visível
    - Respeito a `prefers-reduced-motion`
  - Estilos para nós do React Flow:
    - `.flow-node`, `.flow-node--primary`, `.flow-node--decision`, `.flow-node--output`

- `src/app/page.tsx`
  - Página principal da proposta (componente `Home`).
  - Campos específicos do cliente:
    - `preparedFor = "CM Remédios"`
    - `proposalDate = "Novembro 2025"`
  - Usa `dynamic()` para importar `FlowDiagram` sem SSR.
  - Controla o estado dos modais via `ModalKind` e `useState`.

- `src/app/components/Modal.tsx`
  - Componente de modal com animação (`framer-motion`) e overlay blur.
  - Propriedades:
    - `open`, `onClose`, `title`, `children`
    - `scrollContent?: boolean` (default: `true`)
    - `size?: "full" | "md"` (default: `"full"`)
  - Fecha com:
    - Tecla `ESC`
    - Clique no overlay

- `src/app/components/FlowDiagram.tsx`
  - `FlowKind = "agendamento" | "triagem-noshow" | "faq"`.
  - `nodesAndEdges(kind)` define nós/arestas para:
    - **Agendamento**:
      - SDR IA, qualificação, plano/particular, **Agenda Unificada (sistemas da clínica + particular)**, CRM.
    - **Triagem/No‑show**:
      - Lembretes D‑1, D‑2h, confirmação, reagendamento, fila de espera.
    - **FAQ**:
      - Procedimentos, recuperação, valores/convênios, corpo clínico, localização, escalonamento para humano.
  - Usa `ReactFlow`, `useNodesState`, `useEdgesState`, `addEdge`.
  - Respeita `prefers-reduced-motion` (desativa animação de arestas quando necessário).

- `src/app/components/Logo.tsx`
  - Exibe a logo do cliente com fallback entre:
    - `/branding/logo-21anos.png`
    - `/branding/cmremedios-logo.png`
    - `/branding/logo.svg`
  - Modos:
    - `mode="contain"` (default) — preserva proporção sem corte.
    - `mode="cover"` — preenche um container com `containerWidth`/`containerHeight`.

- `public/branding/`
  - `cmremedios-logo.png` — logo oficial capturada do site da clínica.
  - `logo-21anos.png` — variação comemorativa.
  - `logo-placeholder.svg` — placeholder para novas propostas.

- `public/prints/`
  - `gmn.png`, `avaliacao.png`, `reclameaqui1.png`, `reclameaqui2.png` — prints usados na seção de **Desafio Atual**.

- `public/docs/arquitetura.md`
  - Documento de diagnóstico/arquitetura com:
    - Gargalos (volume de leads, agendas desconectadas, falta de visibilidade, follow‑up).
    - Métricas (ex.: 150 leads/dia, estimativas de perdas, projeções de ganhos).
    - Descrição das soluções e módulos.
  - Vários textos e números dos painéis/modais são derivados desse documento.

---

## Seções da Página

IDs usados no nav (`href="#..."`):

1. `#hero` — **Hero**
   - Kicker: “PROPOSTA DE SOLUÇÃO COM IA”.
   - Título: “Agentes de IA para Atendimento Comercial”.
   - Subtítulo: automação da jornada (captação → agendamento → confirmação → follow‑up → inteligência).
   - Badges:
     - `Preparado para: CM Remédios`
     - `Data: Novembro 2025`
   - Logo em destaque usando `Logo` no modo `cover`.

2. `#desafio` — **Desafio Atual**
   - Prints de contexto (Google Meu Negócio, avaliações, Reclame Aqui).
   - Bloco “Gargalos Identificados” com:
     - Atendimento ineficiente.
     - Alto volume sem atendimento fora do horário comercial.
     - Múltiplos gaps em conferência de no-show, remarcação, informações de exames etc.

3. `#solucoes` — **Nossas Soluções**
   - 4 cards principais:
     - SDR Qualificador + Agendamento (WhatsApp).
     - FAQ Inteligente (educacional).
     - Anti No‑Show + Follow‑Up.
     - CRM + Dashboard.
   - Painel “Soluções Inteligentes”:
     - Dashboard em tempo real, CRM, predição, insights, relatórios.
   - Painel “Confiabilidade e Segurança”:
     - Fallback humano, monitoramento, LGPD, segurança, suporte.
   - Botão “Ver mais” → abre modal `valueinfo`.

4. `#oque-mudou` — **O que mudou?**
   - Coluna “OBJEÇÕES”:
     - Ex.: “robô não funciona”, “não integra com agenda”, “IA comete erros”.
   - Coluna “SOLUÇÕES”:
     - Sistema MultiAgent.
     - Sistemas modulares (FAQ, agendamento, turnos diferentes).
     - Estrutura de no‑show + fila de espera.
     - Agente de Pesquisa e Satisfação.

5. `#fluxos` — **Fluxo e Ferramentas Inteligentes**
   - Cards de “Agentes de IA”:
     - Cada card chama `setModal({ type: "solution", kind, title })` com um `FlowKind`.
   - Cards de “Ferramentas”:
     - **CRM Comercial** → modal `crm` com funis e leads.
     - **Dashboard** → modal `dashboard` com visão conceitual de gráficos/KPIs.

6. `#plano` — **Plano de Implantação**
   - 4 fases:
     - Fase 1: Imersão e Arquitetura.
     - Fase 2: Desenvolvimento dos Agentes.
     - Fase 3: Integrações e Painéis.
     - Fase 4: Go‑Live e Estabilização.
   - Cada fase abre modal `phases` com detalhes (objetivos, atividades, integrações, entregáveis).

7. `#ganhos` — **Ganhos Esperados**
   - Painéis com resultados (conversão, no‑show, número de consultas, receita estimada).
   - Botões que abrem:
     - `conquistas` — ganhos operacionais e comerciais.
     - `inteligencia` — inteligência em tempo real (KPIs, inteligência comercial, predição).
     - `insights` — insights acionáveis (melhor canal, objeções, horários).
     - `relatorios` — relatórios avançados (mês atual, pipeline, crescimento, jornada do paciente).
   - Inclui disclaimers: números são ilustrativos, alinhados ao doc de arquitetura.

8. `#entregaveis` — **O que será entregue**
   - Card “Setup Tecnológico”:
     - Agentes SDR, FAQ e No‑Show.
     - Integrações com agendas da clínica.
     - Painéis (CRM + Dashboard).
   - Card “Serviços & Garantias”:
     - Treinamento da equipe.
     - Monitoramento assistido.
     - LGPD, segurança, suporte com SLA.

9. `#roi` — **Viabilidade Financeira**
   - Cards com:
     - Leads/mês estimados.
     - Conversão projetada com IA.
     - Ticket médio de referência.
   - Botão “Abrir Calculadora de ROI” → modal `roi` com simulação conceitual.
   - Disclaimer: referências ilustrativas; ajustar com dados reais da CM Remédios.

10. `#investimento` — **Investimento**
    - Cards modulares:
      - Agente FAQ + Informações Gerais.
      - Agendamento Inteligente (destaque).
      - Agente Pré‑triagem + Anti No‑Show.
      - Agente Pós‑venda.
    - Cada card apresenta:
      - Valor de implementação (pagamento único).
      - Valor de recorrência mensal.
      - Itens incluídos (desenvolvimento, suporte, acesso a base de conhecimento etc.).
    - Card extra com visão de pacote completo/combinação de módulos.

11. `#cta` — **Próximos Passos**
    - Três passos:
      - Alinhamento final.
      - Aprovação da proposta.
      - Início do projeto.
    - Sem CTAs de marketing; foco em encaminhar o projeto.

---

## Modais e Fluxos

- Componente `Modal`
  - Animação com `framer-motion`.
  - Overlay com blur.
  - Fecha com `ESC` e clique fora.
  - `size="full"` para fluxos/CRM/Dashboard.
  - `size="md"` para comparativos, fases, insights, ROI.

- Modais de fluxo (`type: "solution"`)
  - Integram com `FlowDiagram`:
    - `kind="agendamento"`, `"triagem-noshow"`, `"faq"`.
  - Fluxos interativos:
    - Minimapa, zoom, pan.
    - Arestas animadas (desligadas em `prefers-reduced-motion`).

- Modal `crm`
  - Funis (principal, follow‑up, agendados) em layout Kanban.
  - Cada card de lead mostra:
    - Nome, especialidade, valor estimado.
    - Origem, tempo, horário, status.
  - Sidebar com total de leads, taxa de conversão, ticket médio.

- Modal `dashboard`
  - Estrutura de dashboard de gestão:
    - KPIs, funis e gráficos conceituais.
    - Filtros por período/canal (descritos em texto/UI).

- Modais `phases`, `valueinfo`, `conquistas`, `inteligencia`, `insights`, `relatorios`, `roi`
  - `phases`: detalhes por fase (objetivos, atividades, entregáveis).
  - `valueinfo`: comparação “gestão às cegas” vs “gestão com IA + dados”.
  - `conquistas`: ganhos operacionais e comerciais.
  - `inteligencia`: visão de inteligência em tempo real.
  - `insights`: exemplos práticos de insights acionáveis.
  - `relatorios`: relatórios executivos e detalhados, alinhados ao documento de arquitetura.
  - `roi`: simulador conceitual de ROI com mini‑charts em SVG.

---

## Identidade Visual

- Cores (definidas em `src/app/globals.css`):
  - `--prime-primary: #235aa0` — azul principal.
  - `--prime-accent: #f1c309` — amarelo de destaque.
  - `--prime-dark: #203158` — navy escuro para contraste.

- Logo:
  - Principal em `public/branding/cmremedios-logo.png` (extraída de `https://cmremedios.com.br/`).
  - Fallbacks em `logo-21anos.png` e `logo.svg`.

- Ícones (Lucide) usados em `page.tsx` (exemplos):
  - `CalendarCheck2`, `BellRing`, `MessageSquare`, `Stethoscope`,
  - `KanbanSquare`, `BarChart3`, `Trophy`, `Brain`,
  - `Lightbulb`, `FileBarChart`, `CheckCircle2`, `ShieldCheck`,
  - `Briefcase`, `Calculator`, `DollarSign`, `TrendingUp`, `ArrowRight`.

---

## Como adaptar para outro cliente

Passo a passo rápido:

1. Atualizar identidade:
   - `preparedFor` e `proposalDate` em `src/app/page.tsx`.
   - `metadata.title`/`description` em `src/app/layout.tsx`.
   - Logos em `public/branding/` (ajustar se necessário em `page.tsx` e `Logo.tsx`).
   - Cores em `src/app/globals.css` (`--prime-primary`, `--prime-accent`, `--prime-dark`).
2. Ajustar textos:
   - Seções de desafio, soluções, fluxos, ganhos, ROI, investimento, próximos passos.
   - Modais (CRM, Dashboard, fases, insights, relatórios, ROI).
   - Métricas e valores alinhados ao novo cliente.
3. Ajustar fluxos:
   - Atualizar `FlowKind` e `nodesAndEdges` em `FlowDiagram.tsx`.
   - Atualizar cards e botões na seção `#fluxos`.
4. Revisar:
   - Acessibilidade (alt, foco, contraste).
   - Responsividade (mobile/desktop).
   - Consistência entre números dos painéis e o documento de arquitetura do cliente.
