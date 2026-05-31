import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { type Product, formatPrice } from "@/data/products";
import { useCart, useWishlist } from "@/stores/shop";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { QuickView } from "./QuickView";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const { has, toggle } = useWishlist();
  const [quick, setQuick] = useState(false);
  const liked = has(product.id);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="group relative"
      >
        <Link to="/produto/$slug" params={{ slug: product.slug }} className="block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.isNew && (
              <span className="absolute left-3 top-3 bg-gradient-gold px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary">Novo</span>
            )}
            {product.oldPrice && (
              <span className="absolute right-3 top-3 bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
            )}
            <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-1 bg-secondary/95 p-2 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault();
                  add({
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size: product.sizes[0],
                    color: product.colors[0],
                    quantity: 1,
                  });
                  toast.success("Adicionado ao carrinho", { description: product.name });
                }}
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Comprar
              </Button>
              <Button variant="secondary" size="icon" onClick={(e) => { e.preventDefault(); setQuick(true); }} aria-label="Vista rápida">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={(e) => { e.preventDefault(); toggle(product.id); }} aria-label="Favoritar">
                <Heart className={cn("h-4 w-4", liked && "fill-current text-gold")} />
              </Button>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.collection}</p>
            <h3 className="font-display text-lg leading-tight">{product.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-current text-gold" /> {product.rating.toFixed(1)} ({product.reviews})
            </div>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-base font-semibold">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>}
            </div>
          </div>
        </Link>
      </motion.article>
      <QuickView product={product} open={quick} onOpenChange={setQuick} />
    </>
  );
}