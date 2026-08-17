import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/stores/shop";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/carrinho")({
  head: () => ({ meta: [{ title: "Carrinho — Wow Factor" }, { name: "description", content: "Reveja os seus produtos antes de finalizar a compra." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, update, remove, applyCoupon, subtotal, shipping, discount, total, coupon } = useCart();
  const [code, setCode] = useState("");

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 font-display text-4xl">O seu carrinho está vazio</h1>
        <p className="mt-2 text-muted-foreground">Descubra as nossas coleções e adicione as suas peças favoritas.</p>
        <Link to="/colecoes" className="mt-8 inline-block"><Button size="lg">Explorar coleções</Button></Link>
      </div>
    );
  }

  return (
    <div className="container-luxe py-12">
      <h1 className="font-display text-4xl">Carrinho</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.id + i.size + i.color} className="flex gap-4 border-b border-border pb-4">
              <img src={i.image} alt={i.name} className="h-32 w-24 object-cover" />
              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg">{i.name}</h3>
                    <p className="text-xs text-muted-foreground">Tamanho {i.size} · <span className="inline-block h-3 w-3 rounded-full align-middle" style={{ backgroundColor: i.color }} /></p>
                  </div>
                  <button onClick={() => remove(i.id, i.size, i.color)} aria-label="Remover" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button className="p-2" onClick={() => update(i.id, i.size, i.color, i.quantity - 1)}><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm">{i.quantity}</span>
                    <button className="p-2" onClick={() => update(i.id, i.size, i.color, i.quantity + 1)}><Plus className="h-3 w-3" /></button>
                  </div>
                  <span className="font-semibold">{formatPrice(i.price * i.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit space-y-4 border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Resumo</h2>
          <div className="flex gap-2">
            <Input placeholder="Cupom (UBUNTU10 / AFRICA20)" value={code} onChange={(e) => setCode(e.target.value)} />
            <Button variant="outline" onClick={() => {
              if (applyCoupon(code)) toast.success("Cupom aplicado!"); else toast.error("Cupom inválido.");
            }}>Aplicar</Button>
          </div>
          <div className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal())}</span></div>
            <div className="flex justify-between"><span>Envio</span><span>{shipping() === 0 ? "Grátis" : formatPrice(shipping())}</span></div>
            {coupon && <div className="flex justify-between text-gold"><span>Desconto ({coupon})</span><span>-{formatPrice(discount())}</span></div>}
            <div className="flex justify-between border-t border-border pt-2 text-lg font-semibold"><span>Total</span><span>{formatPrice(total())}</span></div>
          </div>
          <Link to="/checkout"><Button size="lg" className="w-full">Finalizar compra</Button></Link>
          <Link to="/colecoes" className="block text-center text-xs underline-offset-4 hover:underline">Continuar a comprar</Link>
        </aside>
      </div>
    </div>
  );
}