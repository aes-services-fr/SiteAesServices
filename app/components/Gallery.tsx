"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { gallery, galleryCategories, type GalleryCategory } from "../lib/site";
import { asset } from "../lib/asset";
import { RollerIcon } from "./icons";

type Filter = "Tout" | GalleryCategory;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("Tout");

  const items = useMemo(
    () =>
      filter === "Tout"
        ? gallery
        : gallery.filter((g) => g.category === filter),
    [filter],
  );

  const hasPhotos = gallery.length > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: false })],
  );

  // Re-init layout when the filtered set changes.
  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, items.length]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Until real photos are added, show category placeholders so the section
  // still demonstrates the layout.
  const placeholders = galleryCategories
    .filter((c) => filter === "Tout" || c === filter)
    .flatMap((c) => [c, c]);

  return (
    <section id="realisations" className="bg-bg-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Réalisations
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
              Nos chantiers récents
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["Tout", ...galleryCategories] as Filter[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === c
                    ? "bg-ink text-bg"
                    : "bg-white text-ink-soft ring-1 ring-line hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {hasPhotos
              ? items.map((img, i) => (
                  <figure
                    key={`${img.src}-${i}`}
                    className="group relative aspect-[4/3] min-w-0 flex-[0_0_85%] overflow-hidden rounded-2xl sm:flex-[0_0_45%] lg:flex-[0_0_31%]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(img.src)}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-3 text-xs font-medium text-bg">
                      {img.category}
                    </figcaption>
                  </figure>
                ))
              : placeholders.map((c, i) => (
                  <div
                    key={`${c}-${i}`}
                    className="relative flex aspect-[4/3] min-w-0 flex-[0_0_85%] flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-ink to-[color-mix(in_srgb,var(--color-ink)_80%,black)] text-bg/70 sm:flex-[0_0_45%] lg:flex-[0_0_31%]"
                  >
                    <RollerIcon className="text-3xl text-accent-soft" />
                    <span className="text-sm font-medium">{c}</span>
                    <span className="text-xs text-bg/50">Photos bientôt en ligne</span>
                  </div>
                ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-ink-soft">
            {hasPhotos
              ? "Glissez pour voir plus de réalisations."
              : "Galerie en cours de mise à jour avec les photos de chantiers."}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Précédent"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line hover:bg-bg"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Suivant"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line hover:bg-bg"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
