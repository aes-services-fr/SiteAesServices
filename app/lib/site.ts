// ---------------------------------------------------------------------------
// Single source of truth for all business / SEO data used across the site.
// Values marked TODO must be confirmed with the client before going live.
// ---------------------------------------------------------------------------

import googleRating from "./google-rating.json";


export type Service = {
  id: string;
  title: string;
  description: string;
  price: string; // "à partir de 25€/m²", "Sur devis", "Forfait 350€"...
  category: string;
};

// Gallery filters by room type.
export type GalleryCategory =
  | "Salon"
  | "Cuisine"
  | "Chambre"
  | "Salle d'eau"
  | "Entrée"
  | "Couloir"
  | "Extérieur";

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
  name: "AES SERVICES",
  legalName: "Sébastien Joaquim", // entrepreneur individuel exploitant sous AES SERVICES
  trade: "Peintre en bâtiment",
  legal: {
    siren: "948 744 875",
    siret: "948 744 875 00030",
    forme: "Entrepreneur individuel (micro-entreprise)",
    tva: "FR12 948 744 875",
  },
  artisanName: "Sébastien Joaquim", // artisan principal
  city: "Bourges",
  radiusKm: "30",
  experienceYears: "3", // affiché « plus de 3 ans »

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

  // Coordonnées GPS (centre de La Chapelle-Saint-Ursin) pour le SEO local.
  geo: { latitude: 47.0664, longitude: 2.3242 },

  // Horaires de disponibilité (cohérents avec la fiche Google).
  hours: {
    display: "Lundi au samedi : 8h – 19h",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "19:00",
  },

  // --- Cible / positionnement ------------------------------------------------
  // Particuliers principalement, ouvert aux professionnels.
  target: "les deux" as const,

  // --- Avis Google -----------------------------------------------------------
  google: {
    hasReviews: true,
    showReviewCount: true,
    // Rafraîchis automatiquement au build (recherche par nom via Places API),
    // repli sur google-rating.json si la clé API n'est pas configurée.
    rating: googleRating.rating,
    reviewCount: googleRating.reviewCount,
    cid: "16457289082035960368", // CID Google Business Profile
    reviewUrl: "https://www.google.com/maps?cid=16457289082035960368",
    mapEmbedQuery: "AES Services peintre La Chapelle-Saint-Ursin Bourges",
  },

  // --- Certifications / assurances -------------------------------------------
  certifications: [] as string[], // aucune certification/assurance à afficher pour le moment

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
  domain: "https://aes-services.fr"

  // --- Formulaire de devis ---------------------------------------------------
  // Clé d'accès Web3Forms (publique). Vide => repli sur mailto.
  // À générer gratuitement sur https://web3forms.com (reçu par email).
  formAccessKey: "b3ab4d53-8446-45d7-8aa3-936a81b38ece",

  // --- Analytics -------------------------------------------------------------
  gaMeasurementId: "G-PT6QDN9BD1", // GA4 (public, pas un secret)

  // --- Zone d'intervention (villes / quartiers dans un rayon de ~30 km) ------
  areas: [
    "Bourges",
    "La Chapelle-Saint-Ursin",
    "Saint-Doulchard",
    "Saint-Germain-du-Puy",
    "Trouy",
    "Marmagne",
    "Plaimpied-Givaudins",
    "Saint-Florent-sur-Cher",
    "Mehun-sur-Yèvre",
    "Lévet",
    "Saint-Just",
    "Avord",
    "Baugy",
    "Dun-sur-Auron",
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
    title: "Pose de bandes à placo",
    description:
      "Collage et traitement des bandes (joints) sur placo, pour une base saine et impeccable avant peinture.",
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
  "Salon",
  "Cuisine",
  "Chambre",
  "Salle d'eau",
  "Entrée",
  "Couloir",
  "Extérieur",
];

