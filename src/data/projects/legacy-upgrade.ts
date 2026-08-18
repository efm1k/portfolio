import type { Project } from "@/types/project";

export const legacyUpgrade: Project = {
  slug: "legacy-upgrade",
  title: "Legacy Upgrade",
  cardLine: "Модернизация процедурного PHP без полного переписывания",
  shortTask:
    "Инкрементальная модернизация PHP-каталога: strangler, clean URL и сокращение SQL 309 → 3 на сопоставимом наборе.",
  type: "legacy-upgrade",
  stack: [
    "PHP",
    "PostgreSQL",
    "PDO",
    "Composer",
    "PSR-4",
    "PHPUnit",
    "PHPStan",
  ],
  cardStack: ["PHP", "Strangler", "PostgreSQL", "PHPUnit"],
  role: "Инкрементальная модернизация: аудит, стабилизация, characterization, strangler extraction, SEO-миграция, оптимизация SQL.",
  features: [
    "Аудит и закрытие SQL/CSRF/XSS/RBAC без смены URL",
    "Characterization tests до архитектурного извлечения",
    "Strangler Pattern: Application Services + PDO-репозитории",
    "Clean URL + 301, русский B2B-каталог, read-only API",
    "N+1 каталога 309 → 3 на сопоставимом наборе, пагинация 24",
  ],
  year: "2026",
  featured: true,
  featuredOrder: 3,
  presentation: "primary",
  nda: false,
  demoStatus: "ready",
  demoDir: "demos/legacy-upgrade",
  localUrl: "http://localhost:3013/case-study",
  githubUrl: "https://github.com/efm1k/legacy-upgrade",
  localAdminUrl: "http://localhost:3013/admin/login.php",
  highlight: "309 → 3 SQL",
  coverImage: {
    src: "/projects/legacy-upgrade/cover.webp",
    alt: "Современный каталог Proline Components после модернизации PHP",
    width: 1440,
    height: 900,
  },
  problem:
    "Процедурный PHP-каталог уже отвечает на запросы и хранит slug в БД, но SQL смешан с HTML, тестов нет, URL числовые, а каталог делает сотни запросов. Полная переписка слишком рискованна: нельзя уронить закладки, заявки и админку.",
  context:
    "Legacy Upgrade — синтетический кейс модернизации каталога вымышленной компании Proline Components. Это не сайт реального клиента и не обещание выручки. Замороженный снимок на :3014 намеренно небезопасен и нужен только для локального Before/After.",
  requirements: [
    "Зафиксировать поведение до правок: CHAR-001, заявки, админка, numeric URL",
    "Закрыть известные дыры аудита, не меняя публичный контракт в Phase 1",
    "Вынести SQL в сервисы (strangler), затем modern UI и clean URL",
    "Исправить N+1 на сопоставимом наборе, затем пагинацию",
    "Не публиковать fake live URL и fake бизнес-метрики",
  ],
  architecture: {
    summary:
      "Снимок остаётся read-only. Современное приложение: Router → Controller → Application Services → Repositories → PDO → PostgreSQL. HTML и JSON API делят один слой данных. Индексы создаёт install.php, не ручные правки volume.",
    layers: [
      "Frozen snapshot: процедурный PHP, jQuery 1.12.4, numeric URL",
      "Security + characterization до extraction",
      "Application services (catalog, product, lead, article)",
      "Modern presentation: clean URL, русский UI, CSP",
      "Phase 5: batch loading, indexes, пагинация, vanilla JS",
    ],
  },
  implemented: [
    "Security regression: SQL, CSRF, XSS, password upgrade, session, redirect, RBAC, CSP",
    "Characterization + runnable LegacySnapshot против :3014",
    "CHAR-001 исправлен в modern catalog (потомки родителя)",
    "301 numeric → slug, sitemap, robots, read-only API",
    "Каталог 309 → 3 SQL на полном наборе; затем страницы по 24",
  ],
  responsibility: [
    "Решение «чинить / извлекать / не переписывать»",
    "Доказательная миграция: тесты слоями, не одним «200 passed»",
    "Query profile до оптимизации, comparable benchmark до пагинации",
    "Честные ограничения демо и local Docker",
  ],
  technologies: [
    { name: "PHP 8.3 / PDO / PostgreSQL", purpose: "Runtime и доступ к данным без ORM-переписывания" },
    { name: "Composer / PSR-4 / PHPStan", purpose: "Автозагрузка и статический анализ level 5 = 0" },
    { name: "PHPUnit", purpose: "Security, characterization, extracted, modern, migration, performance" },
    { name: "Strangler Pattern", purpose: "Слой сервисов вокруг живых точек входа, затем Router" },
  ],
  technicalDecisions: [
    "Полная переписка отклонена: сначала контракт, потом структура, потом UI, потом SQL.",
    "CHAR-001 в legacy оставлен как исторический факт; modern parent включает потомков.",
    "N+1 измерен на полном каталоге до пагинации, чтобы 309 → 3 не было эффектом «показали 24 карточки».",
    "Redis отклонён: 12 категорий, request-scoped map достаточно.",
    "jQuery удалён только из modern app; snapshot сохраняет 1.12.4.",
  ],
  challenges: [
    "Characterization нельзя тихо переписать под новый UI — skipped CHANGE-* остаются журналом.",
    "Planner на 154 строках честно выбирает Seq Scan; это не провал индекса.",
    "Снимок должен оставаться runnable и небезопасным — отдельные тесты, без exploit suite.",
  ],
  outcome:
    "Каталог остаётся тем же синтетическим B2B-контуром, но с чистыми URL, русским UI, API, bounded SQL и доказанной совместимостью 301. Автотесты: 0 → актуальный PHPUnit. PHPStan: 6 → 0. Это демонстрация подхода, не кейс клиента.",
  screenshots: [
    {
      src: "/projects/legacy-upgrade/cover.webp",
      alt: "Современный B2B-каталог с фильтрами, чистыми URL и русским интерфейсом",
      width: 1440,
      height: 900,
      title: "Modern catalog",
      caption: "Чистые URL, русский интерфейс, пагинация. Тот же контур, не переписанный с нуля.",
    },
    {
      src: "/projects/legacy-upgrade/performance.webp",
      alt: "Кейс производительности: каталог 309 SQL-запросов сокращён до 3",
      width: 1440,
      height: 1100,
      title: "309 → 3 SQL",
      caption:
        "Замер на сопоставимом наборе до пагинации. Это не эффект «показали 24 карточки».",
    },
  ],
};
