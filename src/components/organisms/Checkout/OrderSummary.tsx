import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { Button } from "../../atoms/Button";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";
import type { CartItem } from "../../../store/slices/cartSlice";

export const OrderSummarySection = ({
  items,
  subtotal,
  isSubmitting,
  isAr,
}: {
  items: CartItem[];
  subtotal: number;
  isSubmitting: boolean;
  isAr: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Reveal delay={0.3}>
      <div className="bg-card border border-border rounded-[2.5rem] p-8 sticky top-24 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">
          {t("checkout.order_details")}
        </h2>
        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {typeof item.price === "number"
                    ? `$${item.price}`
                    : item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 pt-6 border-t border-border mb-8">
          <div className="flex justify-between text-muted-foreground">
            <span>{t("cart.subtotal")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              {t("checkout.grand_total")}
            </span>
            <span className="text-3xl font-black text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-2xl text-lg font-bold gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("checkout.processing")}
            </>
          ) : (
            <>
              {t("checkout.confirm_payment")}
              {isAr ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </>
          )}
        </Button>
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-xs">
          <Lock className="w-3 h-3" />
          {isAr ? "دفع آمن 256-بت" : "Secure 256-bit SSL Payment"}
        </div>
      </div>
    </Reveal>
  );
};
