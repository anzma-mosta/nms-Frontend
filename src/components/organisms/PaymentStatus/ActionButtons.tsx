import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { Button } from "../../atoms/Button";
import { ArrowRight, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import type { OrderDetailsData } from "./OrderDetails";

export const ActionButtons = ({
  isSuccess,
  orderData,
}: {
  isSuccess: boolean;
  orderData: OrderDetailsData;
}) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <Reveal delay={0.4}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {isSuccess ? (
          <>
            <Link
              to={`${ROUTES.COURSE_DETAILS.replace(":id", orderData.items[0]?.id || "1")}`}
              className="w-full sm:w-auto"
            >
              <Button className="w-full h-14 px-10 rounded-2xl text-lg font-bold gap-3 group">
                {t("order_success.start_watching")}
                {isAr ? (
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </Link>
            <Link to={ROUTES.DASHBOARD} className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full h-14 px-10 rounded-2xl text-lg font-bold gap-3"
              >
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
              <Button
                variant="ghost"
                className="w-full h-14 px-10 rounded-2xl text-lg font-bold"
              >
                {t("order_success.back_home")}
              </Button>
            </Link>
          </>
        )}
      </div>
    </Reveal>
  );
};
