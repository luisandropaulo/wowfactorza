import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre nós — Wow Factor" },
      { name: "description", content: "A história, missão e visão da Wow Factor." },
      { property: "og:title", content: "Sobre nós — Wow Factor" },
      { property: "og:description", content: "Conheça a história Wow Factor." },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: About,
});

const timeline = [
  { y: "2019", t: "Nasce a ideia em Luanda" },
  { y: "2021", t: "Primeira coleção Heritage" },
  { y: "2023", t: "Loja física no centro de Luanda" },
  { y: "2025", t: "Expansão para Lisboa, Maputo e Lagos" },
  { y: "2026", t: "Coleção Ubuntu Spirit em parceria com artesãos malianos" },
];

function About() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] -mt-20 overflow-hidden">
        <img src={hero} alt="Wow Factor" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container-luxe relative z-10 flex h-full items-end pb-16 text-white">
          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-5xl md:text-7xl max-w-3xl">A nossa história começa em África</motion.h1>
        </div>
      </section>
      <section className="container-luxe grid gap-12 py-20 md:grid-cols-3">
        <div><h2 className="font-display text-2xl text-gold">Missão</h2><p className="mt-3 text-muted-foreground">Levar a beleza da cultura africana ao mundo, valorizando artesãos locais e materiais sustentáveis.</p></div>
        <div><h2 className="font-display text-2xl text-gold">Visão</h2><p className="mt-3 text-muted-foreground">Ser a referência global em moda africana contemporânea, unindo tradição e modernidade.</p></div>
        <div><h2 className="font-display text-2xl text-gold">Valores</h2><p className="mt-3 text-muted-foreground">Ubuntu, autenticidade, qualidade, sustentabilidade e orgulho africano.</p></div>
      </section>
      <section className="bg-muted/30 py-20">
        <div className="container-luxe">
          <h2 className="mb-12 text-center font-display text-4xl">A nossa jornada</h2>
          <div className="relative mx-auto max-w-2xl">
            {timeline.map((t, i) => (
              <motion.div key={t.y} initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-6 pb-8 last:pb-0">
                <div className="font-display text-2xl text-gold w-20 shrink-0">{t.y}</div>
                <div className="flex-1 border-l-2 border-gold pl-6 pb-6"><p>{t.t}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}