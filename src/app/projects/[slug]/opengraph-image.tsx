import { ImageResponse } from "next/og";
import { getProject } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { PROJECT_TYPE_LABELS } from "@/types/project";

export const alt = "Кейс проекта";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectOpenGraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? "Кейс";
  const task = project?.shortTask ?? siteConfig.summary;
  const typeLabel = project ? PROJECT_TYPE_LABELS[project.type] : "Demo";

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
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#d0a35c",
          }}
        >
          {typeLabel} · Demo
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#9a958b", maxWidth: 960 }}>
            {task}
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#9a958b" }}>
          {siteConfig.name} — не клиентский проект
        </div>
      </div>
    ),
    size,
  );
}
