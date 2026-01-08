import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { Button } from "../../atoms/Button";
import { Download, PlayCircle, Calendar, CreditCard, Hash } from "lucide-react";

export interface OrderItem {
  id: string;
  title: string;
  price: string;
}

export interface OrderDetailsData {
  id: string;
  date: string;
  total: string;
  method: string;
  items: OrderItem[];
}

export const OrderDetailsCard = ({
  orderData,
}: {
  orderData: OrderDetailsData;
}) => {
  const { t } = useTranslation();

  return (
    <Reveal delay={0.2}>
      <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold">
            {t("order_success.order_details")}
          </h2>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <Download className="w-4 h-4" />
            {t("order_success.invoice")}
          </Button>
        </div>
        <div className="p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Hash className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                  {t("order_success.order_id")}
                </p>
                <p className="font-bold">{orderData.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                  {t("order_success.date")}
                </p>
                <p className="font-bold">{orderData.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                  {t("order_success.payment_method")}
                </p>
                <p className="font-bold">{orderData.method}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 mb-10">
            {orderData.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center border border-border">
                    <PlayCircle className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-bold">{item.title}</span>
                </div>
                <span className="font-black text-primary">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex items-center justify-between">
            <span className="text-xl font-bold">
              {t("order_success.total_amount")}
            </span>
            <span className="text-3xl font-black text-primary">
              {orderData.total}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};
