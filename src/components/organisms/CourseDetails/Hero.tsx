import { motion, MotionValue } from "framer-motion";
import { Zap, Globe, Calendar, Star } from "lucide-react";
import { Badge } from "../../atoms/Badge";
import { Reveal } from "../../atoms/Reveal";
import { Button } from "../../atoms/Button";
import { PlayCircle } from "lucide-react";
import { cn } from "../../../utils/cn";
import type { TFunction } from "i18next";
import type { Course } from "../../../types";

interface CourseHeroProps {
  course: Course;
  t: TFunction;
  isEnrolled: boolean;
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
}

export const CourseHero = ({
  course,
  t,
  isEnrolled,
  heroOpacity,
  heroScale,
}: CourseHeroProps) => {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-[#0B0F19] pt-32 pb-48 overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-[0.03]" />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 space-y-8">
            <Reveal>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-primary/20 text-primary border-primary/20 px-6 py-2.5 rounded-2xl text-xs font-black backdrop-blur-xl tracking-wider uppercase">
                  <Zap className="w-3.5 h-3.5 mr-2 inline" />
                  {course.level}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-white/80 border-white/10 px-6 py-2.5 rounded-2xl backdrop-blur-xl bg-white/5 font-bold text-xs"
                >
                  <Globe className="w-3.5 h-3.5 mr-2 inline text-blue-400" />
                  {course.language}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-white/80 border-white/10 px-6 py-2.5 rounded-2xl backdrop-blur-xl bg-white/5 font-bold text-xs"
                >
                  <Calendar className="w-3.5 h-3.5 mr-2 inline text-emerald-400" />
                  {t("course_details.updated")} {course.lastUpdated}
                </Badge>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-white mb-8 tracking-tight drop-shadow-2xl">
                {course.title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={cn(
                      "inline-block",
                      i === 1 &&
                        "text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-emerald-400"
                    )}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium mb-12">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-12 items-center pt-10 border-t border-white/10">
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((num: number) => (
                      <motion.div
                        key={num}
                        whileHover={{ y: -5, zIndex: 10 }}
                        className="w-14 h-14 rounded-2xl border-4 border-[#0B0F19] bg-slate-800 flex items-center justify-center overflow-hidden shadow-2xl transition-transform"
                      >
                        <img
                          src={`https://i.pravatar.cc/100?img=${num + 20}`}
                          alt="student"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                    <div className="w-14 h-14 rounded-2xl border-4 border-[#0B0F19] bg-primary flex items-center justify-center text-xs font-black text-white shadow-2xl z-10">
                      +2k
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-orange-400 mb-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              "w-4 h-4 fill-current",
                              s > Math.floor(course.rating) && "opacity-30"
                            )}
                          />
                        ))}
                      </div>
                      <span className="font-black text-xl ml-1">
                        {course.rating}
                      </span>
                    </div>
                    <p className="text-slate-500 font-bold text-sm">
                      ({course.reviews} {t("instructor.reviews")})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group cursor-pointer">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-2xl flex items-center justify-center border border-white/10 shadow-2xl group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                    <img
                      src="https://i.pravatar.cc/100?img=12"
                      className="w-12 h-12 rounded-2xl object-cover"
                      alt={course.instructor}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1 group-hover:text-primary transition-colors">
                      {t("course_details.instructor")}
                    </p>
                    <p className="font-black text-xl text-white group-hover:text-primary transition-colors">
                      {course.instructor}
                    </p>
                  </div>
                </div>
              </div>

              {isEnrolled && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 flex flex-wrap items-center gap-8 p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
                >
                  <Button className="h-16 px-10 rounded-[1.5rem] text-lg font-black shadow-2xl shadow-primary/40 group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center">
                      <PlayCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                      {t("course_details.continue_learning")}
                    </span>
                  </Button>
                  <div className="flex-1 min-w-[280px]">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-slate-400 font-black uppercase tracking-[0.2em]">
                        {t("lesson.progress")}
                      </span>
                      <span className="text-primary font-black text-lg">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
