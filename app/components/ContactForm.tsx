"use client";

import { useState } from "react";
import { site } from "../lib/site";
import { trackEvent } from "../lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

// Quote form. If a Web3Forms access key is configured, submissions are sent
// straight to the painter's inbox via fetch (no mail app needed). Otherwise it
// falls back to a mailto: link, both work on a static export.
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const useApi = Boolean(site.formAccessKey);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    if (useApi) {
      e.preventDefault();
      if (data.get("botcheck")) return; // honeypot
      setStatus("loading");
      trackEvent("quote_submit", { source: "contact_form" });
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: site.formAccessKey,
            subject: `Demande de devis, ${name || "site web"}`,
            from_name: `${site.name}, site web`,
            name,
            phone,
            email: email || "non renseigné",
            message,
          }),
        });
        setStatus(res.ok ? "success" : "error");
        if (res.ok) form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback: mailto
    e.preventDefault();
    const subject = `Demande de devis, ${name || "site web"}`;
    const body = [
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Email : ${email}`,
      "",
      "Projet :",
      message,
    ].join("\n");
    trackEvent("quote_submit", { source: "contact_form" });
    setStatus("success");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20";

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent">
          ✓
        </span>
        <p className="font-serif text-lg font-bold text-ink">Demande envoyée !</p>
        <p className="max-w-xs text-sm text-ink-soft">
          {useApi
            ? "Merci, nous avons bien reçu votre demande et vous recontactons sous 48h."
            : "Votre logiciel de messagerie va s'ouvrir. Si rien ne se passe, écrivez-nous à " +
              site.email +
              "."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      {/* Honeypot anti-spam */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
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
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[color-mix(in_srgb,var(--color-cta)_88%,black)] disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "Envoyer ma demande de devis"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600">
          Une erreur est survenue. Réessayez ou appelez-nous au {site.phoneDisplay}.
        </p>
      )}
      <p className="text-xs text-muted">
        Champs marqués d&apos;un * obligatoires. Nous vous recontactons sous 48h.
      </p>
    </form>
  );
}
