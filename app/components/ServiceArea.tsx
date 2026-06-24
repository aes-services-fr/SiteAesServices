import { site } from "../lib/site";
import { MapPinIcon } from "./icons";

export function ServiceArea() {
  const mapQuery = encodeURIComponent(
    `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
  );
  // Keyless Google Maps embed (works without an API key).
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&z=10&output=embed`;

  return (
    <section id="zone" className="bg-bg-soft py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Zone d&apos;intervention
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
            {site.city} et {site.radiusKm} km alentour
          </h2>
          <p className="mt-3 text-ink-soft">
            Basés à {site.address.city}, nous intervenons dans tout le secteur de{" "}
            {site.city} et le département du Cher. Voici quelques-unes des
            communes desservies :
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {site.areas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm text-ink ring-1 ring-line"
              >
                <MapPinIcon className="text-sm text-accent" />
                {area}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-ink-soft">
            Votre commune n&apos;est pas dans la liste ?{" "}
            <a href="#contact" className="font-semibold text-accent underline-offset-4 hover:underline">
              Contactez-nous
            </a>
            , nous étudions chaque demande.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-line shadow-sm">
          <iframe
            title={`Carte — zone d'intervention de ${site.name} autour de ${site.city}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[340px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
