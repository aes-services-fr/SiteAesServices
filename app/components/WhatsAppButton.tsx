"use client";

import { site } from "../lib/site";
import { trackEvent } from "../lib/analytics";
import { WhatsAppIcon } from "./icons";

const PREFILLED = `Bonjour ${site.name}, je souhaite un devis gratuit pour des travaux de peinture.`;

// Fixed green WhatsApp bubble, bottom-left, with a pre-filled message.
export function WhatsAppButton() {
  if (!site.whatsappEnabled || !site.whatsapp) return null;

  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(PREFILLED)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { source: "whatsapp_float" })}
      className="fixed right-4 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-6 md:bottom-6"
      style={{ backgroundColor: "#25d366" }}
    >
      <WhatsAppIcon className="text-[30px]" />
    </a>
  );
}
