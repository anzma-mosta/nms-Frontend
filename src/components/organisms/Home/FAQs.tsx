import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, CircleHelp, MessageCircle } from "lucide-react";
import { cn } from "../../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export const FAQs = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t("home.faqs.q1"), a: t("home.faqs.a1") },
    { q: t("home.faqs.q2"), a: t("home.faqs.a2") },
    { q: t("home.faqs.q3"), a: t("home.faqs.a3") },
    { q: t("home.faqs.q4"), a: t("home.faqs.a4") },
    { q: t("home.faqs.q5"), a: t("home.faqs.a5") },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none -ml-48 -mb-48" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm"
          >
            <CircleHelp className="w-4 h-4" />
            <span>{isAr ? "الأسئلة الشائعة" : "Common Questions"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-black tracking-tight"
          >
            {isAr ? "لديك" : "Have"}
            <span className="text-primary">
              {" "}
              {isAr ? "استفسارات؟" : "Questions?"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {t("home.faqs.description")}
          </motion.p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group glass border-2 rounded-[2.5rem] overflow-hidden transition-all duration-500",
                openIndex === i
                  ? "border-primary/30 shadow-2xl shadow-primary/5 bg-card"
                  : "border-transparent hover:border-primary/10 bg-card/40"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={cn(
                  "w-full px-8 py-8 flex items-center justify-between gap-6 transition-all duration-300",
                  !isAr && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0",
                    openIndex === i
                      ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                      : "bg-secondary/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}
                >
                  <ChevronDown
                    className={cn(
                      "w-6 h-6 transition-transform duration-500",
                      openIndex === i && "rotate-180"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "font-black text-xl lg:text-2xl text-foreground transition-colors flex-grow",
                    openIndex === i
                      ? "text-primary"
                      : "group-hover:text-primary",
                    isAr ? "text-right" : "text-left"
                  )}
                >
                  {faq.q}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <div className="px-8 pb-10">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
                      <p
                        className={cn(
                          "text-muted-foreground font-semibold text-lg leading-relaxed lg:pr-18",
                          !isAr && "text-left lg:pl-18 lg:pr-0"
                        )}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-[2rem] glass border-2 border-primary/10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className={isAr ? "text-right" : "text-left"}>
              <p className="font-bold text-foreground">
                {isAr ? "ما زال لديك أسئلة؟" : "Still have questions?"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isAr
                  ? "تواصل معنا مباشرة وسنكون سعداء بمساعدتك"
                  : "Contact us directly and we'll be happy to help"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
