import { describe, expect, it } from "vitest";
import {
  contactSameAs,
  emailAddress,
  githubUrl,
  mailtoHref,
  telegramHandle,
  telegramUrl,
} from "./url";

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

describe("telegramHandle", () => {
  it("extracts a username from a t.me URL", () => {
    expect(telegramHandle("https://t.me/efm1k")).toBe("efm1k");
    expect(telegramHandle("@efm1k")).toBe("efm1k");
  });
});

describe("email helpers", () => {
  it("strips mailto: from env values", () => {
    expect(emailAddress("mailto:you@example.com")).toBe("you@example.com");
    expect(mailtoHref("mailto:you@example.com")).toBe("mailto:you@example.com");
    expect(mailtoHref("you@example.com")).toBe("mailto:you@example.com");
  });
});

describe("contactSameAs", () => {
  it("normalizes full GitHub and Telegram URLs without double prefixes", () => {
    expect(
      contactSameAs({
        github: "https://github.com/efm1k",
        telegram: "https://t.me/efm1k",
      }),
    ).toEqual(["https://github.com/efm1k", "https://t.me/efm1k"]);
  });

  it("omits empty contacts", () => {
    expect(contactSameAs({ github: "", telegram: "  " })).toEqual([]);
    expect(contactSameAs({ github: "efm1k" })).toEqual([
      "https://github.com/efm1k",
    ]);
  });
});
