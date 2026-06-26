// Refreshes the Google rating + review count at build time using the Places
// API (New) **Text Search** — searching by business name finds the actual
// Google Business Profile (with its rating), even for service-area businesses
// whose Place ID otherwise resolves to a plain address.
//
// No-ops (keeps the committed JSON) when the API key is missing, so local
// builds and forks still work.
//
// Required env (GitHub Actions secret):
//   GOOGLE_MAPS_API_KEY  — key with "Places API (New)" enabled
// Optional:
//   GOOGLE_PLACE_QUERY   — override the search query
import { promises as fs } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "app", "lib", "google-rating.json");
const KEY = process.env.GOOGLE_MAPS_API_KEY;
const QUERY =
  process.env.GOOGLE_PLACE_QUERY || "AES Services peintre La Chapelle-Saint-Ursin";

async function main() {
  if (!KEY) {
    console.log("[google-rating] no API key — keeping current values.");
    return;
  }

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "places.displayName,places.rating,places.userRatingCount",
    },
    body: JSON.stringify({ textQuery: QUERY, languageCode: "fr", regionCode: "FR" }),
  });

  const raw = await res.text();
  // TEMP diagnostic (public) — remove once confirmed working.
  try {
    await fs.writeFile(
      path.join(process.cwd(), "public", "_rating-debug.json"),
      JSON.stringify({ status: res.status, body: raw.slice(0, 1200) }, null, 2),
    );
  } catch {
    /* ignore */
  }
  if (!res.ok) {
    console.warn(`[google-rating] API ${res.status} — body: ${raw.slice(0, 300)}`);
    return;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.warn(`[google-rating] non-JSON: ${raw.slice(0, 200)}`);
    return;
  }

  const places = Array.isArray(data.places) ? data.places : [];
  // First result that actually carries a rating (skips bare addresses).
  const place = places.find(
    (p) => typeof p.rating === "number" && typeof p.userRatingCount === "number",
  );
  if (!place) {
    console.warn(
      `[google-rating] no rated place for "${QUERY}" — body: ${raw.slice(0, 300)}`,
    );
    return;
  }

  const rating = place.rating.toFixed(1).replace(".", ",");
  const reviewCount = String(place.userRatingCount);
  await fs.writeFile(
    OUT,
    JSON.stringify(
      { rating, reviewCount, updatedAt: new Date().toISOString().slice(0, 10) },
      null,
      2,
    ) + "\n",
  );
  console.log(
    `[google-rating] updated: ${rating}/5 · ${reviewCount} avis (${place.displayName?.text ?? "?"})`,
  );
}

main().catch((err) => {
  console.warn("[google-rating] error:", err.message, "— keeping current values.");
  process.exit(0);
});
