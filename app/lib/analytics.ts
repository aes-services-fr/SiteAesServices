// Lightweight GA4 helpers. Everything degrades to a no-op until a
// NEXT_PUBLIC GA id is set AND the visitor has given consent, so it is safe to
// call trackEvent() from any CTA today even though analytics is wired in step 6.
import { site } from "./site";

export const CONSENT_KEY = "aes_cookie_consent";
export const GA_ID = site.gaMeasurementId;

export type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}

// Track a CTA / interaction event. `source` distinguishes where the click came
// from (hero, header, mobile_sticky, service_<id>, whatsapp_click, ...).
export function trackEvent(
  action: string,
  params: { source?: string; [key: string]: unknown } = {},
): void {
  if (typeof window === "undefined") return;
  if (!GA_ID) return;
  if (getStoredConsent() !== "granted") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}
