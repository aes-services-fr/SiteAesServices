import { site, faqs, services, has } from "../lib/site";
import { baseUrl, abs } from "../lib/seo";

// Three distinct JSON-LD blocks: the business (HousePainter, more precise than
// LocalBusiness for this trade), the artisan (Person) and the FAQ (FAQPage).
export function JsonLd() {
  const sameAs = [site.social.instagram, site.social.facebook].filter(Boolean);

  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": `${baseUrl}/#business`,
    name: site.name,
    description: `${site.trade} à ${site.city} : peinture intérieure et extérieure, ravalement de façade, décoration. Devis gratuit.`,
    url: baseUrl,
    image: abs("/og.jpg"),
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: "Cher",
      addressCountry: site.address.country,
    },
    areaServed: site.areas.map((a) => ({ "@type": "City", name: a })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", address: site.city },
      geoRadius: `${site.radiusKm} km`,
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.description },
    })),
    priceRange: "€€",
    sameAs: sameAs.length ? sameAs : undefined,
  };

  if (site.google.hasReviews) {
    business.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(site.google.rating).replace(",", "."),
      reviewCount: site.google.reviewCount,
      bestRating: "5",
    };
  }

  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#artisan`,
    name: has(site.artisanName) ? site.artisanName : site.name,
    jobTitle: site.trade,
    worksFor: { "@id": `${baseUrl}/#business` },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {[business, person, faqPage].map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
