import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { Button } from "../../atoms/Button";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

export const CartEmptyState = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  return (
    <Reveal delay={0.2}>
      <div className="text-center py-20 bg-secondary/20 rounded-[2.5rem] border border-dashed border-border">
        <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">{t("cart.empty_title")}</h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          {t("cart.empty_desc")}
        </p>
        <Link to={ROUTES.COURSES}>
          <Button
            size="lg"
            className="rounded-full px-10 h-14 text-lg font-bold gap-2"
          >
            {t("cart.browse_courses")}
            {isAr ? (
              <ArrowLeft className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </Button>
        </Link>
      </div>
    </Reveal>
  );
};
