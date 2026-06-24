"use client";

import { useEffect, useState } from "react";
import { site } from "../lib/site";
import { trackEvent } from "../lib/analytics";
import { BookingButton } from "./BookingButton";
import { Logo } from "./Logo";
import { MenuIcon, CloseIcon, PhoneIcon } from "./icons";

const NAV = [
  { href: "#prestations", label: "Prestations" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#a-propos", label: "À propos" },
  { href: "#avis", label: "Avis" },
  { href: "#zone", label: "Zone" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-line bg-bg/90 backdrop-blur"
          : "border-b border-transparent bg-bg/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label={`${site.name} — accueil`} className="flex items-center">
          <Logo size={22} />
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phone}`}
            onClick={() => trackEvent("cta_call", { source: "header" })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
          >
            <PhoneIcon className="text-base text-accent" />
            {site.phoneDisplay}
          </a>
          <BookingButton source="header" action="form">
            Demander un devis
          </BookingButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
        >
          {open ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-bg lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-base font-medium text-ink"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 py-4">
              <BookingButton
                source="mobile_menu"
                action="phone"
                withIcon
                variant="primary"
              >
                Appeler le {site.phoneDisplay}
              </BookingButton>
              <BookingButton source="mobile_menu" action="form" variant="ghost">
                Demander un devis
              </BookingButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
