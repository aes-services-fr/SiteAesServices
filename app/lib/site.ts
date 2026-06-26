// ---------------------------------------------------------------------------
// Single source of truth for all business / SEO data used across the site.
// Values marked TODO must be confirmed with the client before going live.
// ---------------------------------------------------------------------------

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string; // "à partir de 25€/m²", "Sur devis", "Forfait 350€"...
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

function isTodo(v: string): boolean {
  return !v || v.startsWith("<");
}
export const has = (v: string): boolean => !isTodo(v);

export const site = {
  // --- Identité --------------------------------------------------------------
  name: "AES Services",
  legalName: "Sébastien Joaquim", // entrepreneur individuel exploitant sous AES Services
  trade: "Peintre en bâtiment",
  legal: {
    siren: "948 744 875",
    siret: "948 744 875 00030",
    forme: "Entrepreneur individuel (micro-entreprise)",
    tva: "FR12 948 744 875",
  },
  artisanName: "Sébastien Joaquim", // artisan principal
  city: "Bourges",
  radiusKm: "60",
  experienceYears: "2", // affiché « plus de 2 ans »

  // --- Contact ---------------------------------------------------------------
  phone: "+33671434483",
  phoneDisplay: "06 71 43 44 83",
  email: "contact@aes-services.fr",
  whatsapp: "33671434483", // international sans "+"
  whatsappEnabled: true,

  // --- Adresse ---------------------------------------------------------------
  address: {
    street: "26 rue de Berry",
    postalCode: "18570",
    city: "La Chapelle-Saint-Ursin",
    country: "FR",
  },

  // --- Cible / positionnement ------------------------------------------------
  // Particuliers principalement, ouvert aux professionnels.
  target: "les deux" as const,

  // --- Avis Google -----------------------------------------------------------
  google: {
    hasReviews: true,
    rating: "5,0",
    reviewCount: "14",
    cid: "", // CID Google Business Profile (à fournir)
    reviewUrl: "https://share.google/EeVtthL3hxQtL3Jhk",
    mapEmbedQuery: "AES Services peintre La Chapelle-Saint-Ursin Bourges",
  },

  // --- Certifications --------------------------------------------------------
  certifications: [] as string[], // ex ["RGE", "Qualibat 6111"] (à confirmer)

  // --- Réseaux sociaux -------------------------------------------------------
  social: {
    instagram: "https://www.instagram.com/aesservices____/",
    facebook: "https://www.facebook.com/profile.php?id=61570133319256",
  },

  // --- Prise de RDV ----------------------------------------------------------
  booking: {
    // Téléphone / WhatsApp en CTA principal + formulaire de devis (mailto).
    mode: "telephone+formulaire" as const,
    url: "",
  },

  // --- Domaine / SEO ---------------------------------------------------------
  // Servi sur GitHub Pages pour le moment (basePath /siteaesservices).
  domain: TODO, // ex "https://www.aes-services.fr" quand le domaine sera branché

  // --- Analytics -------------------------------------------------------------
  gaMeasurementId: "", // "G-XXXXXXXXXX" si fourni

  // --- Zone d'intervention (villes / quartiers dans un rayon de 60 km) -------
  areas: [
    "Bourges",
    "La Chapelle-Saint-Ursin",
    "Saint-Doulchard",
    "Saint-Germain-du-Puy",
    "Trouy",
    "Marmagne",
    "Saint-Florent-sur-Cher",
    "Mehun-sur-Yèvre",
    "Vierzon",
    "Lévet",
    "Avord",
    "Baugy",
    "Dun-sur-Auron",
    "Nérondes",
    "Aubigny-sur-Nère",
    "Sancerre",
  ] as string[],
} as const;

// --- Prestations -------------------------------------------------------------
export const services: Service[] = [
  {
    id: "mise-en-peinture",
    title: "Mise en peinture",
    description:
      "Impression, révision d'enduit et deux couches de finition, pour des murs et plafonds nets et durables.",
    price: "À partir de 20 €/m²",
    category: "Intérieur",
  },
  {
    id: "ratissage-poncage",
    title: "Ratissage & ponçage",
    description:
      "Ratissage en une à deux couches puis ponçage, pour des supports parfaitement lisses avant peinture.",
    price: "À partir de 20 €/m²",
    category: "Intérieur",
  },
  {
    id: "bandes-placo",
    title: "Pose de bandes & placo",
    description:
      "Collage, doublage et traitement des bandes (joints) du placo, pour une base saine et impeccable.",
    price: "À partir de 10 €/m²",
    category: "Intérieur",
  },
  {
    id: "decoration-couleur",
    title: "Décoration & mise en couleur",
    description:
      "Murs d'accent et teintes personnalisées (bleu canard, taupe, sauge…) pour donner du caractère à vos pièces.",
    price: "Sur devis",
    category: "Décoration",
  },
  {
    id: "boiseries-menuiseries",
    title: "Boiseries & menuiseries",
    description:
      "Peinture de portes, volets, radiateurs et fenêtres, dans la finition de votre choix.",
    price: "Sur devis",
    category: "Décoration",
  },
  {
    id: "peinture-exterieure",
    title: "Peinture extérieure",
    description:
      "Volets, façades et chantiers extérieurs, protégés durablement contre les intempéries.",
    price: "Sur devis",
    category: "Extérieur",
  },
];

