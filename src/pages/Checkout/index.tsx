import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../store";
import { clearCart } from "../../store/slices/cartSlice";
import { Button } from "../../components/atoms/Button";
import { CreditCard, Wallet, ArrowRight, ArrowLeft, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Reveal } from "../../components/atoms/Reveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "../../utils/cn";
import { useState } from "react";

const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم الكامل مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  phone: z.string().min(10, { message: "رقم الهاتف غير صالح" }),
  paymentMethod: z.enum(["card", "wallet", "transfer"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [selectedMethod, setSelectedMethod] = useState<"card" | "wallet" | "transfer">("card");

  const subtotal = items.reduce((acc, item) => {
    const price = typeof item.price === "string" ? 
      (item.price === "Free" || item.price === "مجاني" ? 0 : parseFloat(item.price.replace("$", ""))) : 
      item.price;
    return acc + price;
  }, 0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "card",
    },
  });

  if (items.length === 0) {
    return <Navigate to={ROUTES.CART} />;
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Payment Data:", data);
    dispatch(clearCart());
    navigate(ROUTES.ORDER_SUCCESS);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-black">{t("checkout.title")}</h1>
              <p className="text-muted-foreground mt-1">
                {t("checkout.secure_notice")}
              </p>
            </div>
          </div>
        </Reveal>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Billing Info */}
          <div className="lg:col-span-2 space-y-8">
            <Reveal delay={0.1}>
              <div className="bg-card border border-border rounded-[2.5rem] p-8 lg:p-12 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-sm text-primary">1</span>
                  {t("checkout.personal_info")}
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t("checkout.full_name")}</label>
                      <input
                        {...register("fullName")}
                        className={cn(
                          "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all",
                          errors.fullName && "ring-2 ring-red-500"
                        )}
                        placeholder={t("checkout.full_name_placeholder")}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t("checkout.email")}</label>
                      <input
                        {...register("email")}
                        className={cn(
                          "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all",
                          errors.email && "ring-2 ring-red-500"
                        )}
                        placeholder="example@mail.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">{t("checkout.phone")}</label>
                    <input
                      {...register("phone")}
                      className={cn(
                        "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all",
                        errors.phone && "ring-2 ring-red-500"
                      )}
                      placeholder="+20 123 456 789"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-card border border-border rounded-[2.5rem] p-8 lg:p-12 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-sm text-primary">2</span>
                  {t("checkout.payment_method")}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "card", label: t("checkout.payment_methods.card"), icon: CreditCard },
                    { id: "wallet", label: t("checkout.payment_methods.wallet"), icon: Wallet },
                    { id: "transfer", label: t("checkout.payment_methods.transfer"), icon: ShieldCheck },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setSelectedMethod(method.id as any);
                        setValue("paymentMethod", method.id as any);
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
                      {selectedMethod === method.id && <CheckCircle2 className="w-5 h-5 fill-primary text-white" />}
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
                        <input className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="0000 0000 0000 0000" />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {t("checkout.expiry_date")}
                        </label>
                        <input className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {t("checkout.cvv")}
                        </label>
                        <div className="relative">
                          <input className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="123" />
                          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Order Summary Checkout */}
          <div className="lg:col-span-1">
            <Reveal delay={0.3}>
              <div className="bg-card border border-border rounded-[2.5rem] p-8 sticky top-24 shadow-xl">
                <h2 className="text-2xl font-bold mb-8">{t("checkout.order_details")}</h2>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{typeof item.price === "number" ? `$${item.price}` : item.price}</p>
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
                    <span className="text-lg font-bold">{t("checkout.grand_total")}</span>
                    <span className="text-3xl font-black text-primary">${subtotal.toFixed(2)}</span>
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
                      {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </>
                  )}
                </Button>


                <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-xs">
                  <Lock className="w-3 h-3" />
                  {isAr ? "دفع آمن 256-بت" : "Secure 256-bit SSL Payment"}
                </div>
              </div>
            </Reveal>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Checkout;
