export type StackItem = {
  name: string;
  usage: string;
};

export type StackGroup = {
  id: string;
  title: string;
  items: StackItem[];
};

export const stackGroups: readonly StackGroup[] = [
  {
    id: "languages",
    title: "Языки",
    items: [
      {
        name: "PHP",
        usage:
          "Коммерческие PHP-контуры и доработка legacy. WordPress / Bitrix — коммерческий опыт под NDA, без публичного кейса.",
      },
      {
        name: "TypeScript / JavaScript",
        usage:
          "Web-приложения, Mini Apps, типизированные API-клиенты и интерфейсы диспетчера.",
      },
      {
        name: "SQL",
        usage:
          "Модели заявок, каталогов и журналов; выборки и транзакции, а не только ORM «по умолчанию».",
      },
      {
        name: "Python",
        usage:
          "Воркеры интеграций, разбор входящих, вызовы LLM со схемой ответа.",
      },
    ],
  },
  {
    id: "frontend",
    title: "Интерфейсы",
    items: [
      {
        name: "React",
        usage: "Рабочие интерфейсы, Mini Apps, очереди разбора, карточки заявок.",
      },
      {
        name: "Next.js",
        usage:
          "Сайты и приложения с серверным рендером, ISR-каталоги, публичные кабинеты.",
      },
      {
        name: "Tailwind CSS",
        usage: "Плотная вёрстка админок и публичных витрин без отдельного CSS-фреймворка.",
      },
    ],
  },
  {
    id: "backend-cms",
    title: "Backend и CMS",
    items: [
      {
        name: "WordPress",
        usage:
          "Коммерческий опыт сопровождения тем, форм и плагинов. Публичного demo-кейса нет — детали ограничены NDA.",
      },
      {
        name: "Bitrix",
        usage:
          "Коммерческий опыт инфоблоков, форм и интеграционного края. Не публичный portfolio-case.",
      },
      {
        name: "REST API",
        usage:
          "Контракты между сайтом, Mini App, ботом и внешними системами.",
      },
      {
        name: "MySQL / PostgreSQL",
        usage: "Учёт заявок, каталоги, пользователи, аудит и журналы интеграций.",
      },
    ],
  },
  {
    id: "messaging-ai",
    title: "Мессенджеры, автоматизация, AI",
    items: [
      {
        name: "Telegram Bots",
        usage: "Уведомления, приём заявок, сервисные сценарии вокруг Mini App.",
      },
      {
        name: "Telegram Mini Apps",
        usage:
          "Запись, статус заявки и кабинеты внутри Telegram с серверной проверкой initData.",
      },
      {
        name: "n8n",
        usage:
          "Сведение каналов, очереди, повторы webhook, связка без отдельного ingest-сервиса на каждый источник.",
      },
      {
        name: "GPT / Claude и другие LLM",
        usage:
          "Классификация, извлечение полей, черновики. Отправка клиенту — только после человека, если так задано регламентом.",
      },
    ],
  },
] as const;
