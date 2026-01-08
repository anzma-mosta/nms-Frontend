import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { ShoppingBag } from "lucide-react";

export const CartHeader = ({ count }: { count: number }) => {
  const { t } = useTranslation();
  return (
    <Reveal>
      <div className="flex items-center gap-4 mb-12">
        <div className="bg-primary/10 p-3 rounded-2xl">
          <ShoppingBag className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-black">{t("cart.title")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("cart.items_count", { count })}
          </p>
        </div>
      </div>
    </Reveal>
  );
};
