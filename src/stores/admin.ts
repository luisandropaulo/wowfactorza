import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedCatalog, type Product, type Category } from "@/data/products";

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  heroTitle: string;
    heroSubtitle: string;
  heroCta: string;
  aboutShort: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  freeShippingThreshold: number;
  shippingFlatRate: number;
  currency: string;
}

const defaultSettings: SiteSettings = {
  brandName: "Wow Factor",
  tagline: "Moda africana contemporânea",
  heroTitle: "Vista a sua ancestralidade",
  heroSubtitle: "Coleção 2026 inspirada na riqueza cultural do continente africano.",
  heroCta: "Descobrir coleção",
  aboutShort: "Wow Factor nasce do encontro entre tradição africana e design contemporâneo.",
  contactEmail: "ola@wowfactor.com",
  contactPhone: "+244 923 000 000",
  contactAddress: "Luanda, Angola",
  whatsapp: "+244923000000",
  instagram: "@wowfactor",
  facebook: "wowfactor",
  freeShippingThreshold: 50000,
  shippingFlatRate: 2500,
  currency: "AOA",
};

const defaultPayments: PaymentMethod[] = [
  { id: "multicaixa", name: "Multicaixa Express", description: "Pagamento instantâneo via Multicaixa Express", enabled: true },
  { id: "transferencia", name: "Transferência Bancária", description: "BAI / BFA / BIC — comprovativo por email", enabled: true },
  { id: "cod", name: "Pagamento na Entrega", description: "Dinheiro à entrega (apenas Luanda)", enabled: true },
  { id: "cartao", name: "Cartão Visa/Mastercard", description: "Pagamento seguro com cartão internacional", enabled: false },
  { id: "paypal", name: "PayPal", description: "Pagamento via conta PayPal", enabled: false },
];

interface AdminState {
  products: Product[];
  settings: SiteSettings;
  payments: PaymentMethod[];
  // products CRUD
  upsertProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  // settings
  updateSettings: (patch: Partial<SiteSettings>) => void;
  // payments
  togglePayment: (id: string) => void;
  upsertPayment: (m: PaymentMethod) => void;
  deletePayment: (id: string) => void;
  resetAll: () => void;
}

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      products: seedCatalog,
      settings: defaultSettings,
      payments: defaultPayments,
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
      resetAll: () => set({ products: seedCatalog, settings: defaultSettings, payments: defaultPayments }),
    }),
    {
      name: "wf-admin",
      version: 2,
    },
  ),
);

// React-safe selectors used by storefront pages
export const useCatalog = () => useAdmin((s) => s.products);
export const useSettings = () => useAdmin((s) => s.settings);
export const useEnabledPayments = () => useAdmin((s) => s.payments.filter((p) => p.enabled));

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