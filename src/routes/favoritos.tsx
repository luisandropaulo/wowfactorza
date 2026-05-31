import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/stores/shop";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favoritos")({
  head: () => ({ meta: [{ title: "Favoritos — Ubuntu Wear" }, { name: "description", content: "Os seus produtos favoritos." }] }),
  component: () => {
    const ids = useWishlist((s) => s.ids);
    const items = products.filter((p) => ids.includes(p.id));
    return (
      <div className="container-luxe py-12">
        <h1 className="font-display text-4xl">Favoritos</h1>
        {items.length === 0 ? (
          <div className="py-24 text-center">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Ainda não adicionou produtos aos favoritos.</p>
            <Link to="/colecoes" className="mt-6 inline-block"><Button>Explorar coleções</Button></Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    );
  },
});