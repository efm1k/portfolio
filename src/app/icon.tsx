import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0f10",
          color: "#d0a35c",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {siteConfig.name.slice(0, 1)}
      </div>
    ),
    size,
  );
}
