export type Capability = {
  index: string;
  title: string;
  description: string;
};

export const capabilities: readonly Capability[] = [
  {
    index: "01",
    title: "Web applications",
    description:
      "Рабочие контуры со статусами, ролями и журналом, а не витрины. Типичный класс: заявки, очереди, кабинеты.",
  },
  {
    index: "02",
    title: "Business automation",
    description:
      "Нормализация входящих, слоты, уведомления и интеграции между сайтом, CRM и мессенджером.",
  },
  {
    index: "03",
    title: "AI integrations",
    description:
      "LLM внутри процесса: классификация, RAG, правила и human approval. Не chatbot на главной.",
  },
  {
    index: "04",
    title: "Telegram Mini Apps",
    description:
      "Клиентский сценарий в Telegram WebView с серверной проверкой initData. Бот — канал, не вся система.",
  },
  {
    index: "05",
    title: "PHP / Legacy modernization",
    description:
      "Сопровождение и инкрементальная модернизация PHP-контуров без полной переписки «с нуля».",
  },
];

export const commercialExperience: readonly string[] = [
  "Разработка и модернизация web-проектов под действующий бизнес-процесс",
  "WordPress и Bitrix — коммерческий опыт, детали ограничены NDA",
  "PHP-контуры: формы, каталоги, админки, точечные доработки",
  "Бизнес-интеграции: сайт, CRM, мессенджер, очереди",
  "Telegram и автоматизация сервисных сценариев",
];
