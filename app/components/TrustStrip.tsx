import type { ReactNode, SVGProps } from "react";
import { site } from "../lib/site";
import { CheckIcon, MapPinIcon, StarIcon, ShieldIcon, AwardIcon } from "./icons";
import { CountUp } from "./CountUp";

type Pillar = {
  icon: (p: SVGProps<SVGSVGElement>) => ReactNode;
  title: ReactNode;
  sub: ReactNode;
};

// 4 trust pillars with animated counters. We only assert facts we can back up.
export function TrustStrip() {
  const radius = Number(site.radiusKm) || 0;
  const rating = Number(String(site.google.rating).replace(",", ".")) || 5;
  const count = Number(site.google.reviewCount) || 0;

  const pillars: Pillar[] = [
    { icon: CheckIcon, title: "Devis gratuit", sub: "Sans engagement, sous 48h" },
    {
      icon: MapPinIcon,
      title: (
        <>
          {site.city} + <CountUp value={radius} suffix=" km" />
        </>
      ),
      sub: "Artisan local et disponible",
    },
  ];

  if (site.google.hasReviews) {
    pillars.push({
      icon: StarIcon,
      title: (
        <>
          <CountUp value={rating} decimals={1} />/5 sur Google
        </>
      ),
      sub: (
        <>
          <CountUp value={count} /> avis clients
        </>
      ),
    });
  }

  if (site.certifications.length > 0) {
    pillars.push({
      icon: AwardIcon,
      title: site.certifications[0],
      sub: site.certifications.slice(1).join(" · ") || "Artisan certifié",
    });
  } else {
    pillars.push({
      icon: ShieldIcon,
      title: "Travail garanti",
      sub: "Finitions soignées et durables",
    });
  }

  return (
    <section className="border-y border-line bg-bg-soft">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-0 sm:px-6 lg:grid-cols-4">
        {pillars.slice(0, 4).map((p, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-5 sm:px-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
              <p.icon className="text-xl" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-ink">
                {p.title}
              </span>
              <span className="block text-xs text-ink-soft">{p.sub}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
