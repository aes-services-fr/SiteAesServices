"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { beforeAfter } from "../lib/site";
import { asset } from "../lib/asset";

// Before/after carousel. Each slide = one same-room pair (avant + après).
export function BeforeAfter() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (beforeAfter.length === 0) return null;

  return (
    <section id="avant-apres" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Avant / Après
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
            La transformation, en images
          </h2>
          <p className="mt-3 text-ink-soft">
            Du support brut à la finition : faites glisser pour voir nos
            chantiers menés du début à la fin.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Avant/après précédent"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line hover:bg-bg-soft"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Avant/après suivant"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line hover:bg-bg-soft"
          >
            ›
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {beforeAfter.map((pair) => (
            <figure
              key={pair.title}
              className="min-w-0 flex-[0_0_88%] overflow-hidden rounded-2xl border border-line bg-white/60 sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
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
      </div>
    </section>
  );
}
