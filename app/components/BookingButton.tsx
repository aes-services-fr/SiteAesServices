"use client";

import type { ReactNode } from "react";
import { site } from "../lib/site";
import { trackEvent } from "../lib/analytics";
import { PhoneIcon } from "./icons";

type Variant = "primary" | "secondary" | "ghost";
type Action = "phone" | "form";

// Warm, conversion-focused CTA used everywhere. `source` is passed to GA so we
// can tell which placement drives calls (hero, header, final_cta, service_<id>…).
export function BookingButton({
  source,
  action = "form",
  variant = "primary",
  children,
  withIcon = false,
  className = "",
}: {
  source: string;
  action?: Action;
  variant?: Variant;
  children: ReactNode;
  withIcon?: boolean;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    primary:
      "bg-cta text-ink shadow-sm hover:bg-[color-mix(in_srgb,var(--color-cta)_88%,black)]",
    secondary:
      "bg-ink text-bg hover:bg-[color-mix(in_srgb,var(--color-ink)_88%,black)]",
    ghost:
      "bg-transparent text-ink ring-1 ring-line hover:bg-bg-soft",
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const cls = `${base} ${styles[variant]} ${className}`;

  if (action === "phone") {
    return (
      <a
        href={`tel:${site.phone}`}
        className={cls}
        onClick={() => trackEvent("cta_call", { source })}
      >
        {withIcon && <PhoneIcon className="text-base" />}
        {children}
      </a>
    );
  }

  // action === "form": smooth-scroll to the contact section.
  return (
    <a
      href="#contact"
      className={cls}
      onClick={() => trackEvent("cta_quote", { source })}
    >
      {withIcon && <PhoneIcon className="text-base" />}
      {children}
    </a>
  );
}
