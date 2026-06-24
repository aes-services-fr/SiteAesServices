import { site } from "../lib/site";
import { StarIcon } from "./icons";

// Google rating badge: stars + score + clickable review count. Renders nothing
// if the business has no reviews yet.
export function GoogleRating({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const { hasReviews, rating, reviewCount, reviewUrl } = site.google;
  if (!hasReviews) return null;

  const numeric = Number(String(rating).replace(",", ".")) || 5;
  const text = variant === "dark" ? "text-bg" : "text-ink";
  const sub = variant === "dark" ? "text-bg/70" : "text-ink-soft";

  const inner = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex items-center gap-0.5 text-[#f5a623]">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className="text-base"
            style={{ opacity: i < Math.round(numeric) ? 1 : 0.3 }}
          />
        ))}
      </span>
      <span className={`text-sm font-semibold ${text}`}>{rating}/5</span>
      <span className={`text-sm ${sub}`}>· {reviewCount} avis Google</span>
    </span>
  );

  if (reviewUrl) {
    return (
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`Note ${rating} sur 5 sur Google, ${reviewCount} avis`}
      >
        {inner}
      </a>
    );
  }
  return inner;
}
