import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/stores/admin";

export const Route = createFileRoute("/colecoes")({
  head: () => ({
    meta: [
      { title: "Coleções — Wow Factor" },
      { name: "description", content: "Todos os drops Wow Factor: streetwear jovem, contemporâneo e em edição limitada." },
      { property: "og:title", content: "Coleções — Wow Factor" },
      { property: "og:description", content: "Descubra os drops exclusivos de streetwear Wow Factor." },
    ],
    links: [{ rel: "canonical", href: "/colecoes" }],
  }),
  component: ColecoesPage,
});

function ColecoesPage() {
  const items = useCatalog();
  return <ProductGrid items={items} title="Coleções" subtitle="Cada peça conta uma história. Encontre a sua." />;
}