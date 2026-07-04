import { site, faqs, services, reviews, has } from "../lib/site";
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
    description: `${site.trade} à ${site.city} : peinture intérieure et extérieure, boiseries, décoration. Devis gratuit.`,
    url: baseUrl,
    image: abs("/og.jpg"),
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: "Cher",
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.google.reviewUrl || undefined,
    areaServed: site.areas.map((a) => ({ "@type": "City", name: a })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      geoRadius: `${site.radiusKm} km`,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.description },
    })),
    founder: { "@id": `${baseUrl}/#artisan` },
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Espèces, Virement, Chèque",
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

  // Individual client reviews (real Google reviews) so search engines can show
  // star-rated rich results, not just the aggregate.
  if (reviews.length > 0) {
    business.review = reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
      reviewBody: r.text,
    }));
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
