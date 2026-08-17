import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/stores/shop";
import { useOrders, orderStatusLabels } from "@/stores/orders";
import { useBankAccounts, useSettings } from "@/stores/admin";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect } from "react";

export const Route = createFileRoute("/conta")({
  head: () => ({ meta: [{ title: "Minha conta — Wow Factor" }, { name: "description", content: "Gerir os seus dados, pedidos e endereços." }] }),
  component: Account,
});

function Account() {
  const { user, logout } = useAuth();
  const orders = useOrders((s) => s.orders);
  const banks = useBankAccounts();
  const settings = useSettings();
  const navigate = useNavigate();
  useEffect(() => { if (!user) navigate({ to: "/login" }); }, [user, navigate]);
  if (!user) return null;
  const myOrders = orders.filter((o) => !o.customer.email || o.customer.email.toLowerCase() === user.email.toLowerCase());

  return (
    <div className="container-luxe py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl">Olá, {user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" onClick={() => { logout(); navigate({ to: "/" }); }}>Sair</Button>
      </div>
      <Tabs defaultValue="orders" className="mt-10">
        <TabsList className="flex-wrap">
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="wishlist">Favoritos</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="pt-6">
          {myOrders.length === 0 ? (
            <div className="rounded-sm border border-border p-6 text-sm text-muted-foreground">Ainda não tem pedidos. <Link to="/colecoes" className="text-gold underline-offset-4 hover:underline">Comece a comprar</Link>.</div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((o) => (
                <div key={o.id} className="rounded-sm border border-border p-6 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-lg">#{o.id}</p>
                    <span className="rounded-full border border-gold px-3 py-1 text-xs text-gold">{orderStatusLabels[o.status]}</span>
                  </div>
                  <p className="mt-1 text-muted-foreground">{new Date(o.createdAt).toLocaleString("pt-PT")} · {o.shippingMethod}</p>
                  <ul className="mt-3 space-y-1 text-muted-foreground">
                    {o.items.map((i) => <li key={i.id + i.size + i.color}>{i.quantity}× {i.name} ({i.size})</li>)}
                  </ul>
                  <p className="mt-3 font-semibold">Total: {formatPrice(o.total)}</p>
                  {o.status === "pending" && (
                    <div className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
                      <p>Aguarda pagamento. Transfira usando a referência <strong>#{o.id}</strong> e envie o comprovativo para {settings.proofEmail}.</p>
                      {banks.map((b) => <p key={b.id} className="mt-1 font-mono">{b.bank} · {b.iban}</p>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="profile" className="pt-6 text-sm">Nome: {user.name}<br />Email: {user.email}</TabsContent>
        <TabsContent value="addresses" className="pt-6 text-sm text-muted-foreground">Nenhum endereço guardado.</TabsContent>
        <TabsContent value="payments" className="pt-6 text-sm text-muted-foreground">
          Os pagamentos são feitos por transferência bancária. Coordenadas disponíveis no checkout e em cada pedido pendente.
        </TabsContent>
        <TabsContent value="wishlist" className="pt-6"><Link to="/favoritos" className="text-gold underline-offset-4 hover:underline">Ver favoritos</Link></TabsContent>
      </Tabs>
    </div>
  );
}