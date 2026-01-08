import { useTranslation } from "react-i18next";
import { Users, TrendingUp, Bell, Calendar, Clock, BookOpen, CreditCard, ArrowRight, Star } from "lucide-react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { Badge } from "../../../components/atoms/Badge";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const ParentDashboard = ({ user }: { user: any }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const children = [
    { 
      id: 1,
      name: isAr ? "أحمد محمد" : "Ahmed Mohamed", 
      grade: isAr ? "الصف العاشر" : "Grade 10", 
      progress: 85, 
      lastActivity: isAr ? "منذ ساعتين" : "2 hours ago",
      avatar: "A",
      courses: 4,
      points: 1250
    },
    { 
      id: 2,
      name: isAr ? "سارة محمد" : "Sarah Mohamed", 
      grade: isAr ? "الصف الثامن" : "Grade 8", 
      progress: 92, 
      lastActivity: isAr ? "منذ 5 ساعات" : "5 hours ago",
      avatar: "S",
      courses: 3,
      points: 1800
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-[2rem] border border-primary/10">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tight">{t("dashboard.welcome", { name: user?.name || (isAr ? "ولي الأمر" : "Parent") })}</h2>
          <p className="text-muted-foreground font-medium text-lg">{t("dashboard.parent_title")}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="rounded-2xl font-black h-14 px-8 shadow-lg shadow-primary/20">
            {isAr ? "إضافة ابن جديد" : "Add New Child"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Children Progress */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              {t("dashboard.children_progress")}
            </h3>
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full font-bold">
              {children.length} {isAr ? "أبناء" : "Children"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {children.map((child, index) => (
              <Card key={child.id} className="p-8 border-2 hover:border-primary/20 transition-all group overflow-hidden relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary font-black text-3xl border-2 border-primary/20 group-hover:scale-105 transition-transform">
                      {child.avatar}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-2xl group-hover:text-primary transition-colors">{child.name}</h4>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="font-bold">{child.grade}</Badge>
                        <span className="text-sm text-muted-foreground font-bold flex items-center gap-1">
                          <Clock size={14} />
                          {child.lastActivity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">{isAr ? "الدورات" : "Courses"}</p>
                      <p className="text-xl font-black">{child.courses}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">{isAr ? "النقاط" : "Points"}</p>
                      <p className="text-xl font-black text-yellow-600 flex items-center gap-1 justify-center">
                        <Star size={16} fill="currentColor" />
                        {child.points}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-black">
                    <span className="uppercase tracking-wider">{t("dashboard.overall_progress")}</span>
                    <span className="text-primary">{child.progress}%</span>
                  </div>
                  {/* <div className="h-4 w-full bg-secondary rounded-full overflow-hidden p-1 border border-secondary">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${child.progress}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.2 }}
                      className="h-full bg-primary rounded-full relative shadow-sm"
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse" />
                    </motion.div>
                  </div> */}
                </div>

                <div className="mt-8 pt-6 border-t border-secondary flex items-center justify-between">
                  <Button variant="ghost" className="font-black gap-2 hover:bg-primary/5 hover:text-primary transition-colors">
                    {isAr ? "عرض التقارير التفصيلية" : "View Detailed Reports"}
                    <ArrowRight size={18} className={cn(isAr && "rotate-180")} />
                  </Button>
                  <Button variant="outline" className="rounded-xl border-2 font-black">
                    {isAr ? "تواصل مع المعلمين" : "Contact Teachers"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Activities & Payments */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Bell className="w-7 h-7 text-primary" />
              {t("dashboard.recent_activities")}
            </h3>
            <Card className="p-6 border-2 divide-y-2 divide-secondary">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="py-6 first:pt-0 last:pb-0 group cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-3 h-3 mt-1.5 rounded-full bg-primary shrink-0 group-hover:scale-125 transition-transform" />
                    <div className="space-y-2">
                      <p className="text-sm font-black leading-snug group-hover:text-primary transition-colors">
                        {t("dashboard.activities.completed_lesson", { 
                          name: i % 2 === 0 ? (isAr ? "أحمد" : "Ahmed") : (isAr ? "سارة" : "Sarah"), 
                          course: i % 2 === 0 ? (isAr ? "الرياضيات" : "Mathematics") : (isAr ? "العلوم" : "Science") 
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground font-bold flex items-center gap-2">
                        <Clock size={14} />
                        {i * 15} {t("dashboard.minutes_ago")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
            <Button variant="ghost" className="w-full font-black border-2 border-dashed border-secondary hover:border-primary/20 hover:bg-primary/5 rounded-2xl py-6">
              {isAr ? "عرض جميع الأنشطة" : "View All Activities"}
            </Button>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <CreditCard className="w-7 h-7 text-primary" />
              {isAr ? "الاشتراكات والمدفوعات" : "Subscriptions"}
            </h3>
            <Card className="p-8 border-2 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/10 relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-500 text-white border-none font-bold px-3 py-1">
                    {isAr ? "نشط" : "Active"}
                  </Badge>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{isAr ? "خطة الاشتراك" : "Plan"}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-2xl">{isAr ? "الباقة العائلية" : "Family Plan"}</h4>
                  <p className="text-sm font-bold text-muted-foreground">{isAr ? "تجديد في 24 يناير 2024" : "Renews on Jan 24, 2024"}</p>
                </div>
                <Button className="w-full font-black rounded-xl bg-green-600 hover:bg-green-700">
                  {isAr ? "إدارة الاشتراك" : "Manage Subscription"}
                </Button>
              </div>
              <div className="absolute -bottom-10 -right-10 text-green-500/5 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                <CreditCard size={160} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

