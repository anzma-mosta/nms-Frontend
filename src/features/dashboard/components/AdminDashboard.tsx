import { useTranslation } from "react-i18next";
import { Users, BookOpen, GraduationCap, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Bell, Search } from "lucide-react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { cn } from "../../../utils/cn";

export const AdminDashboard = ({ user }: { user: any }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const stats = [
    {
      label: isAr ? "إجمالي الطلاب" : "Total Students",
      value: "2,543",
      trend: "+12.5%",
      isPositive: true,
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: isAr ? "الكورسات النشطة" : "Active Courses",
      value: "45",
      trend: "+3.2%",
      isPositive: true,
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: isAr ? "إجمالي الإيرادات" : "Total Revenue",
      value: "$45,230",
      trend: "+15.8%",
      isPositive: true,
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: isAr ? "المعلمون الجدد" : "New Instructors",
      value: "12",
      trend: "-2.4%",
      isPositive: false,
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            {isAr ? `لوحة التحكم، ${user?.name}` : `Dashboard, ${user?.name}`}
          </h1>
          <p className="text-muted-foreground font-medium">
            {isAr ? "نظرة عامة على أداء الأكاديمية اليوم" : "Overview of academy performance today"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder={isAr ? "بحث..." : "Search..."}
              className="h-12 pl-12 pr-6 rounded-2xl bg-background border-2 border-primary/5 focus:border-primary/20 outline-none w-64 transition-all font-medium"
            />
          </div>
          <Button variant="outline" className="h-12 w-12 rounded-2xl p-0 glass border-2 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
          </Button>
          <Button className="h-12 rounded-2xl px-8 font-bold shadow-lg shadow-primary/20">
            {isAr ? "إضافة كورس" : "Add Course"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-8 glass border-2 border-transparent hover:border-primary/10 transition-all duration-500 rounded-[2.5rem]">
            <div className="flex justify-between items-start mb-6">
              <div className={cn("p-4 rounded-2xl", stat.bg)}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-black px-2 py-1 rounded-lg",
                stat.isPositive ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
              )}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-black">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 glass border-2 rounded-[3rem] relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black tracking-tight">
              {isAr ? "أداء المبيعات" : "Sales Performance"}
            </h2>
            <div className="flex items-center gap-2">
              <select className="bg-background border-2 border-primary/5 rounded-xl px-4 py-2 text-sm font-bold outline-none">
                <option>{isAr ? "آخر 7 أيام" : "Last 7 Days"}</option>
                <option>{isAr ? "آخر 30 يوم" : "Last 30 Days"}</option>
              </select>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  className="w-full bg-primary/20 group-hover:bg-primary/40 transition-all rounded-t-xl" 
                  style={{ height: `${h}%` }}
                />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ${h * 120}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </Card>

        <Card className="p-10 glass border-2 rounded-[3rem] relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black tracking-tight">
              {isAr ? "أحدث الطلاب" : "Recent Students"}
            </h2>
            <TrendingUp className="text-primary w-6 h-6" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">
                      {isAr ? "محمد علي" : "Mohamed Ali"}
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-black uppercase">
                      2 mins ago
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-primary">$99.99</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-8 rounded-2xl font-black text-primary hover:bg-primary/5 uppercase tracking-widest text-xs">
            {isAr ? "مشاهدة جميع الطلاب" : "View All Students"}
          </Button>
        </Card>
      </div>
    </div>
  );
};
