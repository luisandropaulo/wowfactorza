import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/stores/shop";

export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "Aguarda pagamento",
  paid: "Pagamento validado",
  shipped: "Enviado",
  cancelled: "Cancelado",
};

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country: string;
  };
  shippingMethod: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  proofRef?: string;
  note?: string;
}

interface OrdersState {
  orders: Order[];
  addOrder: (o: Order) => void;
  setStatus: (id: string, status: OrderStatus) => void;
  setNote: (id: string, note: string) => void;
  removeOrder: (id: string) => void;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
      setStatus: (id, status) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
      setNote: (id, note) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, note } : o)) })),
      removeOrder: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
    }),
    { name: "wf-orders" },
  ),
);

export function newOrderId() {
  return `WF${Date.now().toString().slice(-8)}`;
}