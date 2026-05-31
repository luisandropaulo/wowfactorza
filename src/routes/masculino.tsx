import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";

export const Route = createFileRoute("/masculino")({
  head: () => ({
    meta: [
      { title: "Masculino — Ubuntu Wear" },
      { name: "description", content: "Moda africana masculina premium: dashikis, blazers Kente e alfaiataria contemporânea." },
      { property: "og:title", content: "Masculino — Ubuntu Wear" },
      { property: "og:description", content: "Coleção masculina Ubuntu Wear." },
    ],
    links: [{ rel: "canonical", href: "/masculino" }],
  }),
  component: () => <ProductGrid items={products.filter((p) => p.category === "masculino")} title="Masculino" subtitle="Força, sofisticação e raízes." />,
});