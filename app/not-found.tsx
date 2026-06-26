import Link from "next/link";
import { site } from "./lib/site";
import { Logo } from "./components/Logo";
import { PhoneIcon } from "./components/icons";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center">
      <Logo size={28} />
      <p className="font-serif text-7xl font-bold text-line">404</p>
      <div>
        <h1 className="font-serif text-2xl font-bold text-ink">
          Cette page n&apos;existe pas
        </h1>
        <p className="mt-2 max-w-md text-ink-soft">
          La page que vous cherchez a peut-être été déplacée. Retournez à
          l&apos;accueil ou contactez-nous directement.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[color-mix(in_srgb,var(--color-cta)_88%,black)]"
        >
          Retour à l&apos;accueil
        </Link>
        <a
          href={`tel:${site.phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink ring-1 ring-line hover:bg-bg-soft"
        >
          <PhoneIcon className="text-base text-accent" />
          {site.phoneDisplay}
        </a>
      </div>
    </main>
  );
}
