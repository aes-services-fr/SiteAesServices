import { site, has } from "../lib/site";
import { CheckIcon, MapPinIcon, StarIcon, ShieldIcon, AwardIcon } from "./icons";
import type { SVGProps } from "react";

type Pillar = { icon: (p: SVGProps<SVGSVGElement>) => React.ReactNode; title: string; sub: string };

// 4 trust pillars. We only assert facts we can back up. As soon as the client
// confirms a certification (RGE / Qualibat / garantie décennale), add it to
// site.certifications and it will replace the generic "réactivité" pillar.
export function TrustStrip() {
  const pillars: Pillar[] = [
    { icon: CheckIcon, title: "Devis gratuit", sub: "Sans engagement, sous 48h" },
    {
      icon: MapPinIcon,
      title: `${site.city} + ${site.radiusKm} km`,
      sub: "Artisan local et disponible",
    },
  ];

  if (site.google.hasReviews) {
    pillars.push({
      icon: StarIcon,
      title: `${site.google.rating}/5 sur Google`,
      sub: `${site.google.reviewCount} avis clients`,
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
        {pillars.slice(0, 4).map((p) => (
          <div
            key={p.title}
            className="flex items-center gap-3 px-4 py-5 sm:px-2"
          >
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
      {!has(site.experienceYears) && (
        // dev-only reminder; renders nothing visible
        <span className="hidden" data-todo="experienceYears, certifications (RGE/Qualibat/décennale)" />
      )}
    </section>
  );
}
