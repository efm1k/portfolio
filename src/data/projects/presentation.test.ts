import { describe, expect, it } from "vitest";
import {
  getFeaturedProjects,
  getPrimaryProjects,
  getSecondaryProjects,
  getStudyProjects,
  projects,
} from "@/data/projects";
import { resolveDemo, withoutLocalUrls, liveDemoCtaLabel } from "@/lib/demo";
import { DEMO_BADGE, NDA_BADGE } from "@/data/copy";

describe("featured presentation order", () => {
  it("reads featuredOrder from project data", () => {
    expect(getFeaturedProjects().map((project) => project.slug)).toEqual([
      "serviceflow",
      "ai-sales-copilot",
      "legacy-upgrade",
      "autoflow",
      "buildpro",
      "gastrocity",
      "forma",
    ]);
  });

  it("keeps operational systems in the primary band", () => {
    expect(getPrimaryProjects().map((project) => project.slug)).toEqual([
      "serviceflow",
      "ai-sales-copilot",
      "legacy-upgrade",
      "autoflow",
    ]);
  });

  it("keeps BuildPro, GastroCity and FORMA secondary", () => {
    expect(getSecondaryProjects().map((project) => project.slug)).toEqual([
      "buildpro",
      "gastrocity",
      "forma",
    ]);
  });

  it("withholds Aurelia from the featured flow and does not publish NOVA ONE", () => {
    expect(getStudyProjects().map((project) => project.slug)).toEqual([
      "aurelia",
    ]);
    expect(
      getFeaturedProjects().some((project) => project.slug === "aurelia"),
    ).toBe(false);
    expect(projects.some((project) => project.slug === "nova-one")).toBe(false);
    expect(
      projects.some((project) => project.title.toLowerCase().includes("nova")),
    ).toBe(false);
  });
});

