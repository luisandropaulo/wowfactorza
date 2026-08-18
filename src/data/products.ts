import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import teeWhiteFront from "@/assets/drops/tee-white-front.jpg.asset.json";
import teeWhiteBack from "@/assets/drops/tee-white-back.jpg.asset.json";
import teeClayFront from "@/assets/drops/tee-clay-front.jpg.asset.json";
import teeClayBack from "@/assets/drops/tee-clay-back.jpg.asset.json";
import thornTracksuit from "@/assets/drops/thorn-tracksuit.jpg.asset.json";
import washedZipSet from "@/assets/drops/washed-zip-set.jpg.asset.json";
import desireTee from "@/assets/drops/desire-tee.jpg.asset.json";
import dontTripTee from "@/assets/drops/dont-trip-tee.jpg.asset.json";

export type Category = "masculino" | "feminino" | "infantil" | "acessorios";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  collection: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  stock: number;
  image: string;
  gallery: string[];
  description: string;
  isNew?: boolean;
  isBestseller?: boolean;
  tags?: string[];
}

const images = [p1, p2, p3, p4, p5, p6];
const baseColors = ["#D4AF37", "#111827", "#8B4513", "#F5F5DC", "#B22222", "#1F4E3D"];
const baseSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const collections = ["Thorn", "Desire", "Washed 2003", "WF Signature", "Street Essentials"];

