// Prefixes a public path with the active basePath so assets resolve correctly
// both on a custom domain (basePath = "") and on a GitHub Pages project site
// (basePath = "/<repo>"). Use for any <img src>, link href, or fetch to a file
// living under /public.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
