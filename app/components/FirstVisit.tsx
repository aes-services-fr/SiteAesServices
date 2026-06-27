import { MailIcon, HandshakeIcon, SparkleIcon } from "./icons";

const CARDS = [
  {
    icon: MailIcon,
    title: "Un devis clair et gratuit",
    text: "Pas de mauvaise surprise : vous recevez un devis détaillé, ligne par ligne, avant toute intervention.",
  },
  {
    icon: HandshakeIcon,
    title: "Un seul interlocuteur",
    text: "De la première visite à la dernière finition, c'est la même personne qui suit votre chantier.",
  },
  {
    icon: SparkleIcon,
    title: "Un chantier propre",
    text: "Protection du mobilier, rangement quotidien et nettoyage complet en fin de chantier.",
  },
];

// Reassurance block on a full-width softly-tinted band.
export function FirstVisit() {
  return (
    <section className="bg-sage-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink/60">
            Premier projet de peinture ?
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
            Vous êtes entre de bonnes mains
          </h2>
          <p className="mt-3 text-ink/75">
            C&apos;est la première fois que vous faites appel à un peintre ? Voici
            ce qui vous attend.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <c.icon className="text-2xl" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-bold text-ink">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
