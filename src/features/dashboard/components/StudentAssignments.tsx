import { useTranslation } from "react-i18next";
import { FileText, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { cn } from "../../../utils/cn";

export const StudentAssignments = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const assignments = [
    {
      id: 1,
      title: isAr ? "أساسيات لغة بايثون" : "Python Basics Intro",
      course: isAr ? "دورة البرمجة الشاملة" : "Full Stack Course",
      deadline: "24 Jan 2024",
      status: "pending",
      grade: null,
    },
    {
      id: 2,
      title: isAr ? "تصميم واجهة المستخدم" : "UI Design Principles",
      course: isAr ? "دورة التصميم الجرافيكي" : "Graphic Design Course",
      deadline: "15 Jan 2024",
      status: "completed",
      grade: "A+",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            {isAr ? "المهام والواجبات" : "Assignments"}
          </h1>
          <p className="text-muted-foreground font-medium">
            {isAr ? "تابع واجباتك المنزلية ومواعيد التسليم" : "Track your homework and deadlines"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assignments.map((item) => (
          <Card key={item.id} className="p-8 glass border-2 border-transparent hover:border-primary/10 transition-all duration-500 rounded-[2.5rem]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className={cn(
                  "p-4 rounded-2xl",
                  item.status === "completed" ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"
                )}>
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-1">{item.title}</h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">{item.course}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {item.deadline}
                    </div>
                    {item.status === "completed" ? (
                      <div className="flex items-center gap-2 text-xs font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase">
                        <CheckCircle2 className="w-3 h-3" />
                        {isAr ? "مكتمل" : "Completed"}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-black text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full uppercase">
                        <AlertCircle className="w-3 h-3" />
                        {isAr ? "قيد الانتظار" : "Pending"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {item.grade && (
                  <div className="text-center px-8 border-x border-primary/5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Grade</p>
                    <p className="text-3xl font-black text-primary">{item.grade}</p>
                  </div>
                )}
                <Button className="rounded-2xl h-14 px-8 font-bold gap-2">
                  {item.status === "completed" ? (isAr ? "عرض النتيجة" : "View Result") : (isAr ? "بدء المهمة" : "Start Assignment")}
                  <ArrowRight className={cn("w-4 h-4", isAr && "rotate-180")} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
