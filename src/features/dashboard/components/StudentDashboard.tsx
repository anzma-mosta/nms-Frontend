import { useTranslation } from "react-i18next";
import { BookOpen, Clock, CheckCircle, Play, TrendingUp, ArrowUpRight, GraduationCap } from "lucide-react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { cn } from "../../../utils/cn";

export const StudentDashboard = ({ user }: { user: any }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const stats = [
    {
      label: t("dashboard.enrolled_courses"),
      value: "12",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: t("dashboard.hours_learned"),
      value: "48h",
      icon: <Clock className="w-6 h-6" />,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: t("dashboard.completed_courses"),
      value: "4",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            {isAr ? `مرحباً بك، ${user?.name}` : `Welcome back, ${user?.name}`}
          </h1>
          <p className="text-muted-foreground font-medium">
            {isAr ? "استعد لإكمال رحلتك التعليمية اليوم!" : "Ready to continue your learning journey today?"}
          </p>
        </div>
        <Button className="rounded-2xl h-14 px-8 font-bold gap-2 shadow-xl shadow-primary/20">
          <Play className="w-5 h-5" />
          {isAr ? "متابعة آخر درس" : "Continue Learning"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-8 glass border-2 border-transparent hover:border-primary/10 transition-all duration-500 rounded-[2.5rem]">
            <div className="flex items-center gap-6">
              <div className={cn("p-4 rounded-2xl", stat.bg)}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 glass border-2 rounded-[3rem] overflow-hidden relative">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black tracking-tight">
              {isAr ? "آخر الكورسات" : "Recently Accessed"}
            </h2>
            <Button variant="ghost" size="sm" className="rounded-xl font-bold text-primary">
              {isAr ? "عرض الكل" : "View All"}
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {[1, 2].map((_, i) => (
              <div key={i} className="group cursor-pointer p-6 rounded-[2.5rem] bg-background/50 border-2 border-transparent hover:border-primary/10 transition-all">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-48 aspect-video rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" alt="Course" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">
                        Full Stack Web Development 2024
                      </h4>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">
                        {isAr ? "بواسطة: د. أحمد خالد" : "By: Dr. Ahmed Khaled"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-black">
                        <span>{isAr ? "التقدم" : "Progress"}</span>
                        <span className="text-primary">65%</span>
                      </div>
                      <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "65%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-10 glass border-2 rounded-[3rem] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              {isAr ? "نشاطك" : "Your Activity"}
            </h2>
          </div>
          
          <div className="space-y-8">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  {i !== 3 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-8 bg-primary/10" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">
                    {isAr ? "أكملت درس: أساسيات React" : "Completed Lesson: React Basics"}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">
                    2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
