import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/stores/shop";
import { useSettings, useBankAccounts } from "@/stores/admin";
import { useOrders, newOrderId, type Order } from "@/stores/orders";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Copy, Landmark } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Wow Factor" },
      { name: "description", content: "Finalize o seu pedido e pague por transferência bancária. Validação manual pelo gestor de vendas." },
      { property: "og:title", content: "Checkout — Wow Factor" },
      { property: "og:description", content: "Finalize o seu pedido Wow Factor com pagamento por transferência bancária." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const steps = ["Dados", "Endereço", "Entrega", "Pagamento", "Confirmação"];

const shippingOptions = [
  { v: "standard", t: "Entrega padrão (3-5 dias)", p: "2 500 AOA" },
  { v: "express", t: "Expressa (24-48h)", p: "6 500 AOA" },
];

function Checkout() {
  const [step, setStep] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [form, setForm] = useState({
    name: "", surname: "", email: "", phone: "",
    address: "", city: "Luanda", province: "Luanda", zip: "", country: "Angola",
  });
  const [proofRef, setProofRef] = useState("");
  const [placed, setPlaced] = useState<Order | null>(null);
  const { items, subtotal, shipping, discount, total, clear } = useCart();
  const settings = useSettings();
  const banks = useBankAccounts();
  const addOrder = useOrders((s) => s.addOrder);
  const navigate = useNavigate();

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    toast.success("Copiado para a área de transferência");
  };

  if (items.length === 0 && step < 4) {
    return <div className="container-luxe py-24 text-center"><h1 className="font-display text-3xl">Carrinho vazio</h1><Link to="/colecoes" className="mt-4 inline-block"><Button>Ver coleções</Button></Link></div>;
  }

  const placeOrder = () => {
    const order: Order = {
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      status: "pending",
      customer: {
        name: `${form.name} ${form.surname}`.trim(),
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        province: form.province,
        country: form.country,
      },
      shippingMethod: shippingOptions.find((o) => o.v === shippingMethod)?.t ?? shippingMethod,
      items,
      subtotal: subtotal(),
      shipping: shipping(),
      discount: discount(),
      total: total() || 0,
      proofRef: proofRef || undefined,
    };
    addOrder(order);
    setPlaced(order);
    setStep(4);
    clear();
    toast.success("Pedido registado!", { description: "Efetue a transferência e envie o comprovativo." });
  };

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
            else if (step === 3) placeOrder();
            else navigate({ to: "/conta" });
          }}
          className="space-y-6"
        >
          {step === 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label>Nome</Label><Input required value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
              <div><Label>Apelido</Label><Input required value={form.surname} onChange={(e) => set("surname", e.target.value)} /></div>
              <div><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
              <div><Label>Telefone</Label><Input required value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2"><Label>Morada</Label><Input required value={form.address} onChange={(e) => set("address", e.target.value)} /></div>
              <div><Label>Cidade</Label><Input required value={form.city} onChange={(e) => set("city", e.target.value)} /></div>
              <div><Label>Província</Label><Input required value={form.province} onChange={(e) => set("province", e.target.value)} /></div>
              <div><Label>Código postal</Label><Input value={form.zip} onChange={(e) => set("zip", e.target.value)} /></div>
              <div><Label>País</Label><Input required value={form.country} onChange={(e) => set("country", e.target.value)} /></div>
            </div>
          )}
          {step === 2 && (
            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
              {shippingOptions.map((o) => (
                <label key={o.v} className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-gold">
                  <RadioGroupItem value={o.v} /><div className="flex-1">{o.t}</div><span className="text-sm font-semibold">{o.p}</span>
                </label>
              ))}
            </RadioGroup>
          )}
          {step === 3 && (
            <div className="space-y-5">
              <div className="rounded-sm border border-gold/40 bg-gold/5 p-5">
                <h2 className="flex items-center gap-2 font-display text-2xl"><Landmark className="h-5 w-5 text-gold" /> Pagamento por transferência bancária</h2>
                <p className="mt-2 text-sm text-muted-foreground">{settings.paymentInstructions}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {banks.map((b) => (
                  <div key={b.id} className="space-y-2 border border-border bg-card p-5 text-sm">
                    <p className="font-display text-lg">{b.bank}</p>
                    <p className="text-muted-foreground">Titular: <span className="text-foreground">{b.holder}</span></p>
                    <p className="text-muted-foreground">Conta: <span className="text-foreground">{b.accountNumber}</span></p>
                    <div className="flex items-center justify-between gap-2 border-t border-border pt-2">
                      <span className="font-mono text-xs">{b.iban}</span>
                      <Button type="button" variant="ghost" size="icon" aria-label="Copiar IBAN" onClick={() => copy(b.iban)}><Copy className="h-4 w-4" /></Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Moeda: {b.currency}</p>
                  </div>
                ))}
              </div>
              <div>
                <Label>Referência do comprovativo (opcional)</Label>
                <Input value={proofRef} onChange={(e) => setProofRef(e.target.value)} placeholder="Nº da operação ou nome do depositante" />
                <p className="mt-2 text-xs text-muted-foreground">
                  Envie o comprovativo para {settings.proofEmail} ou WhatsApp {settings.contactPhone}. O gestor de vendas valida o pagamento e confirma o pedido.
                </p>
              </div>
            </div>
          )}
          {step === 4 && placed && (
            <div className="rounded-sm border border-gold bg-gold/10 p-8 text-center">
              <Check className="mx-auto h-12 w-12 text-gold" />
              <h2 className="mt-4 font-display text-3xl">Pedido registado!</h2>
              <p className="mt-2 text-muted-foreground">Número do pedido</p>
              <p className="font-display text-2xl text-gold">#{placed.id}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Transfira {formatPrice(placed.total)} para uma das contas indicadas usando <strong>#{placed.id}</strong> como referência
                e envie o comprovativo para {settings.proofEmail}. Assim que o pagamento for validado pelo gestor de vendas,
                receberá a confirmação e o pedido será enviado.
              </p>
              <div className="mt-6 grid gap-3 text-left md:grid-cols-2">
                {banks.map((b) => (
                  <div key={b.id} className="border border-border bg-background p-4 text-sm">
                    <p className="font-medium">{b.bank}</p>
                    <p className="text-muted-foreground">{b.holder}</p>
                    <p className="font-mono text-xs">{b.iban}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3">
            {step > 0 && step < 4 && <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>Voltar</Button>}
            <Button type="submit" size="lg">{step < 3 ? "Continuar" : step === 3 ? "Finalizar e obter coordenadas" : "Ir para minha conta"}</Button>
          </div>
        </form>
        <aside className="h-fit space-y-3 border border-border bg-card p-6 text-sm">
          <h2 className="font-display text-xl">Resumo</h2>
          {(placed ? placed.items : items).map((i) => (
            <div key={i.id + i.size + i.color} className="flex justify-between text-xs">
              <span>{i.name} × {i.quantity}</span><span>{formatPrice(i.price * i.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(placed ? placed.subtotal : subtotal())}</span></div>
            <div className="flex justify-between"><span>Envio</span><span>{formatPrice(placed ? placed.shipping : shipping())}</span></div>
            {(placed ? placed.discount : discount()) > 0 && (
              <div className="flex justify-between text-gold"><span>Desconto</span><span>-{formatPrice(placed ? placed.discount : discount())}</span></div>
            )}
            <div className="flex justify-between border-t border-border pt-2 text-lg font-semibold"><span>Total</span><span>{formatPrice(placed ? placed.total : total() || 0)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}