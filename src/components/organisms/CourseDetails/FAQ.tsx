import { CircleHelp } from "lucide-react";
import { Reveal } from "../../atoms/Reveal";
import { useTranslation } from "react-i18next";

export const CourseFAQ = () => {
  const { t } = useTranslation();

  // Simulated FAQ data
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
  ];

  return (
    <Reveal>
      <div className="space-y-10">
        <div className="text-center md:text-right">
          <h2 className="text-4xl font-black text-center mb-4">
            {t("home.faqs.title")}
          </h2>
          <p className="text-slate-400 text-center text-lg font-medium">
            {t("home.faqs.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 hover:bg-white/[0.04] transition-all duration-500 group"
            >
              <h3 className="text-xl font-black text-center mb-4 flex items-center gap-4">
                <CircleHelp className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
                {faq.q}
              </h3>
              <p className="text-slate-400 leading-relaxed font-medium text-lg">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};
