import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales de ${site.name}, ${site.trade}.`,
  robots: { index: false, follow: true },
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-semibold text-ink">{label} :</span>{" "}
      <span className="text-ink-soft">{value}</span>
    </p>
  );
}

export default function MentionsLegales() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="text-sm text-accent underline-offset-4 hover:underline"
      >
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-ink">Mentions légales</h1>

      <section className="mt-8 space-y-2 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-ink">Éditeur du site</h2>
        <Field label="Dénomination" value={site.legalName} />
        <Field label="Activité" value={site.trade} />
        <Field
          label="Adresse"
          value={`${site.address.street}, ${site.address.postalCode} ${site.address.city}`}
        />
        <Field label="Téléphone" value={site.phoneDisplay} />
        {site.email && !site.email.startsWith("<") && (
          <Field label="Email" value={site.email} />
        )}
      </section>

      <section className="mt-8 space-y-2 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-ink">Hébergement</h2>
        <p className="text-ink-soft">
          Ce site est hébergé par GitHub Pages — GitHub Inc., 88 Colin P. Kelly
          Jr. Street, San Francisco, CA 94107, États-Unis.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-ink">Propriété intellectuelle</h2>
        <p className="text-ink-soft">
          L&apos;ensemble des contenus (textes, images, logo) présents sur ce
          site est protégé par le droit d&apos;auteur. Toute reproduction sans
          autorisation est interdite.
        </p>
      </section>

      {/* La section Cookies est ajoutée à l'étape 6 si un GA ID est fourni. */}
    </main>
  );
}
