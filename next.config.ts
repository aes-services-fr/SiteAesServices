import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

// Repo name used for GitHub Pages project-site basePath
// (https://<user>.github.io/<repo>). Case-sensitive: must match the repo name
// exactly as GitHub serves it.
const REPO_NAME = "SiteAesServices";

// Custom domain detection: if public/CNAME exists, the site is served from the
// domain root, so we must NOT prefix paths with /<repo>.
const hasCNAME = fs.existsSync(path.join(process.cwd(), "public", "CNAME"));

// Only apply the basePath for production GitHub Pages builds without a custom domain.
const isGithubPages =
  process.env.GITHUB_PAGES === "true" && process.env.NODE_ENV === "production";

const basePath = isGithubPages && !hasCNAME ? `/${REPO_NAME}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
