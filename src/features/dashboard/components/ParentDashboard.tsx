import { useTranslation } from "react-i18next";
import { Users, TrendingUp, Bell, Calendar, Clock, CreditCard, ArrowRight } from "lucide-react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { cn } from "../../../utils/cn";

export const ParentDashboard = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const stats = [
    {
      label: isAr ? "الأبناء المسجلين" : "Enrolled Children",
      value: "2",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: isAr ? "متوسط التقدم" : "Average Progress",
      value: "75%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: isAr ? "الشهادات المحصلة" : "Certificates Earned",
      value: "4",
      icon: <Clock className="w-6 h-6" />,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  const children = [
    {
      name: isAr ? "أحمد محمد" : "Ahmed Mohamed",
      grade: isAr ? "الصف العاشر" : "Grade 10",
      progress: 85,
      lastActive: "2 hours ago",
      avatar: "https://i.pravatar.cc/150?u=a",
    },
    {
      name: isAr ? "سارة محمد" : "Sara Mohamed",
      grade: isAr ? "الصف الثامن" : "Grade 8",
      progress: 65,
      lastActive: "5 hours ago",
      avatar: "https://i.pravatar.cc/150?u=s",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            {isAr ? "مرحباً بك ولي الأمر" : "Welcome, Parent"}
          </h1>
          <p className="text-muted-foreground font-medium">
            {isAr ? "تابع تقدم أبنائك التعليمي" : "Monitor your children's learning progress"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl h-12 gap-2 glass border-2">
            <Calendar className="w-4 h-4" />
            <span className="font-bold">{isAr ? "الجدول الزمني" : "Schedule"}</span>
          </Button>
          <Button className="rounded-2xl h-12 gap-2 shadow-lg shadow-primary/20 font-bold">
            <Bell className="w-4 h-4" />
            <span className="font-bold">{isAr ? "التنبيهات" : "Notifications"}</span>
          </Button>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-10 glass border-2 rounded-[3rem] overflow-hidden relative">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black tracking-tight">
              {isAr ? "تقدم الأبناء" : "Children's Progress"}
            </h2>
            <Button variant="ghost" size="sm" className="rounded-xl font-bold text-primary">
              {isAr ? "عرض الكل" : "View All"}
              <ArrowRight className={cn("w-4 h-4 ml-2", isAr && "rotate-180")} />
            </Button>
          </div>

          <div className="space-y-8">
            {children.map((child) => (
              <div key={child.name} className="group cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img src={child.avatar} alt={child.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/10" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-lg group-hover:text-primary transition-colors">{child.name}</h4>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">{child.grade}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-primary">{child.progress}%</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-primary/5 rounded-full overflow-hidden border border-primary/5">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${child.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-10 glass border-2 rounded-[3rem] overflow-hidden relative">
          <h2 className="text-2xl font-black tracking-tight mb-10">
            {isAr ? "الفواتير الأخيرة" : "Recent Payments"}
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-background/50 border border-primary/5 hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-secondary/10 text-secondary group-hover:scale-110 transition-transform">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{isAr ? "دورة البرمجة الشاملة" : "Full Stack Course"}</h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">12 Jan 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-foreground">$149.99</p>
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">{isAr ? "مكتمل" : "Paid"}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
