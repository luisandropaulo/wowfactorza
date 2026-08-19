import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedCatalog, dropProducts, type Product, type Category } from "@/data/products";
import catKids from "@/assets/cat-kids.jpg";
import catAcc from "@/assets/cat-accessories.jpg";
import catMenDrop from "@/assets/drops/thorn-tracksuit.jpg.asset.json";
import catWomenDrop from "@/assets/drops/tee-clay-front.jpg.asset.json";

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface BankAccount {
  id: string;
  bank: string;
  holder: string;
  iban: string;
  accountNumber: string;
  currency: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  heroTitle: string;
    heroSubtitle: string;
  heroCta: string;
  aboutShort: string;
  aboutHeadline: string;
  aboutMission: string;
  aboutVision: string;
  aboutValues: string;
  categoriesTitle: string;
  featuredTitle: string;
  carouselTitle: string;
  carouselSubtitle: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  footerNote: string;
  adminPin: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  freeShippingThreshold: number;
  shippingFlatRate: number;
  currency: string;
  paymentInstructions: string;
  proofEmail: string;
}

export interface HomeCategory {
  id: string;
  label: string;
  image: string;
  to: string;
}

const defaultSettings: SiteSettings = {
  brandName: "Wow Factor",
  tagline: "Streetwear jovem e contemporâneo",
  heroTitle: "Feito para quem não passa despercebido",
  heroSubtitle: "Streetwear contemporâneo, drops limitados e peças que falam mais alto que palavras.",
  heroCta: "Ver o drop",
  aboutShort: "Wow Factor é uma marca de streetwear jovem e contemporânea, nascida da rua e feita para quem cria a sua própria linguagem.",
  aboutHeadline: "A nossa história começa na rua",
  aboutMission: "Levar o streetwear jovem angolano ao mundo, com peças de qualidade e produção responsável.",
  aboutVision: "Ser a marca de referência do streetwear contemporâneo em Angola e além.",
  aboutValues: "Autenticidade, qualidade, comunidade e liberdade de expressão.",
  categoriesTitle: "Categorias",
  featuredTitle: "Produtos em Destaque",
  carouselTitle: "Coleções à venda",
  carouselSubtitle: "Disponível agora",
  newsletterTitle: "Receba novidades e drops exclusivos",
  newsletterSubtitle: "Junte-se à família Wow Factor e seja o primeiro a saber de cada drop.",
  footerNote: "Vista a rua. Expresse a identidade.",
  adminPin: "wow2026",
  contactEmail: "ola@wowfactor.com",
  contactPhone: "+244 923 000 000",
  contactAddress: "Luanda, Angola",
  whatsapp: "+244923000000",
  instagram: "@wowfactor",
  facebook: "wowfactor",
  freeShippingThreshold: 50000,
  shippingFlatRate: 2500,
  currency: "AOA",
  paymentInstructions:
    "Efetue a transferência do valor total para uma das contas indicadas, usando o número do pedido como referência. Envie o comprovativo por email ou WhatsApp. Assim que o gestor de vendas validar o pagamento, o seu pedido é preparado e enviado.",
  proofEmail: "pagamentos@wowfactor.com",
};

const defaultBankAccounts: BankAccount[] = [
  { id: "bai", bank: "Banco BAI", holder: "Wow Factor, Lda.", iban: "AO06 0040 0000 1234 5678 9012 3", accountNumber: "123456789 10 001", currency: "AOA" },
  { id: "bfa", bank: "Banco BFA", holder: "Wow Factor, Lda.", iban: "AO06 0006 0000 9876 5432 1098 7", accountNumber: "987654321 10 001", currency: "AOA" },
];

const defaultPayments: PaymentMethod[] = [
  { id: "transferencia", name: "Transferência Bancária", description: "Pagamento por transferência para as contas da marca, validado manualmente pelo gestor de vendas.", enabled: true },
];

const defaultHomeCategories: HomeCategory[] = [
  { id: "masculino", label: "Masculino", image: catMenDrop.url, to: "/masculino" },
  { id: "feminino", label: "Feminino", image: catWomenDrop.url, to: "/feminino" },
  { id: "infantil", label: "Infantil", image: catKids, to: "/colecoes" },
  { id: "acessorios", label: "Acessórios", image: catAcc, to: "/acessorios" },
];

const defaultCarouselIds = dropProducts.map((p) => p.id);

