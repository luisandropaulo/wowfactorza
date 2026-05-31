import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  coupon?: string;
  add: (item: CartItem) => void;
  remove: (id: string, size: string, color: string) => void;
  update: (id: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  subtotal: () => number;
  discount: () => number;
  shipping: () => number;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: undefined,
      add: (item) =>
        set((s) => {
          const idx = s.items.findIndex(
            (i) => i.id === item.id && i.size === item.size && i.color === item.color,
          );
          if (idx >= 0) {
            const items = [...s.items];
            items[idx] = { ...items[idx], quantity: items[idx].quantity + item.quantity };
            return { items };
          }
          return { items: [...s.items, item] };
        }),
      remove: (id, size, color) =>
        set((s) => ({ items: s.items.filter((i) => !(i.id === id && i.size === size && i.color === color)) })),
      update: (id, size, color, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id && i.size === size && i.color === color ? { ...i, quantity: Math.max(1, qty) } : i,
          ),
        })),
      clear: () => set({ items: [], coupon: undefined }),
      applyCoupon: (code) => {
        const valid = ["UBUNTU10", "AFRICA20"].includes(code.toUpperCase());
        if (valid) set({ coupon: code.toUpperCase() });
        return valid;
      },
      subtotal: () => get().items.reduce((a, i) => a + i.price * i.quantity, 0),
      discount: () => {
        const c = get().coupon;
        if (!c) return 0;
        const sub = get().subtotal();
        return c === "AFRICA20" ? sub * 0.2 : sub * 0.1;
      },
      shipping: () => (get().subtotal() > 50000 ? 0 : 2500),
      total: () => Math.max(0, get().subtotal() - get().discount() + get().shipping()),
      count: () => get().items.reduce((a, i) => a + i.quantity, 0),
    }),
    { name: "ubuntu-cart" },
  ),
);

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "ubuntu-wishlist" },
  ),
);

interface UIState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}

export const useUI = create<UIState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((s) => {
          const next = s.theme === "light" ? "dark" : "light";
          if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("dark", next === "dark");
          }
          return { theme: next };
        }),
      searchOpen: false,
      setSearchOpen: (v) => set({ searchOpen: v }),
    }),
    { name: "ubuntu-ui" },
  ),
);

interface User {
  email: string;
  name: string;
}
interface AuthState {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
}
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, name) => set({ user: { email, name: name ?? email.split("@")[0] } }),
      logout: () => set({ user: null }),
    }),
    { name: "ubuntu-auth" },
  ),
);