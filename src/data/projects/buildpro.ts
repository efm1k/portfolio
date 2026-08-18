import type { Project } from "@/types/project";

export const buildpro: Project = {
  slug: "buildpro",
  title: "BuildPro",
  cardLine: "Laravel-сайт с CMS и lead workflow",
  shortTask:
    "Коммерческий PHP-сайт: CMS, заявки в SQL, SEO и очередь доставки в CRM. Не конкурирует с кейсом модернизации legacy.",
  type: "commercial-site",
  stack: [
    "PHP 8.4",
    "Laravel",
    "Blade",
    "PostgreSQL",
    "Tailwind CSS",
    "REST API",
  ],
  cardStack: ["Laravel", "CMS", "Lead workflow", "SEO"],
  role: "Full-stack: публичный сайт, PHP/Laravel backend, CMS-админка, формы, CRM-абстракция, SEO, тесты.",
  features: [
    "Многостраничный коммерческий сайт услуг и проектов",
    "Заявка с серверной валидацией, honeypot и записью в PostgreSQL",
    "Админка контента и заявок с ролями ADMIN / CONTENT_MANAGER",
    "Очередь доставки в CRM: заявка не теряется при сбое интеграции",
  ],
  year: "2026",
  featured: true,
  featuredOrder: 5,
  presentation: "secondary",
  nda: false,
  demoStatus: "ready",
  demoDir: "demos/buildpro",
  localUrl: "http://localhost:3004",
  localAdminUrl: "http://localhost:3004/admin/demo",
  coverImage: {
    src: "/projects/buildpro/cover.webp",
    alt: "Секция проектов на публичном сайте BuildPro Engineering",
    width: 1440,
    height: 605,
  },
  problem:
    "Подрядчику нужен сайт, который продаёт услуги и принимает заявки в реестр, а не витрина-заглушка. Контент должен править менеджер без IDE. Форма должна доходить до базы и интеграции, даже если внешняя CRM временно недоступна.",
  context:
    "BuildPro — публичный demo коммерческого сайта вымышленной компании BuildPro Engineering (г. Каменный Бор). Кейс воспроизводит контур «сайт + Laravel + заявка + админка + CRM» на синтетических услугах, проектах и лидах. Это не сайт реального подрядчика и не внутренняя сервисная система.",
  requirements: [
    "Публичные страницы: главная, услуги, проекты, о компании, контакты, заявка",
    "Контент услуг и проектов в БД, редактирование из админки",
    "Заявка: CSRF, серверная проверка, honeypot, throttle, запись в SQL",
    "После сохранения — audit, уведомление и очередь CRM",
    "Роли: администратор и контент-менеджер",
    "SEO: метаданные, sitemap, robots, schema.org без фейковых рейтингов",
    "Небольшой REST API v1 для интеграций",
  ],
  architecture: {
    summary:
      "Laravel рендерит публичный сайт Blade-шаблонами и ту же модель отдаёт админке. PostgreSQL хранит услуги, проекты, заявки, медиа, настройки и журнал интеграций. CreateLeadAction сначала пишет Lead, затем LeadCreated ставит в очередь доставку в CRMProvider. Mock и webhook — одна абстракция.",
    layers: [
      "Публичный сайт: Blade, Tailwind, минимальный Alpine",
      "Application: Form Requests, actions, policies, events",
      "Очередь: DeliverLeadToCrmJob, retries, IntegrationEvent",
      "PostgreSQL: контент, заявки, audit, медиа",
      "Админка: dashboard, leads, CMS услуг и проектов",
    ],
  },
  implemented: [
    "Коммерческий публичный сайт на Blade без React-фронта",
    "Форма заявки с серверной валидацией, honeypot и rate limit",
    "CreateLeadAction → LeadCreated → notification, audit, queue CRM",
    "MockCRMProvider и WebhookCRMProvider: сбой CRM не удаляет Lead",
    "Админка: заявки, CRUD услуг и проектов, медиа, пользователи, настройки",
    "REST API /api/v1, sitemap из активного контента, безопасные загрузки",
  ],
  responsibility: [
    "Структура коммерческого сайта и Laravel-backend",
    "Модель контента, заявок и интеграционных событий",
    "Граница: сначала SQL, потом внешняя CRM",
    "SEO публичных страниц и закрытие admin от индекса",
  ],
  technologies: [
    {
      name: "PHP 8.4 / Laravel / Blade",
      purpose: "Серверный рендер сайта, формы, админка и очередь без отдельного React SPA",
    },
    {
      name: "PostgreSQL + Eloquent",
      purpose: "Услуги, проекты, заявки, события CRM, audit, настройки",
    },
    {
      name: "CRMProvider + queue",
      purpose: "Mock и webhook за одним интерфейсом; доставка после ответа пользователю",
    },
    {
      name: "nginx + PHP-FPM",
      purpose: "Отдача сайта и разделение статики и PHP, порт demo 3004",
    },
  ],
  technicalDecisions: [
    "Публичный frontend — Blade, не Next.js: PHP остаётся центром проекта.",
    "Заявка считается принятой после записи в БД. CRM — асинхронное следствие, не условие успеха.",
    "Demo-вход работает только при DEMO_MODE=true и логинит пользователя из базы, не через query-параметр.",
    "Sitemap собирается из опубликованного контента. Admin, login и черновики не попадают в индекс.",
    "Загрузки проверяют MIME и размер, имя файла генерируется, path traversal отсекается.",
  ],
  challenges: [
    "Сделать сайт визуально коммерческим, а не копией сервисного дашборда.",
    "Не потерять заявку, если webhook CRM отвечает 503: success пользователю, retry в очереди.",
    "Дать контент-менеджеру CMS-контур и закрыть ему пользователей и системные настройки.",
  ],
  outcome:
    "Сайт принимает заявку в PostgreSQL, показывает номер обращения и ставит доставку в CRM в очередь. Редактор меняет услуги и проекты из админки. Публичный demo работает без внешних ключей, на синтетических данных BuildPro Engineering.",
  screenshots: [
    {
      src: "/projects/buildpro/cover.webp",
      alt: "Блок проектов на коммерческом сайте BuildPro",
      width: 1440,
      height: 605,
      title: "Публичный сайт",
      caption:
        "Витрина услуг и объектов. Компания вымышлена, это не клиентский подрядчик.",
    },
    {
      src: "/projects/buildpro/leads.webp",
      alt: "Админка заявок BuildPro",
      width: 1440,
      height: 900,
      title: "Заявки в админке",
      caption:
        "Lead workflow: запись в SQL, затем очередь CRM. Данные синтетические.",
    },
  ],
};
