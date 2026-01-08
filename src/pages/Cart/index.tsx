import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../store";
import { removeFromCart } from "../../store/slices/cartSlice";
import { Reveal } from "../../components/atoms/Reveal";
import { CartHeader } from "../../components/organisms/Cart/Header";
import { CartEmptyState } from "../../components/organisms/Cart/EmptyState";
import { CartItemRow } from "../../components/organisms/Cart/ItemRow";
import { CartSummary } from "../../components/organisms/Cart/Summary";

const Cart = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce((acc, item) => {
    const price =
      typeof item.price === "string"
        ? item.price === "Free" || item.price === "مجاني"
          ? 0
          : parseFloat(item.price.replace("$", ""))
        : item.price;
    return acc + price;
  }, 0);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <CartHeader count={items.length} />

        {items.length === 0 ? (
          <CartEmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.1}>
                  <CartItemRow
                    item={item}
                    onRemove={(id) => dispatch(removeFromCart(id))}
                  />
                </Reveal>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <CartSummary subtotal={subtotal} isAr={isAr} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
