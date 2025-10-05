export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  longDescription?: string;
  features?: string[];
  specifications?: Record<string, string>;
  images?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Shampoing Carrosserie Premium",
    category: "Lavage",
    description:
      "Notre shampoing carrosserie premium est spécialement formulé pour nettoyer en profondeur tout en protégeant la peinture de votre véhicule. Sa formule pH neutre est sans danger pour toutes les surfaces.",
    longDescription:
      "Ce shampoing professionnel de haute qualité crée une mousse riche et onctueuse qui élimine efficacement la saleté, les insectes et les résidus routiers. Enrichi en agents protecteurs, il laisse un film hydrophobe sur la carrosserie qui facilite les lavages futurs. Sans phosphates ni silicones agressifs, il est respectueux de l'environnement tout en offrant des résultats professionnels.",
    price: 24.99,
    rating: 4.8,
    reviews: 156,
    images: ["/IMG_4453.JPG", "/IMG_4460.JPG", "/carsoap.jpg"],
    image: "/IMG_4453.JPG",
    inStock: true,
    features: [
      "Formule pH neutre",
      "Sans silicones agressifs",
      "Biodégradable à 95%",
      "Mousse riche et dense",
      "Protection hydrophobe",
      "Format 500ml",
    ],
    specifications: {
      Volume: "500ml",
      pH: "7.0 (neutre)",
      Dilution: "1:100 (5ml pour 500ml d'eau)",
      Rendement: "Jusqu'à 50 lavages",
      Parfum: "Frais et discret",
      Conservation: "24 mois",
    },
  },
  {
    id: 2,
    name: "Cire de Protection Longue Durée",
    category: "Protection",
    description:
      "Protection professionnelle qui crée une barrière durable contre les UV, la pluie et la pollution. Brillance intense garantie jusqu'à 6 mois.",
    longDescription:
      "Notre cire de protection haut de gamme utilise une technologie polymère avancée pour créer une barrière invisible qui repousse l'eau, les UV et les contaminants. Facile à appliquer et à retirer, elle laisse une finition brillante spectaculaire qui dure jusqu'à 6 mois.",
    price: 39.99,
    rating: 4.9,
    reviews: 203,
    images: ["/IMG_4460.JPG", "/IMG_4453.JPG", "/carsoap.jpg"],
    image: "/IMG_4460.JPG",
    inStock: true,
    features: [
      "Protection 6 mois",
      "Barrière UV avancée",
      "Effet hydrophobe",
      "Brillance intense",
      "Application facile",
      "Format 250ml",
    ],
    specifications: {
      Volume: "250ml",
      Durée: "Jusqu'à 6 mois",
      Application: "À la main ou machine",
      Séchage: "15-20 minutes",
      Surface: "Environ 15m²",
      Conservation: "36 mois",
    },
  },
  {
    id: 3,
    name: "Nettoyant Jantes & Pneus",
    category: "Jantes & Pneus",
    description:
      "Élimine rapidement la poussière de frein, la graisse et la saleté incrustée. Sans acide, sans danger pour toutes les jantes.",
    longDescription:
      "Formule puissante spécialement développée pour nettoyer en profondeur les jantes et pneus. Dissout efficacement les résidus de frein les plus tenaces sans endommager les surfaces. Compatible avec tous les types de jantes : alliage, chrome, peinture.",
    price: 16.99,
    rating: 4.7,
    reviews: 89,
    images: ["/IMG_4453.JPG", "/carsoap.jpg", "/IMG_4460.JPG"],
    image: "/IMG_4453.JPG",
    inStock: true,
    features: [
      "Sans acide",
      "Action rapide",
      "Pour tous types de jantes",
      "Élimine la poussière de frein",
      "Spray pratique",
      "Format 750ml",
    ],
    specifications: {
      Volume: "750ml",
      Type: "Spray",
      pH: "Neutre",
      Temps: "3-5 minutes",
      Compatibilité: "Toutes jantes",
      Conservation: "24 mois",
    },
  },
  {
    id: 4,
    name: "Nettoyant Vitres Pro",
    category: "Vitres",
    description:
      "Nettoyant vitres professionnel sans traces. Formule concentrée pour un nettoyage parfait des vitres et pare-brise.",
    longDescription:
      "Formule professionnelle qui élimine les traces, les résidus de cire et les dépôts calcaires. Sans ammoniaque, il nettoie efficacement sans laisser de traces ni de buée. Idéal pour toutes les surfaces vitrées du véhicule.",
    price: 12.99,
    rating: 4.6,
    reviews: 78,
    image: "/IMG_4460.JPG",
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: 5,
    name: "Revitalisant Cuir Premium",
    category: "Intérieur",
    description:
      "Revitalisant pour sièges en cuir. Nourrit, protège et redonne souplesse au cuir de vos sièges.",
    longDescription:
      "Formule enrichie en agents nourrissants qui pénètrent en profondeur dans le cuir pour le revitaliser et le protéger. Restaure la souplesse et l'élasticité du cuir tout en créant une barrière protectrice contre les UV et la déshydratation.",
    price: 29.99,
    rating: 4.9,
    reviews: 134,
    image: "/IMG_4453.JPG",
    inStock: true,
    badge: "Premium",
  },
  {
    id: 6,
    name: "Nettoyant Tapis Auto",
    category: "Intérieur",
    description:
      "Nettoyant spécialement formulé pour les tapis de voiture. Élimine les taches tenaces et les odeurs.",
    longDescription:
      "Formule puissante qui pénètre en profondeur dans les fibres des tapis pour éliminer les taches les plus tenaces. Action désodorisante qui neutralise les mauvaises odeurs. Sans danger pour les tissus et les colorants.",
    price: 18.99,
    rating: 4.5,
    reviews: 92,
    image: "/carsoap.jpg",
    inStock: true,
  },
  {
    id: 7,
    name: "Polish Restaurateur",
    category: "Protection",
    description:
      "Polish restaurateur qui redonne éclat et brillance à votre carrosserie. Masque les micro-rayures.",
    longDescription:
      "Polish professionnel qui restaure l'éclat de la peinture en masquant les micro-rayures et les défauts de surface. Formule enrichie en agents polissants qui créent une finition brillante et durable. Facile à appliquer et à retirer.",
    price: 22.99,
    rating: 4.7,
    reviews: 67,
    image: "/IMG_4453.JPG",
    inStock: true,
  },
  {
    id: 8,
    name: "Nettoyant Plastiques",
    category: "Intérieur",
    description:
      "Nettoyant spécialement formulé pour les plastiques intérieurs. Redonne éclat sans laisser de traces.",
    longDescription:
      "Formule douce qui nettoie efficacement tous les plastiques intérieurs sans les endommager. Élimine les traces de doigts, la poussière et les résidus. Laisse une finition mate naturelle sans brillance excessive.",
    price: 14.99,
    rating: 4.4,
    reviews: 45,
    image: "/IMG_4460.JPG",
    inStock: true,
  },
  {
    id: 9,
    name: "Protectant Pneus",
    category: "Jantes & Pneus",
    description:
      "Protectant qui donne un aspect neuf à vos pneus. Protection UV et effet hydrophobe.",
    longDescription:
      "Protectant professionnel qui nourrit le caoutchouc des pneus tout en créant une barrière protectrice contre les UV et les contaminants. Donne un aspect neuf et brillant qui dure plusieurs semaines. Facile à appliquer.",
    price: 19.99,
    rating: 4.8,
    reviews: 156,
    image: "/carsoap.jpg",
    inStock: true,
    badge: "Populaire",
  },
];

export const categories = [
  "Tous",
  "Lavage",
  "Protection",
  "Jantes & Pneus",
  "Vitres",
  "Intérieur",
];
