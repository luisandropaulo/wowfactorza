import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/stores/shop";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Ubuntu Wear" }, { name: "description", content: "Finalize o seu pedido com segurança." }] }),
  component: Checkout,
});

const steps = ["Dados", "Endereço", "Entrega", "Pagamento", "Confirmação"];

function Checkout() {
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("multicaixa");
  const { items, subtotal, shipping, discount, total, clear } = useCart();
  const navigate = useNavigate();

  if (items.length === 0 && step < 4) {
    return <div className="container-luxe py-24 text-center"><h1 className="font-display text-3xl">Carrinho vazio</h1><Link to="/colecoes" className="mt-4 inline-block"><Button>Ver coleções</Button></Link></div>;
  }

  return (
    <div className="container-luxe py-12">
      <h1 className="font-display text-4xl">Checkout</h1>
      <ol className="my-8 flex flex-wrap gap-2 text-xs uppercase tracking-widest">
        {steps.map((s, i) => (
          <li key={s} className={`flex items-center gap-2 ${i === step ? "text-gold" : i < step ? "text-foreground" : "text-muted-foreground"}`}>
            <span className="grid h-6 w-6 place-items-center rounded-full border border-current">{i < step ? <Check className="h-3 w-3" /> : i + 1}</span>
            {s}{i < steps.length - 1 && <span className="mx-2">›</span>}
          </li>
        ))}
      </ol>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 3) setStep(step + 1);
            else if (step === 3) {
              setStep(4);
              clear();
              toast.success("Pedido confirmado!", { description: "Receberá um email com os detalhes." });
            } else navigate({ to: "/conta" });
          }}
          className="space-y-6"
        >
          {step === 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label>Nome</Label><Input required /></div>
              <div><Label>Apelido</Label><Input required /></div>
              <div><Label>Email</Label><Input type="email" required /></div>
              <div><Label>Telefone</Label><Input required /></div>
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2"><Label>Morada</Label><Input required /></div>
              <div><Label>Cidade</Label><Input required defaultValue="Luanda" /></div>
              <div><Label>Província</Label><Input required defaultValue="Luanda" /></div>
              <div><Label>Código postal</Label><Input /></div>
              <div><Label>País</Label><Input required defaultValue="Angola" /></div>
            </div>
          )}
          {step === 2 && (
            <RadioGroup defaultValue="standard" className="space-y-3">
              {[
                { v: "standard", t: "Entrega padrão (3-5 dias)", p: "2 500 AOA" },
                { v: "express", t: "Expressa (24-48h)", p: "6 500 AOA" },
                { v: "pickup", t: "Levantamento em loja Luanda", p: "Grátis" },
              ].map((o) => (
                <label key={o.v} className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-gold">
                  <RadioGroupItem value={o.v} /><div className="flex-1">{o.t}</div><span className="text-sm font-semibold">{o.p}</span>
                </label>
              ))}
            </RadioGroup>
          )}
          {step === 3 && (
            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
              {[
                { v: "multicaixa", t: "Multicaixa Express" },
                { v: "stripe", t: "Cartão (Stripe)" },
                { v: "paypal", t: "PayPal" },
                { v: "ref", t: "Referência Bancária" },
                { v: "tef", t: "Transferência Bancária" },
              ].map((o) => (
                <label key={o.v} className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-gold">
                  <RadioGroupItem value={o.v} /><div className="flex-1">{o.t}</div>
                </label>
              ))}
            </RadioGroup>
          )}
          {step === 4 && (
            <div className="rounded-sm border border-gold bg-gold/10 p-8 text-center">
              <Check className="mx-auto h-12 w-12 text-gold" />
              <h2 className="mt-4 font-display text-3xl">Obrigado pela sua compra!</h2>
              <p className="mt-2 text-muted-foreground">O seu pedido foi recebido com sucesso.</p>
            </div>
          )}
          <div className="flex gap-3">
            {step > 0 && step < 4 && <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>Voltar</Button>}
            <Button type="submit" size="lg">{step < 3 ? "Continuar" : step === 3 ? "Confirmar pedido" : "Ir para minha conta"}</Button>
          </div>
        </form>
        <aside className="h-fit space-y-3 border border-border bg-card p-6 text-sm">
          <h2 className="font-display text-xl">Resumo</h2>
          {items.map((i) => (
            <div key={i.id + i.size + i.color} className="flex justify-between text-xs">
              <span>{i.name} × {i.quantity}</span><span>{formatPrice(i.price * i.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal())}</span></div>
            <div className="flex justify-between"><span>Envio</span><span>{formatPrice(shipping())}</span></div>
            {discount() > 0 && <div className="flex justify-between text-gold"><span>Desconto</span><span>-{formatPrice(discount())}</span></div>}
            <div className="flex justify-between border-t border-border pt-2 text-lg font-semibold"><span>Total</span><span>{formatPrice(total() || 0)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}