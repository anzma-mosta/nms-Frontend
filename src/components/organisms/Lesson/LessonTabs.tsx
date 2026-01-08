import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Info,
  FileText,
  MessageCircle,
  Star,
  Download,
  Clock,
  Circle,
  Bookmark,
  Share2,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import type { Course, Lesson as LessonType } from "../../../types";

interface LessonTabsProps {
  course: Course;
  currentLesson: LessonType;
  navigation: {
    current: number;
  };
}

export const LessonTabs = ({
  course,
  currentLesson,
  navigation,
}: LessonTabsProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<
    "overview" | "resources" | "discussions"
  >("overview");

  return (
    <div className="max-w-5xl mx-auto w-full p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              Section {navigation.current}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/40 text-xs flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {currentLesson.duration}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {currentLesson.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-2xl bg-white/5 text-white/70 hover:text-primary hover:bg-primary/10 border border-white/5 transition-all"
          >
            <Bookmark className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-2xl bg-white/5 text-white/70 hover:text-primary hover:bg-primary/10 border border-white/5 transition-all"
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-2xl bg-white/5 text-white/70 hover:text-primary hover:bg-primary/10 border border-white/5 transition-all md:hidden"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10 mb-10 flex items-center gap-10 overflow-x-auto no-scrollbar relative">
        {(
          [
            { id: "overview", label: t("lesson.overview"), icon: Info },
            { id: "resources", label: t("lesson.resources"), icon: FileText },
            {
              id: "discussions",
              label: t("lesson.discussions"),
              icon: MessageCircle,
            },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2.5 py-5 transition-all relative group",
              activeTab === tab.id
                ? "text-primary font-bold"
                : "text-white/40 hover:text-white"
            )}
          >
            <tab.icon
              className={cn(
                "w-4.5 h-4.5 transition-colors",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-white/40 group-hover:text-white"
              )}
            />
            <span className="text-sm tracking-wide">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabLesson"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-primary shadow-[0_-4px_10px_rgba(var(--primary-rgb),0.5)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-[400px]"
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    {t("lesson.about_lesson")}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-lg">
                    {course.description}
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm"
                  >
                    <h4 className="text-white font-bold mb-6 flex items-center gap-3 text-lg">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      {t("lesson.learning_objectives")}
                    </h4>
                    <ul className="space-y-4">
                      {course.learningPoints
                        ?.slice(0, 3)
                        .map((point: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-white/50 group"
                          >
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                            <span className="leading-relaxed group-hover:text-white/80 transition-colors">
                              {point}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm"
                  >
                    <h4 className="text-white font-bold mb-6 flex items-center gap-3 text-lg">
                      <Info className="w-5 h-5 text-primary" />
                      {t("lesson.instructor_notes")}
                    </h4>
                    <div className="relative">
                      <span className="absolute -top-4 -left-2 text-6xl text-white/5 font-serif">
                        "
                      </span>
                      <p className="text-sm text-white/50 leading-relaxed italic relative z-10">
                        Make sure to practice the concepts discussed in this
                        lesson. Download the starter files from the resources
                        tab to follow along and experiment with the code.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                  <h4 className="text-white font-bold mb-6 text-lg">
                    {t("course.instructor")}
                  </h4>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 overflow-hidden border border-white/10 flex items-center justify-center">
                      <Circle className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-bold">
                        {course.instructor}
                      </p>
                      <p className="text-xs text-white/40">
                        {t("instructor.role")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-white/10 text-white hover:bg-white/5"
                  >
                    {t("course.view_profile")}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">
                  {t("lesson.downloadable_resources")}
                </h3>
                <span className="text-sm text-white/40 font-medium">
                  3 {t("lesson.resources").toLowerCase()}
                </span>
              </div>
              {[
                {
                  name: "Starter Project Files",
                  type: "ZIP",
                  size: "12.5 MB",
                  color: "bg-blue-500",
                },
                {
                  name: "Lesson Transcript",
                  type: "PDF",
                  size: "1.2 MB",
                  color: "bg-red-500",
                },
                {
                  name: "Cheat Sheet: Keyboard Shortcuts",
                  type: "PDF",
                  size: "850 KB",
                  color: "bg-orange-500",
                },
              ].map((resource, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg",
                        resource.color
                      )}
                    >
                      <FileText className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg group-hover:text-primary transition-colors">
                        {resource.name}
                      </p>
                      <p className="text-sm text-white/40 uppercase font-bold tracking-widest mt-1">
                        {resource.type} • {resource.size}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-2xl bg-white/5 text-white/70 hover:text-white hover:bg-primary transition-all"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "discussions" && (
            <div className="max-w-4xl space-y-12">
              <div className="relative group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 shrink-0 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        placeholder={t("lesson.add_comment")}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 text-white text-lg focus:ring-2 focus:ring-primary/50 outline-none min-h-[150px] transition-all placeholder:text-white/20"
                      />
                      <div className="absolute bottom-4 right-4 flex items-center gap-3">
                        <Button className="rounded-xl px-8 py-3 h-auto font-bold shadow-lg shadow-primary/20">
                          {t("lesson.post_comment")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  Recent Comments
                  <span className="text-sm text-white/40 font-normal">
                    (24)
                  </span>
                </h3>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 shrink-0 overflow-hidden border border-white/10">
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 group-hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-white">Alex Johnson</h4>
                          <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">
                            {i * 2} hours ago
                          </span>
                        </div>
                        <p className="text-white/60 leading-relaxed">
                          This lesson was absolutely brilliant! The explanation
                          of the core concepts really helped me understand how
                          to structure my project. Looking forward to the next
                          part!
                        </p>
                      </div>
                      <div className="flex items-center gap-6 px-4">
                        <button className="text-xs text-primary font-bold hover:underline uppercase tracking-widest">
                          Reply
                        </button>
                        <button className="text-xs text-white/30 font-bold hover:text-white transition-colors uppercase tracking-widest">
                          Helpful (12)
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <Button
                  variant="ghost"
                  className="w-full py-8 text-white/40 hover:text-white hover:bg-white/5 rounded-[2rem] border border-dashed border-white/10"
                >
                  Load More Comments
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
