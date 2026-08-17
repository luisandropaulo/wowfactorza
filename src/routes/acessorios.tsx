import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/stores/admin";

export const Route = createFileRoute("/acessorios")({
  head: () => ({
    meta: [
      { title: "Acessórios — Wow Factor" },
      { name: "description", content: "Acessórios streetwear: bonés, bolsas, sneakers e joalharia urbana." },
      { property: "og:title", content: "Acessórios — Wow Factor" },
      { property: "og:description", content: "Acessórios artesanais Wow Factor." },
    ],
    links: [{ rel: "canonical", href: "/acessorios" }],
  }),
  component: AcessoriosPage,
});

function AcessoriosPage() {
  const items = useCatalog().filter((p) => p.category === "acessorios");
  return <ProductGrid items={items} title="Acessórios" subtitle="Os detalhes que contam tudo." />;
}