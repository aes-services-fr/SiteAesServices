import type { MetadataRoute } from "next";
import { baseUrl } from "./lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/mentions-legales/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
