import type { MetadataRoute } from "next";
import { baseUrl } from "./lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/mentions-legales/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