// Curated gallery (client chantiers). Files under /public/images/realisations/.
export const gallery: GalleryImage[] = [
  // Salon / séjour
  { src: "/images/realisations/r14.jpg", category: "Salon", alt: "Grande pièce de vie repeinte en blanc avec poêle à granulés, peintre à Bourges (18)" },
  { src: "/images/realisations/r27.jpg", category: "Salon", alt: "Salon lumineux ouvert sur le jardin, peinture intérieure à Bourges" },
  { src: "/images/realisations/r40.jpg", category: "Salon", alt: "Salon de caractère rénové en blanc, rosace de plafond préservée, peintre à Bourges (18)" },
  { src: "/images/realisations/r33.jpg", category: "Salon", alt: "Séjour aux murs taupe avec entrée noire, peinture décorative à Bourges" },
  { src: "/images/realisations/r20.jpg", category: "Salon", alt: "Séjour avec mur d'accent taupe et verrière atelier, mise en couleur à Bourges (18)" },
  { src: "/images/realisations/r13.jpg", category: "Salon", alt: "Séjour gris perle avec verrière, peinture intérieure à Bourges" },
  { src: "/images/realisations/r48.jpg", category: "Salon", alt: "Pièce de vie aux murs vert anis, peinture intérieure à Bourges (18)" },
  { src: "/images/realisations/r49.jpg", category: "Salon", alt: "Grand séjour lumineux avec charpente apparente repeinte en blanc, peintre à Bourges (18)" },
  { src: "/images/realisations/r50.jpg", category: "Salon", alt: "Pièce de vie mansardée repeinte en blanc, peinture intérieure à Bourges (18)" },
  { src: "/images/realisations/r51.jpg", category: "Salon", alt: "Pièce de vie ouverte repeinte en blanc avec parquet, peintre à Bourges (18)" },
  { src: "/images/realisations/r54.jpg", category: "Salon", alt: "Salon cosy repeint en blanc avec parquet, peintre en bâtiment à Bourges (18)" },
  // Cuisine
  { src: "/images/realisations/r44.jpg", category: "Cuisine", alt: "Pièce de vie ouverte sur cuisine, mur d'accent terracotta, peintre à Bourges (18)" },
  { src: "/images/realisations/r42.jpg", category: "Cuisine", alt: "Cuisine aux meubles vert sauge et mur terracotta, mise en couleur à Bourges" },
  { src: "/images/realisations/r45.jpg", category: "Cuisine", alt: "Cuisine ouverte avec mur terracotta, peinture et décoration à Bourges (18)" },
  // Chambre
  { src: "/images/realisations/r36.jpg", category: "Chambre", alt: "Chambre repeinte en rose poudré, peinture décorative à Bourges (18)" },
  { src: "/images/realisations/r37.jpg", category: "Chambre", alt: "Chambre rénovée en rose poudré, finitions soignées, peintre à Bourges" },
  { src: "/images/realisations/r02.jpg", category: "Chambre", alt: "Dressing sous escalier peint en bleu canard, mise en couleur à Bourges (18)" },
  // Salle d'eau
  { src: "/images/realisations/r32.jpg", category: "Salle d'eau", alt: "Salle d'eau avec faïence et sol béton ciré, peintre en bâtiment à Bourges (18)" },
  // Entrée
  { src: "/images/realisations/r46.jpg", category: "Entrée", alt: "Entrée rénovée avec mur taupe et parquet, peintre en bâtiment à Bourges (18)" },
  { src: "/images/realisations/r52.jpg", category: "Entrée", alt: "Entrée avec plafond laqué brillant et porte vitrée, peinture soignée à Bourges (18)" },
  // Couloir
  { src: "/images/realisations/r47.jpg", category: "Couloir", alt: "Couloir avec soubassement bleu foncé et haut clair, peinture décorative à Bourges (18)" },
  { src: "/images/realisations/r53.jpg", category: "Couloir", alt: "Couloir beige avec sol travertin, peinture intérieure à Bourges (18)" },
  // Extérieur
  { src: "/images/realisations/r22.jpg", category: "Extérieur", alt: "Façade et volet de lucarne repeints, peinture extérieure à Bourges (18)" },
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
    title: "Chambre rénovée",
    before: "/images/realisations/r34.jpg",
    after: "/images/realisations/r37.jpg",
    beforeAlt: "Chambre avant travaux, ancien papier peint décollé et murs abîmés, chantier de rénovation à Bourges",
    afterAlt: "Chambre repeinte en rose poudré, finitions soignées, peintre en bâtiment à Bourges (18)",
  },
  {
    title: "Pièce de caractère",
    before: "/images/realisations/r39.jpg",
    after: "/images/realisations/r40.jpg",
    beforeAlt: "Grande pièce avant rénovation, enduits dégradés et rosace de plafond, chantier à Bourges",
    afterAlt: "Grande pièce rénovée en blanc, rosace de plafond préservée, peintre à Bourges (18)",
  },
  {
    title: "Pièce à moulures",
    before: "/images/realisations/r38.jpg",
    after: "/images/realisations/r41.jpg",
    beforeAlt: "Pièce ancienne avant travaux, plâtres et moulures abîmés, chantier de rénovation à Bourges",
    afterAlt: "Pièce rénovée en blanc, moulures et rosaces mises en valeur, peintre à Bourges (18)",
  },
  {
    title: "Entrée & dégagement",
    before: "/images/realisations/r26.jpg",
    after: "/images/realisations/r29.jpg",
    beforeAlt: "Entrée en préparation, sol protégé avant mise en peinture, chantier à Bourges",
    afterAlt: "Entrée et dégagement finis, murs beige, peintre en bâtiment à Bourges (18)",
  },
  {
    title: "Façade & volet",
    before: "/images/realisations/r18.jpg",
    after: "/images/realisations/r22.jpg",
    beforeAlt: "Façade et volet de lucarne avant travaux, peinture extérieure, peintre à Bourges (18)",
    afterAlt: "Façade et volet repeints en blanc, peinture extérieure à Bourges (18)",
  },
];

