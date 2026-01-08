import { motion } from "framer-motion";
import { Sparkles, Star, Trophy, CheckCircle2 } from "lucide-react";
import { type TFunction } from "i18next";

interface CoursesHeroProps {
  isAr: boolean;
  t: TFunction;
}

export const CoursesHero = ({ isAr, t }: CoursesHeroProps) => {
  return (
    <div className="relative min-h-[60vh] flex items-center bg-[#0B0F19] overflow-hidden pt-20">
      {/* Animated Background Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"
      />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-primary font-bold text-sm mb-8 shadow-2xl"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <Sparkles className="w-4 h-4" />
              <span className="tracking-wide uppercase">
                {isAr ? "اكتشف مستقبلك التعليمي" : "Discover Your Future"}
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              {isAr ? (
                <>
                  طوّر مهاراتك مع{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient">
                    أفضل الدورات
                  </span>
                </>
              ) : (
                <>
                  Elevate Your Skills With{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient">
                    Premium Courses
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
              {t("courses.description")}
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-2xl border-4 border-[#0B0F19] bg-slate-800 overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?u=${i + 10}`}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="text-white font-bold">
                    +50k {isAr ? "طالب" : "Students"}
                  </div>
                  <div className="text-slate-500">
                    {isAr ? "يثقون بنا" : "Trust our platform"}
                  </div>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-white font-bold text-lg">4.9/5</span>
                <span className="text-slate-500">
                  ({isAr ? "٢٠ ألف تقييم" : "20k reviews"})
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 p-8 glass rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Courses"
                className="rounded-[3rem] shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Stats Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-12 -left-8 z-20 glass p-5 rounded-3xl border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-black text-xl">150+</div>
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                      {isAr ? "دورة معتمدة" : "Certified Courses"}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-12 -right-8 z-20 glass p-5 rounded-3xl border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-black text-xl">100%</div>
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                      {isAr ? "ضمان النجاح" : "Success Rate"}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
