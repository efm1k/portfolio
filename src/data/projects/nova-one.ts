import type { Project } from "@/types/project";

export const novaOne: Project = {
  slug: "nova-one",
  title: "NOVA ONE",
  cardLine: "Editorial 3D product study",
  shortTask:
    "Cinematic product site: HTML-first документ и persistent WebGL. Процедурная модель — не готовый production-флагман.",
  type: "commercial-site",
  stack: [
    "Next.js",
    "TypeScript",
    "React Three Fiber",
    "Three.js",
    "GSAP",
    "Drei",
  ],
  cardStack: ["Next.js", "R3F", "GSAP"],
  role: "Full-stack demo: editorial DOM, persistent canvas, scroll direction, adaptive quality, fallback and performance budgets.",
  features: [
    "Twelve-chapter cinematic scroll with a single persistent canvas",
    "Directed exploded product animation (eight named groups)",
    "Accessible finish selector (Graphite / Warm Silver / Mineral White)",
    "Adaptive HIGH / MEDIUM / LOW quality, reduced motion and designed WebGL fallback",
  ],
  year: "2026",
  featured: false,
  featuredOrder: null,
  presentation: "study",
  nda: false,
  demoStatus: "live",
  demoDir: "demos/nova-one",
  localUrl: "http://localhost:3010",
  liveUrl: "https://nova-one-indol-three.vercel.app",
  coverImage: {
    src: "/projects/nova-one/cover.webp",
    alt: "Hero NOVA ONE: editorial product page с зарезервированным 3D-слоем",
    width: 1440,
    height: 900,
  },
  problem:
    "A premium product launch site has to be a real document first: crawlable copy, working navigation, and a poster that does not wait for a GLB. The 3D layer must tell a twelve-scene story without turning the page into a rotating-object demo or an Apple clone.",
  context:
    "NOVA ONE is a fictional desktop wireless speaker created for this portfolio. The case is about production-shaped 3D web: HTML-first loading, GSAP-driven camera/explode targets, R3F damping, and honest budgets. It is not affiliated with any audio manufacturer.",
  requirements: [
    "Meaningful first screen without WebGL: nav, headline, copy, CTA, product poster",
    "One persistent canvas; twelve storyboard chapters",
    "Explode, finishes, sound-field shader, control interaction",
    "Quality tiers, mobile degradation, reduced motion, context-lost fallback",
    "No fake checkout, no invented conversion metrics, no third-party speaker CAD",
  ],
  architecture: {
    summary:
      "Next.js App Router renders the editorial document. GSAP ScrollTrigger writes progress and camera/explode targets onto a mutable store. React Three Fiber damps and applies those targets. React state is discrete: finish, hotspot, tier, webgl. Fallback stills replace the canvas when WebGL cannot run.",
    layers: [
      "DOM: header, 12 sections, specs table, CTA, colophon",
      "ScrollDirector: GSAP ScrollTrigger → experience mutables",
      "Persistent Canvas: CameraRig, Product, SoundField, QualityManager",
      "Fallback: SVG posters, explode diagram, same specs",
    ],
  },
  implemented: [
    "HTML-first hero with reserved visual well and poster → canvas crossfade",
    "Twelve-chapter cinematic scroll (GSAP ScrollTrigger targets + R3F damping)",
    "Eight-group product explode with a directed assembly close back to the hero pose",
    "Three finishes (Graphite / Warm Silver / Mineral White) on one procedural model",
    "Custom monochrome sound-field shader disc (HIGH full, desktop MEDIUM simple, mobile/LOW/RM off)",
    "Control-cylinder drag, hover, keyboard, and mobile DOM nudge",
    "Adaptive HIGH / MEDIUM / LOW quality, DPR caps, mobile camera/explode degradation",
    "Reduced-motion cuts, designed WebGL fallback (poster, chapter stills, SVG explode, specs, CTA)",
    "Replay without reload; finish selection preserved",
    "Analytics hooks without third-party credentials",
  ],
  responsibility: [
    "Product site architecture (DOM vs scene vs scroll vs quality)",
    "Performance budgets and fallback UX",
    "Accessibility of finishes, hotspots and reduced motion",
  ],
  technologies: [
    {
      name: "Next.js App Router + TypeScript",
      purpose: "SSR/static HTML, metadata, sitemap, the document the user actually reads",
    },
    {
      name: "React Three Fiber + Drei + Three.js",
      purpose: "Persistent product scene, IBL via RoomEnvironment, AdaptiveDpr, PerformanceMonitor",
    },
    {
      name: "GSAP ScrollTrigger",
      purpose: "Chapter progress and camera/explode targets — not MIT; Standard No-Charge License",
    },
  ],
  technicalDecisions: [
    "Native scroll; no Lenis, ScrollSmoother, Theatre, or EffectComposer",
    "One procedural model and three finish tints instead of three GLBs",
    "RoomEnvironment instead of a large Poly Haven HDR to stay inside the lighting byte budget",
    "Blocking 3D until an original Blender GLB exists — no Sketchfab speaker",
  ],
  challenges: [
    "Keeping scroll off the React render path while still updating chapter chrome",
    "Explode that survives a future GLB swap",
    "Mobile as a directed experience, not a shrunk desktop",
  ],
  outcome:
    "Local twelve-chapter product site: cinematic scroll, explode/assembly, custom shader, adaptive quality, mobile degradation, fallback and reduced motion. Procedural blocking model — not a finished sculpture. Public interactive demo is live. No conversion claims.",
  screenshots: [
    {
      src: "/projects/nova-one/cover.webp",
      alt: "Hero NOVA ONE с editorial layout и product well",
      width: 1440,
      height: 900,
      title: "Editorial product page",
      caption:
        "HTML-first документ. Процедурная модель, не готовый GLB и не live production.",
    },
    {
      src: "/projects/nova-one/mobile.webp",
      alt: "Мобильный hero NOVA ONE",
      width: 390,
      height: 844,
      title: "Mobile",
      caption: "Направленный mobile-сценарий, не уменьшенный desktop.",
    },
  ],
};
