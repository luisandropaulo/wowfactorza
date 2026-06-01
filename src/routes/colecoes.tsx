import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/stores/admin";

export const Route = createFileRoute("/colecoes")({
  head: () => ({
    meta: [
      { title: "Coleções — Ubuntu Wear" },
      { name: "description", content: "Todas as coleções Ubuntu Wear: Heritage, Sahara, Kente Royale, Afro Moderno e Ubuntu Spirit." },
      { property: "og:title", content: "Coleções — Ubuntu Wear" },
      { property: "og:description", content: "Descubra as coleções exclusivas Ubuntu Wear." },
    ],
    links: [{ rel: "canonical", href: "/colecoes" }],
  }),
  component: ColecoesPage,
});

function ColecoesPage() {
  const items = useCatalog();
  return <ProductGrid items={items} title="Coleções" subtitle="Cada peça conta uma história. Encontre a sua." />;
}