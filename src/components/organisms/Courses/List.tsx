import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import { CourseCard } from "../../molecules/CourseCard";
import { cn } from "../../../utils/cn";
import { type Course } from "../../../types";

interface CoursesListProps {
  isAr: boolean;
  filteredCourses: Course[];
  viewMode: "grid" | "list";
}

export const CoursesList = ({
  isAr,
  filteredCourses,
  viewMode,
}: CoursesListProps) => {
  return (
    <div className="flex-1">
      {filteredCourses.length > 0 ? (
        <div
          className={cn(
            "grid gap-8 transition-all duration-500",
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <CourseCard
                  course={course}
                  variant={viewMode === "list" ? "horizontal" : "vertical"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 border border-white/10 rounded-[3rem] p-20 text-center"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-3xl font-black text-white mb-4">
            {isAr ? "لا توجد دورات تطابق بحثك" : "No courses found"}
          </h3>
          <p className="text-slate-400 text-lg font-medium">
            {isAr
              ? "جرب تغيير كلمات البحث أو الفلاتر المختارة"
              : "Try adjusting your search or filters"}
          </p>
        </motion.div>
      )}
    </div>
  );
};
