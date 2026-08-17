import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Footer() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl">Ubuntu<span className="text-gold">Wear</span></h3>
          <p className="mt-4 text-sm text-white/70">
            Moda africana contemporânea — orgulho, elegância e autenticidade em cada peça.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-white/20 p-2 transition hover:border-gold hover:text-gold"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-white/20 p-2 transition hover:border-gold hover:text-gold"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="rounded-full border border-white/20 p-2 transition hover:border-gold hover:text-gold"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Empresa</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/sobre" className="hover:text-gold">Sobre nós</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Blog</Link></li>
            <li><Link to="/contacto" className="hover:text-gold">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Ajuda</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/contacto" className="hover:text-gold">Trocas & devoluções</Link></li>
            <li><Link to="/contacto" className="hover:text-gold">Envios</Link></li>
            <li><Link to="/contacto" className="hover:text-gold">FAQ</Link></li>
            <li><Link to="/admin" className="hover:text-gold">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Contacto</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +244 923 000 000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> hello@wowfactor.com</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold" /> Rua da Missão, Luanda, Angola</li>
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const email = String(fd.get("email") || "");
              if (email) {
                toast.success("Subscrição confirmada!", { description: "Obrigado por se juntar à família Wow Factor." });
                (e.currentTarget as HTMLFormElement).reset();
              }
            }}
            className="mt-4 flex gap-2"
          >
            <Input name="email" type="email" required placeholder="O seu email" className="bg-white/5 border-white/20 text-white placeholder:text-white/50" />
            <Button type="submit" variant="default">OK</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Wow Factor · Vista a cultura. Expresse a identidade.
      </div>
    </footer>
  );
}