import { describe, expect, it } from "vitest";
import { liveDemoCtaLabel, resolveDemo, withoutLocalUrls } from "./demo";
import type { Project } from "@/types/project";

const sample = {
  localUrl: "http://localhost:3001/demo",
  localAdminUrl: "http://localhost:3001/admin",
} as Project;

describe("liveDemoCtaLabel", () => {
  it("uses the interactive label only for NOVA ONE", () => {
    expect(liveDemoCtaLabel("nova-one")).toBe("Открыть интерактивное демо");
    expect(liveDemoCtaLabel("serviceflow")).toBe("Открыть демо");
    expect(liveDemoCtaLabel("autoflow")).toBe("Открыть демо");
    expect(liveDemoCtaLabel("ai-sales-copilot")).toBe("Открыть демо");
  });
});

describe("resolveDemo", () => {
  it("does not expose localhost as live when liveUrl is absent", () => {
    const demo = resolveDemo({
      liveUrl: undefined,
      localUrl: "http://localhost:3001/demo",
    });
    expect(demo.mode).not.toBe("live");
    if (process.env.NODE_ENV === "development") {
      expect(demo).toEqual({
        mode: "local",
        url: "http://localhost:3001/demo",
      });
    } else {
      expect(demo).toEqual({ mode: "unavailable" });
    }
  });
});

describe("withoutLocalUrls", () => {
  it("strips local demo URLs outside development", () => {
    if (process.env.NODE_ENV === "development") {
      expect(withoutLocalUrls(sample).localUrl).toBe(sample.localUrl);
      return;
    }
    const publicProject = withoutLocalUrls(sample);
    expect(publicProject.localUrl).toBeUndefined();
    expect(publicProject.localAdminUrl).toBeUndefined();
  });
});
