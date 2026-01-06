import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../store";
import { removeFromCart } from "../../store/slices/cartSlice";
import { Button } from "../../components/atoms/Button";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Reveal } from "../../components/atoms/Reveal";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce((acc, item) => {
    const price = typeof item.price === "string" ? 
      (item.price === "Free" || item.price === "مجاني" ? 0 : parseFloat(item.price.replace("$", ""))) : 
      item.price;
    return acc + price;
  }, 0);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-black">{t("cart.title")}</h1>
              <p className="text-muted-foreground mt-1">
                {t("cart.items_count", { count: items.length })}
              </p>
            </div>
          </div>
        </Reveal>

        {items.length === 0 ? (
          <Reveal delay={0.2}>
            <div className="text-center py-20 bg-secondary/20 rounded-[2.5rem] border border-dashed border-border">
              <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">
                {t("cart.empty_title")}
              </h2>
              <p className="text-muted-foreground mb-10 max-w-md mx-auto">
                {t("cart.empty_desc")}
              </p>
              <Link to={ROUTES.COURSES}>
                <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold gap-2">
                  {t("cart.browse_courses")}
                  {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </Button>
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.1}>
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
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                            title={t("cart.remove")}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">{item.instructor}</p>
                      </div>
                      <div className="mt-4 flex justify-between items-end">
                        <span className="text-2xl font-black text-primary">
                          {typeof item.price === "number" ? `$${item.price}` : item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
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
                      <span className="text-3xl font-black text-primary">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link to={ROUTES.CHECKOUT}>
                    <Button className="w-full h-14 rounded-2xl text-lg font-bold gap-2">
                      {t("cart.checkout")}
                      {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </Button>
                  </Link>

                  <p className="text-center text-xs text-muted-foreground mt-6">
                    {t("cart.terms_notice")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
