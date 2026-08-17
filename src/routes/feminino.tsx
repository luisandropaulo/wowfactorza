import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/stores/admin";

export const Route = createFileRoute("/feminino")({
  head: () => ({
    meta: [
      { title: "Feminino — Wow Factor" },
      { name: "description", content: "Vestidos, macacões e peças femininas em Ankara, wax e tecidos africanos premium." },
      { property: "og:title", content: "Feminino — Wow Factor" },
      { property: "og:description", content: "Coleção feminina Wow Factor." },
    ],
    links: [{ rel: "canonical", href: "/feminino" }],
  }),
  component: FemininoPage,
});

function FemininoPage() {
  const items = useCatalog().filter((p) => p.category === "feminino");
  return <ProductGrid items={items} title="Feminino" subtitle="Liberdade, brilho e ancestralidade." />;
}