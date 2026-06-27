"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { beforeAfter } from "../lib/site";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

// Before/after carousel. Each slide is an interactive "curtain" slider.
// Carousel navigation is via the arrows only (watchDrag disabled) so the
// horizontal drag is reserved for the comparison handle.
export function BeforeAfter() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    watchDrag: false,
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (beforeAfter.length === 0) return null;

  return (
    <section id="avant-apres" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Avant / Après
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
          La transformation, en images
        </h2>
        <p className="mt-3 text-ink-soft">
          Faites glisser le trait pour comparer l&apos;avant et l&apos;après de
          nos chantiers.
        </p>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {beforeAfter.map((pair) => (
            <figure
              key={pair.title}
              className="min-w-0 flex-[0_0_92%] sm:flex-[0_0_80%] lg:flex-[0_0_62%]"
            >
              <BeforeAfterSlider
                before={pair.before}
                after={pair.after}
                beforeAlt={pair.beforeAlt}
                afterAlt={pair.afterAlt}
              />
              <figcaption className="mt-3 text-center text-sm font-semibold text-ink">
                {pair.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Navigation below the images */}
      <div className="mt-7 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Avant/après précédent"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-md ring-2 ring-sage transition-transform hover:scale-105 hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,black)]"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Avant/après suivant"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-md ring-2 ring-sage transition-transform hover:scale-105 hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,black)]"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
