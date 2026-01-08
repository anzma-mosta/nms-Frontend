import { useTranslation } from "react-i18next";
import { BookOpen, PlayCircle, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  {
    id: 1,
    title: "دورة تطوير تطبيقات الويب الشاملة",
    instructor: "د. محمد شاكر",
    progress: 75,
    lessons: 48,
    completedLessons: 36,
    lastAccessed: "منذ ساعتين",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "أساسيات التصميم الجرافيكي و UI/UX",
    instructor: "أ. ليلى حسن",
    progress: 30,
    lessons: 32,
    completedLessons: 10,
    lastAccessed: "أمس",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "تعلم الآلة والذكاء الاصطناعي",
    instructor: "م. يوسف رضا",
    progress: 10,
    lessons: 54,
    completedLessons: 5,
    lastAccessed: "منذ 3 أيام",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
  },
];

export const StudentCourses = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black">{t("dashboard.sidebar.courses")}</h2>
          <p className="text-muted-foreground font-bold mt-1">تابع تقدمك في دوراتك التعليمية</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2">
            <BookOpen size={18} />
            3 دورات نشطة
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-card rounded-3xl border border-secondary overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 flex justify-between items-center">
                <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1.5">
                  <Clock size={14} />
                  {course.lastAccessed}
                </div>
              </div>
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl">
                <PlayCircle size={32} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-black text-lg line-clamp-1 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground font-bold mt-1">{course.instructor}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black">
                  <span>إكمال {course.progress}%</span>
                  <span className="text-muted-foreground">{course.completedLessons}/{course.lessons} درس</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-secondary flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-black text-muted-foreground">
                  <CheckCircle2 size={16} className="text-green-500" />
                  {course.lessons - course.completedLessons} دروس متبقية
                </div>
                <button className="text-sm font-black text-primary hover:underline">
                  متابعة الآن
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
