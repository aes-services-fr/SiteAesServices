"use client";

import { useState } from "react";
import { site } from "../lib/site";
import { trackEvent } from "../lib/analytics";

// Static-export friendly quote form: composes a mailto: with the visitor's
// details. No backend required.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const subject = `Demande de devis — ${name || "site web"}`;
    const body = [
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Email : ${email}`,
      "",
      "Projet :",
      message,
    ].join("\n");

    trackEvent("quote_submit", { source: "contact_form" });
    setSent(true);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder="Votre nom *" className={field} />
        <input
          name="phone"
          type="tel"
          required
          placeholder="Téléphone *"
          className={field}
        />
      </div>
      <input name="email" type="email" placeholder="Email (optionnel)" className={field} />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Décrivez votre projet (pièces, surface, délais…) *"
        className={field}
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[color-mix(in_srgb,var(--color-cta)_88%,black)]"
      >
        Envoyer ma demande de devis
      </button>
      {sent && (
        <p className="text-xs text-ink-soft">
          Votre logiciel de messagerie va s&apos;ouvrir. Si rien ne se passe,
          écrivez-nous directement à {site.email}.
        </p>
      )}
      <p className="text-xs text-muted">
        Champs marqués d&apos;un * obligatoires. Nous vous recontactons sous 48h.
      </p>
    </form>
  );
}
