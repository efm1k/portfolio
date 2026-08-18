import type { Project } from "@/types/project";

export const aiSalesCopilot: Project = {
  slug: "ai-sales-copilot",
  title: "AI Sales Copilot",
  cardLine: "Lead processing pipeline, не chatbot",
  shortTask:
    "Контур разбора лидов: RAG, бизнес-правила, human approval и передача в CRM. Модель не пишет клиенту сама.",
  type: "ai-integration",
  stack: [
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "OpenAI / Anthropic API",
  ],
  cardStack: ["RAG", "Business rules", "Human review", "CRM handoff"],
  role: "Архитектура AI-контура, контракты LLM, retrieval, правила, UI разбора и Demo Auth.",
  features: [
    "Единый inbox обращений с канала Website / Telegram / Email",
    "Классификация intent и structured extraction через Pydantic",
    "Lexical RAG, prompt registry и защита от prompt injection",
    "Черновик ответа и очередь проверки без автоотправки клиенту",
  ],
  year: "2026",
  featured: true,
  featuredOrder: 2,
  presentation: "primary",
  nda: false,
  demoStatus: "live",
  demoDir: "demos/ai-sales-copilot",
  localUrl: "http://localhost:3003/demo",
  liveUrl: "https://efm1k-ai-sales-copilot.vercel.app/demo",
  githubUrl: "https://github.com/efm1k/ai-sales-copilot",
  coverImage: {
    src: "/projects/ai-sales-copilot/cover.webp",
    alt: "Карточка лида AI Sales Copilot: исходное обращение, анализ и human review",
    width: 1440,
    height: 900,
  },
  problem:
    "Входящие заявки приходят текстом с сайта, из почты и Telegram. Менеджер вручную понимает, это Mini App, legacy PHP, автоматизация или просто «сколько стоит сайт». Без схемы ответа модель легко выдумывает цену, а без человека черновик может уйти клиенту.",
  context:
    "AI Sales Copilot — публичный demo-контур для вымышленной студии PixelNord. Система показывает, как встроить LLM в sales-процесс на синтетических обращениях. Это не ChatGPT-клон, не клиентская CRM и не подключённый production LLM.",
  requirements: [
    "Нормализовать обращение в карточку Lead независимо от канала-источника",
    "Классифицировать intent и извлечь поля по схеме, а не свободным текстом",
    "Поднять релевантные knowledge-документы и показать источники",
    "Применить детерминированные бизнес-правила отдельно от reasoning модели",
    "Не отправлять ответ клиенту без Approve / Edit / Reject / Escalate",
    "Сохранять provider, модель, версию промпта, токены и правку человека",
  ],
  architecture: {
    summary:
      "Next.js даёт operations dashboard. FastAPI оркестрирует pipeline: LLMProvider, retrieval, prompt registry, guardrails и business rules. PostgreSQL хранит лиды, анализ, черновики, knowledge, прогоны модели и audit. n8n в репозитории только как пример канала, не как runtime-зависимость.",
    layers: [
      "Интерфейс: inbox, карточка лида, analysis, trace, human review",
      "FastAPI: auth/RBAC, leads, knowledge, prompts, audit",
      "AI Orchestrator: classify → extract → retrieve → rules → draft",
      "LLMProvider: mock / OpenAI / Anthropic, один и тот же pipeline",
      "PostgreSQL: лиды, knowledge chunks, prompt versions, executions",
    ],
  },
  implemented: [
    "Полный pipeline на FastAPI: сообщение проходит те же шаги для MockProvider и реальных API",
    "Structured output с retry/repair/fallback и валидацией Pydantic",
    "Lexical RAG с disabled-документами вне индекса и Sources used в карточке",
    "Правило не выдумывать цену на PRICING_REQUEST без требований",
    "Human-in-the-loop: AI и human версии черновика, отправка в Mock CRM только после Approve",
    "Prompt registry, AI executions, audit log, Demo Auth и роли Sales / Admin / Viewer",
  ],
  responsibility: [
    "Граница, где заканчивается LLM и начинается правило или человек",
    "Абстракция провайдера и версионирование промптов",
    "Защита RAG-контура от prompt injection и утечки system prompt",
    "UI разбора, который показывает, что именно сделал AI",
  ],
  technologies: [
    {
      name: "Python / FastAPI",
      purpose: "Оркестрация pipeline, валидация, RBAC и API для dashboard",
    },
    {
      name: "LLMProvider",
      purpose: "Mock, OpenAI и Anthropic за одним интерфейсом; demo работает без ключей",
    },
    {
      name: "PostgreSQL + SQLAlchemy",
      purpose: "Лиды, knowledge, промпты, прогоны модели, review и audit",
    },
    {
      name: "Next.js",
      purpose: "Operations dashboard: inbox, inspector, knowledge admin, Demo Auth",
    },
  ],
  technicalDecisions: [
    "Human-in-the-loop обязателен: модель готовит черновик, отправка в CRM — отдельная команда оператора.",
    "Ответ модели принимается только как JSON по схеме. Свободный текст не пишется в поля лида.",
    "Business rules считаются отдельно от confidence модели: низкая уверенность эскалирует, pricing без данных не получает выдуманную оценку.",
    "Retrieved documents считаются недоверенным контентом и не могут подменить system prompt.",
    "Retrieval лексический, без vector DB: для demo это воспроизводимее, чем pgvector ради стека.",
    "Demo Auth доступен только при DEMO_MODE=true и отделён от production login.",
  ],
  challenges: [
    "Не дать модели назвать цену на «Сколько стоит сайт?», даже если classification confidence высокий.",
    "Обработать prompt injection, не потеряв содержательную часть запроса.",
    "Показать оператору sources, trace и версии промпта без скрытого chain-of-thought.",
  ],
  outcome:
    "Менеджер открывает уже размеченное обращение: intent, поля, источники, черновик и trace. Автоотправки клиенту нет. Публичный demo работает через Demo AI Provider, без внешних ключей.",
  screenshots: [
    {
      src: "/projects/ai-sales-copilot/cover.webp",
      alt: "Карточка обращения с extraction, источниками RAG и очередью проверки менеджером",
      width: 1440,
      height: 900,
      title: "Human review",
      caption:
        "Черновик, источники knowledge и решение человека. Автоотправки клиенту нет.",
    },
    {
      src: "/projects/ai-sales-copilot/inbox.webp",
      alt: "Inbox входящих лидов AI Sales Copilot",
      width: 1440,
      height: 900,
      title: "Очередь разбора",
      caption:
        "Intent, confidence и статус. Синтетические обращения PixelNord, не клиентская почта.",
    },
  ],
};
