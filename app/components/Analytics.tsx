"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_KEY,
  GA_ID,
  getStoredConsent,
  setStoredConsent,
  type ConsentValue,
} from "../lib/analytics";

// Loads gtag.js once, after consent is granted.
function loadGtag() {
  if (!GA_ID) return;
  if (document.getElementById("ga-src")) return;
  const s = document.createElement("script");
  s.id = "ga-src";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

// Custom event other components can dispatch to reopen the cookie banner.
const REOPEN_EVENT = "aes:open-cookie-banner";

export function Analytics() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const stored = getStoredConsent();
    setConsent(stored);
    if (stored === "granted") loadGtag();
    if (stored === null) setVisible(true);

    const onReopen = () => setVisible(true);
    window.addEventListener(REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_EVENT, onReopen);
  }, []);

  const choose = useCallback((value: ConsentValue) => {
    setStoredConsent(value);
    setConsent(value);
    setVisible(false);
    if (value === "granted") loadGtag();
  }, []);

  // No GA id configured → analytics is disabled entirely, render nothing.
  if (!GA_ID) return null;
  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-line bg-white p-5 shadow-xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2">
      <p className="text-sm text-ink">
        Nous utilisons des cookies de mesure d&apos;audience (Google Analytics)
        pour améliorer le site. Vous pouvez accepter ou refuser.
      </p>
      <p className="mt-1 text-xs text-muted">
        En savoir plus dans nos{" "}
        <Link
          href="/mentions-legales/#cookies"
          className="underline underline-offset-2"
        >
          mentions légales
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full px-5 py-2 text-sm font-semibold text-ink ring-1 ring-line hover:bg-bg-soft"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,black)]"
        >
          Accepter
        </button>
      </div>
      {consent && (
        <p className="mt-2 text-center text-[11px] text-muted">
          Choix actuel : {consent === "granted" ? "accepté" : "refusé"}
        </p>
      )}
    </div>
  );
}

// Footer link to re-open the consent banner. Renders nothing without GA.
export function ManageCookiesButton() {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
      className="hover:text-bg"
    >
      Gérer les cookies
    </button>
  );
}

export { CONSENT_KEY };
