import { useTranslation } from "react-i18next";
import {
  X,
  CheckCircle,
  PlayCircle,
  Circle,
  Lock,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import type {
  Course,
  CurriculumSection,
  Lesson as LessonType,
} from "../../../types";

interface LessonSidebarProps {
  course: Course;
  lessonId: string | undefined;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  expandedSections: number[];
  toggleSection: (idx: number) => void;
  handleLessonChange: (lessonId: string) => void;
  navigation: {
    current: number;
    total: number;
  };
}

export const LessonSidebar = ({
  course,
  lessonId,
  isSidebarOpen,
  setIsSidebarOpen,
  expandedSections,
  toggleSection,
  handleLessonChange,
  navigation,
}: LessonSidebarProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Mobile Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />

          <motion.aside
            initial={isAr ? { x: "100%" } : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={isAr ? { x: "100%" } : { x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className={cn(
              "fixed lg:relative top-0 bottom-0 w-[85%] sm:w-[400px] lg:w-[450px] bg-[#0F1420] border-white/10 z-[101] flex flex-col shadow-2xl overflow-hidden",
              isAr ? "right-0 lg:border-l" : "left-0 lg:border-r"
            )}
          >
            {/* Sidebar Header */}
            <div className="p-8 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {t("lesson.course_content")}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white/60"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Global Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-white/40">{t("lesson.progress")}</span>
                  <span className="text-primary">
                    {Math.round((navigation.current / navigation.total) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(navigation.current / navigation.total) * 100}%`,
                    }}
                    className="h-full bg-gradient-to-r from-primary to-blue-400"
                  />
                </div>
                <p className="text-[10px] text-white/30 font-medium">
                  {navigation.current} / {navigation.total}{" "}
                  {t("lesson.resources").toLowerCase()}
                </p>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              <div className="space-y-4">
                {course.curriculum?.map(
                  (section: CurriculumSection, sIdx: number) => (
                    <div key={sIdx} className="space-y-2">
                      <button
                        onClick={() => toggleSection(sIdx)}
                        className={cn(
                          "w-full flex items-center justify-between p-5 rounded-2xl transition-all group",
                          expandedSections.includes(sIdx)
                            ? "bg-white/5 text-white"
                            : "hover:bg-white/[0.02] text-white/60"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all",
                              expandedSections.includes(sIdx)
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-white/5 text-white/40 group-hover:text-white/60"
                            )}
                          >
                            {sIdx + 1}
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-sm leading-tight group-hover:text-white transition-colors">
                              {section.title}
                            </h3>
                            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">
                              {section.lessons.length} Lessons • 45m
                            </p>
                          </div>
                        </div>
                        {expandedSections.includes(sIdx) ? (
                          <ChevronUp className="w-4 h-4 text-white/40" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/40" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedSections.includes(sIdx) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden px-2 space-y-1"
                          >
                            {section.lessons.map(
                              (lesson: LessonType, lIdx: number) => {
                                const isActive = lesson.id === lessonId;
                                const isCompleted = lIdx < 2; // Mock completed state

                                return (
                                  <button
                                    key={lesson.id}
                                    onClick={() =>
                                      handleLessonChange(lesson.id)
                                    }
                                    className={cn(
                                      "w-full flex items-center gap-4 p-4 rounded-xl transition-all group relative",
                                      isActive
                                        ? "bg-primary/10 text-primary"
                                        : "hover:bg-white/[0.03] text-white/50 hover:text-white"
                                    )}
                                  >
                                    {isActive && (
                                      <motion.div
                                        layoutId="activeLessonIndicator"
                                        className={cn(
                                          "absolute top-0 bottom-0 w-1 bg-primary rounded-full",
                                          isAr ? "right-0" : "left-0"
                                        )}
                                      />
                                    )}

                                    <div className="shrink-0">
                                      {isCompleted ? (
                                        <CheckCircle className="w-5 h-5 text-green-500 fill-green-500/10" />
                                      ) : isActive ? (
                                        <PlayCircle className="w-5 h-5 text-primary fill-primary/10" />
                                      ) : (
                                        <Circle className="w-5 h-5 text-white/10 group-hover:text-white/30 transition-colors" />
                                      )}
                                    </div>

                                    <div className="flex-1 text-left min-w-0">
                                      <p
                                        className={cn(
                                          "text-xs font-medium truncate transition-colors",
                                          isActive
                                            ? "text-primary"
                                            : "text-white/60 group-hover:text-white"
                                        )}
                                      >
                                        {lesson.title}
                                      </p>
                                      <p className="text-[10px] text-white/30 font-bold mt-1 uppercase tracking-widest">
                                        {lesson.duration}
                                      </p>
                                    </div>

                                    {!lesson.isPreview &&
                                      !course.isPurchased && (
                                        <Lock className="w-3.5 h-3.5 text-white/20" />
                                      )}
                                  </button>
                                );
                              }
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-8 border-t border-white/10 bg-white/[0.02]">
              <Button
                variant="outline"
                className="w-full rounded-2xl border-white/10 text-white hover:bg-white/5 h-12 font-bold flex items-center justify-center gap-3"
              >
                <CheckCircle className="w-4 h-4 text-primary" />
                {t("lesson.mark_as_complete")}
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
