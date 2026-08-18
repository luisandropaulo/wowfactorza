import { useMemo, useState } from "react";
import { type Product, formatPrice } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Único"];
const ALL_COLORS = ["#FFFFFF", "#111827", "#7B4FC0", "#A9605C", "#3A3A3A", "#D4AF37"];
const PAGE_SIZE = 9;

export function ProductGrid({ items, title, subtitle }: { items: Product[]; title?: string; subtitle?: string }) {
  const [sort, setSort] = useState("recent");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 100000]);
  const [page, setPage] = useState(1);

  const allCollections = useMemo(() => Array.from(new Set(items.map((i) => i.collection))), [items]);

  const filtered = useMemo(() => {
    let r = items.filter((p) => {
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c))) return false;
      if (collections.length && !collections.includes(p.collection)) return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      return true;
    });
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "best") r = [...r].sort((a, b) => b.reviews - a.reviews);
    return r;
  }, [items, sort, sizes, colors, collections, price]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(0, page * PAGE_SIZE);

  const Filters = (
    <div className="space-y-8">
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest">Coleção</h4>
        <div className="space-y-2">
          {allCollections.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={collections.includes(c)} onCheckedChange={(v) => setCollections((s) => v ? [...s, c] : s.filter((x) => x !== c))} /> {c}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest">Tamanho</h4>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSizes((arr) => arr.includes(s) ? arr.filter((x) => x !== s) : [...arr, s])}
              className={`min-w-9 border px-2 py-1 text-xs ${sizes.includes(s) ? "border-foreground bg-foreground text-background" : "border-border"}`}
            >{s}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest">Cor</h4>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <button
              key={c}
              aria-label={`Cor ${c}`}
              onClick={() => setColors((arr) => arr.includes(c) ? arr.filter((x) => x !== c) : [...arr, c])}
              style={{ backgroundColor: c }}
              className={`h-7 w-7 rounded-full border-2 ${colors.includes(c) ? "border-gold" : "border-border"}`}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest">Preço</h4>
        <Slider min={0} max={100000} step={1000} value={price} onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])} />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(price[0])}</span>
          <span>{formatPrice(price[1])}</span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={() => { setSizes([]); setColors([]); setCollections([]); setPrice([0, 100000]); }}>
        Limpar filtros
      </Button>
    </div>
  );

  return (
    <div className="container-luxe py-10">
      {title && (
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="mb-6 flex items-center justify-between gap-4 border-y border-border py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filtros</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetTitle className="mb-6">Filtros</SheetTitle>
            {Filters}
          </SheetContent>
        </Sheet>
        <p className="text-sm text-muted-foreground">{filtered.length} produtos</p>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Mais recentes</SelectItem>
            <SelectItem value="best">Mais vendidos</SelectItem>
            <SelectItem value="low">Menor preço</SelectItem>
            <SelectItem value="high">Maior preço</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>
        <div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
            {visible.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          {page < pageCount && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" onClick={() => setPage((p) => p + 1)}>Carregar mais</Button>
              <p className="mt-3 text-xs text-muted-foreground">Página {page} de {pageCount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}