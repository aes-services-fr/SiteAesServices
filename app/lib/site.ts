// ---------------------------------------------------------------------------
// Single source of truth for all business / SEO data used across the site.
// Values marked TODO must be confirmed with the client before going live.
// ---------------------------------------------------------------------------

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string; // "à partir de 25€/m²", "sur devis", "forfait 350€"...
  category: GalleryCategory;
};

export type GalleryCategory =
  | "Intérieur"
  | "Extérieur"
  | "Façade"
  | "Décoration";

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

export type Faq = {
  q: string;
  a: string;
};

export type Review = {
  author: string;
  rating: number;
  text: string;
};

export const TODO = "<TODO>";

export const site = {
  // --- Identité --------------------------------------------------------------
  name: "AES Services",
  legalName: TODO, // raison sociale exacte
  trade: "Peintre en bâtiment",
  artisanName: TODO, // prénom + nom de l'artisan principal
  city: TODO, // ville principale d'intervention
  radiusKm: TODO, // rayon d'intervention en km
  experienceYears: TODO, // années d'expérience

  // --- Contact ---------------------------------------------------------------
  phone: TODO, // format "+33 6 00 00 00 00"
  phoneDisplay: TODO, // "06 00 00 00 00"
  email: TODO,
  whatsapp: "", // numéro international sans "+" ou "" si indispo
  whatsappEnabled: false,

  // --- Adresse ---------------------------------------------------------------
  address: {
    street: TODO,
    postalCode: TODO,
    city: TODO,
    country: "FR",
  },

  // --- Cible / positionnement ------------------------------------------------
  target: TODO, // "particuliers" | "professionnels" | "les deux"

  // --- Avis Google -----------------------------------------------------------
  google: {
    hasReviews: false,
    rating: TODO, // ex "4.9"
    reviewCount: TODO, // ex "37"
    cid: "", // CID Google Business Profile
    reviewUrl: "", // lien direct vers la fiche / les avis
    mapEmbedQuery: "", // requête pour l'embed map
  },

  // --- Certifications --------------------------------------------------------
  certifications: [] as string[], // ex ["RGE", "Qualibat 6111", "Garantie décennale"]

  // --- Réseaux sociaux -------------------------------------------------------
  social: {
    instagram: "",
    facebook: "",
  },

  // --- Prise de RDV ----------------------------------------------------------
  booking: {
    mode: TODO, // "telephone" | "formulaire" | "calendly" | "autre"
    url: "", // lien calendly / formulaire si applicable
  },

  // --- Domaine / SEO ---------------------------------------------------------
  domain: TODO, // ex "https://www.aes-services.fr" (sans slash final)

  // --- Analytics -------------------------------------------------------------
  gaMeasurementId: "", // "G-XXXXXXXXXX" si fourni

  // --- Zone d'intervention (villes / quartiers) ------------------------------
  areas: [] as string[],
} as const;

// --- Prestations -------------------------------------------------------------
export const services: Service[] = [
  {
    id: "peinture-interieure",
    title: "Peinture intérieure",
    description:
      "Murs, plafonds et boiseries : préparation des supports, rebouchage, sous-couche et finitions soignées.",
    price: TODO,
    category: "Intérieur",
  },
  {
    id: "peinture-exterieure",
    title: "Peinture extérieure",
    description:
      "Volets, portails, bardages et menuiseries : protection durable contre les intempéries et les UV.",
    price: TODO,
    category: "Extérieur",
  },
  {
    id: "ravalement-facade",
    title: "Ravalement de façade",
    description:
      "Nettoyage, traitement et mise en peinture de façade pour protéger et embellir votre bâtiment.",
    price: TODO,
    category: "Façade",
  },
  {
    id: "papier-peint",
    title: "Pose de papier peint",
    description:
      "Pose de papier peint, intissé et toile de verre, avec raccords précis et finitions nettes.",
    price: TODO,
    category: "Décoration",
  },
  {
    id: "enduit-decoratif",
    title: "Enduit décoratif",
    description:
      "Béton ciré, stuc, tadelakt et effets matières pour personnaliser vos espaces.",
    price: TODO,
    category: "Décoration",
  },
  {
    id: "decoration-murale",
    title: "Décoration murale",
    description:
      "Conseil couleurs, mises en valeur et finitions décoratives sur-mesure.",
    price: TODO,
    category: "Décoration",
  },
];

export const galleryCategories: GalleryCategory[] = [
  "Intérieur",
  "Extérieur",
  "Façade",
  "Décoration",
];

// Placeholder gallery — replaced once client photos are provided.
export const gallery: GalleryImage[] = [];

// --- FAQ ---------------------------------------------------------------------
export const faqs: Faq[] = [
  {
    q: "Le devis est-il gratuit ?",
    a: "Oui. Le déplacement et l'établissement du devis sont entièrement gratuits et sans engagement.",
  },
  {
    q: "Intervenez-vous chez les particuliers et les professionnels ?",
    a: `Nous intervenons selon votre projet — ${TODO} (à préciser).`,
  },
  {
    q: "Quelles garanties proposez-vous ?",
    a: "Nos travaux sont couverts par notre assurance et, selon la prestation, par la garantie décennale.",
  },
  {
    q: "Combien de temps dure un chantier de peinture ?",
    a: "Cela dépend de la surface et de l'état des supports. La durée estimée figure clairement sur votre devis.",
  },
  {
    q: "Fournissez-vous les peintures et matériaux ?",
    a: "Oui, nous fournissons des produits professionnels adaptés à chaque support, ou travaillons avec vos produits si vous le souhaitez.",
  },
];

export const reviews: Review[] = [];
