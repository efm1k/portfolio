import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/data/projects";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPaths = [
    "",
    "/projects",
    "/about",
    "/stack",
    "/services",
    "/contact",
  ];

  const projectPaths = getProjectSlugs().map((slug) => `/projects/${slug}`);

  return [...staticPaths, ...projectPaths].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: path.startsWith("/projects/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.7,
  }));
}
