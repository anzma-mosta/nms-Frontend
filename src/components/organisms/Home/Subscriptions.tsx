import { useTranslation } from "react-i18next";
import { Check, Zap } from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";

export const Subscriptions = () => {
  const { t, i18n } = useTranslation();

  const plans = [
    {
      name: t("home.subs.basic_name"),
      price: i18n.language === "ar" ? "99" : "29",
      currency: i18n.language === "ar" ? "ج.م" : "$",
      period: t("home.subs.monthly"),
      features: [
        t("home.subs.feat_courses"),
        t("home.subs.feat_certs"),
        t("home.subs.feat_support_no"),
      ],
      recommended: false,
    },
    {
      name: t("home.subs.pro_name"),
      price: i18n.language === "ar" ? "199" : "59",
      currency: i18n.language === "ar" ? "ج.م" : "$",
      period: t("home.subs.monthly"),
      features: [
        t("home.subs.feat_courses_all"),
        t("home.subs.feat_certs_all"),
        t("home.subs.feat_live_classes"),
        t("home.subs.feat_support_yes"),
      ],
      recommended: true,
    },
    {
      name: t("home.subs.yearly_name"),
      price: i18n.language === "ar" ? "1599" : "499",
      currency: i18n.language === "ar" ? "ج.م" : "$",
      period: t("home.subs.yearly"),
      features: [
        t("home.subs.feat_courses_all"),
        t("home.subs.feat_live_all"),
        t("home.subs.feat_offline"),
        t("home.subs.feat_mentor"),
      ],
      recommended: false,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold">{t("home.subs.title")}</h2>
          <p className="text-muted-foreground">{t("home.subs.description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "relative p-8 rounded-3xl border transition-all hover:shadow-2xl",
                plan.recommended
                  ? "border-primary shadow-xl bg-card scale-105 z-10"
                  : "bg-card/50"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                  <Zap className="w-3 h-3 fill-current" />
                  {t("home.subs.most_popular")}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-muted-foreground">
                    {plan.currency} / {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <div className="bg-primary/10 p-1 rounded-full text-primary">
                      <Check className="w-3 h-3" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.recommended ? "primary" : "outline"}
                className="w-full h-12 rounded-xl font-bold"
              >
                {t("home.subs.get_started")}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
