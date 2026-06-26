// Refreshes the Google rating + review count at build time using the
// Places API (New). No-ops (keeps the committed JSON) when the API key or
// place id are not provided, so local builds and forks still work.
//
// Required env (set as GitHub Actions secrets):
//   GOOGLE_MAPS_API_KEY  — API key with "Places API (New)" enabled
//   GOOGLE_PLACE_ID      — the Place ID of the Google Business Profile
import { promises as fs } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "app", "lib", "google-rating.json");

const KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE = process.env.GOOGLE_PLACE_ID;

async function main() {
  if (!KEY || !PLACE) {
    console.log("[google-rating] no API key / place id — keeping current values.");
    return;
  }

  const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE}`, {
    headers: {
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "rating,userRatingCount",
    },
  });

  if (!res.ok) {
    console.warn(`[google-rating] API ${res.status} — keeping current values.`);
    return;
  }

  const data = await res.json();
  if (typeof data.rating !== "number" || typeof data.userRatingCount !== "number") {
    console.warn("[google-rating] unexpected response — keeping current values.");
    return;
  }

  // French formatting: "5,0"
  const rating = data.rating.toFixed(1).replace(".", ",");
  const reviewCount = String(data.userRatingCount);
  const json = {
    rating,
    reviewCount,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  await fs.writeFile(OUT, JSON.stringify(json, null, 2) + "\n");
  console.log(`[google-rating] updated: ${rating}/5 · ${reviewCount} avis`);
}

main().catch((err) => {
  console.warn("[google-rating] error:", err.message, "— keeping current values.");
  process.exit(0); // never block the build
});
