import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import kimono1 from "@/assets/feminino/1_kimono.jpg.asset.json";
import kimono2 from "@/assets/feminino/2_kimono.jpg.asset.json";
import pindale1 from "@/assets/feminino/1_pindale-top-skirt.jpg.asset.json";
import pindale4 from "@/assets/feminino/4_pindale-top-skirt.jpg.asset.json";
import green2 from "@/assets/feminino/2_green-skirt.jpg.asset.json";
import green4 from "@/assets/feminino/4_green-skirt.jpg.asset.json";
import busin1 from "@/assets/feminino/1_busin-suit.jpg.asset.json";
import busin2 from "@/assets/feminino/2_busin-suit.jpg.asset.json";

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
const collections = ["Heritage", "Sahara", "Kente Royale", "Afro Moderno", "WF Spirit"];

const seeds: Array<{ name: string; category: Category; price: number; img: number; desc: string }> = [
  { name: "Camisa Dashiki Imperial", category: "masculino", price: 14900, img: 0, desc: "Camisa Dashiki em algodão premium com bordados dourados feitos à mão." },
  { name: "Blazer Kente Royale", category: "masculino", price: 38900, img: 2, desc: "Blazer estruturado em tecido Kente, alfaiataria contemporânea." },
  { name: "Turbante Yara Ouro", category: "acessorios", price: 6500, img: 3, desc: "Turbante artesanal com estampa geométrica e fio dourado." },
  { name: "Sandália Tribal Zuri", category: "acessorios", price: 8900, img: 4, desc: "Sandália em couro natural com missangas africanas." },
  { name: "Camisa Adire Ocean", category: "masculino", price: 17500, img: 0, desc: "Camisa em tecido Adire tingido à mão." },
  { name: "Conjunto Kente Júnior", category: "infantil", price: 11900, img: 2, desc: "Conjunto infantil em mini-Kente, conforto e estilo." },
  { name: "Bolsa Couro Mali", category: "acessorios", price: 15900, img: 3, desc: "Bolsa em couro vegetal com costura artesanal." },
  { name: "Túnica Senegal Nights", category: "masculino", price: 16900, img: 0, desc: "Túnica longa com bordados pretos e dourados." },
  { name: "Brincos Ouro Tuareg", category: "acessorios", price: 4900, img: 3, desc: "Brincos circulares em latão dourado." },
  { name: "Camisa Print Savanna", category: "masculino", price: 13900, img: 0, desc: "Camisa manga curta com estampa savana." },
  { name: "Lenço Quadrado Nairobi", category: "acessorios", price: 3900, img: 3, desc: "Lenço de seda com print exclusivo." },
  { name: "Camisa Mini Ankara", category: "infantil", price: 7900, img: 0, desc: "Camisa infantil com estampa Ankara reduzida." },
  { name: "Sapatênis Mandela", category: "acessorios", price: 19900, img: 4, desc: "Sapatênis em couro com detalhes em tecido africano." },
  { name: "Camisa Polo Tribal", category: "masculino", price: 11900, img: 0, desc: "Polo em piquet com detalhes tribais." },
  { name: "Vestido Infantil Festa", category: "infantil", price: 13500, img: 1, desc: "Vestido de festa infantil em wax cintilante." },
  { name: "Bracelete Ouro Maasai", category: "acessorios", price: 5900, img: 3, desc: "Bracelete inspirado nas joias Maasai." },
  { name: "Camisa Linho Calabar", category: "masculino", price: 15900, img: 0, desc: "Camisa de linho com gola padre." },
  { name: "Conjunto Bebé WF", category: "infantil", price: 9900, img: 2, desc: "Conjunto para bebés em algodão orgânico." },
  { name: "Colar Múltiplo Ouro", category: "acessorios", price: 7500, img: 3, desc: "Colar de camadas em banho de ouro." },
  { name: "Bermuda Print Lagos", category: "masculino", price: 9900, img: 0, desc: "Bermuda com estampa contemporânea." },
  { name: "Tênis Couro Premium", category: "acessorios", price: 24900, img: 4, desc: "Tênis em couro com detalhes em wax." },
  { name: "Camisa Smoking Royale", category: "masculino", price: 32900, img: 2, desc: "Camisa social com peitilho bordado." },
  { name: "Calça Alfaiataria Bronze", category: "masculino", price: 22900, img: 2, desc: "Calça de alfaiataria em tom bronze." },
  { name: "Camisa Infantil Heritage", category: "infantil", price: 8500, img: 0, desc: "Camisa para crianças em wax suave." },
  { name: "Cinto Couro Trançado", category: "acessorios", price: 4500, img: 3, desc: "Cinto em couro trançado à mão." },
  { name: "Camisa Estampa Geo", category: "masculino", price: 14500, img: 0, desc: "Camisa com padrão geométrico." },
  { name: "Conjunto Coordenado Royal", category: "masculino", price: 44900, img: 2, desc: "Conjunto coordenado camisa e calça." },
  { name: "Mochila Couro Étnica", category: "acessorios", price: 18900, img: 3, desc: "Mochila em couro com detalhe tribal." },
  { name: "Camisa Linho Branca", category: "masculino", price: 13900, img: 0, desc: "Camisa branca em linho premium." },
  { name: "Boné Ankara Street", category: "acessorios", price: 3500, img: 3, desc: "Boné em wax com viseira curva." },
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