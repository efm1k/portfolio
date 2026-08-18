import type { Project } from "@/types/project";

export const autoflow: Project = {
  slug: "autoflow",
  title: "AutoFlow",
  cardLine: "Telegram Mini App для автосервиса",
  shortTask:
    "Клиент, мастер и администратор в одном Mini App: запись, заказ-наряд и статусы ремонта.",
  type: "telegram-mini-app",
  stack: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Zod",
    "Telegram Mini Apps",
  ],
  cardStack: ["Mini App", "Клиент / мастер / админ", "PostgreSQL"],
  role: "Full-stack: Mini App, серверная проверка initData, RBAC, API заказа, Demo Mode.",
  features: [
    "Запись: автомобиль, услуга, дата/время, комментарий",
    "Серверная авторизация через Telegram initData",
    "Demo Mode с отдельным auth-контуром",
    "Статусы заказа, стоимость, комментарии и фото процесса",
  ],
  year: "2026",
  featured: true,
  featuredOrder: 4,
  presentation: "primary",
  nda: false,
  demoStatus: "ready",
  demoDir: "demos/autoflow",
  localUrl: "http://localhost:3001/demo",
  githubUrl: "https://github.com/efm1k/autoflow",
  coverImage: {
    src: "/projects/autoflow/cover.webp",
    alt: "Mini App клиента AutoFlow: запись, текущий заказ и автомобили",
    width: 390,
    height: 640,
  },
  problem:
    "Клиенты сервисного бизнеса пишут в Telegram в свободной форме. Администратор вручную переносит имя, услугу и желаемое время в таблицу. Клиент не видит статус работ и повторно пишет «ну как там».",
  context:
    "AutoFlow — публичный demo Mini App для вымышленного сервиса «Моторная Линия». Сценарий воспроизводит запись в автосервис через Telegram без публикации клиентского бота и без реальных записей. Имена клиентов, автомобили, услуги и заказы синтетические.",
  requirements: [
    "Mini App: автомобили, каталог услуг, создание записи, timeline статуса",
    "Серверная проверка Telegram initData, без доверия к userId/role с клиента",
    "Контур сотрудника: статус, стоимость, комментарии, фото, уведомления",
    "Компактный admin: услуги, сотрудники, пользователи, audit log",
    "Demo Mode, который работает в браузере без Telegram-токена",
  ],
  architecture: {
    summary:
      "Клиент — Next.js Mini App. Backend проверяет подпись initData или, в Demo Mode, отдельный demo-login. Пользователь, роль и заказ живут в PostgreSQL. Источник истины — сервер, не WebView. Уведомления идут через NotificationService: Telegram-провайдер или mock в demo.",
    layers: [
      "Telegram Mini App / браузерный Demo Mode",
      "Next.js App Router и REST API",
      "Application layer: RBAC, заказ, audit",
      "Prisma + PostgreSQL",
      "Локальное object storage с интерфейсом под S3",
    ],
  },
  implemented: [
    "Клиентский поток: автомобили → услуги → запись → статус → история",
    "Серверная валидация Telegram initData и httpOnly-сессия",
    "Demo Mode: Алексей Петров / Анна Соколова / Demo Admin",
    "Сотрудник меняет статус, стоимость, комментарии, фото и отправляет уведомление",
    "Администратор управляет услугами и сотрудниками, видит audit log",
    "Активный слот записи защищён unique index: повтор на то же время даёт 409",
    "RBAC и ownership: клиент не открывает чужой заказ и не меняет статус",
  ],
  responsibility: [
    "Проектирование Mini App под мобильный viewport и тему Telegram",
    "Разделение Telegram Auth и Demo Auth",
    "Доменная модель заказа и переходы статусов",
    "Авторизация на сервере, а не в UI",
  ],
  technologies: [
    {
      name: "Next.js + TypeScript",
      purpose: "Mini App, staff/admin UI и API в одном приложении",
    },
    {
      name: "Telegram Mini Apps / Bot API",
      purpose: "initData, тема WebApp, опциональные сообщения бота",
    },
    {
      name: "Prisma + PostgreSQL",
      purpose: "Пользователи, автомобили, услуги, заказы, audit log",
    },
    {
      name: "Zod + React Hook Form",
      purpose: "Валидация API и форм",
    },
  ],
  technicalDecisions: [
    "initData проверяется только на сервере HMAC-SHA256. Поля user с клиента не являются доказательством личности.",
    "Demo Auth — отдельный endpoint, доступный только при DEMO_MODE=true. В production он закрыт.",
    "Роль читается из базы после сессии, а не из query/localStorage.",
    "NotificationService абстрагирует Telegram и mock: в demo история уведомлений пишется в приложение.",
    "Файлы проходят через StorageProvider. Сейчас local disk, контракт готов к S3-compatible storage.",
  ],
  challenges: [
    "WebView Telegram и обычный браузер должны делить один backend.",
    "Demo должно работать без BOT_TOKEN, не ослабляя production-auth.",
    "Клиент, сотрудник и админ видят один заказ по-разному: чужие данные и внутренние комментарии закрыты.",
  ],
  outcome:
    "Запись перестаёт быть свободным текстом в чате. Клиент видит автомобиль, услугу, время и этапы работ. Сотрудник ведёт заказ в том же контуре. Демо запускается локально без Telegram-credentials.",
  screenshots: [
    {
      src: "/projects/autoflow/cover.webp",
      alt: "Домашний экран Mini App клиента: ближайшая запись и автомобили",
      width: 390,
      height: 640,
      title: "Клиентский Mini App",
      caption:
        "Запись, статус ремонта и история в Telegram WebView. Синтетический сервис «Моторная Линия».",
    },
    {
      src: "/projects/autoflow/employee.webp",
      alt: "Экран сотрудника AutoFlow с заказом-нарядом",
      width: 900,
      height: 1582,
      title: "Контур мастера",
      caption:
        "Заказ-наряд, статус, стоимость и комментарии. Это Mini App, не отдельный Telegram-бот.",
    },
  ],
};
