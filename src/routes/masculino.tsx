import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/stores/admin";

export const Route = createFileRoute("/masculino")({
  head: () => ({
    meta: [
      { title: "Masculino — Wow Factor" },
      { name: "description", content: "Moda africana masculina premium: dashikis, blazers Kente e alfaiataria contemporânea." },
      { property: "og:title", content: "Masculino — Wow Factor" },
      { property: "og:description", content: "Coleção masculina Wow Factor." },
    ],
    links: [{ rel: "canonical", href: "/masculino" }],
  }),
  component: MasculinoPage,
});

function MasculinoPage() {
  const items = useCatalog().filter((p) => p.category === "masculino");
  return <ProductGrid items={items} title="Masculino" subtitle="Força, sofisticação e raízes." />;
}