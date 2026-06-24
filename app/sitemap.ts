import type { MetadataRoute } from "next";
import { site } from "./lib/site";

export const dynamic = "force-static";

const baseUrl =
  site.domain && site.domain.startsWith("http")
    ? site.domain
    : "https://nyokaa.github.io/siteaesservices";

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
