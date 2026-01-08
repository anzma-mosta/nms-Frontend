import { useTranslation } from "react-i18next";
import { Play, Lock, Settings, Maximize2, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../atoms/Button";
import type { Lesson as LessonType, Course } from "../../../types";

interface LessonVideoPlayerProps {
  currentLesson: LessonType;
  course: Course;
}

export const LessonVideoPlayer = ({
  currentLesson,
  course,
}: LessonVideoPlayerProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative group max-w-6xl mx-auto mt-4 px-4">
      <div className="aspect-video relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black">
        {/* Mock Video Player Interface */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-transparent to-black/40">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-white/20 cursor-pointer group/play"
          >
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/40 group-hover/play:bg-primary/90 transition-colors">
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            </div>
          </motion.div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/90 to-transparent">
            {/* Progress Bar */}
            <div className="relative h-1.5 w-full bg-white/20 rounded-full cursor-pointer">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-primary rounded-full">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="text-white hover:text-primary transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </button>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-white" />
                  <div className="w-20 h-1 bg-white/20 rounded-full">
                    <div className="h-full w-3/4 bg-white rounded-full" />
                  </div>
                </div>
                <span className="text-xs font-medium text-white/80 tabular-nums">
                  12:45 / 45:20
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-white hover:text-primary transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="text-white hover:text-primary transition-colors">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for Locked Lessons */}
        {!currentLesson.isPreview && !course.isPurchased && (
          <div className="absolute inset-0 bg-[#0B0F19]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center z-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 shadow-2xl shadow-primary/10"
            >
              <Lock className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              {t("lesson.locked_title")}
            </h2>
            <p className="text-white/50 max-w-md mb-10 text-lg leading-relaxed">
              {t("lesson.locked_desc")}
            </p>
            <Button
              size="lg"
              className="px-12 py-7 rounded-2xl text-lg font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
            >
              {t("course.enroll_now")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
