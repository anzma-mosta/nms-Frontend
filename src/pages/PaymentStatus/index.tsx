import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  PlayCircle, 
  LayoutDashboard,
  Calendar,
  CreditCard,
  Hash
} from "lucide-react";
import { MainLayout } from "../../components/templates/MainLayout";
import { Button } from "../../components/atoms/Button";
import { Reveal } from "../../components/atoms/Reveal";
import { ROUTES } from "../../constants/routes";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const PaymentStatus = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const status = searchParams.get("status") || "success"; // success or error

  const isSuccess = status === "success";

  // Get order data from location state or use mock data as fallback
  const orderData = location.state?.orderDetails || {
    id: "ORD-2024-8842",
    date: isAr ? "6 يناير، 2024" : "January 6, 2024",
    total: isAr ? "499 ر.س" : "$135.00",
    method: isAr ? "بطاقة مدى البنكية" : "Mada Debit Card",
    items: [
      { id: "1", title: isAr ? "دورة تطوير الويب المتكاملة 2024" : "Complete Web Development 2024", price: isAr ? "499 ر.س" : "$135.00" }
    ]
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Reveal direction="up">
              <div className="text-center mb-12">
                {isSuccess ? (
                  <>
                    <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                      {t("order_success.title")}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
                      {t("order_success.desc")}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <XCircle className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                      {t("order_success.failed_title")}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
                      {t("order_success.failed_desc")}
                    </p>
                  </>
                )}
              </div>
            </Reveal>

            {isSuccess && (
              <Reveal delay={0.2}>
                <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-sm mb-12">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 border-b border-border flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-bold">{t("order_success.order_details")}</h2>
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
                          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t("order_success.order_id")}</p>
                          <p className="font-bold">{orderData.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t("order_success.date")}</p>
                          <p className="font-bold">{orderData.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t("order_success.payment_method")}</p>
                          <p className="font-bold">{orderData.method}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      {orderData.items.map((item: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; }) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50">
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
                      <span className="text-xl font-bold">{t("order_success.total_amount")}</span>
                      <span className="text-3xl font-black text-primary">{orderData.total}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isSuccess ? (
                  <>
                    <Link to={`${ROUTES.COURSE_DETAILS.replace(":id", orderData.items[0]?.id || "1")}`} className="w-full sm:w-auto">
                      <Button className="w-full h-14 px-10 rounded-2xl text-lg font-bold gap-3 group">
                        {t("order_success.start_watching")}
                        {isAr ? <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                      </Button>
                    </Link>
                    <Link to={ROUTES.DASHBOARD} className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full h-14 px-10 rounded-2xl text-lg font-bold gap-3">
                        <LayoutDashboard className="w-5 h-5" />
                        {t("order_success.go_dashboard")}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={ROUTES.CHECKOUT} className="w-full sm:w-auto">
                      <Button className="w-full h-14 px-10 rounded-2xl text-lg font-bold">
                        {t("order_success.try_again")}
                      </Button>
                    </Link>
                    <Link to={ROUTES.HOME} className="w-full sm:w-auto">
                      <Button variant="ghost" className="w-full h-14 px-10 rounded-2xl text-lg font-bold">
                        {t("order_success.back_home")}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentStatus;
