import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Clock, ChevronDown, Play, Lock } from "lucide-react";
import { Badge } from "../../atoms/Badge";
import { Reveal } from "../../atoms/Reveal";
import { cn } from "../../../utils/cn";
import {
  type Course,
  type CurriculumSection,
  type Lesson,
} from "../../../types";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../constants/routes";

interface CurriculumProps {
  course: Course;
  id: string | undefined;
  isEnrolled: boolean;
}

export const Curriculum = ({ course, id, isEnrolled }: CurriculumProps) => {
  const { t } = useTranslation();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [selectedDuration, setSelectedDuration] = useState<
    "all" | "short" | "medium" | "long"
  >("all");
  const [selectedAccess, setSelectedAccess] = useState<
    "all" | "free" | "locked"
  >("all");

  return (
    <Reveal>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
              {t("course_details.curriculum")}
            </Badge>
            <h2 className="text-5xl font-black text-white">
              {t("course_details.curriculum_title")}
            </h2>
            <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
              {t("course_details.curriculum_desc")}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="px-6 py-3 rounded-2xl bg-[#0B0F19] shadow-inner text-sm font-black flex items-center gap-3">
              <span className="text-primary text-xl">
                {course.curriculum?.length || 0}
              </span>
              <span className="text-slate-500 uppercase tracking-tighter text-[10px]">
                {t("course_details.sections_label")}
              </span>
            </div>
            <div className="px-6 py-3 rounded-2xl bg-[#0B0F19] shadow-inner text-sm font-black flex items-center gap-3">
              <span className="text-primary text-xl">
                {course.curriculum?.reduce(
                  (acc, section) => acc + section.lessons.length,
                  0
                ) || 0}
              </span>
              <span className="text-slate-500 uppercase tracking-tighter text-[10px]">
                {t("course_details.lessons_label")}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center justify-between bg-white/5 p-4 md:p-6 rounded-[2rem] border border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                {t("course_details.filters.duration_title")}
              </span>
              <div className="flex flex-wrap gap-2">
                {(["all", "short", "medium", "long"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDuration(d)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-black border transition-all",
                      selectedDuration === d
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/20"
                    )}
                  >
                    {t(`course_details.filters.duration_${d}`)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                {t("course_details.filters.access_title")}
              </span>
              <div className="flex flex-wrap gap-2">
                {(["all", "free", "locked"] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedAccess(a)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-black border transition-all",
                      selectedAccess === a
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/20"
                    )}
                  >
                    {t(`course_details.filters.access_${a}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {course.curriculum?.map((section: CurriculumSection, idx: number) => (
            <motion.div
              key={idx}
              layout
              className={cn(
                "group/acc bg-card/20 backdrop-blur-2xl border-2 rounded-[2.5rem] overflow-hidden transition-all duration-500",
                activeAccordion === idx
                  ? "border-primary/40 bg-card/40 shadow-2xl shadow-primary/5"
                  : "border-white/5 hover:border-white/20"
              )}
            >
              <button
                onClick={() =>
                  setActiveAccordion(activeAccordion === idx ? null : idx)
                }
                className="w-full flex items-center justify-between p-10 text-right transition-all"
              >
                <div className="flex items-center gap-8">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl transition-all duration-700",
                      activeAccordion === idx
                        ? "bg-primary text-white scale-110 shadow-2xl shadow-primary/40 rotate-6"
                        : "bg-white/5 text-slate-500 group-hover/acc:bg-white/10 group-hover/acc:text-slate-300"
                    )}
                  >
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>
                  <div className="text-right">
                    <h3
                      className={cn(
                        "font-black text-2xl mb-2 transition-colors duration-500",
                        activeAccordion === idx
                          ? "text-white"
                          : "text-slate-800 group-hover/acc:text-slate-500"
                      )}
                    >
                      {section.title}
                    </h3>
                    <div className="flex items-center gap-6 text-xs text-slate-500 font-black uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-primary" />
                        {section.lessons.length}{" "}
                        {t("course_details.lessons_label")}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {section.duration || "45m"}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border",
                    activeAccordion === idx
                      ? "bg-primary/10 border-primary/20 text-primary rotate-180 shadow-inner"
                      : "bg-white/5 border-white/5 text-slate-500 group-hover/acc:bg-white/10"
                  )}
                >
                  <ChevronDown className="w-6 h-6" />
                </div>
              </button>

              <AnimatePresence>
                {activeAccordion === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-10 pb-10 space-y-4">
                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
                      {section.lessons
                        .filter((lesson: Lesson) => {
                          const durationNum = Number(
                            (lesson.duration || "0")
                              .toString()
                              .replace(/[^0-9]/g, "")
                          );
                          const durationOk =
                            selectedDuration === "all" ||
                            (selectedDuration === "short" &&
                              durationNum <= 10) ||
                            (selectedDuration === "medium" &&
                              durationNum > 10 &&
                              durationNum <= 30) ||
                            (selectedDuration === "long" && durationNum > 30);
                          const accessOk =
                            selectedAccess === "all" ||
                            (selectedAccess === "free" && !!lesson.free) ||
                            (selectedAccess === "locked" &&
                              !isEnrolled &&
                              !lesson.free);
                          return durationOk && accessOk;
                        })
                        .map((lesson: Lesson, lIdx: number) => {
                          const hasAccess = isEnrolled || lesson.free;
                          const lessonLink = ROUTES.LESSON.replace(
                            ":courseId",
                            id || "1"
                          ).replace(":lessonId", lesson.id);

                          return (
                            <div key={lIdx} className="group/lesson">
                              {hasAccess ? (
                                <Link
                                  to={lessonLink}
                                  className="flex items-center justify-between p-6 rounded-[1.75rem] bg-white/[0.02] hover:bg-primary/10 border border-white/5 hover:border-primary/20 transition-all duration-500 group/link"
                                >
                                  <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-500 shadow-sm">
                                      <Play className="w-5 h-5 fill-current" />
                                    </div>
                                    <span className="font-black text-lg text-slate-300 group-hover/link:text-white transition-colors">
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-8">
                                    {!isEnrolled && lesson.free && (
                                      <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest">
                                        {t("course_details.free_label")}
                                      </Badge>
                                    )}
                                    <span className="text-sm font-black text-slate-500 tabular-nums">
                                      {lesson.duration || "12:45"}
                                    </span>
                                  </div>
                                </Link>
                              ) : (
                                <div className="flex items-center justify-between p-6 rounded-[1.75rem] bg-white/[0.01] border border-white/[0.02] opacity-60">
                                  <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 text-slate-500 flex items-center justify-center">
                                      <Lock className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-lg text-slate-500">
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-8">
                                    <span className="text-sm font-black text-slate-600 tabular-nums">
                                      {lesson.duration || "12:45"}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};