const seeds: Array<{ name: string; category: Category; price: number; img: number; desc: string }> = [
  { name: "Hoodie Oversized WF Core", category: "masculino", price: 24900, img: 0, desc: "Hoodie oversized em moletão pesado 400g com logo WF bordado no peito." },
  { name: "Calça Cargo Street Black", category: "masculino", price: 21900, img: 2, desc: "Calça cargo wide leg com bolsos utilitários e cós ajustável." },
  { name: "Boné WF Trucker", category: "acessorios", price: 6500, img: 3, desc: "Boné trucker com logo WF bordado e ajuste snapback." },
  { name: "Ténis Street Runner", category: "acessorios", price: 28900, img: 4, desc: "Ténis chunky com sola alta e detalhes refletores." },
  { name: "Camisola Manga Longa Fade", category: "masculino", price: 17500, img: 0, desc: "Manga longa em algodão com lavagem fade e print nas costas." },
  { name: "Conjunto Kids WF Mini", category: "infantil", price: 15900, img: 2, desc: "Conjunto infantil hoodie + jogger em moletão macio." },
  { name: "Sling Bag Utility", category: "acessorios", price: 12900, img: 3, desc: "Bolsa transversal em nylon técnico com fivela rápida." },
  { name: "Hoodie Zip Washed Grey", category: "masculino", price: 27900, img: 0, desc: "Hoodie com fecho integral em lavagem cinza vintage." },
  { name: "Meias WF Pack 3", category: "acessorios", price: 4900, img: 3, desc: "Pack de 3 meias cano alto com logo tecido." },
  { name: "Tee Boxy Fit Preta", category: "masculino", price: 12900, img: 0, desc: "T-shirt boxy fit em jersey pesado, corte reto." },
  { name: "Gorro Beanie WF", category: "acessorios", price: 5900, img: 3, desc: "Beanie canelado com etiqueta bordada." },
  { name: "Tee Kids Street Print", category: "infantil", price: 8900, img: 0, desc: "T-shirt infantil com print gráfico frontal." },
  { name: "Ténis Low Canvas", category: "acessorios", price: 19900, img: 4, desc: "Ténis low top em lona com sola vulcanizada." },
  { name: "Polo Tech Street", category: "masculino", price: 15900, img: 0, desc: "Polo em piquet técnico com gola contrastante." },
  { name: "Vestido Kids Jersey", category: "infantil", price: 13500, img: 1, desc: "Vestido infantil em jersey com print WF." },
  { name: "Pulseira Cordão WF", category: "acessorios", price: 3900, img: 3, desc: "Pulseira em cordão trançado com terminal metálico." },
  { name: "Camisa Overshirt Sand", category: "masculino", price: 22900, img: 0, desc: "Overshirt em sarja com bolsos frontais." },
  { name: "Conjunto Baby WF", category: "infantil", price: 10900, img: 2, desc: "Conjunto para bebé em algodão orgânico." },
  { name: "Corrente Chain Silver", category: "acessorios", price: 8500, img: 3, desc: "Corrente em aço inoxidável com pendente WF." },
  { name: "Short Moletão Street", category: "masculino", price: 13900, img: 0, desc: "Short em moletão com cordão e bolsos laterais." },
  { name: "Ténis High Top Mono", category: "acessorios", price: 31900, img: 4, desc: "Ténis cano alto monocromático em couro sintético." },
  { name: "Puffer Jacket Night", category: "masculino", price: 46900, img: 2, desc: "Casaco puffer acolchoado com capuz e forro térmico." },
  { name: "Jogger Slim Charcoal", category: "masculino", price: 18900, img: 2, desc: "Jogger slim com punhos elásticos." },
  { name: "Hoodie Kids Heritage", category: "infantil", price: 12500, img: 0, desc: "Hoodie infantil com bolso canguru." },
  { name: "Cinto Web Buckle", category: "acessorios", price: 5500, img: 3, desc: "Cinto em web com fivela metálica." },
  { name: "Tee Graphic Geo", category: "masculino", price: 13500, img: 0, desc: "T-shirt com print geométrico frontal." },
  { name: "Conjunto Tracksuit Mono", category: "masculino", price: 49900, img: 2, desc: "Conjunto tracksuit hoodie + calça em moletão pesado." },
  { name: "Mochila Tech Daily", category: "acessorios", price: 21900, img: 3, desc: "Mochila em nylon com compartimento para portátil." },
  { name: "Tee Essential Branca", category: "masculino", price: 11900, img: 0, desc: "T-shirt essencial branca em algodão penteado." },
  { name: "Boné Dad Hat Washed", category: "acessorios", price: 6900, img: 3, desc: "Dad hat em algodão lavado com logo bordado." },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const seedProducts: Product[] = seeds.map((s, i) => {
  const img = images[s.img % images.length];
  return {
    id: `WF-${(i + 1).toString().padStart(4, "0")}`,
    slug: `${slugify(s.name)}-${i + 1}`,
    name: s.name,
    category: s.category,
    collection: collections[i % collections.length],
    price: s.price,
    rating: 4 + Math.round(Math.random() * 10) / 10,
    reviews: 12 + ((i * 7) % 220),
    colors: baseColors.slice(0, 3 + (i % 3)),
    sizes: s.category === "acessorios" ? ["Único"] : baseSizes.slice(0, 4 + (i % 3)),
    stock: 5 + ((i * 3) % 40),
    image: img,
    gallery: [img, images[(s.img + 1) % images.length], images[(s.img + 2) % images.length]],
    description: s.desc,
    isNew: i < 8,
    isBestseller: i % 5 === 0,
    tags: [s.category, collections[i % collections.length]],
  };
});

const femininoProducts: Product[] = [
  {
    id: "WF-F-001",
    slug: "kimono-wf-noir",
    name: "Kimono WF Noir",
    category: "feminino",
    collection: "Heritage",
    price: 32900,
    rating: 4.9,
    reviews: 87,
    colors: ["#0B0B0B", "#1F2937"],
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    image: kimono1.url,
    gallery: [kimono1.url, kimono2.url],
    description: "Kimono longo em tecido africano com estampa estrelar central. Caimento fluido, mangas amplas e gola padre. Peça versátil para ocasiões especiais ou street style contemporâneo.",
    isNew: true,
    isBestseller: true,
    tags: ["feminino", "kimono", "heritage"],
  },
  {
    id: "WF-F-002",
    slug: "conjunto-pindale-top-skirt",
    name: "Pindalé Top & Skirt",
    category: "feminino",
    collection: "Afro Moderno",
    price: 28500,
    rating: 4.8,
    reviews: 64,
    colors: ["#0B0B0B", "#FFFFFF"],
    sizes: ["XS", "S", "M", "L"],
    stock: 9,
    image: pindale1.url,
    gallery: [pindale1.url, pindale4.url],
    description: "Conjunto Pindalé composto por top com decote em coração e cristais e saia midi com fenda lateral marcante. Estampa estrelar exclusiva em preto e branco.",
    isNew: true,
    tags: ["feminino", "conjunto", "afro-moderno"],
  },
  {
    id: "WF-F-003",
    slug: "saia-green-leaf-ankara",
    name: "Green Skirt Leaf Ankara",
    category: "feminino",
    collection: "WF Spirit",
    price: 18900,
    rating: 4.7,
    reviews: 52,
    colors: ["#1F4E3D", "#5BA86B"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    image: green4.url,
    gallery: [green4.url, green2.url],
    description: "Saia curta com estampa em folhas geométricas verdes sobre fundo escuro. Cintura alta, fenda discreta e caimento estruturado em wax premium.",
    isNew: true,
    isBestseller: true,
    tags: ["feminino", "saia", "wf-spirit"],
  },
  {
    id: "WF-F-004",
    slug: "busin-suit-terracota",
    name: "Busin Suit Terracota",
    category: "feminino",
    collection: "Kente Royale",
    price: 56900,
    rating: 5.0,
    reviews: 41,
    colors: ["#C2542A", "#E8722E"],
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    image: busin1.url,
    gallery: [busin1.url, busin2.url],
    description: "Conjunto Busin Suit em tecido brocado terracota com brilho acetinado. Casaco longo com detalhe branco contrastante e calça wide leg. Alfaiataria contemporânea de gala.",
    isNew: true,
    isBestseller: true,
    tags: ["feminino", "conjunto", "kente-royale"],
  },
];

export const products: Product[] = [...femininoProducts, ...seedProducts];

export const categoryLabels: Record<Category, string> = {
  masculino: "Masculino",
  feminino: "Feminino",
  infantil: "Infantil",
  acessorios: "Acessórios",
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA", maximumFractionDigits: 0 }).format(value);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(p: Product, limit = 4) {
  return products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, limit);
}

export const collectionsList = collections;

export const blogPosts = [
  { slug: "tendencias-moda-africana-2026", title: "Tendências de moda africana para 2026", category: "Tendências", excerpt: "Cores, cortes e estampas que vão dominar a próxima estação.", date: "12 Mai 2026" },
  { slug: "guia-tecidos-ankara-kente", title: "Guia completo: Ankara, Kente e Bogolan", category: "Cultura", excerpt: "Conheça a história dos tecidos que vestem o continente." , date: "02 Mai 2026" },
  { slug: "como-combinar-estampa-africana", title: "Como combinar estampas africanas no dia a dia", category: "Moda Africana", excerpt: "Dicas para incorporar prints autênticos no seu visual.", date: "20 Abr 2026" },
  { slug: "moda-luanda-fashion-week", title: "Luanda Fashion Week: o melhor da passarela", category: "Eventos", excerpt: "Os destaques da semana de moda mais aguardada de Angola.", date: "05 Abr 2026" },
];