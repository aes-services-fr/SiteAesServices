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
  withArrow = false,
  className = "",
}: {
  source: string;
  action?: Action;
  variant?: Variant;
  children: ReactNode;
  withIcon?: boolean;
  withArrow?: boolean;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    primary:
      "bg-cta text-ink shadow-sm hover:bg-[color-mix(in_srgb,var(--color-cta)_88%,black)]",
    secondary:
      "bg-ink text-bg hover:bg-[color-mix(in_srgb,var(--color-ink)_88%,black)]",
    ghost: "bg-transparent text-ink ring-1 ring-line hover:bg-bg-soft",
  };

  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const cls = `${base} ${styles[variant]} ${className}`;

  const inner = (
    <>
      {withIcon && <PhoneIcon className="text-base" />}
      {children}
      {withArrow && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </>
  );

  if (action === "phone") {
    return (
      <a
        href={`tel:${site.phone}`}
        className={cls}
        onClick={() => trackEvent("cta_call", { source })}
      >
        {inner}
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
      {inner}
    </a>
  );
}
