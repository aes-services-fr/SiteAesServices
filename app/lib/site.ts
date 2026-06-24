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
  legalName: TODO, // raison sociale exacte (à confirmer)
  trade: "Peintre en bâtiment",
  artisanName: TODO, // prénom + nom de l'artisan principal (à confirmer)
  city: "Bourges",
  radiusKm: "60",
  experienceYears: TODO, // années d'expérience (à confirmer)

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
    id: "peinture-interieure",
    title: "Peinture intérieure",
    description:
      "Murs, plafonds et boiseries : préparation des supports, rebouchage, sous-couche et finitions soignées pour un rendu net et durable.",
    price: "Sur devis",
    category: "Intérieur",
  },
  {
    id: "peinture-exterieure",
    title: "Peinture extérieure",
    description:
      "Volets, portails, bardages et menuiseries : protection durable contre les intempéries et les UV, dans la teinte de votre choix.",
    price: "Sur devis",
    category: "Extérieur",
  },
  {
    id: "ravalement-facade",
    title: "Ravalement de façade",
    description:
      "Nettoyage, traitement et mise en peinture de façade pour protéger votre bâtiment et lui redonner tout son éclat.",
    price: "Sur devis",
    category: "Façade",
  },
  {
    id: "papier-peint",
    title: "Pose de papier peint",
    description:
      "Papier peint, intissé et toile de verre, posés avec des raccords précis et des finitions impeccables.",
    price: "Sur devis",
    category: "Décoration",
  },
  {
    id: "enduit-decoratif",
    title: "Enduit décoratif",
    description:
      "Béton ciré, stuc et effets matières pour personnaliser vos murs et créer des ambiances uniques.",
    price: "Sur devis",
    category: "Décoration",
  },
  {
    id: "conseil-couleurs",
    title: "Conseil & décoration murale",
    description:
      "Accompagnement dans le choix des teintes et des finitions pour mettre en valeur chaque pièce.",
    price: "Sur devis",
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
// Images attendues sous /public/images/realisations/*.
export const gallery: GalleryImage[] = [];

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
