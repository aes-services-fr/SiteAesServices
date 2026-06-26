import { beforeAfter } from "../lib/site";
import { asset } from "../lib/asset";

// Before/after section. Each pair shown as two labeled images side by side.
export function BeforeAfter() {
  if (beforeAfter.length === 0) return null;

  return (
    <section id="avant-apres" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Avant / Après
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
          La transformation, en images
        </h2>
        <p className="mt-3 text-ink-soft">
          Du support brut à la finition : voici quelques chantiers menés du début
          à la fin.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {beforeAfter.map((pair) => (
          <figure
            key={pair.title}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-white/60"
          >
            <div className="grid grid-cols-2">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(pair.before)}
                  alt={pair.beforeAlt}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
                <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-bg">
                  Avant
                </span>
              </div>
              <div className="relative border-l-2 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(pair.after)}
                  alt={pair.afterAlt}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
                <span className="absolute right-2 top-2 rounded-full bg-cta px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
                  Après
                </span>
              </div>
            </div>
            <figcaption className="px-4 py-3 text-sm font-semibold text-ink">
              {pair.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
