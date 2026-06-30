"use client";

import { useState } from "react";
import type { SVGProps, ReactNode } from "react";
import { services } from "../lib/site";
import { BookingButton } from "./BookingButton";
import {
  RollerIcon,
  TrowelIcon,
  PanelIcon,
  PaletteIcon,
  DoorIcon,
  HouseIcon,
  ChevronDownIcon,
} from "./icons";

// One icon per service (keyed by service id).
const SERVICE_ICONS: Record<string, (p: SVGProps<SVGSVGElement>) => ReactNode> = {
  "mise-en-peinture": RollerIcon,
  "ratissage-poncage": TrowelIcon,
  "bandes-placo": PanelIcon,
  "decoration-couleur": PaletteIcon,
  "boiseries-menuiseries": DoorIcon,
  "peinture-exterieure": HouseIcon,
};

// Services grid. Mobile: 2 compact columns, tap a card to expand its
// description. Desktop: 3 columns with descriptions always visible.
export function Services() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="prestations" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Prestations
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Des travaux de peinture soignés,
          <br />
          du sol au plafond
        </h2>
        <p className="mt-3 text-ink-soft">
          Chaque chantier commence par un devis gratuit et détaillé. Voici les
          prestations les plus demandées.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {services.map((s) => {
          const isOpen = openId === s.id;
          const Icon = SERVICE_ICONS[s.id] ?? RollerIcon;
          return (
            <article
              key={s.id}
              className="flex flex-col rounded-2xl border border-line bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-md sm:p-6"
            >
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <Icon className="text-xl" />
              </span>

              <h3 className="font-serif text-base font-bold text-ink sm:text-lg">
                {s.title}
              </h3>

              {/* Description: always shown on desktop, collapsible on mobile */}
              <p
                className={`mt-1 text-sm text-ink-soft lg:block ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                {s.description}
              </p>

              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : s.id)}
                aria-expanded={isOpen}
                className="mt-1 flex items-center gap-1 self-start text-xs font-semibold text-accent lg:hidden"
              >
                {isOpen ? "Réduire" : "En savoir plus"}
                <ChevronDownIcon
                  className={`text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div className="mt-auto pt-4">
                <span className="text-sm font-semibold text-ink">{s.price}</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl bg-ink p-6 text-bg sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="font-serif text-xl font-semibold">
          Un projet en tête ? Recevez votre devis gratuit.
        </p>
        <BookingButton source="services_top" action="form" variant="primary" withArrow>
          Demander un devis
        </BookingButton>
      </div>
    </section>
  );
}
