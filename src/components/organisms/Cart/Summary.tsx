import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { Button } from "../../atoms/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

export const CartSummary = ({
  subtotal,
  isAr,
}: {
  subtotal: number;
  isAr: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <Reveal delay={0.3}>
      <div className="bg-card border border-border rounded-[2.5rem] p-8 sticky top-24 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">{t("cart.summary")}</h2>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-muted-foreground">
            <span>{t("cart.subtotal")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>{t("cart.discount")}</span>
            <span className="text-green-500">$0.00</span>
          </div>
          <div className="pt-4 border-t border-border flex justify-between items-center">
            <span className="text-lg font-bold">{t("cart.total")}</span>
            <span className="text-3xl font-black text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>
        <Link to={ROUTES.CHECKOUT}>
          <Button className="w-full h-14 rounded-2xl text-lg font-bold gap-2">
            {t("cart.checkout")}
            {isAr ? (
              <ArrowLeft className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </Button>
        </Link>
        <p className="text-center text-xs text-muted-foreground mt-6">
          {t("cart.terms_notice")}
        </p>
      </div>
    </Reveal>
  );
};
