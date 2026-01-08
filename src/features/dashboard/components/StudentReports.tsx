import React from "react";
import { useTranslation } from "react-i18next";
import { BarChart3, TrendingUp, Target, Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export const StudentReports = () => {
  const { t } = useTranslation();

  const stats = [
    { label: "معدل الحضور", value: "95%", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "التقدم الدراسي", value: "+12%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "المهام المكتملة", value: "24/28", icon: Target, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "النقاط المكتسبة", value: "1,250", icon: Award, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black">{t("dashboard.sidebar.reports")}</h2>
        <p className="text-muted-foreground font-bold mt-1">تحليل شامل لأدائك الدراسي وتطور مهاراتك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card p-6 rounded-3xl border border-secondary flex flex-col items-center text-center gap-4"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
              <h4 className="text-2xl font-black mt-1">{stat.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-8 rounded-[2rem] border border-secondary">
          <h3 className="font-black text-xl mb-6 flex items-center gap-3">
            <BarChart3 className="text-primary" />
            تحليل المهارات
          </h3>
          <div className="space-y-6">
            {[
              { label: "برمجة Frontend", value: 85 },
              { label: "تصميم واجهات UI", value: 60 },
              { label: "حل المشكلات", value: 75 },
              { label: "إدارة الوقت", value: 90 },
            ].map((skill) => (
              <div key={skill.label} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{skill.label}</span>
                  <span>{skill.value}%</span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-8 rounded-[2rem] border border-secondary flex flex-col justify-center items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Award size={48} />
          </div>
          <div>
            <h3 className="font-black text-2xl">أنت في المركز العاشر!</h3>
            <p className="text-muted-foreground font-bold mt-2 max-w-[250px]">
              استمر في التقدم، تفصلك 50 نقطة فقط عن المركز التاسع في قائمة المتصدرين.
            </p>
          </div>
          <button className="px-8 py-3 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            عرض قائمة المتصدرين
          </button>
        </div>
      </div>
    </div>
  );
};
