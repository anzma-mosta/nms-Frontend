import { useTranslation, Trans } from "react-i18next";
import { Star, PlayCircle, CheckCircle2, Trophy, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-32">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/2 opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px] translate-y-1/2 opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center opacity-[0.05] dark:opacity-[0.08]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: i18n.language === "ar" ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className={cn(
              "space-y-12",
              i18n.language === "ar" ? "text-right" : "text-left"
            )}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 backdrop-blur-xl shadow-lg shadow-primary/5"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">{t("home.hero_badge")}</span>
            </motion.div>

            <div className="space-y-8">
              <h1 className="text-6xl lg:text-8xl font-black leading-[1] tracking-tighter text-foreground">
                <Trans i18nKey="home.hero_title">
                  Learn <span className="text-gradient">Future</span> Skills Today
                </Trans>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed font-bold opacity-80">
                {t("home.hero_desc")}
              </p>
            </div>

            <div
              className={cn(
                "flex flex-wrap gap-6",
                i18n.language === "ar" ? "justify-start" : "justify-start"
              )}
            >
              <Button size="lg" className="h-16 px-12 text-lg font-black rounded-3xl gap-4 shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 group">
                <span>{t("home.start_now")}</span>
                <ArrowRight
                  className={cn(
                    "w-6 h-6 transition-transform group-hover:translate-x-2",
                    i18n.language === "ar" && "rotate-180 group-hover:-translate-x-2"
                  )}
                />
              </Button>
              <Button
                variant="glass"
                size="lg"
                className="h-16 px-12 text-lg font-black rounded-3xl gap-4 border-2 border-border/50 transition-all duration-500 hover:bg-secondary/80"
              >
                <PlayCircle className="w-7 h-7 text-primary" />
                <span>{t("home.how_it_works")}</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-12 pt-8">
              <div className="flex flex-col gap-3">
                <div
                  className={cn(
                    "flex",
                    i18n.language === "ar"
                      ? "-space-x-5 space-x-reverse"
                      : "-space-x-5"
                  )}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="w-16 h-16 rounded-[2rem] border-4 border-background bg-secondary shadow-2xl flex items-center justify-center overflow-hidden ring-1 ring-border/50 hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?u=${i + 20}`}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                  <div className="w-16 h-16 rounded-[2rem] border-4 border-background bg-primary text-primary-foreground shadow-2xl flex items-center justify-center text-xs font-black ring-1 ring-border/50">
                    +10k
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-sm font-black text-foreground">4.9/5</span>
                  <span className="text-sm font-bold text-muted-foreground">(2.5k {t("home.reviews")})</span>
                </div>
              </div>

              <div className="h-12 w-px bg-border/50 hidden sm:block"></div>

              <div className="flex gap-8">
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-black text-foreground">250+</div>
                  <div className="text-sm font-bold text-muted-foreground">{t("home.courses_count")}</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-black text-foreground">15k+</div>
                  <div className="text-sm font-bold text-muted-foreground">{t("home.students_count")}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative"
          >
            <div className="relative z-10 p-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-[3rem] blur-3xl -z-10 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Students"
                className="rounded-[3rem] shadow-2xl border-8 border-white/10 dark:border-white/5 object-cover aspect-[4/5] lg:aspect-square"
              />
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-2xl border border-white/20 hidden xl:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-foreground">{t("home.top_rated")}</div>
                    <div className="text-xs font-bold text-muted-foreground">{t("home.certified_platform")}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-2xl border border-white/20 hidden xl:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-foreground">{t("home.expert_instructors")}</div>
                    <div className="text-xs font-bold text-muted-foreground">{t("home.learn_from_best")}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
