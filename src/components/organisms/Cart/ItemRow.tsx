import { Trash2 } from "lucide-react";
import type { CartItem } from "../../../store/slices/cartSlice";
import { useTranslation } from "react-i18next";

export const CartItemRow = ({
  item,
  onRemove,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="group bg-card border border-border rounded-3xl p-6 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all">
      <div className="relative w-full sm:w-40 h-28 rounded-2xl overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              title={t("cart.remove")}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            {item.instructor}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-end">
          <span className="text-2xl font-black text-primary">
            {typeof item.price === "number" ? `$${item.price}` : item.price}
          </span>
        </div>
      </div>
    </div>
  );
};
