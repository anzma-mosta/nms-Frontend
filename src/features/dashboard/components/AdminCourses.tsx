import { useTranslation } from "react-i18next";
import { Search, Filter, Plus, Star, Users, Clock, Edit2, Trash2, Eye } from "lucide-react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { Badge } from "../../../components/atoms/Badge";
import { Input } from "../../../components/atoms/Input";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const AdminCourses = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const courses = [
    { id: 1, title: "Python Masterclass", instructor: "Dr. Ahmed Ali", students: 1250, rating: 4.8, status: "active", price: "$49.99" },
    { id: 2, title: "UI/UX Design Essentials", instructor: "Mrs. Laila Hassan", students: 850, rating: 4.9, status: "active", price: "$59.99" },
    { id: 3, title: "Advanced React", instructor: "Eng. Youssef Reda", students: 420, rating: 4.7, status: "draft", price: "$39.99" },
    { id: 4, title: "Data Science Specialization", instructor: "Dr. Sarah Kamal", students: 2100, rating: 4.6, status: "active", price: "$89.99" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">{t("dashboard.admin.courses.title")}</h2>
          <p className="text-muted-foreground font-medium">{isAr ? "إدارة وتعديل جميع الدورات التدريبية" : "Manage and edit all training courses"}</p>
        </div>
        <Button className="rounded-xl font-black px-6 gap-2">
          <Plus size={18} />
          {t("dashboard.admin.courses.create_course")}
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
            {isAr ? "التصنيف" : "Categories"}
          </Button>
          <Button variant="outline" className="rounded-xl font-bold gap-2">
            {isAr ? "الحالة" : "Status"}
          </Button>
        </div>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 border-2 hover:border-primary/20 transition-all group flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-40 h-32 rounded-2xl bg-secondary overflow-hidden shrink-0 relative">
                <img 
                  src={`https://images.unsplash.com/photo-${1500000000000 + course.id}?w=300&h=200&fit=crop`} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <Badge className={cn("absolute top-2 right-2 rounded-lg font-black text-[10px]", 
                  course.status === "active" ? "bg-green-500 text-white" : "bg-zinc-500 text-white"
                )}>
                  {course.status === "active" ? t("dashboard.admin.courses.status_active") : t("dashboard.admin.courses.status_draft")}
                </Badge>
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-black text-lg line-clamp-1 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="font-black text-primary">{course.price}</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-bold">{course.instructor}</p>
                </div>

                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <Users size={14} className="text-primary" />
                    {course.students} {isAr ? "طالب" : "Students"}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <Clock size={14} />
                    24h
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center justify-center gap-2 border-t sm:border-t-0 sm:border-l border-secondary pt-4 sm:pt-0 sm:pl-6">
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary/10 hover:text-primary flex-1 sm:flex-none w-full">
                  <Edit2 size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-blue-500/10 hover:text-blue-600 flex-1 sm:flex-none w-full">
                  <Eye size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-destructive/10 hover:text-destructive flex-1 sm:flex-none w-full">
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
