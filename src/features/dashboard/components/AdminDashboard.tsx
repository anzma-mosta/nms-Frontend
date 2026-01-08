import { useTranslation } from "react-i18next";
import { Users, BookOpen, DollarSign, UserCheck, TrendingUp, ArrowUpRight, Search, Filter, MoreHorizontal, Download } from "lucide-react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { Badge } from "../../../components/atoms/Badge";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const AdminDashboard = ({ user }: { user: any }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const stats = [
    { label: t("dashboard.admin.stats.total_users"), value: "12,450", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12%" },
    { label: t("dashboard.admin.stats.active_courses"), value: "84", icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10", trend: "+5%" },
    { label: t("dashboard.admin.stats.total_revenue"), value: "$45,200", icon: DollarSign, color: "text-purple-500", bg: "bg-purple-500/10", trend: "+18%" },
    { label: t("dashboard.admin.stats.pending_instructors"), value: "12", icon: UserCheck, color: "text-yellow-500", bg: "bg-yellow-500/10", trend: "-2%" },
  ];

  const recentTransactions = [
    { id: "TX-9012", user: "Ahmed Ali", course: "Python Masterclass", amount: "$49.99", date: "2 mins ago", status: "completed" },
    { id: "TX-9011", user: "Sarah Smith", course: "UI/UX Design", amount: "$59.99", date: "15 mins ago", status: "completed" },
    { id: "TX-9010", user: "John Doe", course: "React for Beginners", amount: "$39.99", date: "1 hour ago", status: "pending" },
    { id: "TX-9009", user: "Mona Hassan", course: "Data Science", amount: "$89.99", date: "3 hours ago", status: "completed" },
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">{t("dashboard.admin.title")}</h2>
          <p className="text-muted-foreground font-medium">{isAr ? "نظرة عامة على أداء المنصة" : "General overview of platform performance"}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold gap-2">
            <Download size={18} />
            {isAr ? "تصدير التقارير" : "Export Reports"}
          </Button>
          <Button className="rounded-xl font-black px-6">
            {isAr ? "إدارة الإعدادات" : "Manage Settings"}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 border-2 hover:border-primary/20 transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-4 rounded-2xl", stat.bg, stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div className={cn("text-xs font-black px-2 py-1 rounded-lg", 
                  stat.trend.startsWith("+") ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                )}>
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black tracking-tight">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity / Transactions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black">{isAr ? "آخر العمليات" : "Recent Transactions"}</h3>
            <Button variant="ghost" className="font-bold text-primary">
              {t("home.view_all")}
            </Button>
          </div>
          <Card className="border-2 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right" dir={isAr ? "rtl" : "ltr"}>
                <thead className="bg-secondary/30 border-b border-secondary">
                  <tr>
                    <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "العملية" : "ID"}</th>
                    <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "المستخدم" : "User"}</th>
                    <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "المبلغ" : "Amount"}</th>
                    <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "الحالة" : "Status"}</th>
                    <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary">
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="px-6 py-4 font-bold text-sm">{tx.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-black text-sm">{tx.user}</p>
                        <p className="text-xs text-muted-foreground font-medium">{tx.course}</p>
                      </td>
                      <td className="px-6 py-4 font-black text-sm">{tx.amount}</td>
                      <td className="px-6 py-4">
                        <Badge variant={tx.status === "completed" ? "success" : "warning"} className="rounded-lg font-bold">
                          {isAr ? (tx.status === "completed" ? "مكتمل" : "معلق") : tx.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-left">
                        <Button variant="ghost" size="sm" className="rounded-xl">
                          <MoreHorizontal size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Top Performing Courses */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black">{isAr ? "الأكثر مبيعاً" : "Top Courses"}</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 border-2 hover:border-primary/20 transition-all flex items-center gap-4 group cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-secondary overflow-hidden shrink-0">
                  <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop`} alt="Course" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-sm line-clamp-1 group-hover:text-primary transition-colors">
                    {i === 1 ? (isAr ? "بايثون للذكاء الاصطناعي" : "Python for AI") : (isAr ? "تصميم واجهات UI/UX" : "UI/UX Design")}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs font-bold text-muted-foreground">
                    <span className="flex items-center gap-1"><Users size={12} /> 120</span>
                    <span className="flex items-center gap-1 text-green-600"><TrendingUp size={12} /> +15%</span>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full rounded-2xl font-black py-6 border-dashed">
            {isAr ? "عرض جميع التقارير" : "View All Reports"}
          </Button>
        </div>
      </div>
    </div>
  );
};
