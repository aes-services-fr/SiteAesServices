"use client";

import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { chantierVideos } from "../lib/site";
import { asset } from "../lib/asset";

// "AES SERVICES à l'œuvre" : short vertical clips of Sébastien on site.
// Autoplay, looped and 100% muted (the source files have no audio track),
// and only the clip currently on screen plays — the others stay paused so the
// page stays light on mobile.
export function ChantierVideos() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Play a clip only while it is at least half visible; pause it otherwise.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    for (const v of videoRefs.current) if (v) observer.observe(v);
    return () => observer.disconnect();
  }, []);

  if (chantierVideos.length === 0) return null;

  return (
    <section id="en-chantier" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          En chantier
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
          AES SERVICES à l&apos;œuvre
        </h2>
        <p className="mt-3 text-ink-soft">
          Quelques instants pris sur nos chantiers : ratissage, ponçage,
          jointage et mise en couleur. Le savoir-faire, en mouvement.
        </p>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {chantierVideos.map((v, i) => (
            <figure
              key={v.src}
              className="group relative aspect-[9/16] min-w-0 flex-[0_0_78%] overflow-hidden rounded-2xl bg-ink shadow-sm sm:flex-[0_0_42%] lg:flex-[0_0_31%]"
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className="h-full w-full object-cover"
                poster={asset(v.poster)}
                muted
                loop
                playsInline
                preload="none"
                aria-label={v.alt}
              >
                <source src={asset(v.src)} type="video/mp4" />
              </video>
              {/* gradient + label */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-4"
              >
                <span className="text-sm font-semibold text-bg">{v.label}</span>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-ink-soft">Glissez pour voir les autres vidéos.</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Vidéo précédente"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line hover:bg-bg"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Vidéo suivante"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line hover:bg-bg"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
