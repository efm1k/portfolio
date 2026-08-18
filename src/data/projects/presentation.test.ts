import { describe, expect, it } from "vitest";
import {
  getFeaturedProjects,
  getPrimaryProjects,
  getSecondaryProjects,
  getStudyProjects,
  projects,
} from "@/data/projects";
import { resolveDemo, withoutLocalUrls } from "@/lib/demo";
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

  it("keeps BuildPro and GastroCity secondary", () => {
    expect(getSecondaryProjects().map((project) => project.slug)).toEqual([
      "buildpro",
      "gastrocity",
    ]);
  });

  it("withholds Nova and Aurelia from the featured flow", () => {
    expect(
      getStudyProjects()
        .map((project) => project.slug)
        .sort(),
    ).toEqual(["aurelia", "nova-one"]);
    expect(
      getFeaturedProjects().some((project) =>
        ["nova-one", "aurelia"].includes(project.slug),
      ),
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

  it("hides missing live and github URLs", () => {
    for (const project of projects) {
      expect(project.liveUrl).toBeUndefined();
      expect(project.githubUrl).toBeUndefined();
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
