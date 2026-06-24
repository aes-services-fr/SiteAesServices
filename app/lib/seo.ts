import { site, has } from "./site";

// Canonical absolute base URL. Uses the custom domain once it's set in
// site.domain, otherwise falls back to the GitHub Pages project URL.
export const baseUrl = has(site.domain)
  ? site.domain.replace(/\/$/, "")
  : "https://nyokaa.github.io/SiteAesServices";

export function abs(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${p}`;
}
