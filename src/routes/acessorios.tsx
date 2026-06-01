import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/stores/admin";

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
  component: AcessoriosPage,
});

function AcessoriosPage() {
  const items = useCatalog().filter((p) => p.category === "acessorios");
  return <ProductGrid items={items} title="Acessórios" subtitle="Os detalhes que contam tudo." />;
}