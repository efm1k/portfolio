import { describe, expect, it } from "vitest";
import { githubUrl, telegramUrl } from "./url";

describe("githubUrl", () => {
  it("builds a profile URL from a username", () => {
    expect(githubUrl("efm1k")).toBe("https://github.com/efm1k");
    expect(githubUrl("@efm1k")).toBe("https://github.com/efm1k");
  });

  it("does not double-prefix a full GitHub URL", () => {
    expect(githubUrl("https://github.com/efm1k")).toBe(
      "https://github.com/efm1k",
    );
    expect(githubUrl("https://github.com/efm1k/")).toBe(
      "https://github.com/efm1k",
    );
    expect(githubUrl("http://www.github.com/efm1k")).toBe(
      "https://github.com/efm1k",
    );
  });
});

describe("telegramUrl", () => {
  it("builds a t.me URL from a username", () => {
    expect(telegramUrl("efm1k")).toBe("https://t.me/efm1k");
    expect(telegramUrl("@efm1k")).toBe("https://t.me/efm1k");
  });

  it("does not double-prefix a full Telegram URL", () => {
    expect(telegramUrl("https://t.me/efm1k")).toBe("https://t.me/efm1k");
    expect(telegramUrl("https://telegram.me/efm1k/")).toBe("https://t.me/efm1k");
  });
});
