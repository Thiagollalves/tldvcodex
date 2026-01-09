import type { ChatMessage, DashboardMetric, Meeting } from "./types";

export const metrics: DashboardMetric[] = [
  { label: "Reuniões gravadas", value: "128", trend: "+18%" },
  { label: "Horas transcritas", value: "312h", trend: "+24%" },
  { label: "Tarefas geradas", value: "420", trend: "+12%" },
  { label: "Decisões capturadas", value: "96", trend: "+9%" }
];

export const meetings: Meeting[] = [
  {
    id: "m-001",
    title: "Daily Produto - Squad Atlas",
    date: "Hoje, 09:00",
    duration: "32m",
    platform: "Google Meet",
    status: "ready",
    language: "pt-BR",
    tags: ["daily", "produto", "prioridades"],
    summary: {
      headline: "Foco em estabilização do onboarding e priorização de feedbacks NPS.",
      bullets: [
        "Time de produto vai entregar ajuste de jornada até sexta.",
        "Marketing alinha campanha com novo posicionamento na segunda.",
        "Dados apontam queda de ativação no segundo passo."
      ],
      decisions: ["Manter feature flag para o novo fluxo até 25/08."],
      risks: ["Dependência do time de dados para liberar o dashboard v2."]
    },
    tasks: [
      { id: "t-001", title: "Revisar fluxo de onboarding", owner: "Lívia", due: "23/08" },
      { id: "t-002", title: "Criar experimento A/B", owner: "Rafael", due: "26/08" }
    ],
    participants: [
      { name: "Lívia", role: "PM" },
      { name: "Rafael", role: "Design" },
      { name: "Camila", role: "Dados" }
    ]
  },
  {
    id: "m-002",
    title: "Reunião Comercial - Acme Corp",
    date: "Ontem, 15:00",
    duration: "58m",
    platform: "Zoom",
    status: "processing",
    language: "en",
    tags: ["sales", "enterprise"],
    summary: {
      headline: "Cliente pediu proposta com integração SSO e SLA 99.9%.",
      bullets: ["Precisa de contrato anual com 300 licenças.", "Solicitou demo técnico com TI."],
      decisions: ["Enviar proposta até 30/08."],
      risks: ["Concorrente oferecendo desconto agressivo."]
    },
    tasks: [
      { id: "t-003", title: "Preparar proposta comercial", owner: "João", due: "30/08" }
    ],
    participants: [
      { name: "João", role: "Sales" },
      { name: "Maria", role: "CS" },
      { name: "Thomas", role: "Cliente" }
    ]
  },
  {
    id: "m-003",
    title: "1:1 Liderança",
    date: "12/08, 10:00",
    duration: "45m",
    platform: "Presencial",
    status: "queued",
    language: "pt-BR",
    tags: ["1:1", "liderança"],
    summary: {
      headline: "Alinhar metas trimestrais e roadmap de carreira.",
      bullets: ["Feedback positivo sobre liderança situacional."],
      decisions: ["Plano de desenvolvimento revisado até setembro."],
      risks: ["Carga de trabalho pode impactar qualidade."]
    },
    tasks: [
      { id: "t-004", title: "Atualizar PDI", owner: "Fernanda", due: "02/09" }
    ],
    participants: [
      { name: "Fernanda", role: "Diretora" },
      { name: "Lucas", role: "Gestor" }
    ]
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: "c-001",
    role: "assistant",
    content:
      "Olá! Posso ajudar com decisões, tarefas ou qualquer ponto da reunião. O que você precisa saber?"
  },
  {
    id: "c-002",
    role: "user",
    content: "Quais decisões foram tomadas na daily de hoje?"
  },
  {
    id: "c-003",
    role: "assistant",
    content: "A principal decisão foi manter a feature flag do novo fluxo até 25/08."
  }
];
