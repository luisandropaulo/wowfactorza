import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/stores/admin";

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
  component: MasculinoPage,
});

function MasculinoPage() {
  const items = useCatalog().filter((p) => p.category === "masculino");
  return <ProductGrid items={items} title="Masculino" subtitle="Força, sofisticação e raízes." />;
}