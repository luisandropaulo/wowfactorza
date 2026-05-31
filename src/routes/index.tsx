import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Truck, Shield, RefreshCw, Headphones, ArrowRight, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import hero from "@/assets/hero.jpg";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catAcc from "@/assets/cat-accessories.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ubuntu Wear — Vista a Cultura. Expresse a Identidade." },
      { name: "description", content: "Moda africana contemporânea, premium e autêntica. Coleções exclusivas em Ankara, Kente, Bogolan e mais." },
      { property: "og:title", content: "Ubuntu Wear — Moda Africana Premium" },
      { property: "og:description", content: "Coleções exclusivas inspiradas na cultura africana contemporânea." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const categories = [
  { key: "masculino", label: "Masculino", img: catMen, to: "/masculino" as const },
  { key: "feminino", label: "Feminino", img: catWomen, to: "/feminino" as const },
  { key: "infantil", label: "Infantil", img: catKids, to: "/colecoes" as const },
  { key: "acessorios", label: "Acessórios", img: catAcc, to: "/acessorios" as const },
];

const benefits = [
  { icon: Truck, title: "Entrega Nacional", desc: "Em toda Angola, rápido e seguro." },
  { icon: Shield, title: "Pagamento Seguro", desc: "Multicaixa, transferência e cartão." },
  { icon: RefreshCw, title: "Troca Garantida", desc: "30 dias para trocas e devoluções." },
  { icon: Headphones, title: "Suporte 24/7", desc: "Estamos sempre disponíveis." },
];

const testimonials = [
  { name: "Maria Lopes", quote: "Qualidade impecável. As estampas são vibrantes e o caimento perfeito.", rating: 5 },
  { name: "João Mateus", quote: "Vesti um blazer Kente no meu casamento. Recebi elogios o tempo todo.", rating: 5 },
  { name: "Ana Cardoso", quote: "Embalagem premium, entrega rápida e atendimento atencioso.", rating: 5 },
];

function Index() {
  const featured = products.slice(0, 8);
  const newCollection = products.slice(8, 14);

  return (
    <div className="-mt-20">
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img src={hero} alt="Modelos vestindo coleção Ubuntu Wear" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-24 text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mb-4 text-xs uppercase tracking-[0.4em] text-gold"
          >
            Coleção Heritage 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl"
          >
            Vista a Cultura.<br /><span className="text-gold italic">Expresse a Identidade.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-6 max-w-xl text-base text-white/80 md:text-lg"
          >
            Moda africana contemporânea para quem carrega orgulho, elegância e autenticidade.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/colecoes">
              <Button size="lg" className="bg-gradient-gold text-secondary hover:opacity-90">Comprar Agora <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <Link to="/colecoes">
              <Button size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white hover:text-secondary">Nova Coleção</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-luxe py-24">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Explore</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Categorias</h2>
          </div>
          <Link to="/colecoes" className="hidden text-sm font-medium underline-offset-4 hover:underline md:block">Ver tudo</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((c, i) => (
            <motion.div key={c.key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={c.to} className="group relative block aspect-[3/4] overflow-hidden rounded-sm">
                <img src={c.img} alt={c.label} loading="lazy" width={800} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl">{c.label}</h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gold opacity-0 transition-opacity group-hover:opacity-100">
                    Descobrir <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-luxe py-16">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Mais desejados</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Produtos em Destaque</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* NEW COLLECTION carousel */}
      <section className="bg-secondary py-24 text-secondary-foreground">
        <div className="container-luxe">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Novidades</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">Nova Coleção</h2>
            </div>
            <Link to="/colecoes" className="text-sm text-gold underline-offset-4 hover:underline">Ver coleção completa</Link>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4">
            {newCollection.map((p) => (
              <Link key={p.id} to="/produto/$slug" params={{ slug: p.slug }} className="group w-72 shrink-0 snap-start">
                <div className="aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-3 font-display text-lg text-white">{p.name}</h3>
                <p className="text-sm text-gold">{new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA", maximumFractionDigits: 0 }).format(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container-luxe py-24">
        <div className="grid gap-8 md:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-gold text-secondary">
                <b.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-lg">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40 py-24">
        <div className="container-luxe">
          <h2 className="mb-12 text-center font-display text-4xl md:text-5xl">O que dizem os nossos clientes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-sm border border-border bg-card p-8 shadow-elegant"
              >
                <div className="mb-4 flex gap-1 text-gold">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="font-display text-lg italic">"{t.quote}"</p>
                <footer className="mt-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">— {t.name}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-luxe py-24">
        <div className="rounded-sm bg-gradient-gold p-12 text-center text-secondary shadow-gold md:p-16">
          <h2 className="font-display text-3xl md:text-5xl">Receba novidades e promoções exclusivas</h2>
          <p className="mx-auto mt-3 max-w-xl">Junte-se à família Ubuntu e seja o primeiro a conhecer as novas coleções.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Bem-vindo à família Ubuntu!");
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="mx-auto mt-8 flex max-w-md gap-2"
          >
            <Input type="email" required name="email" placeholder="O seu email" className="bg-white text-foreground" />
            <Button type="submit" variant="secondary">Subscrever</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
