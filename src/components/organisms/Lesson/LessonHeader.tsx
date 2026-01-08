import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, ChevronLeft, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../atoms/Button";
import { ROUTES } from "../../../constants/routes";
import { cn } from "../../../utils/cn";
import { type Course, type Lesson as LessonType } from "../../../types";

interface LessonHeaderProps {
  course: Course;
  currentLesson: LessonType;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  navigation: {
    prev: LessonType | null;
    next: LessonType | null;
    current: number;
    total: number;
  };
  handleLessonChange: (lessonId: string) => void;
}

export const LessonHeader = ({
  course,
  currentLesson,
  isSidebarOpen,
  setIsSidebarOpen,
  navigation,
  handleLessonChange,
}: LessonHeaderProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
        <div className="hidden md:block">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-1">
            <Link
              to={ROUTES.COURSES}
              className="hover:text-primary transition-colors"
            >
              {t("courses.title")}
            </Link>
            <ChevronRight className={cn("w-3 h-3", isAr && "rotate-180")} />
            <Link
              to={ROUTES.COURSE_DETAILS.replace(":id", course.id.toString())}
              className="hover:text-primary transition-colors truncate max-w-[150px]"
            >
              {course.title}
            </Link>
          </nav>
          <h1 className="text-sm font-bold text-white truncate max-w-[200px] lg:max-w-md">
            {currentLesson.title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
              {t("lesson.progress")}
            </p>
            <p className="text-xs font-bold text-primary">
              {Math.round((navigation.current / navigation.total) * 100)}%
            </p>
          </div>
          <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(navigation.current / navigation.total) * 100}%`,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-blue-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <Button
            variant="ghost"
            size="sm"
            disabled={!navigation.prev}
            className="text-white/70 hover:text-white hover:bg-white/10 h-9"
            onClick={() =>
              navigation.prev && handleLessonChange(navigation.prev.id)
            }
          >
            {isAr ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
            <span className="hidden sm:inline mx-2">
              {t("lesson.prev_lesson")}
            </span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={!navigation.next}
            className="h-9 px-4 shadow-lg shadow-primary/20"
            onClick={() =>
              navigation.next && handleLessonChange(navigation.next.id)
            }
          >
            <span className="hidden sm:inline mx-2">
              {t("lesson.next_lesson")}
            </span>
            {isAr ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
