import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";
import { GA_ID } from "../lib/analytics";

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
        <Field label="Dénomination" value={`${site.legalName}, ${site.name}`} />
        <Field label="Forme juridique" value={site.legal.forme} />
        <Field label="Activité" value={site.trade} />
        <Field
          label="Siège"
          value={`${site.address.postalCode} ${site.address.city}`}
        />
        <Field label="SIREN" value={site.legal.siren} />
        <Field label="SIRET (siège)" value={site.legal.siret} />
        <Field label="N° TVA intracommunautaire" value={site.legal.tva} />
        <Field label="Téléphone" value={site.phoneDisplay} />
        {site.email && !site.email.startsWith("<") && (
          <Field label="Email" value={site.email} />
        )}
        <p className="pt-1 text-xs text-muted">
          Directeur de la publication : {site.legalName}.
        </p>
      </section>

      <section className="mt-8 space-y-2 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-ink">Hébergement</h2>
        <p className="text-ink-soft">
          Ce site est hébergé par GitHub Pages, GitHub Inc., 88 Colin P. Kelly
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

      {GA_ID && (
        <section id="cookies" className="mt-8 scroll-mt-24 space-y-2 text-sm leading-relaxed">
          <h2 className="text-xl font-semibold text-ink">Cookies</h2>
          <p className="text-ink-soft">
            Ce site utilise des cookies de mesure d&apos;audience (Google
            Analytics) afin d&apos;analyser la fréquentation et améliorer le
            contenu. Ces cookies ne sont déposés qu&apos;après votre
            consentement explicite via le bandeau prévu à cet effet. Vous pouvez
            modifier ou retirer votre choix à tout moment en cliquant sur «&nbsp;Gérer
            les cookies&nbsp;» en bas de page. Aucun cookie publicitaire
            n&apos;est utilisé.
          </p>
        </section>
      )}
    </main>
  );
}
