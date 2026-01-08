import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { ShieldCheck, Sparkles } from "lucide-react";

export const RegisterBenefits = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const items = [
    {
      icon: ShieldCheck,
      title: isAr ? "تسجيل آمن" : "Secure Registration",
      desc: isAr
        ? "نحافظ على خصوصية بياناتك ونوفر أعلى معايير الأمان"
        : "We protect your privacy with top-notch security",
    },
    {
      icon: Sparkles,
      title: isAr ? "تجربة سلسة" : "Seamless Experience",
      desc: isAr
        ? "حساب واحد للوصول إلى جميع الدورات والميزات"
        : "One account to access all courses and features",
    },
  ] as const;

  return (
    <div className="space-y-6 pt-10">
      {items.map((item, idx) => (
        <Reveal key={idx} delay={0.2 + idx * 0.1}>
          <div className="flex items-start gap-6 group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
              <item.icon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-1">
                {item.title}
              </h3>
              <p className="text-slate-500 font-medium">{item.desc}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};
