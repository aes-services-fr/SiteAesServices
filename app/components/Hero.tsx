"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { site, has } from "../lib/site";
import { asset } from "../lib/asset";
import { BookingButton } from "./BookingButton";
import { GoogleRating } from "./GoogleRating";
import { CheckIcon } from "./icons";

// Full-screen hero: signature photo (Ken Burns) behind a charcoal scrim, with
// a staggered entrance for the content.
export function Hero() {
  const reduce = useReducedMotion();
  const valueProps = [
    "Devis gratuit",
    has(site.experienceYears)
      ? `Plus de ${site.experienceYears} ans d'expérience`
      : "Travail soigné & garanti",
    "Artisan local de confiance",
  ];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-bg">
      {/* Signature photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/images/hero.jpg")}
        alt="Intérieur peint par AES Services, mur vert sauge, finitions soignées à Bourges"
        className="absolute inset-0 -z-20 h-full w-full object-cover animate-kenburns"
        fetchPriority="high"
      />
      {/* Scrim + sage glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 85% 0%, color-mix(in srgb, var(--color-sage) 18%, transparent) 0%, transparent 55%), linear-gradient(180deg, color-mix(in srgb, var(--color-ink) 88%, transparent) 0%, color-mix(in srgb, var(--color-ink) 62%, transparent) 35%, color-mix(in srgb, var(--color-ink) 60%, transparent) 65%, color-mix(in srgb, var(--color-ink) 90%, transparent) 100%)",
        }}
      />

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate={reduce ? false : "show"}
        className="mx-auto flex max-w-6xl flex-col items-start gap-7 px-4 py-24 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] sm:px-6 sm:py-32 lg:py-40"
      >
        {site.google.hasReviews && (
          <motion.div
            variants={item}
            className="rounded-full bg-white/10 px-4 py-1.5 ring-1 ring-white/15"
          >
            <GoogleRating variant="dark" />
          </motion.div>
        )}

        <motion.h1
          variants={item}
          className="max-w-3xl font-serif text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
        >
          Peintre en bâtiment à {site.city}
          <span className="text-accent-soft"> et dans le Cher</span>
        </motion.h1>

        <motion.p variants={item} className="max-w-xl text-lg text-bg/80">
          Peinture intérieure et extérieure, ravalement de façade et finitions
          décoratives. Un travail propre, des délais tenus et un devis gratuit
          sans engagement.
        </motion.p>

        <motion.ul variants={item} className="flex flex-wrap gap-x-6 gap-y-2">
          {valueProps.map((vp) => (
            <li key={vp} className="flex items-center gap-2 text-sm text-bg/90">
              <CheckIcon className="text-base text-accent-soft" />
              {vp}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
          <BookingButton source="hero" action="form" variant="primary" withArrow>
            Demander un devis gratuit
          </BookingButton>
          <BookingButton
            source="hero"
            action="phone"
            variant="ghost"
            withIcon
            className="!text-bg !ring-white/30 hover:!bg-white/10"
          >
            Appeler le {site.phoneDisplay}
          </BookingButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
