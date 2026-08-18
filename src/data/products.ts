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
const baseColors = ["#FFFFFF", "#111827", "#7B4FC0", "#A9605C", "#3A3A3A", "#D4AF37"];
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
  { name: "Hoodie Kids Street", category: "infantil", price: 12500, img: 0, desc: "Hoodie infantil com bolso canguru." },
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

export const dropProducts: Product[] = [
  {
    id: "WF-D-001",
    slug: "tee-wf-thorn-white",
    name: "Tee WF Thorn White",
    category: "masculino",
    collection: "Thorn",
    price: 15900,
    rating: 4.9,
    reviews: 87,
    colors: ["#FFFFFF", "#111827"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 24,
    image: teeWhiteFront.url,
    gallery: [teeWhiteFront.url, teeWhiteBack.url],
    description: "T-shirt branca em algodão pesado com o logo WF em textura líquida: pequeno no peito e em grande escala nas costas. Corte regular, gola reforçada.",
    isNew: true,
    isBestseller: true,
    tags: ["tee", "thorn", "unissexo"],
  },
  {
    id: "WF-D-002",
    slug: "tee-wf-signature-clay",
    name: "Tee WF Signature Clay",
    category: "feminino",
    collection: "WF Signature",
    price: 15900,
    rating: 4.8,
    reviews: 64,
    colors: ["#A9605C", "#FFFFFF"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 20,
    image: teeClayFront.url,
    gallery: [teeClayFront.url, teeClayBack.url],
    description: "T-shirt em tom clay com o monograma WF a branco: discreto no peito e em grande formato nas costas. Caimento relaxado, ideal para looks oversized.",
    isNew: true,
    tags: ["tee", "signature", "feminino"],
  },
  {
    id: "WF-D-003",
    slug: "conjunto-thorn-cross-black",
    name: "Conjunto Thorn Cross Black",
    category: "masculino",
    collection: "Thorn",
    price: 62900,
    rating: 5.0,
    reviews: 41,
    colors: ["#0B0B0B", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 10,
    image: thornTracksuit.url,
    gallery: [thornTracksuit.url],
    description: "Conjunto hoodie oversized + calça baggy em moletão pesado preto. Cruzes aplicadas na frente, espinhos nas mangas e pernas, e logo WF nas costas.",
    isNew: true,
    isBestseller: true,
    tags: ["conjunto", "hoodie", "thorn"],
  },
  {
    id: "WF-D-004",
    slug: "washed-zip-set-2003",
    name: "Washed Zip Set 2003",
    category: "feminino",
    collection: "Washed 2003",
    price: 58900,
    rating: 4.9,
    reviews: 53,
    colors: ["#3A3A3A", "#0B0B0B"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 8,
    image: washedZipSet.url,
    gallery: [washedZipSet.url],
    description: "Conjunto cropped zip hoodie + calça flare em lavagem ácida cinza. Print «Life is too short to worry about 2003» nas costas e logo WF na perna.",
    isNew: true,
    isBestseller: true,
    tags: ["conjunto", "cropped", "washed"],
  },
  {
    id: "WF-D-005",
    slug: "tee-desire-angel-purple",
    name: "Tee Desire Angel Purple",
    category: "masculino",
    collection: "Desire",
    price: 17900,
    rating: 4.8,
    reviews: 72,
    colors: ["#FFFFFF", "#7B4FC0"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 16,
    image: desireTee.url,
    gallery: [desireTee.url, dontTripTee.url],
    description: "T-shirt branca com print frontal «Desire»: querubim em grafite sobre lettering roxo desgastado e assinatura WF na barra.",
    isNew: true,
    isBestseller: true,
    tags: ["tee", "desire", "print"],
  },
  {
    id: "WF-D-006",
    slug: "tee-dont-trip-purple",
    name: "Tee Don't Trip Purple",
    category: "feminino",
    collection: "Desire",
    price: 16900,
    rating: 4.7,
    reviews: 48,
    colors: ["#FFFFFF", "#7B4FC0"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    image: dontTripTee.url,
    gallery: [dontTripTee.url, desireTee.url],
    description: "T-shirt branca com lettering wavy roxo nas costas: «Don't trip over what's behind you». Corte relaxado em algodão penteado.",
    isNew: true,
    tags: ["tee", "desire", "feminino"],
  },
];

export const products: Product[] = [...dropProducts, ...seedProducts];

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
  { slug: "tendencias-streetwear-2026", title: "Tendências de streetwear para 2026", category: "Tendências", excerpt: "Oversized, lavagens ácidas e prints gráficos dominam a próxima estação.", date: "12 Mai 2026" },
  { slug: "guia-hoodies-lavagens", title: "Guia: moletão pesado, lavagem ácida e boxy fit", category: "Cultura", excerpt: "Como reconhecer qualidade num hoodie e numa tee de drop limitado.", date: "02 Mai 2026" },
  { slug: "como-usar-conjunto-cropped", title: "Como usar o conjunto cropped no dia a dia", category: "Estilo", excerpt: "Camadas, proporções e calçado certo para o Washed Zip Set.", date: "20 Abr 2026" },
  { slug: "drops-limitados-luanda", title: "Drops limitados: como funciona a cultura de espera", category: "Eventos", excerpt: "Porque é que as peças Wow Factor não voltam depois de esgotar.", date: "05 Abr 2026" },
];