export const galleryCategories: GalleryCategory[] = [
  "Intérieur",
  "Décoration",
  "Extérieur",
];

// Curated gallery (client chantiers). Files under /public/images/realisations/.
export const gallery: GalleryImage[] = [
  { src: "/images/realisations/r14.jpg", category: "Intérieur", alt: "Grande pièce de vie repeinte en blanc avec poêle à granulés — peinture intérieure, peintre à Bourges (18)" },
  { src: "/images/realisations/r27.jpg", category: "Intérieur", alt: "Salon lumineux ouvert sur le jardin, peinture blanche — peintre en bâtiment à Bourges" },
  { src: "/images/realisations/r28.jpg", category: "Intérieur", alt: "Séjour et cage d'escalier aux murs gris — peinture intérieure à Bourges (18)" },
  { src: "/images/realisations/r19.jpg", category: "Intérieur", alt: "Montée d'escalier aux murs gris perle — peinture intérieure, peintre Bourges" },
  { src: "/images/realisations/r31.jpg", category: "Intérieur", alt: "Séjour gris clair et menuiseries soignées — peintre en bâtiment à Bourges" },
  { src: "/images/realisations/r23.jpg", category: "Intérieur", alt: "Pièce de vie avec baie vitrée repeinte — peinture intérieure à Bourges (18)" },
  { src: "/images/realisations/r20.jpg", category: "Décoration", alt: "Mur d'accent taupe et verrière atelier — décoration et mise en couleur, Bourges" },
  { src: "/images/realisations/r02.jpg", category: "Décoration", alt: "Dressing sous escalier peint en bleu canard — mise en couleur, peintre Bourges" },
  { src: "/images/realisations/r33.jpg", category: "Décoration", alt: "Séjour aux murs taupe avec entrée noire — peinture décorative à Bourges (18)" },
  { src: "/images/realisations/r13.jpg", category: "Décoration", alt: "Pièce de vie gris perle avec verrière — peinture décorative à Bourges" },
  { src: "/images/realisations/r22.jpg", category: "Extérieur", alt: "Façade et volet de lucarne repeints — peinture extérieure, peintre à Bourges (18)" },
];

export type BeforeAfter = {
  title: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

// Same-room before/after pairs (confirmed by the client).
export const beforeAfter: BeforeAfter[] = [
  {
    title: "Séjour & escalier",
    before: "/images/realisations/r11.jpg",
    after: "/images/realisations/r28.jpg",
    beforeAlt: "Séjour et cage d'escalier en cours de peinture, sol protégé — chantier à Bourges",
    afterAlt: "Séjour et escalier finis, murs gris et parquet — peintre en bâtiment à Bourges (18)",
  },
  {
    title: "Montée d'escalier",
    before: "/images/realisations/r07.jpg",
    after: "/images/realisations/r19.jpg",
    beforeAlt: "Montée d'escalier avant finition, sol protégé — chantier de peinture à Bourges",
    afterAlt: "Montée d'escalier finie, murs gris perle — peinture intérieure à Bourges (18)",
  },
  {
    title: "Entrée & dégagement",
    before: "/images/realisations/r26.jpg",
    after: "/images/realisations/r29.jpg",
    beforeAlt: "Entrée en préparation, sol protégé avant mise en peinture — chantier à Bourges",
    afterAlt: "Entrée et dégagement finis, murs beige — peintre en bâtiment à Bourges (18)",
  },
  {
    title: "Façade & volet",
    before: "/images/realisations/r18.jpg",
    after: "/images/realisations/r22.jpg",
    beforeAlt: "Façade et volet de lucarne avant travaux — peinture extérieure, peintre à Bourges (18)",
    afterAlt: "Façade et volet repeints en blanc — peinture extérieure à Bourges (18)",
  },
];

// --- FAQ ---------------------------------------------------------------------
export const faqs: Faq[] = [
  {
    q: "Le devis est-il vraiment gratuit ?",
    a: "Oui. Le déplacement et l'établissement du devis sont entièrement gratuits et sans engagement, partout dans un rayon de 60 km autour de Bourges.",
  },
  {
    q: "Intervenez-vous chez les particuliers et les professionnels ?",
    a: "Nous travaillons principalement pour les particuliers, et intervenons aussi pour les professionnels (commerces, bureaux, locaux). N'hésitez pas à nous décrire votre projet.",
  },
  {
    q: "Dans quel secteur vous déplacez-vous ?",
    a: "Nous intervenons à Bourges et dans tout le Cher, dans un rayon d'environ 60 km : Saint-Doulchard, Vierzon, Mehun-sur-Yèvre, Saint-Florent-sur-Cher et les communes alentours.",
  },
  {
    q: "Combien de temps dure un chantier de peinture ?",
    a: "Cela dépend de la surface et de l'état des supports. La durée estimée et le planning figurent clairement sur votre devis avant le début des travaux.",
  },
  {
    q: "Fournissez-vous les peintures et matériaux ?",
    a: "Oui, nous fournissons des produits professionnels adaptés à chaque support. Nous pouvons aussi travailler avec vos produits si vous le souhaitez.",
  },
  {
    q: "Comment se déroule la prise de rendez-vous ?",
    a: "Le plus simple est de nous appeler ou de nous écrire sur WhatsApp au 06 71 43 44 83. Vous pouvez aussi remplir le formulaire de devis : nous vous recontactons rapidement.",
  },
];

export const reviews: Review[] = [];
