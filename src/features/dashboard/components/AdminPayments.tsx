import { useTranslation } from "react-i18next";
import { Search, Filter, MoreHorizontal, Download, ArrowUpRight, CreditCard, Wallet, Banknote, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { Badge } from "../../../components/atoms/Badge";
import { Input } from "../../../components/atoms/Input";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const AdminPayments = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const transactions = [
    { id: "TX-9012", user: "Ahmed Ali", amount: "$49.99", date: "2023-12-28 14:30", status: "completed", method: "card" },
    { id: "TX-9011", user: "Sarah Smith", amount: "$59.99", date: "2023-12-28 12:15", status: "completed", method: "wallet" },
    { id: "TX-9010", user: "John Doe", amount: "$39.99", date: "2023-12-27 18:45", status: "pending", method: "card" },
    { id: "TX-9009", user: "Mona Hassan", amount: "$89.99", date: "2023-12-27 09:20", status: "failed", method: "bank_transfer" },
  ];

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card": return <CreditCard size={14} />;
      case "wallet": return <Wallet size={14} />;
      default: return <Banknote size={14} />;
    }
  };

  const chartData = [
    { name: isAr ? "يناير" : "Jan", total: 4000 },
    { name: isAr ? "فبراير" : "Feb", total: 3000 },
    { name: isAr ? "مارس" : "Mar", total: 5000 },
    { name: isAr ? "أبريل" : "Apr", total: 4500 },
    { name: isAr ? "مايو" : "May", total: 6000 },
    { name: isAr ? "يونيو" : "Jun", total: 5500 },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight">{t("dashboard.admin.payments.title")}</h2>
          <p className="text-xs lg:text-base text-muted-foreground font-medium">
            {isAr ? "متابعة جميع العمليات المالية في المنصة" : "Track all financial transactions in the platform"}
          </p>
        </div>
        <Button variant="outline" className="rounded-xl font-black px-6 gap-2 w-full sm:w-auto">
          <Download size={18} />
          {isAr ? "تحميل التقرير" : "Download Report"}
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
        <Card className="p-4 lg:p-6 border-2 bg-green-500/5 border-green-500/10">
          <p className="text-[10px] lg:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{isAr ? "دخل اليوم" : "Today's Revenue"}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl lg:text-3xl font-black">$1,240</p>
            <div className="flex items-center text-green-600 text-[10px] lg:text-xs font-black">
              <ArrowUpRight size={12} />
              +12%
            </div>
          </div>
        </Card>
        <Card className="p-4 lg:p-6 border-2 bg-blue-500/5 border-blue-500/10">
          <p className="text-[10px] lg:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{isAr ? "دخل الشهر" : "Monthly Revenue"}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl lg:text-3xl font-black">$12,850</p>
            <div className="flex items-center text-blue-600 text-[10px] lg:text-xs font-black">
              <ArrowUpRight size={12} />
              +5%
            </div>
          </div>
        </Card>
        <Card className="p-4 lg:p-6 border-2 bg-purple-500/5 border-purple-500/10 xs:col-span-2 sm:col-span-1">
          <p className="text-[10px] lg:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{isAr ? "إجمالي العمليات" : "Total Transactions"}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl lg:text-3xl font-black">1,450</p>
            <div className="flex items-center text-purple-600 text-[10px] lg:text-xs font-black">
              <ArrowUpRight size={12} />
              +8%
            </div>
          </div>
        </Card>
      </div>

      {/* Analytics Chart */}
      <Card className="p-4 lg:p-6 border-2 overflow-hidden">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div className="space-y-1">
            <h3 className="text-base lg:text-lg font-black tracking-tight">{isAr ? "تحليلات الدخل" : "Revenue Analytics"}</h3>
            <p className="text-[10px] lg:text-xs text-muted-foreground font-bold">{isAr ? "مقارنة الدخل الشهري" : "Monthly revenue comparison"}</p>
          </div>
          <div className="flex items-center gap-1 text-primary bg-primary/10 px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg lg:rounded-xl text-[10px] lg:text-xs font-black">
            <TrendingUp size={14} />
            +15.4%
          </div>
        </div>
        <div className="h-[200px] lg:h-[300px] w-full -mr-4 lg:mr-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '2px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 900
                }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTotal)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Filters & Search */}
      <Card className="p-3 lg:p-4 border-2 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground", isAr ? "right-3" : "left-3")} size={16} />
          <Input 
            className={cn("rounded-xl border-2 text-sm h-10", isAr ? "pr-10" : "pl-10")} 
            placeholder={isAr ? "البحث..." : "Search..."} 
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl font-bold gap-2 flex-1 h-10">
            <Filter size={16} />
            {isAr ? "الحالة" : "Status"}
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl font-bold gap-2 flex-1 h-10">
            {isAr ? "الوسيلة" : "Method"}
          </Button>
        </div>
      </Card>

      {/* Transactions List/Table */}
      <Card className="border-2 overflow-hidden">
        {/* Mobile List View */}
        <div className="block lg:hidden divide-y divide-secondary">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-black text-sm">{tx.user}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{tx.id}</p>
                </div>
                <Badge variant={tx.status === "completed" ? "success" : tx.status === "pending" ? "warning" : "error"} className="rounded-lg font-bold text-[10px]">
                  {isAr ? (tx.status === "completed" ? "مكتمل" : tx.status === "pending" ? "معلق" : "فشل") : tx.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                  {getMethodIcon(tx.method)}
                  <span className="capitalize">{tx.method.replace("_", " ")}</span>
                </div>
                <div className="text-right">
                  <p className="font-black text-primary">{tx.amount}</p>
                  <p className="text-[10px] text-muted-foreground font-bold">{tx.date.split(' ')[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-right" dir={isAr ? "rtl" : "ltr"}>
            <thead className="bg-secondary/30 border-b border-secondary">
              <tr>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{t("dashboard.admin.payments.transaction_id")}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "المستخدم" : "User"}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{t("dashboard.admin.payments.amount")}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "الوسيلة" : "Method"}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{t("dashboard.admin.payments.status")}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{t("dashboard.admin.payments.date")}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {transactions.map((tx, index) => (
                <motion.tr 
                  key={tx.id}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-secondary/10 transition-colors"
                >
                  <td className="px-6 py-4 font-black text-sm">{tx.id}</td>
                  <td className="px-6 py-4 font-bold text-sm">{tx.user}</td>
                  <td className="px-6 py-4 font-black text-sm">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      {getMethodIcon(tx.method)}
                      <span className="capitalize">{tx.method.replace("_", " ")}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={tx.status === "completed" ? "success" : tx.status === "pending" ? "warning" : "error"} className="rounded-lg font-bold">
                      {isAr ? (tx.status === "completed" ? "مكتمل" : tx.status === "pending" ? "معلق" : "فشل") : tx.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-bold text-xs text-muted-foreground">{tx.date}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="rounded-xl">
                      <MoreHorizontal size={18} />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