// --- Vidéos de chantier ------------------------------------------------------
export type ChantierVideo = {
  src: string; // mp4 optimisé web, sans audio (lecture muette en boucle)
  poster: string; // image d'aperçu affichée avant lecture
  label: string; // libellé court affiché sur la vidéo
  alt: string;
};

// Vidéos verticales (format réseaux sociaux) de Sébastien à l'œuvre. Lecture
// auto, en boucle et sans son, uniquement quand la vidéo est à l'écran.
export const chantierVideos: ChantierVideo[] = [
  {
    src: "/videos/ratissage.mp4",
    poster: "/videos/ratissage.jpg",
    label: "Ratissage",
    alt: "Sébastien réalise une passe de ratissage à l'enduit sur un mur, peintre à Bourges",
  },
  {
    src: "/videos/poncage.mp4",
    poster: "/videos/poncage.jpg",
    label: "Ponçage",
    alt: "Ponçage d'un mur enduit avant mise en peinture, peintre en bâtiment à Bourges",
  },
  {
    src: "/videos/jointage.mp4",
    poster: "/videos/jointage.jpg",
    label: "Bandes & jointage",
    alt: "Pose de bandes et jointage sur cloison placo, peintre à Bourges",
  },
  {
    src: "/videos/mise-en-couleur.mp4",
    poster: "/videos/mise-en-couleur.jpg",
    label: "Mise en couleur",
    alt: "Mise en peinture et application de couleur sur un mur, peintre à Bourges",
  },
];

// --- FAQ ---------------------------------------------------------------------
export const faqs: Faq[] = [
  {
    q: "Le devis est-il vraiment gratuit ?",
    a: "Oui. Le déplacement et l'établissement du devis sont entièrement gratuits et sans engagement, partout dans un rayon de 30 km autour de Bourges.",
  },
  {
    q: "Intervenez-vous chez les particuliers et les professionnels ?",
    a: "Nous travaillons principalement pour les particuliers, et intervenons aussi pour les professionnels (commerces, bureaux, locaux). N'hésitez pas à nous décrire votre projet.",
  },
  {
    q: "Dans quel secteur vous déplacez-vous ?",
    a: "Nous intervenons à Bourges et dans les communes alentour, dans un rayon d'environ 30 km : Saint-Doulchard, Saint-Germain-du-Puy, Mehun-sur-Yèvre, Saint-Florent-sur-Cher, Trouy et les villages voisins.",
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

export const reviews: Review[] = [
  {
    author: "Laure Mourlin",
    rating: 5,
    text: "Travail d'une qualité irréprochable ! J'ai fait appel à Sébastien pour un ratissage complet de mon appartement. Résultat, un chantier rapide, soigné, avec des finitions impeccables. Je recommande vivement.",
  },
  {
    author: "Caroline Menge",
    rating: 5,
    text: "J'ai sollicité Sébastien pour refaire une cage d'escalier et l'étage sous combles. Un chantier impeccable, rapide et propre. Le résultat est parfait ! Sébastien a été ponctuel et fiable. Je recommande ses services.",
  },
  {
    author: "Frédérique Allard",
    rating: 5,
    text: "Un travail impeccable. 65 m² de plafond à enduire et repeindre, pour un résultat magnifique. Sébastien travaille avec beaucoup de soin, il est méticuleux et attentif au moindre détail. Je recommande fortement ses prestations.",
  },
  {
    author: "Lilou Pasquet",
    rating: 5,
    text: "Travail impeccable du début à la fin ! Sébastien a enduit et rattrapé tous les murs du salon, de la salle à manger et de la chambre, et le résultat est vraiment parfait : des murs lisses, propres, avec des finitions soignées. Artisan sérieux, ponctuel, très professionnel et à l'écoute. Chantier laissé propre après son passage. Je recommande les yeux fermés !",
  },
  {
    author: "Emma Nicaud",
    rating: 5,
    text: "Très satisfaite de l'entreprise AES SERVICES ! Travail impeccable pour la peinture et le parquet, finitions soignées et chantier propre. Sébastien est au top : professionnel, à l'écoute et de très bon conseil. Je recommande les yeux fermés !",
  },
  {
    author: "Alice Millet",
    rating: 5,
    text: "Nous avons fait appel à M. Joaquim pour la chambre de notre futur bébé et le rendu est nickel. Travail rapide avec de belles finitions. Je recommande.",
  },
];
