import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/stores/admin";

export const Route = createFileRoute("/feminino")({
  head: () => ({
    meta: [
      { title: "Feminino — Streetwear Wow Factor" },
      { name: "description", content: "Streetwear feminino Wow Factor: tees oversized, conjuntos cropped washed e peças dos drops Thorn, Desire e WF Signature." },
      { property: "og:title", content: "Feminino — Streetwear Wow Factor" },
      { property: "og:description", content: "Tees oversized, conjuntos cropped e drops limitados para elas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/feminino" }],
  }),
  component: FemininoPage,
});

function FemininoPage() {
  const items = useCatalog().filter((p) => p.category === "feminino");
  return <ProductGrid items={items} title="Feminino" subtitle="Tees oversized, conjuntos cropped e drops feitos para se destacar." />;
}