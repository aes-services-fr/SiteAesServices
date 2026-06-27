"use client";

import { useState } from "react";
import { faqs } from "../lib/site";
import { ChevronDownIcon } from "./icons";

// Accordion. Every answer is rendered in the initial DOM (good for SEO +
// matches the FAQPage JSON-LD); open/close is a pure CSS grid-rows transition,
// no AnimatePresence / conditional mounting.
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          FAQ
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Vos questions fréquentes
        </h2>
      </div>

      <div className="divide-y divide-line rounded-2xl border border-line bg-white shadow-sm">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="px-5">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold text-ink">{f.q}</span>
                  <ChevronDownIcon
                    className={`shrink-0 text-lg text-accent transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <div className="faq-grid" data-open={isOpen}>
                <div>
                  <p className="pb-5 text-sm leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
