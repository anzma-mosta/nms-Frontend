import React from "react";
import { useTranslation } from "react-i18next";
import { GraduationCap, Trophy, Clock, BrainCircuit, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const exams = [
  {
    id: 1,
    title: "اختبار نهاية الوحدة: هياكل البيانات",
    course: "دورة تطوير تطبيقات الويب",
    date: "2024-01-12",
    duration: "60 دقيقة",
    questions: 25,
    status: "upcoming",
  },
  {
    id: 2,
    title: "اختبار تجريبي: نظرية الألوان",
    course: "أساسيات التصميم الجرافيكي",
    date: "2023-12-28",
    score: "92/100",
    status: "completed",
  },
];

export const StudentExams = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black">{t("dashboard.sidebar.exams")}</h2>
        <p className="text-muted-foreground font-bold mt-1">الاختبارات القادمة ونتائجك السابقة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exams.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card p-8 rounded-[2rem] border border-secondary relative overflow-hidden group hover:border-primary/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
            
            <div className="relative space-y-6">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                  {exam.status === "upcoming" ? <BrainCircuit size={28} /> : <Trophy size={28} className="text-yellow-500" />}
                </div>
                {exam.status === "upcoming" ? (
                  <div className="bg-blue-500/10 text-blue-500 px-4 py-1.5 rounded-full text-xs font-black">
                    قادم
                  </div>
                ) : (
                  <div className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-xs font-black">
                    مكتمل
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-black text-xl leading-tight">{exam.title}</h3>
                <p className="text-muted-foreground font-bold mt-1">{exam.course}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <Clock size={16} />
                  {exam.duration || exam.date}
                </div>
                {exam.status === "upcoming" ? (
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                    <GraduationCap size={16} />
                    {exam.questions} سؤال
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-black text-green-500">
                    <Trophy size={16} />
                    النتيجة: {exam.score}
                  </div>
                )}
              </div>

              <button className="w-full py-4 rounded-2xl bg-secondary font-black group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                {exam.status === "upcoming" ? "بدء الاختبار" : "عرض الإجابات"}
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
