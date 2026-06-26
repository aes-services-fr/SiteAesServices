// Reusable asset generator: builds the Open Graph signature image (1200×630),
// the apple-touch-icon (180×180) and a favicon (32×32) from inline SVG using
// sharp. Re-run with `npm run generate:og` whenever the brand text/palette
// changes. Brand values are read from the BRAND object below (kept in sync
// with app/lib/site.ts).
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");

// --- Brand (keep in sync with app/lib/site.ts) -----------------------------
const BRAND = {
  name: "AES Services",
  tagline: "Peintre en bâtiment à Bourges",
  subline: "Devis gratuit · Bourges et 30 km alentour",
  bg: "#2c2e30", // charcoal (logo black)
  bgSoft: "#3a3d3f",
  accent: "#a8cd9e", // sage green (logo)
  ink: "#f5f7f3",
  muted: "#b9beb6",
};

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c],
  );
}

function ogSvg() {
  const { name, tagline, subline, bg, bgSoft, accent, ink, muted } = BRAND;
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="${bgSoft}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- accent brush stroke -->
  <rect x="0" y="0" width="14" height="630" fill="${accent}"/>
  <rect x="90" y="150" width="120" height="14" rx="7" fill="${accent}"/>
  <text x="90" y="300" font-family="Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="${ink}">${escapeXml(name)}</text>
  <text x="92" y="372" font-family="Helvetica, Arial, sans-serif" font-size="44" font-weight="600" fill="${accent}">${escapeXml(tagline)}</text>
  <text x="92" y="450" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${muted}">${escapeXml(subline)}</text>
</svg>`;
}

function iconSvg(size) {
  const { bg, accent, ink } = BRAND;
  const fs1 = Math.round(size * 0.64);
  const dot = Math.round(size * 0.085);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="${bg}"/>
  <text x="${size * 0.46}" y="${size * 0.54}" text-anchor="middle" dominant-baseline="central" font-family="Helvetica, Arial, sans-serif" font-size="${fs1}" font-weight="700" fill="${ink}">A</text>
  <circle cx="${size * 0.72}" cy="${size * 0.66}" r="${dot}" fill="${accent}"/>
</svg>`;
}

async function main() {
  await fs.mkdir(PUBLIC, { recursive: true });

  const og = Buffer.from(ogSvg());
  await sharp(og).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(PUBLIC, "og.jpg"));
  console.log("[generate-og] wrote public/og.jpg (1200×630)");

  await sharp(Buffer.from(iconSvg(180)))
    .png()
    .toFile(path.join(PUBLIC, "apple-touch-icon.png"));
  console.log("[generate-og] wrote public/apple-touch-icon.png (180×180)");

  await sharp(Buffer.from(iconSvg(32)))
    .png()
    .toFile(path.join(PUBLIC, "favicon-32.png"));
  // icon.png is picked up by Next.js as a favicon source too.
  await sharp(Buffer.from(iconSvg(512)))
    .png()
    .toFile(path.join(PUBLIC, "icon.png"));
  console.log("[generate-og] wrote public/favicon-32.png + public/icon.png");
}

main().catch((err) => {
  console.error("[generate-og] fatal:", err);
  process.exit(1);
});
