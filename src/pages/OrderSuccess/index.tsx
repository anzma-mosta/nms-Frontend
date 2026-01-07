import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/atoms/Button";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  PlayCircle,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Reveal } from "../../components/atoms/Reveal";
import { cn } from "../../utils/cn";

const OrderSuccess = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <Reveal>
            <div className="mb-8 relative inline-block">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <CheckCircle className="w-24 h-24 text-primary relative z-10" />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              {t("order_success.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              {t("order_success.desc")}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div className="bg-card border border-border p-6 rounded-3xl flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <PlayCircle className="w-6 h-6 text-primary" />
                </div>
                <div
                  className={cn("flex-1", isAr ? "text-right" : "text-left")}
                >
                  <p className="text-xs text-muted-foreground">
                    {t("order_success.next_step")}
                  </p>
                  <p className="font-bold">
                    {t("order_success.start_watching")}
                  </p>
                </div>
              </div>
              <div className="bg-card border border-border p-6 rounded-3xl flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div
                  className={cn("flex-1", isAr ? "text-right" : "text-left")}
                >
                  <p className="text-xs text-muted-foreground">
                    {t("order_success.invoice")}
                  </p>
                  <p className="font-bold">{t("order_success.download_pdf")}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.DASHBOARD}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-10 h-14 text-lg font-bold gap-2"
                >
                  {t("order_success.go_dashboard")}
                  {isAr ? (
                    <ArrowLeft className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </Link>
              <Link to={ROUTES.HOME}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-10 h-14 text-lg font-bold"
                >
                  {t("order_success.back_home")}
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccess;
