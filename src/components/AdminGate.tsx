import { useEffect, useState, type ReactNode } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/stores/admin";
import logoAsset from "@/assets/wow-factor-logo.jpg.asset.json";

const SESSION_KEY = "wf-admin-session";

export function AdminGate({ children }: { children: ReactNode }) {
  const pin = useAdmin((s) => s.settings.adminPin);
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1");
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!unlocked) {
    return (
      <div className="grid min-h-screen place-items-center bg-secondary px-4 text-secondary-foreground">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value === pin) {
              sessionStorage.setItem(SESSION_KEY, "1");
              setUnlocked(true);
            } else {
              setError("Código incorreto.");
            }
          }}
          className="w-full max-w-sm space-y-5 rounded-sm border border-white/10 bg-background p-8 text-foreground shadow-elegant"
        >
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="" width={40} height={40} className="h-10 w-10 rounded-sm object-cover" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Área privada</p>
              <h1 className="font-display text-2xl">Gestão da loja</h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Acesso reservado ao gestor de vendas.</p>
          <div className="space-y-2">
            <Label htmlFor="admin-pin">Código de acesso</Label>
            <Input id="admin-pin" type="password" autoFocus value={value} onChange={(e) => { setValue(e.target.value); setError(""); }} />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button type="submit" className="w-full"><Lock className="h-4 w-4" /> Entrar</Button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}

export function adminLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.reload();
}
