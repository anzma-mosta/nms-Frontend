import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { Sparkles } from "lucide-react";

export const RegisterHero = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <Reveal>
      <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-widest backdrop-blur-md mb-6">
        <Sparkles className="w-4 h-4" />
        {isAr ? "ابدأ رحلتك معنا" : "Start Your Journey"}
      </div>
      <h1 className="text-6xl font-black text-white leading-tight">
        {isAr ? "أنشئ حسابك على" : "Create Your"}
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          WAKP Academy
        </span>
      </h1>
      <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg mt-8">
        {isAr
          ? "انضم إلى آلاف المتعلمين وابدأ في بناء مهاراتك مع أفضل المحتويات التعليمية."
          : "Join thousands of learners and start building your skills with the best educational content."}
      </p>
    </Reveal>
  );
};
