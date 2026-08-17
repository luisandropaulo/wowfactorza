import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/products";
import { motion } from "framer-motion";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Wow Factor" },
      { name: "description", content: "Cultura, tendências e moda africana no blog Wow Factor." },
      { property: "og:title", content: "Blog — Wow Factor" },
      { property: "og:description", content: "Histórias e tendências da moda africana." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: () => (
    <div className="container-luxe py-12">
      <h1 className="font-display text-5xl text-center">Blog Ubuntu</h1>
      <p className="mt-3 text-center text-muted-foreground">Moda Africana · Cultura · Tendências · Eventos</p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {blogPosts.map((p, i) => (
          <motion.article key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
              <div className="aspect-[16/10] overflow-hidden bg-muted"><div className="h-full w-full bg-gradient-gold opacity-80 transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-gold">{p.category} · {p.date}</p>
                <h2 className="mt-2 font-display text-2xl">{p.title}</h2>
                <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  ),
});