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
  name: "AES SERVICES",
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

// Text + branding overlay drawn on top of the composited photo. The left ~58%
// is a solid charcoal panel (text always legible); the photo bleeds in on the
// right behind a gradient fade.
function ogOverlaySvg(rating, reviewCount) {
  const { tagline, subline, bg, accent, ink, muted } = BRAND;
  const star = `<path transform="translate(0,-22) scale(1.5)" d="M12 .8l3 6.1 6.7 1-4.9 4.7 1.2 6.7L12 20l-6 3.1 1.2-6.7L2.3 7.9l6.7-1z" fill="#f5a623"/>`;
  const ratingBlock =
    rating && reviewCount
      ? `<g transform="translate(92,470)">
           ${star}
           <text x="34" y="0" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" fill="${ink}">${escapeXml(rating)}/5</text>
           <text x="118" y="0" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${muted}">${escapeXml(reviewCount)} avis Google</text>
         </g>`
      : "";
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${bg}" stop-opacity="1"/>
      <stop offset="0.52" stop-color="${bg}" stop-opacity="1"/>
      <stop offset="0.78" stop-color="${bg}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${bg}" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <!-- accent edge -->
  <rect x="0" y="0" width="14" height="630" fill="${accent}"/>
  <rect x="92" y="250" width="110" height="12" rx="6" fill="${accent}"/>
  <text x="92" y="338" font-family="Helvetica, Arial, sans-serif" font-size="46" font-weight="700" fill="${accent}">${escapeXml(tagline)}</text>
  <text x="92" y="396" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${muted}">${escapeXml(subline)}</text>
  ${ratingBlock}
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

async function readRating() {
  try {
    const raw = await fs.readFile(
      path.join(ROOT, "app", "lib", "google-rating.json"),
      "utf8",
    );
    const { rating, reviewCount } = JSON.parse(raw);
    return { rating, reviewCount };
  } catch {
    return { rating: "", reviewCount: "" };
  }
}

async function main() {
  await fs.mkdir(PUBLIC, { recursive: true });

  // 1) Signature photo as the base, cropped to the OG canvas.
  const photoPath = path.join(PUBLIC, "images", "hero.jpg");
  const base = await sharp(photoPath)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .toBuffer();

  // 2) Charcoal panel + text/rating overlay.
  const { rating, reviewCount } = await readRating();
  const overlay = Buffer.from(ogOverlaySvg(rating, reviewCount));

  // 3) Brand logo (light version) top-left.
  const logo = await sharp(path.join(PUBLIC, "images", "logo-light.png"))
    .resize({ width: 300 })
    .toBuffer();

  await sharp(base)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logo, top: 96, left: 90 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(PUBLIC, "og.jpg"));
  console.log("[generate-og] wrote public/og.jpg (1200×630, photo + logo)");

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
