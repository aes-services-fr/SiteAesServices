import { site, has } from "../lib/site";
import { asset } from "../lib/asset";
import { BookingButton } from "./BookingButton";
import { CheckIcon } from "./icons";

// "Le peintre" / about section. Portrait slot at /public/images/portrait.jpg.
export function About() {
  const points = [
    "Travail propre et finitions soignées",
    "Conseils couleurs et matériaux adaptés",
    "Devis clair, délais respectés",
    `Intervention à ${site.city} et dans un rayon de ${site.radiusKm} km`,
  ];

  return (
    <section id="a-propos" className="bg-bg-soft py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        {/* Portrait */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-bg-soft lg:max-w-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/images/portrait.jpg")}
            alt={`${has(site.artisanName) ? site.artisanName + ", " : ""}peintre en bâtiment AES Services à ${site.city}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            À propos
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
            {has(site.artisanName) ? site.artisanName : site.name}, votre peintre à{" "}
            {site.city}
          </h2>
          <p className="mt-4 text-ink-soft">
            {site.name} accompagne particuliers et professionnels du secteur de{" "}
            {site.city} pour tous leurs travaux de peinture et de décoration.
            Artisan peintre autodidacte et passionné, fort de plus de{" "}
            {site.experienceYears} ans d&apos;expérience, je mets un point
            d&apos;honneur à livrer un travail net, durable et conforme à vos
            attentes — préparation soignée, finitions propres et délais tenus.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink">
                <CheckIcon className="mt-0.5 text-base text-accent" />
                {p}
              </li>
            ))}
          </ul>

          {site.certifications.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {site.certifications.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink ring-1 ring-line"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8">
            <BookingButton source="about" action="form" variant="primary">
              Discuter de mon projet
            </BookingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
