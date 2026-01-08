import { useSearchParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/templates/MainLayout";
import { StatusHeader } from "../../components/organisms/PaymentStatus/StatusHeader";
import { OrderDetailsCard } from "../../components/organisms/PaymentStatus/OrderDetails";
import { ActionButtons } from "../../components/organisms/PaymentStatus/ActionButtons";

interface OrderItem {
  id: string;
  title: string;
  price: string;
}

interface OrderDetails {
  id: string;
  date: string;
  total: string;
  method: string;
  items: OrderItem[];
}

const PaymentStatus = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const status = searchParams.get("status") || "success";

  const isSuccess = status === "success";

  // Get order data from location state or use mock data as fallback
  const orderData: OrderDetails = location.state?.orderDetails || {
    id: "ORD-2024-8842",
    date: isAr ? "6 يناير، 2024" : "January 6, 2024",
    total: isAr ? "499 ر.س" : "$135.00",
    method: isAr ? "بطاقة مدى البنكية" : "Mada Debit Card",
    items: [
      {
        id: "1",
        title: isAr
          ? "دورة تطوير الويب المتكاملة 2024"
          : "Complete Web Development 2024",
        price: isAr ? "499 ر.س" : "$135.00",
      },
    ],
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <StatusHeader isSuccess={isSuccess} />

            {isSuccess && <OrderDetailsCard orderData={orderData} />}

            <ActionButtons isSuccess={isSuccess} orderData={orderData} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentStatus;
