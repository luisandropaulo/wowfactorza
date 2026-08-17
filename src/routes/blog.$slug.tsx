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
          <p>O continente africano sempre foi um celeiro inesgotável de criatividade. Dos tecidos Ankara da Nigéria aos panos Kente do Gana, passando pelo Bogolan do Mali e pelo Shweshwe da África do Sul, cada padrão carrega séculos de história, identidade e orgulho.</p>
          <p>Na Wow Factor, traduzimos essa riqueza cultural em peças contemporâneas, pensadas para o guarda-roupa moderno sem perder a alma das suas origens. Cada coleção é desenvolvida em parceria com artesãos locais, garantindo cadeias de produção justas e materiais sustentáveis.</p>
          <p>O resultado é uma moda que celebra a diversidade, o talento e o futuro africano — para vestir todos os dias, com orgulho.</p>
        </div>
      </article>
    );
  },
  notFoundComponent: () => <div className="container-luxe py-24 text-center"><h1 className="font-display text-3xl">Artigo não encontrado</h1></div>,
});