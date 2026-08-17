import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/stores/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Wow Factor" }, { name: "description", content: "Entre na sua conta Wow Factor." }] }),
  component: Login,
});

function Login() {
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();
  const [recovery, setRecovery] = useState(false);

  return (
    <div className="container-luxe max-w-md py-16">
      <h1 className="mb-8 text-center font-display text-4xl">Conta</h1>
      {recovery ? (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Email de recuperação enviado!"); setRecovery(false); }}>
          <div><Label>Email</Label><Input type="email" required /></div>
          <Button type="submit" className="w-full">Enviar instruções</Button>
          <button type="button" onClick={() => setRecovery(false)} className="block w-full text-xs text-muted-foreground hover:underline">Voltar ao login</button>
        </form>
      ) : (
        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2 w-full"><TabsTrigger value="login">Entrar</TabsTrigger><TabsTrigger value="register">Registar</TabsTrigger></TabsList>
          <TabsContent value="login" className="space-y-4 pt-4">
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              login(String(fd.get("email")));
              toast.success("Bem-vindo de volta!");
              navigate({ to: "/conta" });
            }}>
              <div><Label>Email</Label><Input name="email" type="email" required /></div>
              <div><Label>Palavra-passe</Label><Input name="password" type="password" required /></div>
              <Button type="submit" className="w-full">Entrar</Button>
              <button type="button" onClick={() => setRecovery(true)} className="block w-full text-xs text-muted-foreground hover:underline">Esqueceu a palavra-passe?</button>
            </form>
          </TabsContent>
          <TabsContent value="register" className="space-y-4 pt-4">
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              login(String(fd.get("email")), String(fd.get("name")));
              toast.success("Conta criada!");
              navigate({ to: "/conta" });
            }}>
              <div><Label>Nome completo</Label><Input name="name" required /></div>
              <div><Label>Email</Label><Input name="email" type="email" required /></div>
              <div><Label>Palavra-passe</Label><Input name="password" type="password" required minLength={6} /></div>
              <Button type="submit" className="w-full">Criar conta</Button>
            </form>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}