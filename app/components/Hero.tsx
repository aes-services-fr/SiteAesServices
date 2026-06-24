import { site, has } from "../lib/site";
import { BookingButton } from "./BookingButton";
import { GoogleRating } from "./GoogleRating";
import { CheckIcon } from "./icons";

// Full-screen hero. Uses a layered charcoal + sage gradient as the signature
// until the client provides a hero photo (drop it at /public/images/hero.jpg
// and uncomment the <img> layer below + set objectPosition).
export function Hero() {
  const valueProps = [
    "Devis gratuit",
    has(site.experienceYears)
      ? `${site.experienceYears} ans d'expérience`
      : "Travail soigné & garanti",
    "Artisan local de confiance",
  ];

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink text-bg"
    >
      {/* Signature background — replace with a real photo when available:
          <img src={asset("/images/hero.jpg")} alt="..." className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" /> */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 0%, color-mix(in srgb, var(--color-sage) 30%, transparent) 0%, transparent 55%), linear-gradient(160deg, var(--color-ink) 0%, color-mix(in srgb, var(--color-ink) 70%, black) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 22px)",
        }}
      />

      <div className="mx-auto flex max-w-6xl flex-col items-start gap-7 px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        {site.google.hasReviews && (
          <div className="rounded-full bg-white/10 px-4 py-1.5 ring-1 ring-white/15">
            <GoogleRating variant="dark" />
          </div>
        )}

        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          Peintre en bâtiment à {site.city}
          <span className="text-accent-soft"> et 60 km alentour</span>
        </h1>

        <p className="max-w-xl text-lg text-bg/80">
          Peinture intérieure et extérieure, ravalement de façade et finitions
          décoratives. Un travail propre, des délais tenus et un devis gratuit
          sans engagement.
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {valueProps.map((vp) => (
            <li key={vp} className="flex items-center gap-2 text-sm text-bg/90">
              <CheckIcon className="text-base text-accent-soft" />
              {vp}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row">
          <BookingButton source="hero" action="form" variant="primary">
            Demander un devis gratuit
          </BookingButton>
          <BookingButton
            source="hero"
            action="phone"
            variant="ghost"
            withIcon
            className="!text-bg !ring-white/30 hover:!bg-white/10"
          >
            Appeler le {site.phoneDisplay}
          </BookingButton>
        </div>
      </div>
    </section>
  );
}
