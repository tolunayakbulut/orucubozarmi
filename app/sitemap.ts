import type { MetadataRoute } from "next";
import { getAllFetvalar } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://orucubozarmi.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  try {
    const fetvalar = await getAllFetvalar();
    const fetvaRoutes: MetadataRoute.Sitemap = fetvalar.map((fetva) => ({
      url: `${baseUrl}/${fetva.slug}`,
      lastModified: fetva.created_at,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...fetvaRoutes];
  } catch {
    return staticRoutes;
  }
}
