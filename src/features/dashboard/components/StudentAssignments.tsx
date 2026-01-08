import React from "react";
import { useTranslation } from "react-i18next";
import { FileText, Clock, AlertCircle, CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

const assignments = [
  {
    id: 1,
    title: "تصميم واجهة مستخدم لمتجر إلكتروني",
    course: "أساسيات التصميم الجرافيكي",
    dueDate: "2024-01-15",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    title: "تطوير نظام إدارة مهام باستخدام React",
    course: "دورة تطوير تطبيقات الويب",
    dueDate: "2024-01-10",
    status: "submitted",
    priority: "medium",
  },
  {
    id: 3,
    title: "تحليل مجموعة بيانات أسعار المنازل",
    course: "تعلم الآلة والذكاء الاصطناعي",
    dueDate: "2024-01-20",
    status: "overdue",
    priority: "high",
  },
];

export const StudentAssignments = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black">{t("dashboard.sidebar.assignments")}</h2>
        <p className="text-muted-foreground font-bold mt-1">الواجبات والمشاريع المطلوبة منك</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-card p-6 rounded-3xl border border-secondary flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner",
                assignment.status === "submitted" ? "bg-green-500/10 text-green-500" :
                assignment.status === "overdue" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
              )}>
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-black text-lg group-hover:text-primary transition-colors">{assignment.title}</h3>
                <p className="text-sm text-muted-foreground font-bold">{assignment.course}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Clock size={14} className="text-muted-foreground" />
                    <span>موعد التسليم: {assignment.dueDate}</span>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider",
                    assignment.priority === "high" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                  )}>
                    {assignment.priority === "high" ? "أولوية عالية" : "أولوية متوسطة"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={cn(
                "px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2",
                assignment.status === "submitted" ? "bg-green-500/10 text-green-500" :
                assignment.status === "overdue" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
              )}>
                {assignment.status === "submitted" && <CheckCircle2 size={18} />}
                {assignment.status === "overdue" && <AlertCircle size={18} />}
                {assignment.status === "pending" && <Clock size={18} />}
                {assignment.status === "submitted" ? "تم التسليم" :
                 assignment.status === "overdue" ? "متأخر" : "قيد التنفيذ"}
              </div>
              <button className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground group-hover:text-primary">
                <ArrowUpRight size={24} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
