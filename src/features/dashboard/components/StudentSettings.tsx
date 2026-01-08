import React from "react";
import { useTranslation } from "react-i18next";
import { Settings, Bell, Shield, Eye, Languages, Palette, Trash2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { LanguageToggle } from "../../../components/atoms/LanguageToggle";
import { ThemeToggle } from "../../../components/atoms/ThemeToggle";

export const StudentSettings = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: "الإشعارات",
      icon: Bell,
      desc: "تحكم في كيفية تلقي التنبيهات والرسائل",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "الخصوصية",
      icon: Shield,
      desc: "إدارة من يمكنه رؤية ملفك الشخصي ونشاطك",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "المظهر",
      icon: Palette,
      desc: "تخصيص ألوان الواجهة والوضع الليلي",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      action: <ThemeToggle />,
    },
    {
      title: "اللغة",
      icon: Languages,
      desc: "اختر اللغة المفضلة لاستخدام المنصة",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      action: <LanguageToggle />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-black">{t("dashboard.sidebar.settings")}</h2>
        <p className="text-muted-foreground font-bold mt-1">تخصيص تجربتك داخل المنصة</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-card p-6 rounded-[2rem] border border-secondary flex items-center justify-between hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${section.bg} ${section.color} flex items-center justify-center shadow-inner`}>
                <section.icon size={28} />
              </div>
              <div>
                <h3 className="font-black text-lg">{section.title}</h3>
                <p className="text-sm text-muted-foreground font-bold">{section.desc}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {section.action || (
                <button className="p-3 rounded-xl hover:bg-secondary text-muted-foreground transition-colors">
                  <ChevronRight size={24} className="rtl:rotate-180" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-8 border-t border-secondary">
        <div className="bg-destructive/5 p-8 rounded-[2rem] border border-destructive/10 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black text-destructive text-lg">منطقة الخطر</h3>
            <p className="text-sm text-destructive/70 font-bold">حذف الحساب سيؤدي إلى فقدان جميع بياناتك ودوراتك بشكل نهائي.</p>
          </div>
          <button className="px-6 py-3 rounded-2xl bg-destructive text-white font-black hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-destructive/20">
            <Trash2 size={18} />
            حذف الحساب
          </button>
        </div>
      </div>
    </div>
  );
};
