import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart, useWishlist, useUI } from "@/stores/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCatalog } from "@/stores/admin";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/wow-factor-logo.jpg.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/colecoes", label: "Coleções" },
  { to: "/masculino", label: "Masculino" },
  { to: "/feminino", label: "Feminino" },
  { to: "/acessorios", label: "Acessórios" },
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cartCount = useCart((s) => s.count());
  const wishCount = useWishlist((s) => s.ids.length);
  const { theme, toggleTheme, searchOpen, setSearchOpen } = useUI();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const products = useCatalog();
  const transparent = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const results = query.length > 1
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        transparent
          ? "bg-transparent text-secondary-foreground"
          : "bg-background/90 text-foreground shadow-sm backdrop-blur-xl",
      )}
    >
      <div className="container-luxe flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logoAsset.url}
            alt="Wow Factor"
            width={40}
            height={40}
            className="h-10 w-10 rounded-sm object-cover"
          />
          <span className={cn("font-display text-xl font-bold uppercase tracking-[0.2em]", transparent && "text-white")}>
            Wow<span className="text-gold">Factor</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "relative text-sm font-medium tracking-wide transition-colors hover:text-gold",
                transparent ? "text-white/90" : "text-foreground",
                "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full",
              )}
              activeProps={{ className: "text-gold after:w-full" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={cn("flex items-center gap-1", transparent && "text-white")}>
          <Button variant="ghost" size="icon" aria-label="Pesquisar" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Alternar tema" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link to="/conta">
            <Button variant="ghost" size="icon" aria-label="Conta"><User className="h-5 w-5" /></Button>
          </Link>
          <Link to="/favoritos" className="relative">
            <Button variant="ghost" size="icon" aria-label="Favoritos"><Heart className="h-5 w-5" /></Button>
            {wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-secondary">{wishCount}</span>
            )}
          </Link>
          <Link to="/carrinho" className="relative">
            <Button variant="ghost" size="icon" aria-label="Carrinho"><ShoppingBag className="h-5 w-5" /></Button>
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-secondary">{cartCount}</span>
            )}
          </Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-secondary text-secondary-foreground">
              <div className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="py-3 text-lg font-display border-b border-white/10">
                    {l.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute inset-x-0 top-0 z-50 bg-background/95 p-4 shadow-xl backdrop-blur-xl">
          <div className="container-luxe flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="O que procura?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) {
                  setSearchOpen(false);
                  navigate({ to: "/produto/$slug", params: { slug: results[0].slug } });
                }
              }}
              className="border-0 bg-transparent text-lg shadow-none focus-visible:ring-0"
            />
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} aria-label="Fechar"><X className="h-5 w-5" /></Button>
          </div>
          {results.length > 0 && (
            <div className="container-luxe mt-4 grid gap-2">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to="/produto/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                >
                  <img src={p.image} alt={p.name} width={48} height={48} loading="lazy" className="h-12 w-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.collection}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}