describe("public case honesty", () => {
  it("does not mark synthetic demos as NDA", () => {
    for (const project of projects) {
      expect(project.nda).toBe(false);
    }
    expect(DEMO_BADGE).toBe("Demo-проект");
    expect(NDA_BADGE).toContain("NDA");
  });

  it("publishes live demo URLs only after actual deployments", () => {
    const live: Record<string, string> = {
      serviceflow: "https://efm1k-serviceflow.vercel.app/demo",
      "ai-sales-copilot": "https://efm1k-ai-sales-copilot.vercel.app/demo",
      autoflow: "https://efm1k-autoflow.vercel.app/demo",
      forma: "https://efm1k-forma.vercel.app",
      buildpro: "https://efm1k-buildpro.vercel.app",
    };
    const unpublishedLive = ["legacy-upgrade", "gastrocity", "aurelia"];

    for (const [slug, url] of Object.entries(live)) {
      const project = projects.find((item) => item.slug === slug);
      expect(project?.liveUrl).toBe(url);
      expect(project?.liveUrl?.startsWith("https://")).toBe(true);
      expect(project?.liveUrl?.includes("localhost")).toBe(false);
      expect(project?.liveUrl?.includes("example.com")).toBe(false);
      expect(resolveDemo(project!).mode).toBe("live");
    }

    for (const slug of unpublishedLive) {
      const project = projects.find((item) => item.slug === slug);
      expect(project?.liveUrl).toBeUndefined();
      expect(resolveDemo(project!).mode).not.toBe("live");
    }
  });

  it("uses the standard live demo label", () => {
    expect(liveDemoCtaLabel()).toBe("Открыть демо");
  });

  it("publishes FORMA as a live demo without GitHub", () => {
    const forma = projects.find((project) => project.slug === "forma");
    expect(forma).toBeDefined();
    expect(forma?.liveUrl).toBe("https://efm1k-forma.vercel.app");
    expect(forma?.githubUrl).toBeUndefined();
    expect(forma?.presentation).toBe("secondary");
    expect(resolveDemo(forma!).mode).toBe("live");
    expect(liveDemoCtaLabel()).toBe("Открыть демо");
  });

  it("publishes BuildPro as a live Laravel demo without GitHub", () => {
    const buildpro = projects.find((project) => project.slug === "buildpro");
    expect(buildpro).toBeDefined();
    expect(buildpro?.liveUrl).toBe("https://efm1k-buildpro.vercel.app");
    expect(buildpro?.githubUrl).toBeUndefined();
    expect(buildpro?.presentation).toBe("secondary");
    expect(buildpro?.stack).toContain("PHP 8.4");
    expect(buildpro?.stack).toContain("Laravel 13");
    expect(buildpro?.stack).toContain("PostgreSQL");
    expect(buildpro?.stack).toContain("nginx + PHP-FPM");
    expect(resolveDemo(buildpro!)).toEqual({
      mode: "live",
      url: "https://efm1k-buildpro.vercel.app",
    });
    expect(liveDemoCtaLabel()).toBe("Открыть демо");
  });

  it("does not expose a public NOVA ONE case, live URL or slug", () => {
    expect(projects.map((project) => project.slug)).not.toContain("nova-one");
    for (const project of projects) {
      expect(project.liveUrl ?? "").not.toContain("nova-one");
      expect(project.title).not.toMatch(/NOVA ONE/i);
    }
  });

  it("publishes GitHub URLs only for Wave 2 public repos", () => {
    const published: Record<string, string> = {
      serviceflow: "https://github.com/efm1k/serviceflow",
      "ai-sales-copilot": "https://github.com/efm1k/ai-sales-copilot",
      "legacy-upgrade": "https://github.com/efm1k/legacy-upgrade",
      autoflow: "https://github.com/efm1k/autoflow",
    };
    const unpublished = ["buildpro", "gastrocity", "forma", "aurelia"];

    for (const [slug, url] of Object.entries(published)) {
      const project = projects.find((item) => item.slug === slug);
      expect(project?.githubUrl).toBe(url);
    }

    for (const slug of unpublished) {
      const project = projects.find((item) => item.slug === slug);
      expect(project?.githubUrl).toBeUndefined();
    }

    for (const project of projects) {
      if (project.githubUrl) {
        expect(project.githubUrl.startsWith("https://github.com/efm1k/")).toBe(
          true,
        );
        expect(project.githubUrl.includes("localhost")).toBe(false);
      }
    }
  });

  it("keeps card stack short", () => {
    for (const project of projects) {
      expect(project.cardStack.length).toBeGreaterThan(0);
      expect(project.cardStack.length).toBeLessThanOrEqual(5);
    }
  });

  it("uses curated local screenshots, not CSS wireframe variants", () => {
    for (const project of projects) {
      expect(project.coverImage.src.startsWith("/projects/")).toBe(true);
      expect(project.screenshots.length).toBeGreaterThan(0);
      for (const shot of project.screenshots) {
        expect(shot.src.startsWith("/projects/")).toBe(true);
        expect(shot.alt.length).toBeGreaterThan(8);
      }
    }
  });
});

describe("production demo URL policy", () => {
  it("does not expose localhost as a live CTA", () => {
    const demo = resolveDemo({
      liveUrl: undefined,
      localUrl: "http://localhost:3002/demo",
    });
    expect(demo.mode).not.toBe("live");
  });

  it("strips local URLs outside development", () => {
    if (process.env.NODE_ENV === "development") {
      return;
    }

    for (const project of projects) {
      expect(project.localUrl).toBeUndefined();
      expect(project.localAdminUrl).toBeUndefined();
    }

    const stripped = withoutLocalUrls({
      localUrl: "http://localhost:3002/demo",
      localAdminUrl: "http://localhost:3002/admin",
    } as (typeof projects)[number]);
    expect(stripped.localUrl).toBeUndefined();
    expect(stripped.localAdminUrl).toBeUndefined();
  });
});
