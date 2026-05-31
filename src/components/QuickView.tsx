import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { type Product, formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/shop";
import { useState } from "react";
import { ShoppingBag, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function QuickView({ product, open, onOpenChange }: { product: Product; open: boolean; onOpenChange: (v: boolean) => void }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const add = useCart((s) => s.add);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid md:grid-cols-2">
          <img src={product.image} alt={product.name} className="h-full max-h-[70vh] w-full object-cover" />
          <div className="space-y-4 p-6">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.collection}</p>
            <h2 className="font-display text-2xl">{product.name}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-current text-gold" /> {product.rating.toFixed(1)} ({product.reviews} avaliações)
            </div>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <div className="text-2xl font-semibold">{formatPrice(product.price)}</div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest">Tamanho</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn("min-w-10 rounded-sm border px-3 py-1.5 text-sm", size === s ? "border-foreground bg-foreground text-background" : "border-border")}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest">Cor</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={`Cor ${c}`}
                    style={{ backgroundColor: c }}
                    className={cn("h-7 w-7 rounded-full border-2", color === c ? "border-foreground" : "border-transparent")}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1"
                onClick={() => {
                  add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, size, color, quantity: 1 });
                  toast.success("Adicionado ao carrinho", { description: product.name });
                  onOpenChange(false);
                }}
              >
                <ShoppingBag className="h-4 w-4" /> Adicionar ao carrinho
              </Button>
              <Link to="/produto/$slug" params={{ slug: product.slug }} onClick={() => onOpenChange(false)}>
                <Button variant="outline">Ver mais</Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}