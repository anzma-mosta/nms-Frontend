import { useTranslation } from "react-i18next";
import { Check, Zap, ArrowRight, Star, ShieldCheck } from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";
import { Card } from "../../atoms/Card";

export const Subscriptions = () => {
  const { t, i18n } = useTranslation();

  const plans = [
    {
      id: "basic",
      name: t("home.subs.basic_name"),
      price: i18n.language === "ar" ? "99" : "29",
      currency: i18n.language === "ar" ? "ج.م" : "$",
      period: t("home.subs.monthly"),
      description:
        i18n.language === "ar"
          ? "مثالي للمبتدئين لبدء رحلتهم التعليمية"
          : "Perfect for beginners starting their journey",
      features: [
        t("home.subs.feat_courses"),
        t("home.subs.feat_certs"),
        t("home.subs.feat_support_no"),
        i18n.language === "ar"
          ? "الوصول لـ 5 دورات شهرياً"
          : "Access to 5 courses/month",
      ],
      recommended: false,
      color: "blue",
    },
    {
      id: "pro",
      name: t("home.subs.pro_name"),
      price: i18n.language === "ar" ? "199" : "59",
      currency: i18n.language === "ar" ? "ج.م" : "$",
      period: t("home.subs.monthly"),
      description:
        i18n.language === "ar"
          ? "الخيار الأفضل للطلاب الطموحين والمحترفين"
          : "Best for ambitious students and professionals",
      features: [
        t("home.subs.feat_courses_all"),
        t("home.subs.feat_certs_all"),
        t("home.subs.feat_live_classes"),
        t("home.subs.feat_support_yes"),
        i18n.language === "ar"
          ? "أولوية الوصول للميزات الجديدة"
          : "Priority access to new features",
      ],
      recommended: true,
      color: "emerald",
    },
    {
      id: "yearly",
      name: t("home.subs.yearly_name"),
      price: i18n.language === "ar" ? "1599" : "499",
      currency: i18n.language === "ar" ? "ج.م" : "$",
      period: t("home.subs.yearly"),
      description:
        i18n.language === "ar"
          ? "توفير هائل مع وصول غير محدود لكل شيء"
          : "Massive savings with unlimited everything",
      features: [
        t("home.subs.feat_courses_all"),
        t("home.subs.feat_live_all"),
        t("home.subs.feat_offline"),
        t("home.subs.feat_mentor"),
        i18n.language === "ar"
          ? "جلسات توجيه خاصة شهرياً"
          : "Private mentoring monthly",
      ],
      recommended: false,
      color: "purple",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.03)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">
              {t("home.subs.badge") || "Flexible Pricing"}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8"
          >
            {t("home.subs.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            {t("home.subs.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card
                className={cn(
                  "relative p-10 rounded-[3rem] border-2 transition-all duration-500 overflow-hidden flex flex-col h-full glass",
                  plan.recommended
                    ? "border-primary shadow-2xl shadow-primary/10 bg-card scale-105 z-20"
                    : "border-transparent hover:border-primary/20 bg-card/40 z-10"
                )}
              >
                {/* Background Pattern for Recommended */}
                {plan.recommended && (
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <Zap className="w-40 h-40 text-primary rotate-12" />
                  </div>
                )}

                {plan.recommended && (
                  <div className="absolute top-6 right-10">
                    <div className="bg-primary text-white px-5 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-xl shadow-primary/30">
                      <Star className="w-3 h-3 fill-current" />
                      {t("home.subs.most_popular")}
                    </div>
                  </div>
                )}

                <div className="mb-10 relative z-10">
                  <h3 className="text-2xl font-black mb-3">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium mb-8 leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">
                      {plan.price}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-muted-foreground leading-none">
                        {plan.currency}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                        / {plan.period}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-12 flex-grow relative z-10">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/60">
                    {i18n.language === "ar"
                      ? "ماذا ستحصل عليه:"
                      : "What's Included:"}
                  </p>
                  <ul className="space-y-5">
                    {plan.features.map((feat, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-4 text-sm font-semibold"
                      >
                        <div className="bg-primary/10 p-1.5 rounded-xl text-primary shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-foreground/80 leading-snug">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={plan.recommended ? "primary" : "outline"}
                  size="lg"
                  className={cn(
                    "w-full rounded-[1.5rem] h-14 font-black text-lg group relative overflow-hidden",
                    !plan.recommended && "glass border-2"
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t("home.subs.get_started") || "Choose Plan"}
                    <ArrowRight
                      className={cn(
                        "w-5 h-5 transition-transform group-hover:translate-x-1",
                        i18n.language === "ar" &&
                          "rotate-180 group-hover:-translate-x-1"
                      )}
                    />
                  </span>
                  {plan.recommended && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                </Button>

                {!plan.recommended && (
                  <p className="text-center mt-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {i18n.language === "ar"
                      ? "بدون التزامات خفية"
                      : "No Hidden Fees"}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {/* Mock partner logos or trust indicators */}
          <div className="text-sm font-black uppercase tracking-[0.3em]">
            {i18n.language === "ar" ? "موثوق من:" : "Trusted By:"}
          </div>
          <div className="text-xl font-black tracking-tighter">EDU-GLOBAL</div>
          <div className="text-xl font-black tracking-tighter">
            ACADEMY-PLUS
          </div>
          <div className="text-xl font-black tracking-tighter">LEARN-TECH</div>
          <div className="text-xl font-black tracking-tighter">
            FUTURE-SKILLS
          </div>
        </motion.div>
      </div>
    </section>
  );
};
