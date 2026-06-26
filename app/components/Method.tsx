import { MailIcon, RollerIcon, CheckIcon } from "./icons";

const STEPS = [
  {
    n: "1",
    icon: MailIcon,
    title: "Devis gratuit",
    text: "On échange sur votre projet, on visite si besoin, et vous recevez un devis clair et détaillé, sans engagement.",
  },
  {
    n: "2",
    icon: RollerIcon,
    title: "Préparation",
    text: "Protection des sols et du mobilier, rebouchage, ponçage et sous-couche : la base d'une finition durable.",
  },
  {
    n: "3",
    icon: CheckIcon,
    title: "Réalisation",
    text: "Application soignée, respect des délais et nettoyage du chantier. Vous validez le résultat avant notre départ.",
  },
];

export function Method() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Comment ça se passe
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Un déroulé simple, en 3 étapes
        </h2>
      </div>

      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="relative rounded-2xl border border-line bg-white/60 p-6"
          >
            <span className="absolute right-5 top-5 font-serif text-5xl font-bold text-line">
              {s.n}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
              <s.icon className="text-2xl" />
            </span>
            <h3 className="mt-4 font-serif text-xl font-bold text-ink">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
