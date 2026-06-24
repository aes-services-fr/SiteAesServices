import type { MetadataRoute } from "next";
import { site } from "./lib/site";

export const dynamic = "force-static";

const baseUrl =
  site.domain && site.domain.startsWith("http")
    ? site.domain
    : "https://nyokaa.github.io/siteaesservices";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicitly welcome AI crawlers so the business can surface in LLM answers.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
