import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0f10",
          color: "#e8e4dc",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#d0a35c",
          }}
        >
          {siteConfig.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1 }}>
            {siteConfig.headline}
          </div>
          <div style={{ fontSize: 28, color: "#9a958b", maxWidth: 900 }}>
            {siteConfig.summary}
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#9a958b" }}>{siteConfig.name}</div>
      </div>
    ),
    size,
  );
}
