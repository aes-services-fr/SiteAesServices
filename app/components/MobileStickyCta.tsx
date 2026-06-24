"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../lib/site";
import { trackEvent } from "../lib/analytics";
import { PhoneIcon, MailIcon } from "./icons";

// Floating bottom CTA bar, mobile only, appears after 600px of scroll.
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-bg/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden"
        >
          <a
            href={`tel:${site.phone}`}
            onClick={() => trackEvent("cta_call", { source: "mobile_sticky" })}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cta px-4 py-3 text-sm font-semibold text-ink"
          >
            <PhoneIcon className="text-base" />
            Appeler
          </a>
          <a
            href="#contact"
            onClick={() => trackEvent("cta_quote", { source: "mobile_sticky" })}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-bg ring-1 ring-cta"
          >
            <MailIcon className="text-base" />
            Devis gratuit
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
