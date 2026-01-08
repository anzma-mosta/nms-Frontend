import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../store";
import { clearCart } from "../../store/slices/cartSlice";
import { ShieldCheck } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Reveal } from "../../components/atoms/Reveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { BillingInfoSection } from "../../components/organisms/Checkout/BillingInfo";
import { PaymentMethodsSection } from "../../components/organisms/Checkout/PaymentMethods";
import { OrderSummarySection } from "../../components/organisms/Checkout/OrderSummary";

const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم الكامل مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  phone: z.string().min(10, { message: "رقم الهاتف غير صالح" }),
  paymentMethod: z.enum(["card", "wallet", "transfer"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const generateOrderId = () =>
  `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "wallet" | "transfer"
  >("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((acc, item) => {
    const price =
      typeof item.price === "string"
        ? item.price === "Free" || item.price === "مجاني"
          ? 0
          : parseFloat(item.price.replace("$", ""))
        : item.price;
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

  if (items.length === 0 && !isProcessing) {
    return <Navigate to={ROUTES.CART} />;
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 20));
    console.log("Payment Data:", data);

    const orderDetails = {
      id: generateOrderId(),
      date: new Date().toLocaleDateString(isAr ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      total: `$${subtotal.toFixed(2)}`,
      method: t(`checkout.payment_methods.${data.paymentMethod}`),
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        price:
          typeof item.price === "number"
            ? `$${item.price.toFixed(2)}`
            : item.price,
      })),
    };

    dispatch(clearCart());
    navigate(`${ROUTES.PAYMENT_STATUS}?status=success`, {
      state: { orderDetails },
    });
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          <div className="lg:col-span-2 space-y-8">
            <BillingInfoSection register={register} errors={errors} />
            <PaymentMethodsSection
              selectedMethod={selectedMethod}
              setSelectedMethod={(m) => setSelectedMethod(m)}
              setPaymentMethod={(m) => setValue("paymentMethod", m)}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummarySection
              items={items}
              subtotal={subtotal}
              isSubmitting={isSubmitting}
              isAr={isAr}
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Checkout;
