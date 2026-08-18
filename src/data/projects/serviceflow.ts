import type { Project } from "@/types/project";

export const serviceflow: Project = {
  slug: "serviceflow",
  title: "ServiceFlow",
  cardLine: "B2B-система сервисных заявок",
  shortTask:
    "Multi-tenant система обработки сервисных заявок с SLA, ролями и изоляцией организаций.",
  type: "web-app",
  stack: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Zod",
    "React Hook Form",
    "Tailwind CSS",
  ],
  cardStack: ["Multi-tenant", "SLA", "RBAC", "PostgreSQL"],
  role: "Full-stack: предметная модель, RBAC, SLA, API, desktop-first UI диспетчера и Demo Auth.",
  features: [
    "Реестр заявок с поиском, фильтрами, сортировкой и пагинацией",
    "Карточка заявки: timeline, публичные и внутренние комментарии, работы, материалы, вложения",
    "Роли: клиент, диспетчер, исполнитель, администратор",
    "SLA с дедлайном, overdue / near breach / fulfilled",
    "Дашборд очереди, приоритетов и загрузки исполнителей",
  ],
  year: "2026",
  featured: true,
  featuredOrder: 1,
  presentation: "primary",
  nda: false,
  demoStatus: "ready",
  demoDir: "demos/serviceflow",
  localUrl: "http://localhost:3002/demo",
  coverImage: {
    src: "/projects/serviceflow/cover.webp",
    alt: "Дашборд ServiceFlow: очередь заявок, SLA и загрузка исполнителей",
    width: 1440,
    height: 900,
  },
  problem:
    "Сервисная компания принимает заявки из нескольких каналов и ведёт их в переписке и таблицах. Нет единого статуса, непонятно, кто отвечает за заявку, и сложно восстановить историю по объекту. Клиент не должен видеть внутренние заметки и чужие организации.",
  context:
    "ServiceFlow — публичный demo-проект. Он воспроизводит класс задачи «диспетчеризация заявок» на синтетических данных вымышленных заказчиков Nord Office Group, Vector Retail и Aurora Medical. Это не клиентская система: названия объектов, сотрудники и заявки вымышлены. Центральный demo-кейс — заявка SF-1024.",
  requirements: [
    "Единый реестр заявок с явным жизненным циклом статусов",
    "Назначение исполнителя и передача заявки без потери контекста",
    "Разделение публичных комментариев и внутренних заметок на API, не только в UI",
    "Multi-tenant изоляция организаций на сервере",
    "SLA по приоритету: первый ответ, решение, overdue",
    "Компактный admin: организации, пользователи, объекты, категории, SLA, audit log",
  ],
  architecture: {
    summary:
      "Монолитное web-приложение: Next.js отвечает за desktop-first интерфейс и server-side API. PostgreSQL хранит заявки, организации, объекты, SLA и журнал событий. Бизнес-правила переходов статусов, RBAC и tenant-scope сосредоточены в доменном слое. Demo Auth и credentials-login разделены.",
    layers: [
      "Интерфейс: sidebar, дашборд, таблица заявок, карточка, admin",
      "Application layer: создание, статус, назначение, комментарии, работы, вложения",
      "Authorization / business rules: RBAC, tenant isolation, state machine, SLA",
      "Prisma + PostgreSQL",
      "Файлы: StorageProvider (local disk, контракт под S3)",
    ],
  },
  implemented: [
    "Предметная модель заявки: организация, объект, категория, приоритет, статус, исполнитель, SLA-дедлайны",
    "Конечный автомат статусов с запретом недопустимых переходов по роли",
    "Карточка заявки с единым timeline, work log и материалами",
    "Фильтры и поиск в query string",
    "Серверный RBAC: клиент не видит чужую организацию и internal notes",
    "Demo Auth на /demo при DEMO_MODE=true и отдельный /login",
    "Audit log и in-app уведомления",
  ],
  responsibility: [
    "Проектирование модели данных, SLA и статусной модели",
    "Реализация API и серверной валидации",
    "Desktop-first интерфейс диспетчера и карточки заявки",
    "Роли, tenant isolation, audit и ограничения на internal notes",
  ],
  technologies: [
    {
      name: "Next.js / TypeScript",
      purpose: "Интерфейс диспетчера, Demo Auth и server-side обработка команд",
    },
    {
      name: "Prisma + PostgreSQL",
      purpose: "Заявки, организации, объекты, пользователи, SLA, журнал событий",
    },
    {
      name: "REST API + Zod + React Hook Form",
      purpose: "Контракт создания и обновления заявок, проверка входных данных",
    },
    {
      name: "Tailwind CSS",
      purpose: "Плотный рабочий интерфейс без лишнего визуального шума",
    },
  ],
  technicalDecisions: [
    "Статусы заявки реализованы как явный state machine: UI показывает только допустимые для роли действия.",
    "Клиентские данные режутся по organizationId на сервере. Скрытие элементов интерфейса не считается защитой.",
    "Internal notes отфильтровываются в сериализации API: клиентский ответ их не содержит.",
    "Фильтры сериализуются в query string, чтобы смену можно было открыть по ссылке.",
    "Demo Auth — отдельный endpoint, доступный только при DEMO_MODE=true.",
    "Смена статуса, history, audit и уведомление пишутся в одной транзакции.",
    "Файлы проходят MIME-sniff, лимит размера и StorageProvider без path traversal.",
  ],
  challenges: [
    "Согласовать статусы от новой заявки до закрытия так, чтобы они отражали выезд, согласование и подтверждение клиента.",
    "Не отдать внутреннюю заметку клиенту ни в карточке, ни в comments API.",
    "Ограничить права исполнителя: свои заявки и отчёт, без назначения и admin-операций.",
    "Показать SLA без enterprise-движка: реальный дедлайн, overdue и near breach.",
  ],
  outcome:
    "Появляется единый контур заявки вместо переписки в нескольких каналах. Диспетчер видит очередь и SLA, исполнитель — свою пачку и журнал работ, клиент — публичный статус без внутренних заметок. История по объекту собирается в одном месте.",
  screenshots: [
    {
      src: "/projects/serviceflow/cover.webp",
      alt: "Дашборд ServiceFlow с KPI открытых заявок, SLA и статусами",
      width: 1440,
      height: 900,
      title: "Операционный дашборд",
      caption:
        "Очередь, SLA и загрузка исполнителей. Синтетический demo, не клиентская система.",
    },
    {
      src: "/projects/serviceflow/tickets.webp",
      alt: "Таблица заявок ServiceFlow с приоритетом, статусом и SLA",
      width: 1440,
      height: 900,
      title: "Реестр заявок",
      caption:
        "Номер, организация, объект, приоритет, статус, SLA. Данные синтетические.",
    },
  ],
};
