import { useTranslation } from "react-i18next";
import { Users, Search, Filter, MoreHorizontal, UserPlus, Mail, Shield, Trash2, Edit2 } from "lucide-react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { Badge } from "../../../components/atoms/Badge";
import { Input } from "../../../components/atoms/Input";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const AdminUsers = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const users = [
    { id: 1, name: "Ahmed Ali", email: "ahmed@example.com", role: "student", status: "active", joined: "2023-10-12" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "instructor", status: "active", joined: "2023-09-05" },
    { id: 3, name: "John Doe", email: "john@example.com", role: "parent", status: "inactive", joined: "2023-11-20" },
    { id: 4, name: "Admin User", email: "admin@example.com", role: "admin", status: "active", joined: "2023-01-01" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">{t("dashboard.admin.users.title")}</h2>
          <p className="text-muted-foreground font-medium">{isAr ? "إدارة جميع المستخدمين في المنصة" : "Manage all users in the platform"}</p>
        </div>
        <Button className="rounded-xl font-black px-6 gap-2">
          <UserPlus size={18} />
          {t("dashboard.admin.users.add_user")}
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="p-4 border-2 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            className={cn("rounded-xl border-2 pr-10", isAr ? "pr-10" : "pl-10")} 
            placeholder={t("common.search")} 
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl font-bold gap-2">
            <Filter size={18} />
            {isAr ? "تصفية" : "Filter"}
          </Button>
          <Button variant="outline" className="rounded-xl font-bold gap-2">
            {isAr ? "تصدير CSV" : "Export CSV"}
          </Button>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="border-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right" dir={isAr ? "rtl" : "ltr"}>
            <thead className="bg-secondary/30 border-b border-secondary">
              <tr>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "المستخدم" : "User"}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "الرتبة" : "Role"}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "الحالة" : "Status"}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest">{isAr ? "تاريخ الانضمام" : "Joined"}</th>
                <th className="px-6 py-4 text-sm font-black text-muted-foreground uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {users.map((user, index) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-secondary/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/20">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <Mail size={12} />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={cn("rounded-lg font-bold", 
                      user.role === "admin" ? "bg-red-500/10 text-red-600 border-red-500/20" :
                      user.role === "instructor" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                      "bg-secondary text-muted-foreground"
                    )}>
                      {t(`auth.${user.role}`)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", user.status === "active" ? "bg-green-500" : "bg-zinc-400")} />
                      <span className="text-sm font-bold">{isAr ? (user.status === "active" ? "نشط" : "غير نشط") : user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-muted-foreground">{user.joined}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary/10 hover:text-primary">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-xl hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <MoreHorizontal size={18} />
                      </Button>
                    </div>
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
