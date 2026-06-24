import { site, reviews } from "../lib/site";
import { GoogleRating } from "./GoogleRating";
import { StarIcon } from "./icons";

// Reviews section. We never invent review text — if no review content is
// provided we surface the verified Google score + a link to read the reviews.
export function Reviews() {
  if (!site.google.hasReviews && reviews.length === 0) return null;

  return (
    <section id="avis" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl border border-line bg-white/60 p-8 text-center sm:p-12">
        <div className="flex justify-center">
          <GoogleRating />
        </div>
        <h2 className="mt-4 font-serif text-3xl font-bold text-ink sm:text-4xl">
          La confiance de nos clients
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          {site.google.hasReviews
            ? `${site.google.reviewCount} clients nous ont laissé un avis sur Google, avec une note moyenne de ${site.google.rating}/5.`
            : "Découvrez les retours de nos clients."}
        </p>

        {reviews.length > 0 && (
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <blockquote
                key={i}
                className="rounded-2xl border border-line bg-bg p-5"
              >
                <div className="flex gap-0.5 text-[#f5a623]">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <StarIcon key={j} className="text-sm" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-ink-soft">“{r.text}”</p>
                <footer className="mt-3 text-sm font-semibold text-ink">
                  {r.author}
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        {site.google.reviewUrl && (
          <a
            href={site.google.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-[color-mix(in_srgb,var(--color-ink)_88%,black)]"
          >
            Lire les avis sur Google
          </a>
        )}
      </div>
    </section>
  );
}
