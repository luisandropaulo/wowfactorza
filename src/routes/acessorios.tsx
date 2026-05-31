import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";

export const Route = createFileRoute("/acessorios")({
  head: () => ({
    meta: [
      { title: "Acessórios — Ubuntu Wear" },
      { name: "description", content: "Acessórios africanos: turbantes, bolsas, joias e sapatos artesanais." },
      { property: "og:title", content: "Acessórios — Ubuntu Wear" },
      { property: "og:description", content: "Acessórios artesanais Ubuntu Wear." },
    ],
    links: [{ rel: "canonical", href: "/acessorios" }],
  }),
  component: () => <ProductGrid items={products.filter((p) => p.category === "acessorios")} title="Acessórios" subtitle="Os detalhes que contam tudo." />,
});