import Link from "next/link";
import { site } from "../lib/site";
import { Logo } from "./Logo";
import { PhoneIcon, MailIcon, MapPinIcon } from "./icons";
import { ManageCookiesButton } from "./Analytics";

const NAV = [
  { href: "#prestations", label: "Prestations" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#a-propos", label: "À propos" },
  { href: "#avis", label: "Avis" },
  { href: "#zone", label: "Zone d'intervention" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = "2026"; // build-time constant (export statique)

  return (
    <footer className="bg-ink text-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-2">
          <Logo size={24} tone="light" />
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
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </span>
          </div>

          <div className="mt-5 flex gap-3">
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
              >
                Instagram
              </a>
            )}
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
              >
                Facebook
              </a>
            )}
          </div>
        </div>

        {/* Nav */}
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wide text-bg/60">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-bg/80 hover:text-bg">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas */}
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wide text-bg/60">
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
