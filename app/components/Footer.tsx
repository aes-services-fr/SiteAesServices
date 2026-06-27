import Link from "next/link";
import { site } from "../lib/site";
import { asset } from "../lib/asset";
import { PhoneIcon, MailIcon, MapPinIcon, InstagramIcon, FacebookIcon } from "./icons";
import { ManageCookiesButton } from "./Analytics";

export function Footer() {
  const year = "2026"; // build-time constant (export statique)

  return (
    <footer className="bg-ink text-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        {/* Brand */}
        <div className="md:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/images/logo-light.png")}
            alt={`${site.name}, peintre en bâtiment`}
            className="h-10 w-auto"
          />
          <p className="mt-3 max-w-sm text-sm text-bg/70">
            {site.trade} à {site.city}. Peinture intérieure et extérieure,
            ravalement de façade et décoration. Devis gratuit dans un rayon de{" "}
            {site.radiusKm} km.
          </p>

          <div className="mt-5 flex flex-col gap-2 text-sm">
            <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-bg/90 hover:text-bg">
              <PhoneIcon className="text-base text-accent-soft" /> {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-bg/90 hover:text-bg">
              <MailIcon className="text-base text-accent-soft" /> {site.email}
            </a>
            <span className="flex items-center gap-2 text-bg/70">
              <MapPinIcon className="text-base text-accent-soft" />
              {site.address.city} ({site.address.postalCode.slice(0, 2)})
            </span>
          </div>

          <div className="mt-5 flex gap-3">
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
              >
                <InstagramIcon className="text-base" />
                Instagram
              </a>
            )}
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
              >
                <FacebookIcon className="text-base" />
                Facebook
              </a>
            )}
          </div>
        </div>

        {/* Areas */}
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wide text-sage">
            Secteur
          </h3>
          <p className="mt-4 text-sm text-bg/70">
            {site.areas.slice(0, 10).join(", ")} et alentours.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-bg/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            © {year} {site.name}. Tous droits réservés.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales/" className="hover:text-bg">
              Mentions légales
            </Link>
            <ManageCookiesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
