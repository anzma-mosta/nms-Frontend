import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "../../../utils/cn";

export const FAQs = () => {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t("home.faqs.q1"),
      a: t("home.faqs.a1"),
    },
    {
      q: t("home.faqs.q2"),
      a: t("home.faqs.a2"),
    },
    {
      q: t("home.faqs.q3"),
      a: t("home.faqs.a3"),
    },
    {
      q: t("home.faqs.q4"),
      a: t("home.faqs.a4"),
    },
    {
      q: t("home.faqs.q5"),
      a: t("home.faqs.a5"),
    },
  ];

  return (
    <section className="py-24 bg-secondary/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold">{t("home.faqs.title")}</h2>
          <p className="text-muted-foreground">{t("home.faqs.description")}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-card border rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-right gap-4 hover:bg-secondary/30 transition-colors"
              >
                <span
                  className={cn(
                    "font-bold text-lg",
                    i18n.language === "en" && "text-left"
                  )}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "px-6 transition-all duration-300 ease-in-out",
                  openIndex === i
                    ? "max-h-96 py-4 opacity-100"
                    : "max-h-0 py-0 opacity-0 overflow-hidden"
                )}
              >
                <p
                  className={cn(
                    "text-muted-foreground leading-relaxed",
                    i18n.language === "en" && "text-left"
                  )}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
