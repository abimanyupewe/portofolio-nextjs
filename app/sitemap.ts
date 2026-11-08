import type { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/app/actions/blogs";
import { getProjects } from "@/app/actions/projects";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, projects] = await Promise.all([getPublishedBlogs(), getProjects()]);

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8 },
    ...(projects ?? []).map((project: { id: string; created_at?: string }) => ({
      url: absoluteUrl(`/projects/${project.id}`),
      lastModified: project.created_at ? new Date(project.created_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...(blogs ?? []).map((blog: { slug: string; created_at?: string }) => ({
      url: absoluteUrl(`/blog/${blog.slug}`),
      lastModified: blog.created_at ? new Date(blog.created_at) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
