import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { cn } from "../../../utils/cn";
import {
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";

export const PaymentMethodsSection = ({
  selectedMethod,
  setSelectedMethod,
  setPaymentMethod,
}: {
  selectedMethod: "card" | "wallet" | "transfer";
  setSelectedMethod: (m: "card" | "wallet" | "transfer") => void;
  setPaymentMethod: (m: "card" | "wallet" | "transfer") => void;
}) => {
  const { t } = useTranslation();

  const methods = [
    { id: "card", label: t("checkout.payment_methods.card"), icon: CreditCard },
    { id: "wallet", label: t("checkout.payment_methods.wallet"), icon: Wallet },
    {
      id: "transfer",
      label: t("checkout.payment_methods.transfer"),
      icon: ShieldCheck,
    },
  ] as const;

  return (
    <Reveal delay={0.2}>
      <div className="bg-card border border-border rounded-[2.5rem] p-8 lg:p-12 shadow-sm">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-sm text-primary">
            2
          </span>
          {t("checkout.payment_method")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {methods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => {
                setSelectedMethod(method.id);
                setPaymentMethod(method.id);
              }}
              className={cn(
                "flex flex-col items-center gap-4 p-6 rounded-3xl border-2 transition-all",
                selectedMethod === method.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              <method.icon className="w-8 h-8" />
              <span className="font-bold">{method.label}</span>
              {selectedMethod === method.id && (
                <CheckCircle2 className="w-5 h-5 fill-primary text-white" />
              )}
            </button>
          ))}
        </div>
        {selectedMethod === "card" && (
          <div className="mt-8 p-6 bg-secondary/30 rounded-3xl space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("checkout.card_number")}
              </label>
              <div className="relative">
                <input
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0000 0000 0000 0000"
                />
                <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("checkout.expiry_date")}
                </label>
                <input
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="MM/YY"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("checkout.cvv")}
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    placeholder="123"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
};
