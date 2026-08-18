import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogPosts } from "@/data/products";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.post.title} — Wow Factor` },
      { name: "description", content: loaderData.post.excerpt },
      { property: "og:title", content: loaderData.post.title },
      { property: "og:description", content: loaderData.post.excerpt },
      { property: "og:type", content: "article" },
    ] : [],
  }),
  component: () => {
    const { post } = Route.useLoaderData() as { post: typeof blogPosts[number] };
    return (
      <article className="container-luxe max-w-3xl py-16">
        <Link to="/blog" className="text-xs uppercase tracking-widest text-gold">← Blog</Link>
        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">{post.category} · {post.date}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{post.title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="prose mt-10 space-y-4 text-foreground">
          <p>A rua é o nosso laboratório. Cada drop Wow Factor nasce de um detalhe do dia a dia urbano — um grafite, uma letra de rap, uma noite que não acabou — e transforma-se em print, lavagem ou corte oversized.</p>
          <p>Trabalhamos com moletão pesado, algodão penteado e lavagens ácidas feitas em pequenas séries. Nada é produzido em massa: cada coleção tem numeração limitada e, quando esgota, não volta.</p>
          <p>Thorn, Desire e Washed 2003 são os capítulos atuais dessa história — peças unissexo, pensadas para camadas, para se destacar e para durar muito mais do que uma estação.</p>
        </div>
      </article>
    );
  },
  notFoundComponent: () => <div className="container-luxe py-24 text-center"><h1 className="font-display text-3xl">Artigo não encontrado</h1></div>,
});