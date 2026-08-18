import type { Project } from "@/types/project";

export const aurelia: Project = {
  slug: "aurelia",
  title: "Aurelia",
  cardLine: "Editorial architecture study",
  shortTask:
    "CSS 3D и GSAP-стек для вымышленного ателье. Экспериментальный фронтенд, не production-кейс и не WebGL-флагман.",
  type: "commercial-site",
  stack: ["Next.js", "TypeScript", "GSAP", "CSS 3D"],
  cardStack: ["Next.js", "GSAP", "CSS 3D"],
  role: "Frontend study: editorial document, stack motion, reduced motion. Не полный visual reconstruction.",
  features: [
    "Editorial architecture site for fictional House 07",
    "CSS 3D stack interaction driven by GSAP",
    "Reduced-motion and fallback stills",
  ],
  year: "2026",
  featured: false,
  featuredOrder: null,
  presentation: "study",
  nda: false,
  demoStatus: "in-progress",
  demoDir: "demos/aurelia",
  localUrl: "http://localhost:3011",
  coverImage: {
    src: "/projects/aurelia/cover.webp",
    alt: "Hero Aurelia: editorial architecture still House 07",
    width: 1440,
    height: 900,
  },
  problem:
    "Нужен editorial-сайт архитектурного объекта, где глубина и материалы читаются как документ, а не как WebGL-демо. Стек карточек должен быть настоящей CSS 3D-механикой, а не декоративным слайдером.",
  context:
    "Aurelia — вымышленное ателье и дом House 07. Публичный статус: experimental / needs polish. Это не клиентский проект, не live-релиз и не доказательство R3F. README демо ещё требует сверки со стеком.",
  requirements: [
    "Editorial document first: навигация, текст, stills",
    "Stack motion на CSS 3D + GSAP, не на Three.js в runtime",
    "Reduced motion и читаемый fallback",
    "Не выдавать исследование за готовый flagship",
  ],
  architecture: {
    summary:
      "Next.js рендерит editorial DOM. GSAP управляет прогрессом CSS 3D-стека. WebGL в текущем публичном контуре не является runtime-зависимостью.",
    layers: [
      "DOM: hero, selected spaces, studio, contact",
      "GSAP timeline / scroll progress",
      "CSS 3D stack of architectural stills",
      "Fallback stills when motion is reduced",
    ],
  },
  implemented: [
    "Editorial layout and architectural stills",
    "CSS 3D stack interaction",
    "Motion QA scripts in the demo repo",
  ],
  responsibility: [
    "Граница: исследование motion/layout, не коммерческий CMS-контур",
    "Честный статус: needs polish, не READY live",
  ],
  technologies: [
    {
      name: "Next.js / TypeScript",
      purpose: "Документ и статическая сборка editorial-сайта",
    },
    {
      name: "GSAP",
      purpose: "Прогресс стека; Standard No-Charge License, не MIT",
    },
    {
      name: "CSS 3D",
      purpose: "Механика карточек без runtime WebGL",
    },
  ],
  technicalDecisions: [
    "Runtime не строится на React Three Fiber — это CSS/GSAP study.",
    "Не обещать live URL и не ставить кейс рядом с ServiceFlow.",
  ],
  challenges: [
    "Свести motion, типографику и stills до уровня, который можно честно назвать production-ready.",
    "Не перепутать исследование с коммерческим архитектурным сайтом клиента.",
  ],
  outcome:
    "Локальный editorial prototype. Достаточно, чтобы показать CSS 3D / GSAP-компетенцию, недостаточно для flagship. Публичного live нет.",
  screenshots: [
    {
      src: "/projects/aurelia/cover.webp",
      alt: "Hero Aurelia с архитектурным still House 07",
      width: 1440,
      height: 900,
      title: "Hero still",
      caption: "Editorial document. Не live-релиз и не клиентский объект.",
    },
    {
      src: "/projects/aurelia/stack.webp",
      alt: "CSS 3D stack selected spaces в Aurelia",
      width: 1440,
      height: 900,
      title: "Stack",
      caption: "CSS 3D-механика, не Three.js runtime.",
    },
  ],
};
