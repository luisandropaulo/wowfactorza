import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Wow Factor" },
      { name: "description", content: "Fale connosco. Estamos sempre disponíveis." },
      { property: "og:title", content: "Contacto — Wow Factor" },
      { property: "og:description", content: "Fale connosco." },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: () => (
    <div className="container-luxe py-12">
      <h1 className="text-center font-display text-5xl">Contacto</h1>
      <p className="mt-3 text-center text-muted-foreground">Estamos prontos a ajudar.</p>
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          toast.success("Mensagem enviada!", { description: "Responderemos em até 24h." });
          (e.currentTarget as HTMLFormElement).reset();
        }}>
          <div className="grid gap-4 md:grid-cols-2">
            <div><Label>Nome</Label><Input required /></div>
            <div><Label>Email</Label><Input type="email" required /></div>
          </div>
          <div><Label>Assunto</Label><Input required /></div>
          <div><Label>Mensagem</Label><Textarea required rows={6} /></div>
          <Button type="submit" size="lg">Enviar mensagem</Button>
        </form>
        <div className="space-y-6">
          <div className="space-y-4 border border-border bg-card p-6">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold" /> +244 923 000 000</div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-gold" /> hello@wowfactor.com</div>
            <div className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-0.5 text-gold" /> Rua da Missão, Luanda, Angola</div>
            <a href="https://wa.me/244923000000" target="_blank" rel="noopener" className="inline-block"><Button variant="outline">WhatsApp directo</Button></a>
          </div>
          <div className="aspect-video overflow-hidden border border-border">
            <iframe title="Mapa" src="https://www.openstreetmap.org/export/embed.html?bbox=13.22%2C-8.84%2C13.26%2C-8.81&layer=mapnik" className="h-full w-full" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  ),
});