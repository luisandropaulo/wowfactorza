import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAdmin } from "@/stores/admin";
import { useOrders, orderStatusLabels, type OrderStatus } from "@/stores/orders";
import { type Product, type Category, categoryLabels, formatPrice, collectionsList } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, ExternalLink, RotateCcw, Save, ShieldAlert, Package, Settings as SettingsIcon, FileText, CreditCard, Image as ImageIcon, Receipt, Landmark } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Wow Factor" },
      { name: "description", content: "Painel de gestão de conteúdos Wow Factor." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="container-luxe flex items-center justify-between py-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Painel administrativo</p>
            <h1 className="font-display text-3xl">Gestão Wow Factor</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/"><Button variant="outline" size="sm"><ExternalLink className="h-4 w-4" /> Ver loja</Button></Link>
          </div>
        </div>
      </header>

      <div className="container-luxe py-8">
        <div className="mb-6 flex items-start gap-3 rounded-sm border border-gold/30 bg-gold/5 p-4 text-sm">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-muted-foreground">
            Esta área é uma demonstração funcional. As alterações são guardadas no navegador (localStorage) e refletem imediatamente em toda a loja. Para sincronização multi-utilizador, backups e produção real, ative o backend (Lovable Cloud).
          </p>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="orders"><Receipt className="h-4 w-4" /> Pedidos</TabsTrigger>
            <TabsTrigger value="products"><Package className="h-4 w-4" /> Produtos</TabsTrigger>
            <TabsTrigger value="content"><FileText className="h-4 w-4" /> Conteúdos</TabsTrigger>
            <TabsTrigger value="payments"><CreditCard className="h-4 w-4" /> Pagamentos</TabsTrigger>
            <TabsTrigger value="settings"><SettingsIcon className="h-4 w-4" /> Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="orders"><OrdersTab /></TabsContent>
          <TabsContent value="products"><ProductsTab /></TabsContent>
          <TabsContent value="content"><ContentTab /></TabsContent>
          <TabsContent value="payments"><PaymentsTab /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ---------------- PRODUCTS ---------------- */

function OrdersTab() {
  const { orders, setStatus, setNote, removeOrder } = useOrders();
  const [filter, setFilter] = useState<string>("all");
  const list = orders.filter((o) => filter === "all" || o.status === filter);
  const pending = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Pedidos</h2>
          <p className="text-sm text-muted-foreground">
            {orders.length} pedido(s) · {pending} a aguardar validação de pagamento.
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-56"><SelectValue placeholder="Estado" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os estados</SelectItem>
            {(Object.keys(orderStatusLabels) as OrderStatus[]).map((s) => (
              <SelectItem key={s} value={s}>{orderStatusLabels[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        {list.map((o) => (
          <div key={o.id} className="space-y-3 rounded-sm border border-border bg-background p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 font-display text-lg">
                  #{o.id}
                  <Badge variant={o.status === "pending" ? "destructive" : "secondary"}>{orderStatusLabels[o.status]}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(o.createdAt).toLocaleString("pt-PT")} · {o.customer.name} · {o.customer.email} · {o.customer.phone}
                </p>
                <p className="text-sm text-muted-foreground">{o.customer.address}, {o.customer.city}, {o.customer.province}, {o.customer.country}</p>
                <p className="text-sm text-muted-foreground">{o.shippingMethod}{o.proofRef ? ` · Comprovativo: ${o.proofRef}` : ""}</p>
              </div>
              <p className="font-display text-xl text-gold">{formatPrice(o.total)}</p>
            </div>

            <ul className="space-y-1 border-t border-border pt-3 text-sm text-muted-foreground">
              {o.items.map((i) => (
                <li key={i.id + i.size + i.color}>{i.quantity}× {i.name} ({i.size}) — {formatPrice(i.price * i.quantity)}</li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
              <Select value={o.status} onValueChange={(v) => { setStatus(o.id, v as OrderStatus); toast.success("Estado atualizado"); }}>
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(orderStatusLabels) as OrderStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>{orderStatusLabels[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {o.status === "pending" && (
                <Button size="sm" onClick={() => { setStatus(o.id, "paid"); toast.success("Pagamento validado"); }}>Validar pagamento</Button>
              )}
              <Input
                className="max-w-xs"
                placeholder="Nota interna…"
                defaultValue={o.note ?? ""}
                onBlur={(e) => setNote(o.id, e.target.value)}
              />
              <Button variant="ghost" size="icon" onClick={() => { if (confirm(`Eliminar pedido #${o.id}?`)) { removeOrder(o.id); toast.success("Pedido eliminado"); } }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="rounded-sm border border-dashed border-border p-10 text-center text-muted-foreground">Sem pedidos para mostrar.</p>
        )}
      </div>
    </div>
  );
}

function emptyProduct(): Product {
  return {
    id: `WF-${Date.now()}`,
    slug: `novo-produto-${Date.now()}`,
    name: "Novo Produto",
    category: "feminino",
    collection: collectionsList[0],
    price: 10000,
    rating: 5,
    reviews: 0,
    colors: ["#000000"],
    sizes: ["S", "M", "L"],
    stock: 10,
    image: "https://placehold.co/800x1000/png?text=Produto",
    gallery: ["https://placehold.co/800x1000/png?text=Produto"],
    description: "",
    isNew: true,
    isBestseller: false,
    tags: [],
  };
}

function ProductsTab() {
  const { products, upsertProduct, deleteProduct } = useAdmin();
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = products.filter((p) => {
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase());
    const matchC = filterCat === "all" || p.category === filterCat;
    return matchQ && matchC;
  });

  const openNew = () => { setEditing(emptyProduct()); setOpen(true); };
  const openEdit = (p: Product) => { setEditing({ ...p }); setOpen(true); };

  const onSave = (p: Product) => {
    upsertProduct(p);
    setOpen(false);
    toast.success("Produto guardado");
  };

  const onDelete = (p: Product) => {
    if (confirm(`Eliminar "${p.name}"?`)) {
      deleteProduct(p.id);
      toast.success("Produto eliminado");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-60">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquisar produtos…" className="pl-9" />
        </div>
        <Select value={filterCat} onValueChange={setFilterCat}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Categoria" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {(Object.keys(categoryLabels) as Category[]).map((c) => (
              <SelectItem key={c} value={c}>{categoryLabels[c]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Novo produto</Button>
      </div>

      <div className="overflow-hidden rounded-sm border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="p-3">Produto</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Coleção</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-12 w-12 rounded-sm object-cover" />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">{categoryLabels[p.category]}</td>
                <td className="p-3 text-muted-foreground">{p.collection}</td>
                <td className="p-3 font-medium">{formatPrice(p.price)}</td>
                <td className="p-3">
                  <Badge variant={p.stock > 0 ? "secondary" : "destructive"}>{p.stock}</Badge>
                </td>
                <td className="p-3 text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(p)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Nenhum produto encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader><DialogTitle>{editing && products.find(p => p.id === editing.id) ? "Editar produto" : "Novo produto"}</DialogTitle></DialogHeader>
          {editing && <ProductForm product={editing} onChange={setEditing} onSave={onSave} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductForm({ product, onChange, onSave }: { product: Product; onChange: (p: Product) => void; onSave: (p: Product) => void }) {
  const update = <K extends keyof Product>(k: K, v: Product[K]) => onChange({ ...product, [k]: v });

  const handleImage = async (file: File, mode: "main" | "gallery") => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      if (mode === "main") onChange({ ...product, image: url, gallery: [url, ...product.gallery.filter((g) => g !== product.image)] });
      else onChange({ ...product, gallery: [...product.gallery, url] });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nome"><Input value={product.name} onChange={(e) => update("name", e.target.value)} /></Field>
        <Field label="Slug (URL)"><Input value={product.slug} onChange={(e) => update("slug", e.target.value)} /></Field>
        <Field label="Categoria">
          <Select value={product.category} onValueChange={(v) => update("category", v as Category)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {(Object.keys(categoryLabels) as Category[]).map((c) => (
                <SelectItem key={c} value={c}>{categoryLabels[c]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Coleção">
          <Select value={product.collection} onValueChange={(v) => update("collection", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {collectionsList.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Preço (AOA)"><Input type="number" value={product.price} onChange={(e) => update("price", Number(e.target.value))} /></Field>
        <Field label="Stock"><Input type="number" value={product.stock} onChange={(e) => update("stock", Number(e.target.value))} /></Field>
        <Field label="Tamanhos (vírgulas)"><Input value={product.sizes.join(",")} onChange={(e) => update("sizes", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} /></Field>
        <Field label="Cores hex (vírgulas)"><Input value={product.colors.join(",")} onChange={(e) => update("colors", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} /></Field>
      </div>

      <Field label="Descrição"><Textarea rows={4} value={product.description} onChange={(e) => update("description", e.target.value)} /></Field>

      <div className="space-y-2">
        <Label>Imagens</Label>
        <div className="flex flex-wrap gap-3">
          {product.gallery.map((g, i) => (
            <div key={i} className="group relative">
              <img src={g} alt="" className="h-24 w-24 rounded-sm object-cover" />
              {g === product.image && <Badge className="absolute left-1 top-1 text-[9px]">Principal</Badge>}
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                {g !== product.image && (
                  <Button size="sm" variant="secondary" onClick={() => onChange({ ...product, image: g })}>Principal</Button>
                )}
                <Button size="icon" variant="destructive" onClick={() => {
                  const next = product.gallery.filter((_, j) => j !== i);
                  onChange({ ...product, gallery: next.length ? next : [product.image], image: g === product.image ? (next[0] ?? product.image) : product.image });
                }}><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          ))}
          <label className="grid h-24 w-24 cursor-pointer place-items-center rounded-sm border-2 border-dashed border-border text-muted-foreground hover:border-foreground">
            <ImageIcon className="h-5 w-5" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0], "gallery")} />
          </label>
        </div>
        <p className="text-xs text-muted-foreground">Ou cole um URL de imagem em "Imagem principal" abaixo.</p>
        <Field label="URL da imagem principal"><Input value={product.image} onChange={(e) => update("image", e.target.value)} /></Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center justify-between rounded-sm border border-border p-3">
          <Label htmlFor="isnew">Novidade</Label>
          <Switch id="isnew" checked={!!product.isNew} onCheckedChange={(v) => update("isNew", v)} />
        </div>
        <div className="flex items-center justify-between rounded-sm border border-border p-3">
          <Label htmlFor="isbest">Bestseller</Label>
          <Switch id="isbest" checked={!!product.isBestseller} onCheckedChange={(v) => update("isBestseller", v)} />
        </div>
      </div>

      <DialogFooter>
        <Button onClick={() => onSave(product)}><Save className="h-4 w-4" /> Guardar produto</Button>
      </DialogFooter>
    </div>
  );
}

/* ---------------- CONTENT ---------------- */

function ContentTab() {
  const { settings, updateSettings } = useAdmin();
  const [draft, setDraft] = useState(settings);

  return (
    <div className="space-y-6 rounded-sm border border-border bg-background p-6">
      <div>
        <h2 className="font-display text-2xl">Conteúdos do site</h2>
        <p className="text-sm text-muted-foreground">Edite os textos principais da loja.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Hero — Título"><Input value={draft.heroTitle} onChange={(e) => setDraft({ ...draft, heroTitle: e.target.value })} /></Field>
        <Field label="Hero — CTA"><Input value={draft.heroCta} onChange={(e) => setDraft({ ...draft, heroCta: e.target.value })} /></Field>
        <Field label="Hero — Subtítulo" className="md:col-span-2"><Textarea rows={3} value={draft.heroSubtitle} onChange={(e) => setDraft({ ...draft, heroSubtitle: e.target.value })} /></Field>
        <Field label="Tagline" className="md:col-span-2"><Input value={draft.tagline} onChange={(e) => setDraft({ ...draft, tagline: e.target.value })} /></Field>
        <Field label="Sobre nós — Resumo" className="md:col-span-2"><Textarea rows={4} value={draft.aboutShort} onChange={(e) => setDraft({ ...draft, aboutShort: e.target.value })} /></Field>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => { updateSettings(draft); toast.success("Conteúdos atualizados"); }}><Save className="h-4 w-4" /> Guardar</Button>
        <Button variant="outline" onClick={() => setDraft(settings)}>Cancelar</Button>
      </div>
    </div>
  );
}

/* ---------------- PAYMENTS ---------------- */

function PaymentsTab() {
  const { payments, togglePayment, upsertPayment, deletePayment } = useAdmin();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ id: "", name: "", description: "", enabled: true });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl">Métodos de pagamento</h2>
          <p className="text-sm text-muted-foreground">Ative, desative ou adicione métodos disponíveis no checkout.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4" /> Novo método</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Novo método de pagamento</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Field label="ID (sem espaços)"><Input value={draft.id} onChange={(e) => setDraft({ ...draft, id: e.target.value.toLowerCase().replace(/\s+/g, "-") })} /></Field>
              <Field label="Nome"><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
              <Field label="Descrição"><Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></Field>
            </div>
            <DialogFooter>
              <Button onClick={() => {
                if (!draft.id || !draft.name) return toast.error("ID e nome obrigatórios");
                upsertPayment(draft);
                toast.success("Método criado");
                setOpen(false);
                setDraft({ id: "", name: "", description: "", enabled: true });
              }}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {payments.map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-sm border border-border bg-background p-4">
            <div>
              <p className="font-medium">{m.name} <span className="ml-2 text-xs text-muted-foreground">#{m.id}</span></p>
              <p className="text-sm text-muted-foreground">{m.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={m.enabled} onCheckedChange={() => togglePayment(m.id)} />
              <Button variant="ghost" size="icon" onClick={() => { if (confirm(`Eliminar ${m.name}?`)) { deletePayment(m.id); toast.success("Removido"); } }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SETTINGS ---------------- */

function SettingsTab() {
  const { settings, updateSettings, resetAll, bankAccounts, upsertBankAccount, deleteBankAccount } = useAdmin();
  const [draft, setDraft] = useState(settings);

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-sm border border-border bg-background p-6">
        <h2 className="font-display text-2xl">Marca e contactos</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nome da marca"><Input value={draft.brandName} onChange={(e) => setDraft({ ...draft, brandName: e.target.value })} /></Field>
          <Field label="Moeda"><Input value={draft.currency} onChange={(e) => setDraft({ ...draft, currency: e.target.value })} /></Field>
          <Field label="Email"><Input value={draft.contactEmail} onChange={(e) => setDraft({ ...draft, contactEmail: e.target.value })} /></Field>
          <Field label="Telefone"><Input value={draft.contactPhone} onChange={(e) => setDraft({ ...draft, contactPhone: e.target.value })} /></Field>
          <Field label="WhatsApp"><Input value={draft.whatsapp} onChange={(e) => setDraft({ ...draft, whatsapp: e.target.value })} /></Field>
          <Field label="Endereço"><Input value={draft.contactAddress} onChange={(e) => setDraft({ ...draft, contactAddress: e.target.value })} /></Field>
          <Field label="Instagram"><Input value={draft.instagram} onChange={(e) => setDraft({ ...draft, instagram: e.target.value })} /></Field>
          <Field label="Facebook"><Input value={draft.facebook} onChange={(e) => setDraft({ ...draft, facebook: e.target.value })} /></Field>
        </div>
      </div>

      <div className="space-y-4 rounded-sm border border-border bg-background p-6">
        <h2 className="font-display text-2xl">Envios</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Envio grátis acima de (AOA)"><Input type="number" value={draft.freeShippingThreshold} onChange={(e) => setDraft({ ...draft, freeShippingThreshold: Number(e.target.value) })} /></Field>
          <Field label="Taxa fixa de envio (AOA)"><Input type="number" value={draft.shippingFlatRate} onChange={(e) => setDraft({ ...draft, shippingFlatRate: Number(e.target.value) })} /></Field>
        </div>
      </div>

      <div className="space-y-4 rounded-sm border border-border bg-background p-6">
        <h2 className="flex items-center gap-2 font-display text-2xl"><Landmark className="h-5 w-5 text-gold" /> Coordenadas bancárias</h2>
        <p className="text-sm text-muted-foreground">Contas apresentadas ao cliente no checkout para pagamento por transferência.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Email para comprovativos" className="md:col-span-2"><Input value={draft.proofEmail} onChange={(e) => setDraft({ ...draft, proofEmail: e.target.value })} /></Field>
          <Field label="Instruções de pagamento" className="md:col-span-2"><Textarea rows={4} value={draft.paymentInstructions} onChange={(e) => setDraft({ ...draft, paymentInstructions: e.target.value })} /></Field>
        </div>
        <div className="space-y-4">
          {bankAccounts.map((b) => (
            <div key={b.id} className="grid gap-3 rounded-sm border border-border p-4 md:grid-cols-2">
              <Field label="Banco"><Input value={b.bank} onChange={(e) => upsertBankAccount({ ...b, bank: e.target.value })} /></Field>
              <Field label="Titular"><Input value={b.holder} onChange={(e) => upsertBankAccount({ ...b, holder: e.target.value })} /></Field>
              <Field label="Nº de conta"><Input value={b.accountNumber} onChange={(e) => upsertBankAccount({ ...b, accountNumber: e.target.value })} /></Field>
              <Field label="IBAN"><Input value={b.iban} onChange={(e) => upsertBankAccount({ ...b, iban: e.target.value })} /></Field>
              <Field label="Moeda"><Input value={b.currency} onChange={(e) => upsertBankAccount({ ...b, currency: e.target.value })} /></Field>
              <div className="flex items-end">
                <Button variant="ghost" size="sm" onClick={() => { if (confirm(`Eliminar conta ${b.bank}?`)) { deleteBankAccount(b.id); toast.success("Conta removida"); } }}>
                  <Trash2 className="h-4 w-4 text-destructive" /> Remover
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => upsertBankAccount({ id: `bank-${Date.now()}`, bank: "Novo banco", holder: settings.brandName, iban: "", accountNumber: "", currency: settings.currency })}>
            <Plus className="h-4 w-4" /> Adicionar conta bancária
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => { updateSettings(draft); toast.success("Configurações guardadas"); }}><Save className="h-4 w-4" /> Guardar tudo</Button>
        <Button variant="outline" onClick={() => setDraft(settings)}>Cancelar</Button>
        <Button variant="destructive" onClick={() => {
          if (confirm("Repor todos os dados (produtos, conteúdos, pagamentos) para os valores originais?")) {
            resetAll();
            setDraft(useAdmin.getState().settings);
            toast.success("Reposto para os valores originais");
          }
        }}><RotateCcw className="h-4 w-4" /> Repor tudo</Button>
      </div>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}