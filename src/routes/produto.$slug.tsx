import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/data/products";
import { getProductBySlugLive, getRelatedLive } from "@/stores/admin";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useCart, useWishlist } from "@/stores/shop";
import { Heart, ShoppingBag, Star, Truck, RefreshCw, Shield, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlugLive(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Wow Factor` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
          { property: "og:type", content: "product" },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => <div className="container-luxe py-24 text-center"><h1 className="font-display text-3xl">Produto não encontrado</h1></div>,
  errorComponent: () => <div className="container-luxe py-24 text-center">Erro ao carregar produto.</div>,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(product.gallery[0]);
  const [zoom, setZoom] = useState(false);
  const add = useCart((s) => s.add);
  const { has, toggle } = useWishlist();
  const related = getRelatedLive(product);

  const handleAdd = () => {
    add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, size, color, quantity: qty });
    toast.success("Adicionado ao carrinho", { description: `${product.name} × ${qty}` });
  };

  return (
    <div className="container-luxe py-10">
      {/* breadcrumb */}
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/colecoes" className="hover:text-foreground">Coleções</Link> / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted"
            onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)}
          >
            <img src={mainImg} alt={product.name} className={cn("h-full w-full object-cover transition-transform duration-500", zoom && "scale-150")} />
          </motion.div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.gallery.map((g, i) => (
              <button key={i} onClick={() => setMainImg(g)} className={cn("aspect-square overflow-hidden rounded-sm border-2", mainImg === g ? "border-gold" : "border-transparent")}>
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{product.collection}</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-current text-gold" /> {product.rating.toFixed(1)}</div>
            <span className="text-muted-foreground">· {product.reviews} avaliações</span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>}
          </div>
          <p className="mt-6 text-muted-foreground">{product.description}</p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest">Cor</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} aria-label={`Cor ${c}`} style={{ backgroundColor: c }}
                    className={cn("h-9 w-9 rounded-full border-2", color === c ? "border-foreground" : "border-border")} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest">Tamanho</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={cn("min-w-12 border px-4 py-2 text-sm", size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}>{s}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-widest">Quantidade</p>
              <div className="flex items-center border border-border">
                <button className="p-2" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button className="p-2" onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Aumentar"><Plus className="h-4 w-4" /></button>
              </div>
              <span className="text-xs text-muted-foreground">{product.stock} em stock</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={handleAdd} className="flex-1 min-w-44"><ShoppingBag className="h-4 w-4" /> Adicionar ao carrinho</Button>
            <Link to="/checkout" className="flex-1 min-w-44">
              <Button size="lg" variant="secondary" className="w-full" onClick={handleAdd}>Comprar Agora</Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => toggle(product.id)} aria-label="Favoritar">
              <Heart className={cn("h-4 w-4", has(product.id) && "fill-current text-gold")} />
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
            <div className="flex flex-col items-center gap-1 text-center"><Truck className="h-5 w-5 text-gold" /> Envio em 48h</div>
            <div className="flex flex-col items-center gap-1 text-center"><RefreshCw className="h-5 w-5 text-gold" /> Troca 30 dias</div>
            <div className="flex flex-col items-center gap-1 text-center"><Shield className="h-5 w-5 text-gold" /> Pagamento seguro</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-display text-3xl">Produtos relacionados</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}