interface AdminState {
  products: Product[];
  settings: SiteSettings;
  payments: PaymentMethod[];
  bankAccounts: BankAccount[];
  homeCategories: HomeCategory[];
  carouselProductIds: string[];
  // products CRUD
  upsertProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  // settings
  updateSettings: (patch: Partial<SiteSettings>) => void;
  upsertHomeCategory: (c: HomeCategory) => void;
  deleteHomeCategory: (id: string) => void;
  setCarouselProductIds: (ids: string[]) => void;
  // payments
  togglePayment: (id: string) => void;
  upsertPayment: (m: PaymentMethod) => void;
  deletePayment: (id: string) => void;
  upsertBankAccount: (b: BankAccount) => void;
  deleteBankAccount: (id: string) => void;
  resetAll: () => void;
}

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      products: seedCatalog,
      settings: defaultSettings,
      payments: defaultPayments,
      bankAccounts: defaultBankAccounts,
      homeCategories: defaultHomeCategories,
      carouselProductIds: defaultCarouselIds,
      upsertProduct: (p) =>
        set((s) => {
          const idx = s.products.findIndex((x) => x.id === p.id);
          if (idx === -1) return { products: [p, ...s.products] };
          const next = [...s.products];
          next[idx] = p;
          return { products: next };
        }),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),
      upsertHomeCategory: (c) =>
        set((s) => {
          const idx = s.homeCategories.findIndex((x) => x.id === c.id);
          if (idx === -1) return { homeCategories: [...s.homeCategories, c] };
          const next = [...s.homeCategories];
          next[idx] = c;
          return { homeCategories: next };
        }),
      deleteHomeCategory: (id) => set((s) => ({ homeCategories: s.homeCategories.filter((c) => c.id !== id) })),
      setCarouselProductIds: (ids) => set({ carouselProductIds: ids }),
      togglePayment: (id) =>
        set((s) => ({ payments: s.payments.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)) })),
      upsertPayment: (m) =>
        set((s) => {
          const idx = s.payments.findIndex((p) => p.id === m.id);
          if (idx === -1) return { payments: [...s.payments, m] };
          const next = [...s.payments];
          next[idx] = m;
          return { payments: next };
        }),
      deletePayment: (id) => set((s) => ({ payments: s.payments.filter((p) => p.id !== id) })),
      upsertBankAccount: (b) =>
        set((s) => {
          const idx = s.bankAccounts.findIndex((x) => x.id === b.id);
          if (idx === -1) return { bankAccounts: [...s.bankAccounts, b] };
          const next = [...s.bankAccounts];
          next[idx] = b;
          return { bankAccounts: next };
        }),
      deleteBankAccount: (id) => set((s) => ({ bankAccounts: s.bankAccounts.filter((b) => b.id !== id) })),
      resetAll: () =>
        set({
          products: seedCatalog,
          settings: defaultSettings,
          payments: defaultPayments,
          bankAccounts: defaultBankAccounts,
          homeCategories: defaultHomeCategories,
          carouselProductIds: defaultCarouselIds,
        }),
    }),
    {
      name: "wf-admin",
      version: 5,
      migrate: (persisted) => {
        const p = (persisted ?? {}) as Partial<AdminState>;
        return {
          ...p,
          products: seedCatalog,
          homeCategories: defaultHomeCategories,
          carouselProductIds: defaultCarouselIds,
          settings: { ...defaultSettings, ...(p.settings ?? {}) },
        } as AdminState;
      },
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<AdminState>;
        return {
          ...current,
          ...p,
          settings: { ...current.settings, ...(p.settings ?? {}) },
          homeCategories: p.homeCategories?.length ? p.homeCategories : current.homeCategories,
          carouselProductIds: p.carouselProductIds?.length ? p.carouselProductIds : current.carouselProductIds,
          products: p.products?.length ? p.products : current.products,
        } as AdminState;
      },
    },
  ),
);

// React-safe selectors used by storefront pages
export const useCatalog = () => useAdmin((s) => s.products);
export const useSettings = () => useAdmin((s) => s.settings);
export const useEnabledPayments = () => useAdmin((s) => s.payments.filter((p) => p.enabled));
export const useBankAccounts = () => useAdmin((s) => s.bankAccounts);
export const useHomeCategories = () => useAdmin((s) => s.homeCategories);
export function useCarouselProducts(): Product[] {
  const products = useAdmin((s) => s.products);
  const ids = useAdmin((s) => s.carouselProductIds);
  const set = new Set(ids);
  const picked = products.filter((p) => set.has(p.id));
  return picked.length ? picked : products.slice(0, 8);
}

// Non-hook accessors (for loaders)
export function getCatalog(): Product[] {
  return useAdmin.getState().products;
}
export function getProductBySlugLive(slug: string) {
  return getCatalog().find((p) => p.slug === slug);
}
export function getRelatedLive(p: Product, limit = 4) {
  return getCatalog().filter((x) => x.category === p.category && x.id !== p.id).slice(0, limit);
}
export function filterCatalog(category: Category) {
  return getCatalog().filter((p) => p.category === category);
}