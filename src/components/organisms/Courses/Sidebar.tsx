import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Clock, Star, CheckCircle2 } from "lucide-react";
import { cn } from "../../../utils/cn";
import { type TFunction } from "i18next";

interface CoursesSidebarProps {
  isAr: boolean;
  t: TFunction;
  isSidebarOpen: boolean;
  levels: string[];
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  durations: string[];
  selectedDuration: string;
  setSelectedDuration: (duration: string) => void;
  ratings: number[];
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
}

export const CoursesSidebar = ({
  isAr,
  t,
  isSidebarOpen,
  levels,
  selectedLevel,
  setSelectedLevel,
  durations,
  selectedDuration,
  setSelectedDuration,
  ratings,
  selectedRating,
  setSelectedRating,
}: CoursesSidebarProps) => {
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.aside
          initial={{ opacity: 0, x: isAr ? 50 : -50, width: 0 }}
          animate={{ opacity: 1, x: 0, width: 320 }}
          exit={{ opacity: 0, x: isAr ? 50 : -50, width: 0 }}
          className="hidden lg:block shrink-0"
        >
          <div className="glass p-8 rounded-[2.5rem] border border-white/10 sticky top-48">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white">
                {t("courses.filter")}
              </h3>
              <button
                onClick={() => {
                  setSelectedLevel("All");
                  setSelectedDuration("All");
                  setSelectedRating(0);
                }}
                className="text-primary text-sm font-bold hover:underline"
              >
                {t("courses.filters.clear_all")}
              </button>
            </div>

            {/* Level Filter */}
            <div className="mb-8">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                {t("courses.filters.levels")}
              </h4>
              <div className="space-y-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl border transition-all font-bold text-sm",
                      selectedLevel === level
                        ? "bg-primary/10 border-primary/50 text-primary"
                        : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                    )}
                  >
                    {t(
                      `courses.filters.${level === "All" ? "all_levels" : level}`
                    )}
                    {selectedLevel === level && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div className="mb-8">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t("courses.filters.duration")}
              </h4>
              <div className="space-y-2">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl border transition-all font-bold text-sm",
                      selectedDuration === duration
                        ? "bg-primary/10 border-primary/50 text-primary"
                        : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                    )}
                  >
                    {t(
                      `courses.filters.${duration === "All" ? "all_levels" : duration}`
                    )}
                    {selectedDuration === duration && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                {t("courses.filters.rating")}
              </h4>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl border transition-all font-bold text-sm",
                      selectedRating === rating
                        ? "bg-primary/10 border-primary/50 text-primary"
                        : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {rating}+ <Star className="w-3 h-3 fill-current" />
                    </div>
                    {selectedRating === rating && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
