import { site, reviews } from "../lib/site";
import { GoogleRating } from "./GoogleRating";
import { StarIcon } from "./icons";

// Reviews section on a full-width charcoal band (marks a section change), with
// white review cards.
export function Reviews() {
  if (!site.google.hasReviews && reviews.length === 0) return null;

  return (
    <section id="avis" className="bg-ink py-20 text-bg">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <div className="flex justify-center">
          <GoogleRating variant="dark" />
        </div>
        <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
          Ils nous ont fait confiance
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-bg/75">
          {site.google.hasReviews
            ? `${site.google.reviewCount} clients nous ont laissé un avis sur Google, avec une note moyenne de ${site.google.rating}/5.`
            : "Découvrez les retours de nos clients."}
        </p>

        {reviews.length > 0 && (
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <blockquote
                key={i}
                className="rounded-2xl bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex gap-0.5 text-[#f5a623]">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <StarIcon key={j} className="text-sm" />
                  ))}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  “{r.text}”
                </p>
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
            className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-bg ring-1 ring-white/30 transition-colors hover:bg-white/10"
          >
            Lire les avis sur Google
          </a>
        )}
      </div>
    </section>
  );
}
