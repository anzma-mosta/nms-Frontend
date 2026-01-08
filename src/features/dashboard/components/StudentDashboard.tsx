import { useTranslation } from "react-i18next";
import { BookOpen, Clock, CheckCircle, Play, Calendar, Star, TrendingUp, ArrowUpRight, GraduationCap } from "lucide-react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { Badge } from "../../../components/atoms/Badge";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const StudentDashboard = ({ user }: { user: any }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const stats = [
    { label: t("dashboard.stats.completed_courses"), value: "12", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", path: ROUTES.DASHBOARD_COURSES },
    { label: t("dashboard.stats.in_progress"), value: "3", icon: Play, color: "text-blue-500", bg: "bg-blue-500/10", path: ROUTES.DASHBOARD_COURSES },
    { label: t("dashboard.stats.total_hours"), value: "48h", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10", path: ROUTES.DASHBOARD_REPORTS },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tight">{t("dashboard.welcome", { name: user?.name || (isAr ? "أحمد" : "Ahmed") })}</h2>
          <p className="text-muted-foreground font-medium text-lg">{t("dashboard.student_title")}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to={ROUTES.DASHBOARD_REPORTS} className="bg-background p-4 rounded-2xl shadow-sm border border-secondary flex items-center gap-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{isAr ? "النقاط" : "Points"}</p>
              <p className="text-xl font-black">2,450</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.path}>
            <Card className="p-8 flex items-center gap-6 border-2 hover:border-primary/20 transition-all group relative overflow-hidden h-full">
              <div className={cn("p-5 rounded-2xl transition-transform group-hover:scale-110 duration-300", stat.bg, stat.color)}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black tracking-tight">{stat.value}</p>
              </div>
              <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/40 transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content - Courses */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-black">{t("dashboard.my_courses")}</h3>
              <p className="text-sm text-muted-foreground font-medium">{isAr ? "تابع تقدمك في الدورات المشترك بها" : "Keep track of your learning progress"}</p>
            </div>
            <Link to={ROUTES.DASHBOARD_COURSES}>
              <Button variant="outline" className="font-bold rounded-xl border-2">
                {t("home.view_all")}
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden border-2 group hover:border-primary/20 transition-all flex flex-col">
                <div className="aspect-video bg-secondary/30 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 backdrop-blur-[2px]">
                    <Link to={ROUTES.DASHBOARD_COURSES}>
                      <Button className="rounded-2xl px-6 font-black gap-2">
                        <Play size={18} fill="currentColor" />
                        {isAr ? "مواصلة التعلم" : "Continue Learning"}
                      </Button>
                    </Link>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-primary/90 text-zinc-700 backdrop-blur-md border-none font-bold py-1.5 px-3">
                    {isAr ? "برمجة" : "Programming"}
                  </Badge>
                </div>
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <h4 className="font-black text-xl leading-tight group-hover:text-primary transition-colors">
                    {i === 1 
                      ? (isAr ? "أساسيات لغة بايثون للذكاء الاصطناعي" : "Python Essentials for AI")
                      : (isAr ? "تصميم واجهات المستخدم باستخدام Figma" : "UI/UX Design with Figma")}
                  </h4>
                  <div className="mt-auto space-y-3">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-muted-foreground">{t("dashboard.completed")}</span>
                      <span className="text-primary">{i * 35}%</span>
                    </div>
                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${i * 35}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full" 
                      />
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground pt-2">
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={14} />
                        12/24 {t("dashboard.lessons")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        14h {isAr ? "متبقية" : "left"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar - Schedule & Activities */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-black">{isAr ? "الجدول اليومي" : "Daily Schedule"}</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex flex-col items-center justify-center border-2 border-transparent group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
                      <span className="text-xs font-black text-primary uppercase">Jan</span>
                      <span className="text-lg font-black leading-none">{10 + i}</span>
                    </div>
                    {i !== 3 && <div className="w-0.5 h-full bg-secondary my-2" />}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-black group-hover:text-primary transition-colors">
                      {i === 1 ? (isAr ? "محاضرة الرياضيات" : "Math Lecture") : (isAr ? "اختبار البرمجة" : "Programming Quiz")}
                    </p>
                    <p className="text-xs font-bold text-muted-foreground mt-1 flex items-center gap-2">
                      <Clock size={12} />
                      10:00 AM - 11:30 AM
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link to={ROUTES.DASHBOARD_EXAMS}>
              <Button variant="ghost" className="w-full font-black border-2 border-dashed border-secondary hover:border-primary/20 hover:bg-primary/5 rounded-2xl py-6">
                {isAr ? "عرض الجدول كاملاً" : "View Full Schedule"}
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black">{isAr ? "الشهادات" : "Certificates"}</h3>
            <Card className="p-6 border-2 bg-linear-to-br from-primary/5 to-transparent border-primary/10 relative overflow-hidden group cursor-pointer">
              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h4 className="font-black text-lg">{isAr ? "شهادة إتمام بايثون" : "Python Completion"}</h4>
                  <p className="text-sm font-bold text-muted-foreground mt-1">{isAr ? "تم الحصول عليها في 5 يناير" : "Earned on Jan 5"}</p>
                </div>
                <Link to={ROUTES.DASHBOARD_REPORTS}>
                  <Button size="sm" className="font-bold gap-2 rounded-xl">
                    {isAr ? "عرض الشهادة" : "View Certificate"}
                    <ArrowUpRight size={16} />
                  </Button>
                </Link>
              </div>
              <div className="absolute -bottom-6 -right-6 text-primary/5 group-hover:text-primary/10 transition-colors transform group-hover:scale-110 duration-500">
                <GraduationCap size={120} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

