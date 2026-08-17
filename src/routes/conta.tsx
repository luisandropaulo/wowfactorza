import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/stores/shop";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect } from "react";

export const Route = createFileRoute("/conta")({
  head: () => ({ meta: [{ title: "Minha conta — Wow Factor" }, { name: "description", content: "Gerir os seus dados, pedidos e endereços." }] }),
  component: Account,
});

function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!user) navigate({ to: "/login" }); }, [user, navigate]);
  if (!user) return null;

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
          <div className="rounded-sm border border-border p-6 text-sm text-muted-foreground">Ainda não tem pedidos. <Link to="/colecoes" className="text-gold underline-offset-4 hover:underline">Comece a comprar</Link>.</div>
        </TabsContent>
        <TabsContent value="profile" className="pt-6 text-sm">Nome: {user.name}<br />Email: {user.email}</TabsContent>
        <TabsContent value="addresses" className="pt-6 text-sm text-muted-foreground">Nenhum endereço guardado.</TabsContent>
        <TabsContent value="payments" className="pt-6 text-sm text-muted-foreground">Nenhum método de pagamento guardado.</TabsContent>
        <TabsContent value="wishlist" className="pt-6"><Link to="/favoritos" className="text-gold underline-offset-4 hover:underline">Ver favoritos</Link></TabsContent>
      </Tabs>
    </div>
  );
}